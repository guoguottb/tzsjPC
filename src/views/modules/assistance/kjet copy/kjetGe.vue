
<template>
  	<div class="g-box"> 
		<!-- 查询 -->
		<div class="search">
			<el-form :inline="true" :model="searchData" class="demo-form-inline">
                <el-form-item label-width="110px" label="儿童姓名" >
                        <el-input  v-model="searchData.applyName" placeholder="儿童姓名" style="width: 180px"></el-input>
                </el-form-item>
				<el-form-item label-width="110px" label="儿童身份证" >
				        <el-input  v-model="searchData.idCard" placeholder="儿童身份证" style="width: 180px"></el-input>
				</el-form-item>
				<el-form-item label-width="110px" label="是否健康" >
						<el-select v-model="searchData.whetherHealth" placeholder="请选择是否健康">
							<el-option
							  v-for="item in whethers"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select>
				</el-form-item>
				<el-form-item label-width="110px" label="是否残疾" >
						<el-select v-model="searchData.whetherDisability" placeholder="请选择是否残疾">
							<el-option
							  v-for="item in whethers"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select>
				</el-form-item>
				<el-form-item label-width="110px" label="是否重病" >
						<el-select v-model="searchData.whetherSeriousIllness" placeholder="请选择是否重病">
							<el-option
							  v-for="item in whethers"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select>
				</el-form-item>
				<el-form-item label-width="110px" label="残疾类型" >
						<el-select v-model="searchData.disabilityType" placeholder="请选择残疾类型">
							<el-option
							  v-for="item in disabilityTypes"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select>
				</el-form-item>
				<!-- <el-form-item label-width="110px" label="残疾类型" >
				        <el-input  v-model="searchData.disabilityType" placeholder="残疾类型" style="width: 180px"></el-input>
				</el-form-item> -->
				<!-- <el-form-item label-width="110px" label="救助类型" >
						<el-select v-model="searchData.type" placeholder="请选择">
							<el-option
							  v-for="item in options2"
							  :key="item.value"
							  :label="item.label"
							  :value="item.value">
							</el-option>
						  </el-select>
				</el-form-item> -->
			
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
		<el-tabs v-model="activeName" @tab-click="handleClickSelect">
		  <el-tab-pane  v-for="(item, index) in options2"
		    :name="item.listname"
		    :key="index" >
		  <span slot="label" >{{ item.value}}
		  <!-- 列表数据数量显示 -->
		  		<span class="tabNum" v-if="item.label && item.label <= 99">
		  			{{ item.label }}
		  		</span>
		  		<span class="tabNum" v-else-if="item.label && item.label > 99" >
		  			99+
		  		</span>
		  		</span>
		  </el-tab-pane>
		</el-tabs>
		<!-- 表格 -->
		<el-table  ref="multipleTable" :data="tableData" tooltip-effect="dark" border 
		style="width: 100%" @selection-change="handleSelectionChange" height="100%" v-loading="loading">
      <el-table-column prop="selecttions" type="selection" width="40px"> </el-table-column>
      <!-- <el-table-column prop="id" label="ID" width="40px"></el-table-column> -->
      <el-table-column prop="name" label="儿童姓名" width="100px"></el-table-column>
      <el-table-column prop="idCard" label="儿童身份证" width="160px"></el-table-column>
      <el-table-column prop="gender" label="性别" width="100px"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="100px"> </el-table-column>
      <el-table-column prop="healthStatus" label="健康状态" width="120px"></el-table-column>
      <el-table-column prop="typeName" label="儿童类型" width="100px"></el-table-column>
	  <el-table-column prop="money" label="救助金额" width="100px"></el-table-column>
	  <el-table-column prop="expression" label="儿童补助政策公式" width="150px"></el-table-column>
	  <el-table-column prop="livingAllowance" label="儿童生活补贴费" width="150px"></el-table-column>
	  <el-table-column prop="basicLivingMoney" label="低保金" width="100px"></el-table-column>
	  <el-table-column prop="disabledSubsidyMoney" label="残疾人生活补贴费" width="150px"></el-table-column>
      <el-table-column prop="applyTime" label="申请时间" width="100px"></el-table-column>
	  <el-table-column v-if="isExamine" prop="auditTime" label="初审时间" width="100px"></el-table-column>
	  <el-table-column  v-if="isApproval" prop="approvalTime" label="审批时间" width="100px"></el-table-column>
	  <el-table-column v-if="isFinish" prop="completionTime" label="办结时间" width="100px"></el-table-column>
      <!-- <el-table-column prop="behalfApply" label="是否代申请" width="100px"></el-table-column> -->
      <el-table-column prop="applyName" label="申请人" width="100px"></el-table-column>
      <el-table-column prop="active"  label="操作" :width="cazuoBtn">
				 <template slot-scope="scope">
         <el-button-group >
            <el-button  @click="handleClick(scope.row,'查看')" type="primary" size="small">查看</el-button>
						<el-button  @click="handleClick(scope.row ,'查看核对报告')" type="primary" size="small">查看核对报告</el-button>
                        <!-- 审核节点的按钮 -->
						<el-button  v-if="isExamine" @click="handleClick(scope.row ,'审核')" type="danger" size="small">审核</el-button>
						<!-- 审批节点的按钮 -->						
						<el-button  v-if="isApproval" @click="handleClick(scope.row ,'审批')" type="danger" size="small">审批</el-button>						
						<!-- 办结节点的按钮 -->
						<el-button  v-if="isFinish" @click="handleClick(scope.row ,'救助转移')" type="danger" size="small">转移</el-button>
						<el-button  v-if="isFinish" @click="handleClick(scope.row ,'打印档案')" type="primary" size="small">打印档案</el-button>
						<el-button  v-if="isFinish" @click="handleClick(scope.row ,'打印通知书')" type="primary" size="small">打印通知书</el-button>		
						<el-button  v-if="isFinish" @click="handleClick(scope.row ,'变更')" type="danger" size="small">变更</el-button>
						<el-button  v-if="isFinish" @click="handleClick(scope.row ,'注销')" type="danger" size="small">注销</el-button>
        </el-button-group>
      			</template>
			</el-table-column>
		</el-table>

