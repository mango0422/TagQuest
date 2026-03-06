'use client';

import type { ValidationError } from '@/engine/validator';

interface FeedbackPanelProps {
  errors: ValidationError[];
  className?: string;
}

export default function FeedbackPanel({ errors, className = '' }: FeedbackPanelProps) {
  if (errors.length === 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {errors.map((error, i) => (
        <div
          key={i}
          className={`flex items-start gap-2 rounded-lg px-4 py-3 text-sm ${
            error.severity === 'error'
              ? 'bg-red-950/50 text-red-300'
              : 'bg-yellow-950/50 text-yellow-300'
          }`}
        >
          <span className="mt-0.5">
            {error.severity === 'error' ? '⚠' : '💡'}
          </span>
          <span>{error.message}</span>
        </div>
      ))}
    </div>
  );
}
