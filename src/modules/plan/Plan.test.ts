import { Area, AREA, Item, ITEM } from '@/modules/api';
import { Plan, PlanState, type SeparatedMaterials } from '@/modules/plan/Plan';
import { Inventory } from '@/modules/plan/Inventory';
import { calculateInventory, type CalculateResult, State } from '@/modules/plan/utils';
import { ItemPile } from '@/modules/plan/ItemPile';

describe('Plan', () => {
  const swordOfJustice: Item = ITEM[120302];
  const blooming = swordOfJustice.material1 as Item;
  const robePlus = swordOfJustice.material2 as Item;
  const rapier = blooming.material1 as Item;
  const flower = blooming.material2 as Item;
  const robe = robePlus.material1 as Item;
  const bandage = robePlus.material2 as Item;
  const needle = rapier.material1 as Item;
  const scrap = rapier.material2 as Item;

  const route = [AREA['병원'], AREA['고급 주택가'], AREA['숲']];

  const targetItems: Item[] = [
    ITEM['활빈검'],
    ITEM['지휘관의 갑옷'],
    ITEM['황실 부르고넷'],
    ITEM['드라우프니르'],
    ITEM['SCV']
  ];

  test('plan', () => {
    const plan = new Plan(route, targetItems);

    console.log(plan.inventoryAt(0).toArray() + '');
    console.log(plan.inventoryAt(1).toArray() + '');
    console.log(plan.inventoryAt(2).toArray() + '');
  });

  test('constructor', () => {
    const plan = new Plan(route, [swordOfJustice]);
    expect(plan.targetItems).toStrictEqual([swordOfJustice]);
    console.log(plan.inventoryAt(0).toArray() + '');
    console.log(plan.inventoryAt(1).toArray() + '');
    console.log(plan.inventoryAt(2).toArray() + '');

    expect(plan.inventoryAt(0).toArray().sort()).toStrictEqual([bandage, scrap, needle].sort());
    expect(plan.inventoryAt(1).toArray().sort()).toStrictEqual([bandage, scrap, needle].sort());
    expect(plan.inventoryAt(2).toArray().sort()).toStrictEqual(
      [bandage, scrap, needle, flower, robe].sort()
    );
  });

  test('exploreAllPath', () => {
    const targetItems = [swordOfJustice];
    const initialRemainMaterials: ItemPile = targetItems.reduce(
      // 수집해야 하는 남은 아이템
      (pile, item: Item): ItemPile => {
        if (item.recipe) {
          return pile.union(item.recipe.getCommonMaterials());
        }
        return pile;
      },
      new ItemPile()
    );

    const initialCraftingItems: ItemPile = targetItems // 만들어야 하는 아이템
      .reduce((pile, item: Item): ItemPile => {
        if (item.recipe) {
          return pile.union(item.recipe.getSubMaterials());
        }
        return pile;
      }, new ItemPile())
      .difference(initialRemainMaterials);

    const planState = new PlanState(new Inventory(), initialRemainMaterials, initialCraftingItems);
    const currentArea: Area = AREA['병원'];
    const materialsInArea = planState.getMaterialsInArea(currentArea);
    const initialState = new State(planState.inventory, materialsInArea, planState.craftingItems);
    const result1: CalculateResult = calculateInventory(initialState, false);

    if (result1.validState) {
      console.log(result1.validState.inventory.toArray() + '');
      expect(result1.validState.inventory.toArray().sort()).toStrictEqual(
        [scrap, needle, bandage].sort()
      );
    }

    const result2: CalculateResult = calculateInventory(initialState, true);

    if (result2.validState) {
      console.log(result2.validState.inventory.toArray() + '');
      expect(result2.validState.inventory.toArray().sort()).toStrictEqual([rapier, bandage].sort());
    }
  });

  test('item', () => {
    const targetItems = [ITEM['왕관'], ITEM['왕관'], ITEM['금팔찌']];

    function calculateCraftCounts(targetItems: Item[]): ItemPile {
      const craftCounts: ItemPile = new ItemPile();

      // 재귀적으로 아이템을 계산하고 필요한 개수를 저장합니다.
      function calculate(item: Item): void {
        if (craftCounts.includes(item)) {
          return;
        }

        craftCounts.add(item, item.initialCount);
        if (item.materials) {
          for (const material of item.materials) {
            calculate(material);
          }

          for (const material of item.materials) {
            craftCounts.set(
              item,
              Math.max(craftCounts.get(item), Math.floor(craftCounts.get(item) / 2))
            );
          }
        }
      }

      for (const targetItem of targetItems) {
        calculate(targetItem);
      }

      return craftCounts;
    }

    const craftCounts = calculateCraftCounts(targetItems);

    console.log(`제작해야 하는 아이템 목록:`);
    console.log(craftCounts.toString());
  });

  test('getSeparatedMaterialsByRequirement', () => {
    const planState = new PlanState(
      new Inventory(),
      swordOfJustice.recipe?.getCommonMaterials() as ItemPile,
      new ItemPile([swordOfJustice])
    );
    const separatedMaterials: SeparatedMaterials = planState.getSeparatedMaterialsByRequirement(
      AREA['병원'],
      [AREA['호텔']]
    );
    expect(separatedMaterials.requiredMaterials.toArray().sort()).toStrictEqual([bandage].sort());
    expect(separatedMaterials.optionalMaterials.toArray().sort()).toStrictEqual(
      [scrap, needle].sort()
    );
  });

  test('getMaterialsInArea', () => {
    const planState = new PlanState(
      new Inventory(),
      swordOfJustice.recipe?.getCommonMaterials() as ItemPile,
      new ItemPile([swordOfJustice])
    );
    const materialsInArea = planState.getMaterialsInArea(AREA['병원']);

    expect(materialsInArea.toArray().sort()).toStrictEqual([bandage, scrap, needle].sort());
  });
});
