<template>
  <el-container>
    <el-aside width="auto" class="admin_css">
      <Menu :isCollapse="isCollapse"></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header @changeShow="changeShow"></Header>
      </el-header>
      <el-main>
  <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入固定的组件
import Header from "../components/Header";
import Menu from "../components/Menu";
import Breakcrumb from "../components/Breakcrumb";

export default {
  data() {
    return {
      // 控制菜单的显示，true是收起，false是展开
      isCollapse: false
    };
  },

  // 注册组件
  components: {
    Header,
    Menu,
  },

  methods: {
    // 切换菜单显示,给头部组件调用
    changeShow() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style>
#app > .el-container {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #eee;
}

.admin_css .el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.admin_css {
  background-color: #d3dce6;
  text-align: center;
  line-height: 200px;
}

.admin_css .el-main {
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-aside {
  background-color: #fff;
}
.el-aside ul {
  border: none;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
