// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import promise from 'es6-promise'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import utis from './common/utis/utis.js'
import 'babel-polyfill'
import http from './common/axiosbreak/axiosbreak.js'
import * as api from './config'
// import 'lib-flexible/flexible'
// import webVideoCtrl from './common/codebase/webVideoCtrl.js'
// import VueAMap from 'vue-amap'
// import { lazyAMapApiLoaderInstance } from 'vue-amap';

Vue.use(VueAxios,axios)
Vue.use(ElementUI)
Vue.use(BaiduMap,{ak:'YOUR_APP_KEY'})
Vue.use(utis)
// Vue.use(http)
Vue.component(CollapseTransition.name, CollapseTransition)


// Vue.use(webVideoCtrl)

// Vue.prototype.HOST = '/api'
Vue.prototype.$echarts = echarts
Vue.prototype.$api = api
Vue.config.productionTip = false

window.eventBus = new Vue();

router.beforeEach((to,from,next) => {
  if(to.matched.some(res => res.meta.requireAuth)){
    if(localStorage.getItem('token')) {
      next();
    } else {
      next({
        path: '/login'
      });
    }
  } else {
    next();
  }
})

promise.polyfill();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
