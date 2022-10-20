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
          component: () => import('@/views/dashboard/pages/User/UserProfile'),
        },
        {
          name: 'Change Password',
          path: 'pages/change-password',
          component: () => import('@/views/dashboard/pages/User/ChangePassword'),
        },
        {
          name: 'Add Respondent',
          path: 'pages/addrespondent',
          component: () => import('@/views/dashboard/pages/Respondent/AddRespondent'),
        },
        {
          name: 'Edit Respondent',
          path: 'pages/editrespondent',
          component: () => import('@/views/dashboard/pages/Respondent/EditRespondent'),
        },
        {
          name: 'Respondents',
          path: 'pages/respondents',
          component: () => import('@/views/dashboard/pages/Respondent/Respondents'),
        },
        {
          name: 'Messages',
          path: 'pages/messages',
          component: () => import('@/views/dashboard/pages/Message/Messages'),
        },
        {
          name: 'Custom Messages',
          path: 'pages/customMessages',
          component: () => import('@/views/dashboard/pages/CustomMessage/CustomMessages')
        },
        {
          name: 'Add Custom Message',
          path: 'pages/addCustomMessage',
          component: () => import('@/views/dashboard/pages/CustomMessage/AddCustomMessage')
        },
        {
          name: 'Edit Custom Message',
          path: 'pages/editcustomMesage',
          component: () => import('@/views/dashboard/pages/CustomMessage/EditCustomMessage')
        },
        {
          name: 'Cases',
          path: 'pages/cases',
          component: () => import('@/views/dashboard/pages/Case/Cases'),
        },
        {
          name: 'Conditions',
          path: 'pages/conditions',
          component: () => import('@/views/dashboard/pages/Condition/Conditions')
        },
        {
          name: 'Facilities',
          path: 'pages/facility',
          component: () => import('@/views/dashboard/pages/Facility/Facilities')
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
     if( to.name !== 'login' &&  store.state.isUserLoggedIn == false) {
      next({name: 'login'})
     } else {
      next()
     }
      next()
  }
});

export default router