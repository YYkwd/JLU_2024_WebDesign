<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import {
  Avatar,
  Bell,
  Box,
  Document,
  DocumentChecked,
  GoodsFilled,
  Menu as IconMenu,
  List,
  Location,
  Phone,
  PhoneFilled,
  Setting,
  ShoppingCart,
  ShoppingCartFull,
  UserFilled,
  Van,
} from '@element-plus/icons-vue'
import router from '@/router';
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
      },
      goToUsers()
      {
        this.$router.push('/Administer/Users')
      },
      goToDeliverymen()
      {
        this.$router.push('/Administer/Deliverymen')
      },
      goToGoodsForSalePage()
      {
        this.$router.push('/Administer/GoodsForSale')
      },
      goToGoodsComplaintPage()
      {
        this.$router.push('/Administer/GoodsComplaint')
      },
      goToDeliverymenComplaintPage()
      {
        this.$router.push('/Administer/DeliverymenComplaint')
      },
      goToDocumentsPage()
      {
        this.$router.push('/Administer/Documents')
      },
      goToSellerComplaintPage()
      {
        this.$router.push('/Administer/SellerComplaint')
      },
      goToGoodsPage()
      {
        this.$router.push('/Goods')
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
      <el-container class="body-layout">
      <el-aside class="aside-layout">
        <el-menu
          default-active="2"
          class="menu-vertical-demo"
          :router="true"
        >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>用户和骑手管理</span>
          </template>
          <el-menu-item index="1-1" @click="goToUsers()">
            <el-icon><Avatar /></el-icon>
            <span>用户</span>
          </el-menu-item>
          <el-menu-item index="1-2" @click="goToDeliverymen()">
            <el-icon><Avatar /></el-icon>
            <span>骑手</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2" @click="goToGoodsForSalePage()">
          <el-icon><GoodsFilled /></el-icon>
          <span>待售商品管理</span>
        </el-menu-item>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><PhoneFilled /></el-icon>
            <span>用户评价管理</span>
          </template>
          <el-menu-item index="3-1" @click="goToGoodsComplaintPage()">
            <el-icon><Box /></el-icon>
            <span>商品评价</span>
          </el-menu-item>
          <el-menu-item index="3-2" @click="goToDeliverymenComplaintPage()">
            <el-icon><Van /></el-icon>
            <span>骑手评价</span>
          </el-menu-item>
          <el-menu-item index="3-3" @click="goToSellerComplaintPage()">
            <el-icon><Document /></el-icon>
            <span>商家评价</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4" @click="goToDocumentsPage()">
          <el-icon><List /></el-icon>
          <span>订单信息管理</span>
        </el-menu-item>
        <el-menu-item index="5" @click="goToGoodsPage()">
          <el-icon><ShoppingCart /></el-icon>
          <span>商品管理</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-main class="router-view-layout">
        <router-view />
      </el-main>
      </el-container>
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
  background-color: white;
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
