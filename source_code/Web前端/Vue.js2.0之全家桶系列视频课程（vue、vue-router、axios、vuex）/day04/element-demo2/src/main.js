import Vue from 'vue'
// import {Button,Input,Radio,Select,Option} from 'element-ui'
import App from './App.vue'

import './element-component.js'
/*Vue.use(Button);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Option);*/

new Vue({
  el: '#app',
  render: h => h(App)
})
