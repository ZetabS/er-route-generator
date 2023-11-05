import type { RecipeData } from './typing';
import { recipeData } from './data';
import { Item } from './Item';
import { ItemStack } from './ItemStack';
import { ITEM } from '@/modules/api/proxy';

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
    return ITEM[this.data.itemCode];
  }

  get result(): ItemStack {
    return new ItemStack(ITEM[this.data.itemCode], this.data.craftCount);
  }

  get materials(): Item[] {
    return [ITEM[this.data.material1], ITEM[this.data.material2]];
  }

  get material1(): Item {
    return ITEM[this.data.material1];
  }

  get material2(): Item {
    return ITEM[this.data.material2];
  }
}
