<script setup lang="ts">
    import ElementPlus from 'element-plus'
    import 'element-plus/dist/index.css'
    import { RouterLink,RouterView } from 'vue-router';
    import { ref,onMounted } from 'vue'
    import api from '@/api/request'

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
    
const goods = ref<good[]>([])

onMounted(()=>{
  api.get('/goods').then(res=>{
    goods.value = res.data
  })
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