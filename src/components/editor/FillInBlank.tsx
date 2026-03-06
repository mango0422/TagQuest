'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n';

interface FillInBlankProps {
  template: string;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

export default function FillInBlank({ template, onSubmit, disabled = false }: FillInBlankProps) {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState('');

  const parts = template.split('___');

  const handleSubmit = () => {
    if (answer.trim()) {
      const filled = template.replace(/___/g, answer.trim());
      onSubmit(filled);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="rounded-lg bg-slate-800 p-6 font-mono text-base leading-relaxed text-slate-200">
        {parts.map((part, i) => (
          <span key={i}>
            <span>{part}</span>
            {i < parts.length - 1 && (
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder={t('common.tagName')}
                className="mx-1 inline-block w-28 rounded border-2 border-blue-500 bg-slate-900 px-3 py-1 text-center font-mono text-blue-300 outline-none placeholder:text-slate-600 focus:border-blue-400"
                autoFocus
              />
            )}
          </span>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={disabled || !answer.trim()}
        className="self-end rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t('common.confirm')}
      </button>
    </div>
  );
}
