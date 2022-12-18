import { createStore } from 'vuex';
import axiosClient from '../axios';
import router  from '../router';

const store = createStore({
  state: {
    user: {
      data: JSON.parse(sessionStorage.getItem('USER')),
      token: sessionStorage.getItem('TOKEN'),
      logged: JSON.parse(sessionStorage.getItem('LOGGED')) || false,
      
    },
    colorsPattern: {
      0: "#475569",
      1: "#525252",
      2: "#dc2626",
      3: "#ea580c",
      4: "#eab308",
      5: "#65a30d",
      6: "#16a34a",
      7: "#059669",
      8: "#0284c7",
      9: "#7c3aed",
      10: "#c026d3",
      11: "#db2777",
    },
    posts: {
      loading: false,
      data: []
    },
    notifications: {
      data: [],
      index: 0
    },

  },
  getters: {},
  actions: {
    getPosts({ commit, state }, {sort, search}) {
      commit("setPostsLoading", true);
      if(state.user.logged){
        return axiosClient.get(`/api/posts/logged/${sort}/${search}`).then((res) => {
            commit("setPosts", res.data);
            commit("setPostsLoading", false);
            return res;
        }).catch((err) => {
          commit("setPostsLoading", false);
          throw err;
        })
      }else{
      return axiosClient.get(`/api/posts/guest/${sort}/${search}`).then((res) => {
          commit("setPosts", res.data);
          commit("setPostsLoading", false);
          return res;
      }).catch((err) => {
        commit("setPostsLoading", false);
        throw err;
      })
      }
      
    },
    savePost({ commit }, {id, title, content}) {
      if(id){
        return axiosClient.put(`/api/post/${id}`,{title, content}).then((res) => {
              commit("updatePost", res.data);
              return res;
          }).catch((err) => {
            throw err;
          })
      } else {
        return axiosClient.post(`/api/post/`,{title, content}).then((res) => {
            commit("setNewCreatedPost", res.data);
            return res;
          }).catch((err) => {
            throw err;
          })
      }

    },
    deletePost({ commit }, id) {
      return axiosClient.delete(`/api/post/${id}`).then((res) => {
          commit("removePost", res.data);
        }).catch((err) => {
          throw err;
        })
    },
    likePost({ commit }, id) {
      return axiosClient.put(`/api/post/${id}/like`).then((res) => {
        commit("setLikes", res.data);
        return res;
      }).catch((err) => {
        throw err;
      })
    },
    dislikePost({ commit }, id) {
      return axiosClient.put(`/api/post/${id}/dislike`).then((res) => {
        commit("setLikes", res.data);
        return res;
      }).catch((err) => {
        throw err;
      })
    },
    addToFriends({ commit }, creatorId) {
      return axiosClient.put(`/api/user/friend/${creatorId}/add`).then((res) => {
        commit("setFriends", res.data);
        return res;
      }).catch((err) => {
        throw err;
      })
    },
    removeFromFrinds({ commit }, creatorId) {
      return axiosClient.put(`/api/user/friend/${creatorId}/remove`).then((res) => {
        commit("setFriends", res.data);
        return res;
      }).catch((err) => {
        throw err;
      })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user).then(({data}) => {
        commit('setUser', data);
        return data;
      }).catch((err) => {
        throw err;
      })
    },
    register({commit}, user) {
      return axiosClient.post('/register', user).then(({data}) => {
        commit('setUser', data);
        return data;
      }).catch((err) => {
        throw err;
      })
    },
  },
  mutations: {
    setPostsLoading: (state, loading) => {
      state.posts.loading = loading;
    },
    setPosts: (state, data) => {
      state.posts.data = data;
    },
    removePost: (state, data) => {
      state.posts.data = state.posts.data.filter(post => post._id != data.id);
    },
    setLikes: (state, data) => {
      state.posts.data.forEach(post => {
        if (post._id == data.id) {
          post.likes = data.likes;
          post.isLiked = data.isLiked;
        }
      });
    },
    setFriends: (state, data) => {
      state.posts.data.forEach(post => {
        if (post.creator._id == data.creatorId) {
          post.isFriend = data.isFriend;
        }
      });
    },
    setNewCreatedPost: (state, data) => {
      state.posts.data.unshift(
        {...data, isLiked: false, isOwner: true, isFriend: false}
      )
    },
    updatePost: (state, data) => {
      state.posts.data.forEach(post => {
        if(post._id == data._id){
          post.title = data.title;
          post.content = data.content;
        }
      })
    },
    setUser: (state, user) => {
      const userData = { _id: user._id, name: user.name, email: user.email }
      state.user.token = user.token;
      state.user.data = userData;
      state.user.logged = true;
      sessionStorage.setItem('TOKEN', user.token);
      sessionStorage.setItem('USER', JSON.stringify(userData));
      sessionStorage.setItem('LOGGED', true);
    },
    logout: (state) => {
      state.user.data = null;
      state.user.token = null;
      state.user.logged = false;
      sessionStorage.removeItem('TOKEN');
      sessionStorage.removeItem('USER');
      sessionStorage.removeItem('LOGGED');
      router.push({
        name: "HomeView",
      });
    },
    notify: (state, {message, type}) => {
      const notificationId = state.notifications.index
      state.notifications.index += 1
      state.notifications.data.unshift({message, type, show: true, id: notificationId})
      setTimeout(() => {
        state.notifications.data = state.notifications.data.filter(notification => notification.id != notificationId)
      }, 3000);
    }
  },
  modules: {},
})

export default store;