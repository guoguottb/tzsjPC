 <!-- 提交省厅操作模块 -->
<template>
  <div class="g-box">
    <div class="createBox">
      <!-- 上传金民时间 -->
      <div class="block">
        <span class="demonstration">选择时间:&nbsp;&nbsp;</span>
        <el-date-picker v-model="synchronizingDataTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        default-time="12:00:00">
        </el-date-picker>
        <!-- 生成本地数据 -->
        <el-button type="primary"
                   style="marginLeft:12px"
                   :disabled="deletelocalData || generateJMDataLoading"
                   :loading="loading_1"
                   @click="onGenerateData">{{loading_1?"正在生成本地数据":"生成本地数据"}}</el-button>
        <!-- 删除本地数据 -->
        <el-button type="primary"
                   style="marginLeft:12px"
                   :disabled="loading_1 || generateJMDataLoading"
                   :loading="deletelocalData"
                   @click="onDeleteLocalData">{{deletelocalData?"正在删除本地数据":"删除本地数据"}}</el-button>
        <!-- 生成金民数据 -->
        <el-button type="primary"
                   style="marginLeft:12px"
                   :disabled="loading_1 || deletelocalData"
                   :loading="generateJMDataLoading"
                   @click="onGenerateJMData">{{generateJMDataLoading?"正在同步金民数据":"同步金民数据"}}</el-button>
      </div>
      <!-- table search -->
      <div style="marginTop:12px">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <!-- 同步月份 -->
          <el-form-item label="同步月份">
            <div class="block"
                 style="min-width:unset">
              <el-date-picker v-model="formInline.month"
                              type="datetime"
                              placeholder="请选择同步日期"
                              default-time="12:00:00">
              </el-date-picker>
            </div>
          </el-form-item>
          <!-- 同步状态 -->
          <el-form-item label="同步状态">
            <el-select v-model="formInline.status"
                       placeholder="请输入同步状态">
              <el-option label="未同步"
                         value="未同步"></el-option>
              <el-option label="成功"
                         value="成功"></el-option>
              <el-option label="失败"
                         value="失败"></el-option>
            </el-select>
          </el-form-item>
          <!-- 同步类型 -->
          <el-form-item label="同步类型">
            <el-select v-model="formInline.type"
                       placeholder="请输入同步类型">
              <el-option label="新增"
                         value="新增"></el-option>
              <el-option label="修改"
                         value="修改"></el-option>
              <el-option label="注销"
                         value="注销"></el-option>
            </el-select>
          </el-form-item>
          <!-- formData button -->
          <el-form-item>
            <el-button type="primary"
                       icon="el-icon-search"
                       :loading="tableLoading"
                       @click="onSubmit">查询</el-button>
            <el-button type="info"
                       icon="el-icon-refresh"
                       @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- table data -->
      <div class="tableData"
           style="marginTop:8px">
        <el-table ref="multipleTable"
                  v-loading="tableLoading"
                  border
                  height="576"
                  max-height="600px"
                  :data="tableData.content"
                  style="width: 100%;overflow:scroll"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column label="申请人姓名"
                           prop="applyName">
          </el-table-column>
          <el-table-column label="申请人身份证"
                           prop="applyIdCard"
                           width="160">
          </el-table-column>
          <el-table-column label="社救家庭ID"
                           prop="basicId">
          </el-table-column>
          <el-table-column label="家庭固话ID"
                           prop="copyId">
          </el-table-column>
          <el-table-column label="id"
                           prop="id">
          </el-table-column>
          <el-table-column label="同步月份"
                           prop="month">
          </el-table-column>
          <el-table-column label="同步失败原因"
                           prop="reason">
          </el-table-column>
          <el-table-column label="救助类型"
                           prop="rescueType">
          </el-table-column>
          <el-table-column label="同步状态"
                           min-width="80px"
                           prop="status">
          </el-table-column>
          <el-table-column label="类型"
                           min-width="40px"
                           prop="type">
          </el-table-column>
          <el-table-column label="操作"
                           class="scopeCell"
                           min-width="300px">
            <template slot-scope="scope">
              <el-button-group :inline="true"
                               style="width=100% ">
                <el-button type="primary"
                           :disabled="scope.row.status ==='成功'"
                           @click="onChangeRowData(scope,'新增')">新增</el-button>
                <el-button type="primary"
                           :disabled="scope.row.status ==='成功'"
                           @click="onChangeRowData(scope,'变更')">变更</el-button>
                <el-button type="primary"
                           :disabled="scope.row.status ==='成功'"
                           @click="onChangeRowData(scope,'注销')">注销</el-button>
                <el-button type="danger"
                           @click="onChangeRowData(scope,'删除')">删除本地</el-button>
                <el-button type="danger"
                           :disabled="scope.row.status === '未同步'"
                           @click="onChangeRowData(scope,'删除金民')">删除金民</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- footer paging -->
      <div class="footerPaging">
        <div class="block">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[10,20,50,100]"
                         :page-size="tableData.pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="tableData.totalElements">
          </el-pagination>
        </div>
      </div>
      <!-- 删除提示对话框 -->
      <el-dialog title="提示"
                 :visible.sync="deleteDialog"
                 width="30%">
        <span>{{dialogTitle}}</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="deleteDialog = false">取 消</el-button>
          <el-button type="primary"
                     :loading="dialogconfirmLoading"
                     @click="affirmDelete">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  GenerateSynchronousDataApi, // 生成同步金民的数据
  getTableDataApi,    // 同步金民的数据列表
  deleteCurrentDataApi,     // 删除一个同步金民的数据
  addSyncDataApi,     // 新增一个同步金民的数据
  updataSyncDataApi,      // 更新一个同步金民的数据
  cancelSyncDataApi,    // 注销一个同步金民的数据
  deleteMonthLocalDataApi,    // 按月删除本地数据
  addSyncJMDataApi,     // 同步金民数据
  deleteOneJMDataApi, // 删除金民按钮
} from "@/api/linkageSalvationPlatform"
// status
import dayjs from "dayjs"   // dayjs(date).format("YYYY-MM-DD HH:mm:ss")
export default {
  data () {
    return {
      synchronizingDataTime: "",    // 上传金民时间
      formInline: {         // search form
        applyIdCard: "",    // 申请人身份证
        month: "",    // 同步日期  YYYY-MM-DDTHH:mm:ss   格式
        notNeedPage: false,     // 	是否不需要分页
        pageNo: 1,  // 第几页,默认从1开始
        pageSize: 20,   // 每页几条
        rescueType: "",   // 救助类型：低保，家庭边缘，临时救助，特困供养，支出贫困
        sortField: "",    // 排序字段
        status: "",   // 状态：未同步,成功,失败
        type: ""    // 类型：新增，修改，注销
      },
      isSearchStatus: false,    // 是否成功生成同步数据
      tableData: {
        content: []
      },        // table data
      loading_1: false,     // 生成同步数据按钮loading
      tableLoading: false,
      searchLoading: false,
      deleteDialog: false,         //  删除 提示对话框
      rowInformation: {},
      dialogTitle: "",
      dialogconfirmLoading: false,
      deletelocalData: false,
      generateJMDataLoading: false
    };
  },

  components: {
  },
  created () {
  },
  methods: {
    // 生成同步数据按钮
    async onGenerateData () {
      if (!this.synchronizingDataTime) return this.$message.error("请选择生成本地数据时间")
      this.loading_1 = true
      try {
        const res = await GenerateSynchronousDataApi({
          month: dayjs(this.synchronizingDataTime).format("YYYY-MM-DDTHH:mm:ss")
        })
        this.$message.error(res.response.data.msg)
      } catch (error) {
        if (error && error.response && error.response.data.status === "+OK") {
          this.$message.success("生成同步数据成功")
          this.synchronizingDataTime = ""
        }
        else {
          this.$message.success(error.response.data.msg)
        }
      } finally {
        this.loading_1 = false
      }
    },
    // 同步金民的数据列表
    async getTableData (data) {
      try {
        this.tableLoading = true
        await getTableDataApi(data)
      } catch (error) {
        if (error && error.response && error.response.data.status === "+OK") {
          this.tableData = error.response.data.data
        }
      } finally {
        this.tableLoading = false
      }
    },
    // 搜索按钮
    onSubmit () {
      if (this.formInline.month) this.formInline.month = dayjs(this.formInline.month).format("YYYY-MM-DDTHH:mm:ss")
      this.getTableData(this.formInline)
    },
    // 重置按钮
    onReset () {
      this.formInline.month = ""
      this.formInline.status = ""
      this.formInline.type = ""
    },
    // 全选点击事项
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 切换pageSize页码
    handleSizeChange (val) {
      this.formInline.pageSize = val
      this.getTableData(this.formInline)
    },
    // 切页pageNo
    handleCurrentChange (val) {
      this.formInline.pageNo = val
      this.getTableData(this.formInline)
    },
    // 五个按钮点击事项
    onChangeRowData ({ row }, val) {
      if (this.dialogconfirmLoading) return this.$message.warning("操作冲突，请稍后重试！")
      this.dialogTitle = `是否确认${val}`
      this.deleteDialog = true
      this.rowInformation = row
    },
    // 操作按钮对话框    确认事项
    async affirmDelete () {
      try {
        this.dialogconfirmLoading = true
        let operationSyncData = {
          basicId: this.rowInformation.basicId,
          copyId: this.rowInformation.copyId,
          month: dayjs(this.rowInformation.month).format("YYYY-MM-DDTHH:mm:ss")
        }
        // 确认删除
        if (this.dialogTitle === "是否确认删除") {
          await deleteCurrentDataApi({
            id: this.rowInformation.id
          })
        }
        // 确认新增
        if (this.dialogTitle === "是否确认新增") {
          return await addSyncDataApi(operationSyncData)
        }
        // 确认变更
        if (this.dialogTitle === "是否确认变更") {
          return await updataSyncDataApi(operationSyncData)
        }
        // 确认注销 
        if (this.dialogTitle === "是否确认注销") {
          return await cancelSyncDataApi(operationSyncData)
        }
        // 删除金民
        if (this.dialogTitle === "是否确认删除金民") {
          return await deleteOneJMDataApi({
            approvalId: this.rowInformation.approvalId
          })
        }
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === "+OK") {
          this.deleteDialog = false
          this.$message.success(error.response.data.msg)
          this.onSubmit()
          return
        }
        this.$message.error(error.response.data.msg)
      } finally {
        this.dialogconfirmLoading = false
      }
    },
    // 删除本地数据
    async onDeleteLocalData () {
      try {
        if (!this.synchronizingDataTime) return this.$message.error("请选择删除本地数据时间")
        this.deletelocalData = true
        await deleteMonthLocalDataApi({
          month: dayjs(this.synchronizingDataTime).format("YYYY-MM-DDTHH:mm:ss")
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === "+OK") {
          this.synchronizingDataTime = ""
          return this.$message.success(error.response.data.msg)
        }
        this.$message.error("删除本地数据失败，请稍后重试！")
      } finally {
        this.deletelocalData = false
      }
    },
    // 同步金民数据
    async onGenerateJMData () {
      try {
        if (!this.synchronizingDataTime) return this.$message.error("请选择同步金民数据时间")
        this.generateJMDataLoading = true
        await addSyncJMDataApi({
          month: dayjs(this.synchronizingDataTime).format("YYYY-MM-DDTHH:mm:ss")
        })
      } catch (error) {
        if (error && error.response && error.response.data && error.response.data.status === "+OK") {
          this.synchronizingDataTime = ""
          return this.$message.success(error.response.data.msg)
        }
        this.$message.error("执行失败，请稍后重试！")
      } finally {
        this.generateJMDataLoading = false
      }
    },
  }
};
</script>
<style scoped lang="less">
/deep/ .footerPaging {
  display: flex;
  justify-content: flex-end !important;
  margin-top: 6px;
}
/deep/ .el-table__row button {
  margin: 0;
  margin-bottom: 12px;
}
</style>