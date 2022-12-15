<template>
  <h2>Register for free</h2>
  <p class="auth-swap">
    Or
    <router-link :to="{ name: 'LoginView' }"> login to your account </router-link>
  </p>
  <div v-if="error" class="error">
    {{ error }}
    <X class="error__x" @click="error = ''" />
  </div>
  <form @submit="register">
    <input type="hidden" name="remember" value="true" />
    <div class="credentials-container">
      <AuthInput v-model="user.name" type="text" name="Name">
        <User
          class="credential-item__icon"
          :class="user.name ? 'credential-item__icon--filled' : ''"
        />
      </AuthInput>
      <AuthInput v-model="user.email" type="email" name="Email address">
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
      <AuthInput
        v-model="user.passwordConfirmation"
        type="password"
        name="Password confirmation"
      >
        <Lock
          class="credential-item__icon"
          :class="user.passwordConfirmation ? 'credential-item__icon--filled' : ''"
        />
      </AuthInput>
      <span
        class="password-strength"
        :style="[
          passwordStrength >= 3 && passwordStrength <= 4
            ? 'background-color: orange'
            : '',
          passwordStrength == 5 ? 'background-color: green' : '',
          `width: ${passwordStrength * 20}%;`,
        ]"
      ></span>
    </div>
    <div class="colors-container">
      <input
        required
        class="color-pattern"
        v-for="(color, index) in colorsPattern"
        type="radio"
        name="color"
        v-model="user.colorPattern"
        :value="index"
        :style="`background-color: ${color}`"
      />
    </div>
    <div>
      <button
        class="action-button"
        :class="loading ? 'action-button--disable' : ''"
        :disabled="loading"
        type="submit"
      >
        <Loading v-if="loading" class="action-button__loading" />
        Sign up
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
import { ref, computed, reactive, watch } from "vue";
import AuthInput from "../components/AuthInput.vue";
import Loading from "../components/icons/Loading.vue";
import X from "../components/icons/X.vue";
import User from "../components/icons/User.vue";
import Lock from "../components/icons/Lock.vue";
import Mail from "../components/icons/Mail.vue";

const router = useRouter();

const user = reactive({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  colorPattern: null,
});

const colorsPattern = computed(() => store.state.colorsPattern);

let error = ref("");
const loading = ref(false);
let passwordStrength = ref(0);

watch(
  () => user.password,
  function (newVal, oldVal) {
    passwordStrength.value = validatePassword(newVal);
  }
);

function validatePassword(password) {
  let strength = ref(0);
  if (/(?=(.*[a-z]){1,})/g.test(password)) {
    strength.value += 1;
  }
  if (/(?=(.*[A-Z]){1,})/g.test(password)) {
    strength.value += 1;
  }
  if (/(?=(.*[0-9]){1,})/g.test(password)) {
    strength.value += 1;
  }
  if (/(?=(.*[!@#$%^&*()\-_+.]){1,})/g.test(password)) {
    strength.value += 1;
  }
  if (/.{8,}/g.test(password)) {
    strength.value += 1;
  }
  return strength.value;
}

function register(event) {
  event.preventDefault();

  if (passwordStrength.value >= 3) {
    if (user.password == user.passwordConfirmation) {
      error.value = "";
      loading.value = true;
      store
        .dispatch("register", user)
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
    } else {
      error.value = "Passwords are not the same";
    }
  } else {
    error.value = "Password is too weak";
  }
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
.password-strength {
  height: 4px;
  max-width: 96%;
  border-radius: 3px;
  margin: 0px 8px;
  background-color: var(--red-1);
  transform: translateY(-60%);
  transition: 0.2s;
}
.screen-read-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
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

.colors-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 8px;
}
.color-pattern {
  width: 36px;
  height: 36px;
  border-radius: 40%;
  border: 3px solid var(--white-gray);
  appearance: none;
  transition: 0.2s;
  cursor: pointer;
}
.color-pattern:checked,
.color-pattern:checked:hover {
  border: 3px solid var(--current);
  appearance: none;
  transform: scale(130%);

  transition: 0.2s;
  cursor: pointer;
}

.color-pattern:hover {
  transform: scale(110%);
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
