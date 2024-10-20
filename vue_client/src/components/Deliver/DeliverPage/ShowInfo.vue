<template>
    <div v-if="loading">加载中...</div>
    <div v-else>
      <el-descriptions title="骑手个人信息" direction="vertical" border :column="5" style="margin-top: 20px; font-size: 18px; width: 100%;">
        <!-- 骑手头像 -->
        <el-descriptions-item :rowspan="2" :width="170" label="Photo" align="center">
          <el-image style="width: 170px; height: 170px" :src="userInfo.avatarurl" />
        </el-descriptions-item>
  
        <!-- 骑手基本信息 -->
        <el-descriptions-item label="昵称" :span="2">{{ userInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="电话" :span="2">{{ userInfo.telephone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱" :span="3">{{ userInfo.email }}</el-descriptions-item>
        <el-descriptions-item label="总配送次数" :span="3">
          <el-tag size="large">{{ userInfo.deliverAcount }}</el-tag>
        </el-descriptions-item>
  
        <!-- 骑手个性签名 -->
        <el-descriptions-item label="个性签名" :span="6">{{ userInfo.description }}</el-descriptions-item>
  
        <!-- 骑手时间信息 -->
        <el-descriptions-item label="创建时间" :span="3">{{ userInfo.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间" :span="3">{{ userInfo.updateTime }}</el-descriptions-item>
  
        <!-- 骑手统计信息 -->
        <el-descriptions-item label="总好评数" :span="3">{{ userInfo.commentAccount }}</el-descriptions-item>
        <el-descriptions-item label="总差评数" :span="3">{{ userInfo.badCommentAccount }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import man1 from '@/assets/HeadPortrait/man1.jpg'; // 使用 import 引入图片
  import api from '@/api/request'; // 导入封装好的axios实例
  import { useDeliverStore } from '@/store/deliver'; // user store库 （含authorization）
  
  const UserStore = useDeliverStore(); //调用以获取该用户的authorization
  
  // 创建响应式对象存储用户信息
  const userInfo = ref({
    id: '',
    name: '',
    telephone: '',
    email: '',
    location: '',
    description: '',
    createTime: '',
    updateTime: '',
    avatarurl: '', // 默认头像
    commentAccount: '', // 总好评数
    badCommentAccount: '', // 总差评数
    deliverAcount: '' // 总配送数
  });
  
  // 加载状态
  const loading = ref(true);
  
  // 获取后端数据并更新 userInfo
  onMounted(async () => {
    try {
      const response = await api.get('/deliver/current', {
        headers: {
          authorization: UserStore.authorization, // 获取用户的token
        },
      });
  
      const data = response.data.data;
      console.log("骑手基本信息：" , data);
      // 日期格式化函数，仅显示年-月-日
      const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      };
  
      // 将后端返回的用户数据更新到 userInfo
      userInfo.value = {
        id: data.id,
        name: data.name || '无昵称',
        telephone: data.telephone || '待输入',
        email: data.email || '无邮箱',
        location: data.location || '请填入地址',
        description: data.description || '暂无个性签名',
        createTime: formatDate(data.createTime),  // 格式化后的创建时间
        updateTime: formatDate(data.updateTime),  // 格式化后的更新时间
        avatarurl: data.avatarurl || man1,  // 待从后端获得的头像链接替换这里的 man1
        commentAccount: data.commentAccount || 0, // 总好评数
        badCommentAccount: data.badCommentAccount || 0, // 总差评数
        deliverAcount: data.deliverAcount || 0 // 总配送数
      };
  
      loading.value = false; // 数据加载完成
    } catch (error) {
      console.error('获取骑手信息失败：', error);
      loading.value = false; // 即使请求失败也停止加载状态
    }
  });
  </script>
  
  <style scoped>
  .el-descriptions {
    font-size: 18px;
    width: 100%;
  }
  
  .el-image {
    width: 170px;
    height: 170px;
    object-fit: cover;
  }
  
  .el-tag {
    font-size: 16px;
  }
  </style>
  