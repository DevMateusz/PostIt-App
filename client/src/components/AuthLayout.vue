<template>
  <div class="screen">
    <div class="container" style="animation: fade-in-out 0.5s ease-in-out both">
      <router-link :to="{ name: 'HomeView' }">
        <img src="/src/assets/logo.svg" alt="Logo Post It" />
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.screen {
  height: 100vh;
  width: 100vw;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
img {
  width: 100px;
  height: 100px;
}
.container {
  max-width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
@media (min-width: 768px) {
  .container {
    margin-top: 50px;
    max-width: 450px;
  }
}
</style>
