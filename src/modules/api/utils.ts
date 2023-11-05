import type { Item, Recipe } from './Item';

export function getAllSubRecipes(item: Item) {
  const recipe = new Recipe(item);
  if (item.manufacturableType === 0) {
    return [];
  } else {
    return [recipe, ...getAllSubRecipes(recipe.material1), ...getAllSubRecipes(recipe.material2)];
  }
}
