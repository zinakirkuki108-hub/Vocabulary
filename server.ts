import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error('Failed to initialize Gemini:', e);
  }
}

// Fallback emoji helper for common concepts
function guessEmoji(word: string, meaning: string): string {
  const combined = `${word} ${meaning}`.toLowerCase();
  if (combined.includes('book') || combined.includes('كتاب')) return '📖';
  if (combined.includes('car') || combined.includes('سيارة')) return '🚗';
  if (combined.includes('water') || combined.includes('ماء')) return '💧';
  if (combined.includes('pen') || combined.includes('قلم')) return '🖊️';
  if (combined.includes('sun') || combined.includes('شمس')) return '☀️';
  if (combined.includes('moon') || combined.includes('قمر')) return '🌙';
  if (combined.includes('star') || combined.includes('نجم')) return '⭐';
  if (combined.includes('food') || combined.includes('طعام') || combined.includes('أكل')) return '🍽️';
  if (combined.includes('coffee') || combined.includes('قهوة')) return '☕';
  if (combined.includes('tea') || combined.includes('شاي')) return '🍵';
  if (combined.includes('apple') || combined.includes('تفاح')) return '🍎';
  if (combined.includes('house') || combined.includes('home') || combined.includes('بيت') || combined.includes('منزل')) return '🏠';
  if (combined.includes('heart') || combined.includes('قلب')) return '❤️';
  if (combined.includes('cat') || combined.includes('قط')) return '🐱';
  if (combined.includes('dog') || combined.includes('كلب')) return '🐶';
  if (combined.includes('tree') || combined.includes('شجر')) return '🌳';
  if (combined.includes('flower') || combined.includes('زهر') || combined.includes('ورد')) return '🌸';
  if (combined.includes('computer') || combined.includes('حاسوب') || combined.includes('كمبيوتر')) return '💻';
  if (combined.includes('phone') || combined.includes('هاتف') || combined.includes('جوال')) return '📱';
  if (combined.includes('time') || combined.includes('clock') || combined.includes('ساعة')) return '⏰';
  if (combined.includes('school') || combined.includes('مدرسة')) return '🏫';
  return '✨';
}

// Text-to-Speech audio proxy endpoint (ensures 100% reliable Arabic & English speech)
app.get('/api/tts', async (req, res) => {
  try {
    const rawText = (req.query.text as string) || '';
    const lang = (req.query.lang as string) === 'en' ? 'en' : 'ar';
    const text = rawText.trim();

    if (!text) {
      return res.status(400).send('Text is required');
    }

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=dict-chrome-ex&q=${encodeURIComponent(text)}`;
    const upstreamRes = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).send('TTS service unavailable');
    }

    const audioBuffer = await upstreamRes.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(Buffer.from(audioBuffer));
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('TTS endpoint error:', errorMsg);
    return res.status(500).send('Internal TTS error');
  }
});

// Translation endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { word } = req.body;
    if (!word || typeof word !== 'string' || !word.trim()) {
      return res.status(400).json({ error: 'Word is required' });
    }

    const cleanWord = word.trim();
    const isArabic = /[\u0600-\u06FF]/.test(cleanWord);

    // 1. If Gemini is available, use fast gemini-3.8-flash
    if (ai) {
      try {
        const prompt = `You are a strict bilingual English-Arabic vocabulary translator.
The user provided the word: "${cleanWord}".
Translate it concisely:
- If input is English, provide the primary single Arabic word translation (with tashkeel if helpful) and a single relevant emoji.
- If input is Arabic, provide the primary single English word translation and a single relevant emoji.
CRITICAL RULE: Give ONLY the single word translation and one emoji. No sentences, no explanations, no grammar notes, no extra text.

Return STRICT JSON in this format:
{
  "english": "Book",
  "arabic": "كتاب",
  "emoji": "📖"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text?.trim() || '';
        if (text) {
          const parsed = JSON.parse(text);
          if (parsed.english && parsed.arabic) {
            return res.json({
              english: parsed.english,
              arabic: parsed.arabic,
              emoji: parsed.emoji || guessEmoji(parsed.english, parsed.arabic),
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini translation failed, falling back to public API:', geminiErr);
      }
    }

    // 2. Fallback to public translation API
    const langPair = isArabic ? 'ar|en' : 'en|ar';
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanWord)}&langpair=${langPair}`;
    
    const response = await fetch(apiUrl);
    const data = (await response.json()) as { responseData?: { translatedText?: string } };
    const translated = data?.responseData?.translatedText?.trim();

    if (translated) {
      // Clean any html entities or excess text
      const cleanTranslated = translated.replace(/&quot;/g, '"').replace(/&#39;/g, "'").split(/[,;.]/)[0].trim();
      const english = isArabic ? cleanTranslated : cleanWord;
      const arabic = isArabic ? cleanWord : cleanTranslated;
      const emoji = guessEmoji(english, arabic);

      return res.json({
        english,
        arabic,
        emoji,
      });
    }

    return res.status(404).json({ error: 'Translation not found' });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Translation error:', errorMsg);
    res.status(500).json({ error: 'Internal translation error' });
  }
});

// Mount Vite middleware in development or serve static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
