import { ITEM, Item } from '@/modules/api';

export class ItemPile {
  private data: Record<number, number> = {};

  constructor(...items: Item[]) {
    items.forEach((item) => this.add(item));
  }

  public toString(): string {
    const itemsString = Object.entries(this.data)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([itemCode, quantity]) => `${ITEM[itemCode]}: ${quantity}`)
      .join(', ');

    return `[${itemsString}]`;
  }

  public hashCode(): number {
    return Object.entries(this.data).reduce((n, [k, v]) => n + (parseInt(k) * 101 + v), 0);
  }

  public toArray(): Item[] {
    const array: Item[] = [];
    for (const [itemCode, quantity] of Object.entries(this.data)) {
      for (let i = 0; i < quantity; i++) {
        array.push(ITEM[itemCode]);
      }
    }
    return array;
  }

  public get length(): number {
    return Object.keys(this).length;
  }

  public get count(): number {
    let count = 0;
    for (const [, quantity] of Object.entries(this.data)) {
      count += quantity;
    }
    return count;
  }

  public forEach(callback: (item: Item, quantity: number) => void) {
    for (const [itemCode, quantity] of Object.entries(this.data)) {
      callback(ITEM[itemCode], quantity);
    }
  }

  public [Symbol.iterator](): Iterator<[Item, number]> {
    let index = 0;
    const entries: [string, number][] = Object.entries(this.data);

    return {
      next: (): IteratorResult<[Item, number]> => {
        if (index < entries.length) {
          const item = ITEM[entries[index][0]];
          return {
            value: [item, entries[index++][1]],
            done: false
          };
        } else {
          return {
            value: undefined as any,
            done: true
          };
        }
      }
    };
  }

  public every(callback: (item: Item, quantity: number) => boolean): boolean {
    for (const [itemCode, quantity] of Object.entries(this.data)) {
      for (let i = 0; i < quantity; i++) {
        if (!callback(ITEM[itemCode], quantity)) {
          return false;
        }
      }
    }
    return true;
  }

  public some(callback: (item: Item, quantity: number) => boolean): boolean {
    for (const [itemCode, quantity] of Object.entries(this.data)) {
      for (let i = 0; i < quantity; i++) {
        if (callback(ITEM[itemCode], quantity)) {
          return true;
        }
      }
    }
    return false;
  }

  public filter(callback: (item: Item, quantity: number) => boolean) {
    const filteredPile = new ItemPile();
    for (const [itemCode, quantity] of Object.entries(this.data)) {
      const item = ITEM[itemCode];
      if (callback(item, quantity)) {
        filteredPile.add(item, quantity);
      }
    }
    return filteredPile;
  }

  public map(callback: (item: Item, quantity: number) => [Item, number]) {
    const mappedPile = new ItemPile();
    for (const [itemCode, quantity] of Object.entries(this.data)) {
      const item = ITEM[itemCode];
      mappedPile.add(...callback(item, quantity));
    }
    return mappedPile;
  }

  public merge(...piles: ItemPile[]): ItemPile {
    const newItemPile = this.clone();
    piles.forEach((pile) => pile.forEach((item, quantity) => newItemPile.add(item, quantity)));
    return newItemPile;
  }

  public clone(): ItemPile {
    const clonedPile = new ItemPile();
    clonedPile.data = { ...this.data };
    return clonedPile;
  }

  public add(item: Item, quantity: number = 1) {
    if (this.data[item.code]) {
      this.data[item.code] += quantity;
    } else {
      this.data[item.code] = quantity;
    }
  }

  public remove(item: Item, quantity: number = 1) {
    if (this.data[item.code]) {
      this.data[item.code] -= quantity;
      if (this.data[item.code] <= 0) {
        delete this.data[item.code];
      }
    }
  }

  public set(item: Item, quantity: number) {
    this.data[item.code] = quantity;
  }

  public get(item: Item): number {
    return this.data[item.code];
  }

  public has(item: Item, quantity: number = 1): boolean {
    return !!this.data[item.code] && this.data[item.code] >= quantity;
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
    const unionData: Record<number, number> = { ...this.data };

    for (const [itemCode, quantity] of Object.entries(otherPile.data)) {
      if (unionData[parseInt(itemCode)]) {
        unionData[parseInt(itemCode)] = Math.max(unionData[parseInt(itemCode)], quantity);
      } else {
        unionData[parseInt(itemCode)] = quantity;
      }
    }

    const resultPile = new ItemPile();
    resultPile.data = unionData;

    return resultPile;
  }

  public intersection(otherPile: ItemPile): ItemPile {
    const intersectionData: Record<number, number> = {};

    for (const [itemCode, quantity] of Object.entries(this.data)) {
      if (otherPile.data[parseInt(itemCode)]) {
        intersectionData[parseInt(itemCode)] = Math.min(
          quantity,
          otherPile.data[parseInt(itemCode)]
        );
      }
    }

    const resultPile = new ItemPile();
    resultPile.data = intersectionData;

    return resultPile;
  }

  public difference(otherPile: ItemPile): ItemPile {
    const differenceData: Record<number, number> = { ...this.data };

    for (const [itemCode, quantity] of Object.entries(otherPile.data)) {
      if (differenceData[parseInt(itemCode)]) {
        differenceData[parseInt(itemCode)] -= quantity;
        if (differenceData[parseInt(itemCode)] <= 0) {
          delete differenceData[parseInt(itemCode)];
        }
      }
    }

    const resultPile = new ItemPile();
    resultPile.data = differenceData;

    return resultPile;
  }

  public symmetricDifference(otherPile: ItemPile): ItemPile {
    const unionResult = this.union(otherPile);
    const intersectionResult = this.intersection(otherPile);
    return unionResult.difference(intersectionResult);
  }

  public isEmpty() {
    return Object.keys(this.data).length === 0;
  }
}
