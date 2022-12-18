<template>
  <div class="screen">
    <nav style="animation: fade-in-out 0.5s ease-in-out both">
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
            @click="action.event ? action.event() : ()=>{}"
            >{{ action.name }}</router-link
          >
        </div>
      </div>
    </nav>
    <main style="animation: fade-in-out 0.5s ease-in-out both">
      <!-- <router-view> </router-view> -->
      <HomeView :key="componentKey"/>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Logo from "../components/icons/Logo.vue";
import HomeView from "../views/HomeView.vue"
import store from "../store";

const componentKey = ref(0);
const actions = [
  {
    name: "Log In",
    class: "extra_button",
    afterLogin: false,
    to: { name: "LoginView" },
  },
  {
    name: "Sign Up",
    class: "default_button",
    afterLogin: false,
    to: { name: "RegisterView" },
  },
  {
    name: "Log out",
    class: "default_button",
    afterLogin: true,
    to: { name: "HomeView" },
    event: logout,
  },
];
const logged = computed(() => store.state.user.logged);

function logout() {
  store.commit('logout')
  store.commit("notify", {
        type: "success",
        message: "You have been correctly logged out",
      });
  componentKey.value += 1;
}
</script>

<style scoped>
.screen {
  height: 100%;
  width: 100%;
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
  transition: 0.2s;
  font-weight: 600;
}
.default_button {
  background-color: var(--green-1);
}
.default_button:hover {
  background-color: var(--green-2);
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
