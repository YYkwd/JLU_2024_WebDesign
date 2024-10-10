<script setup lang="ts">
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
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
  background-color: red;
}

.base-layout{
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: skyblue;
}
.header-layout{
  height: 60px;
  width:100%;
  margin: 0px;
  padding: 0px;
  /*background-color: #c6e2ff;*/
}
.body-layout{
  width: 100%;
  flex-grow: 1;
  margin: 0px;
  padding: 0px;
  align-items: center;
  justify-content: center;
  background-color: skyblue
}
.footer-layout{
  width:100%;
  margin: 0px;
  padding: 0px;
  background-color: black;
}
.col-center-left{
  display: flex;
  align-items: center;
  background-color: #d9ecff;
}
.col-center-center{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9ecff;
}
.carousel-center
{
  height: 100%;
  text-align: center;
}

</style>
