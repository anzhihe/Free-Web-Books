<template>
    <div id="mine">
        <div>mine</div>
        <div>{{$route.params.id}}</div>
        <div>{{id}}</div>
        <div>
            <span class="componentNav" v-for="(item,index) in tabArr" :key="index" @click="tabIndex = item">{{item}}</span>
            <transition name="fade">
                <keep-alive :include="['userWork','userHobbies']" :exclude="['userIncome']">
                    <component :is="tabIndex"></component>                
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import userWork from "../components/userWork";
import userHobbies from "../components/userHobbies";
import userIncome from "../components/userIncome";
export default {
    name:'mine',
    data(){
        return {
            tabIndex:'userWork',
            tabArr:['userWork','userHobbies','userIncome'],
            id:''
        }
    },
    components:{
        userWork:userWork,
        userHobbies:userHobbies,
        userIncome:userIncome
    },
    // beforeRouteEnter(to, from,next){
    //     console.log('beforeRouteEnter');
    //     next((vm) => {
    //         console.log(vm);
    //     });
    // },
    // beforeRouteUpdate(to,from,next){
    //     console.log('beforeRouteUpdate');        
    //     this.id = to.params.id;
    //     next();
    // },
    // beforeRouteLeave(to, from, next){
    //     console.log('beforeRouteLeave');
    //     next();       
    //     // let tip = window.confirm('表单还没有提交，确定离开当前组件么？');
    //     // if(tip){
    //     //     next();
    //     // }else{
    //     //     next(false);
    //     // }
    // },
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
.componentNav{
    margin:0px 10px;
    cursor: pointer;
}
.fade-enter{
    opacity: 0;
}
.fade-enter-active{
    transition:all 0.6s ease 0.6s;
}
.fade-enter-to{
    opacity: 1;
}
.fade-leave{
    opacity: 1;
}
.fade-leave-active{
    transition: all 0.6s ease 0s;
}
.fade-leave-to{
    opacity: 0;
}
</style>

