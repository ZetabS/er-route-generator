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

  get equipType(): string | undefined {
    return this.data.equipType;
  }

  get craftResult(): ItemStack | undefined {
    if (this.recipeIndex === -1) {
      return undefined;
    }
    return new ItemStack(this, this.recipeData.craftCount);
  }

  get materials(): [Item, Item] | undefined {
    if (this.recipeIndex === -1) {
      return undefined;
    }
    return [ITEM[this.recipeData.material1], ITEM[this.recipeData.material2]];
  }

  get craftableItems(): Item[] {
    return ITEM.filter((item: Item) => item.recipe.materials.includes(this));
  }

  get allMaterials(): Item[] {
    const stack: Item[] = [this];
    const result: Item[] = [];

    while (stack.length > 0) {
      const currentItem: Item = stack.pop();

      if (currentItem.materials) {
        stack.push(...currentItem.materials);
      } else {
        result.push(currentItem);
      }
    }

    return result;
  }

  get recipe(): Recipe {
    return RECIPE[this.code];
  }
}
