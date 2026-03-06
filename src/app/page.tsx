'use client';

import Link from 'next/link';
import { getTracks } from '@/data/tracks';
import { useTranslation } from '@/i18n';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';

export default function Home() {
  const { t, locale } = useTranslation();
  const tracks = getTracks(locale);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <header className="relative flex flex-col items-center justify-center px-6 py-20">
        <div className="absolute right-6 top-6">
          <LocaleSwitcher />
        </div>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white">
          Tag<span className="text-blue-400">Quest</span>
        </h1>
        <p className="mb-2 text-xl text-slate-300">
          {t('landing.subtitle')}
        </p>
        <p className="mb-8 max-w-md text-center text-slate-400">
          {t('landing.description')}
        </p>
        <Link
          href="/tracks"
          className="rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-500"
        >
          {t('landing.startButton')}
        </Link>
      </header>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <div className="mb-3 text-2xl">🎯</div>
            <h3 className="mb-2 font-semibold text-white">{t('landing.featureTarget')}</h3>
            <p className="text-sm text-slate-400">{t('landing.featureTargetDesc')}</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <div className="mb-3 text-2xl">⚡</div>
            <h3 className="mb-2 font-semibold text-white">{t('landing.featureFeedback')}</h3>
            <p className="text-sm text-slate-400">{t('landing.featureFeedbackDesc')}</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <div className="mb-3 text-2xl">📐</div>
            <h3 className="mb-2 font-semibold text-white">{t('landing.featureStructure')}</h3>
            <p className="text-sm text-slate-400">{t('landing.featureStructureDesc')}</p>
          </div>
        </div>
      </section>

      {/* Track Preview */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold text-white">{t('landing.tracks')}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tracks.map((track) => (
            <Link
              key={track.id}
              href={`/tracks/${track.id}`}
              className="group rounded-xl border border-slate-700 bg-slate-800/30 p-5 transition-colors hover:border-slate-500 hover:bg-slate-800/60"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: track.color }}
                />
                <h3 className="font-semibold text-white group-hover:text-blue-400">
                  {track.title}
                </h3>
                <span className="text-sm text-slate-500">
                  {track.levels.length} {t('common.levels')}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{track.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        {t('landing.footer')}
      </footer>
    </div>
  );
}
