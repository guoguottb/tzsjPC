<template>
  <div class="g-box">
    <el-dialog
      :title="titles"
      @close="close"
      :visible.sync="centerDialogVisible2"
      width="80%"
      height="80VH"
      center
    >
      <router-view @closes="closes" ref="routers"></router-view>
    </el-dialog>

    <el-dialog
      :title="titles2"
      :visible.sync="centerDialogVisible4"
      id="pdfbox"
      width="80%"
      height="85VH"
      center
    >
      <iframe
        :src="src"
        style="width: 100%; height: 74vh"
        id="iframe1"
        padding="0"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
      ></iframe>
    </el-dialog>

    <el-dialog
      :title="titles2"
      :visible.sync="centerDialogVisible5"
      width="80%"
      height="80VH"
      center
    >
      <div style="height: 80vh; overflow: auto">
        <img :src="item" v-for="(item, index) in pdfList" :key="index" />
      </div>
    </el-dialog>

    <div class="search">
      <el-form :inline="true" :model="searchInline" class="demo-form-inline">
        <el-form-item
          v-for="(item, index) in searchInline"
          :label="item.text"
          :key="index"
          label-width="110px"
        >
          <!--前俩输入框 -->
          <el-input
            v-if="item.searchType == 'text'"
            v-model="searchData[item.searchId]"
            :placeholder="item.text"
            style="width: 180px"
          ></el-input>
          <!-- 后俩选择框 -->
          <el-select
            v-else-if="
              item.searchType == 'select' ||
              (item.searchType == 'link' && item.searchId != 'stone')
            "
            v-model="searchData[item.searchId]"
            :placeholder="item.text"
            style="width: 180px"
          >
            <el-option
              v-for="(itemOp, index22) in item.vals.split('#')"
              :value="itemOp"
              :key="index22"
            >
            </el-option>
          </el-select>
          <!-- 判断是否为行政区域 -->
          <!-- <el-select v-else-if="item.searchType=='select' || item.searchType=='link' && item.searchId=='stone' "
						v-model="searchData[item.searchId]" :placeholder="item.text" style="width:180px;">
						<el-option v-for="(itemOp2,index22) in item.vals.split('#')" :value="itemOp2" :key="index22"></el-option>
					</el-select> -->
          <!-- 区划选择框 -->
          <el-cascader
            v-else-if="
              item.searchType == 'select' ||
              (item.searchType == 'link' && item.searchId == 'stone')
            "
            :props="props"
            v-model="xzqhArray"
            :placeholder="item.text"
            style="width: 180px"
          >
          </el-cascader>
          <!--  -->

          <el-date-picker
            v-else-if="item.searchType == 'date' || item.searchType == 'date2'"
            v-model="searchData[item.searchId]"
            :placeholder="item.text"
            style="width: 180px"
            type="date"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <el-date-picker
            v-else-if="item.searchType == 'date5' || item.searchType == 'date4'"
            v-model="searchData[item.searchId]"
            :placeholder="item.text"
            style="width: 180px"
            type="month"
            value-format="yyyy-MM"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left: 10px">
          <el-button
            type="primary"
            @click="queryListByCriteria"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="info" @click="resetQuery" icon="el-icon-refresh"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!--新增按钮 行-->
    <!-- <el-row type='flex' justify="end" v-if="buttonJson.length>0"
			style='padding-top: 10px;text-align:right;padding-right:20px; '>
			<el-col :span="24" >
				<el-button  type='primary'  v-for="(item,index) in buttonJson" icon='el-icon-s-promotion' @click='grant(item)'
					:key="index">{{item.buttonName}}</el-button>
				
			</el-col>
		</el-row> -->

    <!-- <el-row type='flex' justify="start" style='text-align:left;padding-left:10px;' v-if="sKey==444 || sKey==456">
			<el-col :span="24" style="display:flex" >
				
				<div class="buttonBox" >
					<router-link to="/Page1">
						<el-tooltip content="数据采集页面" placement="top">
						<el-button type="primary">Excel数据导入</el-button>
						</el-tooltip>
					</router-link>
				</div>

				<div class="searchBox">
					<el-button type="success" @click="submit" 
						:disabled="disabled">导出选中的数据</el-button>
				</div>
			</el-col>
			
		</el-row> -->
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabData"
          :name="item.listname"
          :key="index"
        >
          <span slot="label"
            >{{ item.val }}
            <!-- 列表数据数量显示 -->
            <span
              v-if="tabsNum2[item.val] && tabsNum2[item.val] <= 99"
              style="
                background-color: red;
                color: white;
                width: 30px;
                height: 20px;
                line-height: 20px;
                display: inline-block;
                text-align: center;
              "
            >
              {{ tabsNum2[item.val] }}
            </span>
            <span
              v-else-if="tabsNum2[item.val] && tabsNum2[item.val] > 99"
              style="
                background-color: red;
                color: white;
                width: 30px;
                height: 20px;
                line-height: 20px;
                display: inline-block;
                text-align: center;
              "
            >
              99+
            </span>
          </span>
        </el-tab-pane>
      </el-tabs>

      <!--div class="umc-filter clearfix tables"-->
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        height="100%"
        border
        style="width: 100%"
        @selection-change="selectionChange"
        v-loading="loading"
        ><!-- 表格背景 -->
        <el-table-column type="selection" width="42"></el-table-column>
        <!--表格-->

        <el-table-column
          v-if="itemT.field != 'btn'"
          v-for="(itemT, index4) in tableList"
          :key="index4"
          :prop="itemT.field"
          :label="itemT.names"
          :width="itemT.width"
        ></el-table-column>
        <el-table-column v-else label="操作" :width="itemT.width">
          <template slot-scope="scope">
            <el-button-group style=" width=100% ">
              <el-button
                :type="itemF.btnType"
                v-for="(itemF, index3) in scope.row[itemT.field]"
                :key="index3"
                @click="btnEvent(itemF)"
                >{{ itemF.name }}</el-button
              >
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!--/div-->

      <!-- 核对反馈列表 -->
	 	 <div  @click="fkListClose" class="fkList" v-show="visible">
	 	</div>
		<el-popover v-show="visible"  placement="top" width="160" class="fkbox" v-model="visible" >
			<h3 style="display:inline-block;margin-bottom:10px;font-weight: 600;">核对反馈表</h3>
			<i class="el-icon-close" style="float:right;" @click="fkListClose"></i>
			<div style="text-align: center; margin: 0;overflow-y: auto;height:200px">
				<el-table :data="fkListTable"  @row-click="getPDF"  stripe border style="width: 100%" >
					<el-table-column prop="file_name" label="名称" width="180">
					</el-table-column>
					<el-table-column prop="upload_time" label="时间" width="180">
					</el-table-column>
					<!-- <el-table-column  label="操作" width="80">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
					</template>
					</el-table-column> -->
					
				
					
				</el-table>
			</div>
		</el-popover>
	 

      <!-- 核对反馈列表 -->

      <div class="footer">
         <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="30"
          :current-page="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentPageChange"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
