import { reactive, ref } from "vue";

export let currentWinner = ref("");

export let entryNames = reactive([
  //List of entries
  "Entry 1",
  "Entry 2",
  "Entry 3",
  "Entry 4",
  "Entry 5",
  "Entry 6",
]);

export const entryColors = [
  // List of colors that are used to generate the wheel
  "#16A34A", //Green
  "#2563EB", //Blue
  "#7C3AED", //Purple
  "#DB2777", //Pink
  "#DC2626", //Red
  "#FACC15", //Yellow
];

export const spinTime = ref(15); // Time in seconds for the wheel to spin
