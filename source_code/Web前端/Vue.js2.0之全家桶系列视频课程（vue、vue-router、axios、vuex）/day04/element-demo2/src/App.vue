<template>
  <div id="app">
    <el-button  type="primary">按钮</el-button>
    <br>
    <el-input v-model="username" placeholder="请输入内容"></el-input>
    <br>
    <el-radio class="radio" v-model="sex" label="male">男</el-radio>
    <el-radio class="radio" v-model="sex" label="female">女</el-radio>
    <br>
    <el-select v-model="degree" placeholder="请选择">
      <el-option
        v-for="item in degrees"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address"label="地址"></el-table-column>
    </el-table>
    <br>
    <el-rate
      v-model="score"
      show-text>
    </el-rate>
    <br>
    <el-pagination
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
    <br>
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username:'',
      sex:'male',
      degrees:[
        {
          value:'gaozhong',
          label:'高中'
        },
        {
          value:'dazhuang',
          label:'大专'
        },
        {
          value:'benke',
          label:'本科'
        },
        {
          value:'yanjiusheng',
          label:'研究生'
        }
      ],
      degree:'',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      score:3
    }
  }
}
</script>

<style>
 #app{
   margin:50px;
 }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
