import Vue from 'vue'
import Router from 'vue-router'
import Guide from './views/Guide.vue'
import Homepage from './views/Homepage.vue'
import SignUpForRestaurant from './views/SignUpForRestaurant.vue'
import MapTest from './views/MapTest.vue'
import PersonalInfo from './views/PersonalInfo.vue'
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
    },
    {
      path: '/signUpForRestaurant',
      name: 'signUpForRestaurant',
      component: SignUpForRestaurant
    },
    {
      path: '/maptest',
      name: 'maptest',
      component: MapTest
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: PersonalInfo
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
