<template>
    <div class="hook">
        <h3>hook</h3>
        {{count}}
    </div>
</template>

<script>
    import { ref, onMounted, onBeforeMount, onUpdated } from 'vue'

    export default {
        name: "Hook",

        setup() {

            const count = ref(0)

            // 页面渲染载入后
            onMounted(() => {
                console.log('mounted~')
            })

            onBeforeMount(() => {
                console.log('beforeMount~')
            })

            // 修改后
            onUpdated(() => {
                console.log('updated~')
            })


            console.log('created~')

            setTimeout(() => {
                count.value++
            }, 1000)

            return {
                count
            }
        }
    }
</script>

<style scoped>

</style>