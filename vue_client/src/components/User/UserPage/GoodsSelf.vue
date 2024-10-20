<template>
     <div 
    ref="scrollContainer" 
    style="height: 80vh; overflow-y: auto; display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;"
  >
      <el-card 
        v-for="(item, index) in goods" 
        :key="item.id" 
        shadow="hover"
        style="width: 300px;"
      >
        <img :src="item.photo" alt="商品图片" style="width: 100%; height: 200px; object-fit: cover;" />
        <h3 style="margin: 10px 0;">{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p>价格: {{ item.price }} 元</p>
        <p>余量: {{ item.amount }} 件</p>
        <el-tag v-if="item.status === 1" type="success" style="margin-bottom: 10px;">
        通过审核
      </el-tag>

      <!-- 审核通过，显示购买按钮或售罄 -->
      <div v-if="item.status === 1">
        <el-button v-if="item.amount > 0" type="primary" @click="openDialog(item)">
          修改
        </el-button>
        <el-button v-else type="danger" disabled>
          售罄
        </el-button>
      </div>

      <!-- 其他状态的商品 -->
      <el-tag v-else-if="item.status === 0" type="info">
        正在审核
      </el-tag>

      <el-tag v-else-if="item.status === 2" type="danger">
        未通过审核
      </el-tag>
      
      </el-card>
      
      <!-- 购买弹窗 -->
      <el-dialog 
        v-model="dialogVisible" 
        title="确认购买"
        width="30%">
        <p>购买商品: {{ selectedGoods?.name }}</p>
        <el-input-number 
          v-model="purchaseCount" 
          :min="1" 
          label="数量"
          style="margin: 20px 0;" 
        />
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmPurchase">确认购买</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import api from '@/api/request'; // 导入封装好的axios实例
  import { useUserStore } from '@/store/user'; // user store库
  
  console.log("查看用户发布的商品界面");
  const UserStore = useUserStore(); // 调用以获取该用户的authorization
  // 定义 scrollContainer 用于绑定滚动容器
const scrollContainer = ref<HTMLElement | null>(null);
  // 定义商品接口
  interface GoodsItem {
    id: number;
    name: string;
    photo: string;
    description: string;
    price: number;
    sellId: number;
    amount : number ;
    status : number ;
  }
  
  // 定义goods为GoodsItem数组类型
  const goods = ref<GoodsItem[]>([]);
  const dialogVisible = ref(false); // 控制弹窗显示
  const selectedGoods = ref<GoodsItem | null>(null); // 存储选中的商品
  const purchaseCount = ref(1); // 购买数量
  
  onMounted(async () => {
    try {
      // 获取用户数据的API请求
      const response = await api.get('/user/selfGoods', {
        headers: {
          authorization: UserStore.authorization // pinia里面存储的用户的authorization
        }
      });
  
      const data = response.data.data;
      goods.value = data; // 将获取到的数据赋值给goods
      console.log("用户上传的商品信息", data);
    } catch (error) {
      console.error('获取用户商品信息失败：', error);
      ElMessage.error('获取用户商品信息失败');
    }
  });
  
  // 打开购买弹窗
  const openDialog = (item: GoodsItem) => {
    console.log("检查item" , item);
    selectedGoods.value = item;
    console.log("检查selectedGoods" ,selectedGoods.value.sellId);
    purchaseCount.value = 1; // 重置购买数量
    dialogVisible.value = true;
  };
  
  // 确认购买操作
  const confirmPurchase = async () => {
    if (selectedGoods.value){ 
      try {
        const response = await api.post('/user/purchase', {
          goodsId: selectedGoods.value.id,
          sellId: selectedGoods.value.sellId,
          count: purchaseCount.value
        }, {
          headers: {
            authorization: UserStore.authorization
          }
        });
        console.log(response);
        const { code, msg, data } = response.data;

        if (code == 200) {
          ElMessage.success(`购买 ${selectedGoods.value.name} 成功`);
            dialogVisible.value = false;
        } else {
          ElMessage.error(`购买失败: ${msg}`);
        }
      } catch (error) {
        console.error('购买失败：', error);
        ElMessage.error('购买失败，请稍后重试');
      }
    }
  };
  </script>
  
  <style scoped>
  /* 暂时没有需要添加的样式*/
  </style>
  