<script setup lang="ts">
import { computed, ref } from 'vue';

const { item, size } = defineProps(['item', 'size']);
const width = size + 'rem';
const height = size * 0.6 + 'rem';
const imgHeight = size * 0.45 + 'rem';
const iconStyle = `min-width: ${width}; max-width: ${width}; min-height: ${height}; max-height: ${height};`;

const isImageError = ref(false);

const imgPath = computed(() => {
  const base = import.meta.env.BASE_URL + 'src/assets/images/item/';
  if (isImageError.value) {
    return import.meta.env.BASE_URL + 'src/assets/images/image-error.svg';
  } else if (item.itemType == item.subType) {
    return base + `${item.itemType}/item-${item.code}.png`;
  } else {
    return base + `${item.itemType}/${item.subType}/item-${item.code}.png`;
  }
});
</script>

<template>
  <div :class="`item-icon ${item.itemGrade.toLowerCase()}`" :style="iconStyle">
    <img
      :src="imgPath"
      :alt="item.name"
      :style="`height: ${imgHeight};`"
      @error="isImageError = true"
    />
  </div>
</template>

<style scoped>
.item-icon {
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  font-size: 0.1em;
  color: black;
}

.item-icon.common {
  background: var(--gradient-item-common);
  border: 2px solid var(--border-item-common);
}

.item-icon.uncommon {
  background: var(--gradient-item-uncommon);
  border: 2px solid var(--border-item-uncommon);
}

.item-icon.rare {
  background: var(--gradient-item-rare);
  border: 2px solid var(--border-item-rare);
}

.item-icon.epic {
  background: var(--gradient-item-epic);
  border: 2px solid var(--border-item-epic);
}

.item-icon.legend {
  background: var(--gradient-item-legend);
  border: 2px solid var(--border-item-legend);
}

.item-icon.mythic {
  background: var(--gradient-item-mythic);
  border: 2px solid var(--border-item-mythic);
}
</style>
