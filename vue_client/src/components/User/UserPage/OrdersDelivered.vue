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
        <p style="color: green; font-weight: bold; font-size: 16px; letter-spacing: 1px;">
          已送达 | 骑手: {{ item.deliverName }}
        </p>
        <el-button type="primary" @click="openConfirmDialog(item.id)">确认收货</el-button>
        <el-button type="danger" @click="openAppealDialog(item.id)">申诉</el-button>
      </el-card>
      
      <el-loading v-if="loadingMore" text="加载中..." />
    
      <el-dialog
        v-model="confirmDialogVisible"
        title="确认收货"
        width="30%"
      >
        <p>你确认已经收到订单 {{ selectedOrderId }} 吗？确定之后无法申诉退款</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confirmDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmReceipt">确认</el-button>
        </span>
      </el-dialog>
    
      <el-dialog
        v-model="appealDialogVisible"
        title="提交申诉"
        width="30%"
      >
        <el-input type="textarea" v-model="appealReason" placeholder="请填写申诉理由"></el-input>
        <el-upload
          ref="upload"
          action="/upload"
          list-type="picture-card"
          :show-file-list="false"  
          :before-upload="beforeImageUpload"  
          :headers="uploadHeaders"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="已上传的图片" style="width: 100%;" />
          <el-button v-else type="primary">点击上传图片</el-button>
        </el-upload>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过2MB</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="appealDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitAppeal">提交申诉</el-button>
        </span>
      </el-dialog>
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
    deliverName: string;   //配送骑手昵称
  }
  
  // 定义 orders 为 OrderItem 数组类型
  const orders = ref<OrderItem[]>([]);
  const loadingMore = ref(false); // 是否正在加载更多
  
  // 弹窗控制
  const confirmDialogVisible = ref(false);
  const appealDialogVisible = ref(false);
  const selectedOrderId = ref<number | null>(null); // 存储当前订单ID
  const appealReason = ref(''); // 存储用户填写的申诉理由
  
  // 文件上传相关
  const imageUrl = ref(''); // 存储上传的图片URL
  const selectedFile = ref<File | null>(null); // 存储选中的文件
  const uploadHeaders = { authorization: UserStore.authorization };
  
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
      
      // 过滤 status 为 2 的订单，表示已送达的订单
      const filteredOrders = data.filter((order: OrderItem) => order.status === 2);
      console.log("已经送达的订单", filteredOrders);
      if (filteredOrders.length > 0) {
        orders.value = filteredOrders; // 将过滤后的订单赋值给 orders
      } else {
        ElMessage.info('没有已送达的订单');
      }
  
      loadingMore.value = false;
    } catch (error) {
      console.error('获取订单信息失败：', error);
      ElMessage.error('获取订单信息失败');
      loadingMore.value = false;
    }
  };
  
  // 打开确认收货弹窗
  const openConfirmDialog = (orderId: number) => {
    selectedOrderId.value = orderId;
    confirmDialogVisible.value = true;
  };
  
  // 确认收货功能
  const confirmReceipt = async () => {
    if (selectedOrderId.value !== null) {
      try {
        confirmDialogVisible.value = false; // 关闭确认收货弹窗
        // 调用 API，确认订单收货
        const response = await api.put(`/user/ordersOver/${selectedOrderId.value}`, null, {
          headers: {
            authorization: UserStore.authorization
          },
          params: {
            id: selectedOrderId.value
          }
        });
        const { code } = response.data;
        if (code === 200) {
          ElMessage.success('订单已确认收货');
          fetchOrders(); // 重新获取订单
        } else {
          ElMessage.error('确认收货失败');
        }
      } catch (error) {
        console.error('确认收货失败：', error);
        ElMessage.error('确认收货失败');
      }
    }
  };
  
  // 打开申诉弹窗
  const openAppealDialog = (orderId: number) => {
    selectedOrderId.value = orderId;
    appealDialogVisible.value = true;

     // 清空申诉内容和图片
  appealReason.value = '';
  imageUrl.value = '';
  };
  
  // 上传前阻止默认上传并保存文件
  const beforeImageUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
  
    if (!isJPG) {
      ElMessage.error('上传图片格式必须是 JPG 或 PNG 格式!');
      return false;
    }
    if (!isLt2M) {
      ElMessage.error('上传图片大小不能超过 2MB!');
      return false;
    }
  
    // 取消默认上传，保存文件并预览
    selectedFile.value = file;
    imageUrl.value = URL.createObjectURL(file); // 预览图片
    return false; // 阻止自动上传
  };
  
  // 提交申诉功能
  const submitAppeal = async () => {
    if (selectedOrderId.value !== null && appealReason.value && selectedFile.value) {
      try {
        // 创建form-data数据
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            appealDescription : appealReason.value
      })); // 添加申诉理由
        formData.append('file', selectedFile.value); // 添加上传的文件
  
        // 调用 API 提交申诉
        const response = await api.put(`/user/orders/${selectedOrderId.value}`, formData, {
          headers: {
            authorization: UserStore.authorization,
            'Content-Type': 'multipart/form-data',
          }
        });
        const { code } = response.data;
        if (code === 200) {
          ElMessage.success('申诉提交成功');
          appealDialogVisible.value = false; // 关闭申诉弹窗
          appealReason.value = ''; // 清空申诉理由
          imageUrl.value = ''; // 清空图片预览
          selectedFile.value = null; // 清空文件
        } else {
          ElMessage.error('申诉提交失败');
        }
      } catch (error) {
        console.error('提交申诉失败：', error);
        ElMessage.error('提交申诉图片不能为空'); } };
      }
// 初始化加载订单 
onMounted(() => { fetchOrders();  }); 
</script>

<style scoped> .el-card { margin-bottom: 20px; } .el-button { margin-top: 10px; } .el-loading { text-align: center; width: 100%; margin-top: 20px; } </style>
  