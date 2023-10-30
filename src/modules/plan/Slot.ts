import { Item } from '@/common/typing';

export class Slot {
  _item: Item | undefined = undefined;
  _quantity: number = 0;

  add(item: Item): Slot {
    if (this.isFull) {
      throw new Error('Slot is full.');
    }
    if (this._item && this._item !== item) {
      throw new Error(`Wrong Item found: '${item.name}', expected '${this._item.name}'.`);
    }

    this._item = item;
    this._quantity++;
    return this;
  }

  remove(): Slot {
    if (!this.isEmpty) {
      this._quantity--;
      if (this._quantity === 0) {
        this._item = undefined;
      }
    }
    return this;
  }

  clear(): Slot {
    this._item = undefined;
    this._quantity = 0;
    return this;
  }

  canAdd(item: Item) {
    if (this.isEmpty) {
      return true;
    } else {
      return !!(this._item && this._item.code === item.code && !this.isFull);
    }
  }

  get isFull(): boolean {
    return !!(this._item && this._quantity >= this._item.stackable);
  }

  get isEmpty(): boolean {
    return this._quantity === 0;
  }

  get item() {
    return this._item;
  }

  get quantity() {
    return this._quantity;
  }
}

export class EquipmentSlot {
  _item: Item | undefined = undefined;

  add(item: Item): EquipmentSlot {
    if (this.isFull) {
      throw new Error('Slot is full.');
    }

    this._item = item;
    return this;
  }

  remove(): EquipmentSlot {
    if (!this.isEmpty) {
      this._item = undefined;
    }
    return this;
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
