import { EquipmentSlot, Slot } from '@/modules/plan/Slot';
import type { Item } from '@/common/typing';

export class Inventory {
  public slots: Slot[];
  public equipmentSlot: Record<string, EquipmentSlot>;

  constructor() {
    this.slots = [];

    for (let i = 0; i < 10; i++) {
      this.slots.push(new Slot());
    }

    this.equipmentSlot = {
      Weapon: new EquipmentSlot(),
      Chest: new EquipmentSlot(),
      Head: new EquipmentSlot(),
      Arm: new EquipmentSlot(),
      Leg: new EquipmentSlot()
    };
  }

  canAdd(item: Item): boolean {
    // 먼저 equippedSlots을 확인합니다.
    if (this.equipmentSlot[item.Type])
      if (slot.isEmpty || (slot.item && slot.item.code === item.code && !slot.isFull)) {
        return true;
      }
    }

    // equippedSlots에 추가할 수 없다면, 일반 슬롯을 확인합니다.
    for (const slot of this.slots) {
      if (slot.canAdd(item)) {
        return true;
      }
    }

    return false; // 모든 슬롯이 아이템을 추가할 수 없을 경우 false를 반환합니다.
  }

  isFull(): boolean {
    return (
      this.slots.every((slot) => slot.isFull) &&
      Object.values(this.equipmentSlot).every((slot) => slot.isFull)
    );
  }

  isEmpty(): boolean {
    return (
      this.slots.every((slot) => slot.isEmpty) &&
      Object.values(this.equipmentSlot).every((slot) => slot.isEmpty)
    );
  }
}
