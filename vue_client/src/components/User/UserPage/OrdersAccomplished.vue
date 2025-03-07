<template>
  <div 
    ref="scrollContainer" 
    style="height: 80vh; overflow-y: auto; display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;"
  >
    <el-card 
      v-for="(item, index) in orders" 
      :key="item.id" 
      shadow="hover"
      style="width: 300px;"
    >
      <h3 style="margin: 10px 0;">订单编号: {{ item.id }}</h3>
      <p>商品ID: {{ item.goodsId }}</p>
      <p>购买数量: {{ item.count }} 件</p>
      <p>总价格: {{ item.totalPrice }} 元</p>
      <p>到达时间: {{ item.arriveTime }}</p>
      <p>创建时间: {{ item.createTime }}</p>
      <p style="color: #808080; font-weight: bold; font-size: 16px; letter-spacing: 1px;">
        已完成
      </p>
      
      <!-- 评价按钮 -->
      <el-button type="primary" @click="startEvaluation(item)">评价</el-button>

      <!-- 评价对话框 -->
      <el-dialog :visible.sync="dialogVisible" width="30%" title="订单评价">
        <template v-if="step === 1">
          <p>请对用户进行评价：</p>
          <el-rate v-model="userRating" />
          <el-button @click="nextStep" type="primary" style="margin-top: 20px;">下一步</el-button>
        </template>

        <template v-if="step === 2">
          <p>请对骑手进行评价：</p>
          <el-rate v-model="deliverRating" />
          <el-button @click="nextStep" type="primary" style="margin-top: 20px;">下一步</el-button>
        </template>

        <template v-if="step === 3">
          <p>请对商品进行评价：</p>
          <el-rate v-model="goodsRating" />
          <el-button type="primary" @click="submitEvaluation" style="margin-top: 20px;">提交</el-button>
        </template>
      </el-dialog>
    </el-card>

    <el-loading v-if="loadingMore" text="加载中..." />
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api/request'; // 导入封装好的axios实例
import { useUserStore } from '@/store/user'; // 调用用户的store获取authorization

const UserStore = useUserStore(); // 获取用户的authorization

// 定义订单接口
interface OrderItem {
  id: number;            // 订单编号
  goodsId: number;       //商品编号
  count: number;         //待送商品数目
  totalPrice: number;    //总价格
  arriveTime: string;    //订单送达时间
  createTime: string;    //订单创建时间
  purchaseId: number;    //购买者ID
  sellId: number;        //卖家ID
  status: number;        //订单状态
  deliverName: string;    //配送骑手昵称
}

// 定义 orders 为 OrderItem 数组类型
const orders = ref<OrderItem[]>([]);
const loadingMore = ref(false); // 是否正在加载更多

// 评价相关的状态
const dialogVisible = ref(false); // 控制评价对话框是否显示
const userRating = ref(0); // 用户评价分数
const deliverRating = ref(0); // 骑手评价分数
const goodsRating = ref(0); // 商品评价分数
const step = ref(1); // 当前评价步骤，1: 用户，2: 骑手，3: 商品

// 获取订单数据
const fetchOrders = async () => {
  try {
    loadingMore.value = true;
    // 获取所有订单数据的API请求
    const response = await api.get('/user/orders', {
      headers: {
        authorization: UserStore.authorization // 获取用户的token
      }
    });

    const data = response.data.data;
    
    // 过滤 status 为 7 的订单 // 获取已经完成还未评论的订单
    const filteredOrders = data.filter((order: OrderItem) => order.status === 7);
    if (filteredOrders.length > 0) {
      orders.value = filteredOrders; // 将过滤后的订单赋值给 orders
    } else {
      ElMessage.info('没有已经完成待评论的订单');
    }

    loadingMore.value = false;
  } catch (error) {
    ElMessage.error('获取订单信息失败');
    loadingMore.value = false;
  }
};

// 初始化评价
const startEvaluation = (item: OrderItem) => {
  // 重置所有评价分数
  console.log("Hello");
  userRating.value = 0;
  deliverRating.value = 0;
  goodsRating.value = 0;
  step.value = 1; // 重置到第一步
  dialogVisible.value = true; // 显示评价对话框
};

// 进入下一步的逻辑
const nextStep = () => {
  if (step.value < 3) {
    step.value += 1; // 进入下一步
  }
};

// 提交评价的处理逻辑
const submitEvaluation = () => {
  ElMessage.success('评价提交成功！');
  dialogVisible.value = false; // 关闭评价对话框
};

// 初始化加载订单
onMounted(() => {
  fetchOrders(); // 第一次加载订单
});
</script>

<style scoped>
.el-card {
  margin-bottom: 20px;
}

.el-button {
  margin-top: 10px;
}

.el-loading {
  text-align: center;
  width: 100%;
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
}
</style>