//
import axios from "axios";
import pdf from "vue-pdf";
// import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
// import Page1 from './ceshi/Page1.vue'
import request from "@/utils/request";
import { Loading } from "element-ui";
// import { formatTime } from './assets/js/utils'
import xlsx from "xlsx";
export default {
  components: {
    // Page1,
    pdf,
  },

  name: "commonList",
  props: ["sKey", "type", "tableName"],
  data() {
    return {
      visible: false, //核对反馈显示
      fkListTable: [], //核对反馈列表\
	  sid:"",
      page: 1,
      count: 1,
      limit: 30,
      listname: "",

      numPages: 0,
      currentPage: 0,

      loading: true,
      centerDialogVisible: false,
      centerDialogVisible2: false,
      centerDialogVisible3: false,
      centerDialogVisible4: false,
      centerDialogVisible5: false,
      tupian: false,
      pdfurl2: [],
      pdfList: [],
      src: "",
      isLoad: true,
      titles: "",
      // titles2:'',
      titles2: "",
      titles3: "",
      activeName: "",
      formInline: {
        field: "",
      },
      // remenberActive:false,
      // 选中数据
      selectionList: [],
      disabled: false,
      loading: false,
	  
      searchInline: [],
      searchData: {
        // ab_ex3:""
      },
      tabData: [],
      tableList: [],
      tableData: [],
      buttonJson: [],
      tabsnum: [],
      tabsnumArr: [],
      xzqhArray: [],
      tabsNum2: {},
      searchDataNum: {},
      // el-cascader懒加载
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node; // 获取当前node对象中的level属性
          let pId = "0";
          if (level > 0) {
            let value = node.value;
            if (value) {
              let values = value.split("#");
              pId = values.length > 1 ? values[1] : "0";
            }
          }
          request({
            url: "/social/assistance/getCityOption",
            method: "post",
            data: {
              pId: pId,
            },
          })
            .then((res) => {})
            .catch((res) => {
              console.log(res);
              const nodes = res.response.data;

              nodes.forEach((item) => {
                item.value = item.cs_ex2 + "#" + item.cs_ex1;
                item.label = item.cs_ex2;
                item.leaf = level >= 1; //判断是否为末尾节点，这个地方是0,1,2三级
              });
              resolve(nodes);
            });
        },
      },
    };
  },

  watch: {
    xzqhArray(newA, oldA) {
      let i = newA[0].split("#")[0] + "#" + newA[1].split("#")[0];
      this.searchData.stone = i;
      console.log(i);
    },
    $route: "fetchData",

    activeName(newA, oldA) {
      // sessionStorage.setItem('activeName',newA)
      console.log(newA, oldA);
      // console.log(sessionStorage.getItem('activeName'));
    },
  },

  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    fetchData() {
      console.log("路由发送变化doing...");

      this.$refs.routers.loadData();
      this.isLoad = true;
      // this.$refs.routers2.loadData();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // ------excel 功能区-------------------------------
    // 权限
    selectionChange(val) {
      this.selectionList = val;
    },

    submit() {
      //未选中数据
      if (this.selectionList.length <= 0) {
        return this.$message({
          message: "小主，请您先选择要导出的数据哦！",
          type: "warning",
          showClose: true,
        });
      }

      this.disabled = true;
      let loading = Loading.service({
        text: "小主，请您稍等片刻，奴家正在玩命处理中...",
        background: "rgba(0,0,0,.5)",
      });
      console.log(this.selectionList);
      // 导出Excel表格式
      let arr = this.selectionList.map((item) => {
        return {
          编号: item.NO,
          省: item.ab_ex170,
          市: item.ab_ex171,
          "区县(市)": item.ab_ex161,
          "街道(乡镇)": item.ab_ex2,
          "社区(村)": item.ab_ex1,
          姓名: item.ab_ex3,
          身份证号码: item.ab_ex7,
          低保证号: item.dbz,
          "应计入年收入(元)": item.ab_ex58,
          "保障金额(元)": item.ab_ex40,
          "分类救助(元)": item.ab_ex39,
          "调增救助金(元)": item.ab_ex38,
          性别: item.ab_ex69,
          是否扶贫建档立卡对象: item.ab_ex118,
          家庭关系: item.jt__,
          户主姓名: item.hzxm__,
          户主身份证号码: item.hzsfz__,
          是否三无: item.sfsw__,
          民族: item.ab_ex65,
          就业状况: item.ab_jyzk__,
          年龄: item.ab_ex70,
          健康状况: item.ab_ex95,
          重病病种: item.zbbz__,
          劳动能力: item.ldnl__,
          文化程度: item.whcd__,
          残疾类别: item.cjlb__,
          残疾等级: item.cjdj__,
          社会保障号: item.shbz__,
          是否失智: item.sfsz__,
          起始保障年月: item.qsbz__,
          截止保障年月: item.jzbz__,
          待遇类型: item.dylx__,
          业务办理类型: item.ywbl__,
          行政区划编码: item.xzqhbm__,
          读卡器读取身份证: item.dkq__,
          银行卡号: item.ab_ex43,
          联系电话: item.phone,
          行政区划: item.ab_ex2,
          户籍地址: item.ab_ex4,
          联系电话: item.ab_ex28,
          求助原因: item.ab_ex46,
          是否属于近亲属: item.ab_ex92,
          开户银行: item.ab_ex42,
          开户人: item.ab_ex8,
          银行卡号: item.ab_ex43,
          // '导出时间':item.time
        };
      });

      let sheet = xlsx.utils.json_to_sheet(arr),
        book = xlsx.utils.book_new();

      xlsx.utils.book_append_sheet(book, sheet, "Sheet1");
      xlsx.writeFile(book, `user${new Date().getTime()}.xls`);

      loading.close();
      this.disabled = false;
    },

    // -----Excel功能区------------------------------
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetQuery() {
      for (let key in this.searchData) {
        this.searchData[key] = "";
      }
      this.xzqhArray = [];
    },
    handleClick(tab, event) {
      console.log(tab, event);
      console.log("tab.name===============" + tab.name);
      this.listname = tab.name;
      this.page = 1;
      this.getData();
      this.loadData();
    },
    closedbListView(n) {
      this.centerDialogVisible2 = false;
    },
    handleSizeChange(val) {
      this.limit = val;
      this.loadData();
    },
    handleCurrentPageChange(val) {
      this.page = val;
      this.loadData();
    },
    loadData() {
      this.getNum();
      this.loading = true;
      this.getSearchData({
        sKey: "" + this.sKey,
        listname: this.listname,
        params: JSON.stringify(this.searchData),
        limit: "" + this.limit,
        page: "" + this.page,
      })
        .then((res) => {
          this.tableData = [];

          this.count = 1;

          if (res.data) {
            this.tableData = res.data;
            this.count = res.count;
          }
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i]["btn"]) {
              let btn = this.tableData[i].btn;
              for (let j = 0; j < btn.length; j++) {
                let type = this.tableData[i].btn[j].type;
                if (type == "openWin") {
                  this.tableData[i].btn[j].btnType = "primary";
                } else {
                  this.tableData[i].btn[j].btnType = "danger";
                }
                // //修改按钮名称
                // let name = this.tableData[i].btn[j].name;
                // if(name=='提交委托确认'){
                // 	this.tableData[i].btn[j].name = "核查派单"
                // }
              }
            }
          }
          this.loading = false;
        })
        .catch((res) => {
          if (res.request.readyState != 4 || res.request.status != 200) {
            console.log("5555====================================425");
          }
          console.log(res.response.data);

          this.tableData = [];
          this.count = 1;
          console.log(res, "-----res==280");
          if (res.response.data.data) {
            this.tableData = res.response.data.data;
            this.count = res.response.data.count;
            console.log(this.tableData, "-----this.tableData");
          }

          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i]["btn"]) {
              let btn = this.tableData[i].btn;
              for (let j = 0; j < btn.length; j++) {
                let type = this.tableData[i].btn[j].type;
                if (type == "openWin") {
                  this.tableData[i].btn[j].btnType = "primary";
                } else {
                  this.tableData[i].btn[j].btnType = "danger";
                }
                // //修改按钮名称
                // let name = this.tableData[i].btn[j].name;
                // console.log(this.tableData[i].btn[j].name);
                // if(this.tableData[i].btn[j].name=="查看"){
                // console.log(123324354);
                // window.Location.href="http://www.baidu.com"
                // }
              }
            }
          }
          this.loading = false;
        });
    },

    // 键盘Enter事件--输入搜索内容后直接回车搜索
    handleKeyDown(e) {
      //  console.log("123");
      let key = null;
      if (window.event === undefined) {
        // console.log("null");
        key = e.keyCode;
      } else {
        // console.log("enter");
        key = window.event.keyCode;
      }
      if (key === 13) {
        this.queryListByCriteria();
      }
    },
    // 查询按钮绑定事件
    queryListByCriteria() {
      this.page = 1;
      if (this.searchData.code && this.searchData.code.length != 18) {
        this.$message.warning("请输入正确的身份证号码");
      } else {
        this.loadData();
      }
    },
    getData() {
      this.loading = true;
      this.getDatas({
        sKey: "" + this.sKey,
        listname: this.listname,
      })
        .then((res) => {
          console.log(res);
          if (this.listname == "") {
            if (res[0].searchStr.length > 0) {
              this.searchInline = res[0].searchStr;
            }
            if (
              res[0].tabJson.length > 0 &&
              res[0].tabJson[0].maps.length > 0
            ) {
              // 获取tabs的数量
              /*res.response.data[0].tabJson[0].maps.forEach(async (item, index) => {
								this.tabsnum[index] = await item.listname
								this.getSearchData({
									sKey: "" + this.sKey,
									listname: this.tabsnum[index],
									params: JSON.stringify(this.searchData),
									limit: "" + this.limit,
									page: "" + this.page
								}).then((res) => {
									this.$set(this.tabsnumArr, index, res.response.data.data
										.length)
								}).catch((res) => {
									this.$set(this.tabsnumArr, index, res.response.data.data
										.length)
								})
							})*/
              // 获取tabs的数量
              this.tabData = res[0].tabJson[0].maps;

              // this.activeName = res.response.data[0].tabJson[0].maps[0].val
              this.activeName = res[0].tabJson[0].maps[0].listname;
            }
          }
          this.tableList = [];
          if (res[0].list.length > 0) {
            this.tableList = res[0].list;
            console.log(res[0].list);
          }
          this.buttonJson = res[0].buttonJson;
        })
        .catch((res) => {
          if (this.listname == "") {
            if (res.response.data[0].searchStr.length > 0) {
              this.searchInline = res.response.data[0].searchStr;
            }
            if (
              res.response.data[0].tabJson.length > 0 &&
              res.response.data[0].tabJson[0].maps.length > 0
            ) {
              // 获取tabs的数量
              /*res.response.data[0].tabJson[0].maps.forEach(async (item, index) => {
								this.tabsnum[index] = await item.listname
								this.getSearchData({
									sKey: "" + this.sKey,
									listname: this.tabsnum[index],
									params: JSON.stringify(this.searchData),
									limit: "" + this.limit,
									page: "" + this.page
								}).then((res) => {
									this.$set(this.tabsnumArr, index, res.response.data.data.length)
								}).catch((res) => {
									this.$set(this.tabsnumArr, index, res.response.data.data.length)
								})
							})*/
              // 获取tabs的数量
              this.tabData = res.response.data[0].tabJson[0].maps;
              console.log(this.tabData, "this.tabData");
              if (this.tabData[2].name == "委托确认") {
                // this.tabData[2].name ='核查派单'
                this.tabData[2].val = "核查派单";
              }
              if (this.tabData[2].name == "提交信息核对") {
                console.log("请先落实核查信息");
                this.$message.warning("请先落实核查信息");
                return false;
              }
              // this.activeName = res.response.data[0].tabJson[0].maps[0].val
              // if(this.remenberActive){
              // 	this.activeName=sessionStorage.getItem(activeName)
              // 	this.remenberActive=false
              // }else{

              this.activeName =
                res.response.data[0].tabJson[0].maps[0].listname;
              // }
              console.log(this.activeName, "this.activeName");

              console.log(
                res.response.data[0].tabJson[0].maps[2].name,
                "res.response.data[0].tabJson[0].maps[2].name"
              );
            }
          }

          // console.log(sessionStorage.getItem('activeName'),this.activeName);
          console.log(
            sessionStorage.getItem("activeName"),
            "sessionStorage.getItem('activeName')"
          );
          // console.log(sessionStorage.getItem('activeName').substring(0,12));

          if (
            sessionStorage.getItem("activeName") != null &&
            this.activeName != 0
          ) {
            console.log(this.activeName);
            var activeNameArr1 = this.activeName.split("/");
            var activeNameArr2 = sessionStorage
              .getItem("activeName")
              .split("/");
            console.log(activeNameArr1, "activeNameArr1");
            console.log(activeNameArr2, "activeNameArr2");

            if (activeNameArr2.length > 2) {
              if (activeNameArr1[1] == activeNameArr2[1]) {
                this.activeName = sessionStorage.getItem("activeName");
                this.listname = this.activeName;
                this.page = 1;
                this.getData();
                sessionStorage.removeItem("activeName");
                this.loadData();
                // this.remenberActive=true
              }
            } else if ((activeNameArr2.length = 2)) {
              if (activeNameArr1[0] == activeNameArr2[0]) {
                this.activeName = sessionStorage.getItem("activeName");
                this.listname = sessionStorage.getItem("activeName");
                this.page = 1;
                this.getData();
                sessionStorage.removeItem("activeName");
                this.loadData();
                // this.remenberActive=true
              }
            }
          }

          this.tableList = [];
          if (res.response.data[0].list.length > 0) {
            this.tableList = res.response.data[0].list;
            console.log(res.response.data[0].list);
          }
          this.buttonJson = res.response.data[0].buttonJson;
          console.log(this.buttonJson, "----buttonJson");
        });
    },

    getNum() {
      console.log(this.type, this.sKey);
      this.searchDataNum = { ...this.searchData };
      console.log(this.searchDataNum);
      for (let key in this.searchDataNum) {
        this.searchDataNum[key] = escape(this.searchDataNum[key]);  
      }
      this.searchDataNum.type = escape(this.type);
      this.searchDataNum.company = escape("泰州市姜堰区社会救助综合平台");
      this.searchDataNum.tableName = escape(this.tableName);
      // console.log(this.searchDataNum);
      // console.log(this.tableName);

      if (this.type) {
        request({
          headers: {
            Accept: "application/json",
          },
          url: "/social/assistance/getBasicNum",
          method: "post",
          data: this.searchDataNum,
        })
          .then((res) => {
            let json = res;
            for (let i = 0; i < json.length; i++) {
              let ab_ex15 = unescape(json[i].ab_ex15);
              let num = json[i].num;
              this.tabsNum2[ab_ex15] = num;
            }
          })
          .catch((res) => {
            this.tabsNum2 = {};
            console.log(res.response.data);
            let json = res.response.data;
            for (let i = 0; i < json.length; i++) {
              if (json[i].ab_ex15) {
                //申请
                let ab_ex15 = unescape(json[i].ab_ex15);
                if (ab_ex15 == "审核") {
                  ab_ex15 = "审核2";
                } else if (ab_ex15 == "初审") {
                  ab_ex15 = "审核";
                } else if (ab_ex15 == "公示") {
                  ab_ex15 = "公示2";
                } else if (ab_ex15 == "公示开始") {
                  ab_ex15 = "公示";
                } else if (ab_ex15 == "核对中") {
                  ab_ex15 = "信息核对";
                } else if (ab_ex15 == "委托确认") {
                  ab_ex15 = "核查派单";
                }
                let num = json[i].num;
                console.log(ab_ex15, num);
                this.tabsNum2[ab_ex15] = num;
              } else if (json[i].ac_ex3) {
                //变更
                let ac_ex3 = unescape(json[i].ac_ex3);
                if (ac_ex3 == "初审") {
                  ac_ex3 = "审核";
                } else if (ac_ex3 == "公示开始") {
                  ac_ex3 = "公示";
                } else if (ac_ex3 == "核对中") {
                  ac_ex3 = "信息核对";
                }
                let num = json[i].num;
                console.log(ac_ex3, num);
                this.tabsNum2[ac_ex3] = num;
              } else if (json[i].ac_ex7) {
                //注销
                let ac_ex7 = unescape(json[i].ac_ex7);
                if (ac_ex7 == "初审") {
                  ac_ex7 = "审核";
                } else if (ac_ex7 == "公示开始") {
                  ac_ex7 = "公示";
                } else if (ac_ex7 == "核对中") {
                  ac_ex7 = "信息核对";
                }
                let num = json[i].num;
                this.tabsNum2[ac_ex7] = num;
              }
            }
            console.log(this.tabsNum2);
          });
      }
      return this.tableName;
    },
    getSearchData(data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/weida/getCommonListJson",
        method: "post",
        data: data,
      });
    },
    getDatas(data) {
      return request({
        url: "/social/common/commonListJson",
        method: "post",
        data: data,
      });
    },
    // getDatasFam(data) {
    // 	return request({
    // 		url: '/social/common/getFamily',
    // 		method: 'post',
    // 		data: data
    // 	})
    // },
    closes(data) {
      console.log("关闭了啊");
      this.centerDialogVisible2 = false;
      this.$emit("closeWin", this.centerDialogVisible2);
      // this.$emit('自定义名称',要发送的数据)
      this.loadData();
    },
    // 修改了内容未保存点击关闭，重新打开由于路由没有发生变化，导致会显示上次修改内容，需要重新获取数据
    close() {
      console.log("关闭了");
      //this.$refs.routers.loadData();
    },
    // closes2(data){
    // 	this.centerDialogVisible3=false;
    // 	this.loadData();
    // },



    // getPDF   获取PDF照片
    getPDF(item) {

		var st=document.getElementById("pdfbox");
		var st2=document.getElementById("iframe1");
		st.children[0].style.marginTop="6vh";
		console.log(st,"pdfbox");
		console.log(st2,"iframe1");
		console.log(st.children[0].children);
		st.style.padding="0px"
		console.log(st.children[0].children[0].children[0].style.color="black");
		console.log(st.children[0].children[0].style.fontWeight="600");
		// console.log(st2.parentElement);
	// 	 document.getElementById('iframe1').onload = function(){
      
    //   .contentWindow//获取到iframe的window
    //   .document//获取到iframe的document
    //   .getElementById('ifmh1')//正常获取元素
    //   .style.color = "orange";//修改样式

    //   };
		console.log(item.file_name, "123");
		var pingjie = "";
		pingjie=item.file_path+"/"+item.file_name
		pingjie = "/social/minios/showPDF?filename=" + pingjie;
		console.log(pingjie);
		// console.log(this.tableData[0].ab_ex185);
      // 接口
      this.titles2 = "本报告是核对对象在各相关部门信息系统中信息的反馈，仅作为委托部门审批的参考。";
       
      // this.loading = true;
	  if(item.file_name){
		request({
			headers: {
			Accept: "application/json",
			},
			url: pingjie,
			method: "post",
			data: {},
		})
			.then((res) => {
			this.loading = false;
			this.src = "data:application/pdf;base64," + res;
			this.centerDialogVisible4 = true;
			})
			.catch((res) => {
			// this.loading = false;
			console.log(res.response.data);
			this.src = "data:application/pdf;base64," + res.response.data;
			// this.src =  res.response.data;
			// console.log(this.src);
			this.centerDialogVisible4 = true;
			});
		}
    },

    // 关闭核对反馈列表
    fkListClose(){
      this.visible = false;
    },

    // 操作 按钮事件
    btnEvent(item) {
      console.log(item.url); //群众申请、其他
      var arr = item.url.split("=");
      this.sid = arr[1]
      console.log(this.sid);

      // 如果按钮名称叫做“查看核对报告”，调用反馈列表
      if (item.name == "查看核对报告") {
        // console.log(this.tableData);
        request({
          headers: {
            Accept: "application/json",
          },
          url:'/social/assistance/getFamilyHDPDF',
          method: "post",
          data: {
            sId:this.sid,
          },
        }).then((res) => {
            console.log(res, "then");
            // this.loading = false;
            // this.src = 'data:application/pdf;base64,' + res;
            // this.centerDialogVisible4 = true;
        }).catch((res) => {
            // console.log(res);
            console.log(res.response);
            if(res.response.status==200){
              if(res.response.data.length>0){
                console.log(res);
                // 解码后端返回数据
                for(let i in res.response.data){
                  for(let j in res.response.data[i]){
                    res.response.data[i][j]=unescape(res.response.data[i][j]) 
                  }
                }
                // 显示核对列表
                this.visible = true;
                if(this.visible==true){
                  // 清空旧数据
                  this.fkListTable=[];
                  for(let i in  res.response.data){
                    this.fkListTable.push(res.response.data[i])
                  }
                }else if(this.visible==false){
                  this.fkListTable=[]
                }
                console.log(this.fkListTable);
              } else {
                this.$alert('暂无核对报告', '提示', {
                  confirmButtonText: '确定',
                });
                return false
              }
            }else{
              // console.log(res.response.status);
              this.$message.error("网络异常");

              // if(res.response.status==404){
              //   this.$message.error("数据请求404，找不到接口数据");
              // }else if(res.response.status==500){
              //    this.$message.error("数据请求500，请确保接口正常开放");
              // }else{
              //   this.$message.error("网络异常");
              // }

            }
          });

      }else if(item.name == "提交信息核对" || item.name == "提交审核"){
         request({
          headers: {
            Accept: "application/json",
          },
          url:'/social/assistance/getFamilyHDPDF',
          method: "post",
          data: {
            sId:this.sid,
          },
        }).then((res) => {
            console.log(res, "then");
            // this.loading = false;
            // this.src = 'data:application/pdf;base64,' + res;
            // this.centerDialogVisible4 = true;
        }).catch((res) => {
          if(res.response.status==200){
              if(res.response.data.length==0){
                  this.$alert('暂无核对报告', '提示', {
                    confirmButtonText: '确定',
                  });
                  return false
              }else {
                this.goUrl(item)
              }
          }else{
             this.$message.error("网络异常");

              // if(res.response.status==404){
              //   this.$message.error("数据请求404，找不到接口数据");
              // }else if(res.response.status==500){
              //    this.$message.error("数据请求500，请确保接口正常开放");
              // }else{
              //   this.$message.error("网络异常");
              // }
          }

        })

      }else{
        this.goUrl(item)
      }
      
      
    },

    //页面跳转按钮触发
    goUrl(item){
        //获取申请人id，作为上门核查的判断条件
        console.log(item);
        var wz = item.url.indexOf("=");
        var ab_id = item.url.substring(wz + 1, item.url.length);

        console.log(item.url);
        console.log(ab_id);
        // let name = this.tableData[i].btn[j].name;
        // if((name=='查看'||name=='退回'||name=='修改'||name=='上门核查')&&sessionStorage.getItem('activeName')!=null){
        // 	this.activeName = sessionStorage.getItem('activeName')

        // }

        if (item.type == "openWin") {
          //item.url="dbListCancel"+item.url
          //alert(item.url);
          //item.url=item.url.replace("dbListView","dbListCancelView");
          //alert(item.url)
          let timestamp = Date.parse(new Date());
          let url = item.url;
          url =
            url.indexOf("?") == -1
              ? url + "?timestamp=" + timestamp
              : url + "&timestamp=" + timestamp;
          console.log(url, "-----url");

          this.$router.push({
            path: url,
          });
          // this.$pushRouter({path:generalConfig.defaultUrl + url,})
          this.centerDialogVisible2 = true;

          if (item.title) {
            this.titles = item.title;
          } else {
            this.titles = item.name;
          }
        } else if (item.type == "get") {
          this.titles2 = item.name;
          this.loading = true;
          request({
            headers: {
              Accept: "application/json",
            },
            url: item.url,
            method: "post",
            data: {},
          })
            .then((res) => {
              this.loading = false;
              this.src = "data:application/pdf;base64," + res;
              this.centerDialogVisible4 = true;
            })
            .catch((res) => {
              this.loading = false;
              this.src = "data:application/pdf;base64," + res.response.data;
              this.centerDialogVisible4 = true;
            });
        } else if (item.type == "get2") {
          this.titles2 = item.name;
          this.loading = true;
          request({
            headers: {
              Accept: "application/json",
            },
            url: item.url,
            method: "post",
            data: {},
          })
            .then((res) => {
              this.loading = false;
            })
            .catch((res) => {
              this.loading = false;
              let json = res.response.data;
              this.pdfList = [];
              for (let i = 0; i < json.length; i++) {
                this.pdfList.push(
                  "data:image/;base64," + unescape(json[i].base64)
                );
              }
              //this.src = 'data:application/pdf;base64,' + res.response.data;
              this.centerDialogVisible5 = true;
              console.log(res);
              console.log(this.tableData[0].ab_ex73, "----------------ex73");
            });
        } else if (item.type == "confirm" || item.type == "comfirms") {
          let sef = this;
          console.log(sef);
          console.log(sef.tabData[0].ab_ex73);
          console.log(sef.tabData[2]);
          if (sef.tabData[2].val == "核查派单") {
            for (let i in sef.tableData) {
              if (
                sef.tableData[i].btn[2].name == "提交信息核对" &&
                sef.tableData[i].ab_ex120 == "" &&
                sef.tableData[i].ab_id == ab_id
              ) {
                console.log(sef.tableData[i].ab_ex120 == "");
                console.log(sef.tableData[i]);
                console.log("第" + (i + 1) + "位", "条件不符合");
                this.$message.warning("请先进行上门核查");

                return false;
              } else if (
                sef.tableData[i].ab_ex120 == "B" &&
                sef.tableData[i].ab_id == ab_id
              ) {
                // this.$message.warning("请校对上门核查数据后再提交");
                // console.log(sef.tableData[i], "条件通过");
                // return false;
              } else if (
                sef.tableData[i].ab_ex120 != "" &&
                sef.tableData[i].ab_id == ab_id
              ) {
                this.$message.warning("请校对上门核查数据后再提交");
                console.log(sef.tableData[i], "条件通过2");
                return false;
              }

              if (sef.tableData[i].btn[2].name == "提交审核") {
                // this.$message.warning("请先落实核查信息");
                // return false;
              }
            }
          }

          this.$confirm("确定要" + item.name + "?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              // 打开遮罩层
              this.loading = true;
              // 设置定时器，30秒请求失败刷新页面
              let time = setTimeout(() => {
                this.loadData();
                this.$message.error("网络异常");
              }, 30000);

              request({
                url: item.url,
                method: "post",
                data: {},
              })
                .then((res) => {
                  // 数据请求成功删除定时器
                  clearTimeout(time);
                  this.loading = false;
                  if (res[0].status == "+OK") {
                    this.$message({
                      message: unescape(res[0].msg),
                      type: "success",
                    });

                    this.loadData();
                  } else {
                    sef.$message.error(unescape(res[0].msg));
                  }
                })
                .catch((res) => {
                  // 数据请求成功删除定时器
                  clearTimeout(time);
                  this.loading = false;
                  // this.loadData();
                  if (res.response.data[0].status == "+OK") {
                    console.log(res); //
                    console.log(res.response.data[0].msg, "------成功提示"); //上门核查中低保类别不能为空
                    this.$message({
                      message: unescape(res.response.data[0].msg),
                      type: "success",
                    });

                    this.loadData();
                  } else {
                    // sef.$message.error(unescape(res.response.data[0].msg));
                    this.$alert(unescape(res.response.data[0].msg), "提示", {
                      confirmButtonText: "确定",
                    });
                  }
                });
            })
            .catch(() => {});
        }
      
    },

    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {
        type: contentType,
      });
    },
    grant(item) {
      console.log(item);
      if (item.buttonName.indexOf("导出") != -1) {
        let msg = item.wb_msg;
        let msgs = msg.split("#");
        let selectField = msgs.length > 2 ? msgs[2] : "*";
        let groupField = msgs.length > 3 ? msgs[3] : "";
        let listField = msgs.length > 4 ? msgs[4] : "";
        let titles = msgs.length > 5 ? msgs[5] : "";

        //let url='/social/excel/ExcelDownload?printName='+escape(escape(msgs[0]))+"&groupField="+groupField+"&selectField="+escape(escape(selectField))+"&titles="+escape(escape(titles))+"&listField="+escape(escape(listField))+"&sType="+escape(escape(msgs.length>1 ? msgs[1]:""))+"&sCurItem=&pParam="+escape(escape(JSON.stringify(this.searchData)));

        this.loading = true;
        request({
          headers: {
            Accept: "application/json",
          },
          url: "/social/excel/ExcelDownload",
          method: "post",
          data: {
            printName: escape(escape(msgs[0])),
            groupField: groupField,
            selectField: escape(escape(selectField)),
            titles: escape(escape(titles)),
            listField: escape(escape(listField)),
            sType: escape(escape(msgs.length > 1 ? msgs[1] : "")),
            sCurItem: "",
            pParam: escape(escape(JSON.stringify(this.searchData))),
            sKey: "" + this.sKey,
            listname: this.listname,
            limit: "" + this.limit,
            page: "" + this.page,
          },
        })
          .then((res) => {
            this.loading = false;
            let data = this.base64ToBlob(
              "data:application/vnd.ms-excel;base64," + res
            );
            let blob = new Blob([data], {
              type: "application/vnd.ms-excel",
            });
            console.log(blob);
            let fileName = Date.parse(new Date()) + ".xlsx";
            if (window.navigator.msSaveOrOpenBlob) {
              // console.log(2)
              navigator.msSaveBlob(blob, fileName);
            } else {
              // console.log(3)
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              //释放内存
              window.URL.revokeObjectURL(link.href);
            }
          })
          .catch((res) => {
            this.loading = false;
            let data = this.base64ToBlob(
              "data:application/vnd.ms-excel;base64," + res.response.data
            );
            let blob = new Blob([data], {
              type: "application/vnd.ms-excel",
            });
            console.log(blob);
            let fileName = Date.parse(new Date()) + ".xlsx";
            if (window.navigator.msSaveOrOpenBlob) {
              // console.log(2)
              navigator.msSaveBlob(blob, fileName);
            } else {
              // console.log(3)
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              //释放内存
              window.URL.revokeObjectURL(link.href);
            }
          });
      } else if (item.buttonName.indexOf("导入") != -1) {
        console.log(item.url, "item.buttonName");

        this.$router.push({
          path: item.url,
        });
        // this.$pushRouter({path:generalConfig.defaultUrl + item.url,})
        if (item.title) {
          this.titles = item.title;
        } else {
          this.titles = item.name;
        }
        this.centerDialogVisible2 = true;
      } else {
        console.log(item.url);
        this.$router.push({
          path: item.url + "&params=" + JSON.stringify(this.searchData),
          // query:JSON.stringify(this.searchData)
        });

        // this.$pushRouter({path:generalConfig.defaultUrl + item.url + "&params=" + JSON.stringify(this.searchData)})
        if (item.title) {
          this.titles = item.title;
        } else {
          this.titles = item.name;
        }
        this.centerDialogVisible2 = true;
      }
      console.log(item.url, "item.buttonName");
    },
  },
  created() {
    this.getData();
    this.loadData();
    window.addEventListener("keydown", this.handleKeyDown, true); //开启监听键盘按下事件
  },
};
</script>



