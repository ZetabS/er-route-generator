import type { AreaData, ItemSpawnData } from './typing';
import { areaData } from './data';
import { ItemStack } from './ItemStack';
import { AREA, ITEM } from '@/modules/api/proxy';

export class Area {
  private readonly index: number;

  constructor(identifier: number) {
    this.index = areaData.findIndex((area: AreaData): boolean => area.code === identifier);

    if (this.index === -1) {
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
    return this.data.nearByAreaCodes.map((areaCode) => AREA[areaCode]);
  }

  get areaItems(): ItemStack[] {
    return this.data.itemSpawns.map(
      (itemSpawn: ItemSpawnData) => new ItemStack(ITEM[itemSpawn.itemCode], itemSpawn.dropCount)
    );
  }
}
