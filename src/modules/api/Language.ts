import { koreanData } from './data/koreanData';
import type { Key, LanguageData } from '@/modules/api/types';

export const languageData: Record<string, LanguageData> = {
  korean: koreanData
};

export function queryLanguageData(query: string, lang: string = 'korean'): Record<Key, string> {
  const selectedLanguageData = languageData[lang];
  const starCount = query.split('*').length - 1;

  if (starCount !== 1) {
    return undefined as any;
  }

  const data: Record<string, string> = {};
  const pattern = new RegExp(`^${query.replace('*', '([^/]+)')}$`);

  for (const key in selectedLanguageData) {
    const matched = key.match(pattern);
    if (matched) {
      data[matched[1]] = selectedLanguageData[key];
    }
  }
  return data;
}
