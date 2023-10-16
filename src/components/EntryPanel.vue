<script setup lang="ts">
import { entryNames } from "../stores/WheelConfig";
import { ref, watchEffect } from "vue";

const entries = ref("");


// Set default entry names
const defaultEntryNames = [
  "Entry 1",
  "Entry 2",
  "Entry 3",
  "Entry 4",
  "Entry 5",
  "Entry 6",
];

// Initialize entryNames with default values
entryNames.push(...defaultEntryNames);

const updateEntryNames = (input: string): void => {
  const value: string[] = input.split(/[\n,;]/);
  entryNames.length = 0;
  entryNames.push(...value.filter((str) => str.trim() !== ""));
};

// Initialize entryNames with default values
entryNames.push(...defaultEntryNames);

watchEffect(() => {
  const trimmedEntries = entries.value.trim();
  if (trimmedEntries !== "") {
    updateEntryNames(trimmedEntries);
  } else {
    updateEntryNames(defaultEntryNames.join(","));
  }
});
</script>
<template>
  <div class="mx-6 flex h-full flex-col">
    <div
      class="flex select-none justify-evenly text-lg text-slate-100 sm:text-2xl"
    >
      Entries
    </div>

    <div class="mt-1 grow rounded-xl bg-[#1E1E1E] p-3">
      <textarea
        type="text"
        v-model="entries"
        placeholder="Entry 1, Entry 2; Entry3;&#10;Entry 4; Entry 5, Entry 6 &#10;&#10;Split your entries by using ',' or ';' &#10;or new line."
        class="button-transition h-[60vh] w-full resize-none rounded-xl border border-slate-400 bg-transparent px-2 py-1 text-slate-100 hover:border-white focus:border-white focus:outline-none lg:h-full"
      >
      
      </textarea>
    </div>
  </div>
</template>
