<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Wheel from "./components/Wheel.vue";
import EntryPanel from "./components/EntryPanel.vue";
</script>

<template>
  <section class="relative h-screen w-screen bg-bgCustom">
    <Navbar />
    <div class="relative mt-20 justify-around lg:flex">
      <Wheel />
      <div
        class="lg:absolute lg:right-0 lg:top-1/2 lg:h-full lg:-translate-y-1/2"
      >
        <EntryPanel />
      </div>
    </div>
  </section>
</template>

<style>
body {
  overflow-x: hidden;
}

.button-transition {
  transition: all ease 300ms;
}

.bounce-enter-from,
.bounce-leave-to {
  scale: 0;
}

.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
</style>
