import Vue from 'vue'
import Router from 'vue-router'
import Guide from './views/Guide.vue'
import Homepage from './views/Homepage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'guide',
      component: Guide
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
