import { Item, ITEM, ITEM_BY_NAME } from '@/modules/api';

const swordOfJustice: Item = ITEM[120302];
const blooming = swordOfJustice.material1 as Item;
const robePlus = swordOfJustice.material2 as Item;
const rapier = blooming.material1 as Item;
const flower = blooming.material2 as Item;
const robe = robePlus.material1 as Item;
const bandage = robePlus.material2 as Item;
const needle = rapier.material1 as Item;
const scrap = rapier.material2 as Item;

test('parentItems', () => {
  expect(scrap.parentItems?.includes(rapier)).toBe(true);
});

test('subItems', () => {
  expect(swordOfJustice.recipe?.subItems.toString()).toBe(
    `[바늘(120101): 1, 레이피어(120201): 1, 블루밍(120301): 1, 활빈검(120302): 1, 승복(202103): 1, 덧댄 로브(202206): 1, 붕대(203102): 1, 꽃(205102): 1, 고철(401106): 1]`
  );

  expect(ITEM_BY_NAME['지휘관의 갑옷'].recipe?.subItems.toString()).toBe(
    `[곡괭이(105102): 0.5, 쇠사슬(119101): 1, 천 갑옷(202106): 1, 가죽 갑옷(202201): 1, 사슬 갑옷(202302): 1, 지휘관의 갑옷(202412): 1, 가죽(401103): 1, 원석(401114): 0.5, 황금(401214): 1]`
  );

  expect(ITEM_BY_NAME['황금'].recipe?.subItems.toString()).toBe(
    `[곡괭이(105102): 0.5, 원석(401114): 0.5, 황금(401214): 1]`
  );

  expect(ITEM_BY_NAME['왕관'].recipe?.subItems.toString()).toBe(
    `[가위(101101): 1, 곡괭이(105102): 0.5, 모자(201102): 1, 베레모(201203): 1, 왕관(201401): 1, 원석(401114): 0.5, 황금(401214): 1]`
  );
});
