import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routerConfig from './router.config.js'
import axios from 'axios'

//使用VueRouter
Vue.use(VueRouter);


//创建路由实例
const router=new VueRouter(routerConfig);

Vue.prototype.$http=axios;

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
