import { Inventory } from './Inventory';
import { Area, Item } from '@/modules/api';
import { exploreAllPath, findInArea, findNecessary, State } from './utils';
import { ItemPile } from '@/modules/plan/ItemPile';

export class RouteState {
  public inventory: Inventory;
  public materials: Item[];

  constructor(nextInventory: Inventory, nextMaterials: Item[]) {
    this.inventory = nextInventory.clone();
    this.materials = [...nextMaterials];
  }

  destruct(): [Inventory, Item[]] {
    return [this.inventory, this.materials];
  }

  toString(): string {
    return `State[inventory: ${this.inventory.items + ''}, materials: ${this.materials + ''}]`;
  }
}

export class Plan {
  private readonly _targetItems: Item[];
  private readonly route: Area[] = [];
  private inventories: Inventory[] = [];
  private invalidStates: State[] = [];
  private necessaryMaterials: Item[][] = [];
  private unnecessaryMaterials: Item[][] = [];
  private _isValid: boolean = true;

  constructor(route: Area[], targetItems: Item[]) {
    this.route = [...route];
    this._targetItems = [...targetItems];
    this.calculateRoute();
  }

  calculateRoute() {
    let inventory: Inventory = new Inventory();
    let invalidState;
    let foundMaterials;
    let materialsMustCollectAtCurrentArea;
    let unnecessaryMaterials;
    let remainCollectableMaterials: ItemPile = this.targetItems.reduce(
      (pile, item: Item): ItemPile => {
        if (item.recipe) {
          return pile.union(item.recipe.getCommonMaterials());
        }
        return pile;
      },
      new ItemPile()
    );

    let craftableItems: ItemPile = this.targetItems
      .reduce((pile, item: Item): ItemPile => {
        if (item.recipe) {
          return pile.union(item.recipe.getSubMaterials());
        }
        return pile;
      }, new ItemPile())
      .difference(remainCollectableMaterials);

    for (let routeNumber = 0; routeNumber < this.route.length; routeNumber++) {
      if (!inventory) {
        this._isValid = false;
        break;
      }
      console.log('-----------------------------------------------------------------------');
      const area: Area = this.route[routeNumber];
      const areaAfter: Area[] = [...this.route.slice(routeNumber + 1, this.length)];
      [foundMaterials, remainCollectableMaterials] = findInArea(remainCollectableMaterials, area);
      [materialsMustCollectAtCurrentArea, unnecessaryMaterials] = findNecessary(
        foundMaterials,
        areaAfter
      );
      [inventory, invalidState, craftableItems] = exploreAllPath(
        this._targetItems,
        inventory,
        materialsMustCollectAtCurrentArea,
        craftableItems
      );

      this.inventories.push(inventory);
      this.invalidStates.push(invalidState);
      this.necessaryMaterials.push(materialsMustCollectAtCurrentArea);
      this.unnecessaryMaterials.push(unnecessaryMaterials);
      console.log(`completeInventory: ${inventory.items + ''}`);
      console.log(`invalidState: ${invalidState?.toString()}`);
    }
  }

  inventoryAt(routeNumber: number): Inventory {
    return this.inventories[routeNumber];
  }

  get targetItems(): Item[] {
    return this._targetItems;
  }

  get length(): number {
    return this.route.length;
  }

  get inventory(): Inventory {
    if (this.inventories.length > 0) {
      return this.inventories[this.inventories.length - 1][0].clone();
    } else {
      return new Inventory();
    }
  }

  get isValid(): boolean {
    return this._isValid;
  }
}
