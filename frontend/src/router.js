import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import RHome from '@/views/RHome.vue'
import About from '@/views/About.vue'
import Callback from '@/views/Callback.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    
    {
      path: '/',
      name: 'Rhome',
      component: RHome
    },
    {
      path: '/admin',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    
  ]
})

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if(to.name == 'callback') { // check if "to"-route is "callback" and allow access
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0's login.
    router.app.$auth.login()
  }
})

export default router