'use client';

import Link from 'next/link';
import { getTracks } from '@/data/tracks';
import { useProgressStore } from '@/store/progressStore';
import { useTranslation } from '@/i18n';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';

export default function TracksPage() {
  const { getTrackProgress } = useProgressStore();
  const { t, locale } = useTranslation();
  const tracks = getTracks(locale);

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Tag<span className="text-blue-400">Quest</span>
          </Link>
          <LocaleSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-bold text-white">{t('tracks.title')}</h1>
        <p className="mb-8 text-slate-400">{t('tracks.description')}</p>

        <div className="space-y-4">
          {tracks.map((track) => {
            const levelIds = track.levels.map((l) => l.id);
            const progress = getTrackProgress(track.id, levelIds);

            return (
              <Link
                key={track.id}
                href={`/tracks/${track.id}`}
                className="group block rounded-xl border border-slate-700 bg-slate-800/30 p-6 transition-colors hover:border-slate-500 hover:bg-slate-800/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                      style={{ backgroundColor: track.color + '33' }}
                    >
                      {track.id.split('-')[1]?.toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white group-hover:text-blue-400">
                        {track.title}
                      </h2>
                      <p className="text-sm text-slate-400">{track.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">
                      {track.levels.length} {t('common.levels')}
                    </div>
                    {progress > 0 && (
                      <div className="mt-1 text-sm font-medium text-green-400">{progress}%</div>
                    )}
                  </div>
                </div>

                {progress > 0 && (
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
