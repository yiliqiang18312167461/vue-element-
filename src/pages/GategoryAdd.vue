<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类别">
      <el-select v-model="form.category_id" placeholder="请选择所属类别">
        <el-option
          v-for="(item, index) in categorys"
          :key="index"
          :label="item.title"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="排序数字">
      <el-input v-model="form.sort_id"></el-input>
    </el-form-item>

    <el-form-item label="类别名称">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="类别级别">
      <el-input v-model="form.class_layer"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
     return{
     form:{
       category_id:"",
       sort_id:"",
       title:"",
       class_layer:""
     },
     categorys:[],
     }

//  /admin/category/getlist/:tablename

  },
 
 mounted:function(){//获取所需的数据
  this.$axios({
     url: "/admin/category/getlist/goods"
  
  }).then(res=>{

          const {message}=res.data;
         this.categorys =message;

  })



 },
  methods: {
    onSubmit() {//点击添加
        this.$axios({
        url:"/admin/category/add/goods",
        method:"POST",
        data:this.form,
       withCredentials: true     
        }).then(res=>{
     if(res.data.status==0){
       this.$message({
          message: '恭喜你，添加成功',
          type: 'success',
          center:true,
        });
       
      //  返回上一级
       let that=this;
       setTimeout(function(){
        that.$router.back();
       },2000);
     }
        })



    }
  }
};
</script>