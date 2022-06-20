<template>
    <div>
        <!-- 在模板中访问时，无需通过.value属性，会自动展开 -->
        <p>{{ count }}</p>
        <button @click="count++">修改count</button>
        <hr>

        <button @click="change">修改count</button>
        <p @click="modify">{{ name }}</p>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    setup() {
        /**
         * 基本用法
         */
        // 创建响应式数据对象count，初始值为1
        const count = ref(1);
        // 必须通过.value属性才能访问到内部值
        console.log(count.value);

        /**
         * 在reactive对象中访问时，无需通过.value属性访问，会自动展开
         */
        const data = reactive({
            count
        }); 
        console.log(data.count);
        data.count = 6;
        console.log(count.value);

        /**
         * 定义方法
         */
        const change = () => {
            count.value++;
        } 

        return {
            count,
            change // 必须要返回才能被外部访问
        }
    },
    // 向下兼容 Vue 2.x
    data(){
        return {
            name:'tom'
        }
    },
    methods:{
        modify(){
            this.name = '汤姆';
        }
    }
}
</script>