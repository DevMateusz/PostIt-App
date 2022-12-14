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
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    <line x1="16" y1="11" x2="22" y2="11" class="minus"></line>
  </svg>
</template>

<style scoped>
svg {
  width: 3rem;
  height: 3rem;
}

.minus {
  transition: 0.1s;
}

svg:hover > .minus {
  transform: scale(115%) translateX(-10%) translateY(-5%);
}
</style>
