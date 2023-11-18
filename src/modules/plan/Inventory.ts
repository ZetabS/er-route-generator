import { Item } from '@/modules/api';
import { EquipType, EquipTypes } from '@/modules/api/enums';

export class Inventory {
  private readonly slots: Map<Item, number>;
  private readonly equipmentSlots: Map<EquipType, Item>;
  private usedSlotCount: number = 0;

  constructor(
    items: Item[] = [],
    slots: Map<Item, number> = new Map<Item, number>(),
    equipmentSlots: Map<EquipType, Item> = new Map<EquipType, Item>()
  ) {
    this.slots = slots;
    this.equipmentSlots = equipmentSlots;
    for (const item of items) {
      this.add(item);
    }
  }

  public toString(): string {
    const slotEntries: [Item, number][] = [];
    for (const entry of this.slots.entries()) {
      slotEntries.push(entry);
    }

    slotEntries.sort(([aItem, aQuantity], [bItem, bQuantity]) =>
      aItem.equals(bItem) ? aQuantity - bQuantity : aItem.code - bItem.code
    );

    const slotStrings = [];
    for (let i = 0; i < slotEntries.length; i++) {
      const [item, quantity] = slotEntries[i];
      slotStrings.push(`Slot ${i + 1}: ${item}: ${quantity}`);
    }

    const equipmentStrings = [];
    for (let i = 0; i < EquipTypes.length; i++) {
      const item = this.equipmentSlots.get(EquipTypes[i]);
      equipmentStrings.push(`${EquipTypes[i]}: ${item ? item : 'Empty'}`);
    }

    return (
      `Inventory[\n` +
      `Slot: [${slotStrings.join(', ')}],\n` +
      `Equipment: [${equipmentStrings.join(', ')}]\n` +
      `]`
    );
  }

  toArray(): Item[] {
    const array: Item[] = [];
    for (const [item, quantity] of this.slots) {
      for (let i = 0; i < quantity; i++) {
        array.push(item);
      }
    }

    for (const [, item] of this.equipmentSlots) {
      array.push(item);
    }
    return array;
  }

  clone() {
    return new Inventory([], new Map(this.slots), new Map(this.equipmentSlots));
  }

  add(item: Item, quantity: number = 1): boolean {
    if (quantity <= 0) {
      throw Error('Quantity must be a positive number');
    }

    if (
      item.equipType &&
      !this.equipmentSlots.has(item.equipType) &&
      this._update(item, quantity - 1)
    ) {
      this.equipmentSlots.set(item.equipType, item);
      return true;
    }

    return this._update(item, quantity);
  }

  remove(item: Item, quantity: number = 1): boolean {
    if (quantity <= 0) {
      throw Error('Quantity must be a positive number');
    }

    if (
      item.equipType &&
      this.equipmentSlots.get(item.equipType)?.equals(item) &&
      this._update(item, -(quantity - 1))
    ) {
      this.equipmentSlots.delete(item.equipType);
      return true;
    }

    return this._update(item, -quantity);
  }

  private _update(item: Item, quantity: number): boolean {
    const currentQuantity = this.slots.get(item) || 0;
    const updatedQuantity = currentQuantity + quantity;
    if (updatedQuantity < 0) {
      return false;
    }

    if (updatedQuantity === 0) {
      this.slots.delete(item);
      return true;
    }

    const currentRequiredSlotCount = Math.ceil(currentQuantity / item.stackable);
    const updatedRequiredSlotCount = Math.ceil(updatedQuantity / item.stackable);
    const updatedUsedSlotCount =
      this.usedSlotCount - currentRequiredSlotCount + updatedRequiredSlotCount;

    if (updatedUsedSlotCount > 10) {
      return false;
    }

    this.slots.set(item, updatedQuantity);
    this.usedSlotCount = updatedUsedSlotCount;
    return true;
  }

  has(item: Item): boolean {
    return (
      this.slots.has(item) ||
      !!(item.equipType && this.equipmentSlots.get(item.equipType)?.equals(item))
    );
  }
}
