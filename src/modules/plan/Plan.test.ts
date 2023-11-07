import { AREA, Item, ITEM } from '@/modules/api';
import { Plan } from '@/modules/plan/Plan';
import { Inventory } from '@/modules/plan/Inventory';
import { calculateInventory, findInArea, findNecessary } from '@/modules/plan/utils';
import type { ItemPile } from '@/modules/plan/ItemPile';

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

  const route = [AREA['병원'], AREA['고급 주택가'], AREA['숲']];

  test('plan', () => {
    const plan = new Plan(route, [
      ITEM['활빈검'],
      ITEM['지휘관의 갑옷'],
      ITEM['황실 부르고넷'],
      ITEM['드라우프니르'],
      ITEM['SCV']
    ]);

    console.log(plan.inventoryAt(0).toArray + '');
    console.log(plan.inventoryAt(1).toArray + '');
    console.log(plan.inventoryAt(2).toArray + '');
  });

  test('new Plan', () => {
    const plan = new Plan(route, [swordOfJustice]);
    expect(plan.targetItems).toStrictEqual([swordOfJustice]);
    console.log(plan.inventoryAt(0).toArray + '');
    console.log(plan.inventoryAt(1).toArray + '');
    console.log(plan.inventoryAt(2).toArray + '');

    expect(plan.inventoryAt(0).toArray.sort()).toStrictEqual([bandage, scrap, needle].sort());
    expect(plan.inventoryAt(1).toArray.sort()).toStrictEqual(
      [bandage, scrap, needle, flower].sort()
    );
    expect(plan.inventoryAt(2).toArray.sort()).toStrictEqual(
      [bandage, scrap, needle, flower, robe].sort()
    );
  });

  test('exploreAllPath', () => {
    const targetItems = [swordOfJustice];
    const foundMaterials: ItemPile = new ItemPile([bandage, scrap, needle]);
    console.log(foundMaterials + '');

    const [completeInventory, invalidState] = calculateInventory(
      targetItems,
      new Inventory(),
      foundMaterials
    );
    if (completeInventory) {
      console.log(completeInventory.toArray + '');
      expect(completeInventory.toArray.sort()).toStrictEqual(foundMaterials.sort());
    }
  });

  test('findNecessary', () => {
    const [foundMaterials, remainMaterials] = findInArea(
      swordOfJustice.recipe?.getCommonMaterials() as ItemPile,
      AREA['병원']
    );
    const [necessaryMaterials, unnecessaryMaterials] = findNecessary(foundMaterials, [
      AREA['호텔']
    ]);
    expect(necessaryMaterials.toArray().sort()).toStrictEqual([bandage].sort());
    expect(unnecessaryMaterials.toArray().sort()).toStrictEqual([scrap, needle].sort());
  });

  test('findInArea', () => {
    const [foundMaterials, remainMaterials] = findInArea(
      swordOfJustice.recipe?.getCommonMaterials() as ItemPile,
      AREA['병원']
    );

    expect(foundMaterials.toArray().sort()).toStrictEqual([bandage, scrap, needle].sort());
    expect(remainMaterials.toArray().sort()).toStrictEqual([robe, flower].sort());
  });
});
