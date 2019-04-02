<template>
    <div>
       <el-breadcrumb separator-class="el-icon-arrow-right">

  <el-breadcrumb-item v-for="(item,index) in routeInfo" :key="index">{{item}}</el-breadcrumb-item>

</el-breadcrumb> 
    </div>
</template>

<script>
export default {

//由于路由信息是会发生变化，通过监听$route来更新面包屑组件的数据

computed :{
    //面包屑组件的数据
  routeInfo:function(){
    var arr =this.$route.matched.map(v=>{
        return v.meta;
    })
    return arr;
  }

}



}
</script>

<style>

</style>
