import { Area, Item } from '@/modules/api';
import { ItemPile } from '@/modules/plan/ItemPile';

export function getSubItems(targetItems: Item[]) {
  return targetItems.reduce((itemPile: ItemPile, item: Item) => {
    if (item.recipe) {
      return itemPile.merge(item.recipe.subItems);
    } else {
      return itemPile;
    }
  }, new ItemPile());
  // .map((i, q) => [i, Math.max(q, 1)]);
}

export function getMaterialsInArea(remainMaterials: ItemPile, area: Area): ItemPile {
  return remainMaterials.intersection(area.areaItems);
}

export function getCollectableItems(remainMaterials: ItemPile, area: Area): ItemPile {
  return area.collectableItems
    .reduce((result: ItemPile, item) => {
      result.add(item, 10);
      return result;
    }, new ItemPile())
    .intersection(remainMaterials);
}

export interface SeparatedMaterials {
  requiredMaterials: ItemPile;
  optionalMaterials: ItemPile;
}

export function separateMaterialsByRequirement(
  remainMaterials: ItemPile,
  area: Area,
  plannedAreas: Area[]
): SeparatedMaterials {
  const collectableItems: ItemPile = getCollectableItems(remainMaterials, area);
  const materialsInArea: ItemPile = getMaterialsInArea(remainMaterials, area).merge(
    collectableItems
  );
  const plannedAreasItems: ItemPile = new ItemPile();
  plannedAreas.reduce(
    (result: ItemPile, area: Area) =>
      result.merge(area.areaItems).merge(getCollectableItems(remainMaterials, area)),
    new ItemPile()
  );
  const requiredMaterials: ItemPile = materialsInArea.difference(plannedAreasItems);
  const optionalMaterials: ItemPile = materialsInArea.intersection(plannedAreasItems);
  return { requiredMaterials, optionalMaterials };
}
