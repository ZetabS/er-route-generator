import { useSelectedStore } from '@/stores/selected';
import type { Item } from '@/common/typing';
import itemData from '@/modules/api/data/itemData';
import { Inventory } from '@/modules/plan/Inventory';

const selected = useSelectedStore();

function calculateRoute() {
  const materials = [];

  for (const slotType in selected.items) {
    const item = selected.items[slotType]!;
    if (item) {
      materials.push(...getAllMaterials(item));
    }
  }
}
