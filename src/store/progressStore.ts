import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LevelProgress {
  levelId: string;
  completed: boolean;
  completedAt?: string;
  usedHint: boolean;
  attempts: number;
}

interface ProgressStore {
  progress: Record<string, LevelProgress>;
  currentTrackId: string | null;
  currentLevelId: string | null;

  completeLevel: (levelId: string, usedHint: boolean) => void;
  incrementAttempt: (levelId: string) => void;
  setCurrentLevel: (trackId: string, levelId: string) => void;
  isCompleted: (levelId: string) => boolean;
  getTrackProgress: (trackId: string, levelIds: string[]) => number;
  getAttempts: (levelId: string) => number;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: {},
      currentTrackId: null,
      currentLevelId: null,

      completeLevel: (levelId, usedHint) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [levelId]: {
              levelId,
              completed: true,
              completedAt: new Date().toISOString(),
              usedHint,
              attempts: state.progress[levelId]?.attempts ?? 1,
            },
          },
        })),

      incrementAttempt: (levelId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [levelId]: {
              ...state.progress[levelId],
              levelId,
              completed: state.progress[levelId]?.completed ?? false,
              usedHint: state.progress[levelId]?.usedHint ?? false,
              attempts: (state.progress[levelId]?.attempts ?? 0) + 1,
            },
          },
        })),

      setCurrentLevel: (trackId, levelId) =>
        set({ currentTrackId: trackId, currentLevelId: levelId }),

      isCompleted: (levelId) => !!get().progress[levelId]?.completed,

      getTrackProgress: (_trackId, levelIds) => {
        const completed = levelIds.filter((id) => get().isCompleted(id)).length;
        return levelIds.length > 0
          ? Math.round((completed / levelIds.length) * 100)
          : 0;
      },

      getAttempts: (levelId) => get().progress[levelId]?.attempts ?? 0,
    }),
    { name: 'tagquest-progress' }
  )
);
