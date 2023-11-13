import v8Profiler from 'v8-profiler-next';
import { calculateAllPlans } from '@/modules/plan/calculateAllPlans';
import { Item, ITEM_BY_NAME } from '@/modules/api';
import { Plan } from '@/modules/plan';
import * as fs from 'fs';

v8Profiler.setGenerateType(1);
const title = 'calculate-profile';

describe('calculateAllRoutes', () => {
  v8Profiler.startProfiling(title, true);
  afterAll(() => {
    const profile = v8Profiler.stopProfiling(title);
    profile.export(function (error, result: any) {
      // if it doesn't have the extension .cpuprofile then
      // chrome's profiler tool won't like it.
      // examine the profile:
      //   Navigate to chrome://inspect
      //   Click Open dedicated DevTools for Node
      //   Select the profiler tab
      //   Load your file
      fs.writeFileSync(`${title}.cpuprofile`, result);
      profile.delete();
    });
  });
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
