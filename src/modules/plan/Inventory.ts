import { Slot, EquipmentSlot } from '@/modules/plan/Slot';
import { Item } from '@/modules/api';

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
      .reduce((strings: string[], slot, index) => {
        const item = slot.item;
        if (item) {
          strings.push(`Slot ${index + 1}: ${item}: ${slot.quantity}`);
        }
        return strings;
      }, []);

    const equipmentStrings = ['Weapon', 'Chest', 'Head', 'Arm', 'Leg'].reduce(
      (strings: string[], slotName: string) => {
        const item = this.equipmentSlots[slotName].item;
        if (item) {
          strings.push(`${slotName}: ${item}`);
        } else {
          strings.push(`${slotName}: Empty`);
        }
        return strings;
      },
      []
    );

    return `Inventory: [${slotStrings.join(', ')}], Equipment: [${equipmentStrings.join(', ')}]`;
  }

  add(item: Item, quantity: number = 1): boolean {
    if (item.equipType) {
      const slot: EquipmentSlot = this.equipmentSlots[item.equipType];
      if (slot.canAdd(item)) {
        slot.add(item);
        return true;
      }
    }

    for (const slot of this.slots) {
      if (slot.canAdd(item, quantity)) {
        slot.add(item, quantity);
        return true;
      }
    }

    return false;
  }

  remove(item: Item, quantity: number = 1): boolean {
    if (item.equipType) {
      const slot: EquipmentSlot = this.equipmentSlots[item.equipType];
      if (slot.has(item)) {
        slot.remove();
        return true;
      }
    }
    for (const slot of this.slots) {
      if (slot.has(item)) {
        slot.remove(quantity);
        return true;
      }
    }

    return false;
  }

  canAdd(item: Item, quantity: number = 1): boolean {
    if (quantity === 1) {
      return (
        (item.equipType && this.equipmentSlots[item.equipType].isEmpty()) ||
        this.slots.some((slot) => slot.canAdd(item))
      );
    } else {
      return this.slots.some((slot) => slot.canAdd(item, quantity));
    }
  }

  has(item: Item): boolean {
    return (
      this.slots.some((slot) => slot.has(item)) ||
      Object.values(this.equipmentSlots).some((slot) => slot.has(item))
    );
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

  toArray(): Item[] {
    const items: Item[] = [];
    this.slots.forEach((slot: Slot) => {
      if (slot.item) {
        for (let i = 0; i < slot.quantity; i++) {
          items.push(slot.item);
        }
      }
    });

    Object.values(this.equipmentSlots).forEach((slot: EquipmentSlot) => {
      if (slot.item) {
        items.push(slot.item);
      }
    });
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
