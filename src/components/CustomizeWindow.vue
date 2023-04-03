<script setup lang="ts">
import { spinTime } from "../Store/WheelConfig";
</script>
<template>
  <div
    class="absolute top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50"
  >
    <div
      class="relative flex h-fit justify-center rounded-xl border-2 bg-bgCustom py-2 px-4 text-slate-100"
    >
      <div>
        <div class="mb-5 text-center font-roboto text-3xl">Customize</div>
        <h2 class="text-lg font-light">Spin time (seconds):</h2>
        <div class="mt-2 flex items-center justify-evenly">
          <input
            v-model.number="spinTime"
            type="range"
            min="5"
            max="70"
            steps="1"
            class="range h-1.5 appearance-none rounded-full bg-neutral-800"
          />
          <span class="ml-2"> {{ spinTime }}s </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.range::-webkit-slider-thumb {
  border: none;
  background-color: #1d4ed8;
}

.range::-moz-range-thumb {
  border: none;
  background-color: #1d4ed8;
}

.range::-ms-thumb {
  border: none;
  background-color: #1d4ed8;
}
</style>
