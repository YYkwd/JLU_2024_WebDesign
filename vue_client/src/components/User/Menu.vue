<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Avatar,GoodsFilled, Box,PhoneFilled,Van,List, UserFilled,} from '@element-plus/icons-vue';
import { ref,onMounted } from 'vue'
//引入UserStore(含authorization)
import {useUserStore} from '@/store/user';

import api from '@/api/request'
const  UserStore = useUserStore();
console.log(UserStore.authorization);

console.log(UserStore.authorization);
// 使用 Vue Router 的组合式 API
const router = useRouter();

// 定义导航函数
const goToAppPage = () => {
  router.push('/');
};

const goToShowInfo = () => {
  router.push('/user_menu/show_info')
};

const goToInfoEditor = () => {
  router.push('/user_menu/info_editor')
};


const goToCountControl = () => {
  router.push('/user_menu/count_control')
};


const goToGoods = () => {
  router.push('/user_menu/goods')
};

const goToGoodsSell = () => {
  router.push('/user_menu/goods_sell')
};
const goToGoodsSelf = () => {
  router.push('/user_menu/goods_self')
};

const goToOrders = () => {
  router.push('/user_menu/orders')
};
</script>

<template>
  <div class="common-layout">
    <el-container class="base-layout">
      <!-- Header 部分 -->
      <el-header class="header-layout">
        <el-row>
          <el-col :span="6" class="col-center-left">
            <img src="@/assets/logo.jpg" alt="logo" id="logo" type="logo" height="60px" width="60px" />
            <el-text font-size="50px" font-weight="bold">校 园 帮</el-text>
          </el-col>
          <el-col :span="12" class="col-center-center"></el-col>
          <el-col :span="2" class="col-center-center"></el-col>
          <el-col :span="2" class="col-center-center"></el-col>
          <el-col :span="2" class="col-center-center">
            <el-button type="primary" plain @click="goToAppPage">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>

      <!-- Body 部分 -->
      <el-container class="body-layout">
        <!-- 侧边栏 -->
        <el-aside class="aside-layout">
          <el-menu default-active="1" class="menu-vertical-demo" :router="true">

            <el-sub-menu index="1">
              <template #title>
                <el-icon><UserFilled /></el-icon>
                  <span>个人信息</span>
              </template>

            <el-menu-item index="1-1" @click="goToShowInfo()">
                
                <span>基本信息</span>
            </el-menu-item>

            <el-menu-item index="1-2" @click="goToInfoEditor()">
                
                <span>信息修改</span>
            </el-menu-item>

            <el-menu-item index="1-3" @click="goToCountControl()" >
                
                <span>账号管理</span>
            </el-menu-item>
            </el-sub-menu>



            
            
            <el-menu-item index="2" @click="goToGoods">
              <el-icon><GoodsFilled /></el-icon>
              <span>在售商品</span>
            </el-menu-item>
            

            <el-sub-menu index="3">
              <template #title>
                <el-icon><GoodsFilled /></el-icon>
                  <span>我的商品</span>
              </template>

            <el-menu-item index="1-1" @click="goToGoodsSell()">
                
                <span>发布商品</span>
            </el-menu-item>

            <el-menu-item index="1-2" @click="goToGoodsSelf()">
                
                <span>我的商品</span>
            </el-menu-item>
          </el-sub-menu>


            <el-menu-item index="4" @click="goToOrders">
              <el-icon><PhoneFilled /></el-icon>
              <span>订单</span>
            </el-menu-item>
            
          </el-menu>
        </el-aside>
        <el-main class="router-view-layout">
          <router-view />
        </el-main>
      </el-container>

      <!-- Footer 部分 -->
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
.common-layout {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: red;
}

.base-layout {
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: skyblue;
}

.header-layout {
  height: 60px;
  width: 100%;
  margin: 0px;
  padding: 0px;
}

.body-layout {
  width: 100%;
  flex-grow: 1;
  margin: 0px;
  padding: 0px;
  align-items: center;
  justify-content: center;
  background-color: skyblue;
}

.aside-layout {
  width: 200px;
  height: 100%;
  margin: 0px;
  padding: 0px;
  background-color: red;
}

.router-view-layout {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  background-color: white;
}

.footer-layout {
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: black;
}

.col-center-left {
  display: flex;
  align-items: center;
  background-color: #d9ecff;
}

.col-center-center {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9ecff;
}

.menu-vertical-demo {
  width: 200px;
  height: 100%;
}
</style>