<style scoped>
.g-box {
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.e-table {
  flex: 1;
  overflow: auto;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}

.view {
  height: 50px;
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

<style >
/* 全局样式 */
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 180px !important;
}
.warning-row {
  /* background: #c0d2c6 !important; */
  /* background: #DCDCDC !important; */
}
.success-row {
  /* background: #C0C0C0 !important; */
  background: #dcdcdc !important;
}
/* 	.el-dialog__header{
			text-align: center !important;
		} */
.el-dialog__title {
  font-size: 22px !important;
}
.el-table-column--selection .cell {
  text-align: center;
}
/* 操作下居中 */
.cell {
  text-align: center;
}
/* 表头颜色 */
.el-table--border th {
  /* background-color: #2196f394 !important; */
  /* box-shadow: 0 0 18px rgb(12 4 8 / 5%); */
  /* box-shadow: 0 2px 12px 0 rgb(0 0 0 / 5%); */
  font-weight: 700;
  font-size: 14px;
}
.buttonBox {
  margin-right: 10px;
}
/* 表格宽度铺满 */
.el-table__body,
.el-table__footer,
.el-table__header {
  width: 100% !important;
}
/* 反馈列表 */
.fkList{
	width: 100vw;
	height: 100vh;
	background-color: #0808087a;
	z-index: 100;
	position: absolute;
	top: -50px;
    left: -250px;
	}
.fkbox> .el-popover {
  width: 50% !important;
  z-index: 1000;
  padding:10px;
  max-height: 400px;
  /* overflow-y: auto; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center; 
}
.fkbox  .el-table__body tr:hover>td{
	background-color: aqua !important;
	cursor: pointer !important;
}

.fkbox th> .gutter{
	background-color: aqua;
	/* width: 9px !important; */
}
.el-icon-close{
	font-size: 14px;
}
.el-icon-close:hover{
	color: rgb(51, 203, 250) !important;
	
}
.fkbox .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #ebeef5;
}
</style>