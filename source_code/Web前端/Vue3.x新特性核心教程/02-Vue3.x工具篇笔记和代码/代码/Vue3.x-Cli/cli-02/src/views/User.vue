<template>
    <h3>User Id: {{id}}</h3>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "User",

        props : ['id'],

        // 初始化
        created() {
            //console.log('我会被重复调用吗？')
            // this.$watch(() => this.$route, (to, from) => {
            //     console.log(to)
            //     console.log(from)
            // })
        },

        // watch : {
        //     $route(to, from) {
        //         console.log(to)
        //         console.log(from)
        //     }
        // }
    }
</script>

<style scoped>

</style>