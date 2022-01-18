import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Add Respondent',
          path: 'pages/addrespondent',
          component: () => import('@/views/dashboard/pages/AddRespondent'),
        },
        {
          name: 'Edit Respondent',
          path: 'pages/editrespondent',
          component: () => import('@/views/dashboard/pages/EditRespondent'),
        },
        {
          name: 'Respondents',
          path: 'pages/respondents',
          component: () => import('@/views/dashboard/pages/Respondents'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Index')
    },
  ],
})


router.beforeEach((to, from, next) => {

  if ( store.state.isUserLoggedIn == true && to.name == 'login') {
    next({name: 'Dashboard'})
  } else {
     if( to.name !== 'login' && store.state.isUserLoggedIn == false) {
      next({name: 'login'})
     } else {
      next()
     }
      next()
  }
});



export default router