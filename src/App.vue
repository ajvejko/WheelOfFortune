<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Wheel from "./components/Wheel.vue";
import EntryPanel from "./components/EntryPanel.vue";
import CustomizeWindow from "./components/CustomizeWindow.vue";
</script>

<template>
  <section class="relative h-screen w-screen bg-bgCustom">
    <Navbar />
    <div class="pt-20">
      <Wheel />
      <EntryPanel />
      <CustomizeWindow />
    </div>
  </section>
</template>
