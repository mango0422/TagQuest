'use client';

import { use } from 'react';
import Link from 'next/link';
import { getTrack } from '@/data/tracks';
import { useProgressStore } from '@/store/progressStore';
import { useTranslation } from '@/i18n';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';
import { notFound } from 'next/navigation';

const PROBLEM_TYPE_KEY: Record<string, string> = {
  TAG_SELECT: 'level.tagSelect',
  FILL_BLANK: 'level.fillBlank',
  DIRECT_INPUT: 'level.directInput',
  FIX_ERROR: 'level.fixError',
  SEMANTIC_CHOICE: 'level.semanticChoice',
  SORT_ORDER: 'level.sortOrder',
  BLOCK_ASSEMBLE: 'level.blockAssemble',
};

export default function TrackDetailPage({
  params,
}: {
  params: Promise<{ trackId: string }>;
}) {
  const { trackId } = use(params);
  const { t, locale } = useTranslation();
  const track = getTrack(trackId, locale);
  const { isCompleted } = useProgressStore();

  if (!track) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/tracks" className="text-sm text-slate-400 hover:text-white">
              {t('tracks.backToTracks')}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-sm text-white">{track.title}</span>
          </div>
          <LocaleSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl text-xl font-bold text-white"
            style={{ backgroundColor: track.color + '33' }}
          >
            {track.id.split('-')[1]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{track.title}</h1>
            <p className="text-slate-400">{track.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          {track.levels.map((level, index) => {
            const completed = isCompleted(level.id);
            const isFirst = index === 0;
            const prevCompleted = index > 0 && isCompleted(track.levels[index - 1].id);
            const unlocked = isFirst || prevCompleted || completed;

            return (
              <div key={level.id}>
                {unlocked ? (
                  <Link
                    href={`/tracks/${trackId}/levels/${level.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/30 p-5 transition-colors hover:border-slate-500 hover:bg-slate-800/60"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                        completed
                          ? 'bg-green-900/50 text-green-400'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {completed ? '✓' : level.order}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white group-hover:text-blue-400">
                        {level.title}
                      </h3>
                      <p className="text-sm text-slate-400">{level.learningPoint}</p>
                    </div>
                    <span className="rounded-lg bg-slate-700/50 px-3 py-1 text-xs text-slate-400">
                      {t(PROBLEM_TYPE_KEY[level.problemType] ?? level.problemType)}
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-800/10 p-5 opacity-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm text-slate-500">
                      🔒
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-500">{level.title}</h3>
                      <p className="text-sm text-slate-600">{level.learningPoint}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
