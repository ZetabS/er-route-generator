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

export interface Slot {
  item: Item | undefined;
  quantity: number;
}

export interface Inventory {
  slots: Slot[];
  equippedSlots: Slot[];
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

export type EquippableItem = BaseItem & {
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
