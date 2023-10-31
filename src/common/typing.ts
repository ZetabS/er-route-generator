import itemData from '@/modules/api/data/itemData';
import ItemData from '@/modules/api/data/itemData';
export type AreaCode = number;
export type ItemCode = number;
export type Name = string;
type Key = string | number | symbol;

export type ProcessedData<DataType> = {
  [key in Key]: DataType;
};

export type RawData<DataType> = {
  [key in Key]: DataType;
};

export type LanguageData = {
  [key in Key]: QueriedLanguageData | string;
};

export type QueriedLanguageData = ProcessedData<string>;

export interface ItemSpawn {
  code: ItemCode;
  dropCount: number;
}

export interface Area {
  code: AreaCode;
  name: Name;
  isHyperLoopInstalled: boolean;
  nearByAreaCodes: AreaCode[];
  itemSpawns: ItemSpawn[];
}
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

export interface Plan {
  path: Area[];
  inventory: Inventory[];
}

export interface Item {
  code: number;
  name: string;
  modeType: number;
  itemType: string;
  subType: string;
  itemGrade: string;
  isCompletedItem: boolean;
  alertInSpectator: boolean;
  markingType: string;
  craftAnimTrigger: string;
  stackable: number;
  initialCount: number;
  itemUsableType: string;
  itemUsableValueList: number;
  makeMaterial1: number;
  makeMaterial2: number;
  manufacturableType: number;
  restoreItemWhenResurrected: boolean;
  creditValueWhenConvertedToBounty: number;
  equipType?: string;
  isRemovedFromPlayerCorpseInventoryWhenPlayerKilled?: boolean;
  notDisarm?: boolean;
  attackPower?: number;
  attackPowerByLv?: number;
  defense?: number;
  defenseByLv?: number;
  skillAmp?: number;
  skillAmpByLevel?: number;
  skillAmpRatio?: number;
  skillAmpRatioByLevel?: number;
  adaptiveForce?: number;
  adaptiveForceByLevel?: number;
  maxHp?: number;
  maxHpByLv?: number;
  maxSp?: number;
  hpRegenRatio?: number;
  hpRegen?: number;
  spRegenRatio?: number;
  spRegen?: number;
  attackSpeedRatio?: number;
  attackSpeedRatioByLv?: number;
  criticalStrikeChance?: number;
  criticalStrikeDamage?: number;
  preventCriticalStrikeDamaged?: number;
  cooldownReduction?: number;
  cooldownLimit?: number;
  lifeSteal?: number;
  normalLifeSteal?: number;
  skillLifeSteal?: number;
  moveSpeed?: number;
  moveSpeedOutOfCombat?: number;
  sightRange?: number;
  attackRange?: number;
  increaseBasicAttackDamage?: number;
  increaseBasicAttackDamageByLv?: number;
  preventBasicAttackDamaged?: number;
  preventBasicAttackDamagedByLv?: number;
  preventBasicAttackDamagedRatio?: number;
  preventBasicAttackDamagedRatioByLv?: number;
  increaseBasicAttackDamageRatio?: number;
  increaseBasicAttackDamageRatioByLv?: number;
  preventSkillDamaged?: number;
  preventSkillDamagedByLv?: number;
  preventSkillDamagedRatio?: number;
  preventSkillDamagedRatioByLv?: number;
  penetrationDefense?: number;
  penetrationDefenseRatio?: number;
  trapDamageReduce?: number;
  trapDamageReduceRatio?: number;
  hpHealedIncreaseRatio?: number;
  healerGiveHpHealRatio?: number;
  uniqueAttackRange?: number;
  uniqueHpHealedIncreaseRatio?: number;
  uniqueCooldownLimit?: number;
  uniqueTenacity?: number;
  uniqueMoveSpeed?: number;
  uniquePenetrationDefense?: number;
  uniquePenetrationDefenseRatio?: number;
  uniqueLifeSteal?: number;
  uniqueSkillAmpRatio?: number;
  consumableTag?: string;
  heal?: number;
  hpRecover?: number;
  spRecover?: number;
  attackPowerByBuff?: number;
  defenseByBuff?: number;
  skillAmpByBuff?: number;
  skillAmpRatioByBuff?: number;
  addStateCode?: number;
  cooldownGroupCode?: number;
  cooldown?: number;
  consumeCount?: number;
  summonCode?: number;
  ghostItemStateGroup?: number;
}

