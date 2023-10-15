<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import {
  entryNames,
  entryColors,
  currentWinner,
  spinTime,
} from "../Store/WheelConfig";
import WinnerPanel from "./WinnerPanel.vue";
import BaseModal from "./BaseModal.vue";

// Create references for the canvas element and its 2D context
const innerCanvas = ref<HTMLCanvasElement | null>(null);
const outerCanvas = ref<HTMLCanvasElement | null>(null);
const innerCtx = ref<CanvasRenderingContext2D | null>(null);
const outerCtx = ref<CanvasRenderingContext2D | null>(null);
const dpr = window.devicePixelRatio || 1;
const showWinner = ref(false);
let isSpinning = ref(false);
let spinAngle = 0;

// Function to get the 2D context from a canvas element
const get2DContext = (
  canvas: HTMLCanvasElement | null
): CanvasRenderingContext2D | null => canvas?.getContext("2d") || null;

onMounted(() => {
  innerCtx.value = get2DContext(innerCanvas.value);
  outerCtx.value = get2DContext(outerCanvas.value);

  // Type narrowing
  if (!innerCtx.value || !innerCanvas.value || !outerCanvas.value) {
    return;
  }

  // Automatically sets the size of canvas and calls drawInnerWheel()
  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
});

// Watches if array of entries was changed if so, resizes innerCanvas which calls drawInnerWheel().
watch(entryNames, () => {
  resizeCanvas();
});

// Function that gets called whenever window gets resized
const resizeCanvas = (): void => {
  if (
    !innerCtx.value ||
    !outerCtx.value ||
    !innerCanvas.value ||
    !outerCanvas.value
  ) {
    return;
  }

  // Function to size down the wheel when on bigger screens
  const getWindowModifier = (): number => {
    if (window.innerWidth >= 640 && window.innerWidth < 1024) {
      return 2;
    } else if (window.innerWidth >= 1024) {
      return 2.5;
    }
    return 1.3;
  };

  let modifier = getWindowModifier();
  const scaledCanvasdWidth = window.innerWidth * dpr;
  const actualCanvasWidth = window.innerWidth / modifier;

  const setCanvasSize = (canvas: HTMLCanvasElement): void => {
    canvas.width = scaledCanvasdWidth;
    canvas.height = scaledCanvasdWidth;
    canvas.style.width = `${actualCanvasWidth}px`;
    canvas.style.height = `${actualCanvasWidth}px`;
  };

  setCanvasSize(innerCanvas.value);
  setCanvasSize(outerCanvas.value);

  // Scale based on the devicePixelRatio
  innerCtx.value.scale(dpr, dpr);
  outerCtx.value.scale(dpr, dpr);

  drawInnerWheel(0, innerCtx.value, innerCanvas.value);
  drawOuterWheel(outerCtx.value, outerCanvas.value);
};

// Draws the actual wheel with arcs and entries
const drawInnerWheel = (
  currentAngle: number,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  if (!ctx || !canvas) {
    return;
  }

  const realCanvasWidth = canvas.width / dpr;
  const radius = realCanvasWidth / 2.1;
  const centerX = realCanvasWidth / 2;
  const centerY = realCanvasWidth / 2;
  const numEntries = entryNames.length;
  const angle = (2 * Math.PI) / numEntries;
  const maxTextLength = 13;

  type TextProperties = {
    entryName: string;
    fontSize: number;
    textRadius: number;
  };

  // Function to calculate text properties, gets called in drawInnerWheel()
  const calculateTextProperties = (
    entryName: string,
    maxTextLength: number,
    maxFontSize: number,
    radius: number
  ): TextProperties => {
    let fontSizeModifier = 0.96;
    let textRadiusModifier = 0.67;

    if (entryName.length >= maxTextLength) {
      entryName = entryName.slice(0, 13) + "...";
      fontSizeModifier = 1.25;
      textRadiusModifier = 0.7;
    }

    const fontSize = Math.floor(
      Math.min(maxFontSize, (radius / entryName.length) * fontSizeModifier)
    );

    const textRadius = Math.max(
      radius * textRadiusModifier - entryName.length * 1.8
    );

    return { entryName, fontSize, textRadius };
  };

  // Calculate the maximum font size that would fit in each arc
  const maxFontSize = Math.floor((radius / numEntries) * 0.8);

  // Draw the wheel with arcs
  for (let i = 0; i < numEntries; i++) {
    const startAngle = i * angle + currentAngle;
    const endAngle = (i + 1) * angle + currentAngle;
    const color = entryColors[i % entryColors.length];

    // Calculate the text properties to be used in rendering text
    const { entryName, fontSize, textRadius } = calculateTextProperties(
      entryNames[i],
      maxTextLength,
      maxFontSize,
      radius
    );

    // Draw the arc
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.save();

    // Rotate the context to center the text on the arc
    let midAngle = (startAngle + endAngle) / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(midAngle);

    // Draw the entry name
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(entryName, textRadius, 0);

    ctx.restore();
  }
};

