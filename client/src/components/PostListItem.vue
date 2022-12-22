<template>
  <article class="post">
    <header class="header">
      <div class="post__user-information">
        <User :colorPattern="post.creator.colorPattern" />
        <h2 class="post__user-name">{{ post.creator.name }}</h2>
      </div>
      <div class="post__actions-buttons">
        <button
          @click="logged ? deleteInforamtion() : loginRequireAlert()"
          @dblclick="logged ? deletePost() : loginRequireAlert()"
          v-if="post.isOwner && logged"
          class="post__action-button"
        >
          <Delete class="post__action-button--icon" />
        </button>
        <button
          @click="logged ? (edit = true) : loginRequireAlert()"
          v-if="post.isOwner && !edit && logged"
          class="post__action-button"
        >
          <Edit class="post__action-button--icon" />
        </button>
        <button
          @click="logged ? savePost() : loginRequireAlert()"
          v-if="post.isOwner && edit && logged"
          class="post__action-button"
        >
          <Save class="post__action-button--icon" />
        </button>
        <button
          @click="logged ? addToFriends() : loginRequireAlert()"
          v-if="!post.isFriend && !post.isOwner && logged"
          class="post__action-button"
        >
          <AddUser class="post__action-button--icon" />
        </button>
        <button
          @click="logged ? removeFromFriends() : loginRequireAlert()"
          v-if="post.isFriend && !post.isOwner && logged"
          class="post__action-button"
        >
          <RemoveUser
            class="post__action-button--icon post__action-button-icon-remove-user"
          />
        </button>
        <button
          @click="logged ? likeAction() : loginRequireAlert()"
          class="post__action-button"
        >
          <Like
            :likes="post.likes"
            :class="
              post.isLiked
                ? 'post__action-button--icon-like--liked'
                : 'post__action-button--icon-like'
            "
            class="post__action-button--icon"
          />
        </button>
      </div>
    </header>
    <div class="post__title">
      <h1 v-if="!edit" class="post__title--view">{{ post.title }}</h1>
      <input class="post__title--edit" v-else type="text" v-model="post.title" />
    </div>
    <div class="post__content">
      <p v-if="!edit" class="post__content--view">
        {{ post.content }}
      </p>
      <textarea
        :rows="2"
        class="post__content--edit"
        v-else
        v-model="post.content"
      ></textarea>
      <h5 class="post__content--date">{{ calcDate(post.createdAt) }}</h5>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from "vue";
import User from "../components/icons/User.vue";
import Edit from "../components/icons/Edit.vue";
import Delete from "../components/icons/Delete.vue";
import Save from "../components/icons/Save.vue";
import AddUser from "../components/icons/AddUser.vue";
import RemoveUser from "../components/icons/RemoveUser.vue";
import Like from "../components/icons/Like.vue";
import store from "../store";

let edit = ref(false);
let antiSpamer = ref(false);
const logged = computed(() => store.state.user.logged);

const props = defineProps({
  post: Object,
});

function calcDate(postCreated) {
  const secondSincePost = (new Date().getTime() - new Date(postCreated).getTime()) / 1000;
  if (secondSincePost >= 86400) {
    return `${Math.floor(secondSincePost / 86400)} Days ago`;
  } else if (secondSincePost >= 3600) {
    return `${Math.floor(secondSincePost / 3600)} Hours ago`;
  } else if (secondSincePost >= 60) {
    return `${Math.floor(secondSincePost / 60)} Minutes ago`;
  } else if (secondSincePost > 1) {
    return `${Math.floor(secondSincePost)} Seconds ago`;
  } else {
    return `Just now`;
  }
}

function likeAction() {
  if (props.post.isLiked) {
    props.post.isLiked = false;
    props.post.likes -= 1;
    store.dispatch("dislikePost", props.post._id);
  } else {
    props.post.isLiked = true;
    props.post.likes += 1;
    store.dispatch("likePost", props.post._id);
  }
}

function loginRequireAlert() {
  store.commit("notify", {
    type: "information",
    message: "You must be logged in to this action",
  });
}

function addToFriends() {
  store.dispatch("addToFriends", props.post.creator._id).then(() => {
    store.commit("notify", {
      type: "success",
      message: `${props.post.creator.name} has been added to friends`,
    });
  });
}

function removeFromFriends() {
  store.dispatch("removeFromFrinds", props.post.creator._id).then(() => {
    store.commit("notify", {
      type: "success",
      message: `${props.post.creator.name} has been removed from friends`,
    });
  });
}

function savePost() {
  if (props.post.title && props.post.content) {
    store
      .dispatch("savePost", {
        id: props.post._id,
        title: props.post.title,
        content: props.post.content,
      })
      .then(() => {
        store.commit("notify", {
          type: "success",
          message: "Post has been updated",
        });
      });
    edit.value = false;
  } else {
    store.commit("notify", {
      type: "error",
      message: "Post must include title and content",
    });
  }
}
function deleteInforamtion() {
  if (!antiSpamer.value) {
    store.commit("notify", {
      type: "information",
      message: "Double-click to delete a post",
    });
    antiSpamer.value = true;
    setTimeout(() => {
      antiSpamer.value = false;
    }, 2000);
  }
}

function deletePost() {
  store.dispatch("deletePost", props.post._id).then(() => {
    store.commit("notify", {
      type: "success",
      message: "Post has been removed",
    });
  });
}
</script>

<style scoped>
.post__user-name,
.post__title,
.post__content {
  word-break: break-word;
}
.post {
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 5px;
  min-height: 240px;
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  border-bottom: 1px var(--gray) solid;
}
.post__user-name {
  font-weight: 600;
}
.post__title--view {
  font-weight: 600;
  font-size: 26px;
}
.post__content {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.post__title {
  padding: 5px;
  display: flex;
  flex-direction: column;
}
.post__content--date {
  font-weight: 300;
}

.post__user-information {
  display: flex;
  gap: 10px;
  align-items: center;
}
.post__action-button {
  cursor: pointer;
  text-decoration: none;
  border: none;
  background-color: transparent;
}
.post__action-button--icon {
  width: 32px;
  height: 32px;
  color: var(--light-gray);
  transition: 0.1s;
}
.post__action-button-icon-remove-user {
  color: var(--red-1);
}
.post__action-button--icon-like:hover {
  transform: scale(110%);
  transition: 0.1s;
}
.post__action-button--icon-like--liked {
  color: var(--red-1);
  fill: var(--red-1);
  transform: scale(150%);
  transition: 0.1s;
}

.post__title--edit,
.post__content--edit {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  width: 100%;
}
.post__title--edit {
  font-size: 26px;
  font-weight: 600;
  padding: 5px;
}
.post__content--edit {
  font-size: 16px;
  min-height: 8em;
  resize: none;
  padding: 5px;
}
</style>
