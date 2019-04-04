
<template>
<div class="header">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    style="background:none;border:none"
  >
    <el-menu-item @click="handleClick">
      <i class="el-icon-back"></i>
    </el-menu-item>
 
    <el-menu-item>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in routeInfo" :key="index"  style="line-height:60px;font-size:16px">{{item}}</el-breadcrumb-item>
  
  </el-breadcrumb>
    </el-menu-item>
    
    <el-menu-item style="float:right;">
      <i class="el-icon-error" @click="logout" title="退出登录"></i>
    </el-menu-item>
    <el-menu-item style="float:right;">
 <i class="el-icon-mobile-phone" ></i>{{user.username}} {{user.realname}}
     
    </el-menu-item>
    <el-menu-item style="float:right;" title="更多" >
      <i class="el-icon-menu"></i>
    </el-menu-item>
    <el-menu-item style="float:right">
      
      <el-input placeholder="请输入内容"  class="el_head_input">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-menu-item>
  </el-menu>
  </div>
</template>


<script>
//导入vuex数据
import {mapState} from "vuex";


export default {
  data() {
    return { 
      activeIndex: "1",
      activeIndex2: "1"
    };
  },

  methods: {
    handleClick() {
         
      this.$emit("changeShow");
    },
    logout(){
       this.$axios({
        url:"/admin/account/logout",
        withCredentials: true
       }).then(res=>{
         if(res.data.status === 0){
          this.$router.replace("/login");
         }
       })
    }
  },
  computed: {
        ...mapState({
      // key的值自己定义的属性，在页面根据这个值来渲染
      // “user”是vuex中定义的属性
      user: "user",

    }),
    //面包屑组件的数据
    routeInfo: function() {
      var arr = this.$route.matched.map(v => {
        return v.meta;
      });
      return arr;
    }
  }
};
</script>


<style>

.header{
height: 60px;
overflow: hidden;
}
.header .el-header li.el-menu-item{
height: 60px;
overflow: hidden;
}

.el-header li.el-menu-item:hover{
background:none !important;
}

.el-header li.el-menu-item:focus{
background:none !important;
}


.el_head_input>input{
  background:none;
  border: none;
    border-bottom: 1px rgb(173, 168, 168) solid;
    border-radius: 0;
}

</style>
