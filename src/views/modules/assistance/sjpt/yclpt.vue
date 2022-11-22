<template>
  	<div class="g-box"> 
		<!-- 查询 -->
		<div class="search">
			<el-form :inline="true" :model="searchData" class="demo-form-inline">
                <el-form-item label-width="110px" label="姓名" >
                    <!-- <div class="block"> -->
                        <!-- <span class="demonstration">姓名：</span> -->
                        <el-input  v-model="searchData.name" placeholder="姓名" style="width: 180px"></el-input>
                    <!-- </div> -->
                </el-form-item>
             
             <el-form-item label-width="110px" label="身份证" >
             
                <!-- <div class="block"> -->
                    <!-- <span class="demonstration">身份证：</span> -->
                    <el-input  v-model="searchData.idCard" placeholder="身份证" style="width: 180px"></el-input>
                <!-- </div> -->
            </el-form-item>
            <el-form-item label-width="110px" label="数据来源" >
                <!-- <div class="block"> -->
                    <!-- <span class="demonstration">数据来源：</span> -->
                    <el-input  v-model="searchData.source" placeholder="数据来源" style="width: 180px"></el-input>
                    <!-- <el-select  v-model="searchData.source" >
                        <el-option value="预警来源" label="预警来源"></el-option>
                        <el-option value="其他来源" label="其他来源"></el-option>
                    </el-select> -->
                <!-- </div> -->
            </el-form-item>
            <el-form-item label-width="110px" label="行政区划" >
                <!-- <div class="block"> -->
                    <!-- <span class="demonstration">行政区划：</span> -->
                    <el-cascader  :props="props"  v-model="xzqhArray" clearable placeholder="行政区划"></el-cascader>
                <!-- </div> -->
            </el-form-item>

			<el-form-item label-width="110px"  >
				<el-button type="primary"  @click="queryListByCriteria" 
                    icon="el-icon-search" >
                    查询</el-button>
                    
                    <el-button type="info" @click="resetQuery" icon="el-icon-refresh" >
                    重置</el-button >
                <!-- </div> -->
            </el-form-item>
           </el-form >
		</div>
		
		<!-- 表格 -->
		<el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark" border 
		style="width: 100%" @selection-change="handleSelectionChange" height="100%" v-loading="loading">
			<el-table-column type="selection" width="55"> </el-table-column>
			<el-table-column prop="district" label="区县" width="120"> </el-table-column>
			<el-table-column prop="townStreet" label="街镇" width="120"></el-table-column>
			<el-table-column prop="rusticate" label="村居" width="120"></el-table-column>
			<el-table-column prop="idCard" label="身份证" width="120"> </el-table-column>
			<el-table-column prop="name" label="姓名" width="120"> </el-table-column>
			<el-table-column prop="source" label="来源" width="120"></el-table-column>
			<!-- <el-table-column label="提交时间" width="200">
				<template slot-scope="scope">{{ scope.row.jm_dat1 }}</template>
			</el-table-column> -->
			<el-table-column prop="active" label="操作"  width="120">
				 <template slot-scope="scope">
                    <el-button-group style=" width=100% ">
                        <el-button @click="handleClick(scope.row,'查看')" type="primary" size="small">查看</el-button>
                        <el-button @click="handleClick(scope.row ,'派发')" type="danger" size="small">派发</el-button>
                    </el-button-group>
      			</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<div class="block footer">
    <!-- <span class="demonstration">完整功能</span> -->
			<el-pagination background layout="total, sizes, prev, pager, next, jumper"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page"
			:page-size="pageSize"
			
			:total="totalElements">
			</el-pagination>
		</div>
	</div>
</template>
<script>
// import commonList from "../commonList";
import request from "@/utils/request";
import { Loading } from "element-ui";
export default {
  data() {
    return {
        
		tableData: [],
		page: 1, //当前页
		pageNum: "1",
		pageSize:20,
		totalElements:null, //总数
		loading: true,
        searchData:{
            name:'',
            divisionCode:'',
            idCard:'',
            source:'', 
            sortField:'',//排序
            pageSize:'', //每页几条
        },

        xzqhArray: [],      //行政区划搜索
        props: {
            checkStrictly:true,
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
                    // console.log(res);
                    // console.log(res,"city");
                    const nodes = res.response.data;
                    nodes.forEach((item) => {
                        item.value = item.cs_ex2 + "#" + item.cs_ex1;
                        item.label = item.cs_ex2;
                        item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
                    });
                    resolve(nodes);
                });
            },
        },
	};
  },

  components: {
    // commonList,
  },
  created(){
	  this.loadData()
  },
    methods:{
        // 换页
		handleSizeChange(val) {
			this.pageSize = val;
			this.loadData();
			console.log(`每页 ${val} 条`);
		},
        // 跳页
		handleCurrentChange(val) {
			this.page = val
			this.loadData();
			console.log(`当前页: ${val}`);
		},

		// 查询
		queryListByCriteria(){
			this.page = 1;
			this.loadData();

		},
		// 重置
		resetQuery() {
			// for (let key in this.searchData) {
			// 	this.searchData[key] = "";
			// }
		},

        // 复选
		handleSelectionChange(val) {
			// this.multipleSelection = val;
		},

        // 操作按钮
		handleClick(data,key){
            if(key=='查看'){

            }else if(key=='派发'){

            }
			console.log(data);
		},
		loadData(){
			this.loading = true;
            // this.searchData;
			this.yclList({
                name : this.searchData.name,
                divisionCode :this.searchData.divisionCode,
                idCard : this.searchData.idCard,
                source : this.searchData.source,
                sortField : this.searchData.sortField,
                pageSize : this.searchData.pageSize,
                // data:this.searchData
			}).then((res)=>{
				console.log(res,'then');
			}).catch((res)=>{

				console.log(res.response.data,'catch');
                if(res.response.data.status=='+OK'){
                    this.tableData = res.response.data.data.content
                    // this.tableData = JSON.parse(JSON.stringify(res.response.data.data) ) 
                    // console.log(this.tableData);
                    this.loading = false;

                }else{
                    this.$message.error('网络错误');
                    this.loading = false;
                }

				
			})
		},


		yclList(data) {
            return request({
                headers: {
                    Accept: "application/json",
                },
                url: "/social/bigDataWarn/getWarnPrePareList",
                method: "post",
                data: data,
            });
    },
  }
};
</script>
<style scoped>
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}
.search{
	margin-left: 20px;
	margin-bottom:50px ;
	display: flex;
}
.search .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 240px !important;
}
.demonstration{
	font-size: 14px;
    color: #606266;
}
.block{
	margin-right: 10px;
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