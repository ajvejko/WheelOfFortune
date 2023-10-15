<script setup lang="ts">
defineEmits(["remove-entry", "close"]);
</script>

<template>
  <div class="rounded-xl border-2 bg-neutral-900 p-4 text-center">
    <h1 class="text-base text-slate-100">The winner is:</h1>
    <div class="text-xl text-slate-100">
      <slot></slot>
    </div>
    <div class="flex justify-evenly pt-3">
      <button
        @click="$emit('remove-entry')"
        class="mr-4 rounded-md border-2 py-1 px-2 text-red-500 shadow-[0_0px_8px_rgba(0,0,0,0.25)] hover:border-red-500 active:shadow-red-500"
      >
        Remove
      </button>
      <button
        @click="$emit('close')"
        class="rounded-md border-2 py-1 px-2 text-slate-100 shadow-[0_0px_8px_rgba(0,0,0,0.25)] hover:border-slate-100 active:shadow-slate-500"
      >
        close
      </button>
    </div>
  </div>
</template>
