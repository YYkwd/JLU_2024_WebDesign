<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';

interface sellercomplaint{
    id:number,
    commentId:number,
    type: number,
    status:number,
    degree:number,
    goodsId:number,
    usersId:number,
    createTime:string,
    updateTime:string,
    isDelete:number
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
  background-color: grey;
}
</style>