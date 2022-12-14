<template>
  <article>
    <label for="title">Title</label>
    <input name="title" class="title_edit" type="text" v-model="model.title" />
    <label for="content">Content</label>
    <textarea
      name="content"
      :rows="2"
      class="content_edit"
      v-model="model.content"
    ></textarea>
  </article>
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
article {
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 5px;
}

.title_edit,
.content_edit {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}
.title_edit {
  font-size: 26px;
  font-weight: 600;
  margin: 5px;
}
.content_edit {
  font-size: 16px;
  min-height: 8em;
  resize: none;
  margin: 5px;
}
label {
  margin-left: 10px;
}

@media (min-width: 768px) {
  article {
    width: 700px;
  }
}
</style>
