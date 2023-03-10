<script setup lang="ts">
import { entryNames } from "../Store/Entries";
import { ref, watchEffect } from "vue";

const entries = ref("");

watchEffect(() => {
  if (entries.value !== "") {
    const value: string[] = entries.value.split(/[\n,;]/);

    // Clears array and then inserts new values
    entryNames.length = 0;
    entryNames.push(...value);
  } //If textarea is empty, it will show placeholder
  else {
    entryNames.length = 0;
    entryNames.push(
      //List of entries
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

    <div class="mt-1 grow rounded-xl bg-neutral-800 p-3">
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
