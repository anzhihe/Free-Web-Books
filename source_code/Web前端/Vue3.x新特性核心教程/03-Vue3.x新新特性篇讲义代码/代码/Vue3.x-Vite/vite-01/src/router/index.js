import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/reactive',
        name: 'Reactive',
        component: () => import('@/views/Reactive.vue')
    },
    {
        path: '/ref',
        name: 'Ref',
        component: () => import('@/views/Ref.vue')
    },
    {
        path: '/computed',
        name: 'Computed',
        component: () => import('@/views/Computed.vue')
    },
    {
        path: '/toref',
        name: 'ToRef',
        component: () => import('@/views/ToRef.vue')
    },
    {
        path: '/watch',
        name: 'Watch',
        component: () => import('@/views/Watch.vue')
    },
    {
        path: '/hook',
        name: 'Hook',
        component: () => import('@/views/Hook.vue')
    },
    {
        path: '/props',
        name: 'Props',
        component: () => import('@/views/Props.vue')
    },
    {
        path: '/provide',
        name: 'Provide',
        component: () => import('@/views/Provide.vue')
    },
    {
        path: '/watcheffect',
        name: 'WatchEffect',
        component: () => import('@/views/WatchEffect.vue')
    },
    {
        path: '/render',
        name: 'Render',
        component: () => import('@/views/Render.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
