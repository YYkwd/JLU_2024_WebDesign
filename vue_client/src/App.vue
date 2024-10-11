<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';

</script>

<script lang="ts">
export default {
    name: 'index',
    data(){
        return {
            imgList: [
                {id:0,idView:new URL('./assets/safe.jpg',import.meta.url).href,name:'安全'},
                {id:1,idView:new URL('./assets/convenience.jpg',import.meta.url).href,name:'便捷'},
                {id:2,idView:new URL('./assets/timely.jpg',import.meta.url).href,name:'及时'},
                {id:3,idView:new URL('./assets/reliable.jpg',import.meta.url).href,name:'可靠'}            
            ]
        };
        },
    methods: { 
      goToAdministerPage(){
        this.$router.push('/Administer')
      }
    }
  }
</script>
<template>
  <router-view />
  <div class="common-layout">
    <el-container class="base-layout">
      <el-header class="header-layout">
        <el-row >
          <el-col :span="6" class="col-center-left">
            <img src="./assets/logo.jpg" alt="logo" id="logo" type="logo" height="60px" width="60px" />
            <el-text font-size="50px" font-weight="bold">校 园 帮</el-text>
          </el-col>
          <el-col :span="12" class="col-center-center">
          </el-col>
          <el-col :span="2" class="col-center-center">
            <el-button type="primary" plain @click="goToAdministerPage()">用户登录</el-button>

          </el-col>
          <el-col :span="2" class="col-center-center">
            <el-button type="primary" plain>管理员登录</el-button>
          </el-col>
          <el-col :span="2" class="col-center-center">
            <el-button type="primary" plain>用户注册</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-body class="body-layout">
        <el-carousel class="carousel-center">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.idView" height="90%" width="30%">
          <br>
          <el-text font-size="30px" font-weight="bold">{{item.name}}</el-text>
        </el-carousel-item>
        </el-carousel>
      </el-body>
      <el-footer class="footer-layout">
        <el-row style="height: 100%;">
          <el-col :span="12" class="col-center-center">
            <el-text font-size="20px" font-weight="bold">关于我们</el-text>
          </el-col>
          <el-col :span="12" class="col-center-center">
            <el-text font-size="20px" font-weight="bold">联系我们</el-text>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>



<style scoped>
.common-layout{
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  /*background-color: red;*/
}

.base-layout{
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: skyblue;
}
.header-layout{
  height: 60px;
  width:100%;
  margin: 0px;
  padding: 0px;
  /*background-color: #c6e2ff;*/
}
.body-layout{
  width: 100%;
  flex-grow: 1;
  margin: 0px;
  padding: 0px;
  align-items: center;
  justify-content: center;
  background-color: skyblue
}
.footer-layout{
  width:100%;
  margin: 0px;
  padding: 0px;
  background-color: black;
}
.col-center-left{
  display: flex;
  align-items: center;
  background-color: #d9ecff;
}
.col-center-center{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9ecff;
}
.carousel-center
{
  height: 100%;
  text-align: center;
}

</style>
