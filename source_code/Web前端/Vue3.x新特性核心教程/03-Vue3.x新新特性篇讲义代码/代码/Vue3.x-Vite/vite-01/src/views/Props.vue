<template>
    <div class="props">
        <h3>Props</h3>
        <Child :title="title" size="big" @click="clickTest" @info="infoTest"></Child>
    </div>
</template>

<script>
    import Child from "@/components/Child.vue"
    import { ref } from 'vue'

    export default {
        name: "Props",

        components : {
            Child
        },

        setup() {
            const title = ref('Vue3.x')
            const clickTest = () => {
                console.log('clickTest')
            }

            setTimeout(() => {
                title.value = 'Vue4.x'
            }, 1000)

            const infoTest = (message) => {
                console.log(message)
            }

            return {
                title,
                clickTest,
                infoTest
            }
        }
    }
</script>

<style scoped>

</style>