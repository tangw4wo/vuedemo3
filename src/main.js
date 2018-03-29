// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from "./pages/Layout"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router/index"
import axios from "axios"
import Mock from "./mock/mock"
Vue.use(ElementUI)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

require('./assets/css/normalize.css')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
