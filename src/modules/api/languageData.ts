import { koreanRawData } from '@/modules/api/data/koreanRawData';
import type { LanguageData, QueriedLanguageData, RawData } from '@/common/typing';

export const koreanData = parseLanguageData(koreanRawData);
export const itemNameData: QueriedLanguageData = koreanData['Item/Name/*'] as QueriedLanguageData;

function parseLanguageData(text: string): LanguageData {
  const lines = text.split('\r\n');
  const data: RawData<string> = {};

  for (const line of lines) {
    const [key, value] = line.split('┃');
    data[key] = value;
  }

  return createLanguageProxy(data);
}

function createLanguageProxy(data: RawData<string>): LanguageData {
  return new Proxy(data, {
    get(target: RawData<string>, prop) {
      if (typeof prop === 'string') {
        if (prop.includes('*')) {
          if (!prop.replace('*', '').includes('*')) {
            const record: RawData<string> = {};
            for (const key in target) {
              const pattern = new RegExp(`^${prop.replace(/\*/g, '([^/]*)')}$`);
              record[key.replace(pattern, '$1:')] = target[key];
            }
            return record;
          } else {
            return undefined;
          }
        } else {
          return target[prop];
        }
      } else {
        return undefined;
      }
    }
  });
}
