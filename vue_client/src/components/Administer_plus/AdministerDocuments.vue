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

const origin_documents = ref<document[]>([])
const documents = ref<document[]>([])
const document = ref<document>()
const selected_document = ref<document>()

console.log(AdminStore.authorization);
onMounted(()=>{
  api.get('/admin/orders'  , {headers :{ authorization : AdminStore.authorization }})
  .then(res=>{
    console.log(res.data.data)
    origin_documents.value = res.data.data
    documents.value = origin_documents.value
  })
  .catch(err=>{
    console.log(err)
  })
})

const querySearch = (queryString : any, cb : any)=>{
      const results = <document[]>[]
      if(!queryString) //无内容
    {
      for(let i = 0; i < origin_documents.value.length; i++){
        results.push(origin_documents.value[i])
      }
    }
    else{
      for(let i = 0; i < origin_documents.value.length; i++){
        if(origin_documents.value[i].appealDescription.toLowerCase().indexOf(queryString.toLowerCase()) != -1){
          results.push(origin_documents.value[i])
        }
      }
    }
      cb(results)
    }
    const handleSelect = (queryString : any) => {
      selected_document.value = queryString
    }

    const perform = ()=>{
      documents.value = []
      if(selected_document.value)
      {
        for(let i = 0; i < origin_documents.value.length; i++){
        if(origin_documents.value[i].appealDescription.toLowerCase().indexOf(selected_document.value.appealDescription.toLowerCase()) != -1){
          documents.value.push(origin_documents.value[i])
        }
      }
    }
    }

    const reset = ()=>{
      documents.value = origin_documents.value
    }

</script>
<template>
  <div class="common-layout">
    <el-autocomplete v-model="document" value-key="name" class="inline-input w-50" :fetch-suggestions="querySearch" clearable placeholder="输入账单描述" style="width: 200px" @select="handleSelect" @change="reset"></el-autocomplete>
    <el-button type="primary" @click="perform">确定</el-button>
    <el-table :data="documents" style="width: 100%" stripe border="true">
      <el-table-column prop="id" label="订单号" width="180" />
      <el-table-column prop="purchaseId" label="购买者ID" width="180" />
      <el-table-column prop="goodsId" label="商品ID" width="180" />
      <el-table-column prop="deliverId" label="配送员ID" width="180" />
      <el-table-column prop="totalPrice" label="总价" width="180" />
      <el-table-column prop="appealDescription" label="评论描述" width="180" />
      <el-table-column prop="appealPhoto" label="评论图片" width="180" >
        <template #default="scope">
          <div style="width: 110px;height: 110px;display: flex;align-items: center;">
          <img :src="scope.row.appealPhoto" width="50px" height="50px" alt="没有图片">
          </div>
        </template>
      </el-table-column>
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