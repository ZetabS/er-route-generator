import { expect, test } from 'vitest';
import { ITEM, Item, RECIPE } from '@/modules/api/Item';

const swordOfJustice: Item = ITEM[120302];
const material1 = swordOfJustice.material1 as Item;
const material2 = swordOfJustice.material2 as Item;
const rapier = material1.material1 as Item;
const flower = material1.material2 as Item;
const robe = material2.material1 as Item;
const bandage = material2.material2 as Item;
const needle = rapier.material1 as Item;
const scrap = rapier.material2 as Item;

test('new Recipe', () => {
  const recipe1 = RECIPE['활빈검'];
  const recipe2 = RECIPE[120302];
  const recipe3 = RECIPE[swordOfJustice];

  expect(recipe1).toBe(recipe2);
  expect(recipe1).toBe(recipe3);
  expect(recipe2).toBe(recipe3);
});

test('getSubMaterials', () => {
  expect();
});

test('getSubRecipes', () => {
  const recipe = RECIPE['활빈검'];
});
