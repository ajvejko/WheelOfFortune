<script setup lang="ts">
import { spinTime } from "../Store/WheelConfig";

defineEmits(["closeModal"]);
</script>
<template>
  <div
    class="relative flex h-fit justify-center rounded-xl border-2 bg-bgCustom px-4 py-4 text-slate-100"
  >
    <div>
      <h1 class="text-center font-roboto text-3xl">Customize</h1>

      <div class="pb-3">
        <h2 class="mt-3 text-lg font-light">Spin time ({{ spinTime }}s):</h2>
        <input
          v-model="spinTime"
          type="range"
          min="5"
          max="70"
          steps="1"
          class="range h-1.5 appearance-none rounded-full bg-neutral-800 hover:bg-neutral-700"
        />
      </div>
      <button
        @click="$emit('closeModal')"
        class="mt-3 rounded-md border-2 py-1 px-2 text-slate-100 shadow-[0_0px_8px_rgba(0,0,0,0.25)] active:shadow-slate-100"
      >
        Close
      </button>
    </div>
  </div>
</template>

<style>
/* Range slider */
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

/* Range slider hover */
.range::-webkit-slider-thumb:hover {
  background-color: #3b82f6;
}

.range::-moz-range-thumb:hover {
  background-color: #3b82f6;
}

.range::-ms-thumb:hover {
  background-color: #3b82f6;
}

/* Range slider active */
.range::-webkit-slider-thumb:active {
  background-color: #1d4ed8;
}

.range::-moz-range-thumb:active {
  background-color: #1d4ed8;
}

.range::-ms-thumb:active {
  background-color: #1d4ed8;
}
</style>
