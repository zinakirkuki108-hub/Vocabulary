import React, { useState } from 'react';
import { History, Star, Trash2, Volume2, ArrowRightLeft, Sparkles } from 'lucide-react';
import { WordItem } from '../data/vocabulary';
import { speechService } from '../utils/speech';

interface HistoryAndFavoritesProps {
  history: WordItem[];
  favorites: WordItem[];
  onSelectWord: (word: string) => void;
  onClearHistory: () => void;
  onRemoveFavorite: (word: WordItem) => void;
  speechRate: number;
}

export const HistoryAndFavorites: React.FC<HistoryAndFavoritesProps> = ({
  history,
  favorites,
  onSelectWord,
  onClearHistory,
  onRemoveFavorite,
  speechRate,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'favorites' | 'flashcards'>('history');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Pick pool of words for flashcards: favorites first, or history, or default
  const flashcardPool = favorites.length > 0 ? favorites : history;
  const currentFlashcard = flashcardPool[flashcardIndex] || null;

  const nextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % flashcardPool.length);
  };

  const prevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + flashcardPool.length) % flashcardPool.length);
  };

  const playFlashcardAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentFlashcard) return;
    speechService.speak(currentFlashcard.english, 'en', speechRate);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-4">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              activeTab === 'history'
                ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-white'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            <History className="w-4 h-4" />
            <span>السجل ({history.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              activeTab === 'favorites'
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>المفضلة ({favorites.length})</span>
          </button>

          {flashcardPool.length > 0 && (
            <button
              onClick={() => {
                setActiveTab('flashcards');
                setIsFlipped(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'flashcards'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>بطاقات الحفظ</span>
            </button>
          )}
        </div>

        {activeTab === 'history' && history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 px-2 py-1 rounded transition"
            title="مسح سجل البحث"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>مسح</span>
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'history' && (
          <div>
            {history.length === 0 ? (
              <p className="text-center text-sm text-stone-400 dark:text-stone-600 py-6">
                لم تبحث عن أي كلمة بعد. اكتب كلمة في مربع البحث أعلاه!
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectWord(item.english)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 cursor-pointer shadow-sm group transition"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-xl shrink-0">{item.emoji}</span>
                      <div className="truncate text-right">
                        <p className="text-sm font-bold text-stone-800 dark:text-stone-200 truncate">
                          {item.arabic}
                        </p>
                        <p dir="ltr" className="text-xs text-stone-400 font-sans truncate">
                          {item.english}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speechService.speak(item.english, 'en', speechRate);
                      }}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-500 hover:bg-stone-100 dark:hover:bg-stone-800 shrink-0"
                      title="استمع للنطق"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            {favorites.length === 0 ? (
              <p className="text-center text-sm text-stone-400 dark:text-stone-600 py-6">
                قائمة المفضلة فارغة. اضغط على رمز النجمة ⭐ بجانب أي كلمة لحفظها هنا!
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {favorites.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectWord(item.english)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 cursor-pointer shadow-sm group transition"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-xl shrink-0">{item.emoji}</span>
                      <div className="truncate text-right">
                        <p className="text-sm font-bold text-stone-800 dark:text-stone-200 truncate">
                          {item.arabic}
                        </p>
                        <p dir="ltr" className="text-xs text-stone-400 font-sans truncate">
                          {item.english}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speechService.speak(item.english, 'en', speechRate);
                        }}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                        title="استمع للنطق"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(item);
                        }}
                        className="p-1.5 rounded-lg text-amber-500 hover:text-rose-500"
                        title="إزالة من المفضلة"
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Flashcards Practice Mode */}
        {activeTab === 'flashcards' && currentFlashcard && (
          <div className="flex flex-col items-center py-4">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-sm h-52 bg-white dark:bg-stone-900 rounded-3xl border-2 border-emerald-500/30 shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95 text-center relative select-none"
            >
              <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                {flashcardIndex + 1} / {flashcardPool.length}
              </span>

              <button
                onClick={playFlashcardAudio}
                className="absolute top-4 left-4 p-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition"
                title="نطق الكلمة"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {!isFlipped ? (
                <div className="space-y-2">
                  <p dir="ltr" className="text-3xl font-black text-stone-900 dark:text-stone-100 font-sans">
                    {currentFlashcard.english}
                  </p>
                  <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>انقر لإظهار المعنى بالعربية</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-4xl">{currentFlashcard.emoji}</span>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-['Tajawal',sans-serif]">
                    {currentFlashcard.arabic}
                  </p>
                  <p className="text-xs text-stone-400">انقر للقلب مرة أخرى</p>
                </div>
              )}
            </div>

            {/* Flashcard Navigation */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={prevFlashcard}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 transition"
              >
                السابق
              </button>
              <button
                onClick={nextFlashcard}
                className="px-6 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition shadow-md shadow-emerald-500/20"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
