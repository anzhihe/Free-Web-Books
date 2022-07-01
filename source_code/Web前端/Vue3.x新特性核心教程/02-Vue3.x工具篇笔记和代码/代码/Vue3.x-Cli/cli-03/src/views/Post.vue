<template>
    <div class="post">
        <div v-if="loading">
            loading...
        </div>
        <div v-if="post">
            标题：{{post.title}}<br>
            内容：{{post.content}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Post",

        data() {
            return {
                loading: false,
                post : null
            }
        },

        //完成后
        created() {
            // this.loading = true
            //
            // //模拟延迟
            // setTimeout(() => {
            //     this.loading = false
            //     this.post = {
            //         title : '标题...',
            //         content : '内容...'
            //     }
            // }, 1000)
        },

        //守卫导航
        beforeRouteEnter(to, from, next) {
            console.log('开始loading...')

            setTimeout(() => {
                next(vm => {
                    vm.post = {
                        title : '标题...',
                        content : '内容...'
                    }
                    console.log('关闭loading')
                })
            }, 1000)
        }
    }
</script>

<style scoped>

</style>