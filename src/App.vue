<template>
  <div id="app">
<router-view></router-view>

  </div>
  <!-- 只能有一个根标签 -->
</template>

<script>
export default {
  name: 'app',

  mounted(){//登录验证
   this.$axios({
     url:"http://localhost:8899/admin/account/islogin",
     withCredentials: true
   }).then(res=>{
     if(res.data.code == "nologin"){
      //  console.log(res);
        this.$router.push("/login");
     }
   })

  } 
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
}


</style>
