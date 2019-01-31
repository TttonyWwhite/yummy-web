import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'guide',
      component: resolve => require(['./views/Guide.vue'], resolve)
    },
      {
        path: '/homepage/:id',
        name: 'homepage',
        meta: {
          requireAuth: true
        },
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
        meta: {
          requireAuth: true
        },
        component: resolve => require(['./views/PersonalInfo.vue'], resolve),
        children: [

        ]
      },
      {
        path: '/restaurant/:id',
        name: 'restaurant',
        meta: {
          requireAuth: true
        },
        component: resolve => require(['./views/RestaurantInfo.vue'], resolve),
        children: [
            {
              path: '/releaseFood/:id',
              component: resolve => require(['./views/ReleaseFood.vue'], resolve)
            }
        ]
      },
      {
        path: '/shop',
        name: 'shop',
        component: resolve => require(['./views/Shop.vue'], resolve)
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { //判断是否需要登陆权限
    if (localStorage.getItem('ID')) { //判断是否登陆
      next()
    } else { //如果没有登陆
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router

