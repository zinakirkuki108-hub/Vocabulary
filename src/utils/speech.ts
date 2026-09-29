/**
 * Resilient Audio Text-To-Speech helper
 * Combines Web Speech API with multi-source online audio streaming fallback (especially for Arabic)
 * Compatible across Desktop (Chrome, Firefox, Safari, Edge) and Mobile (Android, iOS Safari, WebViews)
 */

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isSupported = false;
  private activeAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.isSupported = true;
      this.loadVoices();

      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public getSupported(): boolean {
    return true;
  }

  private audioCache = new Map<string, HTMLAudioElement>();

  public preload(text: string, lang: 'en' | 'ar' = 'en') {
    const clean = (text || '').trim();
    if (!clean) return;
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=dict-chrome-ex&q=${encodeURIComponent(clean)}`;
    if (!this.audioCache.has(url)) {
      try {
        const audio = new Audio();
        try {
          (audio as unknown as { referrerPolicy: string }).referrerPolicy = 'no-referrer';
        } catch (e) {}
        audio.preload = 'auto';
        audio.src = url;
        this.audioCache.set(url, audio);
      } catch (e) {}
    }
  }

  /**
   * Fast, low-latency online audio streaming with instant preloaded cache
   */
  private playStreamFallback(
    text: string,
    lang: 'en' | 'ar',
    rate: number,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: unknown) => void
  ) {
    try {
      this.stop();

      const clean = text.trim();
      const primaryUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=dict-chrome-ex&q=${encodeURIComponent(clean)}`;
      const backupUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=gtx&q=${encodeURIComponent(clean)}`;

      let audio = this.audioCache.get(primaryUrl);
      if (!audio) {
        audio = new Audio();
        try {
          (audio as unknown as { referrerPolicy: string }).referrerPolicy = 'no-referrer';
        } catch (e) {}
        audio.preload = 'auto';
        audio.src = primaryUrl;
        this.audioCache.set(primaryUrl, audio);
      }

      try {
        audio.currentTime = 0;
        audio.playbackRate = Math.max(0.5, Math.min(rate, 1.5));
      } catch (e) {}
      this.activeAudio = audio;

      let started = false;
      audio.onplay = () => {
        if (!started) {
          started = true;
          if (onStart) onStart();
        }
      };

      audio.onended = () => {
        this.activeAudio = null;
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        // Instant backup stream
        const backupAudio = new Audio();
        try {
          (backupAudio as unknown as { referrerPolicy: string }).referrerPolicy = 'no-referrer';
        } catch (e) {}
        backupAudio.src = backupUrl;
        try {
          backupAudio.playbackRate = Math.max(0.5, Math.min(rate, 1.5));
        } catch (e) {}
        this.activeAudio = backupAudio;

        backupAudio.onended = () => {
          this.activeAudio = null;
          if (onEnd) onEnd();
        };
        backupAudio.onerror = (err) => {
          this.activeAudio = null;
          if (onEnd) onEnd();
          if (onError) onError(err);
        };

        backupAudio.play().catch((err) => {
          this.activeAudio = null;
          if (onEnd) onEnd();
          if (onError) onError(err);
        });
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (audio && audio.onerror) {
            audio.onerror(new Event('error') as unknown as string);
          }
        });
      }
    } catch (e) {
      if (onEnd) onEnd();
      if (onError) onError(e);
    }
  }

  /**
   * Speak a text with specified language
   */
  public speak(
    text: string,
    lang: 'en' | 'ar' = 'en',
    rate: number = 0.9,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: unknown) => void
  ): boolean {
    const clean = (text || '').trim();
    if (!clean) return false;

    this.stop();

    if (this.voices.length === 0) {
      this.loadVoices();
    }

    // Check if an authentic voice exists for the target language
    const targetPrefix = lang === 'ar' ? 'ar' : 'en';
    const matchingVoice = this.voices.find(
      (v) => (v.lang || '').toLowerCase().startsWith(targetPrefix) ||
             (v.name || '').toLowerCase().includes(targetPrefix === 'ar' ? 'arabic' : 'english')
    );

    // If target is Arabic and NO native Arabic voice exists on the user's OS/browser,
    // stream online audio immediately (avoids silent fail of Web Speech API)
    if (lang === 'ar' && !matchingVoice) {
      this.playStreamFallback(clean, 'ar', rate, onStart, onEnd, onError);
      return true;
    }

    if (!this.synth || !this.isSupported) {
      this.playStreamFallback(clean, lang, rate, onStart, onEnd, onError);
      return true;
    }

    try {
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = Math.max(0.5, Math.min(rate, 1.5));
      utterance.pitch = 1.0;
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';

      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error, switching to audio stream:', e);
        this.playStreamFallback(clean, lang, rate, onStart, onEnd, onError);
      };

      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.warn('Native speech failed, using fallback stream:', err);
      this.playStreamFallback(clean, lang, rate, onStart, onEnd, onError);
      return true;
    }
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.src = '';
      } catch (e) {}
      this.activeAudio = null;
    }
  }
}

export const speechService = new SpeechService();
