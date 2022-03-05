<template>
	<div id="itany">
		<h1>welcome</h1>
		<h2 @click="change">{{name}}</h2>

		<User></User>
	</div>
</template>

<script>

	//导入模块
	import User from './components/User.vue'

	// console.log(111);
	export default {
		data(){
			return {
				name:'tom'
			}
		},
		methods:{
			change(){
				this.name='汤姆';
			}
		},
		components:{
			User
		}
	}
</script>

<style>
	body{
		background-color:#ccc;
	}
</style>