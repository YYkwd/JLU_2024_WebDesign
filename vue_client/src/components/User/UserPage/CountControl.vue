<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';

// 响应式数据，用于绑定密码输入框
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

// 修改密码的函数
const handlePasswordChange = () => {
  if (newPassword.value !== confirmPassword.value) {
    ElMessage({
      message: '两次输入的密码不一致',
      type: 'error',
    });
    return;
  }
  // 模拟密码修改请求，可以替换为实际的 API 调用
  ElMessageBox.confirm(
    '确认要修改密码吗？',
    '修改密码',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: '密码修改成功!',
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消修改',
    });
  });
};

// 注销账号的函数
const handleAccountDelete = () => {
  ElMessageBox.confirm(
    '注销账号将无法恢复，确认要继续吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: '账号已注销',
    });
    // 在这里可以调用 API 执行注销操作
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '操作已取消',
    });
  });
};
</script>

<template>
  <div class="account-control-layout">
    <el-card class="box-card">
      <h2>账号管理</h2>

      <!-- 修改密码部分 -->
      <div class="password-section">
        <el-form>
          <el-form-item label="当前密码">
            <el-input v-model="currentPassword" type="password" placeholder="请输入当前密码" />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="newPassword" type="password" placeholder="请输入新密码" />
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="confirmPassword" type="password" placeholder="请再次输入新密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePasswordChange">修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 账号注销部分 -->
      <div class="account-delete-section">
        <el-divider></el-divider>
        <el-button type="danger" @click="handleAccountDelete">注销账号</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.account-control-layout {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.password-section {
  margin-bottom: 20px;
}

.account-delete-section {
  margin-top: 20px;
}
</style>
