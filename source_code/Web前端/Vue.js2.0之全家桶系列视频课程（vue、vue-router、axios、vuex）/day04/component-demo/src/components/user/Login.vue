<template>
	<div id="login">
		{{msg}}
	</div>
</template>

<script>
	export default {
		data(){
			return {
				msg:'用户登陆'
			}
		}
	}
</script>

<style scoped>
	#login{
		color:red;
		font-size:20px;
		text-shadow:2px 2px 5px #000;
	}
</style>