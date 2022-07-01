<template>
    <div class="post">
        <button @click="getList">axios+</button>
    </div>
</template>

<script>
    import {get} from "@/http/api"

    export default {
        name: "Post",

        methods : {
            getList() {
                //可跨域
                // axios.get('https://cdn.liyanhui.com/data.json').then(res => {
                //     console.log(res.data)
                // })

                // //不可跨域
                // axios.get('/api/data.json').then(res => {
                //     console.log(res.data)
                // })

                get('/api/data.json').then(data => {
                    console.log(data)
                })
            }
        }

    }
</script>

<style scoped>

</style>