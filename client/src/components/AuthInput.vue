<template>
  <div class="credential-item">
    <label for="password" class="credential-item__lable">{{ name }}</label>
    <input
      class="credential-item__input"
      :name="type"
      :type="type"
      :placeholder="name"
      v-model="value"
      required
    />
    <slot> </slot>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
let value = ref("");
defineProps({
  type: String,
  name: String,
});
const emit = defineEmits(["update:modelValue"]);

watch(
  () => value.value,
  function (newVal, oldVal) {
    emit("update:modelValue", newVal);
  }
);
</script>

<style scoped>
.credential-item {
  position: relative;
}
.credential-item__lable {
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
.credential-item__input {
  font-size: 15px;
  border: none;
  background-color: var(--white-gray);
  border-radius: 12px;
  padding: 12px;
  padding-left: 50px;
  transition: 0.2s;
  width: 100%;
}
</style>
