<template>
  <nav>
    <div v-for="(sort, index) in setSorts()" class="sort__element">
      <button
        @click="
          selectSort(sort.name.toLowerCase());
          sendQuery();
        "
        :class="
          sortSelect.toLowerCase() == sort.name.toLowerCase()
            ? 'sort__element--selected'
            : ''
        "
      >
        {{ sort.name }}
      </button>
      <div v-if="index < setSorts().length - 1" class="sort__separator"></div>
    </div>
  </nav>
  <div class="function-container--not-logged" v-if="!logged">
    <div class="not-logged__search-container">
      <input
        v-model="search"
        type="search"
        name="search"
        class="function-container__search"
        autocomplete="off"
      />
      <Search @click="sendQuery()" class="function-container__search-icon" />
    </div>
  </div>
  <div class="function-container" v-if="logged">
    <div class="search-container">
      <input
        v-model="search"
        type="search"
        name="search"
        class="function-container__search"
        autocomplete="off"
      />
      <Search @click="sendQuery()" class="function-container__search-icon" />
    </div>
    <button
      class="btn btn--save-post"
      v-if="!createNewPost"
      @click="createNewPost = true"
    >
      Create Post
    </button>
    <button class="btn btn--save-post" v-if="createNewPost" @click="saveNewPost()">
      Save Post
    </button>
    <button class="btn btn--cancel-post" v-if="createNewPost" @click="cancelNewPost()">
      Cancel
    </button>
  </div>
  <div v-if="createNewPost" class="create-post-container">
    <CreatePost
      @update-data-new-post="updateDataNewPost"
      style="animation: fade-in-out 0.5s ease-in-out both"
    />
  </div>
  <div v-if="!loading" class="posts-container" :key="componentKey">
    <PostListItem
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
      style="animation: fade-in-out 0.5s ease-in-out both"
      :style="`animation-delay: ${index * 0.1}s;`"
    />
  </div>
  <div v-if="loading" class="loading">
    <Loading class="loading__icon" />
    Loading
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import store from "../store";

import Loading from "../components/icons/Loading.vue";
import PostListItem from "../components/PostListItem.vue";
import CreatePost from "../components/CreatePost.vue";
import Search from "../components/icons/Search.vue";

const route = useRoute();

const createNewPost = ref(false);
const componentKey = ref(0);

const sorts = [
  { name: "Latest", afterLogin: false },
  { name: "Oldest", afterLogin: false },
  { name: "Most Likes", afterLogin: false },
  { name: "You Like", afterLogin: true },
  { name: "Your", afterLogin: true },
  { name: "Your Friends", afterLogin: true },
];

const posts = computed(() => store.state.posts.data);
const logged = computed(() => store.state.user.logged);
const loading = computed(() => store.state.posts.loading);
const newPost = reactive({});

let sortSelect = ref("latest");
let search = ref("");

function setSorts() {
  return sorts.filter((sort) => {
    return sort.afterLogin === logged.value || sort.afterLogin === false;
  });
}

function selectSort(value) {
  sortSelect.value = value;
}

function sendQuery() {
  store.dispatch("getPosts", {
    sort: sortSelect.value,
    search: search.value.toLowerCase(),
  });
  componentKey.value += 1;
}

function saveNewPost() {
  if (newPost.value.title && newPost.value.content) {
    store
      .dispatch("savePost", {
        title: newPost.value.title,
        content: newPost.value.content,
      })
      .then(() => {
        store.commit("notify", {
          type: "success",
          message: "Post has been saved",
        });
      });
    newPost.value = "";
    createNewPost.value = false;
  } else {
    store.commit("notify", {
      type: "error",
      message: "Post must include title and content",
    });
  }
}

function cancelNewPost() {
  newPost.value = "";
  createNewPost.value = false;
}

function updateDataNewPost(value) {
  newPost.value = value;
}

sendQuery();
</script>

<style scoped>
.loading {
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.loading__icon {
  width: 36px;
  height: 36px;
}
.posts-container {
  display: grid;
  gap: 14px;
}
.sort__element {
  display: flex;
}
.sort__element div {
  display: none;
}
button {
  cursor: pointer;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  color: var(--gray);
  background-color: var(--dark-white);
  padding: 8px 10px;
  transition: 0.1s;
}
.sort__separator {
  width: 2px;
  height: 20px;
  background-color: var(--gray);
  transform: rotateZ(20deg);
}
nav {
  margin: 10px 5px;
  display: flex;
  justify-content: space-between;
  gap: 4px;
}
.sort__element--selected {
  cursor: default;
  background-color: var(--green-1);
  color: var(--white);
  font-weight: 600;
  transition: 0.1s;
}
article {
  background-color: white;
}
.function-container {
  display: flex;
  margin: 5px;
  gap: 10px;
  flex-direction: column;
}
.search-container {
  display: flex;
  justify-content: center;
  flex: 1;
}

.function-container__search {
  flex: 1;
  height: 35px;
  font-size: 19px;
  border: 1px solid;
  border-radius: 5px;
}
.btn {
  font-weight: 600;
  color: var(--white);
  height: 40px;
  transition: 0.1s;
  padding: 0px 20px;
}
.btn--save-post {
  background-color: var(--light-gray);
}

.btn--save-post:hover {
  background-color: var(--gray);
}
.function-container__search-icon {
  width: 35px;
  height: 35px;
  margin: 0px 5px;
  cursor: pointer;
}
.create-post-container {
  margin-bottom: 15px;
  height: 0px;
  animation: area-growing 0.4s ease-in-out both alternate;
}
.btn--cancel-post {
  background-color: var(--red-1);
  box-sizing: border-box;
}
.btn--cancel-post:hover {
  background-color: var(--red-2);
}
.not-logged__search-container {
  display: flex;
  margin-bottom: 10px;
  flex: 1;
}
.function-container--not-logged {
  display: flex;
  justify-content: center;
  margin: 5px;
  height: 40px;
  gap: 10px;
}
@keyframes area-growing {
  from {
    height: 0px;
    opacity: 0;
  }
  to {
    height: 250px;
    opacity: 1;
  }
}

@media (min-width: 768px) {
  .search-container {
    justify-content: start;
  }
  nav {
    margin: 10px 0px;
  }
  button {
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;
    border: none;
    border-radius: 5px;
  }
  .sort__element--selected {
    background-color: transparent;
    cursor: default;
    text-decoration: underline;
    text-decoration-color: var(--green-2);
    color: var(--green-2);
    font-weight: 400;
    transition: 0.1s;
  }
  .posts-container {
    grid-template-columns: 1fr 1fr;
  }
  nav {
    justify-content: flex-end;
    gap: 10px;
  }
  .sort__element {
    align-items: center;
    gap: 10px;
  }
  .sort__element div {
    display: inline-block;
  }
  .function-container {
    justify-content: flex-end;
    flex-direction: row;
    position: relative;
  }

  .function-container__search {
    flex: none;
    width: 350px;
  }
  .create-post-container {
    display: flex;
    justify-content: center;
  }
  .not-logged__search-container {
    margin-left: 40px;
    justify-content: center;
    flex: auto;
  }
}
@media (min-width: 1024px) {
  .search-container {
    position: absolute;
    justify-content: center;
    left: 35%;
  }
  .search-container .search {
    width: 350px;
  }
}
</style>
