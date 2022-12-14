import { createStore } from 'vuex';
import axiosClient from '../axios';
import router  from '../router';

const tempData = [
    {
      id: "33231s234dsdsafd",
      creatorId: "12873212831asdas",
      creatorName: "Mateusaz",
      creatorColorPattern: 8,
      title: "Co robi globii, kiedy nikt nie patrzy",
      content:
        "Każdy wie że globi cos robi. Tylko że nikt nie wie co on dokładnie robi. A my dobrze wiemy ale wam tak szybko nie powiemy. Najpierw omówmy ulubione rzeczy globiego tzn. granie w piłe, siłka i robienie masy. Legendy głoszą że zawsze robi losowanie co robić. Ale z niewiadomych przyczyn od 20 lat wypada mu robienie masy. Tak że odpowiedzią na co robi globi jest poprostu MASA.",
      date: "12-07-2022 20:48:32",
      likes: 3,
      isFriend: false,
      isLiked: false,
      isOwner: false,
    },
    {
      id: "33231sdsd234safd",
      creatorId: "12873212831asdas",
      creatorName: "Mateusz669",
      creatorColorPattern: 8,
      title: "Co robi globii, kiedy nikt nie patrzy",
      content:
        "Każdy wie że globi cos robi. Tylko że nikt nie wie co on dokładnie robi. A my dobrze wiemy ale wam tak szybko nie powiemy. Najpierw omówmy ulubione rzeczy globiego tzn. granie w piłe, siłka i robienie masy. Legendy głoszą że zawsze robi losowanie co robić. Ale z niewiadomych przyczyn od 20 lat wypada mu robienie masy. Tak że odpowiedzią na co robi globi jest poprostu MASA.",
      date: "12-07-2022 13:48:32",
      likes: 243,
      isFriend: false,
      isLiked: false,
      isOwner: false,
    },
    {
      id: "33231sdsdsdsafd",
      creatorId: "12873212831asdas222",
      creatorName: "Mateusz669",
      creatorColorPattern: 8,
      title: "Co robi globii, kiedy nikt nie patrzy",
      content:
        "Każdy wie że globi cos robi. Tylko że nikt nie wie co on dokładnie robi. A my dobrze wiemy ale wam tak szybko nie powiemy. Najpierw omówmy ulubione rzeczy globiego tzn. granie w piłe, siłka i robienie masy. Legendy głoszą że zawsze robi losowanie co robić. Ale z niewiadomych przyczyn od 20 lat wypada mu robienie masy. Tak że odpowiedzią na co robi globi jest poprostu MASA.",
      date: "12-07-2022 13:48:32",
      likes: 22,
      isFriend: false,
      isLiked: false,
      isOwner: false,
    },
    {
      id: "33231sdsdsaqafsdsfd",
      creatorId: "12873212831asdas",
      creatorName: "Mateusz669",
      creatorColorPattern: 2,
      title: "Co robi globii, kiedy nikt nie patrzy",
      content:
        "Każdy wie że globi cos robi. Tylko że nikt nie wie co on dokładnie robi. A my dobrze wiemy ale wam tak szybko nie powiemy. Najpierw omówmy ulubione rzeczy globiego tzn. granie w piłe, siłka i robienie masy. Legendy głoszą że zawsze robi losowanie co robić. Ale z niewiadomych przyczyn od 20 lat wypada mu robienie masy. Tak że odpowiedzią na co robi globi jest poprostu MASA.",
      date: "12-07-2022 13:48:32",
      likes: 47,
      isFriend: false,
      isLiked: false,
      isOwner: true,
    },
    {
      id: "33231sds343dsacx3afd",
      creatorId: "12873212831asdas2222",
      creatorName: "Mateusz669",
      creatorColorPattern: 8,
      title: "Co robi globii, kiedy nikt nie patrzy",
      content:
        "Każdy wie że globi cos robi. Tylko że nikt nie wie co on dokładnie robi. A my dobrze wiemy ale wam tak szybko nie powiemy. Najpierw omówmy ulubione rzeczy globiego tzn. granie w piłe, siłka i robienie masy. Legendy głoszą że zawsze robi losowanie co robić. Ale z niewiadomych przyczyn od 20 lat wypada mu robienie masy. Tak że odpowiedzią na co robi globi jest poprostu MASA.",
      date: "12-07-2022 13:48:32",
      likes: 42,
      isFriend: false,
      isLiked: false,
      isOwner: false,
    },
  ];


