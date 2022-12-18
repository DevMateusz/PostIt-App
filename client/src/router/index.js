import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from '../store';

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: DefaultLayout,
    children: [
      { path: '/home', name: 'HomeView', component: HomeView },
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    meta: { loggedRequire: false },
    children: [
      {
        path: '/login',
        name: 'LoginView',
        component: LoginView
      },
      {
        path: '/register',
        name: 'RegisterView',
        component: RegisterView
      },
    ]
  },
  { 
    path: '/:pathMatch(.*)*',
    redirect: '/home',
    name: 'NotFound',
    component: HomeView,
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(store.state.user.logged && to.meta.loggedRequire == false) {
    next({ name: 'HomeView' })
  } else {
    next()
  }
})

export default router
