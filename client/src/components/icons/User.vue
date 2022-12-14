<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    :style="{ color: colorsPattern[props.colorPattern] }"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx="12" cy="7" r="4"></circle>
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
  </svg>
</template>

<script setup>
import { computed } from "vue";
import store from "../../store";
const colorsPattern = computed(() => store.state.colorsPattern);
const props = defineProps(["colorPattern"]);
</script>

<style scoped>
svg {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
