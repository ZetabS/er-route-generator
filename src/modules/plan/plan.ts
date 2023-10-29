import { useSelectedStore } from '@/stores/selected';
import type { Item } from '@/common/typing';
import itemData from '@/modules/api/data/itemData';

const selected = useSelectedStore();

function getAllMaterials(item: Item): Array<Item> {
  if (!item) {
    console.log('그거 아이템목록에 안넣음 ㅅㄱ');
    return [];
  }
  console.log(item.name);
  if (item.manufacturableType == 1) {
    // 만들 수 없음
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
