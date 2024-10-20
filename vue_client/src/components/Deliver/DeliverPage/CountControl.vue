<template>
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="login-title">修改密码</h2>
        <el-form
          ref="ruleFormRef"
          style="width: 100%"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item label="原始密码" prop="oldPass">
            <el-input v-model="ruleForm.oldPass" type="password" placeholder="请输入原始密码" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新创建密码" prop="newPass">
            <el-input v-model="ruleForm.newPass" type="password" placeholder="请输入新密码" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPass">
            <el-input v-model="ruleForm.confirmPass" type="password" placeholder="请再次输入新密码" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPasswordForm(ruleFormRef)">
              确认修改
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import api from '@/api/request';
  
  // 引入 store 以存储用户全局信息
  import { useDeliverStore } from '@/store/deliver';
  const UserStore = useDeliverStore();
  const router = useRouter();
  
  
  // 用户信息
  const userInfo = ref({
    name: '',
    password: '',
    telephone: '',
    description: '',
    email: '',
  });
  
  //在页面切换挂载时候获取需要的所有该用户数据
  onMounted(async () => {
    try {
      // 获取用户数据的API请求
      const response = await api.get('/deliver/current', {
        headers: {
          authorization: UserStore.authorization  // 获取用户的token
        }
      });
  
      const data = response.data.data;
      userInfo.value = {
        name: data.name || '无昵称',
        password: data.password, // 假设后端返回的密码字段是 password
        telephone: data.telephone || '请填入手机号',
        description: data.description || '暂无个性签名',
        email: data.email,
      };
  
    } catch (error) {
      console.error('获取用户信息失败：', error);
    }
  });
  
  // 表单的引用和表单数据模型
  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive({
    oldPass: '', // 原始密码
    newPass: '', // 新创建的密码
    confirmPass: '', // 确认新密码
  });
  
  // 验证规则
  const validateOldPass = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error('请输入原始密码'));
    } else if (value !== userInfo.value.password) {
      callback(new Error('原始密码不正确'));
    } else {
      callback();
    }
  };
  
  const validateNewPass = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error('请输入新密码'));
    } else if (value.length < 6) {
      callback(new Error('密码长度不能少于6位'));
    } else {
      callback();
    }
  };
  
  const validateConfirmPass = (rule: any, value: any, callback: any) => {
    if (value !== ruleForm.newPass) {
      callback(new Error('两次输入的密码不一致'));
    } else {
      callback();
    }
  };
  
  const rules = reactive<FormRules<typeof ruleForm>>({
    oldPass: [{ validator: validateOldPass, trigger: 'blur' }],
    newPass: [{ validator: validateNewPass, trigger: 'blur' }],
    confirmPass: [{ validator: validateConfirmPass, trigger: 'blur' }],
  });
  
  // 提交修改密码表单
  const submitPasswordForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
  
    formEl.validate(async (valid) => {
      if (valid) {
        try {
          // 发送修改密码的请求
          const response = await api.put('/deliver/update', 
          {
            name: userInfo.value.name,
            password: ruleForm.newPass,
            telephone: userInfo.value.telephone,
            description: userInfo.value.description,
            email: userInfo.value.email,
          }, {
            headers: { authorization: UserStore.authorization },
          });
  
          const { code, msg } = response.data;
  
          if (code === 200) {
            ElMessage.success('密码修改成功');
            // 清空表单并跳转
            formEl.resetFields();
            userInfo.value.password = ruleForm.newPass;
            //router.push('/user_menu');
          } else {
            ElMessage.error(msg || '修改密码失败');
          }
        } catch (error) {
          ElMessage.error('修改密码请求失败，请检查网络或稍后再试');
        }
      } else {
        console.log('表单验证失败');
      }
    });
  };
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
  
  .login-card {
    width: 400px;
  }
  
  .login-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
  }
  </style>
  