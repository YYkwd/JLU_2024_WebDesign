<script setup lang="ts">
    import ElementPlus from 'element-plus'
    import 'element-plus/dist/index.css'
    import { RouterLink,RouterView } from 'vue-router';
    import { ref,onMounted } from 'vue'
    import api from '@/api/request'
    //引入sotre 以存储管理员（包含authorization）
  import {useAdminStore} from '@/store/admin';
  const  AdminStore = useAdminStore();

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
  status: string,
  isDelete: number,
}
    
const origin_goods = ref<good[]>([])
const goods = ref<good[]>([])
const good = ref<good>()
const selected_good = ref<good[]>([])

onMounted(()=>{
  /*api.get('/goods',{headers:{'Authorization': AdminStore.authorization}}).then(res=>{
    goods.value = res.data
  }).catch(err=>{
    console.log(err)
  })*/
 origin_goods.value = [
  {id:1,name:'good1',photo:'',description:'',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:'',isDelete:0},
  {id:2,name:'good2',photo:'',description:'',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:'',isDelete:0},
  {id:3,name:'good3',photo:'',description:'',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:'',isDelete:0},
  {id:4,name:'good4',photo:'',description:'',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:'',isDelete:0},
  {id:5,name:'good5',photo:'',description:'',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:'',isDelete:0},
  {id:6,name:'good6',photo:'',description:'',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:'',isDelete:0},
  {id:7,name:'good7',photo:'',description:'',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:'',isDelete:0},
 ]
 goods.value = origin_goods.value
})

const handleAdd = ()=>{
  console.log('add')
}

</script>

<template>
  <div class="common-layout">
    
  </div>
</template>


<style scoped>
    .common-layout{
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: brown;
}
</style>