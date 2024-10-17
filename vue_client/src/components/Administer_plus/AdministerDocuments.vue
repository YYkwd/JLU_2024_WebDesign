<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import { ref,onMounted } from 'vue'
import api from '@/api/request'
//引入sotre 以存储管理员（包含authorization）
  import {useAdminStore} from '@/store/admin';
  const  AdminStore = useAdminStore();

interface document{
  id: number,
  purchaseId: number,
  goodsId: number,
  deliverId: number,
  totalPrice: number,
  appealDescription: string,
  appealPhoto: string,
  status: number,
  createTime: string,
  arriveTime: string
}

const documents = ref<document[]>([])

console.log(AdminStore.authorization);
onMounted(()=>{
  api.get('/admin/orders'  , {headers :{ authorization : AdminStore.authorization }})
  .then(res=>{
    console.log(res.data.data)
    documents.value = res.data.data
  })
  .catch(err=>{
    console.log(err)
  })
})

</script>
<template>
  <div class="common-layout">
    <el-button type="primary" @click="()=>{console.log(documents)}">添加</el-button>
    <el-table :data="documents" style="width: 100%" stripe border="true">
      <el-table-column prop="id" label="订单号" width="180" />
      <el-table-column prop="purchaseId" label="购买者ID" width="180" />
      <el-table-column prop="goodsId" label="商品ID" width="180" />
      <el-table-column prop="deliverId" label="配送员ID" width="180" />
      <el-table-column prop="totalPrice" label="总价" width="180" />
      <el-table-column prop="appealDescription" label="评论描述" width="180" />
      <el-table-column prop="appealPhoto" label="评论图片" width="180" />
      <el-table-column prop="status" label="状态" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="arriveTime" label="到达时间" width="180" />
    </el-table>
  </div>
</template>

<style scoped>
    .common-layout{
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: greenyellow;
}
</style>