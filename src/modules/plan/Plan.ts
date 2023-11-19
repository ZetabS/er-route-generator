import { Inventory } from './Inventory';
import { validatePlan } from './ValidatePlan';
import { ItemPile } from '@/modules/api';
import type { Area, Item } from '@/modules/api';

export class PlanState {
  public inventory: Inventory;
  public craftedInventory: Inventory;
  public remainMaterials: ItemPile;
  public craftingItems: ItemPile;

  constructor(
    inventory: Inventory,
    craftedInventory: Inventory,
    remainMaterials: ItemPile,
    craftingItems: ItemPile
  ) {
    this.inventory = inventory.clone();
    this.craftedInventory = craftedInventory.clone();
    this.remainMaterials = remainMaterials.clone();
    this.craftingItems = craftingItems.clone();
  }

  toString(): string {
    return (
      'PlanState[\n' +
      `inventory: ${this.inventory},\n` +
      `craftedInventory: ${this.craftedInventory},\n` +
      `remainMaterials: ${this.remainMaterials},\n` +
      `craftingItems: ${this.craftingItems}\n` +
      ']'
    );
  }

  clone(): PlanState {
    return new PlanState(
      this.inventory,
      this.craftedInventory,
      this.remainMaterials,
      this.craftingItems
    );
  }
}

export class Plan {
  private readonly _targetItems: Item[];
  private _route: Area[] = [];
  private planStates: PlanState[] = [];
  private _isValid: boolean = true;

  constructor(route: Area[], targetItems: Item[]) {
    this._route = [...route];
    this._targetItems = [...targetItems];
    [this.planStates, this._isValid] = validatePlan(targetItems, route);
  }

  public inventoryAt(n: number, crafted: boolean = true): Inventory {
    if (crafted) {
      return this.planStates[n]?.craftedInventory;
    } else {
      return this.planStates[n]?.inventory;
    }
  }

  public append(area: Area) {
    this._route.push(area);
  }

  public get route(): Area[] {
    return this._route;
  }

  public get targetItems(): Item[] {
    return this._targetItems;
  }

  public get length(): number {
    return this._route.length;
  }

  public get isValid(): boolean {
    return this._isValid;
  }
}
