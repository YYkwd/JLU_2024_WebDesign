<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios'; // 使用 axios 来请求后端数据

// 定义接口来约束 userInfo 的类型
interface UserInfo {
  photo: string;
  nickname: string;
  phone: string;
  email: string;
  address: string;
  signature: string;
}

// 创建响应式对象存储用户信息，初始值包含所有字段
const userInfo = ref<UserInfo>({
  photo: '',
  nickname: '',
  phone: '',
  email: '',
  address: '',
  signature: ''
});

// 原始用户信息，用于重置操作
const originalUserInfo = ref<UserInfo>(userInfo.value);

// 导入头像图片
import man1 from '@/assets/HeadPortrait/man1.jpg';
import man2 from '@/assets/HeadPortrait/man2.jpg';
import man3 from '@/assets/HeadPortrait/man3.jpg';
import girl1 from '@/assets/HeadPortrait/girl1.jpg';
import girl2 from '@/assets/HeadPortrait/girl2.jpg';
import girl3 from '@/assets/HeadPortrait/girl3.jpg';

const avatarList = [
  man1,
  man2,
  man3,
  girl1,
  girl2,
  girl3,
];

// 选择头像的对话框显示状态
const avatarDialogVisible = ref(false);

// 加载状态
const loading = ref(true);

// 从后端获取数据，如果获取不到，则使用模拟数据
const fetchUserInfo = async () => {
  try {
    const response = await axios.get('/api/user-info'); // 后端接口地址
    if (response.data) {
      userInfo.value = { ...response.data };
      originalUserInfo.value = { ...response.data };
    }
  } catch (error) {
    console.error('获取用户信息失败，使用模拟数据:', error);
    // 如果获取失败，使用模拟数据
    const mockData: UserInfo = {
      photo: man1,
      nickname: 'John Doe',
      phone: '123-456-7890',
      email: 'johndoe@example.com',
      address: '123 Main St, Anytown, USA',
      signature: 'Keep pushing forward!'
    };
    userInfo.value = { ...mockData };
    originalUserInfo.value = { ...mockData }; // 保存原始数据
  } finally {
    loading.value = false; // 加载完成
  }
};

// 生命周期钩子：组件挂载时调用
onMounted(() => {
  fetchUserInfo();
});

// 保存数据
const saveData = () => {
  console.log('保存的数据:', userInfo.value);
  // 这里可以调用 API 将数据提交到后端
  ElMessage.success('数据已保存');
};

// 重置数据
const resetData = () => {
  userInfo.value = { ...originalUserInfo.value }; // 重置为原始数据
};

// 更换头像
const changeAvatar = (avatar: string) => {
  userInfo.value.photo = avatar;  // 更新头像
  avatarDialogVisible.value = false;  // 关闭对话框
  ElMessage.success('头像已更新');
};
</script>

<template>
  <div v-if="loading">加载中...</div>
  <div v-else>
    <el-form
      label-position="top"
      label-width="120px"
      :model="userInfo"
      style="margin-top: 20px; font-size: 18px; width: 80%;"
    >
      <!-- 当前头像 -->
      <el-form-item label="头像">
        <el-image :src="userInfo.photo" style="width: 150px; height: 150px;" />
        <el-button type="primary" @click="avatarDialogVisible = true" style="margin-top: 10px;">
          更换头像
        </el-button>
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item label="昵称">
        <el-input v-model="userInfo.nickname" placeholder="请输入昵称" />
      </el-form-item>

      <!-- 电话 -->
      <el-form-item label="电话">
        <el-input v-model="userInfo.phone" placeholder="请输入电话" />
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
      </el-form-item>

      <!-- 地址 -->
      <el-form-item label="地址">
        <el-input v-model="userInfo.address" placeholder="请输入地址" />
      </el-form-item>

      <!-- 个性签名 -->
      <el-form-item label="个性签名">
        <el-input
          type="textarea"
          v-model="userInfo.signature"
          placeholder="请输入个性签名"
        />
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="saveData">保存</el-button>
        <el-button @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 头像选择对话框 -->
    <el-dialog v-model="avatarDialogVisible" title="选择头像">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <el-image
          v-for="(avatar, index) in avatarList"
          :key="index"
          :src="avatar"
          style="width: 100px; height: 100px; cursor: pointer; margin-bottom: 10px;"
          @click="changeAvatar(avatar)"
        />
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-form {
  font-size: 18px;
  width: 100%;
}

.el-image {
  width: 150px;
  height: 150px;
}

.el-input {
  width: 100%;
}

.el-button {
  margin-right: 10px;
}
</style>
