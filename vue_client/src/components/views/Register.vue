<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">用户注册</h2>
      <el-form
        ref="ruleFormRef"
        style="width: 100%"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" autocomplete="off" />
          <el-button type="primary" @click="getVerificationCode" style="margin-top: 10px;">
            获取验证码
          </el-button>
        </el-form-item>

        <el-form-item label="验证码" prop="verificationCode">
          <el-input v-model="ruleForm.verificationCode" placeholder="验证码自动填充" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item label="登录类型" prop="location">
          <el-segmented v-model="ruleForm.location" :options="locationOptions" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确认提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          <el-button type="success" @click="goToHome">回退</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
//import axios from 'axios';  // 引入 Axios
import api from '@/api/request' ;// 导入封装号的axios实例 ， 以应对跨域问题

// 初始化 router 用于页面跳转
const router = useRouter();

// 页面跳转到主页
const goToHome = () => {
  router.push('/');
};

// 登录类型选项
const locationOptions = ['骑手', '用户'];

// 引用表单实例
const ruleFormRef = ref<FormInstance>();

// 定义表单的响应式数据
const ruleForm = reactive({
  email: '',
  verificationCode: '',  // 验证码字段
  pass: '',
  checkPass: '',
  location: '',
});

// 先声明邮箱验证函数
const validateEmail = (rule: any, value: any, callback: any) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!value) {
    callback(new Error('请输入邮箱'));
  } else if (!emailPattern.test(value)) {
    callback(new Error('邮箱格式不正确'));
  } else {
    callback();
  }
};

// 密码验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField('checkPass');
    }
    callback();
  }
};

// 确认密码验证
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== ruleForm.pass) {
    callback(new Error('两次输入的密码不一致！'));
  } else {
    callback();
  }
};

// 定义表单验证规则
const rules = reactive<FormRules<typeof ruleForm>>({
  email: [{ validator: validateEmail, trigger: 'blur' }],
  verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  location: [{ required: true, message: '请选择登录类型', trigger: 'change' }],
});

// 获取验证码
// 获取验证码的请求
const getVerificationCode = async () => {
  try {
    const response = await api.post(
      '/user/register/code',
      null, // POST 请求体为空
      {
        params: {
          email: ruleForm.email, // 邮箱
        },
        headers: {
          authorization: 0, // 随便设置的authorization 
        },
      }
    );

    const { code, msg, data } = response.data;

    if (code === 200) {
      ruleForm.verificationCode = data;  // 自动填充验证码
      ElMessage({
        message: '验证码已发送并自动填充',
        type: 'success',
        duration: 3000,
      });
    } else {
      ElMessage.error(msg || '获取验证码失败');
    }
  } catch (error) {
    ElMessage.error('请求验证码时出错，请检查网络或稍后再试');
  }
};

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate(async (valid) => {
    if (valid) {
      const name = `${ruleForm.location}_${ruleForm.email}`; // 用户类型 + 邮箱生成 初始name
      const apiUrl = ruleForm.location === '骑手' ? '/deliver/register' : '/user/register'; // 根据用户类型选择接口

      try {
        const response = await api.post(apiUrl, 
        {
          name,
          email: ruleForm.email,
          code: ruleForm.verificationCode,
          password: ruleForm.pass,
          
        } , 
        {
          headers :{ authorization : 0

          }
        }
      );

        const { code, msg } = response.data;

        if (code === 200) {
          ElMessage.success('注册成功');
          setTimeout(() => {
            router.push('/');
          }, 1000); // 注册成功后跳转到主页
        } else {
          ElMessage.error(msg || '注册失败');
        }
      } catch (error) {
        ElMessage.error('注册请求失败，请检查网络或稍后再试');
      }
    } else {
      console.log('表单验证失败');
    }
  });
};


// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  width: 400px;
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.el-button {
  margin-top: 10px;
}
</style>
