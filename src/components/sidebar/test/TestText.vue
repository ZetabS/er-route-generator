<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps(['num']);

const numPlusOne = computed(() => {
  return props.num + 1;
});

function combineRGBAColors(color1: string, color2: string): string {
  const regex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/;
  const [, r1, g1, b1, a1] = color1.match(regex)!.map(parseFloat);
  const [, r2, g2, b2, a2] = color2.match(regex)!.map(parseFloat);

  const weight = a1 + a2;
  const r = (r1 * a1 + r2 * a2) / weight;
  const g = (g1 * a1 + g2 * a2) / weight;
  const b = (b1 * a1 + b2 * a2) / weight;
  const a = Math.min(1, weight);

  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

// 예제 사용법
const color1: string = 'rgba(55, 67, 87, 1)';
const color2: string = 'rgba(255, 255, 255, 0.1)';
const combinedColor: string = combineRGBAColors(color1, color2);
</script>

<template>
  {{ combinedColor }}
</template>

<style scoped></style>
