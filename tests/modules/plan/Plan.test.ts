import { AREA_BY_NAME, type Item, ITEM, ITEM_BY_NAME } from '@/modules/api';
import { Plan } from '@/modules/plan/Plan';
import v8Profiler from 'v8-profiler-next';
import * as fs from 'fs';

v8Profiler.setGenerateType(1);
const title = 'Plan.test-profile';

describe('Plan', () => {
  v8Profiler.startProfiling(title, true);
  afterAll(() => {
    const profile = v8Profiler.stopProfiling(title);
    profile.export(function (error, result: any) {
      fs.writeFileSync(`cpuprofile/${title}.cpuprofile`, result);
      profile.delete();
    });
  });

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

    expect(plan.inventoryAt(2)?.toString()).toBe(
      `Inventory[
Slot: [],
Equipment: [Weapon: 활빈검(120302), Chest: 지휘관의 갑옷(202412), Head: 제국 왕관(201409), Arm: 드라우프니르(203403), Leg: SCV(204415)]
]`
    );
  });

  test('constructor', () => {
    const plan = new Plan(route, [swordOfJustice]);
    expect(plan.targetItems).toStrictEqual([swordOfJustice]);

    expect(plan.inventoryAt(0)?.toArray().sort()).toStrictEqual([bandage, rapier].sort());
    expect(plan.inventoryAt(1)?.toArray().sort()).toStrictEqual([bandage, blooming].sort());
    expect(plan.inventoryAt(2)?.toArray().sort()).toStrictEqual([swordOfJustice].sort());
  });

  test('empty route', () => {
    const plan = new Plan([], [swordOfJustice]);
    expect(plan.inventoryAt(0)).toBeUndefined();
  });
});
