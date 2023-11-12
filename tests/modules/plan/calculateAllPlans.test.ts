import { calculateAllPlans } from '@/modules/plan/calculateAllPlans';
import { Item, ITEM_BY_NAME } from '@/modules/api';
import { Plan } from '@/modules/plan';

describe('calculateAllRoutes', () => {
  const targetItems: Item[] = [
    ITEM_BY_NAME['활빈검'],
    ITEM_BY_NAME['지휘관의 갑옷'],
    ITEM_BY_NAME['제국 왕관'],
    ITEM_BY_NAME['드라우프니르'],
    ITEM_BY_NAME['SCV']
  ];

  test('calculateAllRoutes', () => {
    const plans: Plan[] = calculateAllPlans(targetItems);
    for (const plan of plans) {
      console.log(plan.route.map((area) => area.name));
    }
  });
});
