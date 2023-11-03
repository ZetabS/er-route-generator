import type { RecipeData } from './typing';
import { recipeData } from './data';
import { Item, ItemStack } from '.';

export class Recipe {
  private readonly index: number;

  constructor(identifier: Item | number) {
    if (typeof identifier === 'number') {
      this.index = recipeData.findIndex((recipe: RecipeData) => recipe.itemCode === identifier);
    } else {
      this.index = recipeData.findIndex(
        (recipe: RecipeData) => recipe.itemCode === identifier.code
      );
    }

    if (!this.index) {
      throw Error(`Recipe for ${identifier} not found.`);
    }
  }

  equals(other: Recipe): boolean {
    return this.index === other.index;
  }

  hashCode(): number {
    return this.index * 7;
  }

  private get data(): RecipeData {
    return recipeData[this.index];
  }

  get item(): Item {
    return new Item(this.data.itemCode);
  }

  get result(): ItemStack {
    return new ItemStack(new Item(this.data.itemCode), this.data.craftCount);
  }

  get materials(): Item[] {
    return [new Item(this.data.material1), new Item(this.data.material2)];
  }

  get material1(): Item {
    return new Item(this.data.material1);
  }

  get material2(): Item {
    return new Item(this.data.material2);
  }
}
