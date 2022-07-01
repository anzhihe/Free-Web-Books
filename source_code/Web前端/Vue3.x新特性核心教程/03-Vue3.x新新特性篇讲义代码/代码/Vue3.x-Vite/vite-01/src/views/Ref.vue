<template>
    <div class="ref">
        <h3>Ref</h3>
        <button @click="increment">{{count}}</button>
    </div>
</template>

<script>
    import { ref, isRef, unref, toRef, toRefs, reactive } from 'vue'

    export default {
        name: "Ref",

        setup() {
            const count = ref(0)
            const increment = () => {
                count.value++
            }

            //console.log(count.value)

            const obj = ref({
                name : 'Mr.Lee',
                age  : 100
            })

            //console.log(obj.value.name)
            //console.log(isRef(obj))
            console.log(unref(count))

            return {
                count,
                increment
            }
        }
    }
</script>

<style scoped>

</style>