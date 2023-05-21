import { createApp } from 'vue'
import App from './App.vue'
// 引入自定义好的路由器
import router from './routers/router'

// 创建model的时候，选择路由器
let app = createApp(App).use(router)
app.mount('#app')