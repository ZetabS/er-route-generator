import { ITEM, Item } from '@/modules/api';

export class ItemPile {
  private data: Record<number, number> = {};

  constructor(items?: Item[]) {
    if (items) {
      items.forEach((item) => this.add(item));
    }
  }

  public toString(): string {
    const itemsString = Object.entries(this.data)
      .sort((a, b) => a[0] - b[0])
      .map(([itemCode, quantity]) => `${ITEM[itemCode].name}(${itemCode}): ${quantity}`)
      .join(', ');

    return `[${itemsString}]`;
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

  public clone(): ItemPile {
    const clonedPile = new ItemPile([]);
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

  public includes(item: Item): boolean {
    return !!this.data[item.code];
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
}
