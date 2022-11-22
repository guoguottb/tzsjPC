<template>
    <div class="g-box"> 
       <div>
            <el-button type="primary" @click ="goBack">返回资金发放管理</el-button>
            <el-button type="danger" @click ="dialogVisible=true">资金发放管理确认信息导出</el-button>
       </div>

        <el-table :data="fomeData" border style="width: 100%; margin-top:20px;" height="600px" v-loading="loading"  element-loading-text="正在加载数据，请稍后">
        <el-table-column prop="arc_ex1" label="业务名称" width="120"> </el-table-column>
        <el-table-column prop="arc_ex9" label="发放机构名称" width="120"> </el-table-column>
        <el-table-column prop="arc_ex5" label="确认单位名称" width="120"> </el-table-column>
        <el-table-column prop="arc_dat2" label="发放年月" width="100"> </el-table-column>
        <el-table-column prop="arc_dat1" label="完成确认时间" width="120"> </el-table-column>
        <el-table-column prop="arc_ex7" label="发放类型" width="120"> </el-table-column>
        <el-table-column prop="arc_ex2" label="发放笔数" width="100"> </el-table-column>
        <el-table-column prop="arc_ex3" label="发放金额" width="120"> </el-table-column>
        <el-table-column prop="arc_ex11" label="发放人数" width="120"> </el-table-column>
        <el-table-column  label="操作" width="180px" style="text-align:center">
            <template slot-scope="scope">
                <el-button type="primary" v-if="['街道','镇','园区','乡','滨江新区','公司'].every( item => scope.row.arc_ex5.indexOf(item)==-1 ) && ['1',''].includes(grade)"  @click ="next(scope.row)">查看资金发放确认信息</el-button>
                <!-- <el-button type="primary" v-else-if="scope.row.arc_ex5.indexOf('街道')==-1 && scope.row.arc_ex5.indexOf('镇')==-1 && grade=='2'"  @click ="last(scope.row)">返回上一级</el-button> -->
                <el-button type="primary" v-else-if="['街道','镇','园区','乡','滨江新区','公司'].every( item => scope.row.arc_ex5.indexOf(item)==-1 ) && grade=='2'"  @click ="last(scope.row)">返回上一级</el-button>
            </template>
        </el-table-column>
        </el-table>

        <el-dialog title="导出提示" :visible.sync="dialogVisible" width="30%" >
        <!-- <span>这是一段信息</span> -->
        <el-select v-model="type" placeholder="请选择一种救助类型">
           <el-option
            v-for="item in names"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="exportData">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
    data() {
        return {
            fomeData: [],
            arc_ex4:'',
            loading:true,
            sId:'',
            confirmationDate:'',
            grade:'',
            queryArr:[],
            loading:true,
            dialogVisible: false,
            type:'',
            names: [
					// 最低生活保障边缘 在泰州的标准名称应该是 低保边缘家庭
                    {label: "农村最低生活保障", value: "农村最低生活保障"},
                    {label: "城市最低生活保障", value: "城市最低生活保障"},
                    {label: "特困人员供养", value: "特困人员供养"},
                    {label: "单人保家庭", value: "单人保家庭"},
                    {label: "低保边缘家庭", value: "最低生活保障边缘"},
                    {label: "支出型困难家庭", value: "支出型困难家庭"},
                    {label: "临时救助", value: "临时救助"}
                ],
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData(data,key) {

            console.log(this.$router);
            this.queryArr.push(this.$route.query);


            console.log(this.$route.query.grade);
            var charId = sessionStorage.getItem("charId").split('_')[1];
            if(this.$route.query.grade!=undefined){

                this.grade = this.$route.query.grade;
            }

            // console.log(charId,'charId');
            console.log(data,'data');
            console.log(this.grade,'this.grade');
            
            // 获取区划编码 / 账号
            if(data == undefined){
                this.arc_ex4 = charId;
            }else{
                for(let i in this.fomeData){
                    if(key=='last'){
                         this.arc_ex4 = data.arc_ex10
                    }else
                    if( data.arc_ex4 == this.fomeData[i].arc_ex4){

                        this.arc_ex4 = this.fomeData[i].arc_ex4;
                    }
                }
            }

            console.log(this.$route.query.confirmationDate,'年月');

            if(this.fomeData.length==0){

                if(this.$route.query.confirmationDate==undefined){
                    // 非总汇 sId用按钮自带id
                    this.sId = this.$route.query.sId;

                }else{
                    this.confirmationDate = this.$route.query.confirmationDate;
                    // 总汇 sId为空
                }
            }else{
                // console.log(data);
                this.sId = data.arc_mainid;
                // 用泰州的账号看汇总确认的区级信息，继续看下一级的时候要把年月给去掉,因为后端在判断权限的时候先判断的年月
                // 如果用查看汇总按钮进入的在街道级展示返回上一级的时候要加上时间，因为返回的是大市级要看到所有的
                if(this.$route.query.confirmationDate!='' && key=='last'){
                     this.confirmationDate = this.$route.query.confirmationDate;
                }else{

                    this.confirmationDate = '';
                }
            }

            this.loading = true;

            this.confirmReliefdistList({
                sId: this.sId,
                arc_ex4: this.arc_ex4,
                confirmationDate: this.confirmationDate,
            }).then((res) => {
                
                alert(res[0].data);

            }).catch((res) => {
                if (typeof res.request === "undefined" ||typeof res.response === "undefined" ||  res.request.status != 200 ) {
                    console.log("请求失败了-----------------------6");
                    this.$message.error("数据获取失败或请求超时");
                    this.$emit("closes", false);
                    this.goBack();
                    return false;
                }

                console.log(res.response.data[0], "信息确认");
                if(res.response.data.length>0){
                    if(res.response.data[0].status=="+ERR" ){
                        this.$message.error(res.response.data[0].msg);
                         this.loading = false;
                        this.goBack();
                        return false;
                    }else{
                        this.fomeData = res.response.data;
                        this.loading = false;
    
                    }
                }else{
                    this.fomeData = res.response.data;
                    this.loading = false;
                }

            });
        },

    
        // 返回
        goBack() {
            this.$emit("closes", false)
            this.$router.go(-1)
            if(process.env.NODE_ENV!="development"){
                this.$router.go(-1)
            }
        },

        // 查看下一级
        next(data){
            // console.log(data,112233);
            this.$route.query.grade = '2';
            this.$forceUpdate();
            this.loadData(data);

        },
        // 返回上一级
        last(data){
            this.$route.query.grade = '1';
            this.$forceUpdate();
            this.loadData(data,'last');
        },

        // 导出数据
        exportData(){

            this.dialogVisible = false;
            this.loading = true;

            // 如果是大市账号导出区级确认信息，就进行年月格式转换
            if(this.arc_ex4== "321200000000"){
               var arr = this.confirmationDate.split('');
                //  年月格式转换
               if(arr[4]=='-'){

               }else{
                   arr[3]+='-';
               }

                this.confirmationDate = arr.join('');

                console.log(arr,'1');

                console.log(this.confirmationDate,'1');
            }else{
                //  var arr = this.confirmationDate.split('');
                console.log(this.arc_ex4,'2');
                console.log( this.confirmationDate,'2');
            }

            // return
             this.ExportData({
                // "data": JSON.stringify(this.fomeData) ,
                sId: this.sId,
                arc_ex4: this.arc_ex4,
                confirmationDate: this.confirmationDate,
                type:this.type,
            })
            .then((res)=>{})
            .catch((res)=>{
                 if (typeof res.request === "undefined" ||typeof res.response === "undefined" ||  res.request.status != 200 ) {
                    console.log("请求失败了-----------------------6");
                    this.$message.error("数据获取失败或请求超时");
                    this.$emit("closes", false);
                    this.goBack();
                    return false;
                }
                    
                
                let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data );
                let blob = new Blob([data], {type: "application/vnd.ms-excel", });
                let fileName = Date.parse(new Date()) + ".xlsx";
                console.log(blob);
                this.loading = false;

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



        },

        // 加载数据
        confirmReliefdistList(data) {
            return request({
                method: "post",
                url: "/social/assistance/confirmReliefdistList",
                data: data,
            });
        },
        
        // 导出
        ExportData(data) {
            return request({
                method: "post",
                url: "social/excel/exportReliefdistConfirmExcel",
                data: data,
            });
        },

        // excel转码
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
</style>