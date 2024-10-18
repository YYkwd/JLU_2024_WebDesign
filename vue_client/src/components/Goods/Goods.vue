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
  status: number,
  isDelete: number,
}
    
const origin_goods = ref<good[]>([])
const goods = ref<good[]>([])
const good = ref<good>()
const selected_good = ref<good>()

onMounted(()=>{
  /*api.get('/goods',{headers:{'Authorization': AdminStore.authorization}}).then(res=>{
    goods.value = res.data
  }).catch(err=>{
    console.log(err)
  })*/
 origin_goods.value = [
  {id:1,name:'good1',photo:'',description:'芝士雪豹',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:2,name:'good2',photo:'',description:'芝士鳕堡',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:3,name:'good3',photo:'',description:'这是我们的义务',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:4,name:'good4',photo:'',description:'我阐述你的梦',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:5,name:'good5',photo:'',description:'冲刺冲刺冲刺冲',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:6,name:'good6',photo:'',description:'不是哥们',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:7,name:'good7',photo:'',description:'兄弟兄弟',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:8,name:'good8',photo:'',description:'霜华满天',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:9,name:'good9',photo:'',description:'恭恭敬敬磕大头',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:10,name:'good10',photo:'',description:'潜伏在西方的中国人',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:11,name:'good11',photo:'',description:'要给他迎头痛击',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:12,name:'good12',photo:'',description:'不利于团结的话不要说',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:13,name:'good13',photo:'',description:'三句话让男人为我花十八万',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:14,name:'good14',photo:'',description:'这河里吗',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:15,name:'good15',photo:'',description:'这恒河里',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:16,name:'good16',photo:'',description:'你被骗了',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:17,name:'good17',photo:'',description:'罕见',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0},
  {id:18,name:'good18',photo:'',description:'你看这哪有瓜',prePrice:1,price:2,amount:3,sellId:4,createTime:new Date(),updateTime:new Date(),status:1,isDelete:0}
 ]
 goods.value = origin_goods.value
 console.log(goods.value.length)
})

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
    
    function getpagenumber(){
      return Math.ceil(goods.value.length/12)
    }

    const currentpage = ref(1)

    const handleCurrentChange = (val : number) => {
      currentpage.value = val
    }
</script>

<template>
  <el-autocomplete v-model="good" value-key="name" class="searchzone" :fetch-suggestions="querySearch" clearable placeholder="输入商品名" style="width: 200px" @select="handleSelect" @change="reset"></el-autocomplete>
  <el-button type="primary" @click="perform">确定</el-button>
  <div class="common-layout">
    <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 0]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 0].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 0].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 1]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 1].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 1].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 2]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 2].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 2].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 3]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 3].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 3].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
  </el-row>

  <el-row class="interval"/>
  
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 4]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 4].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 4].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 5]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 5].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 5].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 6]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 6].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 6].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 7]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 7].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 7].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
  </el-row>
  
  <el-row class="interval"/>
  
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 8]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 8].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 8].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 9]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 9].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 9].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 10]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 10].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 10].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content" >
        <el-card shadow="hover" style="height: 100%;width: 100%;" v-if="goods[(currentpage - 1) * 12 + 11]">
          <template #header>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 11].name }}</span>
          </template>
          <p>这是卡片体</p>
          <template #footer>
            <span style="font-size: 30px;">{{ goods[(currentpage - 1) * 12 + 11].description }}</span>
          </template>
        </el-card>
      </div>
    </el-col>
  </el-row>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-count=getpagenumber()
    :current-page=currentpage
    @current-change="handleCurrentChange"
  />
  
  </div>
</template>


<style scoped>
.common-layout{
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: aliceblue;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background-color: aliceblue;
}
.searchzone{
  margin-left: 20px;
  background-color: aliceblue;
}
.interval{
  height: 20px;
}
</style>