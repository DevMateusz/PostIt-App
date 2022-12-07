<template>
  <nav>
    <div v-for="(sort, index) in setSorts()" class="sort_element">
      <button
        @click="
          setSortValue(sort.name.toLowerCase());
          sort.action();
        "
        :class="sortSelect.toLowerCase() == sort.name.toLowerCase() ? 'selected' : ''"
      >
        {{ sort.name }}
      </button>
      <div v-if="index < setSorts().length - 1" class="separator"></div>
    </div>
  </nav>
  <div class="posts_container">
    <article>
      <h1>Title</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, numquam?
      </p>
    </article>
    <article>
      <h1>Title</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, numquam?
      </p>
    </article>
    <article>
      <h1>Title</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, numquam?
      </p>
    </article>
    <article>
      <h1>Title</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, numquam?
      </p>
    </article>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const Actions = {
  latest() {
    console.log("Latest");
  },
  oldest() {
    console.log("Oldest");
  },
  mostLikes() {
    console.log("Most Likes");
  },
  youLike() {
    console.log("You Like");
  },
  your() {
    console.log("Your");
  },
};

const sorts = [
  { name: "Latest", afterLogin: false, action: Actions.latest },
  { name: "Oldest", afterLogin: false, action: Actions.oldest },
  { name: "Most Likes", afterLogin: false, action: Actions.mostLikes },
  { name: "You Like", afterLogin: true, action: Actions.youLike },
  { name: "Your", afterLogin: true, action: Actions.your },
];
const logged = ref(true);

let sortSelect = ref("Latest");

function setSorts() {
  return this.sorts.filter((sort) => {
    return sort.afterLogin === this.logged || sort.afterLogin === false;
  });
}
function setSortValue(value) {
  this.sortSelect = value;
}

Actions.latest();
</script>

<style scoped>
.posts_container {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
}
.sort_element {
  display: flex;
}
.sort_element div {
  display: none;
}
button {
  cursor: pointer;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  background-color: var(--dark-white);
  padding: 8px 10px;
}
.separator {
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
.selected {
  cursor: default;
  background-color: var(--green-1);
  text-decoration: underline;
  text-decoration-color: var(--white);
  color: var(--white);
  transition: 0.1s;
}
article {
  background-color: white;
}
@media (min-width: 768px) {
  nav {
    margin: 10px 0px;
  }
  button {
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    padding: 8px 10px;
  }
  .selected {
    background-color: transparent;
    cursor: default;
    text-decoration: underline;
    text-decoration-color: var(--green-2);
    color: var(--green-2);
    transition: 0.1s;
  }
  .posts_container {
    grid-template-columns: 1fr 1fr;
  }
  nav {
    justify-content: flex-end;
    gap: 10px;
  }
  .sort_element {
    align-items: center;
    gap: 10px;
  }
  .sort_element div {
    display: inline-block;
  }
}
</style>
