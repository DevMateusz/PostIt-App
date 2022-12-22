<template>
  <div class="screen">
    <nav class="nav" style="animation: fade-in-out 0.5s ease-in-out both">
      <div class="nav__menu">
        <img class="nav__logo" src="/src/assets/logoLight.svg" alt="Logo Post It" />
        <div class="nav__actions">
          <router-link
            :class="action.class"
            v-for="action in actions"
            v-show="action.afterLogin === logged"
            :key="action.name"
            :to="action.to"
            @click="action.event ? action.event() : () => {}"
            >{{ action.name }}</router-link
          >
        </div>
      </div>
    </nav>
    <main class="main" style="animation: fade-in-out 0.5s ease-in-out both">
      <HomeView :key="componentKey" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const componentKey = ref(0);
const actions = [
  {
    name: "Log In",
    class: "nav__action--extra-button",
    afterLogin: false,
    to: { name: "LoginView" },
  },
  {
    name: "Sign Up",
    class: "nav__action--default-button",
    afterLogin: false,
    to: { name: "RegisterView" },
  },
  {
    name: "Log out",
    class: "nav__action--default-button",
    afterLogin: true,
    to: { name: "HomeView" },
    event: logout,
  },
];
const logged = computed(() => store.state.user.logged);

function logout() {
  store.commit("logout");
  store.commit("notify", {
    type: "success",
    message: "You have been correctly logged out",
  });
  componentKey.value += 1;
}
</script>

<style scoped>
.screen {
  height: 101vh;
  width: 100%;
}
.nav__menu,
.main {
  max-width: 1280px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
.nav__menu {
  justify-content: space-between;
  padding-right: 1rem;
  padding-left: 1rem;
  align-items: center;
  height: 70px;
}
.nav__logo {
  height: 85%;
}

.main {
  flex-direction: column;
  padding-right: 0rem;
  padding-left: 0rem;
}
.nav {
  background-color: var(--gray);
}
.nav__actions {
  display: flex;
  place-items: center;
  gap: 10px;
}
.nav__action--default-button,
.nav__action--extra-button {
  padding: 8px 20px;
  border-radius: 5px;
  transition: 0.2s;
  font-weight: 600;
}
.nav__action--default-button {
  background-color: var(--green-1);
}
.nav__action--default-button:hover {
  background-color: var(--green-2);
}
.nav__action--extra-button {
  color: var(--white);
}
.nav__action--extra-button:hover {
  color: var(--green-1);
  background-color: var(--light-gray);
}

@media (min-width: 768px) {
  .nav__menu,
  .main {
    max-width: 1280px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    padding-right: 2rem;
    padding-left: 2rem;
  }
}
</style>
