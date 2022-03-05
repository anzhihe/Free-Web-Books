import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css' //该样式文件需要单独引入
import App from './App.vue'

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
})
