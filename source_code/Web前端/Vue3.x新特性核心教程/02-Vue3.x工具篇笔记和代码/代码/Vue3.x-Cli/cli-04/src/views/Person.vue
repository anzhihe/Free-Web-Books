<template>
    <div class="Person">
        <ul>
            <li>姓名：{{name}}</li>
            <li>性别：{{gender}} || {{getGender}} || {{abc(2)}}</li>
            <li>年龄：{{age}}</li>
        </ul>
        {{test}}
        <input type="text" @input="setAge" :value="age">
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: "Person",

        //数组方式
        //computed : mapState(['name', 'gender', 'age']),

        //对象方式
        computed : {
            test() {
                return 'test'
            },
            getGender() {
                return this.$store.getters.getGender(2)
            },
            ...mapGetters({
                abc : 'getGender'
            }),
            ...mapState({
                //a : (s) => s.name
                name : 'name',
                gender : 'gender',
                age(state) {
                    return state.age
                }
            }),
        },


        //方法
        methods : {
            setAge(e) {
                this.$store.commit('setAge', e.target.value)
            }
        }

        //计算属性
        // computed : {
        //     name() {
        //         return this.$store.state.name
        //     },
        //     gender() {
        //         return this.$store.state.gender
        //     },
        //     age: {
        //         get() {
        //             return this.$store.state.age
        //         },
        //         set(value) {
        //             this.$store.commit('setAge', value)
        //         }
        //     },
        // }
    }
</script>

<style scoped>

</style>