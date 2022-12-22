<template>
  <h2 class="sign-in__heading">Sign in to your account</h2>
  <p class="sign-in__auth-swap">
    Or
    <router-link :to="{ name: 'RegisterView' }" class="sign-in__register-link">
      register for free
    </router-link>
  </p>
  <div
    v-if="error"
    class="sign-in__error"
    style="animation: fade-in-out 0.5s ease-in-out both"
  >
    {{ error }}
    <X class="sign-in__error-x" @click="error = ''" />
  </div>
  <form class="sign-in__form" @submit="login">
    <input type="hidden" name="remember" value="true" />
    <div class="sign-in__credentials-container">
      <AuthInput v-model="user.email" type="email" name="Email address">
        <Mail
          class="sign-in__credential-item-icon"
          :class="user.email ? 'sign-in__credential-item-icon--filled' : ''"
        />
      </AuthInput>
      <AuthInput v-model="user.password" type="password" name="Password">
        <Lock
          class="sign-in__credential-item-icon"
          :class="user.password ? 'sign-in__credential-item-icon--filled' : ''"
        />
      </AuthInput>
    </div>

    <div class="sign-in__remember-me">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        class="sign-in__remember-me--checkbox"
        v-model="user.remember"
      />
      <label class="sign-in__remember-me--text" for="remember-me">Remember me</label>
    </div>

    <div>
      <button
        class="sign-in__action-button"
        :class="loading ? 'sign-in__action-button--disable' : ''"
        :disabled="loading"
        type="submit"
      >
        <Loading v-if="loading" class="sign-in__action-button--loading" />
        Sign in
      </button>
    </div>
  </form>
  <div class="sign-in__home-back">
    <router-link :to="{ name: 'HomeView' }" class="sign-in__home-back--link">
      Go back home
    </router-link>
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
.credential-item:hover > .sign-in__credential-item-icon {
  transform: translateY(-10%);
}
.sign-in__credential-item-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 20px;
  top: 10px;
  color: var(--weak-gray);
  transition: 0.2s;
}
.sign-in__credential-item-icon--filled {
  color: var(--gray);
}
.sign-in__heading {
  font-size: 30px;
  font-weight: 700;
  padding: 0px 20px;
  text-align: center;
}
.sign-in__home-back {
  width: 100%;
  display: flex;
  justify-content: end;
}
.sign-in__register-link,
.sign-in__home-back--link {
  color: var(--green-2);
  transition: 0.1s;
  font-weight: 500;
}
.sign-in__home-back--link {
  font-size: 12px;
  text-align: right;
  padding: 10px;
}
.sign-in__register-link:hover {
  color: var(--green-1);
}
.sign-in__error {
  background-color: var(--red-1);
  color: var(--white);
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
  padding-right: 40px;
  position: relative;
}
.sign-in__error-x {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.1s;
}
.sign-in__error-x:hover {
  background-color: var(--red-2);
}
.sign-in__form {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
.sign-in__credentials-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.sign-in__remember-me {
  display: flex;
  align-items: center;
}
.sign-in__remember-me--checkbox {
  width: 25px;
  height: 25px;
  border-radius: 40%;
  border: 3px solid var(--white-gray);
  background-color: var(--white-gray);
  appearance: none;
  transition: 0.2s;
  cursor: pointer;
}
.sign-in__remember-me--checkbox:checked {
  background-color: var(--green-1);
}
.sign-in__remember-me--text {
  margin-left: 10px;
}
.sign-in__action-button {
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
.sign-in__action-button:hover {
  background-color: var(--green-2);
}
.sign-in__action-button--disable:hover {
  cursor: not-allowed;
  background-color: var(--green-5);
}
.sign-in__action-button--loading {
  height: 21px;
  width: 21px;
  margin-right: 5px;
}
</style>
