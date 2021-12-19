<template>
    <div id="Fiction">
        <div>Fiction</div>
        <div>
            <router-link 
                v-for="(item,index) in bookData" 
                :key="index" 
                :to="{name:'BookDetail',query:{type:item.type,bookId:item.bookId}}"
            >{{item.name}}</router-link>
        </div>
    </div>
</template>

<script>
// $route//路由信息对象
// $router//路由实例对象
export default {
    name:'Fiction',
    data(){
        return {
            bookData:[
                {bookId:100,type:'rank',name:'小说1'},
                {bookId:300,type:'rank',name:'小说2'},
                {bookId:800,type:'normal',name:'小说3'},
            ]
        }
    },
    watch:{

    },
    created(){

    },
    computed:{

    },
    methods:{

    }
}
</script>

<style scoped>

</style>

