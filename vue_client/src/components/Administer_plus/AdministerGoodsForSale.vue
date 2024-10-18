<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import  { onMounted,ref }  from 'vue';
import api from '@/api/request'
//引入sotre 以存储管理员（包含authorization）
import {useAdminStore} from '@/store/admin';
  const  AdminStore = useAdminStore();

const origin_goods = ref<good[]>([])
const goods = ref<good[]>([])
const good = ref<good>()
const selected_good = ref<good>()

interface good {
  id: number,
  name: string,
  photo: string,
  description: string,
  prePrice: number,
  price: number,
  amount: number,
  sellId: number,
  createTime: Date,
  updateTime: Date,
  status: number,
  isDelete: number,
}

onMounted(()=>{
  api.get('/admin/goods',{headers:{'Authorization': AdminStore.authorization}})
  .then(res=>{
    console.log(res.data.data)
    origin_goods.value = res.data.data
    goods.value = origin_goods.value
  })
  .catch(err=>{
    console.log(err)
  })
})

function Agreement(index : any){
  goods.value[index].status = 1
}

function Objection(index : any){
  goods.value[index].status = -1
}

const querySearch = (queryString : any, cb : any)=>{
      const results = <good[]>[]
      if(!queryString) //无内容
    {
      for(let i = 0; i < origin_goods.value.length; i++){
        results.push(origin_goods.value[i])
      }
    }
    else{
      for(let i = 0; i < origin_goods.value.length; i++){
        if(origin_goods.value[i].name.toLowerCase().indexOf(queryString.toLowerCase()) != -1){
          results.push(origin_goods.value[i])
        }
      }
    }
      cb(results)
    }
    const handleSelect = (queryString : any) => {
      selected_good.value = queryString
    }

    const perform = ()=>{
      goods.value = []
      if(selected_good.value)
      {
        for(let i = 0; i < origin_goods.value.length; i++){
        if(origin_goods.value[i].name.toLowerCase().indexOf(selected_good.value.name.toLowerCase()) != -1){
          goods.value.push(origin_goods.value[i])
        }
      }
    }
    }

    const reset = ()=>{
      goods.value = origin_goods.value
    }
</script>
<template>
  <div class="common-layout">
    <el-autocomplete v-model="good" value-key="name" class="inline-input w-50" :fetch-suggestions="querySearch" clearable placeholder="输入商品名" style="width: 200px" @select="handleSelect" @change="reset"></el-autocomplete>
    <el-button type="primary" @click="perform">确定</el-button>
    <el-table :data="goods" style="width: 100%" stripe border="true">
      <el-table-column prop="id" label="商品ID" sortable />
      <el-table-column prop="name" label="商品名称" sortable show-overflow-tooltip/>
      <el-table-column prop="photo" label="商品图片" sortable />
      <el-table-column prop="description" label="商品描述" sortable show-overflow-tooltip/>
      <el-table-column prop="prePrice" label="商品原价" sortable />
      <el-table-column prop="price" label="商品现价" sortable />
      <el-table-column prop="amount" label="商品数量" sortable />
      <el-table-column prop="sellId" label="商家ID" sortable />
      <el-table-column prop="createTime" label="商品创建时间" sortable />
      <el-table-column prop="updateTime" label="商品更新时间" sortable />
      <el-table-column prop="status" label="商品状态" sortable >
        <template #default="scope">
          <span v-if="scope.row.status=='onsale'">未售出</span>
          <span v-if="scope.row.status=='normal'">已在售中</span>
          <span v-if="scope.row.status=='soldout'">售罄</span>
        </template>
      </el-table-column>
      <el-table-column prop="action" fixed="right" label="审核操作" >
        <template #default="scope">
          <el-button type="primary" size="mini" @click="Agreement(scope.$index)" v-if="!(scope.row.check=='pass') && scope.row.status=='onsale'">通过</el-button>
          <el-button type="danger" size="mini" @click="Objection(scope.$index)" v-if="!(scope.row.check=='reject') && scope.row.status=='onsale'">驳回</el-button>
          <span v-if="!(scope.row.status=='onsale')">禁用操作</span>
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
  background-color: yellow;
}
</style>