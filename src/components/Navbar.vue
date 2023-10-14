<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import CustomizeWindow from "./CustomizeWindow.vue";
import BaseModal from "./BaseModal.vue";

const customizeWindow = ref(false);
const customizationWindow = ref(null);

const openModal = (): void => {
  customizeWindow.value = true;
};

const closeModal = (): void => {
  customizeWindow.value = false;
};
onClickOutside(customizationWindow, closeModal);
</script>
<template>
  <nav class="fixed right-0 top-0 left-0 z-10 px-8">
    <div
      class="flex items-center justify-between bg-bgCustom py-3 shadow-xl shadow-bgCustom"
    >
      <a
        id="#home"
        class="button-transition select-none text-lg font-bold text-slate-100 hover:scale-105 hover:cursor-pointer sm:text-xl lg:text-2xl xl:text-3xl"
        >Spin The Wheel</a
      >
      <button
        class="button-transition text-slate-100 hover:scale-110 sm:text-lg lg:text-xl xl:text-2xl"
        @click="openModal"
      >
        Spin time
      </button>
    </div>
  </nav>
  <Transition name="fade">
    <BaseModal v-show="customizeWindow">
      <Transition name="bounce">
        <CustomizeWindow
          v-if="customizeWindow"
          ref="customizationWindow"
          @closeModal="customizeWindow = false"
        />
      </Transition>
    </BaseModal>
  </Transition>
</template>
