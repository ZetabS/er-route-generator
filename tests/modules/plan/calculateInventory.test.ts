import { PlanState } from '@/modules/plan/Plan';
import { Inventory } from '@/modules/plan';
import { Area, AREA_BY_NAME, ITEM, Item, ITEM_BY_NAME } from '@/modules/api';
import { calculateInventory, State } from '@/modules/plan/calculateInventory';
import { getState, getSubItems } from '@/modules/plan/utils';
import { ItemPile } from '@/modules/plan/ItemPile';

import { ItemGrade } from '@/modules/api/enums';

describe('calculateInventory', () => {
  const swordOfJustice: Item = ITEM[120302];
  const blooming = swordOfJustice.material1 as Item;
  const robePlus = swordOfJustice.material2 as Item;
  const rapier = blooming.material1 as Item;
  const flower = blooming.material2 as Item;
  const robe = robePlus.material1 as Item;
  const bandage = robePlus.material2 as Item;
  const needle = rapier.material1 as Item;
  const scrap = rapier.material2 as Item;

  const targetItems: Item[] = [
    ITEM_BY_NAME['활빈검'],
    ITEM_BY_NAME['지휘관의 갑옷'],
    ITEM_BY_NAME['제국 왕관'],
    ITEM_BY_NAME['드라우프니르'],
    ITEM_BY_NAME['SCV']
  ];

  test('calculateInventory', () => {
    const initialSubMaterials: ItemPile = getSubItems(targetItems);
    const initialRemainMaterials: ItemPile = initialSubMaterials.filter(
      (item: Item) => item.itemGrade === ItemGrade.Common
    );

    const initialCraftingItems: ItemPile = initialSubMaterials.filter(
      (item: Item) => item.itemGrade !== ItemGrade.Common
    );

    const planState: PlanState = new PlanState(
      new Inventory(),
      new Inventory(),
      initialRemainMaterials,
      initialCraftingItems
    );
    const currentArea: Area = AREA_BY_NAME['병원'];
    const plannedAreas: Area[] = [AREA_BY_NAME['고급 주택가'], AREA_BY_NAME['숲']];

    const initialState = getState(planState, currentArea, plannedAreas);

    const [result, canBeInvalidByInsertOrder]: [State | undefined, boolean] = calculateInventory(
      initialState,
      false
    );

    expect(result?.remainRequiredMaterials.toArray()).toStrictEqual([]);
    expect(result?.remainOptionalMaterials.toArray()).toStrictEqual([]);
    expect(result?.addedItems.toArray().sort()).toStrictEqual(
      [
        ITEM_BY_NAME['가위'],
        ITEM_BY_NAME['붕대'],
        ITEM_BY_NAME['붕대'],
        ITEM_BY_NAME['가죽'],
        ITEM_BY_NAME['가죽'],
        ITEM_BY_NAME['고철'],
        ITEM_BY_NAME['배터리'],
        ITEM_BY_NAME['바늘']
      ].sort()
    );
    expect(result?.inventory.toArray().sort()).toStrictEqual(
      [
        ITEM_BY_NAME['가위'],
        ITEM_BY_NAME['붕대'],
        ITEM_BY_NAME['붕대'],
        ITEM_BY_NAME['가죽'],
        ITEM_BY_NAME['가죽'],
        ITEM_BY_NAME['고철'],
        ITEM_BY_NAME['배터리'],
        ITEM_BY_NAME['바늘']
      ].sort()
    );

    const [craftedResult]: [State | undefined, boolean] = calculateInventory(initialState, true);
    expect(craftedResult?.inventory.toArray().sort()).toStrictEqual(
      [
        ITEM_BY_NAME['가위'],
        ITEM_BY_NAME['붕대'],
        ITEM_BY_NAME['가죽'],
        ITEM_BY_NAME['배터리'],
        ITEM_BY_NAME['레이피어'],
        ITEM_BY_NAME['브레이서']
      ].sort()
    );
  });
});
