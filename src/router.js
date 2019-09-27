import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/trader',
      name: 'trader',
      // route level code-splitting
      // this generates a separate chunk (trader.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "trader" */ './views/Trader.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/trader') {
    store.state.isLoading = true
    store.state.refCount = 0
    /* if (!store.state.accessToken) {
      next('/login');
    } */
  }
  next()
})

export default router
