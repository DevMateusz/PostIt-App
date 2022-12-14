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
    <circle cx="10" cy="10" r="7"></circle>
    <line x1="21" y1="21" x2="15" y2="15"></line>
  </svg>
</template>

<style scoped>
svg {
  width: 3rem;
  height: 3rem;
  color: var(--dark-gray);
  transition: 0.1s;
}

svg:hover {
  transform: translateX(10%) translateY(-10%) scale(105%);
}
</style>
