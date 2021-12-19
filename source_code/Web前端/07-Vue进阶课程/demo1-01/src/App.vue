<template>
  <div id="app">
    <div>
      <router-link class="nav" :to="{name:'index'}" tag="span" exact>首页</router-link>
      <router-link class="nav" :to="{name:'book'}" tag="span">书籍</router-link>
      <router-link class="nav" :to="{name:'mine',params:{id:200}}" tag="span">个人</router-link>
    </div>

    <router-view name="nav" v-if="!$route.meta.keepAlive"></router-view>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="footer" v-if="!$route.meta.keepAlive"></router-view>    

    <keep-alive>
      <router-view name="nav" v-if="$route.meta.keepAlive"></router-view>  
    </keep-alive>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>      
    </keep-alive>
    <keep-alive>
      <router-view name="footer" v-if="$route.meta.keepAlive"></router-view>        
    </keep-alive>
            
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav{
  margin:0px 10px;
}
.activeExact{
  background: blue;
  color:#fff;
}
.active{
  background: orange;
  color:#fff;
}
</style>
