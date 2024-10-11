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
            /*children:[
                {
                    path:'/Administer/GoodsForSale', //管理员访问路径
                    name:'AdministerGoodsForSale',
                    component: () => import('../components/AdministerGoodsForSale.vue')
                },
                {
                    path:'/Administer/Diliverymen', //管理员访问路径
                    name:'AdministerDiliverymen',
                    component: () => import('../components/AdministerDiliverymen.vue')
                },
                {
                    path:'/Administer/Users', //管理员访问路径
                    name:'AdministerUsers',
                    component: () => import('../components/AdministerUsers.vue')
                },
                {
                    path:'/Administer/Diliverymen', //管理员访问路径
                    name:'AdministerGoods',
                    component: () => import('../components/AdministerDiliverymen.vue')
                },
            ]*/
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