<script setup lang="ts">
import { onMounted, ref } from "vue";
import { entryNames, entryColors } from "./Store/Entries";

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
let startAngle = 0;
let endAngle = 0;

onMounted(() => {
  if (!canvas.value) {
    return;
  }
  ctx.value = canvas.value.getContext("2d");
  render();
});

const render = (): void => {
  //Type narrowing
  if (!ctx.value || !canvas.value) {
    return;
  }
  const numEntry = entryNames.length; //Amount of entries
  startAngle = 0;
  endAngle = Math.PI / (numEntry / 2); //Angle based on amount of entries
  const cx = canvas.value.width / 2; //Center X
  const cy = canvas.value.height / 2; //Center Y
  const outsideRadius = canvas.value.width / 2 - 10; //Outside radius of the wheel

  // Clear the canvas
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

  //Draws the wheel
  for (let i = 0; i < numEntry; i++) {
    //Get the angle for each entry
    const angle = startAngle + i * endAngle;
    const textWidth = ctx.value.measureText(entryNames[i]).width;

    //Draws each segment
    ctx.value.fillStyle = entryColors[i];
    ctx.value.beginPath();
    ctx.value.arc(cx, cy, outsideRadius, angle, angle + endAngle);
    ctx.value.arc(cx, cy, 0, angle + endAngle, angle, true);
    ctx.value.closePath();
    ctx.value.lineJoin = "round";
    ctx.value.fill();
    ctx.value.save();

    //Draw the text for each etnry
    ctx.value.translate(cx, cy);
    ctx.value.rotate(angle + endAngle / 2);
    ctx.value.fillStyle = "#ffffff";
    ctx.value.font = "bold 1.5em Arial";
    ctx.value.fillText(entryNames[i], cx - textWidth * 4, endAngle + 5);
    ctx.value.restore();
  }

  // draw a shadow around the circle
  ctx.value.shadowBlur = 10;
  ctx.value.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.value.beginPath();
  ctx.value.arc(cx, cy, 20, 0, 2 * Math.PI);
  ctx.value.strokeStyle = "#ffffff";
  ctx.value.lineWidth = 2;
  ctx.value.stroke();

  //Draw small white circle in the center
  ctx.value.beginPath();
  ctx.value.arc(cx, cy, outsideRadius / 10, 0, 2 * Math.PI);
  ctx.value.fillStyle = "#ffffff";
  ctx.value.fill();

  //Draw outer white circle
  ctx.value.strokeStyle = "white";
  ctx.value.lineWidth = 5;
  ctx.value.beginPath();
  ctx.value.arc(cx, cy, outsideRadius + 1, 0, 2 * Math.PI);
  ctx.value.stroke();
};
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <canvas width="500" height="500" ref="canvas"></canvas>
  </div>
</template>
