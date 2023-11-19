import type { Area, AreaData } from './types';
import { areasData } from './data/areasData';
import { ITEM } from '@/modules/api/Item';
import { ItemPile } from '@/modules/api/ItemPile';

export const AREA: Record<string | number, Area> = {};
export const AREA_BY_NAME: Record<string | number, Area> = {};

class BaseArea implements Area {
  private readonly index: number;
  private readonly _name: string;

  constructor(index: number) {
    if (index === -1) {
      throw Error(`Area not found.`);
    }
    this.index = index;
    this._name = this.data.name;
  }

  equals(other: any): boolean {
    return this.index === other?.index && this.code === other?.code;
  }

  private get data(): AreaData {
    return areasData[this.index];
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

for (const areaData of areasData) {
  const index = areasData.indexOf(areaData);
  const area = new BaseArea(index);
  AREA[areaData.code] = area;
  AREA_BY_NAME[areaData.name] = area;
}
