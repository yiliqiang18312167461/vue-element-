

<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo menu_th"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h1>logo</h1>
    <el-submenu :index="`${index+1}`" v-for="(item,index) in meuns" :key="`${index+1}`">
      <template slot="title" class="kk">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </template>
      <el-menu-item
        :index="`${index + 1}-${subIndex + 1}`"
        v-for="(subItem, subIndex) in item.group"
        :key="`${subIndex}`"
      >
        <template slot="title">
          <router-link :to="subItem.path">{{subItem.title}}</router-link>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>



<script>
export default {
  data() {
    return {
      meuns: [
        {
          icon: "el-icon-menu",
          title: "购物商城",
          group: [{ path: "/admin/gategoryList", title: "网站总览" }]
        },
        {
          icon: "el-icon-star-off",
          title: "商品管理",
          group: [
            { path: "/admin/goodsList", title: "商品列表" },
            { path: "/admin/GoodsAdd", title: "新增商品" }
          ]
        },
        {
          icon: "el-icon-news",
          title: "栏目管理",
          group: [{ path: "/admin/gategoryList", title: "栏目列表" },
          { path: "/admin/GategoryAdd", title: "新增栏目" }
          ]
        },
        {
          icon: "el-icon-service",
          title: "会员管理",
          group: [{ path: "/admin/userList", title: "会员列表" },
          { path: "/admin/userList", title: "新增会员" },      
          ]
        },
        {
          icon: "el-icon-info",
          title: "网站设置",
          group: [{ path: "/admin/userList", title: "轮播图" }]
        }
      ]
    };
  },

  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  },
  //組件可以接收的外部屬性
  props: ["isCollapse"]
};
</script>


<style>
h1 {
  line-height: 90px;

  margin-bottom: 20px;
  border-bottom: #eee 1px solid;
  color: #3c4858;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  margin: 0 15px;
}

.menu_th {
  height: 100%;
  color: #3c4858;
}

.menu_th .el-submenu__title,
.menu_th .el-menu-item {
  height: 50px;
  border-radius: 3px;
  text-align: left;
}

.menu_th .el-submenu__title:hover i {
  color: #fff;
}

.menu_th .el-submenu__title i {
  display: inline-block;
  margin-right: 10px;
}

.menu_th .el-submenu__title:hover {
  background-color: #9c27b0;
  box-shadow: 0 12px 20px -10px rgba(156, 39, 176, 0.28),
    0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2);
  color: #fff;
}


.menu_th .el-submenu:nth-of-type(1) .el-submenu__title{
  background-color: #9c27b0;
  box-shadow: 0 12px 20px -10px rgba(156, 39, 176, 0.28),
    0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2);
  color: #fff;
}

.menu_th .el-submenu:nth-of-type(1) i{
  background-color: #9c27b0;
  box-shadow: 0 12px 20px -10px rgba(156, 39, 176, 0.28),
    0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2);
  color: #fff;
}


.menu_th .el-menu-item:hover {
  background-color: #9c27b0;
  box-shadow: 0 12px 20px -10px rgba(156, 39, 176, 0.28),
    0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2);
  color: #fff;
}


.menu_th .el-menu-item:hover a {
  color: #fff;
}

.el-aside {
  box-shadow: 0 30px 30px -12px rgba(0, 0, 0, 0.42),
    0 30px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  z-index: 99;
}

a {
  text-decoration: none;
}
</style>


