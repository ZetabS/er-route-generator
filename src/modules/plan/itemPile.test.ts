import { ITEM, Item } from '@/modules/api';
import { ItemPile } from './ItemPile';

describe('ItemPile', () => {
  let item1: Item;
  let item2: Item;

  beforeEach(() => {
    item1 = ITEM['꽃'];
    item2 = ITEM['고철'];
  });

  it('should create an empty ItemPile', () => {
    const pile = new ItemPile();
    expect(pile.toString()).toBe('[]');
  });

  it('should create an empty ItemPile', () => {
    const pile = new ItemPile([item1]);
    expect(pile.toString()).toBe('[꽃(205102): 1]');
  });

  it('should add items to the ItemPile', () => {
    const pile = new ItemPile();
    pile.add(item1, 3);
    pile.add(item2);
    pile.add(item2);
    expect(pile.toArray().sort()).toStrictEqual([item1, item1, item1, item2, item2].sort());
    expect(pile.toString()).toBe('[꽃(205102): 3, 고철(401106): 2]');
  });

  it('should remove items from the ItemPile', () => {
    const pile = new ItemPile();
    pile.add(item1, 3);
    pile.add(item2, 2);
    pile.remove(item1, 1);
    expect(pile.toString()).toBe('[꽃(205102): 2, 고철(401106): 2]');
    pile.remove(item2, 3);
    expect(pile.toString()).toBe('[꽃(205102): 2]');
  });

  it('should check if an item is included in the ItemPile', () => {
    const pile = new ItemPile();
    pile.add(item1, 3);
    pile.add(item2, 2);
    expect(pile.includes(item1)).toBe(true);
    expect(pile.includes(item2)).toBe(true);
  });

  it('should calculate the union of two ItemPiles', () => {
    const pile1 = new ItemPile();
    pile1.add(item2, 4);

    const pile2 = new ItemPile();
    pile2.add(item1, 3);
    pile2.add(item2, 2);

    const union = pile1.union(pile2);

    expect(union.toString()).toBe('[꽃(205102): 3, 고철(401106): 4]');
  });

  it('should calculate the intersection of two ItemPiles', () => {
    const pile1 = new ItemPile();
    pile1.add(item1, 3);
    pile1.add(item2, 2);

    const pile2 = new ItemPile();
    pile2.add(item1, 2);
    pile2.add(item2, 4);

    const intersection = pile1.intersection(pile2);

    expect(intersection.toString()).toBe('[꽃(205102): 2, 고철(401106): 2]');
  });

  it('should calculate the difference between two ItemPiles', () => {
    const pile1 = new ItemPile();
    pile1.add(item1, 3);
    pile1.add(item2, 2);

    const pile2 = new ItemPile();
    pile2.add(item1, 2);
    pile2.add(item2, 4);

    const difference = pile1.difference(pile2);
    expect(difference.toArray().sort()).toStrictEqual([item1].sort());

    expect(difference.toString()).toBe('[꽃(205102): 1]');
  });

  it('should calculate the symmetric difference between two ItemPiles', () => {
    const pile1 = new ItemPile();
    pile1.add(item1, 3);
    pile1.add(item2, 2);

    const pile2 = new ItemPile();
    pile2.add(item1, 2);
    pile2.add(item2, 4);

    const symmetricDifference = pile1.symmetricDifference(pile2);

    expect(symmetricDifference.toString()).toBe('[꽃(205102): 1, 고철(401106): 2]');
  });

  it('should create a clone of the ItemPile', () => {
    const pile = new ItemPile();
    pile.add(item1, 3);
    pile.add(item2, 2);

    const clone = pile.clone();

    expect(clone.toString()).toBe('[꽃(205102): 3, 고철(401106): 2]');

    // Ensure that the clone is a separate object
    expect(clone).not.toBe(pile);

    // Ensure that modifying the clone doesn't affect the original
    clone.remove(item1, 2);
    expect(clone.toString()).toBe('[꽃(205102): 1, 고철(401106): 2]');
    expect(pile.toString()).toBe('[꽃(205102): 3, 고철(401106): 2]');
  });
});
