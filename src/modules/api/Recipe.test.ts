import { expect, test } from 'vitest';
import { RECIPE } from '@/modules/api/Recipe';
import { ITEM, Item } from '@/modules/api/Item';
const swordOfJustice: Item = ITEM[120302];

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
