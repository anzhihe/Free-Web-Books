<template>
    <div class="child">
        <h3>Child title : {{title}}</h3>
        <p>版本：{{version}}</p>
        <button @click.stop="infoChild">info+</button>
        <button @click="updateTitle">updateTitle+</button>
    </div>
</template>

<script>
    import { inject } from 'vue'
    export default {
        name: "Child",
        // 定义emits
        emits : ['info'],
        
        props : {
            version : String
        },

        setup(props, {attrs, slots, emit}) {

            const title = inject('title')
            const updateTitle = inject('updateTitle')

            setTimeout(() => {
                title.value = 'Vue6.x'
            }, 2000)

            const infoChild = () => {
                // 子组件向父组件传递信息
                emit('info', 'hi, message~')
            }

            return {
                title,
                infoChild,
                updateTitle
            }


            //console.log(props)
            //console.log(attrs)
            //console.log(attrs.title)


            //console.log(props.title)
            //props.title = 'Mr.Lee'
            // return {
            //     attrs
            // }
        }
    }
</script>

<style scoped>

</style>