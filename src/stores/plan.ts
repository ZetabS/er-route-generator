import { reactive } from 'vue';
import { defineStore } from 'pinia';

class Plan {}

export const usePlanStore = defineStore('plan', () => {
  const planList: Plan[] = reactive([]);

  return { planList };
});
