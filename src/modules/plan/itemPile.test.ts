import { ITEM, Item } from '@/modules/api';
import { ItemPile } from './ItemPile';

describe('ItemPile', () => {
  let flower: Item;
  let scrap: Item;

  beforeEach(() => {
    flower = ITEM['꽃'];
    scrap = ITEM['고철'];
  });

  test('constructor', () => {
    const pile1 = new ItemPile();
    expect(pile1.toString()).toBe('[]');
    const pile2 = new ItemPile([flower]);
    expect(pile2.toString()).toBe('[꽃(205102): 1]');
  });

  test('add', () => {
    const pile = new ItemPile();
    pile.add(flower, 3);
    pile.add(scrap);
    pile.add(scrap);
    expect(pile.toArray().sort()).toStrictEqual([flower, flower, flower, scrap, scrap].sort());
    expect(pile.toString()).toBe('[꽃(205102): 3, 고철(401106): 2]');
  });

  test('remove', () => {
    const pile = new ItemPile();
    pile.add(flower, 3);
    pile.add(scrap, 2);
    pile.remove(flower, 1);
    expect(pile.toString()).toBe('[꽃(205102): 2, 고철(401106): 2]');
    pile.remove(scrap, 3);
    expect(pile.toString()).toBe('[꽃(205102): 2]');
  });

  test('toString', () => {
    const pile = new ItemPile();
    pile.add(flower, 3);
    pile.add(scrap, 2);
    expect(pile.toString()).toBe('[꽃(205102): 3, 고철(401106): 2]');
  });

  test('includes', () => {
    const pile = new ItemPile();
    pile.add(flower, 3);
    pile.add(scrap, 2);
    expect(pile.includes(flower)).toBe(true);
    expect(pile.includes(scrap)).toBe(true);
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
