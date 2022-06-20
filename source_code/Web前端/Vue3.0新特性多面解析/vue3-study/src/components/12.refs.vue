<template>
    <div>
        <h3 ref="h3Ref">嘿嘿</h3>
        <hr>
        <comp-ref ref="compRef"></comp-ref>
    </div>
</template>

<script>
import CompRef from './13.compRef.vue'
import { ref,onMounted } from 'vue'
export default {
    setup(){
        /**
         * 引用元素
         */
        // 创建一个值为null的ref，实际上就是一个引用
        const h3Ref = ref(null);

        /**
         * 引用组件
         */
        const compRef = ref(null); 

        // 只有在页面渲染完成后才能获取到对应的引用
        onMounted(() => {
            // console.log(h3Ref.value); // DOM元素
            // h3Ref.value.style.color = 'red';

            console.log(compRef.value); // 子组件
            console.log(compRef.value.msg);
            compRef.value.change(); // 面试题 ：父组件如何调用子组件的方法？
        })

        return {
            h3Ref,
            compRef
        }
    },
    components:{
        'comp-ref':CompRef
    }
}
</script>