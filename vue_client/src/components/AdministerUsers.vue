<script setup lang="ts">
import  { reactive }  from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';

const users = [
  {id:'1',Name:'user1',email:'user1@gmail.com',purchase_count:'10',purchase_total:'$100',sale_count:'5',sale_total:'$50',complaint_count:'2',exchange_count:'1',status: 'normal'}
  ,{id:'2',Name:'user2',email:'user2@gmail.com',purchase_count:'20',purchase_total:'$200',sale_count:'10',sale_total:'$100',complaint_count:'3',exchange_count:'2',status: 'disabled'}
]
</script>

<script lang="ts">

export default {
  methods: {
    changeUserToDisabled(){
      
    },
    changeUserToNormal(){
      
    }
  }
};
</script>
<template>
  <div class="common-layout">
    <el-table :data="users" style="width: 100%" stripe border="true">
      <el-table-column prop="id" label="用户ID" />
      <el-table-column prop="Name" label="用户名" />
      <el-table-column prop="email" label="用户邮箱" show-overflow-tooltip/>
      <el-table-column prop="purchase_count" label="商品购买总数" />
      <el-table-column prop="purchase_total" label="商品购买总额"/>
      <el-table-column prop="sale_count" label="商品售出总数"/>
      <el-table-column prop="sale_total" label="商品售出总额"/>
      <el-table-column prop="complaint_count" label="用户投诉总数"/>
      <el-table-column prop="exchange_count" label="用户退换货次数"/>
      <el-table-column prop="status" label="用户状态" >
        <template #default="scope">
          <span v-if="scope.row.status=='normal'">正常</span>
          <span v-if="scope.row.status=='disabled'">封禁中</span>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button type="danger" size="mini"  v-if="scope.row.status=='normal'" @click="changeUserToDisabled()">封禁</el-button>
          <el-button type="primary" size="mini"  v-if="scope.row.status=='disabled'" @click="changeUserToNormal()">解封</el-button>
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