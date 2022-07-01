<template>
    <div class="computed">
        <h3>Computed</h3>
        <button>{{count}}</button>
        <button>{{myCount}}</button>
        <button>{{yourCount}}</button>
    </div>
</template>

<script>
    import { ref, computed } from 'vue'

    export default {
        name: "Computed",

        setup() {
            const count = ref(1)
            //const myCount = computed(() => 'myCount:' + count.value)
            const myCount = computed(() => {
                return 'myCount:' + count.value
            })

            const yourCount = computed({
                get : () => 'yourCount:' + count.value,
                set : (val) => {
                    count.value = val
                }
            })

            yourCount.value = 2

            return {
                count,
                myCount,
                yourCount
            }
        }

    }
</script>

<style scoped>

</style>