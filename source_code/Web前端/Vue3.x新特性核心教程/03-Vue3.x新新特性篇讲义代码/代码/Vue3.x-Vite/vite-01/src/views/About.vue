<template>
    <div class="About">
        <h3>About</h3>
        <button @click="increment">count:{{count}}，version:{{version}}</button>
    </div>
</template>

<script>
    import { ref,computed } from 'vue'

    export default {
        name: "About",

        //入口
        setup() {
            const { count, increment, version } = test()      //逻辑1
            return {
                count,
                increment,
                version
            }
        }
    }

    // 这里方法是逻辑点1，也可以分离到单独文件，提高复用性；
    const test = () => {
        // 响应式变量，类似data设置
        const count = ref(0)
        // 方法设置，类似methods设置
        const increment = () => {
            count.value++
        }
        // 计算属性，类似computed设置
        const version = computed(() => 'v1.0')

        return {
            count,
            increment,
            version
        }
    }


</script>

<style scoped>

</style>