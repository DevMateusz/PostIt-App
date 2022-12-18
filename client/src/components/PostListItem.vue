<template>
  <article>
    <header>
      <div class="user_information">
        <User :colorPattern="post.creator.colorPattern" />
        <h2>{{ post.creator.name }}</h2>
      </div>
      <div class="actions_buttons">
        <button @click="logged ? deleteInforamtion() : loginRequireAlert()" @dblclick="logged ? deletePost() : loginRequireAlert()" v-if="post.isOwner && logged" class="svg_button">
          <Delete />
        </button>
        <button @click="logged ? edit = true : loginRequireAlert()" v-if="post.isOwner && !edit && logged" class="svg_button">
          <Edit />
        </button>
        <button @click="logged ? savePost(): loginRequireAlert()" v-if="post.isOwner && edit && logged" class="svg_button">
          <Save />
        </button>
        <button
          @click="logged ? addToFriends() : loginRequireAlert()"
          v-if="!post.isFriend && !post.isOwner && logged"
          class="svg_button"
        >
          <AddUser />
        </button>
        <button
          @click="logged ? removeFromFriends() : loginRequireAlert()"
          v-if="post.isFriend && !post.isOwner && logged"
          class="svg_button"
        >
          <RemoveUser class="removeBtn" />
        </button>
        <button @click="logged ? likeAction(): loginRequireAlert()" class="svg_button">
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
      <h5>{{ calcDate(post.createdAt) }}</h5>
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
    props.post.likes -= 1
    store.dispatch("dislikePost", props.post._id);
  } else {
    props.post.isLiked = true;
    props.post.likes += 1
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
  })
  
}

function removeFromFriends() {
  store.dispatch("removeFromFrinds", props.post.creator._id).then(() => {
    store.commit("notify", {
      type: "success",
      message: `${props.post.creator.name} has been removed from friends`,
    });
  })
  
}

function savePost() {
  if (props.post.title && props.post.content) {
    store.dispatch("savePost", {
      id: props.post._id,
      title: props.post.title,
      content: props.post.content,
    }).then(() => {
      store.commit("notify", {
        type: "success",
        message: "Post has been updated",
      });
  })
    edit.value = false;
  } else {
    store.commit("notify", {
      type: "error",
      message: "Post must include title and content",
    });
  }
}
function deleteInforamtion() {
  if(!antiSpamer.value){
    store.commit("notify", {
    type: "information",
    message: "Double-click to delete a post",
  });
  antiSpamer.value = true;
  setTimeout(() => {
    antiSpamer.value = false
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
h2,h1,.content{
  word-break: break-word;
}
article {
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 5px;
  min-height: 240px;
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
  gap: 10px;
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
