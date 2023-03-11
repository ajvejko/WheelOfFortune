<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Wheel from "./components/Wheel.vue";
import EntryPanel from "./components/EntryPanel.vue";
</script>

<template>
  <section class="relative h-screen w-screen bg-bgCustom">
    <Navbar />
    <div class="justify-center pt-20">
      <Wheel />
      <EntryPanel class="mt-10" />
    </div>
  </section>
</template>
