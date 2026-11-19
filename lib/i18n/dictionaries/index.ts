import en, { type Dictionary } from './en';
import vi from './vi';
import type { Locale } from '../config';

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, vi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}
