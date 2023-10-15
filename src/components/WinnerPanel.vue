<script setup lang="ts">
defineEmits(["remove-entry", "close"]);
</script>

<template>
  <div
    class="w-1/2 max-w-md rounded-xl border-2 bg-neutral-900 p-4 text-center"
  >
    <h1 class="text-lg text-slate-100 sm:text-2xl">The winner is:</h1>
    <div class="text-2xl text-slate-100 sm:text-3xl">
      <slot></slot>
    </div>
    <div class="flex justify-evenly pt-3">
      <button
        @click="$emit('remove-entry')"
        class="button-transition mr-4 rounded-md border-2 py-1 px-2 text-red-500 shadow-[0_0px_8px_rgba(0,0,0,0.25)] hover:scale-105 hover:border-red-500 active:shadow-red-500 sm:text-xl"
      >
        Remove
      </button>
      <button
        @click="$emit('close')"
        class="button-transition rounded-md border-2 py-1 px-2 text-slate-100 shadow-[0_0px_8px_rgba(0,0,0,0.25)] hover:scale-105 hover:border-slate-100 active:shadow-slate-500 sm:text-xl"
      >
        close
      </button>
    </div>
  </div>
</template>
