'use client';

import { useI18nStore, type Locale } from '@/i18n';

export default function LocaleSwitcher() {
  const { locale, setLocale } = useI18nStore();

  const options: { value: Locale; label: string }[] = [
    { value: 'ko', label: 'KO' },
    { value: 'en', label: 'EN' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/50 p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLocale(opt.value)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            locale === opt.value
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
