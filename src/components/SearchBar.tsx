import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Mic, MicOff, Loader2 } from 'lucide-react';
import { searchSuggestions, WordItem } from '../data/vocabulary';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: (val: string) => void;
  isLoading?: boolean;
}

// Support SpeechRecognition for Voice Input
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  isLoading = false,
}) => {
  const [suggestions, setSuggestions] = useState<WordItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update autocomplete suggestions as user types
  useEffect(() => {
    if (value.trim().length > 0) {
      const list = searchSuggestions(value, 5);
      setSuggestions(list);
      setShowSuggestions(list.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    onChange('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      if (value.trim()) {
        onSearch(value.trim());
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (item: WordItem) => {
    const isArabicInput = /[\u0600-\u06FF]/.test(value);
    const chosen = isArabicInput ? item.arabic : item.english;
    onChange(chosen);
    setShowSuggestions(false);
    onSearch(chosen);
  };

  // Voice Search via Web Speech Recognition
  const toggleVoiceInput = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('ميزة البحث الصوتي غير مدعومة في هذا المتصفح. يمكنك الكتابة مباشرة.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;
      // Detect language based on context or default to English / Arabic
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onChange(transcript);
          onSearch(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute right-5 pointer-events-none text-stone-400 dark:text-stone-500">
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </div>

        {/* Big Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          placeholder="ابحث عن أي كلمة... مثلاً: Book أو سيارة"
          className="w-full pr-14 pl-24 py-4 sm:py-5 text-lg sm:text-xl font-medium rounded-2xl bg-white dark:bg-stone-900 text-stone-900 dark:text-white border-2 border-stone-200 dark:border-stone-800 focus:border-emerald-500 dark:focus:border-emerald-500 shadow-lg focus:shadow-emerald-500/10 outline-none transition-all duration-200 placeholder:text-stone-400 dark:placeholder:text-stone-600"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />

        {/* Action icons (Clear & Voice Mic) */}
        <div className="absolute left-4 flex items-center gap-1.5">
          {value && (
            <button
              onClick={handleClear}
              type="button"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              title="مسح البحث"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={toggleVoiceInput}
            type="button"
            className={`p-2 rounded-xl transition ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-stone-400 hover:text-emerald-500 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title={isListening ? 'جارٍ الاستماع...' : 'البحث بالصوت'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Autocomplete Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full right-0 left-0 mt-2 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden z-50 divide-y divide-stone-100 dark:divide-stone-800">
          {suggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectSuggestion(item)}
              className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/60 transition text-right group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                    {item.arabic}
                  </span>
                  <span className="text-stone-400 dark:text-stone-500 text-sm font-sans" dir="ltr">
                    ({item.english})
                  </span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/60 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                {item.category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
