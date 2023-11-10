import { Inventory } from './Inventory';
import { Area, Item } from '@/modules/api';
import { calculateInventory, getSubItems, separateMaterialsByRequirement, State } from './utils';
import { ItemPile } from '@/modules/plan/ItemPile';
import { ItemGrade } from '@/modules/api/enums';

export interface SeparatedMaterials {
  requiredMaterials: ItemPile;
  optionalMaterials: ItemPile;
}

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
      'State[' +
      `inventory: ${this.inventory}, ` +
      `craftedInventory: ${this.craftedInventory}, ` +
      `remainMaterials: ${this.remainMaterials}, ` +
      `craftingItems: ${this.craftingItems}` +
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
  private readonly route: Area[] = [];
  private planStates: PlanState[] = [];
  private _isValid: boolean = true;

  constructor(route: Area[], targetItems: Item[]) {
    this.route = [...route];
    this._targetItems = [...targetItems];
    this.validate();
  }

  validate() {
    const initialSubMaterials: ItemPile = getSubItems(this.targetItems);
    const initialRemainMaterials: ItemPile = initialSubMaterials.filter(
      (item: Item) => item.itemGrade === ItemGrade.Common
    );

    const initialCraftingItems: ItemPile = initialSubMaterials.filter(
      (item: Item) => item.itemGrade !== ItemGrade.Common
    );

    const planState: PlanState = new PlanState(
      new Inventory(),
      new Inventory(),
      initialRemainMaterials,
      initialCraftingItems
    );

    for (let routeNumber = 0; routeNumber < this.route.length; routeNumber++) {
      const currentArea: Area = this.route[routeNumber];
      const plannedAreas: Area[] = [...this.route.slice(routeNumber + 1, this.length)];
      const separatedMaterials: SeparatedMaterials = separateMaterialsByRequirement(
        planState.remainMaterials,
        currentArea,
        plannedAreas
      );

      const initialState: State = new State(
        planState.craftedInventory,
        separatedMaterials.requiredMaterials,
        planState.craftingItems
      );

      const result: State = calculateInventory(initialState, false);
      const craftedResult: State = calculateInventory(initialState, true);

      if (!result || !craftedResult) {
        this._isValid = false;
        return;
      }

      planState.inventory = result.inventory;
      planState.craftedInventory = craftedResult.inventory;
      planState.remainMaterials = planState.remainMaterials.difference(
        separatedMaterials.requiredMaterials
      );
      planState.craftingItems = craftedResult.craftingItems;
      this.planStates.push(planState.clone());
    }
  }

  inventoryAt(n: number, crafted: boolean = true): Inventory {
    if (crafted) {
      return this.planStates[n].craftedInventory;
    } else {
      return this.planStates[n].inventory;
    }
  }

  get targetItems(): Item[] {
    return this._targetItems;
  }

  get length(): number {
    return this.route.length;
  }

  get isValid(): boolean {
    return this._isValid;
  }
}
