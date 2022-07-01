import { createRouter, createWebHistory } from 'vue-router'
//import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Footer from "../views/Footer"

const routes = [
    {
        path: '/',
        name: 'Home',
        //component: Home
        components: {
            default : Home,
            Footer
        }
    },
    {
        //path: '/user/:id([0-9]+)',
        //path: '/user/:id(\\d+)',
        path: '/user/:id(\\d+)+',
        name: 'User',

        //props : true,
        // props : {
        //     data : '用户'
        // },
        props : {
            default : true,
            Footer : {
                data : '用户'
            }
        },

        components: {
            default: () => import('../views/User.vue'),
            Footer
        },
        children : [
            {
                path : 'profile',
                component: () => import('../views/user/Profile.vue'),
            },
            {
                path : 'posts',
                component: () => import('../views/user/Posts.vue'),
            }
        ]
    },
    {
        path: '/list',
        name: 'List',
        //component: () => import('../views/List.vue')
        components: {
            default: () => import('../views/List.vue'),
            Footer
        }
    },
    {
        path: '/about/:params*',
        name: 'About',

        props : {
            default : (route) => ({
                search : route.query.search
            })
        },
        components: {
            default: () => import('../views/About.vue'),
            Footer
        },

        alias : '/guanyu'
    },
    // {
    //     path : '/guanyu',
    //     redirect : '/about'
    // },
    {
        path : '/a',
        //redirect : '/list'
        // redirect : {
        //     name : 'List'
        // }

        redirect : (to) => {
            if (true) {
                //return '/list'
                console.log(to)
                return {
                    name : 'List'
                }
            }
        }
    },
    {
        path: '/:all*',
        name: 'Error',
        component: () => import('../views/Error.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    //history: createWebHashHistory(),
    routes
})

export default router
