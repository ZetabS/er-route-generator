import { PlanState } from '@/modules/plan/Plan';
import { Inventory } from '@/modules/plan';
import { AREA, Area, ITEM, Item } from '@/modules/api';
import { calculateInventory, State } from '@/modules/plan/calculateInventory';
import {
  getSubItems,
  type SeparatedMaterials,
  separateMaterialsByRequirement
} from '@/modules/plan/utils';
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
    ITEM['활빈검'],
    ITEM['지휘관의 갑옷'],
    ITEM['제국 왕관'],
    ITEM['드라우프니르'],
    ITEM['SCV']
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
    const currentArea: Area = AREA['병원'];
    const plannedArea: Area[] = [AREA['고급 주택가'], AREA['숲']];

    const separatedMaterials: SeparatedMaterials = separateMaterialsByRequirement(
      planState.remainMaterials,
      currentArea,
      plannedArea
    );

    const initialState: State = new State(
      planState.craftedInventory,
      separatedMaterials.requiredMaterials,
      planState.craftingItems
    );

    const result: State = calculateInventory(initialState, false);

    expect(result.inventory.toString()).toBe(
      `Inventory: [Slot 6: 가위(101101): 1, Slot 7: 붕대(203102): 1, Slot 8: 가죽(401103): 2, Slot 9: 고철(401106): 1, Slot 10: 배터리(401110): 1], Equipment: [Weapon: 바늘(120101), Chest: Empty, Head: Empty, Arm: 붕대(203102), Leg: Empty]`
    );

    const craftedResult: State = calculateInventory(initialState, true);

    expect(craftedResult.inventory.toString()).toBe(
      `Inventory: [Slot 7: 가위(101101): 1, Slot 8: 붕대(203102): 1, Slot 9: 가죽(401103): 1, Slot 10: 배터리(401110): 1], Equipment: [Weapon: 레이피어(120201), Chest: Empty, Head: Empty, Arm: 브레이서(203203), Leg: Empty]`
    );
  });
});
