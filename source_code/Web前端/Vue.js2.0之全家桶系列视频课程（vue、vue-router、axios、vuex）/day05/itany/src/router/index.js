import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/Goods.vue'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:'/goods',
  		component:Goods
  	}
  ],
  linkActiveClass:'active'
})
