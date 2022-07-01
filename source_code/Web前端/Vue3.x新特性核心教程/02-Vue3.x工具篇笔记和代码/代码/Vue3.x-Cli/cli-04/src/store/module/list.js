export default {
    //命名空间
    namespaced : true,

    // 状态值
    state: {
        name : 'Mr.Wang',
    },

    // 状态派生
    getters : {
        getName(state) {
            return '【' + state.name + '】'
        }
    },

    // 修改状态
    mutations: {
        setName(state, value) {
            state.name = value
        }
    },

    // 获取内容
    actions: {
        setName(context) {
            //模拟延迟
            setTimeout(() => {
                context.commit('setName', '异步Mr.Wang')
            }, 1000)
        }
    },
}