import itemData from '@/modules/api/data/itemData';
import type { Item } from '@/common/typing';
import { Slot, EquipmentSlot } from '@/modules/plan/Slot';

export class Inventory {
  public slots: Slot[];
  public equipmentSlots: Record<string, EquipmentSlot>;

  constructor() {
    this.slots = [];

    for (let i = 0; i < 10; i++) {
      this.slots.push(new Slot());
    }

    this.equipmentSlots = {
      Weapon: new EquipmentSlot(),
      Chest: new EquipmentSlot(),
      Head: new EquipmentSlot(),
      Arm: new EquipmentSlot(),
      Leg: new EquipmentSlot()
    };
  }

  add(item: Item): boolean {
    if (item.equipType) {
      const equipmentSlot = this.equipmentSlots[item.equipType];
      if (equipmentSlot.isEmpty) {
        equipmentSlot.add(item);
        return true;
      }
    } else {
      for (const slot of this.slots) {
        if (slot.canAdd(item)) {
          slot.add(item);
          return true;
        }
      }
    }
    return false;
  }

  remove(item: Item): boolean {
    if (item.equipType) {
      const equipmentSlot = this.equipmentSlots[item.equipType];
      if (equipmentSlot.has(item)) {
        equipmentSlot.remove();
        return true;
      }
    } else {
      for (const slot of this.slots) {
        if (slot.has(item)) {
          slot.remove();
          return true;
        }
      }
    }
    return false;
  }

  craft(item: Item) {
    const material1 = itemData[item.makeMaterial1];
    const material2 = itemData[item.makeMaterial2];

    if (material1 && !this.has(material1) && !this.craft(material1)) {
      return false;
    }

    if (material2 && !this.has(material2) && !this.craft(material2)) {
      return false;
    }

    this.remove(material1);
    this.remove(material2);
    this.add(item);

    return true;
  }

  canAdd(item: Item): boolean {
    return (
      (item.equipType && this.equipmentSlots[item.equipType].isEmpty) ||
      this.slots.every((slot) => slot.canAdd(item))
    );
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
      this.slots.every((slot) => slot.isEmpty) &&
      Object.values(this.equipmentSlots).every((slot) => slot.isEmpty)
    );
  }
}
