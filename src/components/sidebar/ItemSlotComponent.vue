<script setup lang="ts">
import ItemIcon from '@/components/icon/ItemIcon.vue';
import ItemRemoveButton from './ItemRemoveButton.vue';
import { computed } from 'vue';
import { usePopupStore } from '@/stores/popup';
import { useSelectedStore } from '@/stores/selected';
const selectedStore = useSelectedStore();
const popupStore = usePopupStore();
const props = defineProps(['slotType']);

const imgPath = computed(() => {
  return import.meta.env.BASE_URL + `images/equipable-type/${props.slotType}.webp`;
});

const isItemSelected = computed(() => selectedStore.selectedItems[props.slotType]);
</script>

<template>
  <div class="item-slot" :id="`item-slot-${props.slotType.toLowerCase()}`">
    <div class="background" @click="popupStore.openItemSelectPopup(props.slotType)">
      <img :src="imgPath" :alt="props.slotType" v-if="!isItemSelected" />
      <ItemIcon :item="selectedStore.selectedItems[props.slotType]" :size="3" v-else />
    </div>
    <ItemRemoveButton :slot-type="props.slotType" v-if="isItemSelected" />
  </div>
</template>

<style scoped>
.item-slot {
  width: 3rem;
  height: 1.8rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background {
  background-color: var(--bg-duller);
  width: 3rem;
  height: 1.8rem;
  border-style: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background:hover {
  background-color: var(--bg-duller-highlighted);
}

img {
  height: 1.2rem;
}
</style>
