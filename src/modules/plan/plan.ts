import { useSelectedStore } from '@/stores/selected';
import type { Item } from '@/common/typing';
import itemData from '@/modules/api/data/itemData';
import { Inventory } from '@/modules/plan/Inventory';

const selected = useSelectedStore();

function getAllMaterials(item: Item): Item[] {
  if (!item) {
    throw Error(`이건 왜 없냐?`);
    // return [];
  }

  const canManufacture = item.manufacturableType === 1;
  if (canManufacture) {
    return [item];
  } else {
    return [
      ...getAllMaterials(itemData[item.makeMaterial1]),
      ...getAllMaterials(itemData[item.makeMaterial2])
    ];
  }
}

function calculateRoute() {
  const materials = [];

  for (const slotType in selected.items) {
    const item = selected.items[slotType]!;
    if (item) {
      materials.push(...getAllMaterials(item));
    }
  }
}
