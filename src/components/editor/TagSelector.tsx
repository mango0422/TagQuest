'use client';

import { useState } from 'react';

interface TagSelectorProps {
  options: string[];
  onSelect: (tag: string) => void;
  disabled?: boolean;
  selectedTag?: string | null;
  correctTag?: string;
}

export default function TagSelector({
  options,
  onSelect,
  disabled = false,
  selectedTag,
  correctTag,
}: TagSelectorProps) {
  const [selected, setSelected] = useState<string | null>(selectedTag ?? null);

  const handleSelect = (tag: string) => {
    if (disabled) return;
    setSelected(tag);
    onSelect(tag);
  };

  const getButtonStyle = (tag: string) => {
    if (!selected) {
      return 'border-slate-600 bg-slate-800 text-slate-200 hover:border-blue-500 hover:bg-slate-700';
    }
    if (tag === selected) {
      if (correctTag) {
        return tag === correctTag
          ? 'border-green-500 bg-green-900/50 text-green-300'
          : 'border-red-500 bg-red-900/50 text-red-300';
      }
      return 'border-blue-500 bg-blue-900/50 text-blue-300';
    }
    if (correctTag && tag === correctTag) {
      return 'border-green-500 bg-green-900/50 text-green-300';
    }
    return 'border-slate-700 bg-slate-800/50 text-slate-400';
  };

  return (
    <div className="flex flex-wrap gap-3 p-4">
      {options.map((tag) => (
        <button
          key={tag}
          onClick={() => handleSelect(tag)}
          disabled={disabled}
          className={`rounded-xl border-2 px-6 py-3 font-mono text-lg transition-all ${getButtonStyle(tag)} ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {'<'}{tag}{'>'}
        </button>
      ))}
    </div>
  );
}
