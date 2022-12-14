<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
    ></path>
    <text
      v-if="likes < 10"
      style="fill: var(--gray); font-size: 11px; stroke: none; font-weight: 600"
      x="8.9"
      y="15.598"
    >
      {{ likes }}
    </text>
    <text
      v-else-if="likes >= 10 && likes <= 99"
      style="fill: var(--gray); font-size: 9px; stroke: none; font-weight: 600"
      x="7"
      y="14.098"
    >
      {{ likes }}
    </text>
    <text
      v-else
      style="fill: var(--gray); font-size: 8px; stroke: none; font-weight: 600"
      x="5.51"
      y="13.125"
    >
      99+
    </text>
  </svg>
</template>

<script setup>
defineProps({
  likes: Number,
});
</script>

<style scoped>
svg {
  width: 3rem;
  height: 3rem;
}
</style>
