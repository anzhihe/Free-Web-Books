<template>
    <div class="about">
        <h1>This is an about page</h1>
        <button @click="addCount">全局计数：{{$store.state.count}}</button>
        <button @click="setInfo">信息：{{$store.state.info}}</button>
    </div>
</template>

<script>
    import { mapMutations, mapActions } from 'vuex'

    export default {
        name : 'About',

        methods : {
            // addCount(e) {
            //     // 修改状态
            //     this.$store.commit('increment', e)
            //     //this.$store.state.count++
            // }
            ...mapMutations({
                addCount : 'increment'
            }),
            ...mapActions(['setInfo'])

            // setInfo() {
            //     this.$store.dispatch('setInfo')
            // }
        }
    }
</script>
