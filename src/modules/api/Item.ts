import type { ItemData } from './typing';
import { itemData } from './data';
import { Recipe, RECIPE } from './Recipe';

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

  get recipe(): Recipe {
    return RECIPE[this.code];
  }
}

export const ITEM: Record<string | number, Item> = {};

itemData.forEach((rawItem, index) => {
  const item = new Item(index);
  ITEM[rawItem.code] = item;
  ITEM[rawItem.name] = item;
});
