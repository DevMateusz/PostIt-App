<template>
  <div class="screen">
    <nav>
      <div class="menu">
        <div class="logo">
          <Logo size="4" />
        </div>
        <div class="actions">
          <router-link
            :class="action.class"
            v-for="action in actions"
            v-show="action.afterLogin === logged"
            :key="action.name"
            :to="action.to"
            >{{ action.name }}</router-link
          >
        </div>
      </div>
    </nav>
    <main>
      <router-view> </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Logo from "../components/icons/Logo.vue";
const actions = [
  { name: "Log In", class: "extra_button", afterLogin: false, to: { name: "HomeView" } },
  {
    name: "Sign Up",
    class: "default_button",
    afterLogin: false,
    to: { name: "HomeView" },
  },
  {
    name: "Log out",
    class: "default_button",
    afterLogin: true,
    to: { name: "HomeView" },
  },
];
const logged = ref(true);
</script>

<style scoped>
.screen {
  min-height: 100vh;
  min-width: 100vw;
}
.menu,
main {
  max-width: 1280px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
.menu {
  justify-content: space-between;
  padding-right: 1rem;
  padding-left: 1rem;
}
main {
  flex-direction: column;
  padding-right: 0rem;
  padding-left: 0rem;
}
nav {
  background-color: var(--gray);
}
.actions,
.logo {
  display: flex;
  place-items: center;
  gap: 10px;
}
.default_button,
.extra_button {
  padding: 8px 20px;
  border-radius: 5px;
  font-weight: 500;
  transition: 0.2s;
}
.default_button {
  background-color: var(--green-2);
}
.default_button:hover {
  background-color: var(--green-1);
}
.extra_button {
  color: var(--white);
}
.extra_button:hover {
  color: var(--green-1);
  background-color: var(--light-gray);
}

@media (min-width: 768px) {
  .menu,
  main {
    max-width: 1280px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    padding-right: 2rem;
    padding-left: 2rem;
  }
}
</style>
