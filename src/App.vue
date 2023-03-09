<script setup lang="ts">
import Wheel from "./components/Wheel.vue";
import EntryPanel from "./components/EntryPanel.vue";
</script>

<template>
  <section class="h-screen w-screen bg-neutral-900">
    <div class="border-2 border-yellow-400">
      <Wheel class="border-2" />
      <EntryPanel class="mt-10" />
    </div>
  </section>
</template>
