<script setup lang="ts">
import { onMounted, ref } from "vue";
import { entryNames, entryColors } from "./Store/Entries";

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

onMounted(() => {
  ctx.value = canvas.value?.getContext("2d") || null;
  render();
});

const render = () => {
  if (!ctx.value || !canvas.value) {
    return;
  }
  const numEntry = entryNames.length; //Amount of entries
  const startAngle = 0;
  const endAngle = Math.PI / (numEntry / 2); //Angle based on amount of entries
  const cx = canvas.value.width / 2; //Center X
  const cy = canvas.value.height / 2; //Center Y
  const outsideRadius = canvas.value.width / 2 - 10; //Outside radius of the wheel
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height); // Clear the canvas
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
