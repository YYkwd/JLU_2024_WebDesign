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
                    path:'Diliverymen', //管理员访问路径
                    name:'AdministerDiliverymen',
                    component: () => import('../components/AdministerDiliverymen.vue')
                },
                {
                    path:'Users', //管理员访问路径
                    name:'AdministerUsers',
                    component: () => import('../components/AdministerUsers.vue')
                },
                {
                    path:'Complaint', //管理员访问路径
                    name:'AdministerComplaint',
                    component: () => import('../components/AdministerComplaint.vue')
                },
                {
                    path:'Exchange', //管理员访问路径
                    name:'AdministerExchange',
                    component: () => import('../components/AdministerExchange.vue')
                },
                {
                    path:'InfoChange', //管理员访问路径
                    name:'AdministerInfoChange',
                    component: () => import('../components/AdministerInfoChange.vue')
                },
            ]
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