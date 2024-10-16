<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import  { ref }  from 'vue';

const deliverymen = ref([
  {id:1,Name:'张三',email:'zhangsan@163.com',phone:'12345678900',address:'China',delivery_count:10,delivery_complaint_count:2,status:'normal'},
  {id:2,Name:'李四',email:'lisi@163.com',phone:'12345678901',address:'China',delivery_count:10,delivery_complaint_count:2,status:'normal'},
 ])
 
interface delliveryman{
  id: number,
  commentAccount: number,
  badCommentAccount: number,
  deliveryAcount: number,
  status: number,
  telephone: string,
  name: string,
  createTime: string,
  updateTime: string
}
 
 function changeUserToNormal(index : any){
      deliverymen.value[index].status = 'normal'
    }
  function changeUserToDisabled(index : any){
      deliverymen.value[index].status = 'disabled'
  }

</script>
<template>
  <div class="common-layout">
    <el-table :data="deliverymen" style="width: 100%" stripe border="true">
      <el-table-column prop="id" label="骑手ID" sortable />
      <el-table-column prop="Name" label="骑手名" sortable />
      <el-table-column prop="email" label="骑手邮箱" show-overflow-tooltip/>
      <el-table-column prop="phone" label="骑手电话" show-overflow-tooltip/>
      <el-table-column prop="address" label="骑手地址" show-overflow-tooltip/>
      <el-table-column prop="delivery_count" sortable label="骑手商品邮寄总单数" />
      <el-table-column prop="delivery_complaint_count" sortable label="用户投诉总数"/>
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
  background-color: green;
}
</style>