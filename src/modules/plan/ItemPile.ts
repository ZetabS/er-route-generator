import { ITEM, Item } from '@/modules/api';

export class ItemPile {
  private data: Map<Item, number> = new Map<Item, number>();

  constructor(...items: Item[]) {
    items.forEach((item) => this.add(item));
  }

  public toString(): string {
    const entries: [number, number][] = [];
    for (const [item, quantity] of this.data.entries()) {
      entries.push([item.code, quantity]);
    }

    const itemsString = entries
      .sort(([a], [b]) => a - b)
      .map(([itemCode, quantity]) => `${ITEM[itemCode]}: ${quantity}`)
      .join(', ');

    return `[${itemsString}]`;
  }

  public hashCode(): number {
    let hash = 0;

    for (const [item, quantity] of this.data.entries()) {
      hash += item.code * 101 + quantity;
    }

    return hash;
  }

  public toArray(): Item[] {
    const array: Item[] = [];
    for (const [item, quantity] of this.data.entries()) {
      for (let i = 0; i < quantity; i++) {
        array.push(item);
      }
    }
    return array;
  }

  public get length(): number {
    return this.data.size;
  }

  public get count(): number {
    let count = 0;
    for (const quantity of this.data.values()) {
      count += quantity;
    }
    return count;
  }

  public forEach(callback: (item: Item, quantity: number) => void) {
    for (const [item, quantity] of this.data.entries()) {
      callback(item, quantity);
    }
  }

  public [Symbol.iterator](): Iterator<[Item, number]> {
    return this.data.entries();
  }

  public every(callback: (item: Item, quantity: number) => boolean): boolean {
    for (const [item, quantity] of this.data.entries()) {
      for (let i = 0; i < quantity; i++) {
        if (!callback(item, quantity)) {
          return false;
        }
      }
    }
    return true;
  }

  public some(callback: (item: Item, quantity: number) => boolean): boolean {
    for (const [item, quantity] of this.data.entries()) {
      for (let i = 0; i < quantity; i++) {
        if (callback(item, quantity)) {
          return true;
        }
      }
    }
    return false;
  }

  public filter(callback: (item: Item, quantity: number) => boolean) {
    const filteredPile = new ItemPile();
    for (const [item, quantity] of this.data.entries()) {
      if (callback(item, quantity)) {
        filteredPile.add(item, quantity);
      }
    }
    return filteredPile;
  }

  public map(callback: (item: Item, quantity: number) => [Item, number]) {
    const mappedPile = new ItemPile();
    for (const [item, quantity] of this.data.entries()) {
      mappedPile.add(...callback(item, quantity));
    }
    return mappedPile;
  }

  public merge(...piles: ItemPile[]): ItemPile {
    const newItemPile = this.clone();
    for (const pile of piles) {
      for (const [item, quantity] of pile) {
        newItemPile.add(item, quantity);
      }
    }
    return newItemPile;
  }

  public clone(): ItemPile {
    const clonedPile = new ItemPile();
    for (const [item, quantity] of this.data.entries()) {
      clonedPile.data.set(item, quantity);
    }
    return clonedPile;
  }

  public add(item: Item, quantity: number = 1) {
    const prev = this.data.get(item);
    this.data.set(item, (prev ? prev : 0) + quantity);
  }

  public remove(item: Item, quantity: number = 1) {
    const prev = this.data.get(item);
    if (prev) {
      if (prev > quantity) {
        this.data.set(item, prev - quantity);
      } else {
        this.data.delete(item);
      }
    }
  }

  public set(item: Item, quantity: number) {
    if (quantity > 0) {
      this.data.set(item, quantity);
    } else {
      this.data.delete(item);
    }
  }

  public get(item: Item): number | undefined {
    return this.data.get(item);
  }

  public has(item: Item, quantity: number = 1): boolean {
    const current = this.data.get(item);
    return !!current && current >= quantity;
  }

  public includesAll(otherPile: ItemPile): boolean {
    for (const [item, quantity] of this) {
      if (!otherPile.has(item, quantity)) {
        return false;
      }
    }
    return true;
  }

  public union(otherPile: ItemPile): ItemPile {
    const newPile = this.clone();

    for (const [item, quantity] of otherPile) {
      const prev = newPile.get(item);
      if (prev) {
        newPile.set(item, Math.max(prev, quantity));
      } else {
        newPile.set(item, quantity);
      }
    }
    return newPile;
  }

  public intersection(otherPile: ItemPile): ItemPile {
    const newPile = new ItemPile();

    for (const [item, quantity] of this) {
      const prev = otherPile.get(item);
      if (prev) {
        newPile.set(item, Math.min(prev, quantity));
      }
    }
    return newPile;
  }

  public difference(otherPile: ItemPile): ItemPile {
    const newPile = this.clone();

    for (const [item, quantity] of otherPile) {
      const prev = newPile.get(item);
      if (prev) {
        newPile.set(item, Math.max(prev - quantity, 0));
      }
    }
    return newPile;
  }

  public symmetricDifference(otherPile: ItemPile): ItemPile {
    const newPile = this.clone();

    for (const [item, quantity] of otherPile) {
      const prev = newPile.get(item);
      if (prev) {
        newPile.set(item, Math.abs(prev - quantity));
      } else {
        newPile.set(item, quantity);
      }
    }

    return newPile;
  }

  public isEmpty() {
    return Object.keys(this.data).length === 0;
  }
}
