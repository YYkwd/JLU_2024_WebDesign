<template>
  <div v-if="loading">加载中...</div>
  <div v-else>
    <el-descriptions title="个人信息" direction="vertical" border
      :column= "5"  
      style="margin-top: 20px; font-size: 18px; width: 100%;"
    >
    <!-- 用户头像 -->
      <el-descriptions-item
         :rowspan="2"
        :width="170"
        label="Photo"
        align="center"
      >
        <el-image
          style="width: 170px; height: 170px"
          :src="userInfo.avatarurl"
        />
      </el-descriptions-item >
      <el-descriptions-item label="昵称" :span="2" >{{ userInfo.name }}</el-descriptions-item>
      <el-descriptions-item label="电话" :span="2">{{ userInfo.telephone }}</el-descriptions-item>
      <el-descriptions-item label="邮箱":span="3">{{ userInfo.email }}</el-descriptions-item>
      <el-descriptions-item label="地址":span="3"><el-tag size="large">{{ userInfo.location }}</el-tag> </el-descriptions-item>
      <el-descriptions-item label="个性签名" :span="6"> {{ userInfo.description }} </el-descriptions-item>
      <el-descriptions-item label="创建时间" :span="3"> {{ userInfo.createTime }}   </el-descriptions-item>
      <el-descriptions-item label="更新时间":span="3"> {{ userInfo.updateTime }} </el-descriptions-item>
      <el-descriptions-item label="申述次数":span="3"> {{ userInfo.complaintCount }} </el-descriptions-item>
      <el-descriptions-item label="被申述次数":span="3"> {{ userInfo.complaintedCount }} </el-descriptions-item>
      <el-descriptions-item label="退换货次数":span="3"> {{ userInfo.exchangeCount}} </el-descriptions-item>
      <el-descriptions-item label="被退换货次数":span="3"> {{ userInfo.exchangedCount }} </el-descriptions-item>
      <el-descriptions-item label="商品购买总数":span="3"> {{ userInfo.saleCount }} </el-descriptions-item>
      <el-descriptions-item label="商品购买总额":span="3"> {{ userInfo.saleAccount }} </el-descriptions-item>
      <el-descriptions-item label="卖出总数":span="3"> {{ userInfo.purchaseCount }} </el-descriptions-item>
      <el-descriptions-item label="卖出总额":span="3"> {{ userInfo.purchaseAccount }} </el-descriptions-item>

    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import man1 from '@/assets/HeadPortrait/man1.jpg'; // 使用 import 引入图片
import api from '@/api/request'; // 导入封装好的axios实例 ， 以应对跨域问题
import { useUserStore } from '@/store/user'; // user store库 （含authorization）

const  UserStore = useUserStore(); //调用以获取该用户的authorization
console.log(UserStore.authorization);
// 创建响应式对象存储用户信息
const userInfo = ref({
  id: '',
  role: '',
  name: '',
  password: '',
  telephone: '',
  complaintCount: '',
  complaintedCount: '',
  createTime: '',
  description: '',
  email: '',
  exchangeCount: '',
  exchangedCount: '',
  isDelete: '',
  location: '',
  saleAccount: '',
  saleCount: '',
  status: '',
  updateTime: '',
  purchaseCount: '',
  purchaseAccount : '',
  avatarurl: '', // 默认头像
});

// 加载状态
const loading = ref(true);

// 发送请求获取后端数据并更新 userInfo
onMounted(async () => {
  try {
    // 获取用户数据的API请求
    const response = await api.post('/user/current',null , {
      headers: {
        authorization: UserStore.authorization  // 获取用户的token
      }
    });

    const data = response.data.data;

    // 日期格式化函数，仅显示年-月-日
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    console.log(data);
    console.log( data.avatarurl, "展示信息部分 ， 用户头像存储在OSS的URL");
    // 将后端返回的用户数据更新到 userInfo
    userInfo.value = {
      id: data.id,
      role: data.role,
      name: data.name || '无昵称',
      password: data.password,
      telephone: data.telephone || '请填入手机号',
      complaintCount: data.complaintCount,
      complaintedCount: data.complaintedCount,
      createTime: formatDate(data.createTime),  // 格式化后的创建时间
      description: data.description || '暂无个性签名',
      email: data.email,
      exchangeCount: data.exchangeCount,
      exchangedCount: data.exchangedCount,
      isDelete: data.isDelete,
      location: data.location || '请填入地址',
      saleAccount: data.saleAccount,
      saleCount: data.saleCount,
      status: data.status,
      updateTime: formatDate(data.updateTime),  // 格式化后的更新时间
      purchaseCount: data.purchaseCount ,
      purchaseAccount : data.purchaseAccount ,
      avatarurl : data.avatarurl || man1,  // 待从后端获得的头像链接替换这里的 man1
    };

    loading.value = false; // 数据加载完成
  } catch (error) {
    console.error('获取用户信息失败：', error);
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
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.el-tag {
  font-size: 16px;
}
</style>
