<template>
    <div>
        <p>count:{{ count }}</p>
        <p>plusOne:{{ plusOne }}</p>

        <button @click="count++">修改count</button>
        <button @click="plusOne=6">修改plusOne</button>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
    setup(){
       const count = ref(1);

       /**
        * 只读的计算属性
        */
       // 根据count的值，创建一个响应式的计算属性plusOne 
        // const plusOne = computed(() => count.value+1) 

       /**
        * 可读可写的计算属性
        */
       const plusOne = computed({
           // 取值函数
           get: ()=>{
               console.log('get....');
               return count.value + 1;
           },
           // 赋值函数
           set: val=>{
               console.log('set....');
               count.value = val * 2;
           }
       }); 

       return {
           count,
           plusOne
       }
   }
}
</script>