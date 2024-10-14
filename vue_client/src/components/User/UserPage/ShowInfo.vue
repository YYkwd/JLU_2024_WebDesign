<template>
  <div v-if="loading">加载中...</div>
  <div v-else>
    <el-descriptions
      title="个人信息"
      direction="vertical"
      border
      style="margin-top: 20px; font-size: 18px; width: 80%;"
    >
      <el-descriptions-item
        :rowspan="2"
        :width="140"
        label="Photo"
        align="center"
      >
        <el-image
          style="width: 150px; height: 150px"
          :src="userInfo.photo"
        />
      </el-descriptions-item>
      <el-descriptions-item label="昵称">{{ userInfo.nickname }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ userInfo.phone }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
      <el-descriptions-item label="地址">
        <el-tag size="large">{{ userInfo.address }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="个性签名">
        {{ userInfo.signature }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import man1 from '@/assets/HeadPortrait/man1.jpg'; // 使用 import 引入图片

// 创建响应式对象存储用户信息
const userInfo = ref({
  photo: '',
  nickname: '',
  phone: '',
  email: '',
  address: '',
  signature: ''
});

// 加载状态
const loading = ref(true);

// 模拟数据和延迟
onMounted(() => {
  setTimeout(() => {
    // 模拟的用户数据
    userInfo.value = {
      photo: man1,  // 使用导入的图片路径
     
      nickname: 'John Doe',
      phone: '123-456-7890',
      email: 'johndoe@example.com',
      address: '123 Main St, Anytown, USA',
      signature: 'Keep pushing forward!'
    };
    loading.value = false; // 加载完成
    console.log("Hello World");
  }, 500); // 模拟0.5秒的延迟
});
</script>

<style scoped>
.el-descriptions {
  font-size: 18px;
  width: 100%;
}

.el-image {
  width: 150px;
  height: 150px;
}

.el-tag {
  font-size: 16px;
}
</style>
