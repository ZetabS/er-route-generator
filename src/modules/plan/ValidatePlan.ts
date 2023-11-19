import { PlanState } from './Plan';
import { Inventory } from './Inventory';
import { getState, getSubItemsByTargetItems } from './utils';
import { calculateInventory } from './calculateInventory';
import type { Area, Item } from '@/modules/api';
import { ItemPile, ItemGrade } from '@/modules/api';

export function validatePlan(targetItems: Item[], _route: Area[]): [PlanState[], boolean] {
  const planStates: PlanState[] = [];

  const initialSubMaterials: ItemPile = getSubItemsByTargetItems(targetItems);
  const initialRemainMaterials: ItemPile = initialSubMaterials.filter(
    (item: Item) => item.itemGrade === ItemGrade.Common
  );

  const initialCraftingItems: ItemPile = initialSubMaterials.filter(
    (item: Item) => item.itemGrade !== ItemGrade.Common
  );

  const allAreaItems: ItemPile = _route.reduce(
    (result: ItemPile, area: Area) => result.merge(area.areaItems),
    new ItemPile()
  );

  if (!initialRemainMaterials.difference(allAreaItems).isEmpty()) {
    return [planStates, false];
  }

  const planState: PlanState = new PlanState(
    new Inventory(),
    new Inventory(),
    initialRemainMaterials,
    initialCraftingItems
  );

  for (let routeNumber = 0; routeNumber < _route.length; routeNumber++) {
    const currentArea: Area = _route[routeNumber];
    const plannedAreas: Area[] = [..._route.slice(routeNumber + 1, length)];

    const initialState = getState(planState, currentArea, plannedAreas);

    planState.remainMaterials = planState.remainMaterials
      .difference(initialState.remainRequiredMaterials)
      .difference(initialState.remainOptionalMaterials);

    const [result, canBeInvalidByInsertOrder] = calculateInventory(initialState, false);
    const [craftedResult] = calculateInventory(initialState, true);

    if (!result || !craftedResult) {
      return [planStates, false];
    }

    planState.inventory = result.inventory;
    planState.craftedInventory = craftedResult.inventory;
    planState.craftingItems = craftedResult.craftingItems;
    planStates.push(planState.clone());
  }
  return [planStates, true];
}
