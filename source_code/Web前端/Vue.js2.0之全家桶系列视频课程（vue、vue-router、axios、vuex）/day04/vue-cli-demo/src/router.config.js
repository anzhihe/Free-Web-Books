import Home from './components/Home.vue'
import News from './components/News.vue'

export default {
	routes:[
		{
			path:'/home',
			component:Home
		},
		{
			path:'/news',
			component:News
		}
	]
}