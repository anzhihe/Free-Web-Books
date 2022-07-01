<template>
    <div class="about">
        <h1>This is an about page</h1>
        <button @click="addCount">私有计数：{{count}}</button>
        <button @click="increment">共享计数：{{storeCount}}</button>
    </div>
</template>

<script>
    import store from '@/store'

    export default {
        name: "About",

        data() {
            return {
                count : 0,
                storeCount : store.state.count
            }
        },

        methods : {
            addCount() {
                this.count++
            },

            increment() {
                store.increment()
                this.storeCount = store.state.count
            }
        }
    }
</script>
