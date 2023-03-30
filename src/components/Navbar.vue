<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);
</script>
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-10 bg-bgCustom px-8 py-3 shadow-xl shadow-bgCustom"
  >
    <div class="flex items-center justify-between">
      <a id="home" class="text-lg font-bold text-slate-100">Spin The Wheel</a>
      <button @click="show = !show">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-7 w-7 stroke-slate-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </button>
    </div>
    <Transition name="fade">
      <div v-if="show" class="z-10 flex flex-col bg-bgCustom py-3 text-right">
        <a id="Customize" href="#" class="font-bold text-neutral-300">
          Customize
        </a>
        <a id="Save" href="#" class="mt-2 font-bold text-neutral-300">Save</a>
        <a id="Open" href="#" class="mt-2 font-bold text-neutral-300">Open</a>
      </div>
    </Transition>
  </nav>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
