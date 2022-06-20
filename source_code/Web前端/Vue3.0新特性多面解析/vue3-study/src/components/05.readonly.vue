<template>
  <div></div>
</template>

<script>
import { reactive, readonly } from "vue";
export default {
    setup() {
        const obj = reactive({ count: 1 });
        const proxy = readonly(obj);
        console.log(obj.count);
        console.log(proxy.count);

        // 代理对象是只读的，不能修改
        // proxy.count++;

        obj.count++;
        console.log(obj.count);
        console.log(proxy.count);
    }
};
</script>