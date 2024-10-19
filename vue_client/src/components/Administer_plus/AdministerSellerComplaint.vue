<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import  { onMounted,ref }  from 'vue';
import api from '@/api/request'
//引入sotre 以存储管理员（包含authorization）
import {useAdminStore} from '@/store/admin';
  const  AdminStore = useAdminStore();

const origin_sellerscomplaint = ref<sellercomplaint[]>([])
const sellerscomplaint = ref<sellercomplaint[]>([])
const sellercomplaint = ref<sellercomplaint>()
const selected_sellercomplaint = ref<sellercomplaint>()
  
interface sellercomplaint{
    id:number,
    commentId:number,
    degree:number,
    deliverId:number,
    goodsId:number,
    usersId:number,
    avatarUrl:string,
    description:string,
    status:number,
    createTime:string,
    updateTime:string,
    isDelete:number
}

onMounted(()=>{
  api.get('/admin/comments',{headers:{'Authorization': AdminStore.authorization}})
  .then(res=>{
    console.log(res.data.data)
    origin_sellerscomplaint.value = res.data.data
    for(let i = 0; i < origin_sellerscomplaint.value.length; i++){
      if(origin_sellerscomplaint.value[i].usersId > 0)
      sellerscomplaint.value.push(origin_sellerscomplaint.value[i])
    }
    origin_sellerscomplaint.value = sellerscomplaint.value
  })
  .catch(err=>{
    console.log(err)
  })
})
const querySearch = (queryString : any, cb : any)=>{
      const results = <sellercomplaint[]>[]
      if(!queryString) //无内容
    {
      for(let i = 0; i < origin_sellerscomplaint.value.length; i++){
        results.push(origin_sellerscomplaint.value[i])
      }
    }
    else{
      for(let i = 0; i < origin_sellerscomplaint.value.length; i++){
        if(origin_sellerscomplaint.value[i].name.toLowerCase().indexOf(queryString.toLowerCase()) != -1){
          results.push(origin_sellerscomplaint.value[i])
        }
      }
    }
      cb(results)
    }
    const handleSelect = (queryString : any) => {
      selected_sellercomplaint.value = queryString
    }

    const perform = ()=>{
      sellerscomplaint.value = []
      if(selected_sellercomplaint.value)
      {
        for(let i = 0; i < origin_sellerscomplaint.value.length; i++){
        if(origin_sellerscomplaint.value[i].name.toLowerCase().indexOf(selected_sellercomplaint.value.name.toLowerCase()) != -1){
          sellerscomplaint.value.push(origin_sellerscomplaint.value[i])
        }
      }
    }
    }

    const reset = ()=>{
      sellerscomplaint.value = origin_sellerscomplaint.value
    }
function Agreement(index : any){
  origin_sellerscomplaint.value[index].status=1
  sellerscomplaint.value[index].status=1
  api.put('/admin/comments/'+sellerscomplaint.value[index].id,{"status":1},{headers:{'Authorization': AdminStore.authorization}})
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  })
}

function Objection(index : any){
  origin_sellerscomplaint.value[index].status=2
  sellerscomplaint.value[index].status=2
  api.put('/admin/comments/'+sellerscomplaint.value[index].id,{"status":2},{headers:{'Authorization': AdminStore.authorization}})
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  })
}

</script>
<template>
  <div class="common-layout">
    <el-autocomplete v-model="sellercomplaint" value-key="description" class="inline-input w-50" :fetch-suggestions="querySearch" clearable placeholder="输入描述" style="width: 200px" @select="handleSelect" @change="reset"></el-autocomplete>
    <el-button type="primary" @click="perform">确定</el-button>
    <el-table :data="sellerscomplaint" style="width: 100%" stripe border="true" height="600px">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="commentId" label="评论ID" />
      <el-table-column prop="degree" label="评分" />
      <el-table-column prop="usersId" label="卖家ID" />
      <el-table-column prop="avatarUrl" label="评论图片" show-overflow-tooltip>
        <template #default="scope">
          <img :src="scope.row.avatarUrl" style="width: 50px; height: 50px;" alt="没有图片"/>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="评论描述" show-overflow-tooltip/>
      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip/>
      <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip/>
      <el-table-column prop="status" label="评论状态" >
        <template #default="scope">
          <span v-if="scope.row.status==0">待处理</span>
          <span v-if="scope.row.status==1">已通过</span>
          <span v-if="scope.row.status==2">已驳回</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="Agreement(scope.$index)" v-if="scope.row.status==0">通过</el-button>
          <el-button type="danger" size="mini" @click="Objection(scope.$index)" v-if="scope.row.status==0">驳回</el-button>
          <span v-if="scope.row.complaintstatus==1">已通过</span>
          <span v-if="scope.row.complaintstatus==2">已驳回</span>
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
  background-color: grey;
}
</style>