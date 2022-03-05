### Vue.js 五天 *汤小洋*

## 一、 Vue.js简介

### 1. Vue.js是什么
  **Vue.js**也称为Vue，读音/vju:/，类似view，错误读音v-u-e
  版本：v1.0 v2.0

  + 是一个构建用户界面的框架
  + 是一个轻量级MVVM（Model-View-ViewModel）框架，和angular、react类似，其实就是所谓的数据双向绑定
  + 数据驱动+组件化的前端开发（核心思想）
  + 通过简单的API实现**响应式的数据绑定**和**组合的视图组件**
  + 更容易上手、小巧

  参考：[官网](https://cn.vuejs.org/)

### 2.vue和angular的区别

#### 2.1 angular
  + 上手较难
  + 指令以ng-xxx开头
  + 所有属性和方法都存储在$scope中
  + 由google维护

#### 2.2 vue
  + 简单、易学、更轻量
  + 指令以v-xxx开头
  + HTML代码+JSON数据，再创建一个vue实例
  + 由个人维护：**尤雨溪**，华人，目前就职于阿里巴巴，2014.2开源了vue.js库

 ![尤雨溪](https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=d49c7e60ee1190ef15f69a8daf72f673/4afbfbedab64034f29596c8ba6c379310b551da2.jpg)

 共同点：`都不兼容低版本IE`
 对比：GitHub上vue的stars数量大约是angular的两倍


## 二、起步

### 1. 下载核心库vue.js
	bower info vue
	npm init --yes
	cnpm install vue --save
	版本 v2.3.4 目前最新版本(2017.6.29)

	vue2.0和1.0相比，最大的变化就是引入了Virtual DOM（虚拟DOM）,页面更新效率更高，速度更快

### 2. Hello World（对比angular）
	
#### 2.1 angular实现
	js:
		let app=angular.module('myApp',[]);
		app.controller('MyController',['$scope',function($scope){
			$scope.msg='Hello World';
		}]);
	html:	
		<html ng-app="myApp">
			<div ng-controller="MyController">
				{{msg}}
			</div>
		</html>

#### 2.2 vue实现
	js:
		new Vue({
			el:'#itany', //指定关联的选择器
			data:{ //存储数据
				msg:'Hello World',
				name:'tom'
			}
		});
	html:
		<div id="itany">
			{{msg}}
		</div>

### 3. 安装vue-devtools插件，便于在chrome中调试vue
	直接将vue-devtools解压缩，然后将文件夹中的chrome拖放到扩展程序中
    
    //配置是否允许vue-devtools检查代码，方便调试，生产环境中需要设置为false
        Vue.config.devtools=false;
        Vue.config.productionTip=false; //阻止vue启动时生成生产消息


## 三、 常用指令

### 1. 什么是指令？
    用来扩展html标签的功能
    angular中常用的指令：
        ng-model
        ng-repeat
        ng-click
        ng-show/ng-hide
        ng-if

### 2. vue中常用的指令
  + v-model
    双向数据绑定，一般用于表单元素

  + v-for
    对数组或对象进行循环操作，使用的是v-for，不是v-repeat
    注：在vue1.0中提供了隐式变量，如$index、$key
        在vue2.0中去除了隐式变量，已被废除            

  + v-on 
    用来绑定事件，用法：v-on:事件="函数"

  + v-show/v-if   
    用来显示或隐藏元素，v-show是通过display实现，v-if是每次删除后再重新创建，与angular中类似 


## 四、 练习：用户管理 
    使用BootStrap+Vue.js   


## 五、 事件和属性

### 1. 事件

#### 1.1 事件简写
    v-on:click=""    
    简写方式 @click=""

#### 1.2 事件对象$event    
    包含事件相关信息，如事件源、事件类型、偏移量
    target、type、offsetx

#### 1.3 事件冒泡
    阻止事件冒泡：
        a)原生js方式，依赖于事件对象
        b)vue方式，不依赖于事件对象
            @click.stop

#### 1.4 事件默认行为 
    阻止默认行为：
        a)原生js方式，依赖于事件对象

#### 1.5 键盘事件
    回车：@keydown.13 或@keydown.enter
    上：@keydown.38 或@keydown.up

    默认没有@keydown.a/b/c...事件，可以自定义键盘事件，也称为自定义键码或自定义键位别名

#### 1.6 事件修饰符    
    .stop - 调用 event.stopPropagation()。
    .prevent - 调用 event.preventDefault()。
    .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
    .native - 监听组件根元素的原生事件。
    .once - 只触发一次回调。

### 2. 属性
    
#### 2.1 属性绑定和属性的简写    
    v-bind 用于属性绑定， v-bind:属性=""

    属性的简写：
        v-bind:src="" 简写为 :src=""

#### 2.2 class和style属性
    绑定class和style属性时语法比较复杂：


## 六、 模板

### 1. 简介
    Vue.js使用基于HTML的模板语法，可以将DOM绑定到Vue实例中的数据
    模板就是{{}}，用来进行数据绑定，显示在页面中
    也称为Mustache语法

### 2. 数据绑定的方式
    a.双向绑定
        v-model
    b.单向绑定    
        方式1：使用两对大括号{{}}，可能会出现闪烁的问题，可以使用v-cloak解决
        方式2：使用v-text、v-html

### 3. 其他指令
    v-once 数据只绑定一次
    v-pre 不编译，直接原样显示


## 七、 过滤器

### 1. 简介
    用来过滤模型数据，在显示之前进行数据处理和筛选
    语法：{{ data | filter1(参数) | filter2(参数)}}

### 2. 关于内置过滤器
    vue1.0中内置许多过滤器，如：
        currency、uppercase、lowercase
        limitBy
        orderBy
        filterBy
    vue2.0中已经删除了所有内置过滤器，全部被废除
    如何解决：
        a.使用第三方工具库，如lodash、date-fns日期格式化、accounting.js货币格式化等
        b.使用自定义过滤器

### 3. 自定义过滤器
    分类：全局过滤器、局部过滤器

#### 3.l 自定义全局过滤器
    使用全局方法Vue.filter(过滤器ID,过滤器函数)

#### 3.l 自定义局部过滤器    




















































