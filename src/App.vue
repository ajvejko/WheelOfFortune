<script setup lang="ts">
import { onMounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);



onMounted(() => {
  ctx.value = canvas.value?.getContext("2d") || null;
  render();
});

const render = () => {
  if (!ctx.value) {
    return;
  }
  ctx.value.fillStyle = "#10b981";
  ctx.value.beginPath();
  ctx.value.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx.value.fill();
  ctx.value.save();
};
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <canvas class="border-2" width="500" height="500" ref="canvas"></canvas>
  </div>
</template>
