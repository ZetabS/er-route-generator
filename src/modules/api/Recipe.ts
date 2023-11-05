import type { RecipeData } from './typing';
import { itemData, recipeData } from './data';
import { Item, ITEM } from './Item';

export class Recipe {
  private readonly index: number;
  private readonly _name: string;
  private readonly;

  constructor(index: number) {
    if (index === -1) {
      throw Error(`Recipe not found.`);
    }
    this.index = index;
    this._name = this.item.name;
  }

  equals(other: Recipe): boolean {
    return this.index === other.index;
  }

  hashCode(): number {
    return this.index * 7;
  }

  toString(): string {
    return 'R' + this._name;
  }

  private get data(): RecipeData {
    return recipeData[this.index];
  }

  get item(): Item {
    return ITEM[this.data.itemCode];
  }

  get result(): Item[] {
    const result: Item[] = [];
    for (let i = 0; i < this.data.craftCount; i++) {
      result.push(ITEM[this.data.itemCode]);
    }
    return result;
  }

  get materials(): [Item, Item] {
    return [ITEM[this.data.material1], ITEM[this.data.material2]];
  }

  get material1(): Item {
    return ITEM[this.data.material1];
  }

  get material2(): Item {
    return ITEM[this.data.material2];
  }

  getSubMaterials(): Item[] {
    const result: Item[] = [];
    const stack: Item[] = [];
    stack.push(this.material1);
    stack.push(this.material2);

    while (stack.length > 0) {
      const item = stack.pop();

      if (!item.recipe || result.includes(item)) {
        continue;
      }

      result.push(item);
      stack.push(item.material1);
      stack.push(item.material2);
    }

    return result;
  }

  getSubRecipes(): Recipe[] {
    const result: Recipe[] = [];
    const stack: Recipe[] = [];
    stack.push(this);

    while (stack.length > 0) {
      const recipe = stack.pop();

      if (!recipe.item.recipe.materials || result.includes(recipe)) {
        continue;
      }

      result.push(recipe);
      stack.push(...recipe.materials);
    }

    return result;
  }
}

export const RECIPE: Record<string | number, Recipe> = {};

recipeData.forEach((rawRecipe, index) => {
  const recipe = new Recipe(index);
  RECIPE[rawRecipe.itemCode] = recipe;
  RECIPE[ITEM[rawRecipe.itemCode]] = recipe;
  RECIPE[ITEM[rawRecipe.itemCode].name] = recipe;
});
