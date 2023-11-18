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
