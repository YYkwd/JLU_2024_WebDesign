<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import { ref,onMounted } from 'vue'
import api from '@/api/request'

interface document{
  id: number,
  purchase_id: number,
  goods_id: number,
  deliver_id: number,
  total_price: number,
  appeal_description: string,
  appeal_photo: string,
  status: number,
  create_time: string,
  arrive_time: string
}

const documents = ref<document[]>([])

onMounted(()=>{
  api.get('/admin/orders')
  .then(res=>{
    console.log(res.data)
    documents.value = res.data
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
      <el-table-column prop="purchase_id" label="购买者ID" width="180" />
      <el-table-column prop="goods_id" label="商品ID" width="180" />
      <el-table-column prop="deliver_id" label="配送员ID" width="180" />
      <el-table-column prop="total_price" label="总价" width="180" />
      <el-table-column prop="appeal_description" label="评论描述" width="180" />
      <el-table-column prop="appeal_photo" label="评论图片" width="180" />
      <el-table-column prop="status" label="状态" width="180" />
      <el-table-column prop="create_time" label="创建时间" width="180" />
      <el-table-column prop="arrive_time" label="到达时间" width="180" />
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