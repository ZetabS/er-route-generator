import { Inventory } from '@/modules/plan/Inventory';
import { Area, Item } from '@/modules/api';
import { ItemPile } from '@/modules/plan/ItemPile';

export class State {
  public inventory: Inventory;
  public materials: ItemPile;
  public craftingItems: ItemPile;

  constructor(inventory: Inventory, materials: ItemPile, craftingItems: ItemPile) {
    this.inventory = inventory;
    this.materials = materials;
    this.craftingItems = craftingItems;
  }

  toString(): string {
    return `State[inventory: ${this.inventory}, materials: ${this.materials}], craftingItems: ${this.craftingItems}`;
  }

  clone(): State {
    return new State(this.inventory.clone(), this.materials.clone(), this.craftingItems.clone());
  }

  destruct(): [Inventory, ItemPile, ItemPile] {
    return [this.inventory, this.materials, this.craftingItems];
  }
}

export function exploreAllPath(
  initialInventory: Inventory,
  initialMaterials: ItemPile,
  initialCraftingItems: ItemPile
): [Inventory | undefined, State | undefined] {
  const memoizationTable: Map<string, State> = new Map();
  const stack: State[] = [];
  let resultInventory: Inventory | undefined;
  let invalidState: State | undefined;

  stack.push(new State(initialInventory, initialMaterials, initialCraftingItems));

  while (stack.length > 0) {
    const state: State | undefined = stack.pop() as State;

    if (memoizationTable.has(state.toString())) {
      continue;
    } else {
      memoizationTable.set(state.toString(), state);
    }

    if (state.materials.isEmpty()) {
      resultInventory = initialInventory;
      continue;
    }

    if (
      initialMaterials.some((material: Item) => {
        if (initialInventory.canAdd(material)) {
          const nextState: State = state.clone();

          nextState.materials.remove(material);
          nextState.inventory.add(material);
          stack.push(nextState);
          return true;
        }
        return false;
      })
    ) {
      continue;
    }
    // ------------------craft------------------

    if (
      initialCraftingItems.some((craftingItem: Item) => {
        const material1: Item = craftingItem.material1 as Item; // Assume craftingItem always have material.
        const material2: Item = craftingItem.material2 as Item;
        const nextState: State = state.clone();

        if (initialInventory.has(material1) && initialInventory.has(material2)) {
          nextState.inventory.remove(material1);
          nextState.inventory.remove(material2);
        } else if (initialInventory.has(material1) && initialMaterials.includes(material2)) {
          nextState.inventory.remove(material1);
          nextState.materials.remove(material2);
        } else if (initialMaterials.includes(material1) && initialInventory.has(material2)) {
          nextState.materials.remove(material1);
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
      })
    ) {
      continue;
    }

    invalidState = state;
    break;
  }

  return [resultInventory, invalidState];
}

export function findNecessary(foundMaterials: ItemPile, areaAfter: Area[]): [ItemPile, ItemPile] {
  const areaAfterItems: ItemPile = new ItemPile();
  areaAfter.forEach((area) => {
    area.areaItems.forEach((item) => {
      areaAfterItems.add(item);
    });
  });
  const unnecessaryMaterials: ItemPile = foundMaterials.intersection(areaAfterItems);
  const necessaryMaterials: ItemPile = foundMaterials.difference(areaAfterItems);
  return [necessaryMaterials, unnecessaryMaterials];
}

export function findInArea(materials: ItemPile, area: Area): [ItemPile, ItemPile] {
  const foundMaterials: ItemPile = materials.intersection(area.areaItems);
  const remainMaterials: ItemPile = materials.difference(area.areaItems);
  return [foundMaterials, remainMaterials];
}