const drawOuterWheel = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void => {
  if (!ctx || !canvas) {
    return;
  }

  const realCanvasWidth = canvas.width / dpr;
  const radius = realCanvasWidth / 2.1;
  const centerX = realCanvasWidth / 2;
  const centerY = realCanvasWidth / 2;
  const lineWidth = canvas.width / 250;

  // Set shadow properties to render shadows on outerCanvas
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 80;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Draw the inner white circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  // Draw the outer white circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + lineWidth / 2, 0, 2 * Math.PI);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "#FFFFFF";
  ctx.stroke();

  ctx.save();

  // Draw the pointer
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.moveTo(centerX + radius * 0.86, centerY);
  ctx.lineTo(centerX + radius, centerY + radius * -0.06);
  ctx.lineTo(centerX + radius, centerY + radius * 0.06);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  ctx.restore();
};

const animateSpin = () => {
  if (!innerCtx.value || !innerCanvas.value || isSpinning.value) {
    return;
  }
  spinWheel(innerCtx.value, innerCanvas.value, spinTime.value);
};

const getWinner = (currentAngle: number): string => {
  const numEntries = entryNames.length;
  const anglePerEntry = (2 * Math.PI) / numEntries;

  // Normalize the angle by taking the modulus with 2 * PI (full circle)
  const normalizedAngle = currentAngle % (2 * Math.PI);

  // Calculate the winner by taking the floor of the normalized angle divided by the angle per entry
  const winner = -Math.floor(normalizedAngle / anglePerEntry - numEntries + 1);

  return entryNames[winner];
};

const spinWheel = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  spinTime: number
): void => {
  const startTime = Date.now();
  const endTime = startTime + spinTime * 1000;
  const animationFactor = Math.min(spinTime / 5, 1);
  let currentTime = startTime;
  let randomized = false;

  isSpinning.value = true;

  const easeOutCirc = (progress: number, factor: number): number => {
    return Math.sqrt(1 - Math.pow(progress - 1, 2)) * factor;
  };

  // Animation function to update the wheel with updated values
  const animate = () => {
    if (!ctx || !canvas) {
      return;
    }

    currentTime = Date.now();

    // Calculate progress 0 to 1, used in easing calculation
    const progress = Math.min(
      (currentTime - startTime) / (endTime - startTime),
      1
    );
    if (progress >= 0.03 && !randomized) {
      spinAngle = Math.floor(Math.random() * 360);
      randomized = true;
    }
    // Applies easeOutCirc easing
    const easing = easeOutCirc(progress, animationFactor);
    const currentAngle = spinAngle + easing * (Math.PI * 2 * spinTime);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render rotated wheel with the new angle, passes innerCtx and innerCavas
    drawInnerWheel(currentAngle, ctx, canvas);

    // Continue the animation if the end time has not been reached
    if (currentTime < endTime) {
      requestAnimationFrame(animate);
    } else {
      // Get the winner and display the winning entry after the wheel stops spinning
      currentWinner.value = getWinner(currentAngle);
      showWinner.value = true;
    }
  };

  // Start the animation
  requestAnimationFrame(animate);
};

const removeEntry = (): void => {
  // Remove the current winner from the array
  const updatedArray = entryNames.filter(
    (entry) => entry !== currentWinner.value
  );

  // Clear the array and push the updated array
  entryNames.length = 0;
  entryNames.push(...updatedArray);

  handleClose();
};

const handleClose = (): void => {
  isSpinning.value = false;
  showWinner.value = false;
};
</script>

<template>
  <div
    class="relative flex items-center justify-center"
    :class="isSpinning ? 'cursor-default' : 'cursor-pointer'"
    @click="animateSpin"
  >
    <canvas width="500" height="500" ref="innerCanvas"></canvas>

    <!-- 2nd canvas to render static parts, helps with performance on retina screens,
         shadows are way too expensive to render inside animation -->
    <canvas
      width="500"
      height="500"
      class="absolute"
      ref="outerCanvas"
    ></canvas>
    <span
      v-if="!isSpinning"
      class="wheel_title absolute top-1/3 select-none text-2xl font-bold text-white md:text-3xl 2xl:text-4xl"
      >Click to Spin!</span
    >
  </div>
  <Transition name="fade">
    <BaseModal v-show="showWinner">
      <Transition name="bounce">
        <WinnerPanel
          v-if="showWinner"
          @remove-entry="removeEntry"
          @close="handleClose"
        >
          {{ currentWinner }}
        </WinnerPanel>
      </Transition>
    </BaseModal>
  </Transition>
</template>
<style scoped>
.wheel_title {
  text-shadow: 0 0 15px #000;
}
</style>
