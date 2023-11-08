import { Inventory } from './Inventory';
import { Area, Item } from '@/modules/api';
import { calculateInventory, type CalculateResult, State } from './utils';
import { ItemPile } from '@/modules/plan/ItemPile';

export interface SeparatedMaterials {
  requiredMaterials: ItemPile;
  optionalMaterials: ItemPile;
}

export class PlanState {
  public inventory: Inventory;
  public remainMaterials: ItemPile;
  public craftingItems: ItemPile;

  constructor(inventory: Inventory, remainMaterials: ItemPile, craftingItems: ItemPile) {
    this.inventory = inventory.clone();
    this.remainMaterials = remainMaterials.clone();
    this.craftingItems = craftingItems.clone();
  }

  toString(): string {
    return `State[inventory: ${this.inventory}, ` + `commonMaterials: ${this.remainMaterials}]`;
  }

  getMaterialsInArea(area: Area): ItemPile {
    return this.remainMaterials.intersection(area.areaItems);
  }

  getSeparatedMaterialsByRequirement(area: Area, plannedAreas: Area[]): SeparatedMaterials {
    const materialsInArea: ItemPile = this.getMaterialsInArea(area);
    const plannedAreasItems: ItemPile = new ItemPile();
    plannedAreas.forEach((area: Area) => {
      area.areaItems.forEach((item: Item) => {
        plannedAreasItems.add(item);
      });
    });
    const requiredMaterials: ItemPile = materialsInArea.difference(plannedAreasItems);
    const optionalMaterials: ItemPile = materialsInArea.intersection(plannedAreasItems);
    return { requiredMaterials, optionalMaterials };
  }

  clone(): PlanState {
    return new PlanState(this.inventory, this.remainMaterials, this.craftingItems);
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
    let validState;
    let invalidState;
    const initialRemainMaterials: ItemPile = this.targetItems.reduce(
      // 수집해야 하는 남은 아이템
      (pile, item: Item): ItemPile => {
        if (item.recipe) {
          return pile.union(item.recipe.getCommonMaterials());
        }
        return pile;
      },
      new ItemPile()
    );

    const initialCraftingItems: ItemPile = this.targetItems // 만들어야 하는 아이템
      .reduce((pile, item: Item): ItemPile => {
        if (item.recipe) {
          return pile.union(item.recipe.getSubMaterials());
        }
        return pile;
      }, new ItemPile())
      .difference(initialRemainMaterials);

    const planState = new PlanState(new Inventory(), initialRemainMaterials, initialCraftingItems);

    for (let routeNumber = 0; routeNumber < this.route.length; routeNumber++) {
      const currentArea: Area = this.route[routeNumber];
      const plannedAreas: Area[] = [...this.route.slice(routeNumber + 1, this.length)];
      const materialsInArea = planState.getMaterialsInArea(currentArea);
      const separatedMaterials: SeparatedMaterials = planState.getSeparatedMaterialsByRequirement(
        currentArea,
        plannedAreas
      );
      const initialState = new State(
        planState.inventory,
        separatedMaterials.requiredMaterials,
        planState.craftingItems
      );
      const result: CalculateResult = calculateInventory(initialState, true);

      if (!result.validState) {
        this._isValid = false;
        return;
      }

      planState.inventory = result.validState.inventory;
      this.planStates.push(planState.clone());
    }
  }

  inventoryAt(n: number): Inventory {
    return this.planStates[n].inventory;
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
