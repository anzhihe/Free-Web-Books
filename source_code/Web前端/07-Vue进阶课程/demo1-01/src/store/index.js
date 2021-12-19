import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:100,
    arr:[
      {id:100,title:'小说书籍',num:188},
      {id:200,title:'计算机书籍',num:288},
      {id:300,title:'军事书籍',num:388},
    ]
  },
  getters:{
    getIdFn(state){
      return function(id){
        return state.arr.find((item) => {
          return item.id === id;
        });
      }
    },
    filterArr(state){
      return state.arr.filter((item) => {
        return item.num > 200;
      })
    },
    numGetters(state,getters){
      return state.num + 'xingxingclassroom' + getters.filterArr.length;
    }
  },
  mutations: {
    add(state){
      state.num ++;
    }
  },
  actions: {
  },
  modules: {
  }
})
