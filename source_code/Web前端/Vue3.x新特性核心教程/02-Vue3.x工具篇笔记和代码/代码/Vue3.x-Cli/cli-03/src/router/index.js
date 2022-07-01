import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const Login = () => import(/* webpackChunkName: "group" */ '@/views/Login.vue')
const Post = () => import(/* webpackChunkName: "group" */ '@/views/Post.vue')
const About = () => import(/* webpackChunkName: "group" */ '@/views/About.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,

        //路由独享守卫
        beforeEnter : (to, from, next) => {
            //console.log(to)
            //console.log(from)
            next()
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/post',
        name: 'Post',
        component: Post
    },
    {
        path: '/about',
        name: 'About',
        meta : {
            title : '关于',
            transition : 'abc'
        },
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//判断是否登录成功
const flag = true

//全局前置守卫，有拦截的作用
router.beforeEach((to, from, next) => {
    //console.log('开始loading...')
    if (to.meta.title !== undefined) {
        console.log(to.meta.title)
    }
    if (flag) {
        if (to.name === 'Login') next('/')
        next()
    } else {
        if (to.name === 'Login') next()
        else next('/login')
    }
})

//全局后置钩子
router.afterEach((to, from) => {
    //console.log('关闭loading...')
})


export default router
