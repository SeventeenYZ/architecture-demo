import { createRouter, createWebHashHistory } from 'vue-router'
import CMHelloWorld from '@/components/CMHelloWorld/index.vue'
import Order from '@/page/order/index.vue'

const routes = [
  { path: '/', component: CMHelloWorld },
  { path: '/order', component: Order },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
