<template>
  <div id="app">
    <!-- <comp-setup msg="welcome"></comp-setup> --> 
    <!-- <comp-reactive></comp-reactive> -->
    <!-- <comp-ref></comp-ref> --> 
    <!-- <comp-computed></comp-computed>-->
    <!-- <comp-readonly></comp-readonly> -->
    <!-- <comp-watch></comp-watch> --> 
    <!-- <comp-effect></comp-effect> -->
    <!-- <comp-tools></comp-tools> --> 
    <!-- <comp-lifecycle></comp-lifecycle> -->
    <!-- 
    <h1>父组件</h1>
    <button @click="colorRef='red'">红</button>
    <button @click="colorRef='yellow'">黄</button>
    <button @click="colorRef='blue'">蓝</button>
    <hr>
    <comp-son></comp-son>
    -->
    <comp-refs></comp-refs>
  </div>
</template>

<script>
import CompSetup from './components/01.setup'
import CompReactive from './components/02.reactive'
import CompRef from './components/03.ref.vue'
import CompComputed from './components/04.computed.vue'
import CompReadonly from './components/05.readonly'
import CompWatch from './components/06.watch'
import CompEffect from './components/07.watchEffect'
import CompTools from './components/08.tools.vue'
import CompLifecycle from './components/09.Lifecycle'
import CompSon from './components/10.son'
import CompRefs from './components/12.refs'
import { provide,ref } from 'vue'

export default {
  name: 'App',
  components: {
    'comp-setup':CompSetup,
    'comp-reactive':CompReactive,
    'comp-ref':CompRef,
    'comp-computed':CompComputed,
    'comp-readonly':CompReadonly,
    'comp-watch':CompWatch,
    'comp-effect':CompEffect,
    'comp-tools':CompTools,
    'comp-lifecycle':CompLifecycle,
    'comp-son':CompSon,
    'comp-refs':CompRefs
  },
  setup(){
    /**
     * 向后代传递普通数据
     */
    provide('color','pink');

    /**
     * 传递响应式数据
     */
    const colorRef = ref('red');
    provide('colorRef',colorRef); 

    return {
      colorRef
    }
  }
}
</script>

<style>

</style>
