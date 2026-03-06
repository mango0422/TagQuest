'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTrack, getLevel, getNextLevel } from '@/data/tracks';
import { useTranslation } from '@/i18n';
import LevelPlayer from '@/components/layout/LevelPlayer';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';
import { notFound } from 'next/navigation';

export default function LevelPage({
  params,
}: {
  params: Promise<{ trackId: string; levelId: string }>;
}) {
  const { trackId, levelId } = use(params);
  const { t, locale } = useTranslation();
  const router = useRouter();
  const track = getTrack(trackId, locale);
  const level = getLevel(trackId, levelId, locale);

  if (!track || !level) {
    notFound();
  }

  const nextLevel = getNextLevel(trackId, levelId, locale);

  const handleNext = () => {
    if (nextLevel) {
      router.push(`/tracks/${trackId}/levels/${nextLevel.id}`);
    } else {
      router.push(`/tracks/${trackId}`);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <div className="flex items-center gap-3">
          <Link
            href={`/tracks/${trackId}`}
            className="text-sm text-slate-400 hover:text-white"
          >
            ← {track.title}
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-sm text-slate-300">
            {level.order} / {track.levels.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {level.order > 1 && (
            <Link
              href={`/tracks/${trackId}/levels/${track.levels[level.order - 2].id}`}
              className="rounded px-3 py-1 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ← {t('common.prev')}
            </Link>
          )}
          {nextLevel && (
            <Link
              href={`/tracks/${trackId}/levels/${nextLevel.id}`}
              className="rounded px-3 py-1 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              {t('common.next')} →
            </Link>
          )}
          <LocaleSwitcher />
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <LevelPlayer
          level={level}
          hasNext={!!nextLevel}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
