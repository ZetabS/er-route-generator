import type { LanguageData } from './typing';
import { itemData, recipeData, areaData, koreanRawData } from './data';
import { Item } from './Item';
import { Recipe } from './Recipe';
import { Area } from './Area';

export const ITEM: Item[] = new Proxy(
  itemData.map((item) => new Item(item.code)),
  {
    get(target: Item[], prop: string) {
      return target.find((item) => item.code.toString() === prop || item.name === prop);
    }
  }
);

export const RECIPE: Recipe[] = new Proxy(
  recipeData.map((recipe) => new Recipe(recipe.itemCode)),
  {
    get(target: Recipe[], prop: string) {
      return target.find(
        (recipe) => recipe.item.code.toString() === prop || recipe.item.name === prop
      );
    }
  }
);

export const AREA: Area[] = new Proxy(
  areaData.map((area) => new Area(area.code)),
  {
    get(target: Area[], prop: string) {
      return target.find((area) => area.code.toString() === prop || area.name === prop);
    }
  }
);

export const koreanData: LanguageData = parseLanguageData(koreanRawData);

function parseLanguageData(text: string): LanguageData {
  const lines = text.split('\r\n');
  const data: Record<string, string> = {};

  for (const line of lines) {
    const [key, value] = line.split('┃');
    data[key] = value;
  }

  return createLanguageProxy(data);
}

function createLanguageProxy(data: Record<string, string>): LanguageData {
  return new Proxy(data, {
    get(target: Record<string, string>, prop) {
      if (typeof prop === 'string') {
        if (prop.includes('*')) {
          if (!prop.replace('*', '').includes('*')) {
            const record: Record<string, string> = {};
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
