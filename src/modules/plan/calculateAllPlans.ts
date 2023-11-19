import { Plan } from './Plan';
import { getSubItems } from './utils';
import { AREA, ItemPile, ItemGrade } from '@/modules/api';
import type { Area, Item } from '@/modules/api';

export type Route = Area[];

export interface RouteState {
  currentRoute: Route;
  remainMaterials: ItemPile;
}

export function calculateAllPlans(targetItems: Item[], maxLength: number = 4): Plan[] {
  const result: Plan[] = [];
  const stack: RouteState[] = [];
  const initialRemainMaterials = targetItems
    .reduce((result, item) => {
      return item.materials ? result.merge(getSubItems(item)) : result;
    }, new ItemPile())
    .filter((item) => item.itemGrade === ItemGrade.Common);

  for (const area of Object.values(AREA)) {
    stack.push({
      currentRoute: [area],
      remainMaterials: initialRemainMaterials.difference(area.areaItems)
    });
  }

  while (stack.length > 0) {
    const { currentRoute, remainMaterials }: RouteState = stack.pop() as RouteState;
    if (remainMaterials.isEmpty()) {
      result.push(new Plan(currentRoute, targetItems));
      continue;
    }

    if (currentRoute.length >= maxLength) {
      continue;
    }

    const currentArea = currentRoute[currentRoute.length - 1];
    const nearByAreas = currentArea.isHyperLoopInstalled
      ? Object.values(AREA)
      : currentArea.nearByArea;

    for (const nextArea of nearByAreas) {
      if (currentRoute.includes(nextArea)) {
        continue;
      }

      const nextRoute: Route = [...currentRoute, nextArea];
      const nextRemainMaterials = remainMaterials.difference(nextArea.areaItems);

      stack.push({
        currentRoute: nextRoute,
        remainMaterials: nextRemainMaterials
      });
    }
  }

  return result;
}
