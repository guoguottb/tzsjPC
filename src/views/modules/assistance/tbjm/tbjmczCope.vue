// 提交省厅操作模块
<template>
  <div class="g-box">
    <div class="createBox">
      <span>上传金民时间</span>
      <el-date-picker v-model="createTime"
                      type="datetime"
                      placeholder="选择同步时间"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      readonly="">
      </el-date-picker>
      <el-button type="primary"
                 @click="createTBData"
                 icon="el-icon-search">生成同步数据</el-button>
    </div>
    <div style="margin-top:60px"></div>
    <!-- 查询 -->
    <div class="search">
      <el-form :inline="true"
               class="demo-form-inline"
               label-width="110px">
        <el-form-item label="同步月份">
          <el-input v-model="month"
                    placeholder="同步月份"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="status"
                    placeholder="状态"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="type"
                    placeholder="类型"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary"
                   @click="queryListByCriteria"
                   icon="el-icon-search">查询</el-button>

        <el-button type="info"
                   @click="resetQuery"
                   icon="el-icon-refresh">
          重置</el-button>
      </div>
    </div>
    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              border
              style="width: auto"
              @selection-change="handleSelectionChange"
              height="100%"
              v-loading="loading">
      <el-table-column type="selection"
                       width="40px"> </el-table-column>
      <!-- <el-table-column prop="id" label="id" width="100px"></el-table-column> -->
      <el-table-column prop="id"
                       label="批次编号"
                       width="100px"> </el-table-column>
      <el-table-column prop="basicId"
                       label="社救家庭ID"
                       width="120px"> </el-table-column>
      <el-table-column prop="copyId"
                       label="家庭固化ID"
                       width="120px"></el-table-column>
      <el-table-column prop="month"
                       label="同步月份"
                       width="100px"></el-table-column>
      <el-table-column prop="reason"
                       label="同步失败原因"
                       width="130px"> </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       width="80px"> </el-table-column>
      <el-table-column prop="type"
                       label="类型"
                       width="120px"> </el-table-column>

      <el-table-column prop="active"
                       fixed="right"
                       label="操作"
                       width="250px">

        <template slot-scope="scope">
          <el-button-group :inline="true"
                           style="width=100% ">
            <el-button @click="handleClick(scope.row,'新增')"
                       type="primary"
                       size="small">新增</el-button>
            <el-button @click="handleClick(scope.row,'变更')"
                       type="primary"
                       size="small">变更</el-button>
            <el-button @click="handleClick(scope.row,'注销')"
                       type="primary"
                       size="small">注销</el-button>
            <el-button @click="handleClick(scope.row,'删除')"
                       type="danger"
                       size="small">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block footer">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pageNo"
                     :page-size="pageSize"
                     :total="count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";
import { Loading } from "element-ui";
export default {
  data () {
    return {
      createTime: '',	 //
      tableData: [],	 //列表数据

      count: null, 	 //总数
      loading: true,	 //加载状态

      //请求参数------- 
      month: '',		//	同步月份
      status: '',		//	状态：未同步,成功,失败
      type: '',		//	类型：新增，修改，注销
      pageNo: 1,		//	第几页
      pageSize: 20,	//	每页条数
    };
  },

  components: {
    // commonList,
  },
  created () {
    this.loadData()
  },
  methods: {

    createTBData () {
      console.log(this.createTime);
      if (this.createTime == '') {
        this.$message.error('请选择同步时间')
      } else {

        request({
          headers: {
            Accept: "application/json",
          },
          url: "/social/syncJmBasic/createSyncJMBasic",
          method: "post",
          data: { month: this.createTime },
        }).then(res => {
          console.log(res, 'then');
        }).catch(res => {
          console.log(res.respons.data, 'catch');
          if (res.respons.data.status == '+OK') {
            // this.$confirm('是否提交此区(市)下所有已上传授权书数据到核对系统？',"提示" , {
            // 	confirmButtonText: '确定',
            // 	cancelButtonText: '取消'

            // }).then(async(res) => {

            // }).catch(res=>{

            // })
            this.$message.success(res.respons.data.msg)
            this.loadData()
          } else {
            console.log('数据生成失败');
            this.$message.error(res.respons.data.msg)
          }
        });
      }


    },

    loadData () {
      let queryData = {
        month: this.month,
        status: this.status,
        type: this.type,
        pageNo: this.pageNo + '',
        pageSize: this.pageSize + '',
      };

      this.loading = false;

      this.getList(queryData)
        .then((res) => {
          console.log(res, 'then');
        }).catch((res) => {
          console.log(res.response.data, 'catch');
          // this.tableData = JSON.parse(JSON.stringify(res.response.data.content) ) 
          this.tableData = res.response.data.data.content;
          console.log(this.tableData);


          //获取数据总条数 
          this.count = res.response.data.data.totalElements
          this.loading = false;
        })
    },

    // 金民救助基本信息列表
    getList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/syncJmBasic/getList",
        method: "post",
        data: data,
      });


    },

    // 每页数据条数修改
    handleSizeChange (val) {
      this.pageSize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },

    // 页面输入跳转
    handleCurrentChange (val) {
      this.pageNo = val
      this.loadData();
      console.log(`当前页: ${val}`);
    },

    // 查询
    queryListByCriteria () {
      // console.log(this.value1);
      this.pageNo = 1;
      this.loadData();
      // console.log(this.value1[0]);
      // console.log(this.value1[1]);

    },
    // 重置
    resetQuery () {

      // this.value1=['',''];
      this.abaf0028 = '';	//开始年月 
      this.abaf0029 = '';	//结束年月
      this.abax6002 = '';	//业务编码
      this.axdf0002 = '';	//户主姓名
      this.axdf0004 = '';	//户主身份证

      this.loadData()
    },

    // 多选框
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },

    // 操作按钮
    handleClick (data) {
      console.log(data);
    },
  }
};
</script>
<style scoped>
.g-box {
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
}

.search .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 240px !important;
}
.demonstration {
  font-size: 14px;
  color: #606266;
}
.block {
  margin-right: 20px;
}
.footer {
  height: 50px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 10px;
  text-align: right;
  padding-right: 30px;
  /*background:#f9f9f9;*/
  background: #fff;
  border-top: 1px solid #ddd;
}
</style>