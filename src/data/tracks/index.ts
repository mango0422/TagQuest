import type { TrackData } from '../schema';
import type { Locale } from '@/i18n';

// Korean (default)
import koTrackA from './ko/track-a.json';
import koTrackC from './ko/track-c.json';
import koTrackD from './ko/track-d.json';
import koTrackE from './ko/track-e.json';

// English
import enTrackA from './en/track-a.json';
import enTrackC from './en/track-c.json';
import enTrackD from './en/track-d.json';
import enTrackE from './en/track-e.json';

const tracksByLocale: Record<Locale, TrackData[]> = {
  ko: [koTrackA as TrackData, koTrackC as TrackData, koTrackD as TrackData, koTrackE as TrackData],
  en: [enTrackA as TrackData, enTrackC as TrackData, enTrackD as TrackData, enTrackE as TrackData],
};

export function getTracks(locale: Locale = 'ko'): TrackData[] {
  return tracksByLocale[locale] ?? tracksByLocale.ko;
}

export function getTrack(trackId: string, locale: Locale = 'ko'): TrackData | undefined {
  return getTracks(locale).find((t) => t.id === trackId);
}

export function getLevel(trackId: string, levelId: string, locale: Locale = 'ko') {
  const track = getTrack(trackId, locale);
  return track?.levels.find((l) => l.id === levelId);
}

export function getNextLevel(trackId: string, currentLevelId: string, locale: Locale = 'ko') {
  const track = getTrack(trackId, locale);
  if (!track) return null;
  const idx = track.levels.findIndex((l) => l.id === currentLevelId);
  if (idx === -1 || idx >= track.levels.length - 1) return null;
  return track.levels[idx + 1];
}
