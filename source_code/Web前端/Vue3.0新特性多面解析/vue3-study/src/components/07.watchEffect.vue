<template>
    <div>
        
    </div>
</template>

<script>
import { watchEffect,ref } from 'vue';
export default {
    setup(){
        const count = ref(1);

        /**
         * 1.先立即执行传入的函数
         * 2.当函数内依赖的数据发生变化时会再次执行函数
         */
        watchEffect(() => {
            console.log(count.value);
        });

        setTimeout(() => {
            count.value = 6;
        },3000);
    }
}
</script>