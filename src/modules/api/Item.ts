import type { ItemData } from './typing';
import { itemData } from './data';

export class Item {
  private readonly index: number;
  private readonly _name: string;

  constructor(index: number) {
    if (index === -1) {
      throw Error(`Item not found.`);
    }
    this.index = index;
    this._name = this.data.name;
  }

  equals(other: Item): boolean {
    return this.index === other.index;
  }

  hashCode(): number {
    return this.index * 3;
  }

  toString(): string {
    return this.name;
  }

  private get data(): ItemData {
    return itemData[this.index];
  }

  get code(): number {
    return this.data.code;
  }

  get name(): string {
    return this._name;
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

  get recipe(): Recipe | undefined {
    return RECIPE[this.code];
  }

  get materials(): [Item, Item] {
    if (this.recipe) {
      return this.recipe.materials;
    } else {
      return [];
    }
  }

  get material1(): Item | undefined {
    return this.recipe?.material1;
  }

  get material2(): Item | undefined {
    return this.recipe?.material2;
  }

  get parentItems(): Item[] {
    return this.data.parentItem.map((code) => ITEM[code]);
  }
}

export const ITEM: Record<string | number, Item> = {};

itemData.forEach((rawItem, index) => {
  const item = new Item(index);
  ITEM[rawItem.code] = item;
  ITEM[rawItem.name] = item;
});

export class Recipe {
  private readonly index: number;
  private readonly _name: string;

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

  private get data(): ItemData {
    return itemData[this.index];
  }

  get item(): Item {
    if (!ITEM) throw Error('뷁');
    return ITEM[this.data.code];
  }

  get result(): Item[] {
    const result: Item[] = [];
    const item = ITEM[this.data.code];
    for (let i = 0; i < this.data.initialCount; i++) {
      result.push(item);
    }
    return result;
  }

  get materials(): [Item, Item] {
    return [ITEM[this.data.makeMaterial1], ITEM[this.data.makeMaterial2]];
  }

  get material1(): Item {
    return ITEM[this.data.makeMaterial1];
  }

  get material2(): Item {
    return ITEM[this.data.makeMaterial2];
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
    const stack: Item[] = [];
    result.push(this);
    stack.push(this.material1);
    stack.push(this.material2);

    while (stack.length > 0) {
      const item = stack.pop();

      if (!item.materials || result.includes(item.recipe)) {
        continue;
      }

      result.push(item.recipe);
      stack.push(...item.materials);
    }

    return result;
  }
}

export const RECIPE: Record<string | number, Recipe> = {};

itemData.forEach((rawItem, index) => {
  if (rawItem.makeMaterial1) {
    const recipe = new Recipe(index);
    RECIPE[rawItem.code] = recipe;
    RECIPE[ITEM[rawItem.code].name] = recipe;
  }
});
