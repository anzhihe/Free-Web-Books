<template>
    <div class="watcheffect">
        <h3>WatchEffect</h3>
<!--        <input type="text" v-model="keyword">-->
        {{count}}
    </div>
</template>

<script>
    import { ref, watchEffect, onBeforeUpdate } from 'vue'

    export default {
        name: "WatchEffect",

        setup() {


            const count = ref(0)

            watchEffect((onInvalidate) => {
                console.log(count.value)

                onInvalidate(() => {
                    console.log('清理副作用~')
                })
            }, {
                flush : 'post',
                onTrack(e) {
                    //console.log('将在响应式 property 或 ref 作为依赖项被追踪时被调用')
                    //console.log(e)
                },
                onTrigger(e) {
                    debugger
                    console.log('将在依赖项变更导致副作用被触发时被调用')
                }
            })

            onBeforeUpdate(() => {
                console.log('update')
            })

            setTimeout(() => {
                count.value++
            }, 1000)

            setTimeout(() => {
                count.value++
            }, 2000)


            return {
                count
            }


            // const keyword = ref('')
            // const getKeyWord = (val) => {
            //     return setTimeout(() => {
            //         console.log('异步检索的值：', val)
            //     }, 1000)
            // }
            //
            //
            // watchEffect((onInvalidate) => {
            //     const timer = getKeyWord(keyword.value)
            //     console.log('键入的值：', keyword.value)
            //
            //     onInvalidate(() => {
            //         clearTimeout(timer)
            //     })
            // })
            //
            // return {
            //     keyword
            // }


            // const count = ref(0)
            // const name = ref('Mr.Lee')
            //
            // const stop = watchEffect((onInvalidate) => {
            //     console.log(count.value)
            //
            //     onInvalidate(() => {
            //         console.log('清理副作用~')
            //     })
            // })
            //
            // setTimeout(() => {
            //     count.value = 1
            // }, 1000)
            //
            // setTimeout(() => {
            //     count.value = 2
            // }, 2000)



            // stop()
            // count.value = 3
            // name.value = 'Mr.Wang'
            // name.value = 'Mr.Zhang'

        }
    }
</script>

<style scoped>

</style>