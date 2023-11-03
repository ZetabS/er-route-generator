import type { AreaData, ItemSpawnData } from './typing';
import { areaData } from './data';
import { Item, ItemStack } from '.';

export class Area {
  private readonly index: number;

  constructor(identifier: string | number) {
    if (typeof identifier === 'number') {
      this.index = areaData.findIndex((area: AreaData): boolean => area.code === identifier);
    } else {
      this.index = areaData.findIndex((area: AreaData): boolean => area.name === identifier);
    }

    if (!this.index) {
      throw Error(`Area ${identifier} not found.`);
    }
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
    return this.data.name;
  }

  get isHyperLoopInstalled(): boolean {
    return this.data.isHyperLoopInstalled;
  }

  get nearByArea(): Area[] {
    return this.data.nearByAreaCodes.map((areaCode) => new Area(areaCode));
  }

  get gettableItems(): ItemStack[] {
    return this.data.itemSpawns.map(
      (itemSpawn: ItemSpawnData) => new ItemStack(new Item(itemSpawn.itemCode), itemSpawn.dropCount)
    );
  }
}
