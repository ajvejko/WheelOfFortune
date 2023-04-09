<script setup lang="ts">
import { ref } from "vue";
import CustomizeWindow from "./CustomizeWindow.vue";

const show = ref(false);
const customizeWindow = ref(false);

const close = (): void => {
  customizeWindow.value = false;
};
</script>
<template>
  <nav class="fixed right-0 top-0 left-0 z-10 px-8">
    <div
      class="flex items-center justify-between bg-bgCustom py-3 shadow-xl shadow-bgCustom"
    >
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
      <div
        v-if="show"
        class="z-10 flex flex-col bg-bgCustom/95 py-3 text-right shadow-xl shadow-bgCustom"
      >
        <a
          id="Customize"
          href="#"
          @click="
            show = false;
            customizeWindow = true;
          "
          class="font-bold text-neutral-300"
        >
          Settings
        </a>
        <a id="Save" href="#" class="mt-2 font-bold text-neutral-300">Save</a>
        <a id="Open" href="#" class="mt-2 font-bold text-neutral-300">Open</a>
      </div>
    </Transition>
  </nav>
  <Transition name="fade">
    <CustomizeWindow v-if="customizeWindow" @close="customizeWindow = false" />
  </Transition>
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
