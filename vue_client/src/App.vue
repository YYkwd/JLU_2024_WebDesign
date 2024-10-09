<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
</script>

<template>
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
            <el-button type="primary" plain>用户登录</el-button>
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
        
      </el-body>
      <el-body class="body-layout">
        
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
</style>
