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
        <el-tag size="large">{{ userInfo.address }}</el-tag> <!-- 修改了 size -->
      </el-descriptions-item>
      <el-descriptions-item label="个性签名">
        {{ userInfo.signature }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

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

onMounted(async () => {
  try {
    const response = await axios.get('/api/userinfo');
    userInfo.value = response.data;
    console.log("Hello World");
  } catch (error) {
    console.error('获取用户信息失败:', error);
  } finally {
    loading.value = false; // 加载完成
  }
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
