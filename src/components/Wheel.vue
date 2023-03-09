<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { entryNames, entryColors } from "../Store/Entries";

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const dpr = window.devicePixelRatio || 1;

onMounted(() => {
  // Get the canvas context
  ctx.value = canvas.value?.getContext("2d") || null;
  // Type narrowing
  if (!ctx.value || !canvas.value) {
    return;
  }
  // Automatically sets the size of canvas and calls drawWheel()
  resizeCanvas();
  // Listen for window resize event
  window.addEventListener("resize", resizeCanvas);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
});
// Gets called whenver a window gets resized
const resizeCanvas = (): void => {
  // Type narrowing
  if (!ctx.value || !canvas.value) {
    return;
  }
  // Set the canvas size
  canvas.value.width = window.innerWidth * dpr;
  canvas.value.height = window.innerWidth * dpr;
  // Set the actual canvas size
  canvas.value.style.width = window.innerWidth / dpr + "px";
  canvas.value.style.height = window.innerWidth / dpr + "px";
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  // Scale based on the devicePixelRatio
  ctx.value.scale(dpr, dpr);
  drawWheel();
};

const drawWheel = (): void => {
  // Type narrowing
  if (!ctx.value || !canvas.value) {
    return;
  }
  // Set the wheel parameters
  const lineWidth = 5;
  const realCanvasWidth = canvas.value.width / dpr;
  const radius = realCanvasWidth / 2.1;
  const centerX = realCanvasWidth / 2;
  const centerY = realCanvasWidth / 2;
  const numEntries = entryNames.length;
  const angle = (2 * Math.PI) / numEntries;
  //Calculate the font size
  const fontSize = Math.min(
    realCanvasWidth / (numEntries + 3),
    realCanvasWidth / 15
  );

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

  // Draw the pointer
  ctx.value.translate(radius * 1.15, centerY);
  ctx.value.rotate(Math.PI * 2);
  ctx.value.beginPath();
  ctx.value.moveTo(radius * 0.8, 0);
  ctx.value.lineTo(radius * 0.95, -10);
  ctx.value.lineTo(radius * 0.95, 10);
  ctx.value.fillStyle = "#FFFFFF";
  ctx.value.fill();
};
</script>

<template>
  <div class="flex items-center justify-center">
    <canvas
      class="border-2 border-red-500"
      width="500"
      height="500"
      ref="canvas"
    ></canvas>
  </div>
</template>
