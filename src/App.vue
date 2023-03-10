<script setup lang="ts">
import Wheel from "./components/Wheel.vue";
import EntryPanel from "./components/EntryPanel.vue";
</script>

<template>
  <section class="h-screen w-screen bg-neutral-900">
    <div class="my-auto justify-center pt-16">
      <Wheel />
      <EntryPanel class="mt-10" />
    </div>
  </section>
</template>
