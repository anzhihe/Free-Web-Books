<template>
    <div class="toref">
        <h3>ToRef</h3>
    </div>
</template>

<script>
    import { ref, reactive, toRef, toRefs} from 'vue'

    const userF = () => {
        const state = reactive({
            foo : 1,
            bar : 2
        })

        return toRefs(state)
    }


    export default {
        name: "ToRef",

        setup() {

            const { foo, bar } = userF()


            console.log(foo.value)
            console.log(bar.value)

            const obj = reactive({
                name : 'Mr.Lee',
                age  : 100
            })

            //console.log(toRefs(obj))

            const info = {
                //name : obj.name
                //name : ref(obj.name)
                name : toRef(obj, 'name')
            }

            // setTimeout(() => {
            //     console.log(info.name.value)
            // }, 1000)


            obj.name = 'Mr.Wang'


            //console.log(obj.name)
            //const nameRef = ref(obj.name)
            //const nameToRef = toRef(obj, 'name')

            //console.log(nameRef.value)
            //console.log(nameToRef.value)

            //nameRef.value = 'Mr.Wang'
            //nameToRef.value = 'Mr.Wang'
            //console.log(obj.name)
        }
    }
</script>

<style scoped>

</style>