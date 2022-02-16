import { createApp } from 'vue';
import App from './SFA.vue';
// import App from './PictureNaming.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.config.productionTip = false
app.use(Antd)
app.mount('#app')