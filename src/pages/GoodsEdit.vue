<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类别">
      <el-select v-model="form.category_id" placeholder="请选择所属类别">
        <el-option
          v-for="(item,index) in categorys"
          :label="item.title"
          :key="index"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>
    <el-form-item label="推荐类名">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <!-- action指定上传路径 -->
      <!-- show-file-list 上传多种图片才使用 -->
      <!-- on-success上传成功后的回调函数 -->
      <!-- before-upload 上传之前的事件 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="商品数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
      <!-- list-type="picture-card"卡片多种图片类型
         :on-preview预览图片
      :on-remove删除图片-->
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handlePictureCard"
         :file-list="form.fileList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <el-form-item label="内容描述">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// 1.添加样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// 2.导入组件并且注册局部组件
import { quillEditor } from "vue-quill-editor";
import { setTimeout } from "timers";

export default {
  components: {
    // 编辑器组件
    quillEditor
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "",
      form: {
        category_id: "", // 所属类别id
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [],
        fileList: [],
        content: "",
        zhaiyao: "",
        is_slide: false // 在商品详情中不使用
      },
      //保存类别数据
      categorys: []
    };
  },

  methods: {
    //单图片上传后
    handleAvatarSuccess(res, file) {
      // URL.createObjectURL是html5的新接口，可以用于预览本地图片
      // file.raw路径
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.imgList[0] = res;
    },

    //单图片上传前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //多图片删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //多图预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //多图上传成功
    handlePictureCard(res, file) {
      // console.log(res, file)
      this.form.fileList.push(res);
    },
    //  点击创建时
    onSubmit() {
      // console.log(this.form);
      this.$axios({
       url:  `/admin/goods/edit/${this.$route.params.id}`,
        method: "POST",
        data: this.form,
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        if (status == 0) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "success",
            center: true
          });

          setTimeout(() => {
            this.$message({
              showClose: true,
              message: "跳转成功",
              type: "success",
              center: true
            });
            this.$router.back();
          }, 2000);
        }
      });
    }
  },
  mounted() {

    //请求数据
    this.$axios({
      //获取类别  
      url: "/admin/category/getlist/goods"
    }).then(res => {
      let { message } = res.data;
      this.categorys = message; //存储到data
    });

this.$axios({//根据id拿数据
    url: `/admin/goods/getgoodsmodel/${this.$route.params.id}`
}).then(res=>{
        
        const {message, status} = res.data;
        //返回给from
        this.form=message;
        //预览封面图
        this.imageUrl=message.imgList[0].url;
       //后台接口有bug
          
        this.form.fileList=message.fileList.map(v=>{
          return{
                ...v,//展开数据
               url:`http://127.0.0.1:8899`+v.shorturl
          }
        
        })
        console.log(this.form.fileList)

})

     

  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.ql-toolbar.ql-snow {
  padding: 0;
  line-height: 0px;
}
</style>


