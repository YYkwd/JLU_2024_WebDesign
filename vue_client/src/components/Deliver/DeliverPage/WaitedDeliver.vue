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
      <el-button type="primary" @click="grabOrder(item)">
        抢单
      </el-button>
    </el-card>

    <!-- 抢单确认弹窗 -->
    <el-dialog 
      v-model="dialogVisible" 
      title="确认抢单"
      width="30%"
    >
      <p>确认抢单，订单编号: {{ selectedOrder?.id }}</p>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmGrab">确认抢单</el-button>
      </template>
    </el-dialog>
    
    <!-- 加载更多订单时的加载动画 -->
    <el-loading v-if="loadingMore" text="加载中..." />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import api from '@/api/request'; // 导入封装好的axios实例
import { useDeliverStore } from '@/store/deliver'; // 调用用户的store获取authorization

const UserStore = useDeliverStore(); // 获取用户的authorization

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
}

// 定义 orders 为 OrderItem 数组类型
const orders = ref<OrderItem[]>([]);
const dialogVisible = ref(false); // 控制抢单弹窗显示
const selectedOrder = ref<OrderItem | null>(null); // 存储选中的订单
const loadingMore = ref(false); // 是否正在加载更多

// 定义 scrollContainer 用于绑定滚动容器
const scrollContainer = ref<HTMLElement | null>(null);

// 获取订单数据
const fetchOrders = async () => {
  try {
    loadingMore.value = true;
    // 获取所有订单数据的API请求
    const response = await api.get('/deliver/orders', {
      headers: {
        authorization: UserStore.authorization // 获取用户的token
      }
    });

    const data = response.data.data;
    console.log("当前获得的订单", data);
    
    if (data.length > 0) {
      orders.value = data; // 一次性将所有数据赋值给 orders
    } else {
      ElMessage.info('没有订单数据');
    }
    loadingMore.value = false;
  } catch (error) {
    console.error('获取订单信息失败：', error);
    ElMessage.error('获取订单信息失败');
    loadingMore.value = false;
  }
};

// 打开抢单弹窗
const grabOrder = (item: OrderItem) => {
  selectedOrder.value = item;
  dialogVisible.value = true;
};

// 确认抢单操作
const confirmGrab = async () => {
  if (selectedOrder.value) {
    try {
      const response = await api.put(`/deliver/orders/${selectedOrder.value.id}`, {
        orderId: selectedOrder.value.id,
        goodsId: selectedOrder.value.goodsId,
        purchaseId: selectedOrder.value.purchaseId
      }, {
        headers: {
          authorization: UserStore.authorization
        }
      });

      const { code, msg } = response.data;

      if (code == 200) {
        ElMessage.success(`抢单成功, 订单编号: ${selectedOrder.value.id}`);
        dialogVisible.value = false;
      } else {
        ElMessage.error(`抢单失败: ${msg}`);
      }
    } catch (error) {
      console.error('抢单失败：', error);
      ElMessage.error('抢单失败，请稍后重试');
    }
  }
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
</style>
