<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';
import { ref } from 'vue'

const goodscomplaint = ref(
  [
    {id:1,name:'商品1',username:'骑手1',userid:1,image:'https://img.alicdn.com/imgextra/i3/O1CN01KXJYZq1K7Z',category:'食品',description:'好吃',price:10,status:'onsale',complaintuserid:1,complaintusername:'用户1',complainttime:'2023-05-01',complaintcontent:'好吃',complaintimage:'https://img.alicdn.com/imgextra/i3/O1CN01KXJYZq1K7Z',userrespound:'无',complaintstatus:'wait'}
    ,{id:2,name:'商品2',username:'骑手2',userid:2,image:'https://img.alicdn.com/imgextra/i3/O1CN01KXJYZq1K7Z',category:'食品',description:'好吃',price:10,status:'onsale',complaintuserid:2,complaintusername:'用户2',complainttime:'2023-05-02',complaintcontent:'好吃',complaintimage:'https://img.alicdn.com/imgext/O1CN01KXJYZq1K7Z',userrespound:'无',complaintstatus:'pass'}
  ]
)

interface deliverymencomplaint{
    id:number,
    comment_id:number,
    type: number,
    status:number,
    degree:number,
    goods_id:number,
    users_id:number,
    create_time:string,
    update_time:string,
    is_delete:number
}

interface deliveryman {
  id: number;
  name: string;
  username: string;
  password: string;
  phone: string;
  commentNumber: number;
  badCommentNumber: number;
  deliveryNumber: number;
  createdTime: Date;
  updatedTime: Date;
  isDelete: number;
  status: number;
}

function Agreement(index : any){
  goodscomplaint.value[index].complaintstatus='pass'
}

function Objection(index : any){
  goodscomplaint.value[index].complaintstatus='reject'
}

</script>
<template>
  <div class="common-layout">
    <el-table :data="goodscomplaint" style="width: 100%" stripe border="true">
      <el-table-column prop="id" label="商品ID" />
      <el-table-column prop="name" label="商品名称" show-overflow-tooltip/>
      <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
        <template #default="scope">
          <img :src="scope.row.image" style="width: 50px; height: 50px;"/>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="商品类别" show-overflow-tooltip/>
      <el-table-column prop="description" label="商品描述" show-overflow-tooltip/>
      <el-table-column prop="price" label="商品价格" />
      <el-table-column prop="status" label="商品状态" >
        <template #default="scope">
          <span v-if="scope.row.status=='onsale'">未售出</span>
          <span v-if="scope.row.status=='normal'">已在售中</span>
          <span v-if="scope.row.status=='soldout'">售罄</span>
        </template>
      </el-table-column>
      <el-table-column prop="userid" label="骑手ID" show-overflow-tooltip/>
      <el-table-column prop="username" label="骑手名" show-overflow-tooltip/>
      <el-table-column prop="complaintuserid" label="投诉用户ID" show-overflow-tooltip/>
      <el-table-column prop="complaintusername" label="投诉用户名" show-overflow-tooltip/>
      <el-table-column prop="complainttime" label="投诉时间" show-overflow-tooltip/>
      <el-table-column prop="complaintcontent" label="投诉内容" show-overflow-tooltip/>
      <el-table-column prop="complaintimage" label="投诉图片" show-overflow-tooltip>
        <template #default="scope">
          <img :src="scope.row.image" style="width: 50px; height: 50px;"/>
        </template>
      </el-table-column>
      <el-table-column prop="userrespound" label="骑手申诉" show-overflow-tooltip/>
      <el-table-column prop="complaintstatus" label="投诉状态" >
        <template #default="scope">
          <span v-if="scope.row.complaintstatus=='wait'">待处理</span>
          <span v-if="scope.row.complaintstatus=='pass'">已处理</span>
          <span v-if="scope.row.complaintstatus=='reject'">已驳回</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="Agreement(scope.$index)" v-if="scope.row.complaintstatus=='wait'">通过</el-button>
          <el-button type="danger" size="mini" @click="Objection(scope.$index)" v-if="scope.row.complaintstatus=='wait'">驳回</el-button>
          <span v-if="scope.row.complaintstatus=='pass'">已处理</span>
          <span v-if="scope.row.complaintstatus=='reject'">已驳回</span>
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
  background-color: violet;
}
</style>