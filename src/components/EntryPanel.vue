<script setup lang="ts">
import { entryNames } from "../Store/Entries";
import { ref, watchEffect } from "vue";

const entries = ref("");

watchEffect(() => {
  if (entries.value !== "") {
    entries.value.trim();
    const value: string[] = entries.value.split(/[\n,;]/);

    // Clears array
    entryNames.length = 0;
    // Inserts new values while filtering out empty spaces
    entryNames.push(...value.filter((str) => str.trim() !== ""));
  } //If textarea is empty, it will show placeholder
  else {
    entryNames.length = 0;
    entryNames.push(
      "Entry 1",
      "Entry 2",
      "Entry 3",
      "Entry 4",
      "Entry 5",
      "Entry 6"
    );
  }
});
</script>
<template>
  <div class="mx-6 mt-16 flex h-[60vh] flex-col">
    <div class="flex justify-evenly text-slate-100">
      <span>Entries</span>
      <span>Results</span>
    </div>

    <div class="mt-1 grow rounded-xl bg-[#1E1E1E] p-3">
      <textarea
        type="text"
        v-model="entries"
        placeholder="Entry 1, Entry 2; Entry3;&#10;Entry 4; Entry 5, Entry 6 &#10;&#10;Split your entries by using ',' or ';' &#10;or new line."
        class="h-full w-full resize-none rounded-xl border-2 bg-transparent px-2 py-1 text-slate-100 focus:outline-none"
      >
      </textarea>
    </div>
  </div>
</template>
