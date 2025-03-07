<template>
  <div v-if="loading">加载中...</div>
  <div v-else>
    <el-form
      label-position="top"
      label-width="auto"
      :model="userInfo"
      style="margin-top: 20px; font-size: 18px; width: 50%;"

      
    >
      <!-- 当前头像 -->
      <el-form-item label="上传头像">
        <el-upload
          class="avatar-uploader"
          :http-request="avatarUpload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="userInfo.avatarurl" :src="userInfo.avatarurl" class="avatar" alt="Avatar"/>
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item label="昵称" >
        <el-input v-model="userInfo.name" placeholder="请输入昵称" />
      </el-form-item>

      <!-- 电话 -->
      <el-form-item label="电话">
        <el-input v-model="userInfo.telephone" placeholder="请输入电话" />
      </el-form-item>

      <!-- 地址 -->
      <el-form-item label="地址">
        <el-input v-model="userInfo.location" placeholder="请输入地址" />
      </el-form-item>

      <!-- 个性签名 -->
      <el-form-item label="个人描述">
        <el-input
          type="textarea"
          v-model="userInfo.description"
          placeholder="请输入个人描述"
        />
      </el-form-item>

      <!-- 保存与重置按钮 -->
      <el-form-item>
        <el-button type="primary" @click="saveData">提交表单</el-button>
        <el-button @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api/request'; // 导入封装好的axios实例
import { useUserStore } from '@/store/user'; // user store库
import man1 from '@/assets/HeadPortrait/man1.jpg';  // 默认头像

// 调用 user store 以获取该用户的authorization
const UserStore = useUserStore();
console.log(UserStore.authorization);

// 定义接口来约束 userInfo 的类型
interface UserInfo {
  avatarurl: string;
  name: string;
  telephone: string;
  location: string;
  description: string;
  password : string ;
}

// 创建响应式对象存储用户信息，初始值包含所有字段
const userInfo = ref<UserInfo>({
  avatarurl: '',
  name: '',
  telephone: '',
  location: '',
  description: '' ,
  password : ''
});
// 自定义上传逻辑，使用 PUT 方法
//option 是 el-update 上传组件上传文件时候自动传递的参数对象
const avatarUpload = async (option: any) => {
  const formData = new FormData();
  formData.append('file', option.file);  // 添加文件到 formData 中
  
  try {
    const response = await api.put('/user/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' , // 确保是文件上传的表单格式
        authorization : UserStore.authorization,
      }
    });
    
    // 更新头像URL
    userInfo.value.avatarurl = response.data.data;  // h后端返回的图片URL在 data 中
    ElMessage.success('头像上传成功');
    option.onSuccess(response.data);  // 触发成功回调

  } catch (error) {
    ElMessage.error('头像上传失败');
    option.onError(error);  // 触发失败回调
  }
};
// 原始用户信息，用于重置操作
const originalUserInfo = ref<UserInfo>({ ...userInfo.value });
// 加载状态
const loading = ref(true);

// 从后端获取用户数据
const fetchUserInfo = async () => {
  try {
    const res = await api.post('/user/current', null, 
      { headers: { authorization: UserStore.authorization } }); 

    if (res.data) {
      const data = res.data.data;
      userInfo.value = {
        avatarurl: data.avatarurl || man1,       // 使用后端提供的头像URL
        name: data.name || '无昵称',
        telephone: data.telephone || '请填入手机号',
        location: data.location || '请填入地址',
        description: data.description || '暂无个性签名' ,
        password : data.password 
      };
      originalUserInfo.value = { ...userInfo.value };
    }
  } catch (error) {
    console.error('获取用户信息失败，使用模拟数据:', error);
    // 模拟数据
    const mockData: UserInfo = {
      avatarurl: man1,
      name: '匿名',
      telephone: '123-456-7890',
      location: 'JLU',
      description: 'MAN!',
      password : ''
    };
    userInfo.value = { ...mockData };
    originalUserInfo.value = { ...mockData };
  } finally {
    loading.value = false;
  }
};


// 上传前检查
const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传图片格式必须是 JPG 或 PNG 格式!');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!');
    return false;
  }
  return true;
};

// 组件挂载时获取用户数据
onMounted(() => {
  fetchUserInfo();
});

// 保存数据到后端
const saveData = async () => {
  try {
    const response = await api.put('/user/update', userInfo.value ,
    {headers : { authorization : UserStore.authorization}}

    ); 
    originalUserInfo.value = { ...userInfo.value };
    ElMessage.success('数据已提交保存');
  } catch (error) {
    ElMessage.error('保存失败，请重试');
  }
};

// 重置数据
const resetData = () => {
  userInfo.value = { ...originalUserInfo.value }; 
};
</script>

<style scoped>
.el-form {
  font-size: 18px;
  width: 100%;
}

.el-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
}

.el-input {
  width: 100%;
}

.el-button {
  margin-right: 10px;
}

.avatar-uploader .avatar {
  width: 200px;
  height: 200px;
  display: block;
  object-fit: cover;
  border: 3px solid #000; /* 设置边框颜色和宽度 */
  border-radius: 0px; /* 设置为圆形边框，视情况而定 */
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}


</style>
