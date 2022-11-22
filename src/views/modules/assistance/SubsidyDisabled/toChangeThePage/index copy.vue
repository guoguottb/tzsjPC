<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="20">
          <div class="leftFather">
            <!-- 档案信息 -->
            <div id="page1">
              <h3 class="pageTitle">基本信息</h3>
            </div>
            <el-form ref="ruleForm"
                     :rules="rules"
                     :model="ruleForm"
                     label-width="80px">
              <!-- 姓名、身份证 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="姓名"
                                prop="abd_ex2"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="身份证"
                                prop="abd_ex3"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex3"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 性别、年龄 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="性别"
                                label-width="120px">
                    <el-select v-model="ruleForm.abd_ex12"
                               disabled
                               placeholder="">
                      <el-option label="男"
                                 value="男"></el-option>
                      <el-option label="女"
                                 value="女"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="年龄"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex34"
                              disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 户籍类型、民族 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="户籍类别"
                                prop="abd_ex17"
                                label-width="120px">
                    <el-select v-model="ruleForm.abd_ex17"
                               placeholder="">
                      <el-option label="农业户口"
                                 value="农业户口"></el-option>
                      <el-option label="非农业户口"
                                 value="非农业户口"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="民族"
                                prop="abd_ex16"
                                label-width="120px">
                    <el-select v-model="ruleForm.abd_ex16"
                               placeholder="">
                      <el-option label="汉族"
                                 value="汉族"></el-option>
                      <el-option label="新疆维吾尔族"
                                 value="新疆维吾尔族"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 与户主关系/残疾证号 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="与户主关系"
                                prop="abd_ex66"
                                label-width="120px">
                    <el-select v-model="ruleForm.abd_ex66">
                      <el-option label="户主本人"
                                 value="户主本人"></el-option>
                      <el-option label="户主母亲"
                                 value="户主母亲"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="残疾证号"
                                prop="abd_ex5"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex5"
                              placeholder="请输入残疾证号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 残疾类别、残疾等级 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="残疾类别"
                                prop="abd_ex15"
                                label-width="120px">
                    <el-select v-model="ruleForm.abd_ex15"
                               placeholder="">
                      <el-option label="农业户口"
                                 value="农业户口"></el-option>
                      <el-option label="城市户口"
                                 value="城市户口"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="残疾等级"
                                prop="abd_ex14"
                                label-width="120px">
                    <el-select v-model="ruleForm.abd_ex14"
                               placeholder="">
                      <el-option label="汉族"
                                 value="汉族"></el-option>
                      <el-option label="新疆维吾尔族"
                                 value="新疆维吾尔族"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 户籍住址、现住址 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="户籍住址"
                                prop="abd_ex19"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex19"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="现住址"
                                prop="abd_ex18"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex18"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 家庭人口数、伤残原因说明 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="家庭人口数"
                                prop="abd_ex67"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex67"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="伤残原因说明"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex68"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 残疾人收入说明、是否享受低保 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="残疾人收入说明"
                                label-width="160px">
                    <el-input v-model="ruleForm.abd_ex69"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="是否享受低保"
                                label-width="120px">
                    <el-select v-model="ruleForm.abd_ex70">
                      <el-option label="是"
                                 value="是"></el-option>
                      <el-option label="否"
                                 value="否"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 家庭特征、联系电话 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="家庭特征"
                                label-width="120px">
                    <el-select v-model="ruleForm.abd_ex73"
                               placeholder="请选择">
                      <el-option label="健康"
                                 value="健康"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="联系电话"
                                prop="abd_ex20"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex20"
                              placeholder="请输入电话号码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 申请时间、行政区域 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="申请时间"
                                label-width="120px">
                    <div class="block"
                         style="width:100%!important">
                      <el-date-picker disabled
                                      v-model="ruleForm.abd_dat5"
                                      type="date"
                                      placeholder="选择日期">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="行政区域"
                                label-width="120px">
                    <div class="block"
                         style="width:100%!important">
                      <el-cascader :props="props"
                                   v-model="ruleForm.abd_ex28"></el-cascader>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 是否属于村干部或经办人员近亲属、求助描述 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="是否属于村干部或经办人员近亲属"
                                prop="abd_ex75"
                                label-width="280px">
                    <el-select v-model="ruleForm.abd_ex75"
                               placeholder="请选择">
                      <el-option label="是"
                                 value="是"></el-option>
                      <el-option label="否"
                                 value="否"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="求助描述"
                                prop="abd_ex76"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex76"
                              placeholder="请输入求助描述"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 求助原因 -->
              <el-row>
                <el-col :span="24"
                        style="marginRight:120px">
                  <el-form-item label="求助原因"
                                prop="forReasons"
                                label-width="120px">
                    <!-- <el-checkbox v-model="ruleForm.ForReasons.checkedA">缺乏劳动力</el-checkbox>
                    <el-checkbox v-model="ruleForm.ForReasons.checkedB">无生活来源</el-checkbox>
                    <el-checkbox v-model="ruleForm.ForReasons.checkedC">疾病</el-checkbox>
                    <el-checkbox v-model="ruleForm.ForReasons.checkedD">残疾</el-checkbox>
                    <el-checkbox v-model="ruleForm.ForReasons.checkedE">教育</el-checkbox>
                    <el-checkbox v-model="ruleForm.ForReasons.checkedF">住房</el-checkbox>
                    <el-checkbox v-model="ruleForm.ForReasons.checkedG">受灾</el-checkbox>
                    <el-checkbox v-model="ruleForm.ForReasons.checkedH">其他</el-checkbox> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- 其他信息 -->
            <div id="page2">
              <h3 class="pageTitle">其他信息</h3>
            </div>
            <el-form ref="form"
                     :model="ruleForm"
                     label-width="80px">
              <!-- 开户银行、开户人 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="开户银行"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex23"
                              placeholder="请输入开户银行名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="开户人"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex78"
                              placeholder="请输入开户人名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 银行账号、银行总存款 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="银行账号"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex24"
                              placeholder="请输入银行卡账号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="银行总存款"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex79"
                              placeholder="请输入银行卡总金额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 有价证券、债券 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="有价证券"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex80"
                              placeholder="请输入有价证券总金额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="债券"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex81"
                              placeholder="请输入债券总金额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 其他金融产品、低保标准 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="其他金融产品"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex82"
                              placeholder="请输入其他金融产品总金额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="低保标准"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex90"
                              placeholder="请输入低保标准"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 家庭月保障金额/月享受金额 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="家庭月保障金额"
                                label-width="140px">
                    <el-input v-model="ruleForm.abd_ex91"
                              placeholder="请输入家庭月保障金额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="月享受金额"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex72"
                              placeholder="请输入月享受金额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 护理补贴金额/增发金额 -->
              <el-row>
                <el-col :span="10"
                        style="marginRight:120px">
                  <el-form-item label="护理补贴金额"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex41"
                              placeholder="请输入护理补贴金额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="增发金额"
                                label-width="120px">
                    <el-input v-model="ruleForm.abd_ex71"
                              placeholder="请输入增发金额"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- 身份证及其他证明材料 -->
            <div id="page3">
              <h3 class="pageTitle">身份证及其他证明材料</h3>
              <el-row>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>核对授权书</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px">
                          <el-carousel-item v-for="item in 4"
                                            :key="item">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>身份证拍照</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px">
                          <el-carousel-item v-for="item in 4"
                                            :key="item">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>公示图片</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px">
                          <el-carousel-item v-for="item in 4"
                                            :key="item">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>审核审批表</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px">
                          <el-carousel-item v-for="item in 4"
                                            :key="item">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>其他证明材料</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px">
                          <el-carousel-item v-for="item in 4"
                                            :key="item">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>近亲属备案表</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px">
                          <el-carousel-item v-for="item in 4"
                                            :key="item">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <el-button type="text">删除</el-button>
                      <span>民主评议</span>
                      <el-button type="text">上传</el-button>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px">
                          <el-carousel-item v-for="item in 4"
                                            :key="item">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="4"
                class="right-ui">
          <ul>
            <li><a href="#page1">基本信息</a></li>
            <li><a href="#page2">其他信息</a></li>
            <li><a href="#page3">身份证及其他证明材料</a></li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// api 
