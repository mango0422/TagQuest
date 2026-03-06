import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import ko from './locales/ko.json';
import en from './locales/en.json';

export type Locale = 'ko' | 'en';

const messages: Record<Locale, typeof ko> = { ko, en };

interface I18nStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useI18nStore = create<I18nStore>()(
  persist(
    (set) => ({
      locale: 'ko',
      setLocale: (locale) => set({ locale }),
    }),
    { name: 'tagquest-locale' }
  )
);

type NestedKeyOf<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeyOf<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeyOf<typeof ko>;

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

export function useTranslation() {
  const { locale, setLocale } = useI18nStore();
  const dict = messages[locale];

  function t(key: string, params?: Record<string, string>): string {
    let value = getNestedValue(dict as unknown as Record<string, unknown>, key);
    if (value === undefined) {
      // Fallback to Korean
      value = getNestedValue(ko as unknown as Record<string, unknown>, key);
    }
    if (typeof value !== 'string') return key;

    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), v),
        value
      );
    }
    return value;
  }

  function tArray(key: string): string[] {
    const value = getNestedValue(dict as unknown as Record<string, unknown>, key);
    if (Array.isArray(value)) return value as string[];
    return [];
  }

  return { t, tArray, locale, setLocale };
}
