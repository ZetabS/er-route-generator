import type { Item } from '@/common/typing';

class InventoryFullError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InventoryFullError';
  }
}

class SlotFullError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SlotFullError';
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Inventory {
  slots: Slot[] = [];
  equippedSlots: Record<string, Slot> = {
    Weapon: new Slot(),
    Chest: new Slot(),
    Head: new Slot(),
    Arm: new Slot(),
    Leg: new Slot()
  };

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.slots.push(new Slot());
    }
  }

  addItem(item: Item, quantity: number = 1): Inventory {
    if (quantity <= 0) {
      throw new Error('Quantity should be greater than zero.');
    }
    while (quantity > 0) {
      for (const slot of this.slots) {
        if (slot.canAdd(item)) {
          slot.add(item);
          break;
        }
      }
      quantity--;
    }

    for (let i = 0; i < quantity; i++) {}
    return this;
  }

  // 아이템을 인벤토리에서 제거
  removeItem(itemName: string, quantity: number = 1): void {
    if (quantity <= 0) {
      throw new InventoryFullError('Quantity should be greater than zero.');
    }

    if (this.slots[itemName]) {
      if (this.slots[itemName] >= quantity) {
        this.slots[itemName] -= quantity;
      } else {
        throw new InventoryFullError('Not enough of the item in inventory.');
      }
    } else {
      throw new InventoryFullError('Item not found in inventory.');
    }
  }

  // 인벤토리에 있는 아이템 목록 조회
  getItems(): { [key: string]: number } {
    return { ...this.slots };
  }
}

class Slot {
  private _item: Item | undefined = undefined;
  private _quantity: number = 0;

  add(item: Item) {
    if (this.isFull) {
      throw new InventoryFullError('Slot is full.');
    }
    if (this._item && this._item !== item) {
      throw new InventoryFullError(
        `Wrong Item found: '${item.name}', expected '${this._item.name}'.`
      );
    }

    this._item = item;
    this._quantity++;
  }

  remove() {
    if (this.isEmpty) {
      throw new Error('Slot is empty.');
    }
    this._quantity--;
    if (this._quantity === 0) {
      this._item = undefined;
    }
  }

  canAdd(item: Item) {
    return this.isEmpty || (this.item && this.item.code === item.code && !this.isFull);
  }

  get isFull(): boolean {
    return !!(this._item && this._quantity < this._item.stackable);
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
