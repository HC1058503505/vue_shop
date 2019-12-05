import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/users/Users.vue'
import Roles from '../components/roles/Roles.vue'
import Rights from '../components/roles/Rights.vue'

import Goods from '../components/goods/Goods.vue'
import Params from '../components/goods/Params.vue'
import Categories from '../components/goods/Categories.vue'

import Orders from '../components/orders/Orders.vue'

import Reports from '../components/reports/Reports.vue'
Vue.use(VueRouter)

const routes = [
  {
    name: 'root',
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/roles', component: Roles },
      { path: '/rights', component: Rights },
      { path: '/goods', component: Goods },
      { path: '/params', component: Params },
      { path: '/categories', component: Categories },
      { path: '/orders', component: Orders },
      { path: '/reports', component: Reports }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  let token = window.sessionStorage.getItem('token')
  if (token) return next()
  return next('/login')
})
export default router
