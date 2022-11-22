<template>
  <div class="g-box">
   <div class="topSearchBox">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="form">
      <el-form-item label="用户姓名">
        <el-input v-model.trim="formInline.username" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model.trim="formInline.userID" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        <el-button type="info" @click="onReset" icon="el-icon-refresh">重置</el-button>
      </el-form-item>
    </el-form>    
    <!-- table -->
    <el-table v-loading='loading' border :data="tableData" style="width: 100%" height="600">
    <el-table-column prop="No" label="序号" width="60"></el-table-column>
    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
    <el-table-column prop="IDCard" label="身份证号" width="150"></el-table-column>
    <el-table-column prop="phone" label="联系电话" width="150"></el-table-column>
    <el-table-column prop="ab_dat22" label="提交核对时间" width="160"></el-table-column>
    <el-table-column prop="HDTime" label="一般核对时间（天）" width="150"></el-table-column>
    <el-table-column prop="timeout" label="超时时间（天）" width="120"></el-table-column>
    <!-- <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="handleClick(scope.$index, tableData)"
          type="primary"
          size="small">
          查看
        </el-button>
      </template>
    </el-table-column> -->
  </el-table>
  <!-- footer change page -->
  <div class="block footerPage" style="marginTop:10px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100]"  
      :page-size="30"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalData">
    </el-pagination>
  </div>
   </div>
 </div>
</template>

<script>
import { getInspectReportWgApi } from "@/api/yjptxt/objectWg"
export default {
  data() {
    return {
      formInline: {
          username: '',
          userID: ''
        },
         tableData: [
        //   {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市普陀区金沙江路 1518 弄',
        //   zip: 200333
        // }, 
        ],
        currentPage:1,
        loading:false,
        totalData:200,  //总条数
    }
  },
  created() {
    this.getInspectReportWg()
    // console.log("create")
  },
  methods: {
    // 查询按钮
    onSubmit() {
        console.log('submit!');
        this.currentPage= 1
        this.formInline;
        this.getInspectReportWg();
      },
      // 重置按钮
      onReset(){
       this.formInline.username = ""
       this.formInline.userID = ""
      },
      // 获取table数据
      async getInspectReportWg(){

        this.loading = true;
        console.log(' 获取table数据');
        await getInspectReportWgApi({
          page:this.currentPage.toString(),
          card:this.formInline.userID,
          name:this.formInline.username
        }).then( res=>{
          console.log(res,'then');
        }).catch(res=>{
          console.log(res,'catch');
          if(res.response.status == 200 ){
            this.loading = false;
            this.tableData=[];

            for( let i in res.response.data){
              let obj = {
                No:'',
                ab_dat22:'',
                name: '',
                IDCard: '',
                city: '',
                phone:'',
                timeout: '',
                HDTime: '30'
              };

              this.tableData.push(obj);

              for( let j in res.response.data[i]){
                res.response.data[i][j] = unescape(res.response.data[i][j]);
              }
                this.tableData[i].No = res.response.data[i].rownumber;
                this.tableData[i].ab_dat22 = res.response.data[i].ab_dat22;
                this.tableData[i].name = res.response.data[i].ab_ex3;
                this.tableData[i].IDCard = res.response.data[i].ab_ex7;
                this.tableData[i].phone = res.response.data[i].ab_ex28;
                this.tableData[i].timeout = Math.round((new Date() - new Date(res.response.data[i].ab_dat22))/1000/60/60/24)-30;
            }
            // console.log(res.response.data);

            console.log(new Date(this.tableData[0].ab_dat22));
            console.log(new Date());
            console.log(Math.round((new Date() - new Date(this.tableData[0].ab_dat22))/1000/60/60/24)-30);
          }else{
            this.loading = false;
            this.$message.error('网络错误')
          }

        })
        // console.log(data)
      },
      // 查看按钮
      handleClick(row) {
        console.log(123)
        this.$router.push("/assistance/tk/tkListView")
      },
      // 切换pageSize
      handleSizeChange(){
        console.log(1);
      },
      // 换页
      handleCurrentChange(val){
        console.log(  `换页:${val}`);
        this.currentPage = val;
        console.log(  `当前页:${this.currentPage}`);
        this.getInspectReportWg();
        // this.page
      },

      // indexMethod(index){
      //   return index+1
      // }
  },
  computed:{
  num(){
    return 123
  }
  }
}
</script>

<style scoped lang='less'>
.footerPage {
  display: flex;
  justify-content: flex-end;
}
</style>
