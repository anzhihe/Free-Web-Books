<template>
	<el-date-picker
      v-model="value"
      type="date"
      placeholder="选择日期"
	  size="small"
      :picker-options="options">
    </el-date-picker>	
</template>

<script>
	export default {
		data(){
			return {
				value:'',
				options:{
					disabledDate(time) {
		            	return time.getTime() < Date.now() - 8.64e7;
		            },
		            firstDayOfWeek:1
				}
			}
		}
	}
</script>