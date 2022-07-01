<template>
    <div class="provide">
        <h3 ref="root">Provide</h3>
        <Child ref="child"></Child>
        <button @click="clickRoot">clickRoot+</button>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue'
    import Child from "@/components/Child.vue"

    export default {
        name: "Provide",

        components : {
            Child
        },

        setup() {
            const root = ref(null)
            const child = ref(null)
            
            //加载完毕后
            onMounted(() => {
                console.log(root.value)
                console.log(child.value)
            })
            
            const clickRoot = () => {
                root.value.innerHTML = '<p>Vue3.x</p>'
            }
            
            return {
                root,
                clickRoot,
                child
            }
        }
    }
</script>

<style scoped>

</style>