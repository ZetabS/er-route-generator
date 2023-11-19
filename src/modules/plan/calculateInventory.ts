import { Item } from '@/modules/api';
import { Inventory } from '@/modules/plan/Inventory';
import { ItemPile } from '@/modules/api/ItemPile';

export class State {
  public inventory: Inventory;
  public remainRequiredMaterials: ItemPile;
  public remainOptionalMaterials: ItemPile;
  public craftingItems: ItemPile;
  public addedItems: ItemPile;

  constructor(
    inventory: Inventory,
    remainRequiredMaterials: ItemPile,
    remainOptionalMaterials: ItemPile,
    craftingItems: ItemPile,
    addedItems: ItemPile
  ) {
    this.inventory = inventory.clone();
    this.remainRequiredMaterials = remainRequiredMaterials.clone();
    this.remainOptionalMaterials = remainOptionalMaterials.clone();
    this.craftingItems = craftingItems.clone();
    this.addedItems = addedItems.clone();
  }

  toString(): string {
    return (
      `State[\n` +
      `inventory: ${this.inventory}, \n` +
      `remainRequiredMaterials: ${this.remainRequiredMaterials}], \n` +
      `remainOptionalMaterials: ${this.remainOptionalMaterials}], \n` +
      `craftingItems: ${this.craftingItems}\n` +
      `]`
    );
  }

  clone(): State {
    return new State(
      this.inventory,
      this.remainRequiredMaterials,
      this.remainOptionalMaterials,
      this.craftingItems,
      this.addedItems
    );
  }
}

export function calculateInventory(
  initialState: State,
  craftFirst: boolean
): [State | undefined, boolean] {
  let result: State | undefined;
  let canBeInvalidByInsertOrder = false;
  const memoizationTable: Record<string, boolean> = {};
  const stack: State[] = [];

  stack.push(initialState);

  while (stack.length > 0) {
    const state: State = stack.pop() as State;
    const stateString = state.addedItems.hash();

    if (memoizationTable[stateString]) {
      continue;
    } else {
      memoizationTable[stateString] = true;
    }

    if (craftFirst) {
      if (craftItem(stack, state)) {
        continue;
      }
    }

    if (
      state.remainRequiredMaterials.isEmpty() &&
      (!result || result.remainOptionalMaterials.count > state.remainOptionalMaterials.count)
    ) {
      result = state.clone();
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

    if (!state.remainRequiredMaterials.isEmpty()) {
      canBeInvalidByInsertOrder = true;
    }
  }

  return [result, canBeInvalidByInsertOrder];
}

function addItem(stack: State[], state: State): boolean {
  let found = false;

  let nextState: State = state.clone();
  for (const [material] of state.remainRequiredMaterials) {
    if (nextState.inventory.add(material)) {
      nextState.remainRequiredMaterials.remove(material);
      nextState.addedItems.add(material);
      stack.push(nextState);
      found = true;
      nextState = state.clone();
    }
  }

  for (const [material] of state.remainOptionalMaterials) {
    if (nextState.inventory.add(material)) {
      nextState.remainOptionalMaterials.remove(material);
      nextState.addedItems.add(material);
      stack.push(nextState);
      found = true;
      nextState = state.clone();
    }
  }

  return found;
}

function craftItem(stack: State[], state: State): boolean {
  let found = false;
  for (const [craftingItem, quantity] of state.craftingItems) {
    const material1: Item = craftingItem.material1 as Item; // Assume craftingItem always have material.
    const material2: Item = craftingItem.material2 as Item;
    const nextState: State = state.clone();

    if (state.inventory.has(material1)) {
      nextState.inventory.remove(material1);

      if (state.inventory.has(material2)) {
        nextState.inventory.remove(material2);
      } else if (state.remainRequiredMaterials.has(material2)) {
        nextState.remainRequiredMaterials.remove(material2);
      } else if (state.remainOptionalMaterials.has(material2)) {
        nextState.remainOptionalMaterials.remove(material2);
      } else {
        continue;
      }
    } else if (state.inventory.has(material2)) {
      nextState.inventory.remove(material2);

      if (state.inventory.has(material1)) {
        nextState.inventory.remove(material1);
      } else if (state.remainRequiredMaterials.has(material1)) {
        nextState.remainRequiredMaterials.remove(material1);
      } else if (state.remainOptionalMaterials.has(material1)) {
        nextState.remainOptionalMaterials.remove(material1);
      } else {
        continue;
      }
    } else {
      continue;
    }

    const calculatedQuantity = Math.min(craftingItem.initialCount, Math.max(quantity, 1));

    if (!nextState.inventory.add(craftingItem, calculatedQuantity)) {
      continue;
    }

    nextState.craftingItems.remove(craftingItem, calculatedQuantity);
    nextState.addedItems.add(craftingItem, calculatedQuantity);

    stack.push(nextState);
    found = true;
  }

  return found;
}
