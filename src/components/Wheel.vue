<script setup lang="ts">
import { onMounted, ref } from "vue";
import { entryNames, entryColors } from "../Store/Entries";

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const dpr = window.devicePixelRatio || 1;

onMounted(() => {
  // Type narrowing
  if (!canvas.value) {
    return;
  }
  // Get the canvas context
  ctx.value = canvas.value.getContext("2d");

  // Set the canvas size
  canvas.value.width = 400 * dpr;
  canvas.value.height = 400 * dpr;
  // Set the actual canvas size
  canvas.value.style.width = "400px";
  canvas.value.style.height = "400px";
  // Type narrowing
  if (!ctx.value) {
    return;
  }
  // Scale based on the devicePixelRatio
  ctx.value.scale(dpr, dpr);
  render();
});

const render = (): void => {
  // Type narrowing
  if (!ctx.value || !canvas.value) {
    return;
  }
  // Set the wheel parameters
  const lineWidth = 5;
  const realCanvasWidth = 400;
  const radius = realCanvasWidth / 2 - lineWidth;
  const centerX = realCanvasWidth / 2;
  const centerY = realCanvasWidth / 2;
  const numEntries = entryNames.length;
  const angle = (2 * Math.PI) / numEntries;
  const fontSize = realCanvasWidth / 15;

  // Draw the wheel
  for (let i = 0; i < numEntries; i++) {
    let startAngle = i * angle;
    let endAngle = (i + 1) * angle;
    const color = entryColors[i % entryColors.length];

    // Draw the arc
    ctx.value.beginPath();
    ctx.value.moveTo(centerX, centerY);
    ctx.value.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.value.closePath();
    ctx.value.fillStyle = color;
    ctx.value.fill();

    // Save the context state
    ctx.value.save();

    // Rotate the context to center the text on the arc
    let midAngle = (startAngle + endAngle) / 2;
    ctx.value.translate(centerX, centerY);
    ctx.value.rotate(midAngle);

    // Draw the entry name
    const textRadius = radius * 0.6;
    ctx.value.font = `${fontSize}px Arial`;
    ctx.value.fillStyle = "#FFFFFF";
    ctx.value.textAlign = "center";
    ctx.value.textBaseline = "middle";
    ctx.value.fillText(entryNames[i], textRadius, 0);

    // Restore the context state
    ctx.value.restore();
  }
  // Draw the inner white circle
  ctx.value.beginPath();
  ctx.value.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
  ctx.value.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.value.shadowBlur = 20;
  ctx.value.shadowOffsetX = 0;
  ctx.value.shadowOffsetY = 0;
  ctx.value.fillStyle = "#FFFFFF";
  ctx.value.fill();

  // Draw the outer white circle
  ctx.value.beginPath();
  ctx.value.arc(centerX, centerY, radius + lineWidth / 2, 0, 2 * Math.PI);
  ctx.value.lineWidth = lineWidth;
  ctx.value.strokeStyle = "#FFFFFF";
  ctx.value.stroke();
};
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <canvas width="500" height="500" ref="canvas"></canvas>
  </div>
</template>
