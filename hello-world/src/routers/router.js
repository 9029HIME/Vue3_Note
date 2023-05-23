import RouterA from '../components/RouterA.vue'
import RouterB from '../components/RouterB.vue'
import RouterDynamic from '../components/RouterDynamic.vue'
import RouterDynamicSon from '../components/RouterDynamicSon.vue'
// 从vue-router引入createRouter,createWebHashHistory函数
import { createRouter, createWebHashHistory } from 'vue-router'

// 定义路由结果，/A选择RouterA，/B选择RouterB
const routes = [
    {
        path: '/A',
        component: RouterA
    },
    {
        path: '/B',
        component: RouterB
    },
    {
        path: '/Dynamic/:customerParam',
        name: 'routerDynamic',
        component: RouterDynamic,
        children: [
            {
                name: 'son',
                path: 'son',
                component: RouterDynamicSon
            }
        ],
        beforeEnter:[(to,from)=>{
            console.log(to)
            console.log(from)
            // 默认放行
            return true
        }]
    }
]

// 定义路由器，将路由结果配置到路由器里
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to,from)=>{
    console.log(from)
    console.log(to)
    // 默认放行
    return true
})

// 将自己作为router模块导出去
export default router
