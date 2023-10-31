import { Item } from '@/common/typing';

export abstract class AbstractSlot {
  abstract add(item: Item): boolean;

  abstract remove(): boolean;

  abstract clear(): boolean;

  abstract has(item: Item): boolean;

  abstract get isFull(): boolean;

  abstract get isEmpty(): boolean;

  abstract get item(): Item | undefined;
}

export class Slot extends AbstractSlot {
  _item: Item | undefined = undefined;
  _quantity: number = 0;

  add(item: Item): boolean {
    if (this.canAdd(item)) {
      this._item = item;
      this._quantity++;
      return true;
    }
    return false;
  }

  remove(): boolean {
    if (!this.isEmpty) {
      this._quantity--;
      if (this._quantity === 0) {
        this._item = undefined;
      }
    } else {
      return false;
    }
  }

  clear(): boolean {
    this._item = undefined;
    this._quantity = 0;
    return true;
  }

  has(item: Item): boolean {
    if (!this._item) {
      return false;
    }
    return this._item.code === item.code;
  }

  canAdd(item: Item): boolean {
    return this._quantity < item.stackable;
  }

  get isFull(): boolean {
    if (!this._item) {
      return false;
    }
    return this._quantity >= this._item.stackable;
  }

  get isEmpty(): boolean {
    return !this._item;
  }

  get item() {
    return this._item;
  }

  get quantity() {
    return this._quantity;
  }
}

export class EquipmentSlot extends AbstractSlot {
  _item: Item | undefined = undefined;

  add(item: Item): boolean {
    if (this.isEmpty) {
      this._item = item;
      return true;
    }
    return false;
  }

  remove(): boolean {
    if (this.isFull) {
      this._item = undefined;
      return true;
    }
    return false;
  }

  clear(): boolean {
    this._item = undefined;
    return true;
  }

  has(item: Item): boolean {
    return this._item === item;
  }

  get isFull(): boolean {
    return !!this._item;
  }

  get isEmpty(): boolean {
    return !this._item;
  }

  get item() {
    return this._item;
  }
}
