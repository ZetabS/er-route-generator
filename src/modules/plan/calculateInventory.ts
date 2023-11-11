import { Item } from '@/modules/api';
import { Inventory } from '@/modules/plan/Inventory';
import { ItemPile } from '@/modules/plan/ItemPile';

export class State {
  public inventory: Inventory;
  public remainRequiredMaterials: ItemPile;
  public remainOptionalMaterials: ItemPile;
  public craftingItems: ItemPile;

  constructor(
    inventory: Inventory,
    remainRequiredMaterials: ItemPile,
    remainOptionalMaterials: ItemPile,
    craftingItems: ItemPile
  ) {
    this.inventory = inventory.clone();
    this.remainRequiredMaterials = remainRequiredMaterials.clone();
    this.remainOptionalMaterials = remainOptionalMaterials.clone();
    this.craftingItems = craftingItems.clone();
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
      this.craftingItems
    );
  }
}

export function calculateInventory(
  initialState: State,
  craftFirst: boolean
): [State | undefined, boolean] {
  let result: State | undefined;
  let canBeInvalidByInsertOrder = false;
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

  state.remainRequiredMaterials.forEach((material: Item, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      if (state.inventory.canAdd(material)) {
        const nextState: State = state.clone();

        nextState.remainRequiredMaterials.remove(material);
        nextState.inventory.add(material);
        stack.push(nextState);
        found = true;
      }
    }
  });

  state.remainOptionalMaterials.forEach((material: Item, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      if (state.inventory.canAdd(material)) {
        const nextState: State = state.clone();

        nextState.remainOptionalMaterials.remove(material);
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

    if (state.inventory.has(material1)) {
      nextState.inventory.remove(material1);

      if (state.inventory.has(material2)) {
        nextState.inventory.remove(material2);
      } else if (state.remainRequiredMaterials.has(material2)) {
        nextState.remainRequiredMaterials.remove(material2);
      } else if (state.remainOptionalMaterials.has(material2)) {
        nextState.remainOptionalMaterials.remove(material2);
      } else {
        return;
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
        return;
      }
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
