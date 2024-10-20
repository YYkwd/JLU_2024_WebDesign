<template>
    <div>
      <el-form
        label-position="top"
        label-width="auto"
        :model="productInfo"
        style="margin-top: 20px; font-size: 18px; width: 50%;"
      >
        <!-- 上传商品图片 -->
        <el-form-item label="上传商品图片">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeImageUpload"
          >
            <img v-if="productInfo.imageurl" :src="productInfo.imageurl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
  
        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="productInfo.name" placeholder="请输入商品名称" />
        </el-form-item>
  
        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input
            type="textarea"
            v-model="productInfo.description"
            placeholder="请输入商品描述"
          />
        </el-form-item>
  
        <!-- 商品价格 -->
        <el-form-item label="商品价格">
          <el-input v-model="productInfo.price" placeholder="请输入商品价格" type="number" />
        </el-form-item>
  
        <!-- 商品数量 -->
        <el-form-item label="商品数量">
          <el-input v-model="productInfo.amount" placeholder="请输入商品数量" type="number" />
        </el-form-item>
  
        <!-- 提交与重置按钮 -->
        <el-form-item>
          <el-button type="primary" @click="saveData">提交表单</el-button>
          <el-button @click="resetData">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import api from '@/api/request'; // 导入封装好的axios实例
  import { useUserStore } from '@/store/user'; // user store库
  
  // 调用 user store 以获取该用户的authorization
  const UserStore = useUserStore();
  console.log("进入商品发布界面");
  
  // 定义接口来约束 productInfo 的类型
  interface ProductInfo {
    imageurl: string;
    name: string;
    description: string;
    price: number;
    amount: number;
  }
  
  // 创建响应式对象存储商品信息，初始值为空
  const productInfo = ref<ProductInfo>({
    imageurl: '',
    name: '',
    description: '',
    price: 0,
    amount: 0,
  });
  
  // 存储选择的图片文件
  const selectedFile = ref<File | null>(null);
  
  // 上传前阻止默认上传并保存文件
  const beforeImageUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 1;
  
    if (!isJPG) {
      ElMessage.error('上传图片格式必须是 JPG 或 PNG 格式!');
      return false;
    }
    if (!isLt2M) {
      ElMessage.error('上传图片大小不能超过 2MB!');
      return false;
    }
  
    // 取消默认上传，保存文件
    selectedFile.value = file;
    productInfo.value.imageurl = URL.createObjectURL(file); // 预览图片
    return false; // 阻止自动上传
  };
  
  // 保存数据到后端
  const saveData = async () => {
    try {
      const formData = new FormData();
      
      
      formData.append('data',  JSON.stringify({
        name : productInfo.value.name,
        description : productInfo.value.description , 
        price : productInfo.value.price,
        amount : productInfo.value.amount ,
      })
      );
      
      //图片部分
      if (selectedFile.value) {
        formData.append('file', selectedFile.value);
      }
      const response = await api.post('/user/goods', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: UserStore.authorization
        },
    });
      console.log("提交商品后的返回信息")
      console.log(response);
      ElMessage.success('商品已提交保存致二手交易平台');
    } catch (error) {
      ElMessage.error('保存失败，请重试');
    }
  };
  
  // 重置数据
  const resetData = () => {
    productInfo.value = {
      imageurl: '',
      name: '',
      description: '',
      price: 0,
      amount: 0,
    };
    selectedFile.value = null; // 重置选中的文件
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
  
</style>
  
<style>
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
  