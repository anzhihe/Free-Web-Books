### Vue.js 五天 *汤小洋*

## 一、 发送AJAX请求

### 1. 简介
    vue本身不支持发送AJAX请求，需要使用vue-resource、axios等插件实现
    axios是一个基于Promise的HTTP请求客户端，用来发送请求，也是vue2.0官方推荐的，同时不再对vue-resource进行更新和维护
    
    参考：GitHub上搜索axios，查看API文档

### 2. 使用axios发送AJAX请求

#### 2.1 安装axios并引入
    npm install axios -S
    也可直接下载axios.min.js文件

#### 2.2 基本用法  
    axios([options])  
    axios.get(url[,options]);
        传参方式：
            1.通过url传参
            2.通过params选项传参
    axios.post(url,data,[options]);
        axios默认发送数据时，数据格式是Request Payload，并非我们常用的Form Data格式，
        所以参数必须要以键值对形式传递，不能以json形式传参
        传参方式：
            1.自己拼接为键值对
            2.使用transformRequest，在请求发送前将请求数据进行转换
            3.如果使用模块化开发，可以使用qs模块进行转换
    
    axios本身并不支持发送跨域的请求，没有提供相应的API，作者也暂没计划在axios添加支持发送跨域请求，所以只能使用第三方库

### 3. 使用vue-resource发送跨域请求

#### 3.1 安装vue-resource并引入    
    cnpm install vue-resource -S

#### 3.2 基本用法
    使用this.$http发送请求  
        this.$http.get(url, [options])
        this.$http.head(url, [options])
        this.$http.delete(url, [options])
        this.$http.jsonp(url, [options])
        this.$http.post(url, [body], [options])
        this.$http.put(url, [body], [options])
        this.$http.patch(url, [body], [options])  

### 4. 练习
    百度搜索列表
    课后作业：
        1.只显示4条
        2.回车后在新页面中显示搜索结果


## 二、Vue生命周期
    vue实例从创建到销毁的过程，称为生命周期，共有八个阶段
                

## 三、计算属性

### 1. 基本用法
    计算属性也是用来存储数据，但具有以下几个特点：
        a.数据可以进行逻辑处理操作
        b.对计算属性中的数据进行监视

### 2.计算属性 vs 方法
    将计算属性的get函数定义为一个方法也可以实现类似的功能
    区别：
        a.计算属性是基于它的依赖进行更新的，只有在相关依赖发生改变时才能更新变化
        b.计算属性是缓存的，只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行

### 3. get和set
    计算属性由两部分组成：get和set，分别用来获取计算属性和设置计算属性
    默认只有get，如果需要set，要自己添加


## 四、 vue实例的属性和方法

### 1. 属性
    vm.$el
    vm.$data
    vm.$options
    vm.$refs

### 2. 方法
    vm.$mount()
    vm.$destroy()
    vm.$nextTick(callback)

    vm.$set(object,key,value)
    vm.$delete(object,key)
    vm.$watch(data,callback[,options])


## 五、自定义指令
    分类：全局指令、局部指令

### 1. 自定义全局指令
    使用全局方法Vue.directive(指令ID,定义对象)    

### 2. 自定义局部指令

### 3. 练习
    拖动页面中的元素
    onmouseover onmouseout 
    onmousedown onmousemove  onmouseup


## 六、过渡(动画)

### 1. 简介
    Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果
    本质上还是使用CSS3动画：transition、animation

### 2. 基本用法
    使用transition组件，将要执行动画的元素包含在该组件内
        <transition>
            运动的元素
        </transition>       
    过滤的CSS类名：6个
    
### 3. 钩子函数
    8个

### 4. 结合第三方动画库animate..css一起使用
    <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
        <p v-show="flag">网博</p>
    </transition>    

### 5. 多元素动画
    <transition-group>    

### 6. 练习
    多元素动画    