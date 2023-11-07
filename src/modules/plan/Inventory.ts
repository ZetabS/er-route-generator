import { Slot, EquipmentSlot } from '@/modules/plan/Slot';
import { ITEM, Item } from '@/modules/api';
import { ItemPile } from '@/modules/plan/ItemPile';

export class Inventory {
  private readonly slots: Slot[];
  private readonly equipmentSlots: Record<string, EquipmentSlot>;

  constructor(...items: Item[]) {
    this.slots = [];

    for (let i = 0; i < 10; i++) {
      this.slots.push(new Slot());
    }

    this.equipmentSlots = {
      Weapon: new EquipmentSlot('Weapon'),
      Chest: new EquipmentSlot('Chest'),
      Head: new EquipmentSlot('Head'),
      Arm: new EquipmentSlot('Arm'),
      Leg: new EquipmentSlot('Leg')
    };

    items.forEach((item: Item) => this.add(item));
  }

  public toString(): string {
    const slotStrings = this.slots
      .sort((a, b) => {
        if (!a.item && !b.item) {
          return 0;
        }
        if (!a.item) {
          return -1;
        }
        if (!b.item) {
          return 1;
        }

        if (a.item.equals(b.item)) {
          return a.quantity - b.quantity;
        }

        return a.item.code - b.item.code;
      })
      .map((slot, index) => {
        const item = slot.item;
        if (item) {
          return `Slot ${index + 1}: ${item}: ${slot.quantity}`;
        } else {
          return `Slot ${index + 1}: Empty`;
        }
      });

    const equipmentStrings = ['Weapon', 'Chest', 'Head', 'Arm', 'Leg'].map((slotName: string) => {
      const item = this.equipmentSlots[slotName];
      if (item) {
        return `${slotName}: ${item}`;
      } else {
        return `${slotName}: Empty`;
      }
    });

    return `Inventory:${slotStrings.join(', ')} Equipment: ${equipmentStrings.join(', ')}`;
  }

  add(item: Item): boolean {
    if (item.equipType) {
      for (const slot of Object.values(this.equipmentSlots)) {
        if (slot.canAdd(item)) {
          slot.add(item);
          return true;
        }
      }
    }

    for (const slot of this.slots) {
      if (slot.canAdd(item)) {
        slot.add(item);
        return true;
      }
    }

    return false;
  }

  remove(item: Item): boolean {
    if (item.equipType) {
      for (const slot of Object.values(this.equipmentSlots)) {
        if (slot.has(item)) {
          slot.remove();
          return true;
        }
      }
    }
    for (const slot of this.slots) {
      if (slot.has(item)) {
        slot.remove();
        return true;
      }
    }

    return false;
  }

  canAdd(item: Item): boolean {
    return (
      (item.equipType && this.equipmentSlots[item.equipType].isEmpty()) ||
      this.slots.some((slot) => slot.canAdd(item))
    );
  }

  has(item: Item): boolean {
    return (
      this.slots.some((slot) => slot.has(item)) ||
      Object.values(this.equipmentSlots).some((slot) => slot.has(item))
    );
  }

  clear(): boolean {
    this.slots.splice(0, this.slots.length);
    for (let i = 0; i < 10; i++) {
      this.slots.push(new Slot());
    }
    this.equipmentSlots['Weapon'] = new EquipmentSlot('Weapon');
    this.equipmentSlots['Chest'] = new EquipmentSlot('Chest');
    this.equipmentSlots['Head'] = new EquipmentSlot('Head');
    this.equipmentSlots['Arm'] = new EquipmentSlot('Arm');
    this.equipmentSlots['Leg'] = new EquipmentSlot('Leg');
    return true;
  }

  isFull(): boolean {
    return (
      this.slots.every((slot) => slot.isFull) &&
      Object.values(this.equipmentSlots).every((slot) => slot.isFull)
    );
  }

  isEmpty(): boolean {
    return (
      this.slots.every((slot) => slot.isEmpty()) &&
      Object.values(this.equipmentSlots).every((slot) => slot.isEmpty())
    );
  }

  get toArray(): Item[] {
    const items: Item[] = [];
    this.slots.forEach((slot: Slot) => {
      if (slot.item) {
        for (let i = 0; i < slot.quantity; i++) {
          items.push(slot.item);
        }
      }
    });

    for (const slotName in this.equipmentSlots) {
      const slot = this.equipmentSlots[slotName];
      if (slot.item) {
        items.push(slot.item);
      }
    }
    return items;
  }

  clone() {
    const inventory = new Inventory();
    this.slots.forEach((slot) => {
      if (slot.item) {
        for (let i = 0; i < slot.quantity; i++) {
          inventory.add(slot.item);
        }
      }
    });

    Object.values(this.equipmentSlots).forEach((slot) => {
      if (slot.item) {
        inventory.add(slot.item);
      }
    });
    return inventory;
  }
}
