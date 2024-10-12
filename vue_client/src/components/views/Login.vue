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
          <el-button type="primary" @click="submitForm(ruleFormRef)">
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
import { ElMessage } from 'element-plus'; // 引入 ElMessage

const router = useRouter();

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

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('登录成功！');
      console.log('选中的登录类型:', ruleForm.location); // 输出用户选择的登录类型
      const message = ruleForm.location === '骑手' 
        ? '骑手登录成功' 
        : '用户登录成功';
      ElMessage({
        message: message,
        type: 'success', // 消息类型为成功
        duration: 3000, // 显示时间为 3 秒
      });

      // 延迟 1 秒后跳转到主页
      setTimeout(() => {
        router.push('/'); // 跳转到主页
      }, 1000); // 1000 毫秒 = 1 秒
    } else {
      console.log('登录失败！');
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
