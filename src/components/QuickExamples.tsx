import React from 'react';
import { Sparkles } from 'lucide-react';

interface QuickExamplesProps {
  onSelectWord: (word: string) => void;
  currentWord?: string;
}

const EXAMPLES = [
  { english: 'Book', arabic: 'كتاب', emoji: '📖' },
  { english: 'Car', arabic: 'سيارة', emoji: '🚗' },
  { english: 'Water', arabic: 'ماء', emoji: '💧' },
  { english: 'House', arabic: 'منزل', emoji: '🏠' },
  { english: 'School', arabic: 'مدرسة', emoji: '🏫' },
  { english: 'Sun', arabic: 'شمس', emoji: '☀️' },
  { english: 'Pen', arabic: 'قلم', emoji: '🖊️' },
  { english: 'Coffee', arabic: 'قهوة', emoji: '☕' },
  { english: 'Heart', arabic: 'قلب', emoji: '❤️' },
  { english: 'Cat', arabic: 'قطة', emoji: '🐱' },
];

export const QuickExamples: React.FC<QuickExamplesProps> = ({
  onSelectWord,
  currentWord,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-4 px-2">
      <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
        <span>أمثلة سريعة للتجربة:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((item) => {
          const isSelected =
            currentWord?.toLowerCase() === item.english.toLowerCase() ||
            currentWord === item.arabic;
          return (
            <button
              key={item.english}
              onClick={() => onSelectWord(item.english)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                isSelected
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20 scale-105'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-stone-50 dark:hover:bg-stone-800/80'
              }`}
            >
              <span>{item.emoji}</span>
              <span dir="ltr" className="font-sans font-medium">{item.english}</span>
              <span className="text-stone-400 dark:text-stone-500 font-normal">|</span>
              <span>{item.arabic}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
