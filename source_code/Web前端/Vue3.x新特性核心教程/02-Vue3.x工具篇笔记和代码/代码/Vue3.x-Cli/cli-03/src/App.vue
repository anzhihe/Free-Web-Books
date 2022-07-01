<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/post">Post</router-link> |
    </div>
    <router-view/>

<!--    <transition name="fade">-->
<!--        <router-view/>-->
<!--    </transition>-->
<!--    <router-view v-slot="{ Component, route }">-->
<!--        <transition :name="route.meta.transition || 'fade'">-->
<!--            <component :is="Component" />-->
<!--        </transition>-->
<!--    </router-view>-->


</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-leave-to {
    display: none;
}

.abc-enter-active,
.abc-leave-active {
    transition: opacity 0.2s ease;
}

.abc-enter-from,
.abc-leave-to {
    opacity: 0;
}
.abc-leave-to {
    display: none;
}

</style>
