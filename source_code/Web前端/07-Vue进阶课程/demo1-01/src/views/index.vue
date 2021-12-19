<template>
    <div id="index">
        <div>index</div>
        <button @click="navFn">go</button>
        <div>{{$store.state.num}}</div>
        <button @click="addFn">加</button>
        <div>{{num}}</div>
        <div>{{abc}}</div>
        <div>{{numGetters}}</div>
        <div>{{filterArr}}</div>
    </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";
export default {
    name:'index',
    data(){
        return {
            
        }
    },
    watch:{

    },
    created(){
        console.log(this.$store.state.num);
        console.log(this.numGetters);
        console.log(this.getIdFn(200));
    },
    computed:{
        filterArr(){
            return this.filterArr;
        },
        abc(){
            return 'abc';
        },
        ...mapState([
            'num'
        ]),
        ...mapGetters([
            'getIdFn',
            'filterArr',
            'numGetters'
        ])
    },
    // computed:mapState([
    //     'num'
    // ]),
    // computed:mapState({
    //     num:(state) => state.num
    // }),
    // computed:{
    //     numCount(){
    //         return this.$store.state.num + '星星课堂';
    //     }
    // },
    methods:{
        navFn(){
            this.$router.push({name:'book',query:{text:'星星课堂'}});
            // this.$router.replace({name:'book',query:{id:100,type:'rank'}});
            // this.$router.go(-2);
        },
        addFn(){
            this.$store.commit('add');
        }
    }
}
</script>

<style scoped>

</style>

