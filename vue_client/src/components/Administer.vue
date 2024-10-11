<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
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
      goToAppPage(){
        this.$router.push('/')
      }
    }
  }
</script>

<template>
  <div class="common-layout">
    <el-container class="base-layout">
      <el-header class="header-layout">
        <el-row >
          <el-col :span="6" class="col-center-left">
            <img src="../assets/logo.jpg" alt="logo" id="logo" type="logo" height="60px" width="60px" />
            <el-text font-size="50px" font-weight="bold">校 园 帮</el-text>
          </el-col>
          <el-col :span="12" class="col-center-center">
          </el-col>
          <el-col :span="2" class="col-center-center">
          </el-col>
          <el-col :span="2" class="col-center-center">
          </el-col>
          <el-col :span="2" class="col-center-center">
            <el-button type="primary" plain @click="goToAppPage()">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-conttainer class="body-layout">
        <el-aside class="aside-layout">
        <el-menu
          default-active="2"
          class="menu-vertical-demo"
        >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <router-view class="router-view-layout">
        </router-view>
      </el-conttainer>
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
  background-color: red;
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
.aside-layout{
  width: 200px;
  height: 100%;
  margin: 0px;
  padding: 0px;
  background-color: red;
}
.router-view-layout{
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  background-color: black;
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
.menu-vertical-demo
{
  width: 200px;
  height: 100%;
}
</style>
