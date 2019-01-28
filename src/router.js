import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'guide',
      component: resolve => require(['./views/Guide.vue'], resolve)
    },
      {
        path: '/homepage',
        name: 'homepage',
        component: resolve => require(['./views/Homepage.vue'], resolve)
      },
      {
        path: '/signUpForRestaurant',
        name: 'signUpForRestaurant',
        component: resolve => require(['./views/SignUpForRestaurant.vue'], resolve)
      },
      {
        path: '/member',
        name: 'personalInfo',
        component: resolve => require(['./views/PersonalInfo.vue'], resolve),
        children: [

        ]
      },
      {
        path: '/restaurant/:id',
        name: 'restaurant',
        component: resolve => require(['./views/RestaurantInfo.vue'], resolve),
        children: [
            {
              path: '/releaseFood/:id',
              component: resolve => require(['./views/ReleaseFood.vue'], resolve)
            }
        ]
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
