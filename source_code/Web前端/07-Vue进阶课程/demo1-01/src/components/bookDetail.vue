<template>
    <div id="bookDetail">
        <div>bookDetail</div>
        <div>
            <div>小说类型：{{$route.query.type}}</div>
            <div>小说ID：{{$route.query.bookId}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'bookDetail',
    data(){
        return {
            
        }
    },
    watch:{

    },
    created(){
        console.log(this.$route);
        console.log(this.$router);
    },
    computed:{

    },
    methods:{

    }
}
</script>

<style scoped>

</style>

