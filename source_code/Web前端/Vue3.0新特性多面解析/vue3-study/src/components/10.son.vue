<template>
    <div>
        <h2>子组件</h2>  
        <hr>
        <comp-grandson></comp-grandson>  
    </div>
</template>

<script>
import CompGrandson from './11.grandson.vue'
export default {
    components:{
        'comp-grandson':CompGrandson
    }
}
</script>