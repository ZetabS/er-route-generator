<script setup lang="ts">
import ItemIcon from '@/components/icon/ItemIcon.vue';
import DeselectItemButton from './DeselectItemButton.vue';
import SelectItemPopup from './popup/SelectItemPopup.vue';
import { computed, ref } from 'vue';
import { useSelectedStore } from '@/stores/selected';

import { EquipType } from '@/modules/api/enums';

const props = defineProps<{ slotType: EquipType }>();
const selected = useSelectedStore();

const imgPath = import.meta.env.BASE_URL + `images/equipable-type/${props.slotType}.webp`;
const selectedItem = computed(() => selected.items[props.slotType]);
const isPopupOpen = ref(false);

function closePopup() {
  isPopupOpen.value = false;
}
</script>

<template>
  <div class="item-slot" :id="`item-slot-${slotType.toLowerCase()}`">
    <div class="background" @click="isPopupOpen = true">
      <img v-if="!selectedItem" :src="imgPath" :alt="slotType" />
      <ItemIcon v-if="selectedItem" :item="selectedItem" :size="3" />
      <div class="overlay"></div>
    </div>
    <DeselectItemButton v-if="selectedItem" :slotType="slotType" :size="18" />
  </div>
  <SelectItemPopup v-if="isPopupOpen" :slotType="slotType" :closePopup="closePopup" />
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
  background-color: var(--button-bg);
  width: 3rem;
  height: 1.8rem;
  border-style: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background-color: white;
  opacity: 0;
  width: 3rem;
  height: 1.8rem;
  position: absolute;
  border-style: hidden;
  border-radius: 0.5rem;
  transition: 0.2s ease;
}

.overlay:hover {
  opacity: 0.1;
}

img {
  height: 1.2rem;
}
</style>
