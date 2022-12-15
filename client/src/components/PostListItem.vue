<template>
  <article>
    <header>
      <div class="user_information">
        <User :colorPattern="post.creatorColorPattern" />
        <h2>{{ post.creatorName }}</h2>
      </div>
      <div class="actions_buttons">
        <button @click="deletePost()" v-if="post.isOwner" class="svg_button">
          <Delete />
        </button>
        <button @click="edit = true" v-if="post.isOwner && !edit" class="svg_button">
          <Edit />
        </button>
        <button @click="savePost()" v-if="post.isOwner && edit" class="svg_button">
          <Save />
        </button>
        <button
          @click="addToFriends()"
          v-if="!post.isFriend && !post.isOwner"
          class="svg_button"
        >
          <AddUser />
        </button>
        <button
          @click="removeFromFriends()"
          v-if="post.isFriend && !post.isOwner"
          class="svg_button"
        >
          <RemoveUser class="removeBtn" />
        </button>
        <button @click="likeAction()" class="svg_button">
          <Like :likes="post.likes" :class="post.isLiked ? 'liked' : 'like'" />
        </button>
      </div>
    </header>
    <h1 v-if="!edit">{{ post.title }}</h1>
    <input class="title_edit" v-else type="text" v-model="post.title" />
    <div class="content">
      <p v-if="!edit">
        {{ post.content }}
      </p>
      <textarea :rows="2" class="content_edit" v-else v-model="post.content"></textarea>
      <h5>{{ calcDate(post.date) }}</h5>
    </div>
  </article>
</template>

<script setup>
import { ref } from "vue";
import User from "../components/icons/User.vue";
import Edit from "../components/icons/Edit.vue";
import Delete from "../components/icons/Delete.vue";
import Save from "../components/icons/Save.vue";
import AddUser from "../components/icons/AddUser.vue";
import RemoveUser from "../components/icons/RemoveUser.vue";
import Like from "../components/icons/Like.vue";
import store from "../store";

let edit = ref(false);

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
  } else if (secondSincePost > 0) {
    return `${Math.floor(secondSincePost)} Seconds ago`;
  } else {
    return `Just now`;
  }
}

function likeAction() {
  if (props.post.isLiked) {
    store.dispatch("dislikePost", props.post.id);
  } else {
    store.dispatch("likePost", props.post.id);
  }
}

function addToFriends() {
  store.dispatch("addToFriends", props.post.creatorId);
}

function removeFromFriends() {
  store.dispatch("removeFromFrinds", props.post.creatorId);
}

function savePost() {
  if (props.post.title && props.post.content) {
    store.dispatch("savePost", {
      id: props.post.id,
      title: props.post.title,
      content: props.post.content,
    });
    console.log({ title: props.post.title, content: props.post.content });
    edit.value = false;
  } else {
    console.log("wrong data"); // alert o złych danych
  }
}

function deletePost() {
  if (confirm("Are you sure? You wanna delete this post?")) {
    store.dispatch("deletePost", props.post.id).then(() => {
      console.log("post was deleted"); // alert play here
    });
  }
}
</script>

<style scoped>
article {
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 5px;
}
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  border-bottom: 1px var(--gray) solid;
}
header h2 {
  font-weight: 600;
}
h1 {
  font-weight: 600;
  font-size: 26px;
  padding: 5px 5px 0px 5px;
}
.content {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.content h5 {
  font-weight: 300;
}

.user_information {
  display: flex;
  align-items: center;
}
button {
  cursor: pointer;
  text-decoration: none;
  border: none;
  background-color: transparent;
}
button svg {
  width: 32px;
  height: 32px;
  color: var(--light-gray);
  transition: 0.1s;
}
.removeBtn {
  color: var(--red-1);
}
.like:hover {
  transform: scale(110%);
  transition: 0.1s;
}
.liked {
  color: var(--red-1);
  fill: var(--red-1);
  transform: scale(150%);
  transition: 0.1s;
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
  width: 100%;
  min-height: 8em;
  resize: none;
  padding: 5px;
}
</style>