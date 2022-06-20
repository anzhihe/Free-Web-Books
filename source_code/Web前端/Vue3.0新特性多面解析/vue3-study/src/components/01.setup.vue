<template>
    <div>
        <p>{{ name }}</p>
        <p>{{ user.username }}</p>
    </div>
</template>

<script>
export default {
    setup(props,context){
        // console.log('setup');

        console.log(props.msg);

        // 在setup函数中不能访问this
        // console.log(this);
        console.log(context); // attrs、emit、slots

        /**
         * 普通数据不具有响应式
         */
        var name = 'tom';
        setTimeout( () => {
            name = 'alice';
            console.log('修改了name....',name);
        },3000);

        // 暴露给模板
        return {
            name,
            user:{
                username:'admin',
                password:'123'
            }
        }
    },
    beforeCreate(){
        // console.log('beforeCreate');
    },
    props:{
        msg:String
    }
}
</script>