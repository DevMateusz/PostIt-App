import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import DefaultLayout from '../components/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: DefaultLayout,
    children: [
      { path: '/home', name: 'HomeView', component: HomeView },
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
