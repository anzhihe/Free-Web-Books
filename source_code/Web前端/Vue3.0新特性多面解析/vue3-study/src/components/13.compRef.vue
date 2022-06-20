<template>
    <div>
        <p>{{ msg }}</p>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(){
        const msg = ref('welcome')

        const change = () => {
            msg.value = '欢迎';
        }

        return {
            msg,
            change
        }
    }
}
</script>