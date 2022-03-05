### Vue.js 五天 *汤小洋*

## 一、 准备工作

###１. 初始化项目
    vue init webpack itany
    cd itany
    cnpm install
    cnpm install less less-loader -D
    cnpm install vuex axios -S
    npm run dev

### 2. 项目资源
    |-reset.css
    |-data.json

### 3. 创建目录结构
    首先清除项目中的部分内容

    创建如下目录结构：
        |-data.json
        |-static
            |-css
                |-reset.css

### 4. 配置API接口，模拟后台数据
    使用express框架启动一个Node服务器，配置API接口，模拟后台数据

    测试API：
     http://localhost:8080/api/seller
     http://localhost:8080/api/goods
     http://localhost:8080/api/ratings


## 二、项目整体结构开发     
