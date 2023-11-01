import type { Area, Item, ItemSpawn } from '@/common/typing';
import type { Inventory } from '@/modules/plan/Inventory';
import { itemData } from '@/modules/api/data/itemData';
import { getItemByCode, getRecipeByCode } from '@/modules/api/apiService';

export class Plan {
  private readonly targetItems: Item[];
  private route: Area[] = [];
  private inventory: Inventory[] = [];

  constructor(...targetItems: []) {
    this.targetItems = [...targetItems];
  }

  appendPath(area: Area) {
    this.route.push(area);
  }
}

export function calculateInventory(targetItems: Item[], inventory: Inventory, area: Area) {
  const materials: Item[] = [];
  targetItems.forEach((targetItem: Item) => materials.push(...getMaterials(targetItem)));
}

export function findMaterialsInArea(area: Area, targetItems: Item[]) {
  const materials: Item[] = getAllMaterials(targetItems);
  const result: Item[] = [];

  for (const itemSpawn of area.itemSpawns) {
    const areaItem: Item = getItemByCode(itemSpawn.itemCode);
    let dropCount: number = itemSpawn.dropCount;

    for (const material of materials) {
      if (areaItem === material && dropCount) {
        dropCount--;
        result.push(areaItem);
      }
    }
  }
  return result;
}

// function addMaterialsToInventory(inventory: Inventory, area: Area): boolean {
//   for (const itemSpawn of area.itemSpawns) {
//     const item = getItemByCode(itemSpawn.code);
//     if (materials.includes(item)) {
//       return
//     }
//   }
//
//   return false;
// }

export function getMaterials(item: Item): Item[] {
  if (item && item.itemGrade !== 'Common' && item.manufacturableType === 0) {
    const recipe = getRecipeByCode(item.code);
    return [
      ...getMaterials(getItemByCode(recipe.material1)),
      ...getMaterials(getItemByCode(recipe.material2))
    ];
  } else {
    return [item];
  }
}

export function getAllMaterials(items: Item[]): Item[] {
  return items.map((item: Item) => getMaterials(item)).flat();
}
