import type { AreaData, ItemSpawnData } from './typing';
import { areaData } from './data';
import { Item, ITEM } from '@/modules/api/Item';
import { ItemPile } from '@/modules/plan/ItemPile';

export class Area {
  private readonly index: number;
  private readonly _name: string;

  constructor(index: number) {
    if (index === -1) {
      throw Error(`Area not found.`);
    }
    this.index = index;
    this._name = this.data.name;
  }

  equals(other: Area): boolean {
    return this.index === other.index;
  }

  hashCode(): number {
    return this.index * 5;
  }

  private get data(): AreaData {
    return areaData[this.index];
  }

  get code(): number {
    return this.data.code;
  }

  get name(): string {
    return this._name;
  }

  get isHyperLoopInstalled(): boolean {
    return this.data.isHyperLoopInstalled;
  }

  get nearByArea(): Area[] {
    return this.data.nearByAreaCodes.map((areaCode) => AREA[areaCode]);
  }

  get areaItems(): ItemPile {
    const itemPile = new ItemPile();

    for (const itemSpawn of this.data.itemSpawns) {
      itemPile.add(ITEM[itemSpawn.itemCode], itemSpawn.dropCount);
    }

    for (const itemCode of this.data.collectableItems) {
      itemPile.add(ITEM[itemCode], 4);
    }

    return itemPile;
  }

  get nonCollectableItems(): ItemPile {
    const itemPile = new ItemPile();

    for (const itemSpawn of this.data.itemSpawns) {
      itemPile.add(ITEM[itemSpawn.itemCode], itemSpawn.dropCount);
    }

    return itemPile;
  }

  get collectableItems(): ItemPile {
    const itemPile = new ItemPile();

    for (const itemCode of this.data.collectableItems) {
      itemPile.add(ITEM[itemCode], 4);
    }

    return itemPile;
  }
}

export const AREA: Record<string | number, Area> = {};
export const AREA_BY_NAME: Record<string | number, Area> = {};

areaData.forEach((rawArea, index) => {
  const item = new Area(index);
  AREA[rawArea.code] = item;
  AREA_BY_NAME[rawArea.name] = item;
});
