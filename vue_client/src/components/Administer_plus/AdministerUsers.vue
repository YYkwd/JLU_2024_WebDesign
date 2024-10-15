<script setup lang="ts">
import { ref,onMounted } from 'vue'
import api from '@/api/request'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';

interface User{
  id:number;
  role:number;
  name:string;
  password:string;
  avatarurl:string;
  telephone:string;
  email:string;
  location:string;
  description:string;
  purchase_count:number;
  purchase_account:number;
  sale_count:number;
  sale_account:number;
  complaint_count:number;
  complainted_count:number;
  exchange_count:number;
  exchanged_count:number;
  status:number;
  create_time:Date;
  update_time:Date;
  is_delete:number;
}

  const users = ref<User[]>([])

  onMounted(()=>{
  api.get('/admin/users')
  .then(res=>{
    console.log(res.data.data)
    users.value = res.data.data
  })
  .catch(err=>{
    console.log(err)
  })
})
  
    function changeUserToDisabled(index : any){
      users.value[index].status = 1
    }
    
    function changeUserToNormal(index : any){
      users.value[index].status = 0
    }

</script>

<script lang="ts">

export default {
  
};
</script>
<template>
  <div class="common-layout">
    <el-table :data="users" style="width: 100%" stripe border="true">
      <el-table-column prop="id" sortable label="用户ID" width="180"></el-table-column>
      <el-table-column prop="role" sortable label="用户角色" width="180">
        <template #default="scope">
          <span v-if="scope.row.role==0">普通用户</span>
          <span v-if="scope.row.role==1">管理员</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" sortable label="用户名" width="180"></el-table-column>
      <el-table-column prop="avatarurl" sortable label="用户头像" show-overflow-tooltip></el-table-column>
      <el-table-column prop="email" sortable label="用户邮箱" show-overflow-tooltip></el-table-column>
      <el-table-column prop="telephone" sortable label="用户电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="location" sortable label="用户地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" sortable label="用户描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="purchase_count" sortable label="商品购买总数" />
      <el-table-column prop="purchase_total" sortable label="商品购买总额"/>
      <el-table-column prop="sale_count" sortable label="商品出售总数" />
      <el-table-column prop="sale_total" sortable label="商品出售总额"/>
      <el-table-column prop="complaint_count" sortable label="用户评论总数"/>
      <el-table-column prop="complainted_count" sortable label="用户被评论总数"/>
      <el-table-column prop="exchange_count" sortable label="用户退换货总数"/>
      <el-table-column prop="exchanged_count" sortable label="用户被退换货总数"/>
      <el-table-column prop="status" sortable label="用户状态" >
        <template #default="scope">
          <span v-if="scope.row.status==0 && scope.row.is_delete==0">正常</span>
          <span v-if="scope.row.status==1 && scope.row.is_delete==0">封禁中</span>
          <span v-if="scope.row.is_delete==1">已注销</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" sortable label="创建时间" width="180"></el-table-column>
      <el-table-column prop="update_time" sortable label="更新时间" width="180"></el-table-column>
      <el-table-column prop="is_delete" sortable label="用户是否注销账户" width="180">
        <template #default="scope">
          <span v-if="scope.row.status==0">正常</span>
          <span v-if="scope.row.status==1">已注销</span>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button type="danger" size="mini"  v-if="scope.row.status=='normal' && scope.row.is_delete==0" @click.native="() => {changeUserToDisabled(scope.$index)}">封禁</el-button>
          <el-button type="primary" size="mini"  v-if="scope.row.status=='disabled' && scope.row.is_delete==0" @click.native="() => {changeUserToNormal(scope.$index)}">解封</el-button>
          <span v-if="scope.row.is_delete==1">已注销</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
    .common-layout{
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: goldenrod;
}
</style>