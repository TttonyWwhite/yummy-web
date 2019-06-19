import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
      {
          path: '/',
          name: 'login',
          component: resolve => require(['./views/Login.vue'], resolve)
      },

      {
        path: '/loginForRestaurant',
        name: 'loginForRestaurant',
        component: resolve => require(['./views/LoginForRestaurant.vue'], resolve)
      },

      {
        path: '/signUpForMember',
        name: 'signUpForMember',
        component: resolve => require(['./views/SignUpForMember.vue'], resolve)
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
      //需要加上id
      {
        path: '/member/:id',
        name: 'member',
        meta: {
          requireAuth: true,
        },
        component: resolve => require(['./views/PersonalInfo.vue'], resolve),
        children: [
            {
              path: 'personalCenter',
              name: 'personalCenter',
              component: resolve => require(['./views/PersonalCenter.vue'], resolve),

            },
            {
              path: 'settings',
              component: resolve => require(['./views/MemberSettings.vue'], resolve)
            },
            {
              path: 'order/:orderId',
              name: 'order',
              component: resolve => require(['./views/OrderDetail.vue'], resolve)
            },
            {
                path:'order',
                component: resolve => require(['./views/Order.vue'], resolve)
            },
            {
                path:'address',
                component: resolve => require(['./views/MemberAddress.vue'], resolve)
            }
        ]
      },

      {
        path: '/managerPage',
        name: 'manager',
        meta: {
          requireAuth: true
        },
        component: resolve => require(['./views/ManagerPage.vue'], resolve),
        children: [
            {
              path: 'restaurantSummary',
              name: 'restaurantSummary',
              component: resolve => require(['./views/RestaurantSummary.vue'], resolve)
            },
            {
              path: 'memberSummary',
              name: 'memberSummary',
              component: resolve => require(['./views/MemberSummary.vue'], resolve)
            },
            {
              path: 'checkRequest',
              name: 'checkRequest',
              component: resolve => require(['./views/CheckRequest.vue'], resolve)
            },
            {
              path: 'financialSummary',
              name: 'financialSummary',
              component: resolve => require(['./views/FinancialSummary.vue'], resolve)
            },
            {
              path: 'request/:requestId',
              name: 'request',
              component: resolve => require(['./views/RequestDetail.vue'], resolve)
            }

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
                path: 'restaurantCenter',
                name: 'restaurantCenter',
                component: resolve => require(['./views/RestaurantCenter.vue'], resolve)
            },

            {
              path: 'releaseFood',
              name: 'releaseFood',
              component: resolve => require(['./views/ReleaseFood.vue'], resolve)
            },
            {
              path: 'releaseBargin',
              name: 'releaseBargin',
              component: resolve => require(['./views/ReleaseBargin.vue'], resolve)
            },
            {
              path: 'statistic',
              name: 'statistic',
              component: resolve => require(['./views/RestaurantStatistic.vue'], resolve)
            },
            {
              path: 'restaurantUpdate',
              name: 'restaurantUpdate',
              component: resolve => require(['./views/RestaurantUpdate.vue'], resolve)
            }
        ]
      },
      {
        path: '/shop/:id',
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

