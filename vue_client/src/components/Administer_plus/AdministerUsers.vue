<script setup lang="ts">
import  { ref }  from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';

const users = ref([
  {id:'1',Name:'user1',email:'user1@gmail.com',phone:'12345678900',address:'China',purchase_count:'10',purchase_total:'$100',sale_count:'5',sale_total:'$50',complaint_count:'2',be_complaint_count:'5',exchange_count:'1',be_exchanged_count:'1',status: 'normal'}
  ,{id:'2',Name:'user2',email:'user2@gmail.com',phone:'12345678901',address:'China',purchase_count:'20',purchase_total:'$200',sale_count:'10',sale_total:'$100',complaint_count:'3',be_complaint_count:'5',exchange_count:'2',be_exchanged_count:'0',status: 'disabled'}
])

interface User{
  id:number;
  Name:string;
  password:string;
  avatarurl:string;
  phone:string;
  email:string;
  address:string;
  description:string;
  purchase_count:number;
  purchase_total:number;
  sale_count:number;
  sale_total:number;
  complaint_count:number;
  be_complaint_count:number;
  exchange_count:number;
  be_exchanged_count:number;
  status:number;
  create_time:Date;
  update_time:Date;
  is_delete:number;
}

    function changeUserToDisabled(index : any){
      users.value[index].status = 'disabled'
    }
    
    function changeUserToNormal(index : any){
      users.value[index].status = 'normal'
    }

</script>

<script lang="ts">

export default {
  
};
</script>
<template>
  <div class="common-layout">
    <el-table :data="users" style="width: 100%" stripe border="true">
      <el-table-column prop="id" label="用户ID" sortable />
      <el-table-column prop="Name" label="用户名" sortable />
      <el-table-column prop="email" label="用户邮箱" show-overflow-tooltip/>
      <el-table-column prop="phone" label="用户电话" show-overflow-tooltip/> 
      <el-table-column prop="address" label="用户地址" show-overflow-tooltip/>
      <el-table-column prop="purchase_count" sortable label="商品购买总数" />
      <el-table-column prop="purchase_total" sortable label="商品购买总额"/>
      <el-table-column prop="sale_count" sortable label="商品售出总数"/>
      <el-table-column prop="sale_total" sortable label="商品售出总额"/>
      <el-table-column prop="complaint_count" sortable label="用户投诉总数"/>
      <el-table-column prop="be_complaint_count" sortable label="用户被投诉总数"/>
      <el-table-column prop="exchange_count" sortable label="用户退换货次数"/>
      <el-table-column prop="be_exchanged_count" sortable label="用户被退换货次数"/>
      <el-table-column prop="status" sortable label="用户状态" >
        <template #default="scope">
          <span v-if="scope.row.status=='normal'">正常</span>
          <span v-if="scope.row.status=='disabled'">封禁中</span>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button type="danger" size="mini"  v-if="scope.row.status=='normal'" @click.native="() => {changeUserToDisabled(scope.$index)}">封禁</el-button>
          <el-button type="primary" size="mini"  v-if="scope.row.status=='disabled'" @click.native="() => {changeUserToNormal(scope.$index)}">解封</el-button>
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