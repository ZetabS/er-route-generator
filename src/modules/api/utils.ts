import type { Item, Recipe } from './Item';
import { ItemPile } from '@/modules/plan/ItemPile';

export function getSubItems(item: Item): ItemPile {
  const result: ItemPile = new ItemPile();
  const stack: [Item, number][] = [];
  result.add(this.item);
  stack.push([this.material1, 1 / this.item.initialCount]);
  stack.push([this.material2, 1 / this.item.initialCount]);

  while (stack.length > 0) {
    const [item, quantity] = stack.pop() as [Item, number];
    result.add(item, quantity);

    if (!item.recipe) {
      continue;
    }

    const materialQuantity = quantity / item.initialCount;
    stack.push([item.recipe.material1, materialQuantity]);
    stack.push([item.recipe.material2, materialQuantity]);
  }

  return result;
}