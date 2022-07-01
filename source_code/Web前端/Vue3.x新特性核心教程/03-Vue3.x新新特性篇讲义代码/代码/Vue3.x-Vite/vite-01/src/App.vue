<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/reactive">Reactive</router-link> |
        <router-link to="/ref">Ref</router-link> |
        <router-link to="/toref">ToRef</router-link> |
        <router-link to="/computed">Computed</router-link> |
        <router-link to="/watcheffect">WatchEffect</router-link> |
        <router-link to="/watch">Watch</router-link> |
        <router-link to="/hook">Hook</router-link> |
        <router-link to="/props">Props</router-link> |
        <router-link to="/provide">Provide</router-link> |
        <router-link to="/render">Render</router-link>
    </div>
    <router-view/>
</template>

<script>
    import { ref, provide, readonly } from 'vue'
    export default {
        name : 'App',

        setup() {
            const title = ref('Vue3.x')
            provide('title', title)

            const updateTitle = () => {
                title.value = 'Vue5.x'
            }

            provide('updateTitle', updateTitle)

            setTimeout(() => {
                title.value = 'Vue4.x'
            }, 1000)

            return {
                updateTitle
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
