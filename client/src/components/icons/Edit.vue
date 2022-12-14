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
    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
    <path
      d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"
      class="pen"
    ></path>
    <path d="M16 5l3 3" class="pen"></path>
  </svg>
</template>

<style scoped>
svg {
  width: 3rem;
  height: 3rem;
}

.pen {
  transition: 0.1s;
}

svg:hover > .pen {
  transform: translateX(5%) translateY(-2%) rotateZ(-5deg);
}
</style>
