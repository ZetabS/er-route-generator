import type { ItemData } from './typing';
import { itemData, recipeData } from './data';
import { ITEM } from './proxy';
import { ItemStack } from '@/modules/api/ItemStack';
import { RecipeData } from './typing';

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

  private get recipeData(): RecipeData {
    return recipeData[this.recipeIndex];
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

  get craftResult(): ItemStack | undefined {
    if (this.recipeIndex === -1) {
      return undefined;
    }
    return new ItemStack(this, this.recipeData.craftCount);
  }

  get materials(): Item[] | undefined {
    if (this.recipeIndex === -1) {
      return undefined;
    }
    return [ITEM[this.recipeData.material1], ITEM[this.recipeData.material2]];
  }

  get craftableItems(): Item[] | undefined {
    const craftableItems = ITEM.filter((item: Item) => item.materials?.includes(this));
    if (craftableItems.length === 0) {
      return undefined;
    }
    return craftableItems;
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
}
