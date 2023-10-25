import { ref, type Ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { itemData, type Item } from '../assets/data/itemData';
import { useSelectedStore } from './selected';

class Route {}

export const useRouteStore = defineStore('route', () => {
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

  const routeList: Route[] = reactive([]);
  function calculateRoute() {
    const materials = [];

    for (const slotType in selected.selectedItems) {
      const item = selected.selectedItems[slotType]!;
      if (item) {
        materials.push(...getAllMaterials(item));
      }
    }
  }
  return { calculateRoute };
});
