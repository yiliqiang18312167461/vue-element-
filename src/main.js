import Vue from 'vue'
import App from './App.vue'

//1引入element-ui
import ElementUI from 'element-ui';

//2引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

//引入axios
import axios from 'axios';

//引入路由模块
import VueRouter from "vue-router";

//引入组件
import Login from "./pages/Login.vue" ;
import Admin from "./pages/Admin.vue";
import GategoryList from "./pages/GategoryList.vue";
import GoodsList from "./pages/GoodsList.vue";
import UserList from "./pages/UserList.vue"
import GoodsAdd from "./pages/GoodsAdd.vue";
import GoodsEdit from "./pages/GoodsEdit.vue"
import GategoryAdd from "./pages/GategoryAdd.vue"

import store from "./store/index.js"
//全局注册组件
Vue.use(ElementUI);

// 注册路由
Vue.use(VueRouter);

// 阻止启动生产消息，常用作指令。
Vue.config.productionTip = true;

//把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;

//设置axios的基础url
axios.defaults.baseURL="http://localhost:8899";


//路由配置
const routes=[
{path:"/",redirect:"/admin"},
{path:"/login",component:Login,meta:"登录"},
{path:"/admin",component:Admin,meta:"后台管理系统",children:[
  {path:"gategoryList",component:GategoryList,meta:"商品列表"},
  {path:"goodsList",component:GoodsList,meta:"栏目列表"},
  {path:"goodsAdd",component:GoodsAdd,meta:"新增商品"},
  {path:"goodsEdit/:id",component:GoodsEdit,meta:"编辑商品"},
  {path:"userList",component:UserList,meta:"会员列表"},
  {path:"gategoryAdd",component:GategoryAdd,meta:"新增栏目"}
]},
]

// 路由对象
const router = new VueRouter({routes});




new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
