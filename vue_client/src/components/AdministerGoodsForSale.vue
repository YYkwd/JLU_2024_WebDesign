<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import  { ref }  from 'vue';

const goods = ref([
  {id:1,name:'商品1',username:'商家1',address:'地址1',phone:'123456789',email:'123456789@qq.com',image:'https://picsum.photos/200/300',category:'类别1',description:'描述1',price:10,status:'onsale',check:'wait'},
  {id:2,name:'商品2',username:'商家2',address:'地址2',phone:'123456789',email:'123456789@qq.com',image:'https://picsum.photos/200/300',category:'类别1',description:'描述1',price:10,status:'normal',check:'pass'}
])

interface good {
  id: number,
  name: string,
  photo: string,
  description: string,
  pre_price: number,
  price: number,
  amount: number,
  sell_id: number,
  create_time: Date,
  update_time: Date,
  status: string,
  is_delete: number,
}

function Agreement(index : any){
  goods.value[index].check = 'pass'
}

function Objection(index : any){
  goods.value[index].check = 'reject'
}
</script>
<template>
  <div class="common-layout">
    <el-table :data="goods" style="width: 100%" stripe border="true">
      <el-table-column prop="id" label="商品ID" sortable />
      <el-table-column prop="name" label="商品名称" sortable show-overflow-tooltip/>
      <el-table-column prop="username" label="商家名" show-overflow-tooltip/>
      <el-table-column prop="address" label="商家地址" show-overflow-tooltip/>
      <el-table-column prop="phone" label="商家电话" show-overflow-tooltip/>
      <el-table-column prop="email" label="商家邮箱" show-overflow-tooltip/>
      <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
        <template #default="scope">
          <img :src="scope.row.image" style="width: 50px; height: 50px;"/>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="商品类别" sortable show-overflow-tooltip/>
      <el-table-column prop="description" label="商品描述" show-overflow-tooltip/>
      <el-table-column prop="price" label="商品价格" sortable />
      <el-table-column prop="status" label="商品状态" sortable >
        <template #default="scope">
          <span v-if="scope.row.status=='onsale'">未售出</span>
          <span v-if="scope.row.status=='normal'">已在售中</span>
          <span v-if="scope.row.status=='soldout'">售罄</span>
        </template>
      </el-table-column>
      <el-table-column prop="check" label="商品审核情况" sortable>
        <template #default="scope">
          <span v-if="scope.row.check=='wait'">待审核</span>
          <span v-if="scope.row.check=='pass'">已通过</span>
          <span v-if="scope.row.check=='reject'">未通过</span>
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