import { expect, test } from 'vitest';
import { Item, ITEM, RECIPE } from '@/modules/api';

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

test('getCommonMaterials', () => {
  expect(swordOfJustice.recipe?.getCommonMaterials().toArray().sort()).toStrictEqual(
    [flower, robe, bandage, needle, scrap].sort()
  );
});

test('getSubMaterials', () => {
  expect(swordOfJustice.recipe?.getSubMaterials().toArray().sort()).toStrictEqual(
    [swordOfJustice, blooming, robePlus, rapier, flower, robe, bandage, needle, scrap].sort()
  );
});
