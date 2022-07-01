<template>
    <div class="footer">版权所有 翻版必究 {{data}}</div>
</template>

<script>
    export default {
        name: "Footer",

        props : {
            data : {
                type : String,
                default : 'no data'
            }
        }
    }
</script>

<style scoped>

</style>