<script setup lang="ts">
import { spinTime } from "../Store/WheelConfig";

defineEmits(["closeModal"]);
</script>
<template>
  <div
    class="relative flex w-3/4 max-w-sm flex-col justify-center rounded-xl border bg-bgCustom px-4 py-4 text-slate-100 md:py-6 md:px-6"
  >
    <button
      @click="$emit('closeModal')"
      class="button-transition absolute right-0 top-0 translate-x-[40%] translate-y-[-40%] rounded-lg border border-white bg-bgCustom shadow-black hover:scale-110 hover:border-2 active:border-rose-600"
    >
      <!-- X icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6 stroke-slate-100 md:h-8 md:w-8 lg:h-9 lg:w-9"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div>
      <h2 class="text-lg font-light sm:text-xl md:text-2xl">
        Spin time ({{ spinTime }}s):
      </h2>
      <input
        v-model="spinTime"
        type="range"
        min="5"
        max="70"
        steps="1"
        class="range h-1.5 w-full appearance-none rounded-full bg-neutral-800 hover:bg-neutral-700"
      />
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
