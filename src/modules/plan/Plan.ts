import { Inventory } from './Inventory';
import { Area, Item } from '@/modules/api';
import {
  exploreAllPath,
  findMaterialsInArea,
  findNecessaryMaterials,
  getSubRecipes,
  State
} from './utils';

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
    this.route = route;
    this._targetItems = targetItems;
    this.calculateRoute();
  }

  calculateRoute() {
    let inventory: Inventory = new Inventory();
    let invalidState;
    let foundMaterials;
    let necessaryMaterials;
    let unnecessaryMaterials;
    let remainMaterials: Item[] = this.targetItems.map((item: Item) => item.allMaterials).flat();
    let craftableItems: Item[] = this.targetItems.map((item: Item) => getSubRecipes(item)).flat();

    for (let routeNumber = 0; routeNumber < this.route.length; routeNumber++) {
      if (!inventory) {
        this._isValid = false;
        break;
      }
      console.log('-----------------------------------------------------------------------');
      const area = this.route[routeNumber];
      const areaAfter = [...this.route.slice(routeNumber + 1, this.length)];
      [foundMaterials, remainMaterials] = findMaterialsInArea(remainMaterials, area);
      [necessaryMaterials, unnecessaryMaterials] = findNecessaryMaterials(
        foundMaterials,
        areaAfter
      );
      [inventory, invalidState, craftableItems] = exploreAllPath(
        this._targetItems,
        inventory,
        necessaryMaterials,
        craftableItems
      );

      this.inventories.push(inventory);
      this.invalidStates.push(invalidState);
      this.necessaryMaterials.push(necessaryMaterials);
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
