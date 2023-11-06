import { Inventory } from '@/modules/plan/Inventory';
import { Area, Item } from '@/modules/api';
import { removeAt } from '@/common/utils';
import type { ItemPile } from '@/modules/plan/ItemPile';

export class State {
  public _inventory: Inventory;
  public _materials: ItemPile;

  constructor(inventory: Inventory, materials: ItemPile) {
    this._inventory = inventory;
    this._materials = materials;
  }

  destruct(): [Inventory, ItemPile] {
    return [this.inventory, this.materials];
  }

  get inventory(): Inventory {
    return this._inventory.clone();
  }

  get materials(): ItemPile {
    return this._materials.clone();
  }

  hashCode(): string {
    const inventoryItemsString = this._inventory.items
      .map((item) => item.code)
      .sort()
      .join(',');
    const materialsString = this._materials.toString();
    return `State[inventory: ${inventoryItemsString}, materials: ${materialsString}]`;
  }

  toString(): string {
    return `State[inventory: ${this._inventory.items + ''}, materials: ${this._materials + ''}]`;
  }
}

export function exploreAllPath(
  targetItems: Item[],
  inventory: Inventory,
  materials: Item[],
  craftableItems: Item[]
): [Inventory | undefined, State] {
  const memoizationTable: Map<string, State> = new Map();
  // TODO: item을 키로, 수량을 값으로 가지는 자료구조 만들기.
  const stack: State[] = [];
  let completeInventory: Inventory | undefined;
  let invalidState: State;
  let count = 0;

  stack.push(new State(inventory, materials));

  while (stack.length > 0) {
    const state = stack.pop();
    if (memoizationTable.has(state.hashCode())) {
      continue;
    } else {
      memoizationTable.set(state.hashCode(), state);
    }

    const [inventory, materials] = state.destruct();
    // console.log();
    // console.log(`시작`);
    // console.log(state.toString());

    if (materials.length === 0) {
      // console.log(`재료가 남아있지 않음.`);
      completeInventory = inventory;
      // console.log(`completeInventory: ${completeInventory.items + ''}`);
      continue;
    }

    const addableItemIndexes: boolean[] = materials.map((item) => inventory.canAdd(item));

    if (addableItemIndexes.some((canAdd) => canAdd)) {
      addableItemIndexes.forEach((canAdd, index) => {
        if (canAdd) {
          stack.push(getItemAddedStateByIndex(state, index));
        }
      });
      continue;
    }

    // ------------------craft------------------

    if (count === 0) {
      break;
    }
    count++;
    let notCraftable = true;
    for (const craftedItem of craftableItems) {
      const material1: Item = craftedItem.material1 as Item;
      const material2: Item = craftedItem.material2 as Item;
      const nextInventory: Inventory = inventory.clone();
      const nextMaterials: Item[] = [...materials];

      if (nextInventory.has(material1)) {
        if (nextInventory.has(material2)) {
          // console.log(`${craftedItem.name} 제작`);
          nextInventory.remove(material1);
          nextInventory.remove(material2);
          const state = new State(nextInventory, nextMaterials);
          // console.log(state.toString());
          stack.push(state);
          notCraftable = false;
        } else {
          const index = materials.indexOf(material2);
          if (index !== -1) {
            // console.log(`${craftedItem.name} 제작`);
            nextInventory.remove(material1);
            const state = new State(nextInventory, removeAt(nextMaterials, index));
            // console.log(state.toString());
            stack.push(state);
            notCraftable = false;
          }
        }
      } else if (nextInventory.has(material2)) {
        const index = materials.indexOf(material1);
        if (index !== -1) {
          // console.log(`${craftedItem.name} 제작`);
          nextInventory.remove(material1);
          const state = new State(nextInventory, removeAt(nextMaterials, index));
          // console.log(state.toString());
          stack.push(state);
          notCraftable = false;
        }
      }
    }

    if (notCraftable) {
      invalidState = state;
      break;
    }
  }

  return [completeInventory, invalidState];
}

function getItemAddedStateByIndex(state: State, index) {
  const [inventory, materials] = state.destruct();
  const material = materials[index];

  inventory.add(material);

  const newState = new State(inventory, materials.splice(index, 1));
  // console.log(`${material} 넣음.`);
  // console.log(nextState.toString());
  return newState;
}

export function findNecessaryMaterials(
  foundMaterials: Item[],
  areaAfter: Area[]
): [Item[], Item[]] {
  const necessaryMaterials: Item[] = [...foundMaterials];
  const unnecessaryMaterials: Item[] = [];
  const areaAfterItems: Item[][] = areaAfter.map((area) => [...area.areaItems]);

  let found: boolean = true;
  while (found) {
    for (let i = 0; i < necessaryMaterials.length; i++) {
      const material: Item = necessaryMaterials[i];
      found = false;
      for (const areaItems of areaAfterItems) {
        for (let j = 0; j < areaItems.length; j++) {
          const areaItem = areaItems[j];
          if (material === areaItem) {
            necessaryMaterials.splice(i, 1);
            areaItems.splice(j, 1);
            unnecessaryMaterials.push(material);
            found = true;
            break;
          }
        }
        if (found) {
          break;
        }
      }
      if (found) {
        break;
      }
    }
  }
  return [necessaryMaterials, unnecessaryMaterials];
}

export function findMaterialsInArea(materials: Item[], area: Area): [Item[], Item[]] {
  const areaItems: Item[] = [...area.areaItems];
  const foundMaterials: Item[] = [];
  const remainMaterials: Item[] = [...materials];
  let found: boolean = true;

  while (found) {
    for (let i = 0; i < remainMaterials.length; i++) {
      const material: Item = remainMaterials[i];
      found = false;
      for (let j = 0; j < areaItems.length; j++) {
        const areaItem = areaItems[j];
        if (material === areaItem) {
          remainMaterials.splice(i, 1);
          areaItems.splice(j, 1);
          foundMaterials.push(material);
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
  }

  return [foundMaterials, remainMaterials];
}
