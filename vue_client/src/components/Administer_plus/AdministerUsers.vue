<script setup lang="ts">
import { ref,onMounted } from 'vue'
import api from '@/api/request'
import ElementPlus, { inputEmits } from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
//引入sotre 以存储管理员（包含authorization）
import {useAdminStore} from '@/store/admin';
  const  AdminStore = useAdminStore();

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
  purchaseCount:number;
  purchaseAccount:number;
  saleCount:number;
  saleAccount:number;
  complaintCount:number;
  complaintedCount:number;
  exchangeCount:number;
  exchangedCount:number;
  status:number;
  createTime:Date;
  updateTime:Date;
  isDelete:number;
}

  const origin_users = ref<User[]>([])
  const users = ref<User[]>([])
  const user = ref<User>()
  const selected_user = ref<User>()

  onMounted(()=>{
  api.get('/admin/users',{headers:{'Authorization': AdminStore.authorization}})
  .then(res=>{
    console.log(res.data.data)
    origin_users.value = res.data.data
    users.value = origin_users.value
  })
  .catch(err=>{
    console.log(err)
  })
})

  
    function changeUserToDisabled(index : any){
      origin_users.value[index].status = 1
      users.value[index].status = 1
    }
    
    function changeUserToNormal(index : any){
      origin_users.value[index].status = 0
      users.value[index].status = 0
    }

    const querySearch = (queryString : any, cb : any)=>{
      const results = <User[]>[]
      if(!queryString) //无内容
    {
      for(let i = 0; i < origin_users.value.length; i++){
        results.push(origin_users.value[i])
      }
    }
    else{
      for(let i = 0; i < origin_users.value.length; i++){
        if(origin_users.value[i].name.toLowerCase().indexOf(queryString.toLowerCase()) != -1){
          results.push(origin_users.value[i])
        }
      }
    }
      cb(results)
    }
    const handleSelect = (queryString : any) => {
      selected_user.value = queryString
    }

    const perform = ()=>{
      users.value = []
      if(selected_user.value)
      {
        for(let i = 0; i < origin_users.value.length; i++){
        if(origin_users.value[i].name.toLowerCase().indexOf(selected_user.value.name.toLowerCase()) != -1){
          users.value.push(origin_users.value[i])
        }
      }
    }
    }

    const reset = ()=>{
      users.value = origin_users.value
    }

</script>

<template>
  <div class="common-layout">
    <el-autocomplete v-model="user" value-key="name" class="inline-input w-50" :fetch-suggestions="querySearch" clearable placeholder="输入用户名" style="width: 200px" @select="handleSelect" @change="reset"></el-autocomplete>
    <el-button type="primary" @click="perform">确定</el-button>
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
      <el-table-column prop="purchaseCount" sortable label="商品购买总数" />
      <el-table-column prop="purchaseTotal" sortable label="商品购买总额"/>
      <el-table-column prop="saleCount" sortable label="商品出售总数" />
      <el-table-column prop="saleTotal" sortable label="商品出售总额"/>
      <el-table-column prop="complaintCount" sortable label="用户评论总数"/>
      <el-table-column prop="complaintedCount" sortable label="用户被评论总数"/>
      <el-table-column prop="exchangeCount" sortable label="用户退换货总数"/>
      <el-table-column prop="exchangedCount" sortable label="用户被退换货总数"/>
      <el-table-column prop="status" sortable label="用户状态" >
        <template #default="scope">
          <span v-if="scope.row.status==0 && scope.row.isDelete==0">正常</span>
          <span v-if="scope.row.status==1 && scope.row.isDelete==0">封禁中</span>
          <span v-if="scope.row.isDelete==1">已注销</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" sortable label="创建时间" width="180"></el-table-column>
      <el-table-column prop="updateTime" sortable label="更新时间" width="180"></el-table-column>
      <el-table-column prop="action" label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button type="danger" size="mini"  v-if="scope.row.status==0 && scope.row.isDelete==0" @click.native="() => {changeUserToDisabled(scope.$index)}">封禁</el-button>
          <el-button type="primary" size="mini"  v-if="scope.row.status==1 && scope.row.isDelete==0" @click.native="() => {changeUserToNormal(scope.$index)}">解封</el-button>
          <span v-if="scope.row.isDelete==1">已注销</span>
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