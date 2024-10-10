import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const router = createRouter({
    history : createWebHistory(), //路由器的工作模式
    routes : [ //一个个的路由规则
        {
            path:'/Adminster/:id', //管理员访问路径
            name:'Adminster',
            component: defineAsyncComponent(() => import('../components/Administer.vue'))
        },
    ]
})

//暴露出去
export default router