import { Area, AREA_BY_NAME, Item, ITEM, ITEM_BY_NAME } from '@/modules/api';
import { getState, getSubItems, separateMaterialsByRequirement } from '@/modules/plan/utils';
import { ItemPile } from '@/modules/plan/ItemPile';
import { PlanState } from '@/modules/plan/Plan';
import { Inventory } from '@/modules/plan';
import { ItemGrade } from '@/modules/api/typing';

describe('plan/utils', () => {
  const swordOfJustice: Item = ITEM[120302];
  const blooming = swordOfJustice.material1 as Item;
  const robePlus = swordOfJustice.material2 as Item;
  const rapier = blooming.material1 as Item;
  const flower = blooming.material2 as Item;
  const robe = robePlus.material1 as Item;
  const bandage = robePlus.material2 as Item;
  const needle = rapier.material1 as Item;
  const scrap = rapier.material2 as Item;
  const tights = ITEM_BY_NAME['타이즈'];
  const leather = ITEM_BY_NAME['가죽'];

  const targetItems: Item[] = [
    ITEM_BY_NAME['활빈검'],
    ITEM_BY_NAME['지휘관의 갑옷'],
    ITEM_BY_NAME['제국 왕관'],
    ITEM_BY_NAME['드라우프니르'],
    ITEM_BY_NAME['SCV']
  ];

  test('getSubMaterials', () => {
    expect(
      getSubItems([
        ITEM_BY_NAME['왕관'],
        ITEM_BY_NAME['지휘관의 갑옷'],
        ITEM_BY_NAME['황금']
      ]).toString()
    ).toBe(
      `[가위(101101): 1, 곡괭이(105102): 1.5, 쇠사슬(119101): 1, 모자(201102): 1, 베레모(201203): 1, 왕관(201401): 1, 천 갑옷(202106): 1, 가죽 갑옷(202201): 1, 사슬 갑옷(202302): 1, 지휘관의 갑옷(202412): 1, 가죽(401103): 1, 원석(401114): 1.5, 황금(401214): 3]`
    );

    expect(getSubItems([ITEM_BY_NAME['왕관'], ITEM_BY_NAME['지휘관의 갑옷']]).toString()).toBe(
      `[가위(101101): 1, 곡괭이(105102): 1, 쇠사슬(119101): 1, 모자(201102): 1, 베레모(201203): 1, 왕관(201401): 1, 천 갑옷(202106): 1, 가죽 갑옷(202201): 1, 사슬 갑옷(202302): 1, 지휘관의 갑옷(202412): 1, 가죽(401103): 1, 원석(401114): 1, 황금(401214): 2]`
    );

    expect(getSubItems([ITEM_BY_NAME['금팔찌']]).toString()).toBe(
      `[곡괭이(105102): 0.5, 팔찌(203104): 1, 금팔찌(203302): 1, 원석(401114): 0.5, 황금(401214): 1]`
    );
  });

  test('separateMaterialsByRequirement', () => {
    const remainMaterials = new ItemPile([bandage, robe, tights, leather]);

    const separatedMaterials = separateMaterialsByRequirement(
      remainMaterials,
      AREA_BY_NAME['병원'],
      [AREA_BY_NAME['고급 주택가'], AREA_BY_NAME['숲']]
    );

    expect(separatedMaterials.requiredMaterials.toString()).toBe('[붕대(203102): 1]');
    expect(separatedMaterials.optionalMaterials.toString()).toBe(
      '[타이즈(204103): 1, 가죽(401103): 1]'
    );
  });

  test('getState', () => {
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

    expect(initialState.toString()).toBe(
      `State[
inventory: Inventory[
Slot: [],
Equipment: [Weapon: Empty, Chest: Empty, Head: Empty, Arm: Empty, Leg: Empty]
], 
remainRequiredMaterials: [가위(101101): 1, 바늘(120101): 1, 붕대(203102): 2, 고철(401106): 1, 배터리(401110): 1]], 
remainOptionalMaterials: [가죽(401103): 2]], 
craftingItems: [레이피어(120201): 1, 블루밍(120301): 1, 활빈검(120302): 1, 베레모(201203): 1, 왕관(201401): 1, 제국 왕관(201409): 1, 가죽 갑옷(202201): 1, 덧댄 로브(202206): 1, 사슬 갑옷(202302): 1, 지휘관의 갑옷(202412): 1, 브레이서(203203): 1, 금팔찌(203302): 1, 드라우프니르(203403): 1, 힐리스(204204): 1, SCV(204415): 1, 전자 부품(401211): 1, 황금(401214): 3]
]`
    );
  });
});
