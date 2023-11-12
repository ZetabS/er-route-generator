import { Area, Item } from '@/modules/api';
import { ItemPile } from '@/modules/plan/ItemPile';
import { State } from '@/modules/plan/calculateInventory';
import type { PlanState } from '@/modules/plan/Plan';

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

export interface SeparatedMaterials {
  requiredMaterials: ItemPile;
  optionalMaterials: ItemPile;
}

export function separateMaterialsByRequirement(
  remainMaterials: ItemPile,
  area: Area,
  plannedAreas: Area[]
): SeparatedMaterials {
  const materialsInArea: ItemPile = getMaterialsInArea(remainMaterials, area);
  const plannedAreasItems: ItemPile = plannedAreas.reduce(
    (result: ItemPile, area: Area) => result.merge(area.areaItems),
    new ItemPile()
  );
  const requiredMaterials: ItemPile = materialsInArea.difference(plannedAreasItems);
  const optionalMaterials: ItemPile = materialsInArea.intersection(plannedAreasItems);
  return { requiredMaterials, optionalMaterials };
}

export function getState(planState: PlanState, area: Area, plannedAreas: Area[]): State {
  const separatedMaterials: SeparatedMaterials = separateMaterialsByRequirement(
    planState.remainMaterials,
    area,
    plannedAreas
  );

  return new State(
    planState.craftedInventory,
    separatedMaterials.requiredMaterials,
    separatedMaterials.optionalMaterials,
    planState.craftingItems,
    new ItemPile()
  );
}
