import type { EquipType, ItemGrade, ItemType, SubType } from '@/modules/api/enums';
import type { ItemPile } from '@/modules/api/ItemPile';

export type Key = string | number;
export type LanguageData = {
  [p: Key]: string;
};

export interface Area {
  equals(other: Area): boolean;

  code: number;
  name: string;
  isHyperLoopInstalled: boolean;
  nearByArea: Area[];
  areaItems: ItemPile;
  nonCollectableItems: ItemPile;
  collectableItems: ItemPile;
}

export interface Item {
  equals(other: Item): boolean;

  toString(): string;

  code: number;
  name: string;
  itemType: ItemType;
  subType: SubType;
  itemGrade: ItemGrade;
  stackable: number;
  manufacturableType: number;
  initialCount: number;
  equipType?: EquipType;
  materials?: [Item, Item];
  material1?: Item;
  material2?: Item;
  parentItems: Item[];
}

export interface ItemSpawnData {
  itemCode: number;
  dropCount: number;
}

export interface AreaData {
  code: number;
  name: string;
  isHyperLoopInstalled: boolean;
  nearByAreaCodes: number[];
  itemSpawns: ItemSpawnData[];
  collectableItems: number[];
}

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
