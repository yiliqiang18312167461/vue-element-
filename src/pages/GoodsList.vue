<template>
  <div>
    <el-row type="flex" justify="space-between" style="margin-bottom:10px">
      <el-col>
        <el-button
          @click="handelSearch"
          type="success"
          style="background: linear-gradient(60deg, #66bb6a, #43a047);
    box-shadow: 0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2);
}"
        >新增</el-button>
        <el-button
          type="danger"
          @click="handleDeletes"
          style="    background: linear-gradient(60deg, #ef5350, #e53935);
    box-shadow: 0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)"
        >批量删除</el-button>
      </el-col>

            <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchvalueCache" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handelSearchbtn"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-table
      ref="multipleTable"
      :data="tableData"
      class="good_table"
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="20"></el-table-column>
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column label="预览图" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.imgurl" alt width="60">
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="sub_title" label="商品名" width="240"></el-table-column>
      <el-table-column prop="sell_price" label="价钱" width="100"></el-table-column>

      <el-table-column prop="add_time" label="新增时间" width="220"></el-table-column>

      <el-table-column label="操作" width="240" style="text-align:center">
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            style="background: linear-gradient(60deg, #ffa726, #fb8c00);
    box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            style="background: linear-gradient(60deg, #ef5350, #e53935);
    box-shadow: 0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!-- size-change改变条数时候触发 -->
    <!-- current-change 改变页数时候触发 -->
    <!-- current-page当前页数 -->
    <!-- layout 是界面排序 -->
    <!-- total是总条数，总条数的值是接口返回 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[4, 8, 12, 16]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
      style="margin-top:20px"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格列表的数据
      tableData: [],
      multipleSelection: [],
      currentPage4: 1,
      pageIndex: 1, //当前页码
      pageSize: 4, //每一页多少行
      searchvalue: "", //搜索
      total: 0, //总条数
      ids: [],
     // 用于当做搜索内容的缓存，在点击搜索按钮把值赋给searchvalue
      searchvalueCache: "",
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    handleSizeChange(val) {
      //展示多少条
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      //根据索引翻页
      this.pageIndex = val;
      this.getList();
    },
    handleEdit(index, row) {
      //编辑
      this.$router.push(`/admin/goodsEdit/${row.id}`);
      console.log(row.id)
    },

    handelSearch() {
      //跳转新增
      this.$router.push("/admin/goodsAdd");
    },
    handleDelete(aa, bb) {
      //单条删除
      this.$axios({
        url: `/admin/goods/del/${bb.id}`,
        withCredentials: true
      }).then(res => {
        this.getList();
      });
    },

handelSearchbtn(){
  //搜索框
      this.searchvalue = this.searchvalueCache;
      this.pageIndex = 1;
      this.getList();

},
    getList() {
      //加载数据
      this.$axios({
        url: "/admin/goods/getlist",
        // params相当于post请求的data
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchvalue: this.searchvalue
        }
      }).then(res => {
        this.tableData = res.data.message;
        this.total = res.data.totalcount; //总条数
      });
    },

    handleDeletes() {
      //多选删除
      this.$axios({
        url: `/admin/goods/del/${this.ids.join(",")}`,
        withCredentials: true
      }).then(res => {
        this.getList();
      });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      //点击多选触发
      this.multipleSelection = val;
      let ids = val.map(v => {
        return v.id;
      });
      this.ids = ids;
    }
  }
};
</script>

<style>
.el-table__header-wrapper {
  height: 70px;
  line-height: 50px;
}

.cell .el-button {
  width: 45%;
  border: none;
  background: #9c27b0;
  color: aliceblue;
}

.el-pagination {
  text-align: center;
}
</style>
