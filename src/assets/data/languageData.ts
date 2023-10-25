import { rawKoreanData } from './rawKoreanData';

interface WrappedData {
  [key: string]: WrappedData | any;
}

function createWrappedData(data: WrappedData): WrappedData {
  return new Proxy(data, {
    get(target, keyStr: string) {
      if (typeof keyStr === 'string') {
        const keys = keyStr.split('/');
        let currentObject = target;

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key in currentObject) {
            const value = currentObject[key];
            if (i === keys.length - 1) {
              if (typeof value === 'object' && 'value' in value) {
                return value.value;
              } else {
                return createWrappedData(value);
              }
            } else {
              currentObject = value;
            }
          } else {
            return undefined;
          }
        }
      } else {
        return undefined;
      }
    }
  });
}

export function parseLanguageData(text: string): WrappedData {
  const lines = text.split('\n');
  const data: WrappedData = {};

  for (const line of lines) {
    const [keyStr, value] = line.split('┃');
    const keys = keyStr.split('/');
    let currentObject = data;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i === keys.length - 1) {
        currentObject[key] = { value };
      } else {
        currentObject[key] = currentObject[key] || {};
        currentObject = currentObject[key];
      }
    }
  }

  return createWrappedData(data);
}

export const koreanData = parseLanguageData(rawKoreanData);
export const itemNameData = koreanData['Item/Name'];
