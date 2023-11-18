import { ITEM, Item } from '@/modules/api';

export class ItemPile {
  private readonly data: Map<Item, number>;

  constructor(items: Item[] = [], data: Map<Item, number> = new Map<Item, number>()) {
    this.data = data;

    for (const item of items) {
      this.add(item);
    }
  }

  public toString(): string {
    const entries: [number, number][] = [];
    for (const [item, quantity] of this.data.entries()) {
      entries.push([item.code, quantity]);
    }

    entries.sort(([a], [b]) => a - b);

    const itemsString = entries
      .map(([itemCode, quantity]) => `${ITEM[itemCode]}: ${quantity}`)
      .join(', ');

    return `[${itemsString}]`;
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

  public hash(): number {
    let hash = 0;

    for (const [item, quantity] of this.data.entries()) {
      hash += item.code * 101 + quantity;
    }

    return hash;
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

  public isEmpty() {
    return this.data.size === 0;
  }

  public forEach(callback: (item: Item, quantity: number) => void) {
    for (const [item, quantity] of this.data.entries()) {
      callback(item, quantity);
    }
  }

  public [Symbol.iterator](): Iterator<[Item, number]> {
    return this.data.entries();
  }

  public filter(callback: (item: Item, quantity: number) => boolean): ItemPile {
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
    return new ItemPile([], new Map(this.data));
  }

  public add(item: Item, quantity: number = 1): boolean {
    if (quantity <= 0) {
      throw Error('Quantity must be a positive number');
    }

    const currentQuantity = this.data.get(item) || 0;
    const updatedQuantity = currentQuantity + quantity;

    this.data.set(item, updatedQuantity);
    return true;
  }

  public remove(item: Item, quantity: number = 1): boolean {
    if (quantity <= 0) {
      throw Error('Quantity must be a positive number');
    }

    const currentQuantity = this.data.get(item) || 0;
    const updatedQuantity = currentQuantity - quantity;

    if (updatedQuantity < 0) {
      throw Error('Cannot remove more items than are currently in pile');
    }

    if (updatedQuantity <= 0) {
      this.data.delete(item);
      return true;
    }

    this.data.set(item, updatedQuantity);
    return true;
  }

  public set(item: Item, quantity: number): ItemPile {
    if (quantity < 0) {
      throw Error('Quantity must be a non-negative number');
    }

    if (quantity === 0) {
      this.data.delete(item);
      return this;
    }

    this.data.set(item, quantity);
    return this;
  }

  public get(item: Item): number | undefined {
    return this.data.get(item);
  }

  public delete(item: Item): boolean {
    return this.data.delete(item);
  }

  public has(item: Item, quantity: number = 1): boolean {
    const currentQuantity = this.data.get(item) || 0;
    return currentQuantity >= quantity;
  }

  public includesAll(otherPile: ItemPile): boolean {
    for (const [item, quantity] of this.data.entries()) {
      if (!otherPile.has(item, quantity)) {
        return false;
      }
    }
    return true;
  }

  public union(otherPile: ItemPile): ItemPile {
    const newPile = this.clone();

    for (const [item, quantity] of otherPile) {
      const currentQuantity = newPile.get(item);
      if (currentQuantity) {
        newPile.set(item, Math.max(currentQuantity, quantity));
      } else {
        newPile.set(item, quantity);
      }
    }
    return newPile;
  }

  public intersection(otherPile: ItemPile): ItemPile {
    const newPile = new ItemPile();

    for (const [item, quantity] of this) {
      const currentQuantity = otherPile.get(item);
      if (currentQuantity) {
        newPile.set(item, Math.min(currentQuantity, quantity));
      }
    }
    return newPile;
  }

  public difference(otherPile: ItemPile): ItemPile {
    const newPile = this.clone();

    for (const [item, quantity] of otherPile) {
      const currentQuantity = newPile.get(item);
      if (currentQuantity) {
        newPile.set(item, Math.max(currentQuantity - quantity, 0));
      }
    }
    return newPile;
  }

  public symmetricDifference(otherPile: ItemPile): ItemPile {
    const newPile = this.clone();

    for (const [item, quantity] of otherPile) {
      const currentQuantity = newPile.get(item);
      if (currentQuantity) {
        newPile.set(item, Math.abs(currentQuantity - quantity));
      } else {
        newPile.set(item, quantity);
      }
    }

    return newPile;
  }
}