<!--		 分页-->
		<div class="block footer">
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
    name:'yjptsz',
    data() {
        return {
        cazuoBtn:'240',
				isExamine:false,			//是否审核节点
				isApproval:false,			//是否审批节点				
				isFinish:false,				//是否办结节点				
				tabsNum2: {},       //业务节点数据数量
				//布尔类型下拉框
				whethers: [
					{
						value:'true',
						label:'是'
					},{
						value:'false',
						label:'否'
				}],
				//困境儿童残疾类型 (非残疾,智力残疾,肢体残疾,听力残疾,精神残疾,视力残疾,言语残疾,多重残疾)
				disabilityTypes: [
				   {
			          value: '智力残疾',
			          label: '智力残疾'
			        }, {
			          value: '肢体残疾',
			          label: '肢体残疾'
			        }, {
			          value: '听力残疾',
			          label: '听力残疾'
			        }, {
			          value: '精神残疾',
			          label: '精神残疾'
			        }, {
			          value: '视力残疾',
			          label: '视力残疾'
			        }, {
					  value: '言语残疾',
					  label: '言语残疾'
					},{
					  value: '多重残疾',
					  label: '多重残疾'
					}],
			//困境儿童救助类型:孤儿,事实无人抚养,重病重残,贫困家庭,其他,未知
              options: [{
                      value: '孤儿',
                      label: '孤儿'
                    }, {
                      value: '事实无人抚养',
                      label: '事实无人抚养'
                    }, {
                      value: '重病重残',
                      label: '重病重残'
                    }, {
                      value: '贫困家庭',
                      label: '贫困家庭'
                    }, {
                      value: '其他',
                      label: '其他'
                    }, {
					  value: '未知',
					  label: '未知'
					}],
			//申请,退回,核查派单,信息核对,审核,审批,办结
			options2: [{
			        value: '审核',
			        label: 0
			      }, {
			        value: '审批',
			        label: 0
			      }, {
			        value: '办结',
			        label: 0
			      }],
			newStatus:"",	  
			activeName: "", //业务节点名
            tableData: [],
            page: 1, //当前页
            pageNum: "1",
            pageSize:20,
            totalElements:null, //总数
            loading: true,
            searchData:{
                applyName:'',
                checkStatus:'',
				disabilityTypes:'',
				idCard:'',
				name:'',
				pageSize:'', //每页几条
        sortField:'',//排序
        source:'',
				status:'',
				type:'',
				whetherDisability:'',
				whetherHealth:'',
				whetherSeriousIllness:'',
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
		this.isExamine=true;	
        this.loadData();
		this.getStatusNums();
    },
    methods:{
		//切换业务节点
		handleClickSelect(){
			this.loading = true;	
			//0=审核  1=公示  2=审批  3=办结
			if(this.activeName==0){
				this.newStatus="审核";
				this.isExamine=true;				
				this.isApproval=false;
				this.isFinish=false;
        this.cazuoBtn = '240';
			}
			if(this.activeName==1){
				this.newStatus="审批"
				this.isExamine=false;				
				this.isApproval=true;
				this.isFinish=false;
        this.cazuoBtn = '240';
			}
			if(this.activeName==2){
				this.newStatus="办结"
				this.isExamine=false;				
				this.isApproval=false;
				this.isFinish=true;
        this.cazuoBtn = '540';
			}
			this.kjetList({
			   status:	this.newStatus,
			   type:'孤儿'
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
			this.searchData={}
		},

        // 复选
		handleSelectionChange(val) {
			// this.multipleSelection = val;
		},

        // 操作按钮
		handleClick(data,key){
            if(key=='查看'){
				if(process.env.NODE_ENV == "development"){  //生产环境执行
					// grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
					this.$router.push({path: '/social/assistance/kjet/kjetListView?id='+data.id,});
				}else {
					this.$pushRouter({path:generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView',})
				}
            }else if(key=='审核'){
					if(process.env.NODE_ENV == "development"){  //生产环境执行
						// grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
						this.$router.push({path: '/social/assistance/kjet/kjetListView?type=审核&id='+data.id,});
					}else {
						this.$pushRouter({path:generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView',})
					}
            }else if(key=='审批'){
					if(process.env.NODE_ENV == "development"){  //生产环境执行
						// grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
						this.$router.push({path: '/social/assistance/kjet/kjetListView?type=审批&id='+data.id,});
					}else {
						this.$pushRouter({path:generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView',})
					}
			}else if(key=='打印档案'){
					alert(key)					
			}else if(key=='打印通知书'){
					alert(key)															
			}else if(key=='救助转移'){
					if(process.env.NODE_ENV == "development"){  //生产环境执行
						// grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
						this.$router.push({path: '/social/assistance/kjet/kjetRescueTransfer?sId='+data.id,});
					}else {
						this.$pushRouter({path:generalConfig.defaultUrl + '/social/assistance/kjet/kjetRescueTransfer',})
					}
			}else if(key=='变更'){
					if(process.env.NODE_ENV == "development"){  //生产环境执行
						// grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
						this.$router.push({path: '/social/assistance/kjet/kjetChangeView?sId='+data.id,});
					}else {
						this.$pushRouter({path:generalConfig.defaultUrl + '/social/assistance/kjet/kjetChangeView',})
					}
					
			}else if(key=='注销'){
				if(process.env.NODE_ENV == "development"){  //生产环境执行
					// grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
					this.$router.push({path: '/social/assistance/kjet/kjetListView?type=注销&id='+data.id,});
				}else {
					this.$pushRouter({path:generalConfig.defaultUrl + '/social/assistance/kjet/kjetListView',})
				}
			}else if(key=='查看核对报告'){
					
			}
			console.log(data);
		},
		loadData(){
			this.loading = true;
            // this.searchData;
			this.kjetList({
               applyName: this.searchData.applyName,
               checkStatus: this.searchData.checkStatus,
               disabilityTypes:	this.searchData.disabilityTypes,
               idCard:	this.searchData.idCard,
               name:	this.searchData.name,
               source:	this.searchData.source,
               status:	'审核',
               type:	'孤儿',
               whetherDisability:	this.searchData.whetherDisability,
               whetherHealth:	this.searchData.whetherHealth,
               whetherSeriousIllness:	this.searchData.whetherSeriousIllness,
			   pageNo: this.page, //第几页默认从0开始
			   pageSize: this.pageSize, //每页几条
                // data:this.searchData
			}).then((res)=>{
				console.log(res,'then');
			}).catch((res)=>{

				console.log(res.response.data,'catch');
                if(res.response.data.status=='+OK'){
                    this.tableData = res.response.data.data.content
					this.totalElements = res.response.data.data.totalElements;
					this.totalPages = res.response.data.data.totalPages;
                    // this.tableData = JSON.parse(JSON.stringify(res.response.data.data) ) 
                    // console.log(this.tableData);
                    this.loading = false;

                }else{
                    this.$message.error('网络错误');
                    this.loading = false;
                }
			})
		},
		getStatusNums(){
			this.getChildNumsGroupByStatus({
				type:"孤儿"
			}).then((res) =>{
				
			}).catch((res) =>{
			console.log("业务节点数量",res.response.data.data)
				for (var i = 0; i < this.options2.length; i++) {				
					if(this.options2[i].value=='审核'){
						this.options2[i].label=res.response.data.data.审核
					}
					if(this.options2[i].value=='审批'){
						this.options2[i].label=res.response.data.data.审批
					}
					if(this.options2[i].value=='办结'){
						this.options2[i].label=res.response.data.data.办结
					}
				}
				// console.log(this.options2[1].value)
				// console.log("业务节点数量",res.response.data.data.核查派单)
			})
		},


		newLoadData(key){
			this.kjetList({
			   status:	key,
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
		kjetList(data) {
            return request({
                headers: {
                    Accept: "application/json",
                },
                url: "/social/child/getChildList",
                method: "post",
                data: data,
            });
    },
	//获取各节点数据
	getChildNumsGroupByStatus(data) {
	  return request({
	    headers: {
	      Accept: "application/json",
	    },
	    url: "/social/child/getChildNumsGroupByStatus",
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
