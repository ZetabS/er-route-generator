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
const tights = ITEM_BY_NAME['타이즈'];
const leather = ITEM_BY_NAME['가죽'];

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

    const inventory2 = new Inventory([flower]);
    expect(inventory2.toArray()).toStrictEqual([flower]);

    const inventory3 = new Inventory([flower, needle]);
    expect(inventory3.toArray()).toStrictEqual([flower, needle]);

    const inventory4 = new Inventory(targetItems);
    expect(inventory4.toArray()).toStrictEqual(targetItems);
  });

  test('add', () => {
    const inventory = new Inventory();
    expect(inventory.add(scrap)).toBe(true);
    expect(inventory.toArray().sort()).toStrictEqual([scrap].sort());
    expect(inventory.add(needle)).toBe(true);
    expect(inventory.toArray().sort()).toStrictEqual([scrap, needle].sort());
    expect(inventory.add(flower)).toBe(true);
    expect(inventory.toArray().sort()).toStrictEqual([scrap, needle, flower].sort());
    expect(inventory.add(leather)).toBe(true);
    expect(inventory.toArray().sort()).toStrictEqual([scrap, needle, flower, leather].sort());

    const inventory2 = new Inventory();
    expect(inventory2.add(ITEM_BY_NAME['활빈검'], 12)).toBe(false);
    expect(inventory2.add(ITEM_BY_NAME['활빈검'], 11)).toBe(true);
    expect(inventory2.add(ITEM_BY_NAME['활빈검'])).toBe(false);
  });

  test('remove', () => {
    const inventory = new Inventory([flower, needle]);
    inventory.remove(flower);
    expect(inventory.toArray()).toStrictEqual([needle]);
    inventory.remove(needle);
    expect(inventory.toArray()).toStrictEqual([]);
  });

  test('clone', () => {
    const inventory1 = new Inventory(targetItems);
    const inventory2 = inventory1.clone();
    inventory1.remove(swordOfJustice);
    expect(inventory2.toArray().sort()).toStrictEqual(targetItems.sort());
  });
});
