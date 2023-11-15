import { Item } from '@/modules/api';

export class Slot {
  _item: Item | undefined = undefined;
  _quantity: number = 0;

  add(item: Item, quantity: number = 1): boolean {
    if (this.canAdd(item, quantity)) {
      this._item = item;
      this._quantity += quantity;
      return true;
    }
    return false;
  }

  remove(quantity: number = 1): boolean {
    if (this.quantity >= quantity) {
      this._quantity -= quantity;
      if (this._quantity === 0) {
        this._item = undefined;
      }
      return true;
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
    return this._item.equals(item);
  }

  canAdd(item: Item, quantity: number = 1): boolean {
    return this.isEmpty() || (this.item === item && this._quantity + quantity <= item.stackable);
  }

  isFull(): boolean {
    if (!this._item) {
      return false;
    }
    return this._quantity >= this._item.stackable;
  }

  isEmpty(): boolean {
    return !this._item;
  }

  get item() {
    return this._item;
  }

  get quantity() {
    return this._quantity;
  }
}

export class EquipmentSlot {
  _equipType: string;
  _item: Item | undefined = undefined;

  constructor(equipType: string) {
    this._equipType = equipType;
  }

  add(item: Item): boolean {
    if (this.canAdd(item)) {
      this._item = item;
      return true;
    }
    return false;
  }

  remove(): boolean {
    if (this.isFull()) {
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
    if (!this._item) {
      return false;
    }
    return this._item.equals(item);
  }

  canAdd(item: Item): boolean {
    return this.isEmpty() && !!item.equipType && item.equipType === this._equipType;
  }

  isFull(): boolean {
    return !!this._item;
  }

  isEmpty(): boolean {
    return !this._item;
  }

  get item() {
    return this._item;
  }
}
