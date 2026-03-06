import type { Locale } from '@/i18n';
import ko from '@/i18n/locales/ko.json';
import en from '@/i18n/locales/en.json';

const msgs: Record<Locale, typeof ko.validation> = {
  ko: ko.validation,
  en: en.validation,
};

function v(locale: Locale, key: keyof typeof ko.validation, params?: Record<string, string>) {
  let msg = msgs[locale]?.[key] ?? msgs.ko[key];
  if (params) {
    for (const [k, val] of Object.entries(params)) {
      msg = msg.replace(new RegExp(`\\{${k}\\}`, 'g'), val);
    }
  }
  return msg;
}

export interface ContentModelRule {
  allowedChildren: string[];
  errorMessage: (child: string, locale?: Locale) => string;
}

export interface ParentRule {
  requiredParents: string[];
  errorMessage: (locale?: Locale) => string;
}

export interface RequiredAttributeRule {
  attributes: string[];
  errorMessage: (attr: string, locale?: Locale) => string;
}

export const CONTENT_MODEL_RULES: Record<string, ContentModelRule> = {
  ul: {
    allowedChildren: ['li'],
    errorMessage: (child, locale = 'ko') => v(locale, 'ulChild', { child }),
  },
  ol: {
    allowedChildren: ['li'],
    errorMessage: (child, locale = 'ko') => v(locale, 'olChild', { child }),
  },
  table: {
    allowedChildren: ['thead', 'tbody', 'tfoot', 'tr', 'caption', 'colgroup'],
    errorMessage: (child, locale = 'ko') => v(locale, 'tableChild', { child }),
  },
  tr: {
    allowedChildren: ['td', 'th'],
    errorMessage: (child, locale = 'ko') => v(locale, 'trChild', { child }),
  },
  select: {
    allowedChildren: ['option', 'optgroup'],
    errorMessage: (child, locale = 'ko') => v(locale, 'selectChild', { child }),
  },
  dl: {
    allowedChildren: ['dt', 'dd', 'div'],
    errorMessage: (child, locale = 'ko') => v(locale, 'dlChild', { child }),
  },
};

export const PARENT_RULES: Record<string, ParentRule> = {
  li: {
    requiredParents: ['ul', 'ol', 'menu'],
    errorMessage: (locale = 'ko') => v(locale, 'liParent'),
  },
  td: {
    requiredParents: ['tr'],
    errorMessage: (locale = 'ko') => v(locale, 'tdParent'),
  },
  th: {
    requiredParents: ['tr'],
    errorMessage: (locale = 'ko') => v(locale, 'thParent'),
  },
  dt: {
    requiredParents: ['dl'],
    errorMessage: (locale = 'ko') => v(locale, 'dtParent'),
  },
  dd: {
    requiredParents: ['dl'],
    errorMessage: (locale = 'ko') => v(locale, 'ddParent'),
  },
  caption: {
    requiredParents: ['table'],
    errorMessage: (locale = 'ko') => v(locale, 'captionParent'),
  },
  figcaption: {
    requiredParents: ['figure'],
    errorMessage: (locale = 'ko') => v(locale, 'figcaptionParent'),
  },
};

export const REQUIRED_ATTRIBUTES: Record<string, RequiredAttributeRule> = {
  img: {
    attributes: ['alt'],
    errorMessage: (attr, locale = 'ko') => v(locale, 'imgAlt', { attr }),
  },
  a: {
    attributes: ['href'],
    errorMessage: (attr, locale = 'ko') => v(locale, 'aHref', { attr }),
  },
};

export const SINGLETON_TAGS = ['main', 'title'];
