import { itemDatabase } from './itemDatabase';
export const itemData: ItemData = itemDatabase;

export type Armor = Item & {
  armorType: string;
};

export type Weapon = Item & {
  weaponType: string;
};

export type ItemData = {
  [code: number | string]: Item;
};

export function filteredItemData(callback: CallableFunction) {
  const filteredItemData: ItemData = {};

  for (const key in itemData) {
    const item = itemData[key];
    if (callback(item)) {
      filteredItemData[key] = item;
    }
  }

  return filteredItemData;
}

function getUniqueElementsByKey(key: string): Array<string | number> {
  const uniqueElements: Array<string | number> = [];

  for (const code in itemData) {
    const element = itemData[code][key];
    if (!uniqueElements.includes(element)) {
      uniqueElements.push(element);
    }
  }

  return uniqueElements;
}

export const allItemTypes = getUniqueElementsByKey('itemType');
export const allWeaponTypes = getUniqueElementsByKey('weaponType');

export const equipableItemTypes = ['Weapon', 'Chest', 'Head', 'Arm', 'Leg'];

export interface Item {
  [key: string]: any;
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
  exclusiveProducer: number;
  isRemovedFromPlayerCorpseInventoryWhenPlayerKilled: boolean;
  makeMaterial1: number;
  makeMaterial2: number;
  notDisarm: boolean;
  consumable: boolean;
  manufacturableType: number;
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
  restoreItemWhenResurrected: boolean;
  creditValueWhenConvertedToBounty: number;
}
