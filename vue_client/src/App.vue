<script setup lang="ts">

</script>

<template>
  <div class="common-layout">
    <el-container class="base-layout">
      <el-header class="header-layout">
        <el-row>
          <el-col :span="6" >
            <img src="./assets/logo.jpg" alt="logo" id="logo" type="logo" height="60px" width="60px" />
          </el-col>
          <el-col :span="6">
            second
          </el-col>
          <el-col :span="6">
            third
          </el-col>
          <el-col :span="6">
            forth
          </el-col>
        </el-row>
      </el-header>
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
  background-color: black;
}
.header-layout{
  height: 60px;
  width:100%;
  margin: 0px;
  padding: 0px;
  background-color: #c6e2ff;
}

</style>
