<template>
  <h2>Sign in to your account</h2>
  <p class="auth-swap">
    Or
    <router-link :to="{ name: 'RegisterView' }"> register for free </router-link>
  </p>
  <div v-if="error" class="error">
    {{ error }}
    <X class="error__x" @click="error = ''" />
  </div>
  <form class="mt-8 space-y-6" @submit="login">
    <input type="hidden" name="remember" value="true" />
    <div class="credentials-container">
      <AuthInput v-model="user.email" type="text" name="Email address">
        <Mail
          class="credential-item__icon"
          :class="user.email ? 'credential-item__icon--filled' : ''"
        />
      </AuthInput>
      <AuthInput v-model="user.password" type="password" name="Password">
        <Lock
          class="credential-item__icon"
          :class="user.password ? 'credential-item__icon--filled' : ''"
        />
      </AuthInput>
    </div>

    <div class="remember-me">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        class="remember-me--checkbox"
        v-model="user.remember"
      />
      <label class="remember-me--text" for="remember-me">Remember me</label>
    </div>

    <div>
      <button
        class="action-button"
        :class="loading ? 'action-button--disable' : ''"
        :disabled="loading"
        type="submit"
      >
        <Loading v-if="loading" class="action-button__loading" />
        Sign in
      </button>
    </div>
  </form>
  <div class="home-back">
    <router-link :to="{ name: 'HomeView' }"> Go back home </router-link>
  </div>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import AuthInput from "../components/AuthInput.vue";
import Loading from "../components/icons/Loading.vue";
import X from "../components/icons/X.vue";
import Lock from "../components/icons/Lock.vue";
import Mail from "../components/icons/Mail.vue";

const router = useRouter();

const user = reactive({
  email: "",
  password: "",
  remember: false,
});

let error = ref("");
const loading = ref(false);

function login(event) {
  event.preventDefault();

  loading.value = true;
  store
    .dispatch("login", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "HomeView",
      });
    })
    .catch((err) => {
      loading.value = false;
      error.value = err.response.data.message;
    });
}
</script>

<style scoped>
.credential-item:hover > .credential-item__icon {
  transform: translateY(-10%);
}
.credential-item__icon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 20px;
  top: 10px;
  color: var(--weak-gray);
  transition: 0.2s;
}
.credential-item__icon--filled {
  color: var(--gray);
}
h2 {
  font-size: 30px;
  font-weight: 700;
  padding: 0px 20px;
  text-align: center;
}
.home-back {
  width: 100%;
  display: flex;
  justify-content: end;
}
.auth-swap a,
.home-back a {
  color: var(--green-2);
  transition: 0.1s;
  font-weight: 500;
}
.home-back a {
  font-size: 12px;
  text-align: right;
  padding: 10px;
}
.auth-swap a:hover {
  color: var(--green-1);
}
.error {
  background-color: var(--red-1);
  color: var(--white);
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
  padding-right: 40px;
  position: relative;
}
.error__x {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.1s;
}
.error__x:hover {
  background-color: var(--red-2);
}
form {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
.credentials-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.remember-me {
  display: flex;
  align-items: center;
}
.remember-me--checkbox {
  width: 25px;
  height: 25px;
  border-radius: 40%;
  border: 3px solid var(--white-gray);
  background-color: var(--white-gray);
  appearance: none;
  transition: 0.2s;
  cursor: pointer;
}
.remember-me--checkbox:checked {
  background-color: var(--green-1);
}
.remember-me--text {
  margin-left: 10px;
}
.action-button {
  height: 41px;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  background-color: var(--green-1);
  color: var(--white);
  padding: 10px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.1s;
}
.action-button:hover {
  background-color: var(--green-2);
}
.action-button--disable:hover {
  cursor: not-allowed;
  background-color: var(--green-5);
}
.action-button__loading {
  height: 21px;
  width: 21px;
  margin-right: 5px;
}
</style>