interface BaseItem {
  code: number;
  name: string;
  modeType: number;
  itemType: string;
  subType: string;
  itemGrade: string;
  isCompletedItem: boolean;
  alertInSpectator: boolean;
  markingType: string;
  craftAnimTrigger: string;
  stackable: number;
  initialCount: number;
  itemUsableType: string;
  itemUsableValueList: number;
  makeMaterial1: number;
  makeMaterial2: number;
  manufacturableType: number;
  restoreItemWhenResurrected: boolean;
  creditValueWhenConvertedToBounty: number;
}

export type EquipItem = BaseItem & {
  equipType: string;
  isRemovedFromPlayerCorpseInventoryWhenPlayerKilled: boolean;
  notDisarm: boolean;
  attackPower: number;
  attackPowerByLv: number;
  defense: number;
  defenseByLv: number;
  skillAmp: number;
  skillAmpByLevel: number;
  skillAmpRatio: number;
  skillAmpRatioByLevel: number;
  adaptiveForce: number;
  adaptiveForceByLevel: number;
  maxHp: number;
  maxHpByLv: number;
  maxSp: number;
  hpRegenRatio: number;
  hpRegen: number;
  spRegenRatio: number;
  spRegen: number;
  attackSpeedRatio: number;
  attackSpeedRatioByLv: number;
  criticalStrikeChance: number;
  criticalStrikeDamage: number;
  preventCriticalStrikeDamaged: number;
  cooldownReduction: number;
  cooldownLimit: number;
  lifeSteal: number;
  normalLifeSteal: number;
  skillLifeSteal: number;
  moveSpeed: number;
  moveSpeedOutOfCombat: number;
  sightRange: number;
  attackRange: number;
  increaseBasicAttackDamage: number;
  increaseBasicAttackDamageByLv: number;
  preventBasicAttackDamaged: number;
  preventBasicAttackDamagedByLv: number;
  preventBasicAttackDamagedRatio: number;
  preventBasicAttackDamagedRatioByLv: number;
  increaseBasicAttackDamageRatio: number;
  increaseBasicAttackDamageRatioByLv: number;
  preventSkillDamaged: number;
  preventSkillDamagedByLv: number;
  preventSkillDamagedRatio: number;
  preventSkillDamagedRatioByLv: number;
  penetrationDefense: number;
  penetrationDefenseRatio: number;
  trapDamageReduce: number;
  trapDamageReduceRatio: number;
  hpHealedIncreaseRatio: number;
  healerGiveHpHealRatio: number;
  uniqueAttackRange: number;
  uniqueHpHealedIncreaseRatio: number;
  uniqueCooldownLimit: number;
  uniqueTenacity: number;
  uniqueMoveSpeed: number;
  uniquePenetrationDefense: number;
  uniquePenetrationDefenseRatio: number;
  uniqueLifeSteal: number;
  uniqueSkillAmpRatio: number;
};

export type ConsumableItem = BaseItem & {
  consumableTag: string;
  heal: number;
  hpRecover: number;
  spRecover: number;
  attackPowerByBuff: number;
  defenseByBuff: number;
  skillAmpByBuff: number;
  skillAmpRatioByBuff: number;
  addStateCode: number;
};

export type SpecialItem = BaseItem & {
  cooldownGroupCode: number;
  cooldown: number;
  consumeCount: number;
  summonCode: number;
  ghostItemStateGroup: number;
};
