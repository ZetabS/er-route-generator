import { ITEM, Item, ITEM_BY_NAME } from '@/modules/api';
import { ItemPile } from '@/modules/api/ItemPile';

import { getSubItems } from '@/modules/plan/utils';

describe('ItemPile', () => {
  const swordOfJustice: Item = ITEM[120302];
  const blooming = swordOfJustice.material1 as Item;
  const robePlus = swordOfJustice.material2 as Item;
  const rapier = blooming.material1 as Item;
  const flower = blooming.material2 as Item;
  const robe = robePlus.material1 as Item;
  const bandage = robePlus.material2 as Item;
  const needle = rapier.material1 as Item;
  const scrap = rapier.material2 as Item;

  test('constructor', () => {
    const pile1 = new ItemPile();
    expect(pile1.toString()).toBe('[]');
    const pile2 = new ItemPile([flower]);
    expect(pile2.toString()).toBe('[꽃(205102): 1]');
  });

  test('hash', () => {
    const pile1 = new ItemPile();
    const pile2 = new ItemPile([flower]);
    expect(pile1.hash()).not.toBe(pile2.hash());
  });

  test('length', () => {
    const pile = new ItemPile();
    expect(pile.length).toBe(0);
    pile.add(flower);
    expect(pile.length).toBe(1);
    pile.add(flower);
    expect(pile.length).toBe(1);
  });

  test('count', () => {
    const pile = new ItemPile();
    expect(pile.count).toBe(0);
    pile.add(flower);
    expect(pile.count).toBe(1);
    pile.add(flower);
    expect(pile.count).toBe(2);
  });

  test('filter', () => {
    const pile = new ItemPile([swordOfJustice, blooming, bandage, scrap]);
    expect(
      pile
        .filter((item) => item.itemGrade === 'Common')
        .toArray()
        .sort()
    ).toStrictEqual([bandage, scrap].sort());
  });

  test('add', () => {
    const pile = new ItemPile();
    pile.add(flower, 2.5);
    pile.add(scrap);
    pile.add(scrap);
    expect(pile.toArray().sort()).toStrictEqual([flower, flower, flower, scrap, scrap].sort());
    expect(pile.toString()).toBe('[꽃(205102): 2.5, 고철(401106): 2]');
  });

  test('remove', () => {
    const pile = new ItemPile();
    pile.add(flower, 3);
    pile.add(scrap, 2);
    pile.remove(flower, 1);
    expect(pile.toString()).toBe('[꽃(205102): 2, 고철(401106): 2]');
    expect(() => pile.remove(scrap, 3)).toThrowError();
  });

  test('setter getter', () => {
    const pile = new ItemPile();
    pile.set(flower, 3);
    expect(pile.get(flower)).toBe(3);
  });

  test('toString', () => {
    const pile = new ItemPile();
    pile.add(flower, 3);
    pile.add(scrap, 2);
    expect(pile.toString()).toBe('[꽃(205102): 3, 고철(401106): 2]');
  });

  test('has', () => {
    const pile = new ItemPile();
    pile.add(flower, 3);
    pile.add(scrap, 2);
    expect(pile.has(flower)).toBe(true);
    expect(pile.has(scrap)).toBe(true);
  });

  test('merge', () => {
    const pile1 = new ItemPile([scrap]);
    pile1.add(flower, 0.5);
    const pile2 = new ItemPile();
    pile2.add(bandage, 1.5);
    expect(pile1.merge(pile2).toString()).toBe(
      '[붕대(203102): 1.5, 꽃(205102): 0.5, 고철(401106): 1]'
    );
    const targetItems = [ITEM_BY_NAME['왕관'], ITEM_BY_NAME['지휘관의 갑옷'], ITEM_BY_NAME['황금']];

    expect(
      targetItems
        .reduce((result, item) => {
          return result.merge(getSubItems(item));
        }, new ItemPile())
        .toString()
    ).toBe(
      `[가위(101101): 1, 곡괭이(105102): 1.5, 쇠사슬(119101): 1, 모자(201102): 1, 베레모(201203): 1, 왕관(201401): 1, 천 갑옷(202106): 1, 가죽 갑옷(202201): 1, 사슬 갑옷(202302): 1, 지휘관의 갑옷(202412): 1, 가죽(401103): 1, 원석(401114): 1.5, 황금(401214): 3]`
    );
  });

  test('union', () => {
    const pile1 = new ItemPile();
    pile1.add(scrap, 4);

    const pile2 = new ItemPile();
    pile2.add(flower, 3);
    pile2.add(scrap, 2);

    const union = pile1.union(pile2);

    expect(union.toString()).toBe('[꽃(205102): 3, 고철(401106): 4]');
  });

  test('intersection', () => {
    const pile1 = new ItemPile();
    pile1.add(flower, 3);
    pile1.add(scrap, 2);
    pile1.add(bandage, 2);
    pile1.add(robe, 2);

    const pile2 = new ItemPile();
    pile2.add(flower, 2);
    pile2.add(scrap, 4);

    const intersection = pile1.intersection(pile2);

    expect(intersection.toString()).toBe('[꽃(205102): 2, 고철(401106): 2]');
  });

  test('difference', () => {
    const pile1 = new ItemPile();
    pile1.add(flower, 3);
    pile1.add(scrap, 2);

    const pile2 = new ItemPile();
    pile2.add(flower, 2);
    pile2.add(scrap, 4);

    const difference = pile1.difference(pile2);
    expect(difference.toArray().sort()).toStrictEqual([flower].sort());

    expect(difference.toString()).toBe('[꽃(205102): 1]');
  });

  test('symmetric difference', () => {
    const pile1 = new ItemPile();
    pile1.add(flower, 3);
    pile1.add(scrap, 2);

    const pile2 = new ItemPile();
    pile2.add(flower, 2);
    pile2.add(scrap, 4);

    const symmetricDifference = pile1.symmetricDifference(pile2);

    expect(symmetricDifference.toString()).toBe('[꽃(205102): 1, 고철(401106): 2]');
  });

  test('clone', () => {
    const pile = new ItemPile();
    pile.add(flower, 3);
    pile.add(scrap, 2);

    const clone = pile.clone();

    expect(clone.toString()).toBe('[꽃(205102): 3, 고철(401106): 2]');

    expect(clone).not.toBe(pile);

    clone.remove(flower, 2);
    expect(clone.toString()).toBe('[꽃(205102): 1, 고철(401106): 2]');
    expect(pile.toString()).toBe('[꽃(205102): 3, 고철(401106): 2]');
  });
});
