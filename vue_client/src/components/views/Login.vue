<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">用户登录</h2>
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
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="登录类型" prop="location">
          <el-segmented v-model="ruleForm.location" :options="locationOptions" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLoginForm(ruleFormRef)">
            登录
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">
            重置
          </el-button>
          <el-button type="success" @click="goToHome">
            回退
          </el-button>
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
import api from '@/api/request' ;// 导入封装号的axios实例 ， 以应对跨域问题

//引入sotre 以存储普通用户/骑手的全局信息（包含authorization）
import {useUserStore} from '@/store/user';
import {useDeliverStore}  from '@/store/deliver' ;
const  UserStore = useUserStore();
const  DeliverStore = useDeliverStore();

//console.log(UserStore);  //验证
const router = useRouter();

//返回到主页
const goToHome = () => {
  router.push('/');
}

const locationOptions = ['骑手', '用户'] // 选择的登录类型

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  email: '', // 添加邮箱字段
  pass: '',
  location: '',
});

// 验证邮箱格式的规则
const validateEmail = (rule: any, value: any, callback: any) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 邮箱正则表达式
  if (!value) {
    callback(new Error('请输入邮箱'));
  } else if (!emailPattern.test(value)) {
    callback(new Error('邮箱格式不正确'));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    callback(); // 验证通过
  }
};

const rules = reactive<FormRules<typeof ruleForm>>({
  email: [{ validator: validateEmail, trigger: 'blur' }], // 邮箱验证规则
  pass: [{ validator: validatePass, trigger: 'blur' }],
  location: [
    {
      required: true,
      message: '请选择登录类型',
      trigger: 'change',
    },
  ],
});

const submitLoginForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return; // 如果表单不存在则返回

  formEl.validate(async (valid) => {
    if (valid) {
      // 根据选择的用户类型确定请求的 URL 地址
      const apiUrl = ruleForm.location === '骑手' ? '/deliver/login' : '/user/login';

      try {
        // 发送 POST 请求，传递邮箱、密码和授权字段
        const response = await api.post(apiUrl, 
        {//请求体
          email: ruleForm.email,
          password: ruleForm.pass,
          
        },
      {
        headers : {authorization: '0'} , 
      });

        // 从响应数据中解构出状态码、消息和用户信息
        const { code, msg, data } = response.data;

        console.log('完整响应数据:', response);

        if (code === 200) {
          // 登录成功，弹出提示信息
          ElMessage.success('登录成功');

          console.log('登录用户信息:', data); // 打印用户/骑手信息用于调试

          // 根据用户类型，将 authorization 存储到对应的 Store
          if (ruleForm.location === '骑手') {
            // 更新骑手 Store
            DeliverStore.authorization = data;
          } else {
            // 更新用户 Store
            UserStore.authorization = data;
          }

          // 根据用户类型跳转到不同页面
          const redirectRoute = ruleForm.location === '骑手' ? '/deliver_menu' : '/user_menu';
          
          // 1 秒后跳转到对应页面
          setTimeout(() => {
            router.push(redirectRoute); // 跳转到指定路由
          }, 1000);
        } else {
          // 登录失败，弹出错误信息
          ElMessage.error(msg || '登录失败');
        }
      } catch (error) {
        // 捕获请求错误并弹出错误提示
        ElMessage.error('登录请求失败，请检查网络或稍后再试');
      }
    } else {
      // 表单验证失败的日志
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
  height: 100vh;
}

.login-card {
  width: 400px;
}

.login-title { /* 添加样式以美化标题 */
  text-align: center;
  margin-bottom: 20px; /* 增加标题与表单之间的间距 */
  font-size: 24px; /* 调整标题字体大小 */
}
</style>
