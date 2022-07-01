<template>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Sidebar></Sidebar>
    <Footer></Footer>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

export default {
    name: 'App',
    components: {
        //HelloWorld
        Sidebar,
        Footer
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
