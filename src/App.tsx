import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WordCard } from './components/WordCard';
import { QuickExamples } from './components/QuickExamples';
import { HistoryAndFavorites } from './components/HistoryAndFavorites';
import { WordItem, VOCABULARY_LIST, findLocalWord } from './data/vocabulary';
import { getWordMeaning } from './services/translator';
import { speechService } from './utils/speech';
import { Sparkles, AlertCircle } from 'lucide-react';

const STORAGE_KEYS = {
  THEME: 'mufradati_theme',
  FAVORITES: 'mufradati_favorites',
  HISTORY: 'mufradati_history',
  SPEECH_RATE: 'mufradati_speech_rate',
};

// Initial default word from prompt: "Book"
const INITIAL_WORD: WordItem = {
  id: 'book',
  english: 'Book',
  arabic: 'كِتَاب',
  emoji: '📖',
  category: 'أدوات ومدرسة',
  phonetic: '/bʊk/',
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentWord, setCurrentWord] = useState<WordItem>(INITIAL_WORD);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Speech Rate (0.85x or 1.0x)
  const [speechRate, setSpeechRate] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.SPEECH_RATE);
      return saved ? parseFloat(saved) : 0.9;
    }
    return 0.9;
  });

  // Favorites
  const [favorites, setFavorites] = useState<WordItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // History
  const [history, setHistory] = useState<WordItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
        return saved ? JSON.parse(saved) : [INITIAL_WORD];
      } catch {
        return [INITIAL_WORD];
      }
    }
    return [INITIAL_WORD];
  });

  // Apply dark mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [darkMode]);

  // Persist Favorites
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites:', e);
    }
  }, [favorites]);

  // Persist History
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history:', e);
    }
  }, [history]);

  // Persist speech rate
  const handleSpeechRateChange = (rate: number) => {
    setSpeechRate(rate);
    localStorage.setItem(STORAGE_KEYS.SPEECH_RATE, rate.toString());
  };

  // Add word to history
  const addToHistory = useCallback((item: WordItem) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (x) => x.english.toLowerCase() !== item.english.toLowerCase()
      );
      return [item, ...filtered].slice(0, 30);
    });
  }, []);

  // Perform search
  const performSearch = useCallback(
    async (queryText: string, playAudioOnSuccess = false) => {
      const clean = queryText.trim();
      if (!clean) return;

      setErrorMessage(null);

      // Fast check in local dictionary first
      const local = findLocalWord(clean);
      if (local) {
        setCurrentWord(local);
        addToHistory(local);
        if (playAudioOnSuccess) {
          speechService.speak(local.english, 'en', speechRate);
        }
        return;
      }

      // If not in local list, perform async dynamic lookup
      setIsLoading(true);
      try {
        const result = await getWordMeaning(clean);
        if (result) {
          setCurrentWord(result);
          addToHistory(result);
          if (playAudioOnSuccess) {
            speechService.speak(result.english, 'en', speechRate);
          }
        } else {
          setErrorMessage(`عذراً، لم نتمكن من العثور على ترجمة دقيقة للكلمة "${clean}". يرجى التحقق من الإملاء.`);
        }
      } catch (err) {
        console.error('Search error:', err);
        setErrorMessage('حدث خطأ أثناء جلب معنى الكلمة. يرجى المحاولة مرة أخرى.');
      } finally {
        setIsLoading(false);
      }
    },
    [addToHistory, speechRate]
  );

  // Debounce search while typing if exact match exists
  useEffect(() => {
    if (!searchQuery.trim()) return;

    const timeout = setTimeout(() => {
      const local = findLocalWord(searchQuery);
      if (local) {
        setCurrentWord(local);
        addToHistory(local);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [searchQuery, addToHistory]);

  const handleSelectExample = (word: string) => {
    setSearchQuery(word);
    performSearch(word, true); // Auto-play pronunciation when clicking quick chips
  };

  const handleToggleFavorite = (word: WordItem) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (x) => x.english.toLowerCase() === word.english.toLowerCase()
      );
      if (exists) {
        return prev.filter(
          (x) => x.english.toLowerCase() !== word.english.toLowerCase()
        );
      } else {
        return [word, ...prev];
      }
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const isFavorite = favorites.some(
    (x) => x.english.toLowerCase() === currentWord.english.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200 font-['Cairo',sans-serif]">
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        speechRate={speechRate}
        onChangeSpeechRate={handleSpeechRateChange}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-2 pb-16 flex flex-col items-center">
        
        {/* Search Bar Section */}
        <section className="w-full mb-3">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setErrorMessage(null);
            }}
            onSearch={(val) => performSearch(val, true)}
            isLoading={isLoading}
          />

          {/* Quick Examples */}
          <QuickExamples
            onSelectWord={handleSelectExample}
            currentWord={currentWord.english}
          />
        </section>

        {/* Error message if search fails */}
        {errorMessage && (
          <div className="w-full max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Primary Word Card: STRICTLY Word + Meaning + Speaker Button */}
        <section className="w-full mt-4">
          <WordCard
            word={currentWord}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            speechRate={speechRate}
          />
        </section>

        {/* Learning History, Favorites & Flashcard Practice */}
        <section className="w-full">
          <HistoryAndFavorites
            history={history}
            favorites={favorites}
            onSelectWord={(word) => {
              setSearchQuery(word);
              performSearch(word, true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearHistory={handleClearHistory}
            onRemoveFavorite={handleToggleFavorite}
            speechRate={speechRate}
          />
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-stone-200/80 dark:border-stone-800/80 py-4 text-center text-xs text-stone-400 dark:text-stone-500">
        مفرداتي &copy; {new Date().getFullYear()} - تطبيق لتعليم معاني الكلمات والنطق الصوتي الفوري
      </footer>
    </div>
  );
}
