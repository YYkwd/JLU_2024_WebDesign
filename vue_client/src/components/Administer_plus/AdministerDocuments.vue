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
  arriver_time: string
}

const documents = ref<document[]>([])

onMounted(()=>{
  api.get('http://localhost:9999/admin/orders')
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