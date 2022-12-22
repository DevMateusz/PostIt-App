<template>
  <div class="create-post">
    <label for="title" class="create-post__label">Title</label>
    <input
      name="title"
      class="create-post__title-edit"
      type="text"
      v-model="model.title"
    />
    <label for="content" class="create-post__label">Content</label>
    <textarea
      name="content"
      :rows="2"
      class="create-post__content-edit"
      v-model="model.content"
    ></textarea>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const model = reactive({
  title: "",
  content: "",
});

const emit = defineEmits(["updateDataNewPost"]);

watch(model, (newVal, oldVal) => {
  emit("updateDataNewPost", newVal);
});
</script>

<style scoped>
.create-post {
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 5px;
}

.create-post__title-edit,
.create-post__content-edit {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}
.create-post__title-edit {
  font-size: 26px;
  font-weight: 600;
  margin: 5px;
}
.create-post__content-edit {
  font-size: 16px;
  min-height: 8em;
  resize: none;
  margin: 5px;
}
.create-post__label {
  margin-left: 10px;
}

@media (min-width: 768px) {
  .create-post {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .create-post {
    width: 700px;
  }
}
</style>
