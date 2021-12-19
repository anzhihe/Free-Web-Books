<template>
    <div id="book">
        <div>book</div>
        <div>{{$store.state.num}}</div>
        <div>
            <router-link class="bookNav" :to="{name:'Training'}" exact>Training</router-link>
            <router-link class="bookNav" :to="{name:'Military'}">Military</router-link>
            <router-link class="bookNav" :to="{name:'Fiction'}">Fiction</router-link>
        </div>
        <transition name="fade">
            <keep-alive>
                <router-view></router-view>            
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
    name:'book',
    props:{
        text:{
            type:String,
            default:'默认查询参数'
        }
    },
    data(){
        return {

        }
    },
    watch:{

    },
    created(){
        console.log(this.$route);
    },
    computed:{

    },
    methods:{

    }
}
</script>

<style scoped>
.bookNav{
    margin:0px 10px;
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

