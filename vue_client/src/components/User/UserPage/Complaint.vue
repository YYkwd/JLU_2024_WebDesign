<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import api from '@/api/request'; // 导入封装好的axios实例
  import { useUserStore } from '@/store/user'; // user store库
  import man1 from '@/assets/HeadPortrait/man1.jpg';  // 默认头像
  import { useRouter,useRoute } from 'vue-router';

  const  UserStore = useUserStore(); //调用以获取该用户的authorization
  const router = useRouter();
  const route = useRoute();

  const orderID = ref(Number(route.params.id))
    
    interface complaint {
      id: number;  //商品ID
      appealDescription: string;  //投诉内容
      appealPhotos: string; //投诉图片
    }

    const complaint = ref<complaint>({id:orderID.value,appealDescription:"",appealPhotos:""})
    const formData = new FormData();
    
    const appealPhotosUpload = async (option: any) => {
        
        if(formData.has('appealPhotos'))
        formData.set('appealPhotos', option.file);  // 更改文件到 formData 中
        else
        formData.append('appealPhotos', option.file);   //添加文件到 formData 中
  };

  const beforeAppealUpload = (file: File) => {
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

const submitComplaint = async () => {
      formData.append('appealDescription',complaint.value.appealDescription)    //添加描述到 formData 中
      const res = await api.put('/user/orders/'+complaint.value.id,formData,{headers:{'Authorization':UserStore.authorization}});
      if(res.data.code === 200){
        ElMessage.success('申诉提交成功！');
        resetData();
        router.push('/user_menu/orders/')
      }
      else{
        ElMessage.error('申诉失败！');
      }
    };
    
const resetData = () => {
      complaint.value.appealDescription = ""
      complaint.value.appealPhotos = ""
      if(formData.has('appealPhotos'))
      formData.delete('appealPhotos')
      if(formData.has('appealDescription'))
      formData.delete('appealDescription')
    }
</script>
<template>
  <div style="height: auto;width: auto;">
    <el-form
      label-position="top"
      label-width="auto"
      :model="complaint"
      style="margin-top: 20px; font-size: 18px; width: 50%;"

      
    >
    <el-form-item label="申诉内容" >
      <el-input v-model="complaint.appealDescription" type="textarea" placeholder="请输入申诉内容" style="width: 400px;"/>
    </el-form-item>
    <el-form-item label="上传申诉图片" >
        <el-upload
          class="avatar-uploader"
          :http-request="appealPhotosUpload"
          :show-file-list="false"
          :before-upload="beforeAppealUpload"
        >
          <img v-if="complaint.appealPhotos" :src="complaint.appealPhotos" class="avatar" alt="申诉图片"/>
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitComplaint">提交申诉</el-button>
        <el-button @click="resetData">重置</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .avatar {
  width: 200px;
  height: 200px;
  display: block;
  object-fit: cover;
  border: 3px solid #000; /* 设置边框颜色和宽度 */
  border-radius: 0px; /* 设置为圆形边框，视情况而定 */
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>