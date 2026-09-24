import React from 'react';
import { Sun, Moon, Sparkles, Gauge } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  speechRate: number;
  onChangeSpeechRate: (rate: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  speechRate,
  onChangeSpeechRate,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto pt-6 pb-4 px-4 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <span className="text-2xl font-black">مـ</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100 font-['Tajawal',sans-serif]">
              مُفْرَدَاتِي
            </h1>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              سريع
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            الكلمة ومعناها مع النطق الصوتي الفوري
          </p>
        </div>
      </div>

      {/* Controls: Speech Rate & Dark Mode */}
      <div className="flex items-center gap-2">
        {/* Speech Rate toggle */}
        <button
          onClick={() => onChangeSpeechRate(speechRate === 0.85 ? 1.0 : 0.85)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-500 dark:hover:border-emerald-500 transition shadow-sm"
          title="سرعة نطق الصوت"
        >
          <Gauge className="w-3.5 h-3.5 text-emerald-500" />
          <span>{speechRate === 0.85 ? 'نطق هادئ (0.8x)' : 'نطق عادي (1.0x)'}</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500 transition shadow-sm"
          title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
          aria-label="تبديل المظهر"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-600" />}
        </button>
      </div>
    </header>
  );
};
