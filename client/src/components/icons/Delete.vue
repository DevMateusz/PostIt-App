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
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="4" y1="7" x2="20" y2="7" class="up"></line>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" class="up"></path>
  </svg>
</template>

<style scoped>
svg {
  width: 3rem;
  height: 3rem;
  transition: 0.1s;
}
.up {
  transition: 0.1s;
}

svg:hover {
  transform: scale(105%);
  color: var(--red-1);
}
svg:hover > .up {
  transform: rotateZ(-10deg) translateX(-5%) translateY(-5%);
  color: var(--red-1);
}
</style>
