<template>
    <div>
        <p>{{ count }}</p>
        <p>{{ age }}</p>

        <button @click="change">修改age</button>
    </div>
</template>

<script>
import { ref, isRef, reactive, isReactive, readonly, isReadonly, isProxy,unref, toRef, toRefs } from 'vue'
export default {
    setup(){
        /**
         * isRef
         */
        const count = ref(1); 
        // console.log(isRef(count));

        /**
         * isReactive
         */
        const state = reactive({
            name:'tom',
            age:18
        }); 
        // console.log(isReactive(state));

        /**
         * isReadonly
         */
        const obj = readonly(state); 
        // console.log(isReadonly(obj));

        /**
         * isProxy
         */
        // console.log(isProxy(count)); 

        /**
         * unref
         */
        // console.log(isRef(count)?count.value:count); 
        // console.log(unref(count));
        // console.log(unref('welcome'));

        /**
         * toRef
         */
        /*  const ageRef = toRef(state,'age');
        // ageRef.value++; // ageRef具有响应式，且与state.age相关联
        state.age++;

        console.log(ageRef.value);
        console.log(state.age); */

        /**
         * toRefs
         */
        /* const stateRef = toRefs(state); 
        // stateRef.age.value++;
        state.age++;
        console.log(stateRef.age.value);
        console.log(state.age); */

        const change = () => {
            state.age++;
        }

        return {
            count,
            // ...state, // 直接使用展开运算符时将会失去响应式  
            ...toRefs(state), // 具有响应式
            change
        }
    }
}
</script>