const store = createStore({
  state: {
    user: {
      data: {},
      token: {},
      logged: true,
      
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

  },
  getters: {},
  actions: {
    getPosts({ commit }, sort, search) {
      commit("setPostsLoading", true);

      commit("setPosts", tempData);
      commit("setPostsLoading", false);

      // commit("setPostsLoading", true);
      // return axiosClient.get(`/api/posts/${sort}/${search}`).then((res) => {
      //     commit("setPosts", res.data);
      //     commit("setPostsLoading", false);
      //     return res;
      // }).catch((err) => {
      //   commit("setPostsLoading", false);
      //   throw err;
      // })
    },
    savePost({ commit }, {id, title, content}) {
      if(id){
        console.log('update');
        // return axiosClient.put(`/api/post/${id}`,{title, content}).then((res) => {
        //       commit("setNewCreatedPost", res.data);
        //       return res;
        //   }).catch((err) => {
        //     throw err;
        //   })
      } else {
        console.log('create');
        // return axiosClient.post(`/api/post/`,{title, content}).then((res) => {
        //     commit("setNewCreatedPost", res.data);
        //     return res;
        //   }).catch((err) => {
        //     throw err;
        //   })
      }

    },
    deletePost({ commit }, id) {
      console.log({id});
      commit("removePost", {id});
      // return axiosClient.delete(`/api/post/${id}`).then((res) => {
      //     commit("removePost", res.data); //res.data zwracać ma id postu który został usunięty
      //   }).catch((err) => {
      //     throw err;
      //   })
    },
    likePost({ commit }, id) {

      commit("setLikes", {id: id, likes: 40, isLiked: true});//backend ma zwracać taki przykładowy objekt jak to 

      // return axiosClient.put(`/api/post/${id}/like`).then((res) => {
      //   commit("setLikes", res.data); //res.data zwracać ma id, ilość lików i chyba is liked true
      //   return res;
      // }).catch((err) => {
      //   throw err;
      // })
    },
    dislikePost({ commit }, id) {

      commit("setLikes", {id: id, likes: 39, isLiked: false});//backend ma zwracać taki przykładowy objekt jak to 

      // return axiosClient.put(`/api/post/${id}/dislike`).then((res) => {
      //   commit("setLikes", res.data); //res.data zwracać ma id, ilość lików i chyba is liked false
      //   return res;
      // }).catch((err) => {
      //   throw err;
      // })
    },
    addToFriends({ commit }, creatorId) {

      commit("setFriends", {creatorId: creatorId, isFriend: true});

      // return axiosClient.put(`/api/user/friend/${creatorId}/add`).then((res) => {
      //   commit("setLikes", res.data); //res.data zwracać ma id, ilość lików i chyba is liked false
      //   return res;
      // }).catch((err) => {
      //   throw err;
      // })
    },
    removeFromFrinds({ commit }, creatorId) {

      commit("setFriends", {creatorId: creatorId, isFriend: false});

      // return axiosClient.put(`/api/user/friend/${creatorId}/remove`).then((res) => {
      //   commit("setLikes", res.data); //res.data zwracać ma id, ilość lików i chyba is liked false
      //   return res;
      // }).catch((err) => {
      //   throw err;
      // })
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
      state.posts.data = state.posts.data.filter(post => post.id != data.id);
    },
    setLikes: (state, data) => {
      state.posts.data.forEach(post => {
        if (post.id === data.id) {
          post.likes = data.likes;
          post.isLiked = data.isLiked;
        }
      });
    },
    setFriends: (state, data) => {
      state.posts.data.forEach(post => {
        if (post.creatorId === data.creatorId) {
          post.isFriend = data.isFriend;
        }
      });
    },
    setNewCreatedPost: (state, data) => {
      state.posts.data.unshift(
        data
      )
    }
  },
  modules: {},
})

export default store;