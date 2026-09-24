import React, { useState } from 'react';
import { Volume2, VolumeX, Star, Check, Copy } from 'lucide-react';
import { WordItem } from '../data/vocabulary';
import { speechService } from '../utils/speech';

interface WordCardProps {
  word: WordItem;
  isFavorite: boolean;
  onToggleFavorite: (word: WordItem) => void;
  autoPlay?: boolean;
  speechRate?: number;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  isFavorite,
  onToggleFavorite,
  speechRate = 0.9,
}) => {
  const [isSpeakingEn, setIsSpeakingEn] = useState(false);
  const [isSpeakingAr, setIsSpeakingAr] = useState(false);
  const [copied, setCopied] = useState(false);

  const speakEnglish = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    speechService.speak(
      word.english,
      'en',
      speechRate,
      () => setIsSpeakingEn(true),
      () => setIsSpeakingEn(false),
      () => setIsSpeakingEn(false)
    );
  };

  const speakArabic = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    speechService.speak(
      word.arabic,
      'ar',
      speechRate,
      () => setIsSpeakingAr(true),
      () => setIsSpeakingAr(false),
      () => setIsSpeakingAr(false)
    );
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${word.english} - ${word.arabic}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-stone-200/80 dark:border-stone-800 transition-all duration-300 relative overflow-hidden group hover:shadow-2xl">
      {/* Subtle top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

      {/* Action buttons (Favorite & Copy) */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="p-2.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700 transition"
          title="نسخ الكلمة"
          aria-label="نسخ الكلمة"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(word);
          }}
          className={`p-2.5 rounded-full transition ${
            isFavorite
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-500'
              : 'bg-stone-100 dark:bg-stone-800/80 text-stone-400 hover:text-amber-500'
          }`}
          title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          aria-label="المفضلة"
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Main Content: STRICTLY Word + Meaning + Speaker Button */}
      <div className="flex flex-col items-center text-center space-y-7 pt-4 pb-2">
        
        {/* English Word */}
        <div className="space-y-1">
          <h2
            dir="ltr"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 dark:text-stone-50 tracking-tight font-sans select-all"
          >
            {word.english}
          </h2>
          {word.phonetic && (
            <p dir="ltr" className="text-sm font-mono text-stone-400 dark:text-stone-500">
              {word.phonetic}
            </p>
          )}
        </div>

        {/* Arabic Meaning with Emoji */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 select-all">
          <span className="text-4xl sm:text-5xl select-none" role="img" aria-hidden="true">
            {word.emoji}
          </span>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-600 dark:text-emerald-400 font-['Tajawal',sans-serif]">
            {word.arabic}
          </h3>
        </div>

        {/* 🔊 Primary Audio Section: Sound button to pronounce the word */}
        <div className="pt-2 flex flex-col items-center gap-4 w-full">
          {/* Main big 🔊 speaker button */}
          <button
            onClick={() => speakEnglish()}
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold shadow-lg transition-all transform active:scale-95 ${
              isSpeakingEn
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-300 dark:ring-emerald-800 animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-emerald-500/30'
            }`}
            title="استمع إلى نطق الكلمة بالإنجليزية"
          >
            <Volume2 className={`w-7 h-7 ${isSpeakingEn ? 'animate-bounce' : ''}`} />
            <span>نطق الكلمة بالإنجليزية</span>
          </button>

          {/* Secondary Arabic voice button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => speakArabic()}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition ${
                isSpeakingAr
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400'
                  : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
              title="استمع لنطق الكلمة بالعربية"
            >
              <Volume2 className="w-4 h-4 text-teal-500" />
              <span>نطق المعنى بالعربية</span>
            </button>
          </div>

          {/* Visual sound waves when playing */}
          {(isSpeakingEn || isSpeakingAr) && (
            <div className="flex items-center gap-1.5 h-6">
              <span className="w-1 h-3 bg-emerald-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-1 h-6 bg-emerald-500 rounded-full animate-[pulse_0.4s_ease-in-out_infinite]" />
              <span className="w-1 h-4 bg-emerald-500 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]" />
              <span className="w-1 h-5 bg-emerald-500 rounded-full animate-[pulse_0.3s_ease-in-out_infinite]" />
              <span className="w-1 h-2 bg-emerald-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
