// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import urls from './common/js/urls.js'

axios.interceptors.request.use(function (config) {
    if(config.method === 'post') {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
})

Vue.config.productionTip = false

// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
