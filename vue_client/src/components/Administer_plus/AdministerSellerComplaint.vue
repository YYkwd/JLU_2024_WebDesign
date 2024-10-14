<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { RouterLink,RouterView } from 'vue-router';

interface sellercomplaint{
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