
<script>

import { h } from 'vue'
import Child from "@/components/Child.vue"

export default {
    name: "Render",
    
    components : {
        Child
    },
    
    setup() {
        
        //return () => h('div', 'Render')
        //return () => h('div', {}, 'Render')
        return () => h('div', {}, [
            h('h3', {}, 'Render'),
            h('p', {}, '欢迎学习Vue3.x~'),
            h(Child, {
                version : '1.0'   // <Child :version=version>
            })
        ])
    }
}
</script>

<style scoped>

</style>