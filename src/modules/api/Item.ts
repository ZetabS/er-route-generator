import type { ItemData } from './typing';
import { itemData } from './data';
import { Recipe } from './Recipe';
import { ITEM, RECIPE } from './proxy';

export class Item {
  private readonly index: number;
  private readonly recipeIndex: number;

  constructor(identifier: number) {
    this.index = itemData.findIndex((item: ItemData): boolean => item.code === identifier);
    this.recipeIndex = recipeData.findIndex((recipe: RecipeData) => recipe.itemCode === identifier);

    if (this.index === -1) {
      throw Error(`Item for ${identifier} not found.`);
    }
  }

  equals(other: Item): boolean {
    return this.index === other.index;
  }

  hashCode(): number {
    return this.index * 3;
  }

  private get data(): ItemData {
    return itemData[this.index];
  }

  get code(): number {
    return this.data.code;
  }

  get name(): string {
    return this.data.name;
  }

  get itemType(): string {
    return this.data.itemType;
  }

  get subType(): string {
    return this.data.subType;
  }

  get itemGrade(): string {
    return this.data.itemGrade;
  }

  get stackable(): number {
    return this.data.stackable;
  }

  get manufacturableType(): number {
    return this.data.manufacturableType;
  }

  get recipe(): Recipe {
    return RECIPE[this.code];
  }

  get craftableItems(): Item[] {
    return ITEM.filter((item: Item) => item.recipe.materials.includes(this));
  }
}
