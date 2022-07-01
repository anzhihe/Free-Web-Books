import { createStore } from 'vuex'
import list from "@/store/module/list"

export default createStore({
    // 状态值
    state: {
        count : 0,
        name : 'Mr.Lee',
        gender : '男',
        age : 100,
        info : ''
    },

    // 状态派生
    getters : {
        // getGender(state, id) {
        //     return function (id) {
        //         return '【' + state.gender + '】' + id
        //     }
        // }
        getGender : (state) => (id) => {
            return '【' + state.gender + '】' + id
        }
    },

    // 修改状态
    mutations: {
        increment(state, e) {
            state.count++
            console.log(e)
        },
        setAge(state, value) {
            state.age = value
        },
        setInfo(state, value) {
            state.info = value
        }
    },

    // 获取内容
    actions: {
        setInfo(context) {
            //模拟延迟
            setTimeout(() => {
                context.commit('setInfo', '异步信息')
            }, 1000)
        }
    },

    // 模块
    modules: {
        list
    }
})
