<template>
  <div class="category">
    <el-row type="flex" justify="space-between" style="margin-bottom:10px">
      <el-col>
        <el-button @click="handleToAdd">新增</el-button>
      </el-col>

      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>


  <el-tree :data="[0]" icon-class>
      <div class="custom-tree-node">
        <span>类别</span>
        <span>排序</span>
        <span>操作</span>
      </div>
    </el-tree>
    <!-- 树形控件组件 -->
    <!-- data是数据 -->
    <!-- show-checkbox 前面是否显示选择框 -->
    <!-- default-expand-all默认展开所有 -->
    <!-- expand-on-click-node 如果为false只有在点箭头时候才展开收缩 -->

    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <!-- 当前行数据，是一个对象,row.data才是当前行的数据 -->
     <span class="custom-tree-node" slot-scope="row">
        <span>{{row.data.label}}</span>
        <el-input
          v-model="row.data.sort_id"
          size="mini"
          class="sort-input"
          @change="handleEdit(row.data)"
        ></el-input>
        <span>
          <el-button type="text" size="mini">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },

  methods: {
    // 添加,跳转到添加栏目页
    handleToAdd(){
      this.$router.push("/admin/gategoryAdd");
    },

    // 编辑,data是当前行的数据
    handleEdit(data) {
      this.$axios({
        url: `/admin/category/edit/${data.category_id}`,
        method: "POST",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true,
        data
      }).then(res => {
        console.log(res);
      });
    }
  },


  mounted() {
    // 请求栏目列表的数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
    //    console.log(res);
   
      const { message } = res.data;//获取到数据
      let arr = [];

      // 递归计算栏目是否有children属性
      // arr是一个数组，item是就一条数据
      // item到底是arr下谁的子元素？

      function loop(arr, item) {
        arr.forEach(v => {
          // parent_id是否是父级
          if (v.category_id == item.parent_id) {

            // 把数据添加到父级的children中
            if (!v.children) {
              v.children = [];
            }
            v.children.push({
              ...item,
              id: item.category_id,
              label: item.title
            });
            return;
          }

          // 判断当前arr的子元素还有没children，如果有继续在children里面查找
          // **这个判断是当前递归函数关键**
          if (v.children) {
            loop(v.children, item);
          }
        });
      }
      // 先把parent_id为0的数据添加到一级栏目
      message.forEach(v => {
        if (v.parent_id === 0) {
          arr.push({
            ...v,
            id: v.category_id,
            label: v.title
          });
        } else {
            // 如果不等于0的数据，说明不是一级栏目，
            // 通过递归函数去查找当前这个数据到底是谁的子元素
          loop(arr, v);
        }
      });

    this.data = arr;

    });
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.sort-input {
  width: 80px;
  border: 0;
}


.category .el-input__inner{
border:none;
}

.sort-input >>> .el-input__inner {
  width: 80px;
  height: 22px;
  line-height: 22px;
margin-bottom: 10px;

}
</style>
