import { Item } from '@/modules/api';
import { Inventory } from '@/modules/plan/Inventory';
import { ItemPile } from '@/modules/plan/ItemPile';

export class State {
  public inventory: Inventory;
  public remainMaterials: ItemPile;
  public craftingItems: ItemPile;

  constructor(inventory: Inventory, remainMaterials: ItemPile, craftingItems: ItemPile) {
    this.inventory = inventory.clone();
    this.remainMaterials = remainMaterials.clone();
    this.craftingItems = craftingItems.clone();
  }

  toString(): string {
    return `State[inventory: ${this.inventory}, materials: ${this.remainMaterials}], craftingItems: ${this.craftingItems}`;
  }

  clone(): State {
    return new State(this.inventory, this.remainMaterials, this.craftingItems);
  }
}

export function calculateInventory(initialState: State, craftFirst: boolean): State {
  const result: State = initialState.clone();
  const memoizationTable: Map<string, State> = new Map();
  const stack: State[] = [];

  stack.push(initialState);

  while (stack.length > 0) {
    const state: State | undefined = stack.pop() as State;

    if (memoizationTable.has(state.toString())) {
      continue;
    } else {
      memoizationTable.set(state.toString(), state);
    }

    if (craftFirst) {
      if (craftItem(stack, state)) {
        continue;
      }
    }

    if (state.remainMaterials.isEmpty()) {
      result.inventory = state.inventory;
      result.remainMaterials = state.remainMaterials;
      result.craftingItems = state.craftingItems;
      continue;
    }

    if (addItem(stack, state)) {
      continue;
    }

    if (!craftFirst) {
      if (craftItem(stack, state)) {
        continue;
      }
    }
    console.log('실패');
  }

  return result;
}

function addItem(stack: State[], state: State): boolean {
  let found = false;

  state.remainMaterials.forEach((material: Item, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      if (state.inventory.canAdd(material)) {
        const nextState: State = state.clone();

        nextState.remainMaterials.remove(material);
        nextState.inventory.add(material);
        stack.push(nextState);
        found = true;
      }
    }
  });

  return found;
}

function craftItem(stack: State[], state: State): boolean {
  let found = false;
  state.craftingItems.forEach((craftingItem: Item, quantity) => {
    const material1: Item = craftingItem.material1 as Item; // Assume craftingItem always have material.
    const material2: Item = craftingItem.material2 as Item;
    const nextState: State = state.clone();

    if (state.inventory.has(material1) && state.inventory.has(material2)) {
      nextState.inventory.remove(material1);
      nextState.inventory.remove(material2);
    } else if (state.inventory.has(material1) && state.remainMaterials.has(material2)) {
      nextState.inventory.remove(material1);
      nextState.remainMaterials.remove(material2);
    } else if (state.remainMaterials.has(material1) && state.inventory.has(material2)) {
      nextState.remainMaterials.remove(material1);
      nextState.inventory.remove(material2);
    } else {
      return;
    }

    if (!nextState.inventory.canAdd(craftingItem)) {
      return;
    }

    nextState.craftingItems.remove(
      craftingItem,
      Math.min(craftingItem.initialCount, Math.max(quantity, 1))
    );
    nextState.inventory.add(
      craftingItem,
      Math.min(craftingItem.initialCount, Math.max(quantity, 1))
    );

    stack.push(nextState);
    found = true;
  });
  return found;
}
