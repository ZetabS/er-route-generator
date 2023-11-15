import { Item } from '@/modules/api';
import { EquipType, EquipTypes } from '@/modules/api/typing';

function getSlotCount(item: Item, quantity: number) {
  return Math.ceil(quantity / item.stackable);
}

export class Inventory {
  private readonly slots: Map<Item, number> = new Map<Item, number>();
  private readonly equipmentSlots: Map<EquipType, Item> = new Map<EquipType, Item>();
  private slotCount: number = 0;

  constructor(...items: Item[]) {
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

    let slotStrings = [];
    for (let i = 0; i < slotEntries.length; i++) {
      const [item, quantity] = slotEntries[i];
      slotStrings.push(`Slot ${i + 1}: ${item}: ${quantity}`);
    }

    let equipmentStrings = [];
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

  add(item: Item, quantity: number = 1): boolean {
    if (quantity === 1 && item.equipType && !this.equipmentSlots.has(item.equipType)) {
      this.equipmentSlots.set(item.equipType, item);
      return true;
    }

    if (this.slots.has(item)) {
      const prevQuantity = this.slots.get(item) as number;
      const newQuantity = prevQuantity + quantity;
      const prevSlotCount = getSlotCount(item, prevQuantity);
      const newSlotCount = this.slotCount - prevSlotCount + getSlotCount(item, newQuantity);

      if (newSlotCount <= 10) {
        this.slots.set(item, newQuantity);
        this.slotCount = newSlotCount;
        return true;
      }
    } else {
      const newSlotCount = this.slotCount + getSlotCount(item, quantity);
      if (newSlotCount <= 10) {
        this.slots.set(item, quantity);
        this.slotCount = newSlotCount;
        return true;
      }
    }

    return false;
  }

  remove(item: Item, quantity: number = 1): boolean {
    if (quantity === 1 && item.equipType && this.equipmentSlots.get(item.equipType)?.equals(item)) {
      this.equipmentSlots.delete(item.equipType);
      return true;
    }

    if (this.slots.has(item)) {
      const prevQuantity = this.slots.get(item) as number;
      const newQuantity = prevQuantity - quantity;
      if (newQuantity === 0) {
        this.slots.delete(item);
        return true;
      } else if (newQuantity < 0) {
        return false;
      }
      const prevSlotCount = getSlotCount(item, prevQuantity);
      const newSlotCount = this.slotCount - prevSlotCount + getSlotCount(item, newQuantity);

      if (newSlotCount <= 10) {
        this.slots.set(item, newQuantity);
        this.slotCount = newSlotCount;
        return true;
      }
    }

    return false;
  }

  has(item: Item): boolean {
    return (
      this.slots.has(item) ||
      !!(item.equipType && this.equipmentSlots.get(item.equipType)?.equals(item))
    );
  }

  toArray(): Item[] {
    const items: Item[] = [];
    for (const [item, quantity] of this.slots) {
      for (let i = 0; i < quantity; i++) {
        items.push(item);
      }
    }

    for (const [, item] of this.equipmentSlots) {
      items.push(item);
    }
    return items;
  }

  clone() {
    return new Inventory(...this.toArray());
  }
}
