<template>
    <div>
        <p>{{ name }}</p>
        <button @click="name='mike'">修改name</button>
    </div>
</template>

<script>
// 1.导入reactive函数
import { reactive } from 'vue'

export default {
   setup() {
       // 2.创建响应式数据对象
       const data = reactive({
           name:'tom',
           age:18
       })
       console.log(data.name);

       setTimeout(() => {
           data.name = 'alice';
           console.log('修改了name...',data.name);
       },3000);

       return data;
   }
}
</script>