<template>
  <div class="notifications-container" >
    <div
    v-for="notification in notifications"
    :key="notification.id"
    class="notification"
    style="animation: fade-in-out 0.4s ease-in-out both"
    :style="[
      notification.type === 'success' ? 'background-color: var(--green-1); box-shadow: 0px 0px 100px var(--green-1);' : '',
      notification.type === 'error' ? 'background-color: var(--red-1); box-shadow: 0px 0px 100px var(--red-1);' : '',
      notification.type === 'information' ? 'background-color: var(--blue-1); box-shadow: 0px 0px 100px var(--blue-1);' : '',
    ]"
  >
    <Error class="notification__icon" v-if="notification.type === 'error'" />
    <Information class="notification__icon" v-if="notification.type === 'information'" />
    <Success class="notification__icon" v-if="notification.type === 'success'" />
    <p class="notification__message">{{ notification.message }}</p>
  </div>
  </div>
  
</template>

<script setup>
import { computed } from "vue";
import store from '../store'

import Error from './icons/Error.vue';
import Information from './icons/Inform.vue';
import Success from './icons/Success.vue';

const notifications = computed(() => store.state.notifications.data);
</script>

<style scoped>
.notifications-container{
  position: fixed;
  width: 90%;
  bottom: 40px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 240px;
  
}
.notification{
  color: var(--dark-white);
  background-color: red;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 100px red;
}
.notification__icon{
  width: 30px;
  height: 30px;
}
.notification__message{
  font-size: 16px;
  width: 100%;
  font-weight: 600;

}
@media (min-width: 768px) {
  .notifications-container{
    max-height: 300px;
    width: 320px;
  }
}


</style>
