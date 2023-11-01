import type { Area } from '@/common/typing';
import type { Inventory } from '@/modules/plan/Inventory';
import { Item } from '@/common/typing';
import itemData from '@/modules/api/data/itemData';
import {getItemByCode} from "@/modules/api/apiService";

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

function calculateInventory(inventory: Inventory, area: Area) {
  const materials = [];
  this.targetItems.forEach((targetItem: Item) => materials.push(...getAllMaterials(targetItem)));

    for (const itemSpawn of area.itemSpawns) {
      if (getItemByCode(itemSpawn.code) === )

  }
}

function getRemainMaterials(inventory: Inventory, item: Item): Item[] {
  const canManufacture = item.manufacturableType === 0;
  if (canManufacture) {
    return [
      ...getAllMaterials(itemData[item.makeMaterial1]),
      ...getAllMaterials(itemData[item.makeMaterial2])
    ];
  } else {
    return [item];
  }
}

function getAllMaterials(item: Item): Item[] {
  const canManufacture = item.manufacturableType === 0;
  if (canManufacture) {
    return [
      ...getAllMaterials(itemData[item.makeMaterial1]),
      ...getAllMaterials(itemData[item.makeMaterial2])
    ];
  } else {
    return [item];
  }
}
