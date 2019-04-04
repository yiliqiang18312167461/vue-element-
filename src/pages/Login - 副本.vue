
<template>
  <el-row type="flex" justify="center" align="middle" class="row_login">
    <el-form :model="form" label-width="60px" class="form">
      <div class="header">登录</div>

      <el-form-item label="账号">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="bth">提交</el-button>
        <el-button @click="onReset" class="bth">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {

      // 获取到form的值
      this.$axios({
        url: "/admin/account/login",
        data: {
          uname: this.form.username,
          upwd: this.form.password
        },
        method: "POST",
        withCredentials: true
      }).then(res => {

        if(res.data.status===0){
          const {status, message} = res.data;
           this.$router.replace({path:'admin'})
           //通过vuex
          this.$store.commit("setUser",{
            username:message.uname,
            realname:message.realname,
          });


        }else{
          console.log(res)
          this.$message({
          showClose: true,
          message: res.data.message,
          type: 'error'
        });
        }
      });
    },

    onReset() {
      // 清空form的数据
      this.form = {
        username: "",
        password: ""
      };
    }
  }
};
</script>

<style>
.row_login {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: darkorange;
}

.row_login .el-form-item__label {
  color: aliceblue;
}

.row_login .el-form-item {
  width: 350px;
  height: 50px;
  text-align: center;
  color: aliceblue;
}

.row_login .header {
  font-size: 25px;
  color: aliceblue;
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding-left: 60px;
  margin-bottom: 20px;
}

.bth{
  width: 48%;
  border: none;
  background: #e6a23c;
  color: aliceblue;
}

.row_login .el-button:hover {
  background: #e6a23c;
  color: aliceblue;
}

</style>
