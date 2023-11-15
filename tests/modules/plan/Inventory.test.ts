import { describe, expect, test } from 'vitest';
import { Inventory } from '@/modules/plan/Inventory';
import { Item, ITEM, ITEM_BY_NAME } from '@/modules/api';

const swordOfJustice: Item = ITEM[120302];
const blooming = swordOfJustice.material1 as Item;
const robePlus = swordOfJustice.material2 as Item;
const rapier = blooming.material1 as Item;
const flower = blooming.material2 as Item;
const robe = robePlus.material1 as Item;
const bandage = robePlus.material2 as Item;
const needle = rapier.material1 as Item;
const scrap = rapier.material2 as Item;

const targetItems: Item[] = [
  ITEM_BY_NAME['활빈검'],
  ITEM_BY_NAME['지휘관의 갑옷'],
  ITEM_BY_NAME['제국 왕관'],
  ITEM_BY_NAME['드라우프니르'],
  ITEM_BY_NAME['SCV']
];

describe('Inventory', () => {
  test('constructor', () => {
    const inventory = new Inventory();
    expect(inventory.toArray()).toStrictEqual([]);

    const inventory2 = new Inventory(flower);
    expect(inventory2.toArray()).toStrictEqual([flower]);

    const inventory3 = new Inventory(flower, needle);
    expect(inventory3.toArray()).toStrictEqual([flower, needle]);

    const inventory4 = new Inventory(...targetItems);
    expect(inventory4.toArray()).toStrictEqual(targetItems);
  });

  test('Inventory add', () => {
    const inventory = new Inventory();
    expect(inventory.add(scrap)).toBe(true);
    expect(inventory.toArray().sort()).toStrictEqual([scrap].sort());
    expect(inventory.add(needle)).toBe(true);
    expect(inventory.toArray().sort()).toStrictEqual([scrap, needle].sort());
    expect(inventory.add(bandage)).toBe(true);
    expect(inventory.toArray().sort()).toStrictEqual([scrap, needle, bandage].sort());
    expect(inventory.add(flower)).toBe(true);
    expect(inventory.toArray().sort()).toStrictEqual([scrap, needle, bandage, flower].sort());
  });

  test('Inventory canAdd', () => {
    const inventory = new Inventory();
    expect(inventory.add(flower)).toBe(true);
    expect(inventory.add(flower)).toBe(true);
    expect(inventory.add(needle)).toBe(true);
    expect(inventory.add(robe)).toBe(true);
    expect(inventory.canAdd(flower)).toBe(true);
  });

  test('Inventory remove', () => {
    const inventory = new Inventory(flower, needle);
    inventory.remove(flower);
    expect(inventory.toArray()).toStrictEqual([needle]);
    inventory.remove(needle);
    expect(inventory.toArray()).toStrictEqual([]);
  });
});
