<template>
    <div id="Training">
        <div>{{$store.state.num}}</div>
        <div class="trainingItem" v-for="(item,index) in trainingData" :key="index">
            <div>{{item.name}}</div>
            <div v-timeformat:orange.small="item.date"></div>
            <div :id="item.id | formatId | formatFn1(item.count)">{{item.count | formatCount}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Training',
    data(){
        return {
            trainingData:[
                {id:1,name:'教育书籍1',date:158978974894,count:60},
                {id:2,name:'教育书籍2',date:158978974894,count:100},
                {id:2,name:'教育书籍3',date:158978974894,count:200},
                {id:3,name:'教育书籍4',date:158978974894,count:90},
                {id:4,name:'教育书籍5',date:158978974894,count:300},
                {id:5,name:'教育书籍6',date:158978974894,count:100},
                {id:6,name:'教育书籍7',date:158978974894,count:100},
                {id:7,name:'教育书籍8',date:158978974894,count:100},
                {id:8,name:'教育书籍9',date:158978974894,count:100},
                {id:9,name:'教育书籍10',date:158978974894,count:100},
                {id:10,name:'教育书籍11',date:158978974894,count:100},
                {id:11,name:'教育书籍12',date:158978974894,count:100},
                {id:12,name:'教育书籍13',date:158978974894,count:100},
            ]
        }
    },
    filters:{
        formatCount(count){
            return count > 100 ? count + '较多阅读量' : count + '较少阅读量';
        },
        formatId(id){
            return id + 'cba';
        },
        formatFn1(newId,count){
            return newId + count;
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
.trainingItem{
    margin:45px 0px;
}
</style>

