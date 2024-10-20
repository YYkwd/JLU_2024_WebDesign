<template>
    <el-steps style="max-width: 600px" :active="active" finish-status="success">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
  
    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import api from '@/api/request'; // 导入封装好的axios实例
  import { useUserStore } from '@/store/user'; // user store库
  import man1 from '@/assets/HeadPortrait/man1.jpg';  // 默认头像

  const  UserStore = useUserStore(); //调用以获取该用户的authorization
  onMounted(async () => {
  try {
    // 获取用户数据的API请求
    const response = await api.get('/user/orders', {
      headers: {
        authorization: UserStore.authorization  // pinia里面存储的用户的authorization
      }
    });

    const data = response.data.data;
    console.log("订单信息");
    console.log(data);
  } catch (error) {
    console.error('获取订单信息失败：', error);
  }
});

  const active = ref(0)
  const next = () => {
    if (active.value++ > 2) active.value = 0
  }
  </script>
  