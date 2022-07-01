<template>
    <div class="list">
        <button>{{$store.state.list.name}}</button>
        <button @click="setName">异步获取+</button>
        <button>{{getName}}</button>
    </div>
</template>

<script>
    export default {
        name: "List",

        computed : {
            getName() {
                return this.$store.getters['list/getName']
            }
        },

        methods : {
            setName() {
                this.$store.dispatch('list/setName')
            }
        }
    }
</script>

<style scoped>

</style>