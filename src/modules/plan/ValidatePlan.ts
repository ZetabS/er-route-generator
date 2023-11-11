import type { Area, Item } from '@/modules/api';
import { ItemPile } from '@/modules/plan/ItemPile';
import { getState, getSubItems } from '@/modules/plan/utils';
import { ItemGrade } from '@/modules/api/enums';
import { Inventory } from '@/modules/plan/Inventory';
import { calculateInventory, State } from '@/modules/plan/calculateInventory';
import { PlanState } from '@/modules/plan/Plan';

export function validatePlan(targetItems: Item[], _route: Area[]): [PlanState[], boolean] {
  const planStates: PlanState[] = [];

  const initialSubMaterials: ItemPile = getSubItems(targetItems);
  const initialRemainMaterials: ItemPile = initialSubMaterials.filter(
    (item: Item) => item.itemGrade === ItemGrade.Common
  );

  const initialCraftingItems: ItemPile = initialSubMaterials.filter(
    (item: Item) => item.itemGrade !== ItemGrade.Common
  );

  const allAreaItems: ItemPile = _route.reduce(
    (result: ItemPile, area: Area) => result.merge(area.areaItems).merge(area.collectableItems),
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
