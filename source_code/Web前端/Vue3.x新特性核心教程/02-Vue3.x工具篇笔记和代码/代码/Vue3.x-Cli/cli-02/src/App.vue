<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <br><br>

        <router-link to="/user/5">User/5</router-link> |
        <router-link to="/user/6">User/6</router-link>
        <br><br>

        <router-link to="/user/5/profile">5号用户的档案</router-link> |
        <router-link to="/user/5/posts">5号用户的岗位</router-link>
        <br><br>

        <button @click="golist">GoList</button>
        <button @click="goUser(5)">GoUser(5)</button>
        <button @click="goUser(6)">GoUser(6)</button>
        <button @click="go(-1)">GoPrev</button>
        <button @click="go(1)">GoNext</button>

        <br><br>
        <router-link :to="{name : 'User', params : {id : 5}}">User/5</router-link>

    </div>

    <!--动态-->
    <router-view/>

    <!--固定-->
    <router-view name="Footer"></router-view>
</template>

<script>
    export default {
        methods : {
            golist() {
                //this.$router.push('/list')
                this.$router.push({
                    //name : 'List'
                    path : '/list'
                })
            },

            goUser(id) {
                this.$router.push({
                    name : 'User',
                    params : {id}
                })
            },

            go(step) {
                this.$router.go(step)
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
</style>
