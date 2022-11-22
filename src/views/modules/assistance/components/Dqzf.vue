<template>
  <el-dialog title="请求走访查看" center :visible.sync="dialogVisible"  width="50%" :before-close="handleClose"  top="5vh">
    <div class="ComplaintsView">
      <!-- 返回主页 -->

      <!-- 解析出来的数据 style="width:800px" -->
        <el-form ref="form" :model="form" label-width="100px" >
            <el-form-item label="走访对象">
                <el-input v-model="form.arv_ex1"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="form.arv_ex2"></el-input>
            </el-form-item>
            <el-form-item label="保障类别">
                <el-input v-model="form.arv_ex4"></el-input>
            </el-form-item>
            <el-form-item label="行政区划">
                <el-input v-model="form.arv_ex14"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址">
                <el-input  v-model="form.arv_ex3"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input  disabled v-model="form.arv_ex5"></el-input>
            </el-form-item>
            <el-form-item label="走访人">
                <el-input  disabled v-model="form.arv_ex6"></el-input>
            </el-form-item>
            <el-form-item label="走访内容">
                <el-input  disabled v-model="form.arv_ex7"></el-input>
            </el-form-item>
            <el-form-item label="走访类型">
                <el-input  disabled v-model="form.arv_ex8"></el-input>
            </el-form-item>
            <el-form-item label="发现问题">
                <el-input  disabled v-model="form.arv_ex9"></el-input>
            </el-form-item>
            <el-form-item label="走访照片">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>相关材料(<span style='color:red'>{{imgNum.complaint_picture_len}}</span>)</span>
                    </div>
                    <image-view v-if="this.imgArr.complaint_picture_len" :imgList="this.imgArr.complaint_picture_len" height="150px" width="150px"></image-view>
                </el-card>

                <!-- <el-input type="textarea" v-model="form.complaint_content"></el-input> -->
            </el-form-item>

           
        </el-form>
    </div>
  </el-dialog>
</template>

<script>
import imageView from '../imageView'
import request from "@/utils/request";
export default {
  name: "Upload",
  components: {
        imageView,
    },
  props: ["data", "isShow"],
  data() {
    return {
        form: this.data,
        show: false,
        dialogVisible: this.isShow,
        isShow1: this.isShow, // 向父组件传值
        tableData: [],
        imgNum:{},//图片数量
        imgArr:{},//图片数组
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    isShow1(newS, oldS) {

      this.isShow1 = newS;
      this.getEmit(newS);
      // this.loadData(newS);
    },
    
  },
  methods: {
    loadData() {
      console.log(this.data, "定期走访数据");
    //   this.imgArr.complaint_picture_len = this.data.complaint_picture.split(",");

    //   for(let key in this.imgArr){
    //         if(this.imgArr[key][0] == ''){
    //             this.imgArr[key].length = 0;
    //             this.imgNum[key] = this.imgArr[key].length;
    //         }else{
    //             this.imgNum[key] = this.imgArr[key].length;
    //         }
    //     }
    },

    // 子向父传值
    getEmit() {
      // console.log(this.isShow1,'this.isShow1==');
      // console.log(this.close,'this.close==');
      this.$emit("function", this.isShow1, this.close);
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.dialogVisible = false;
          this.isShow1 = false;
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>


<style lang="less" scoped>
.g-box {
  height: 80vh !important;
}
.g-box2 {
  width: 100%;
  height: 100%;
  overflow: auto !important;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
.homeBox {
  // position: fixed;
  // top: 10px;
  // right: 20px;
  z-index: 9999;
  font-size: 16px;
}

.buttonBox {
  padding: 15px;
  display: flex;
  width: 35%;
  overflow: auto;
  box-sizing: border-box;
  justify-content: flex-start;
  & .el-button {
    margin-right: 20px !important;
  }
}

.tableBox {
  padding: 0 15px;
  h3 {
    font-size: 18px;
    color: #f56c6c;
    padding-bottom: 15px;
  }
  .el-table {
    // height: 390px;
  }
}
</style>
