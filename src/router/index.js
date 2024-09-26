import Vue from 'vue'
import VueRouter from 'vue-router'
import todoapp from '@/components/todoapp.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: todoapp
  }
]

const router = new VueRouter({
  routes
})

export default router
