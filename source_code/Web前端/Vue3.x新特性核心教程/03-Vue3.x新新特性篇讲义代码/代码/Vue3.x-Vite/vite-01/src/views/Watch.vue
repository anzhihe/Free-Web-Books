<template>
    <div class="watch">
        <h3>watch</h3>
        {{count}}
    </div>
</template>

<script>
    import { ref, watch } from 'vue'

    export default {
        name: "Watch",

        setup() {
            const count = ref(0)
            const name = ref('Mr.Lee')


            // watch(() => {
            //     return count.value
            // }, (count, prevCount) => {
            //     console.log('count:', count, 'prevCount:', prevCount)
            // })

            watch([count, name], ([count, prevCount], [name, prevName]) => {
                console.log('count:', count, 'prevCount:', prevCount)
                console.log('name:', name, 'prevName:', prevName)
            })


            setTimeout(() => {
                count.value++
                name.value = 'Mr.Wang'
            }, 1000)

            setTimeout(() => {
                count.value++
                name.value = 'Mr.Zhang'
            }, 2000)

            return {
                count
            }
        }
    }
</script>

<style scoped>

</style>