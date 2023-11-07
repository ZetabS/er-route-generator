import { Inventory } from '@/modules/plan/Inventory';
import { Item } from '@/modules/api';
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
    return new State(
      this.inventory.clone(),
      this.remainMaterials.clone(),
      this.craftingItems.clone()
    );
  }
}

export interface CalculateResult {
  inventory: Inventory;
  materials: ItemPile;
  craftingItems: ItemPile;
  validState: State;
  invalidState: State;
}

export function calculateInventory(initialState: State, craftFirst: boolean): CalculateResult {
  const memoizationTable: Map<string, State> = new Map();
  const stack: State[] = [];
  let validState: State | undefined;
  let invalidState: State | undefined;

  stack.push(initialState);

  while (stack.length > 0) {
    const state: State | undefined = stack.pop() as State;

    if (memoizationTable.has(state.toString())) {
      continue;
    } else {
      memoizationTable.set(state.toString(), state);
    }

    if (state.remainMaterials.isEmpty()) {
      validState = state;
      continue;
    }

    if (craftFirst) {
      if (addItem(stack, state)) {
        continue;
      }

      if (craftItem(stack, state)) {
        continue;
      }
    } else {
      if (craftItem(stack, state)) {
        continue;
      }

      if (addItem(stack, state)) {
        continue;
      }
    }

    invalidState = state;
    break;
  }

  return {
    inventory: undefined,
    materials: undefined,
    craftingItems: undefined,
    validState: undefined,
    invalidState: undefined
  };
}

function addItem(stack: State[], state: State) {
  return state.remainMaterials.some((material: Item) => {
    if (state.inventory.canAdd(material)) {
      const nextState: State = state.clone();

      nextState.remainMaterials.remove(material);
      nextState.inventory.add(material);
      stack.push(nextState);
      return true;
    }
    return false;
  });
}

function craftItem(stack: State[], state: State) {
  return state.craftingItems.some((craftingItem: Item) => {
    const material1: Item = craftingItem.material1 as Item; // Assume craftingItem always have material.
    const material2: Item = craftingItem.material2 as Item;
    const nextState: State = state.clone();

    if (state.inventory.has(material1) && state.inventory.has(material2)) {
      nextState.inventory.remove(material1);
      nextState.inventory.remove(material2);
    } else if (state.inventory.has(material1) && state.remainMaterials.includes(material2)) {
      nextState.inventory.remove(material1);
      nextState.remainMaterials.remove(material2);
    } else if (state.remainMaterials.includes(material1) && state.inventory.has(material2)) {
      nextState.remainMaterials.remove(material1);
      nextState.inventory.remove(material2);
    } else {
      return false;
    }

    if (!nextState.inventory.canAdd(craftingItem)) {
      return false;
    }

    nextState.inventory.add(craftingItem);

    stack.push(nextState);
    return true;
  });
}
