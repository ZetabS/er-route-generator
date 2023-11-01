import type { Area, Item } from '@/common/typing';
import type { Inventory } from '@/modules/plan/Inventory';
import { itemData } from '@/modules/api/data/itemData';
import { getItemByCode } from '@/modules/api/apiService';
import { getRecipeByCode } from '@/modules/api/apiService';

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

export function findMaterialsInArea(targetItems: Item[], area: Area) {
  return getAllMaterials(targetItems).reduce((result: Item[], material: Item) => {
    area.itemSpawns;
    return result;
  }, []);
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
