import { State } from './calculateInventory';
import type { PlanState } from './Plan';
import { ItemPile } from '@/modules/api';
import type { Area, Item } from '@/modules/api';

export function getSubItems(item: Item): ItemPile {
  const result: ItemPile = new ItemPile();
  const stack: [Item, number][] = [];
  stack.push([item, 1]);

  while (stack.length > 0) {
    const [item, quantity] = stack.pop() as [Item, number];
    result.add(item, quantity);
    const material1 = item.material1;
    const material2 = item.material2;

    if (material1 && material2) {
      const materialQuantity = quantity / item.initialCount;
      stack.push([material1, materialQuantity]);
      stack.push([material2, materialQuantity]);
    }
  }

  return result;
}

export function getSubItemsByTargetItems(targetItems: Item[]) {
  return targetItems.reduce(
    (itemPile: ItemPile, item: Item) => itemPile.merge(getSubItems(item)),
    new ItemPile()
  );
  // .map((i, q) => [i, Math.max(q, 1)]);
}

export function getMaterialsInArea(remainMaterials: ItemPile, area: Area): ItemPile {
  return remainMaterials
    .intersection(area.areaItems)
    .map((item, quantity) => [item, Math.ceil(quantity)]);
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
