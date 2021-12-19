import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/views/index.vue";
import Book from "@/views/book.vue";
import Mine from "@/views/mine.vue";

import Training from "@/components/Training.vue";
import Military from "@/components/Military.vue";
import Fiction from "@/components/Fiction.vue";

import Nav from "@/components/nav.vue";
import Footer from "@/components/footer.vue";

import BookDetail from "@/components/bookDetail.vue";

Vue.use(VueRouter);

var routes = [
    {
        path:'/',
        name:'index',
        components:{
            default:Index,
            nav:Nav,
            footer:Footer
        },
        meta:{
            keepAlive:true
        }
    },
    {
        path:'/book',
        name:'book',
        component:Book,
        meta:{
            title:'书籍',
            keepAlive:false
        },   
        // props:(route) => ({
        //     text:route.query.text + 100
        // }),
        children:[
            {
                path:'',
                name:'Training',
                component:Training
            },
            {
                path:'/book/military',
                name:'Military',
                component:Military
            },
            {
                path:'/book/fiction',
                name:'Fiction',
                component:Fiction
            }                        
        ],
    },
    {
        path:'/bookDetail',
        name:'BookDetail',
        component:BookDetail
    },        
    {
        path:'/mine/:id',
        name:'mine',
        component:Mine,
        meta:{
            keepAlive:false
        }
        // beforeEnter:(to, from, next) => {
        //     console.log(to);
        //     console.log(from);
        //     console.log('beforeEnter');            
        //     next();
        // },          
    }             
];

var router = new VueRouter({
    mode:'history',
    routes:routes,
    base:'/xingxingclassroom',
    linkActiveClass:'active',
    scrollBehavior(savedPosition){
        if(savedPosition){
            return savedPosition;
        }
        return {
            x:0,
            y:0
        }
    }
    // linkExactActiveClass:'activeExact'
});

// router.beforeEach((to,from,next) => {
//     console.log(from);
//     if(to.meta.title){
//         window.document.title = to.meta.title;
//     }
//     next();
//     // console.log(to);
//     // console.log(from);
//     // console.log('beforeEach');
//     // if(to.name == 'book'){
//     //     next({name:'mine'});
//     // }else{
//     //     next();
//     // }
// });

// router.afterEach((to,from) => {
//     console.log(to);
//     console.log(from);
//     console.log('afterEach');    
// });

export default router;
