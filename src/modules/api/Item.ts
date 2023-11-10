import type { EquipType, ItemData, ItemGrade, ItemType, SubType } from './typing';
import { itemData } from './data';
import { ItemPile } from '@/modules/plan/ItemPile';

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
    return `${this.name}(${this.data.code})`;
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

  get itemType(): ItemType {
    return this.data.itemType;
  }

  get subType(): SubType {
    return this.data.subType;
  }

  get itemGrade(): ItemGrade {
    return this.data.itemGrade;
  }

  get stackable(): number {
    return this.data.stackable;
  }

  get manufacturableType(): number {
    return this.data.manufacturableType;
  }

  get equipType(): EquipType | undefined {
    return this.data.equipType;
  }

  get initialCount(): number {
    return this.data.initialCount;
  }

  get recipe(): Recipe | undefined {
    return RECIPE[this.code];
  }

  get materials(): [Item, Item] | undefined {
    if (this.recipe) {
      return this.recipe.materials;
    } else {
      return undefined;
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
export const ITEM_BY_NAME: Record<string | number, Item> = {};

itemData.forEach((rawItem, index) => {
  const item = new Item(index);
  ITEM[rawItem.code] = item;
  ITEM_BY_NAME[rawItem.name] = item;
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

  get subItems(): ItemPile {
    const result: ItemPile = new ItemPile();
    const stack: [Item, number][] = [];
    result.add(this.item);
    stack.push([this.material1, 1 / this.item.initialCount]);
    stack.push([this.material2, 1 / this.item.initialCount]);

    while (stack.length > 0) {
      const [item, quantity] = stack.pop() as [Item, number];
      result.add(item, quantity);

      if (!item.recipe) {
        continue;
      }

      const materialQuantity = quantity / item.initialCount;
      stack.push([item.recipe.material1, materialQuantity]);
      stack.push([item.recipe.material2, materialQuantity]);
    }

    return result;
  }
}

export const RECIPE: Record<string | number, Recipe> = {};
export const RECIPE_BY_NAME: Record<string | number, Recipe> = {};

itemData.forEach((rawItem, index) => {
  if (rawItem.makeMaterial1) {
    const recipe = new Recipe(index);
    RECIPE[rawItem.code] = recipe;
    RECIPE_BY_NAME[ITEM[rawItem.code].name] = recipe;
  }
});