import {
  getDisabilityAllowanceApi,
  getTaiZhouAreaApi
} from "@/api/lifeRescue/disabilityAllowance"
import { regionData } from 'element-china-area-data'
let pId = "0";
export default {
  name: "changeDisabilityAllowance",
  data () {
    return {
      options: regionData,
      selectedOptions: [],
      // form表单数据
      ruleForm: {},
      // 校验规则
      rules: {
        abd_ex2: [
          { required: true, trigger: 'blur', message: "姓名不能为空" }
        ],
        abd_ex3: [
          { required: true, trigger: 'blur', message: "身份证号码不能为空" }, {
            pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/, trigger: 'blur', message: "身份证号码格式不正确"
          }
        ],
        abd_ex17: [
          { required: true, trigger: 'blur', message: "户籍类别不能为空" }
        ],
        abd_ex16: [{ required: true, trigger: 'blur', message: "民族类型不能为空" }]
        ,
        abd_ex66: [{ required: true, trigger: 'blur', message: "与户主关系不能为空" }],
        abd_ex5: [{ required: true, trigger: 'blur', message: "残疾证号不能为空" }],
        abd_ex15: [{ required: true, trigger: 'blur', message: "残疾类别不能为空" }],
        abd_ex14: [{ required: true, trigger: 'blur', message: "残疾等级不能为空" }],
        abd_ex19: [{ required: true, trigger: 'blur', message: "户籍住址不能为空" }],
        abd_ex18: [{ required: true, trigger: 'blur', message: "现住址不能为空" }],
        abd_ex67: [{ required: true, trigger: 'blur', message: "家庭人口数不能为空" }],
        abd_ex20: [{ required: true, trigger: 'blur', message: "联系电话不能为空" }],
        administrativeArea: [{ required: true, trigger: 'blur', message: "行政区域不能为空" }],
        abd_ex75: [{ required: true, trigger: 'blur', message: "是否属于村干部或经办人员近亲属选项不能为空" }],
        abd_ex76: [{ required: true, trigger: 'blur', message: "求助描述不能为空" }],
        forReasons: [{ required: true, trigger: 'blur', message: "求助原因不能为空" }]
      },
      userData: {
        idCard: "",
        sId: "",
      },
      areaSelector: [],  //  区域选择器
      props: {
        lazy: true,
        that: this,
        async lazyLoad (node, resolve) {
          const { level } = node;
          try {
            let areaID = node.data ? node.data.pId : pId
            await getTaiZhouAreaApi({ pId: areaID })
          } catch (error) {
            if (error.response.status === 200) {
              const nodes = Array.from(error.response.data)
                .map(item => ({
                  value: item.cs_ex2 + "#" + item.cs_ex1,
                  label: item.cs_ex2,
                  leaf: level >= 2,
                  pId: item.cs_ex1
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }
          }
          // }, 1000);
        }
      },
      administrativeRegion: ""
    }
  },
  created () {
    this.getDisabilityAllowance({
      sId: this.userData.sId
    })
  },
  methods: {
    // 地区联级选择器 点击事项
    handleChange (value) {
      console.log(value);
    },
    handleChange (value) {
      console.log(value)
    },
    // 获取残疾人信息
    async getDisabilityAllowance (data) {
      try {
        await getDisabilityAllowanceApi(data)
      } catch (error) {
        if (error.response.status === 200) {
          this.ruleForm = error.response.data.data.data
          this.ruleForm.abd_ex28 = this.ruleForm.abd_ex28.split(",")
          this.$forceUpdate();
          console.log(this.ruleForm, "this.ruleForm")
        }
      }
    },
    // 获取泰州区域街道村庄联级选择器
    async getTaiZhouArea (data) {
      try {
        await getTaiZhouAreaApi(data)
      } catch (error) {
        if (error.response.status === 200) {
          this.areaSelector = error.response.data
          console.log(this.areaSelector, "this.areaSelector")
        }
      }
    }
  },
  components: {
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        if (to) this.userData = to.query
      }
    }
  }
}
</script>

<style scoped lang='less'>
.pageTitle {
  border-left: 2px solid #3385ff;
  padding-left: 16px;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 6px;
}
/deep/ .el-descriptions--small {
  font-size: 14px;
  color: black;
}
/deep/ .leftFather {
  padding-right: 6px;
  height: 75vh !important;
  overflow: hidden;
  overflow-y: scroll;
  border-right: 1px solid #dcdfe6;
  .el-descriptions-row {
    td {
      line-height: 30px;
    }
    height: 30px;
  }

  .el-select.el-select--small {
    width: 100%;
  }

  .el-col {
    margin: 4px 0;
  }

  .el-input input {
    height: 36px;
  }
  .el-date-editor--date {
    width: 100%;
  }
  .el-cascader--large {
    width: 100%;
  }
  .clearfix {
    display: flex;
    justify-content: space-between;
  }
}

.right-ui {
  padding: 20px 0 0 60px;
}
#page1 {
  position: relative;
  .no1img {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    transform: rotate(30deg);
    margin: 4% 4% 0 0;
    img {
      width: 140px;
    }
  }
}
</style>
