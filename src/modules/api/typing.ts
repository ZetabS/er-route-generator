export type AreaCode = number;
export type ItemCode = number;
export type Name = string;
type Key = string | number | symbol;

export type ProcessedData<DataType> = {
  [key in Key]: DataType;
};

export type LanguageData = {
  [key in Key]: QueriedLanguageData | string;
};

export type QueriedLanguageData = ProcessedData<string>;

export interface RecipeData {
  itemCode: ItemCode;
  material1: number;
  material2: number;
  craftCount: number;
}

export interface ItemSpawnData {
  itemCode: ItemCode;
  dropCount: number;
}

export interface AreaData {
  code: AreaCode;
  name: Name;
  isHyperLoopInstalled: boolean;
  nearByAreaCodes: AreaCode[];
  itemSpawns: ItemSpawnData[];
  collectableItems: number[];
}

export const ItemGrade = {
  Common: 'Common',
  Uncommon: 'Uncommon',
  Rare: 'Rare',
  Epic: 'Epic',
  Legend: 'Legend'
} as const;
export type ItemGrade = keyof typeof ItemGrade;
export const ItemGrades: readonly ItemGrade[] = Object.values(ItemGrade);

export const ItemType = {
  Armor: 'Armor',
  Weapon: 'Weapon',
  Consume: 'Consume',
  Misc: 'Misc',
  DnaBracelet: 'DnaBracelet',
  EscapeMaterial: 'EscapeMaterial',
  EscapeKey: 'EscapeKey',
  EscapeQualification: 'EscapeQualification',
  Special: 'Special'
} as const;
export type ItemType = keyof typeof ItemType;
export const ItemTypes: readonly ItemType[] = Object.values(ItemType);

export const SubType = {
  Chest: 'Chest',
  Head: 'Head',
  Arm: 'Arm',
  Leg: 'Leg',
  OneHandSword: 'OneHandSword',
  TwoHandSword: 'TwoHandSword',
  DualSword: 'DualSword',
  Hammer: 'Hammer',
  Axe: 'Axe',
  Spear: 'Spear',
  Bat: 'Bat',
  Whip: 'Whip',
  Glove: 'Glove',
  Tonfa: 'Tonfa',
  HighAngleFire: 'HighAngleFire',
  DirectFire: 'DirectFire',
  Bow: 'Bow',
  CrossBow: 'CrossBow',
  Pistol: 'Pistol',
  AssaultRifle: 'AssaultRifle',
  SniperRifle: 'SniperRifle',
  Nunchaku: 'Nunchaku',
  Rapier: 'Rapier',
  Guitar: 'Guitar',
  Camera: 'Camera',
  Arcana: 'Arcana',
  VFArm: 'VFArm',
  Beverage: 'Beverage',
  SpecialBeverage: 'SpecialBeverage',
  SpecialFood: 'SpecialFood',
  Food: 'Food',
  Bounty: 'Bounty',
  Material: 'Material',
  None: 'None',
  Summon: 'Summon',
  GhostItem: 'GhostItem'
} as const;
export type SubType = keyof typeof SubType;
export const SubTypes: readonly SubType[] = Object.values(SubType);

export const EquipType = {
  Weapon: 'Weapon',
  Chest: 'Chest',
  Head: 'Head',
  Arm: 'Arm',
  Leg: 'Leg'
} as const;
export type EquipType = keyof typeof EquipType;
export const EquipTypes: readonly EquipType[] = Object.values(EquipType);

export interface ItemData {
  code: number;
  name: string;
  modeType: number;
  itemType: ItemType;
  subType: SubType;
  itemGrade: ItemGrade;
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
  parentItem: number[];
  manufacturableType: number;
  restoreItemWhenResurrected: boolean;
  creditValueWhenConvertedToBounty: number;
  equipType?: EquipType;
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
  itemUsableType: string;
  itemUsableValueList: number;
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
