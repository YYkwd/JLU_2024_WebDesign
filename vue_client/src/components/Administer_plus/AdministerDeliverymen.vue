<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import  { onMounted,ref }  from 'vue';
import api from '@/api/request'
//引入sotre 以存储管理员（包含authorization）
import {useAdminStore} from '@/store/admin';
import { RefSymbol } from '@vue/reactivity';
const  AdminStore = useAdminStore();

const origin_deliverymen = ref<deliveryman[]>([])
const deliverymen = ref<deliveryman[]>([])
const deliveryman = ref<deliveryman>()
const selected_deliveryman = ref<deliveryman>()
 
interface deliveryman{
  id: number,
  avatarul: string,
  email: string,
  commentAccount: number,
  badCommentAccount: number,
  deliverAcount: number,
  status: number,
  telephone: string,
  name: string,
  createTime: string,
  updateTime: string,
  isDelete: number
}
 
onMounted(()=>{
  api.get('/admin/delivers',{headers:{'Authorization': AdminStore.authorization}})
  .then(res=>{
    console.log(res.data.data)
    origin_deliverymen.value = res.data.data
    deliverymen.value = origin_deliverymen.value
  })
  .catch(err=>{
    console.log(err)
  })
})

 function changeUserToNormal(index : any){
    origin_deliverymen.value[index].status = 0
    deliverymen.value[index].status = 0
    api.put('/admin/delivers/'+deliverymen.value[index].id,{"status":0},{headers:{'Authorization': AdminStore.authorization}})
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  function changeUserToDisabled(index : any){
      origin_deliverymen.value[index].status = 1
      deliverymen.value[index].status = 1
      api.put('/admin/delivers/'+deliverymen.value[index].id,{"status":1},{headers:{'Authorization': AdminStore.authorization}})
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
  }

  const querySearch = (queryString : any, cb : any)=>{
      const results = <deliveryman[]>[]
      if(!queryString) //无内容
    {
      for(let i = 0; i < origin_deliverymen.value.length; i++){
        results.push(origin_deliverymen.value[i])
      }
    }
    else{
      for(let i = 0; i < origin_deliverymen.value.length; i++){
        if(origin_deliverymen.value[i].name.toLowerCase().indexOf(queryString.toLowerCase()) != -1){
          results.push(origin_deliverymen.value[i])
        }
      }
    }
      cb(results)
    }
    const handleSelect = (queryString : any) => {
      selected_deliveryman.value = queryString
    }

    const perform = ()=>{
      deliverymen.value = []
      if(selected_deliveryman.value)
      {
        for(let i = 0; i < origin_deliverymen.value.length; i++){
        if(origin_deliverymen.value[i].name.toLowerCase().indexOf(selected_deliveryman.value.name.toLowerCase()) != -1){
          deliverymen.value.push(origin_deliverymen.value[i])
        }
      }
    }
    }

    const reset = ()=>{
      deliverymen.value = origin_deliverymen.value
    }
</script>
<template>
  <div class="common-layout">
    <el-autocomplete v-model="deliverymancomplaint" value-key="name" class="inline-input w-50" :fetch-suggestions="querySearch" clearable placeholder="输入骑手名" style="width: 200px" @select="handleSelect" @change="reset"></el-autocomplete>
    <el-button type="primary" @click="perform">确定</el-button>
    <el-table :data="deliverymen" style="width: 100%" stripe border="true">
      <el-table-column prop="id" label="骑手ID" sortable />
      <el-table-column prop="name" label="骑手名" sortable />
      <el-table-column prop="avatarurl" label="骑手头像" show-overflow-tooltip>
        <template #default="scope">
          <div style="width: 110px;height: 110px;display: flex;align-items: center;">
          <img :src="scope.row.avatarurl" style="width: 50px;height: 50px;" alt="没有头像"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="骑手邮箱" show-overflow-tooltip/>
      <el-table-column prop="phone" label="骑手电话" show-overflow-tooltip/>
      <el-table-column prop="commentAccount" label="好评数" show-overflow-tooltip/>
      <el-table-column prop="badCommentAccount" label="差评数" show-overflow-tooltip/>
      <el-table-column prop="delivery_count" sortable label="骑手商品邮寄总单数" />
      <el-table-column prop="status" sortable label="用户状态" >
        <template #default="scope">
          <span v-if="scope.row.status==0 && scope.row.isDelete==0">正常</span>
          <span v-if="scope.row.status==1 && scope.row.isDelete==0">封禁中</span>
          <span v-if="scope.row.isDelete==1">已注销</span>
        </template>
      </el-table-column>
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
  background-color: green;
}
</style>