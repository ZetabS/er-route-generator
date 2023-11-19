import type { Item, ItemData } from './types';
import { itemsData } from './data/itemsData';
import { EquipType, ItemGrade, ItemType, SubType } from './enums';

export const ITEM: Record<number, Item> = {};
export const ITEM_BY_NAME: Record<string, Item> = {};

class BaseItem implements Item {
  private readonly index: number;
  private readonly _name: string;

  constructor(index: number) {
    if (index === -1) {
      throw Error(`Item not found.`);
    }
    this.index = index;
    this._name = this.data.name;
  }

  private get data(): ItemData {
    return itemsData[this.index];
  }

  equals(other: any): boolean {
    return this.index === other?.index && this.code === other?.code;
  }

  toString(): string {
    return `${this.name}(${this.data.code})`;
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

  get initialCount(): number {
    return this.data.initialCount;
  }

  get equipType(): EquipType | undefined {
    return this.data.equipType;
  }

  get materials(): [Item, Item] | undefined {
    const material1 = this.material1;
    const material2 = this.material2;

    if (material1 && material2) {
      return [ITEM[this.data.makeMaterial1], ITEM[this.data.makeMaterial2]];
    }

    return undefined;
  }

  get material1(): Item | undefined {
    return ITEM[this.data.makeMaterial1];
  }

  get material2(): Item | undefined {
    return ITEM[this.data.makeMaterial2];
  }

  get parentItems(): Item[] {
    return this.data.parentItem.map((code) => ITEM[code]);
  }
}

for (const itemData of itemsData) {
  const index = itemsData.indexOf(itemData);
  const item = new BaseItem(index);
  ITEM[item.code] = item;
  ITEM_BY_NAME[item.name] = item;
}
