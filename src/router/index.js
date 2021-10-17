import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{
      title: '首页'
    },
    component: Home
  },
  {
      path: '/login',
      name: 'login',
      meta:{
        title: '登录'
      },
      component: () => import('views/Login.vue')
  },
  {
      path:"/register",
      name: "register",
      meta:{
        title: '注册'
      },
      component: () => import('views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
