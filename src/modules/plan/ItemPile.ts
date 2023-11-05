import { Item } from '@/modules/api';

export class ItemPile {
  data: Record<Item, number> = {};
  constructor(items: Item[]) {
    items.forEach((item) => this.add(item));
  }

  public add(item: Item): boolean {
    if (this.data[item]) {
      this.data[item]++;
    } else {
      this.data[item] = 1;
    }
    return true;
  }

  public remove(item: Item): boolean {
    if (this.data[item]) {
      if (this.data[item] > 0) {
        this.data[item]--;
      } else {
        delete this.data;
      }
    } else {
      return false;
    }
    return true;
  }

  public toArray(): Item[] {
    for (const [item, quantity] of Object.entries(this.data))
      Object..forEach((item) => this.add(item));
  }
}
