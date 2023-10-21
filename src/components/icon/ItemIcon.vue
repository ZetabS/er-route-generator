<script setup lang="ts">
const { item } = defineProps(['item']);
</script>

<template>
  <div :class="`item-icon ${item.itemGrade.toLowerCase()}`">
    <img :src="item.imgPath" :alt="item.name" />
  </div>
</template>

<style scoped>
.item-icon {
  min-width: 4rem;
  min-height: 2.4rem;
  max-width: 4rem;
  max-height: 2.4rem;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  font-size: 0.1em;
  color: black;
  height: 1.8rem;
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
