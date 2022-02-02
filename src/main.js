// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import materialDesign from 'material-design-icons/iconfont/material-icons.css';
import i18n from './i18n'
import SvgIcon from '@jamescoyle/vue-icon'
import  mdiAccount  from '@mdi/js'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const router = Router

Vue.config.productionTip = false

sync(store, router)

Vue.use(SvgIcon)
Vue.use(VueLoading)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  materialDesign,
  render: h => h(App),
}).$mount('#app')
