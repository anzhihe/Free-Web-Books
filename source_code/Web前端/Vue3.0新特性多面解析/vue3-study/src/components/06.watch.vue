<template>
    <div>
        <button @click="unwatch">停止监视</button>
        <hr>

        <input type="text" v-model="keywords">
    </div>
</template>

<script>
import { ref,watch,reactive } from 'vue'
export default {
    setup(){
        /**
         * 监视单个数据源
         */
        // 1.监视ref数据源 
        /* const count = ref(1) 

        watch(count, (newValue,oldValue) => {
            console.log(oldValue,newValue);
        });

        setTimeout(() => {
            count.value = 6;
        },3000); */

        // 2.监视reactive数据源
        /* const state = reactive({ count: 1 });

        // 监视state中的count，以函数方式定义
        watch(() => state.count, (newValue,oldValue) => {
            console.log(oldValue,newValue);
        });

        setTimeout(() => {
            state.count = 6;
        },3000); */

        /**
         * 监视多个数据源
         */
        /* const name = ref('tom'); 
        const age = ref('18');

        watch([name,age], ([newName,newAge],[oldName,oldAge]) => {
            console.log(oldName,newName);
            console.log(oldAge,newAge);
        });

        setTimeout(() => {
            name.value = 'alice';
            age.value = 25;
        },3000); */

        /**
         * 取消监视
         */
        /* const count = ref(1);

        // 返回一个用于取消监视的函数
        const unwatch = watch(count, (newValue,oldValue) => {
            console.log(oldValue,newValue);
        });

        setTimeout(() => {
            count.value = 6;
        },3000);

        return {
            unwatch
        } */

        /**
         * 清除无效的异步任务
         */
        const keywords = ref('');

        // 定义一个函数，用来异步执行打印任务，返回对应的计时器
        const print = value => {
            return setTimeout(() => {
                console.log(value);
            },1000); 
        }

        watch(keywords, (newValue,oldValue,clean) => { // 参数clean是一个用来清理无效异步任务的函数
            var timer = print(newValue);

            /**
             * 当出现以下情况时，会自动触发执行clean()函数，来清理无效的异步任务，即上次还未执行的异步任务
             *    1.当前监视器即将重新执行时
             *    2.监视器被停止时
             */
            clean(() => {
                clearTimeout(timer); // 停止上次还未执行完成的异步任务
            }); 
        });

        return {
            keywords
        }
    }
}
</script>