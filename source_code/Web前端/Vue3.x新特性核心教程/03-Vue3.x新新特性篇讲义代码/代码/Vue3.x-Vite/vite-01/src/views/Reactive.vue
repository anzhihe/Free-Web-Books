<template>
    <div class="reactive">
        <h3>Reactive</h3>
        <button>{{obj.name}}, {{arr}}</button>
    </div>
</template>

<script>
    import { reactive, isReactive, readonly } from 'vue'

    export default {
        name: "Reactive",

        setup() {
            const obj = reactive({
                name : 'Mr.Lee',
                age  : 100
            })

            //console.log(isReactive(obj))
            //const count = reactive(0)
            //console.log(typeof [1, 2, 3])
            const arr = reactive([1, 2, 3])

            const copy = readonly(obj)
            console.log(copy)


            setTimeout(() => {
                obj.name = 'Mr.Wang'
                arr[0] = 4
                //copy.name = 'Mr.Zhang'
            }, 1000)

            return {
                obj,
                arr
            }
        }
    }
</script>

<style scoped>

</style>