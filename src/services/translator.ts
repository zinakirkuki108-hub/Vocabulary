import { findLocalWord, WordItem } from '../data/vocabulary';

// In-memory cache for dynamic lookups
const translationCache = new Map<string, WordItem>();

// Helper to guess an emoji based on English or Arabic words
function detectEmoji(english: string, arabic: string): string {
  const combined = `${english} ${arabic}`.toLowerCase();
  if (combined.includes('book') || combined.includes('كتاب')) return '📖';
  if (combined.includes('car') || combined.includes('سيارة')) return '🚗';
  if (combined.includes('water') || combined.includes('ماء')) return '💧';
  if (combined.includes('pen') || combined.includes('قلم')) return '🖊️';
  if (combined.includes('door') || combined.includes('باب')) return '🚪';
  if (combined.includes('sun') || combined.includes('شمس')) return '☀️';
  if (combined.includes('moon') || combined.includes('قمر')) return '🌙';
  if (combined.includes('star') || combined.includes('نجم')) return '⭐';
  if (combined.includes('love') || combined.includes('حب')) return '❤️';
  if (combined.includes('cat') || combined.includes('قط')) return '🐱';
  if (combined.includes('dog') || combined.includes('كلب')) return '🐶';
  if (combined.includes('apple') || combined.includes('تفاح')) return '🍎';
  if (combined.includes('house') || combined.includes('بيت') || combined.includes('منزل')) return '🏠';
  if (combined.includes('school') || combined.includes('مدرسة')) return '🏫';
  if (combined.includes('computer') || combined.includes('حاسوب')) return '💻';
  if (combined.includes('phone') || combined.includes('هاتف')) return '📱';
  if (combined.includes('coffee') || combined.includes('قهوة')) return '☕';
  if (combined.includes('tea') || combined.includes('شاي')) return '🍵';
  if (combined.includes('music') || combined.includes('موسيقى')) return '🎵';
  if (combined.includes('tree') || combined.includes('شجرة')) return '🌳';
  if (combined.includes('flower') || combined.includes('وردة') || combined.includes('زهرة')) return '🌸';
  return '✨';
}

/**
 * Translates a single word between English and Arabic.
 * Guaranteed to return solely:
 * English word + Arabic meaning + emoji
 */
export async function getWordMeaning(query: string): Promise<WordItem | null> {
  const clean = query.trim();
  if (!clean) return null;

  const cacheKey = clean.toLowerCase();
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // 1. Check local static dictionary first (instant 0ms)
  const local = findLocalWord(clean);
  if (local) {
    translationCache.set(cacheKey, local);
    return local;
  }

  // 2. Query backend API (/api/translate)
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: clean }),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = (await res.json()) as { english: string; arabic: string; emoji?: string };
        if (data && data.english && data.arabic) {
          const item: WordItem = {
            id: `dyn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            english: data.english,
            arabic: data.arabic,
            emoji: data.emoji || detectEmoji(data.english, data.arabic),
            category: 'كلمات عامة',
          };
          translationCache.set(cacheKey, item);
          return item;
        }
      }
    }
  } catch {
    // Continue to public fallback
  }

  // 3. Fallback to client-side public translation endpoint
  try {
    const isArabic = /[\u0600-\u06FF]/.test(clean);
    const langPair = isArabic ? 'ar|en' : 'en|ar';
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=${langPair}`
    );

    if (response.ok) {
      const json = (await response.json()) as { responseData?: { translatedText?: string } };
      const translated = json?.responseData?.translatedText?.trim();

      if (translated) {
        const cleanTranslated = translated
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .split(/[,;.]/)[0]
          .trim();

        const english = isArabic ? cleanTranslated : clean;
        const arabic = isArabic ? clean : cleanTranslated;
        const emoji = detectEmoji(english, arabic);

        const item: WordItem = {
          id: `ext-${Date.now()}`,
          english: english.charAt(0).toUpperCase() + english.slice(1),
          arabic,
          emoji,
          category: 'ترجمة فورية',
        };
        translationCache.set(cacheKey, item);
        return item;
      }
    }
  } catch (err) {
    console.warn('All translation lookups failed:', err);
  }

  return null;
}
