<script setup lang="ts">
import { computed } from 'vue';
import { usePopupStore } from '@/stores/popup';
const popupStore = usePopupStore();
const props = defineProps(['slotType']);

const imgPath = computed(() => {
  return import.meta.env.BASE_URL + `images/equipable-type/${props.slotType}.webp`;
});
</script>

<template>
  <div
    class="item-slot"
    :id="`item-slot-${props.slotType.toLowerCase()}`"
    @click="popupStore.openItemSelectPopup(props.slotType)"
  >
    <img :src="imgPath" :alt="props.slotType" />
  </div>
</template>

<style scoped>
.item-slot {
  background-color: var(--bg-duller);

  width: 3rem;
  height: 1.8rem;
  border-style: hidden;
  border-radius: 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    height: 0.8rem;
  }
}

.item-slot:hover {
  background-color: var(--bg-duller-highlighted);
}
</style>
