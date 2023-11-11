import { Area, AREA, AREA_BY_NAME, Item, ITEM, ITEM_BY_NAME } from '@/modules/api';
import { Plan, PlanState } from '@/modules/plan/Plan';
import { Inventory } from '@/modules/plan/Inventory';
import { calculateInventory, State } from '@/modules/plan/calculateInventory';
import { ItemPile } from '@/modules/plan/ItemPile';
import { ItemGrade } from '@/modules/api/enums';

describe('Plan', () => {
  const swordOfJustice: Item = ITEM[120302];
  const blooming = swordOfJustice.material1 as Item;
  const robePlus = swordOfJustice.material2 as Item;
  const rapier = blooming.material1 as Item;
  const flower = blooming.material2 as Item;
  const robe = robePlus.material1 as Item;
  const bandage = robePlus.material2 as Item;
  const needle = rapier.material1 as Item;
  const scrap = rapier.material2 as Item;

  const route = [AREA_BY_NAME['병원'], AREA_BY_NAME['고급 주택가'], AREA_BY_NAME['숲']];

  const targetItems: Item[] = [
    ITEM_BY_NAME['활빈검'],
    ITEM_BY_NAME['지휘관의 갑옷'],
    ITEM_BY_NAME['제국 왕관'],
    ITEM_BY_NAME['드라우프니르'],
    ITEM_BY_NAME['SCV']
  ];

  test('plan', () => {
    const plan = new Plan(route, targetItems);

    expect(plan.inventoryAt(0).toString()).toBe(
      'Inventory: [Slot 7: 가위(101101): 1, Slot 8: 브레이서(203203): 1, Slot 9: 가죽(401103): 1, Slot 10: 배터리(401110): 1], Equipment: [Weapon: 레이피어(120201), Chest: Empty, Head: Empty, Arm: 붕대(203102), Leg: Empty]'
    );
    expect(plan.inventoryAt(1).toString()).toBe(
      'Inventory: [Slot 6: 붕대(203102): 1, Slot 7: 브레이서(203203): 1, Slot 8: 리본(205103): 1, Slot 9: 가죽(401103): 1, Slot 10: 전자 부품(401211): 1], Equipment: [Weapon: 블루밍(120301), Chest: Empty, Head: 베레모(201203), Arm: 팔찌(203104), Leg: 운동화(204102)]'
    );
    expect(plan.inventoryAt(2).toString()).toBe(
      'Inventory: [], Equipment: [Weapon: 활빈검(120302), Chest: 지휘관의 갑옷(202412), Head: 제국 왕관(201409), Arm: 드라우프니르(203403), Leg: SCV(204415)]'
    );
  });

  test('constructor', () => {
    const plan = new Plan(route, [swordOfJustice]);
    expect(plan.targetItems).toStrictEqual([swordOfJustice]);

    expect(plan.inventoryAt(0).toArray().sort()).toStrictEqual([bandage, rapier].sort());
    expect(plan.inventoryAt(1).toArray().sort()).toStrictEqual([bandage, blooming].sort());
    expect(plan.inventoryAt(2).toArray().sort()).toStrictEqual([swordOfJustice].sort());
  });

  test('empty route', () => {
    const plan = new Plan([], [swordOfJustice]);
    expect(plan.inventoryAt(0)).toBeUndefined();
  });
});
