<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { entryNames, entryColors } from "../Store/Entries";

// Create references for the innerCanvas element and its 2D context
const innerCanvas = ref<HTMLCanvasElement | null>(null);
const outerCanvas = ref<HTMLCanvasElement | null>(null);
const innerCtx = ref<CanvasRenderingContext2D | null>(null);
const outerCtx = ref<CanvasRenderingContext2D | null>(null);
const dpr = window.devicePixelRatio || 1; // Get the device pixel ratio
const spinTime = ref(5); // Spin time in seconds

onMounted(() => {
  // Get the innerCanvas context
  innerCtx.value = innerCanvas.value?.getContext("2d") || null;
  outerCtx.value = outerCanvas.value?.getContext("2d") || null;

  // Type narrowing
  if (!innerCtx.value || !innerCanvas.value || !outerCanvas.value) {
    return;
  }

  // Automatically sets the size of innerCanvas and calls drawInnerWheel()
  resizeCanvas();

  // Listen for window resize event
  window.addEventListener("resize", resizeCanvas);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
});

// Watches if array of entries was changed if so, resizes innerCanvas which calls drawInnerWheel().
watch(entryNames, () => {
  resizeCanvas();
});

// Function to resize innerCanvas, gets called whenever window gets resized
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
      return 3.5;
    }
    return 1.6;
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

  drawInnerWheel(0);
  drawOuterWheel();
};

// Draws the actual wheel
const drawInnerWheel = (currentAngle: number): void => {
  if (!innerCtx.value || !innerCanvas.value) {
    return;
  }

  // Set the wheel parameters
  const realCanvasWidth = innerCanvas.value.width / dpr;
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

    // Check to see if the text is above maxTextLength
    if (entryName.length >= maxTextLength) {
      entryName = entryName.slice(0, 13) + "...";
      fontSizeModifier = 1.25;
      textRadiusModifier = 0.7;
    }

    // Calculate the font size
    const fontSize = Math.floor(
      Math.min(maxFontSize, (radius / entryName.length) * fontSizeModifier)
    );

    // Calculate text radius
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
    innerCtx.value.beginPath();
    innerCtx.value.moveTo(centerX, centerY);
    innerCtx.value.arc(centerX, centerY, radius, startAngle, endAngle);
    innerCtx.value.closePath();
    innerCtx.value.fillStyle = color;

    // Fill in the arcs
    innerCtx.value.fill();

    // Save the context state
    innerCtx.value.save();

    // Rotate the context to center the text on the arc
    let midAngle = (startAngle + endAngle) / 2;
    innerCtx.value.translate(centerX, centerY);
    innerCtx.value.rotate(midAngle);

    // Draw the entry name
    innerCtx.value.font = `${fontSize}px Arial`;
    innerCtx.value.fillStyle = "#FFFFFF";
    innerCtx.value.textAlign = "center";
    innerCtx.value.textBaseline = "middle";
    innerCtx.value.fillText(entryName, textRadius, 0);
    // Restore the context state
    innerCtx.value.restore();
  }
};

const drawOuterWheel = () => {
  if (!outerCtx.value || !outerCanvas.value) {
    return;
  }
  // Set the wheel parameters
  const realCanvasWidth = outerCanvas.value.width / dpr;
  const radius = realCanvasWidth / 2.1;
  const centerX = realCanvasWidth / 2;
  const centerY = realCanvasWidth / 2;
  const lineWidth = outerCanvas.value.width / 250;

  // Set shadow properties to render shadows around arcs and text too
  outerCtx.value.shadowColor = "rgba(0, 0, 0, 0.8)";
  outerCtx.value.shadowBlur = 80;
  outerCtx.value.shadowOffsetX = 0;
  outerCtx.value.shadowOffsetY = 0;

  // Draw the inner white circle
  outerCtx.value.beginPath();
  outerCtx.value.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
  outerCtx.value.fillStyle = "#FFFFFF";

  outerCtx.value.fill();

  // Draw the outer white circle
  outerCtx.value.beginPath();
  outerCtx.value.arc(centerX, centerY, radius + lineWidth / 2, 0, 2 * Math.PI);
  outerCtx.value.lineWidth = lineWidth;
  outerCtx.value.strokeStyle = "#FFFFFF";
  outerCtx.value.stroke();

  // Draw the pointer
  outerCtx.value.shadowBlur = 0;
  outerCtx.value.save(); // Reset the context transformation
  outerCtx.value.beginPath();
  outerCtx.value.moveTo(centerX + radius * 0.86, centerY);
  outerCtx.value.lineTo(centerX + radius, centerY + radius * -0.06);
  outerCtx.value.lineTo(centerX + radius, centerY + radius * 0.06);
  outerCtx.value.fillStyle = "#FFFFFF";
  outerCtx.value.fill();
  outerCtx.value.restore();
};

// Function that spins the wheel
const spin = (): void => {
  const startTime = Date.now();
  const endTime = startTime + spinTime.value * 1000;
  const spinAngleStart = Math.floor(Math.random() * 180); // Random starting angle
  let currentTime = startTime;
  let currentAngle = spinAngleStart;

  // Animation function to update the wheel during spinning
  const animate = () => {
    // Type narrowing
    if (!innerCtx.value || !innerCanvas.value) {
      return;
    }

    //Update current time
    currentTime = Date.now();

    //calculate progress 0 to 1, used in easing calculation
    const progress = Math.min(
      (currentTime - startTime) / (endTime - startTime),
      1
    );
    const easing = 1 - Math.pow(1 - progress, 3); // Apply cubic easing
    currentAngle = spinAngleStart + easing * (Math.PI * 2 * spinTime.value);

    // Clear the innerCanvas and redraw the wheel with the updated angle
    innerCtx.value.clearRect(
      0,
      0,
      innerCanvas.value.width,
      innerCanvas.value.height
    );
    // Render rotated wheel with the new angle
    drawInnerWheel(currentAngle);

    // Continue the animation if the end time has not been reached
    if (currentTime < endTime) {
      requestAnimationFrame(animate);
    }
  };

  // Start the animation
  requestAnimationFrame(animate);
};
</script>

<template>
  <div class="flex items-center justify-center" @click="spin">
    <canvas width="500" height="500" ref="innerCanvas"></canvas>
    <!-- 2nd canvas to render static parts, helps with performance on retina screens,
         shadows are way too expensive to render inside animation -->
    <canvas
      width="500"
      height="500"
      class="absolute"
      ref="outerCanvas"
    ></canvas>
  </div>
</template>
