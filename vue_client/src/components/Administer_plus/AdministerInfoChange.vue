<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
//引入sotre 以存储管理员（包含authorization）
import {useAdminStore} from '@/store/admin';
  const  AdminStore = useAdminStore();
</script>
<template>
  <div class="common-layout">
    
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
</style>