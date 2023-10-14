<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import CustomizeWindow from "./CustomizeWindow.vue";
import BaseModal from "./BaseModal.vue";

const customizeWindow = ref(false);

const openModal = (): void => {
  customizeWindow.value = true;
};

const closeModal = (): void => {
  customizeWindow.value = false;
};
</script>
<template>
  <nav class="fixed right-0 top-0 left-0 z-10 px-8">
    <div
      class="flex items-center justify-between bg-bgCustom py-3 shadow-xl shadow-bgCustom"
    >
      <a id="home" class="text-lg font-bold text-slate-100">Spin The Wheel</a>
      <button class="text-slate-100" @click="openModal">Spin time</button>
    </div>
  </nav>
  <Transition name="fade">
    <BaseModal v-show="customizeWindow">
      <Transition name="bounce">
        <CustomizeWindow
          v-if="customizeWindow"
          @closeModal="customizeWindow = false"
        />
      </Transition>
    </BaseModal>
  </Transition>
</template>
