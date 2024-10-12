import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const router = createRouter({
    history : createWebHistory(), //路由器的工作模式
    routes : [ //一个个的路由规则
        {
            path:'/Administer', //管理员访问路径
            name:'Administer',
            component: () => import('../components/Administer.vue')
            ,
            children:[
                {
                    path:'GoodsForSale', //管理员访问路径
                    name:'AdministerGoodsForSale',
                    component: () => import('../components/AdministerGoodsForSale.vue')
                },
                {
                    path:'Deliverymen', //管理员访问路径
                    name:'AdministerDeliverymen',
                    component: () => import('../components/AdministerDeliverymen.vue')
                },
                {
                    path:'Users', //管理员访问路径
                    name:'AdministerUsers',
                    component: () => import('../components/AdministerUsers.vue')
                },
                {
                    path:'GoodsComplaint', //管理员访问路径
                    name:'AdministerGoodsComplaint',
                    component: () => import('../components/AdministerGoodsComplaint.vue')
                },
                {
                    path:'DeliverymenComplaint', //管理员访问路径
                    name:'AdministerDeliverymenComplaint',
                    component: () => import('../components/AdministerDeliverymenComplaint.vue')
                },
                {
                    path:'Documents', //管理员访问路径
                    name:'AdministerDocuments',
                    component: () => import('../components/AdministerDocuments.vue')
                },
                {
                    path:'InfoChange', //管理员访问路径
                    name:'AdministerInfoChange',
                    component: () => import('../components/AdministerInfoChange.vue')
                },
            ]
            
        },
        //登录界面
        {
            path: '/login',
            name: 'Login',
            component: () => import('../components/views/Login.vue'), // 动态导入 Login 组件
          },
          //注册界面
          {
            path: '/register',
            name: 'Register',
            component: () => import('../components/views/Register.vue'), // 动态导入 Register 组件
          },
        {
            path:'/', 
            name:'Home',
            component: () => import('../components/Home.vue')
        },

        

    ],
})

//暴露出去
export default router