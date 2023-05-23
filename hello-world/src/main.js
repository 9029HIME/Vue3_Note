import { createApp } from 'vue'
import App from './App.vue'
// 引入自定义好的路由器
import router from './routers/router'
import { createStore } from 'vuex'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建store实例
const store = createStore({
    // 可以理解为组件的data()
    state() {
        return {
            totalNum: 0
        }
    },
    // 可以理解为组件的methods
    mutations: {
        increment(state) {
            state.totalNum++
        }
    },
    getters:{
        getterA(state){
            return state.totalNum * 100
        }
    }
})

// 创建model的时候，选择路由器
let app = createApp(App).use(router).use(store).use(ElementPlus)
app.mount('#app')