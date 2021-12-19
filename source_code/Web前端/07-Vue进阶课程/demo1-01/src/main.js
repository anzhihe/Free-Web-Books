import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.filter('formatId',function(id){
  return id + 'abc';
});

Vue.directive('timeformat',{
  bind:function(el,binding){
    function initTime(num){
      return num < 10 ? '0' + num : num; 
    }

    function checkTime(timeStamp){
      let time = new Date(timeStamp);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDay();
      let hours = time.getHours();
      let minute = time.getMinutes();
      let second = time.getSeconds();

      if(binding.modifiers.small){
        return year + '-' + initTime(month) + '-' + initTime(day);
      }else if(binding.modifiers.big){
        return year + '-' + initTime(month) + '-' + initTime(day) + initTime(hours) + ':' + initTime(minute) + ':' + initTime(second);
      }else{
        return year + '-' + initTime(month) + '-' + initTime(day) + initTime(hours) + ':' + initTime(minute) + ':' + initTime(second);        
      }
    }

    el.innerHTML = checkTime(binding.value);

    binding.arg == '' ? el.style.color = '#333' : el.style.color = binding.arg;

  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
