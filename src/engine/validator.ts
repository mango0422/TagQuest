import type { Locale } from '@/i18n';
import {
  CONTENT_MODEL_RULES,
  PARENT_RULES,
  REQUIRED_ATTRIBUTES,
  SINGLETON_TAGS,
} from './contentModel';
import { parseHtml } from './parser';
import ko from '@/i18n/locales/ko.json';
import en from '@/i18n/locales/en.json';

const msgs: Record<Locale, typeof ko.validation> = { ko: ko.validation, en: en.validation };

export interface ValidationError {
  node: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateHtmlStructure(html: string, locale: Locale = 'ko'): ValidationResult {
  const { document: doc } = parseHtml(html);
  const errors: ValidationError[] = [];

  checkContentModel(doc.body, errors, locale);
  checkParentRules(doc.body, errors, locale);
  checkRequiredAttributes(doc.body, errors, locale);
  checkSingletonTags(doc.body, errors, locale);

  return { isValid: errors.length === 0, errors };
}

function checkContentModel(root: Element, errors: ValidationError[], locale: Locale) {
  const walk = (el: Element) => {
    const tag = el.tagName.toLowerCase();
    const rule = CONTENT_MODEL_RULES[tag];

    if (rule) {
      for (const child of el.children) {
        const childTag = child.tagName.toLowerCase();
        if (!rule.allowedChildren.includes(childTag)) {
          errors.push({
            node: childTag,
            message: rule.errorMessage(childTag, locale),
            severity: 'error',
          });
        }
      }
    }

    for (const child of el.children) {
      walk(child);
    }
  };
  walk(root);
}

function checkParentRules(root: Element, errors: ValidationError[], locale: Locale) {
  const walk = (el: Element) => {
    const tag = el.tagName.toLowerCase();
    const rule = PARENT_RULES[tag];

    if (rule && el.parentElement) {
      const parentTag = el.parentElement.tagName.toLowerCase();
      if (!rule.requiredParents.includes(parentTag)) {
        errors.push({
          node: tag,
          message: rule.errorMessage(locale),
          severity: 'error',
        });
      }
    }

    for (const child of el.children) {
      walk(child);
    }
  };
  walk(root);
}

function checkRequiredAttributes(root: Element, errors: ValidationError[], locale: Locale) {
  const walk = (el: Element) => {
    const tag = el.tagName.toLowerCase();
    const rule = REQUIRED_ATTRIBUTES[tag];

    if (rule) {
      for (const attr of rule.attributes) {
        if (!el.hasAttribute(attr)) {
          errors.push({
            node: tag,
            message: rule.errorMessage(attr, locale),
            severity: 'warning',
          });
        }
      }
    }

    for (const child of el.children) {
      walk(child);
    }
  };
  walk(root);
}

function checkSingletonTags(root: Element, errors: ValidationError[], locale: Locale) {
  const dict = msgs[locale] ?? msgs.ko;
  for (const tag of SINGLETON_TAGS) {
    const elements = root.querySelectorAll(tag);
    if (elements.length > 1) {
      errors.push({
        node: tag,
        message: dict.singleton.replace('{tag}', tag),
        severity: 'error',
      });
    }
  }
}
