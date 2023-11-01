import { itemData } from '@/modules/api/data/itemData';
import { recipeData } from '@/modules/api/data/recipeData';
import { koreanRawData } from '@/modules/api/data/koreanRawData';
import type {
  Area,
  Item,
  LanguageData,
  QueriedLanguageData,
  RawData,
  Recipe
} from '@/common/typing';
import { areaData } from '@/modules/api/data/areaData';

export function getItemByCode(code: number): Item {
  const item = itemData.find((item: Item) => item.code === code);
  if (item) {
    return item;
  } else {
    throw Error(`Item ${code} not found.`);
  }
}

export function getRecipeByCode(code: number): Recipe {
  const recipe = recipeData.find((recipe: Recipe) => recipe.itemCode === code);
  if (recipe) {
    return recipe;
  } else {
    throw Error(`Recipe for ${code} not found.`);
  }
}

export function getRecipeByMaterial(code: number): Recipe {
  const recipe = recipeData.find(
    (recipe: Recipe) => recipe.material1 === code || recipe.material2 === code
  );
  if (recipe) {
    return recipe;
  } else {
    throw Error(`Recipe by ${code} not found.`);
  }
}

export function getAreaByCode(code: number): Area {
  const area = areaData.find((area: Area) => area.code === code);
  if (area) {
    return area;
  } else {
    throw Error(`Area ${code} not found.`);
  }
}

export const koreanData: LanguageData = parseLanguageData(koreanRawData);
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
