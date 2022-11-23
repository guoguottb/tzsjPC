<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="20">
          <div class="leftFather">
            <!-- 档案信息 -->
            <div id="page1">
              <h3 class="pageTitle">档案信息</h3>
              <el-descriptions class="margin-top"
                               style="margin-bottom:20px"
                               :column="3">
                <el-descriptions-item>
                  <template slot="label">
                    用户名
                  </template>
                  {{disabledInfo.abd_ex2 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    身份证号码
                  </template>
                  {{disabledInfo.abd_ex20 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    性别
                  </template>
                  {{disabledInfo.abd_ex12 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    申请时间
                  </template>
                  {{disabledInfo.abd_dat5 | formatDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    发放金额
                  </template>
                  {{disabledInfo.abd_ex8 }}
                </el-descriptions-item>
              </el-descriptions>
              <!-- 未提交 -->
              <div class="no1img"
                   v-if="disabledInfo.abd_ex35 === '申请'">
                <img src="@/assets/flowStatus/notSubmitted.png"
                     alt="">
              </div>
              <!-- 退回 -->
              <div class="no1img"
                   v-if="disabledInfo.abd_ex35 === '退回'">
                <img src="@/assets/flowStatus/return.png"
                     alt="">
              </div>
              <!-- 审核中 -->
              <div class="no1img"
                   v-if="disabledInfo.abd_ex35 === '委托确认' || disabledInfo.abd_ex35 === '初审' || disabledInfo.abd_ex35 === '公示开始' || disabledInfo.abd_ex35 === '审批'">
                <img src="@/assets/flowStatus/audit.19c32603.png"
                     alt="">
              </div>
              <!-- 已享受 -->
              <div class="no1img"
                   v-if="disabledInfo.abd_ex35 === '办结'">
                <img src="@/assets/flowStatus/enjoyment.b76983a8.png"
                     alt="">
              </div>
            </div>
            <!-- 变更信息 -->
            <div style="marginTop:60px;marginBottom:60px"
                 v-if="$route.query.type2 === 'bg'"
                 id="page13">
              <h3 class="pageTitle">变更信息</h3>
              <p v-for="(item,index) in changeInfo"
                 :key="index"><span style="width:240px;display:inline-block;">{{item.acc_ex1}}:&nbsp;&nbsp;</span>从<span style="color:blue">&nbsp;{{item.acc_ex2 || `空`}}&nbsp;</span>变成<span style="color:green">&nbsp;{{item.acc_ex3}}&nbsp;</span></p>
              <p v-if="!this.changeInfo.length">暂无变更信息</p>
            </div>
            <!-- 基础信息 -->
            <div id="page2">
              <h3 class="pageTitle">基础信息</h3>
              <el-descriptions class="margin-top"
                               style="margin-bottom:20px"
                               :column="2">
                <el-descriptions-item>
                  <template slot="label">
                    性别
                  </template>
                  {{disabledInfo.abd_ex12 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    年龄
                  </template>
                  {{disabledInfo.abd_ex34 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    户籍类型
                  </template>
                  {{disabledInfo.abd_ex17 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    民族
                  </template>
                  {{disabledInfo.abd_ex16 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    与户主关系
                  </template>
                  {{disabledInfo.abd_ex66 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    残疾证号
                  </template>
                  {{disabledInfo.abd_ex5 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    残疾类别
                  </template>
                  {{disabledInfo.abd_ex15 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    残疾等级
                  </template>
                  {{disabledInfo.abd_ex14 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    户籍住址
                  </template>
                  {{disabledInfo.abd_ex18 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    现住址
                  </template>
                  {{disabledInfo.abd_ex19 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    家庭人口数
                  </template>
                  {{disabledInfo.abd_ex67 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    伤残原因说明
                  </template>
                  {{disabledInfo.abd_ex68 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    残疾人收入说明
                  </template>
                  {{disabledInfo.abd_ex69 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    是否享受低保
                  </template>
                  {{disabledInfo.abd_ex70 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    家庭特征
                  </template>
                  {{disabledInfo.abd_ex73 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    联系电话
                  </template>
                  {{disabledInfo.abd_ex20 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    行政划区
                  </template>
                  {{disabledInfo.abd_ex28}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    是否属于村干部或经办人员近亲属
                  </template>
                  {{disabledInfo.abd_ex75 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    求助原因
                  </template>
                  {{disabledInfo.abd_ex77 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    求助描述
                  </template>
                  {{disabledInfo.abd_ex76 }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <!-- 银行信息 -->
            <div id="page3">
              <h3 class="pageTitle">银行信息</h3>
              <el-descriptions class="margin-top"
                               style="margin-bottom:20px"
                               :column="3">
                <el-descriptions-item>
                  <template slot="label">
                    开户银行
                  </template>
                  {{disabledInfo.abd_ex23 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    开户人
                  </template>
                  {{disabledInfo.abd_ex78 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    银行账号
                  </template>
                  {{disabledInfo.abd_ex24 }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <!-- 家庭财产情况 -->
            <div id="page4">
              <h3 class="pageTitle">家庭财产情况</h3>
              <el-descriptions class="margin-top"
                               style="margin-bottom:20px"
                               :column="2">
                <el-descriptions-item>
                  <template slot="label">
                    银行总存款
                  </template>
                  {{disabledInfo.abd_ex79 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    有价证券
                  </template>
                  {{disabledInfo.abd_ex80 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    债权
                  </template>
                  {{disabledInfo.abd_ex80 }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    其他金融产品
                  </template>
                  {{disabledInfo.abd_ex82 }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <!-- 已享受救助情况 -->
            <div id="page5">
              <h3 class="pageTitle">已享受救助情况</h3>
              <el-row>
                <el-col :span="12"
                        style="padding: 0 20px;">
                  <el-table :data="tableData.data2"
                            v-loading="loading"
                            height="400"
                            border
                            style="width: 100%">
                    <el-table-column label="救助信息">
                      <el-table-column prop="name"
                                       width="80px"
                                       label="姓名">
                      </el-table-column>
                      <el-table-column prop="type"
                                       label="救助类型">
                      </el-table-column>
                      <!--  prop="granttime" -->
                      <el-table-column label="发放时间">
                        <template slot-scope="scope">
                          {{ scope.row.granttime | formatDate}}
                        </template>
                      </el-table-column>
                      <!--  prop="money" -->
                      <el-table-column label="发放金额">
                        <template slot-scope="scope">
                          {{scope.row.money}}
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="12">
                  <el-table :data="tableData.data"
                            border
                            height="400"
                            v-loading="loading"
                            style="width: 100%">
                    <el-table-column label="救助信息">
                      <el-table-column prop="name"
                                       width="80px"
                                       label="姓名">
                      </el-table-column>
                      <el-table-column prop="type"
                                       label="救助类型">
                      </el-table-column>
                      <!-- prop="applytime" -->
                      <el-table-column label="申请日期">
                        <template slot-scope="{row,column, $index}">{{row.applytime | formatDate}}
                        </template>
                      </el-table-column>

                      <!-- prop="completiontime" -->
                      <el-table-column label="审批日期">
                        <template slot-scope="scope">
                          {{scope.row.completiontime | formatDate}}
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
            <!-- 电子附件 -->
            <div id="page6">
              <h3 class="pageTitle">电子附件</h3>
              <el-row>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>核对授权书(<span style="color:red">{{authorizationArr.length}}</span>)</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     :loop="true"
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in authorizationArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
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
                      <span>身份证(<span style="color:red">{{IDCardArr.length}}</span>)</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     :loop="true"
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in IDCardArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
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
                      <span>公示图片(<span style="color:red">{{PublicityPicturesArr.length}}</span>)</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     :loop="true"
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in PublicityPicturesArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
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
                      <span>审核审批表(<span style="color:red">{{approvalFormArr.length}}</span>)</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     :loop="true"
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in approvalFormArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
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
                      <span>其他材料(<span style="color:red">{{restsDataArr.length}}</span>)</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     :loop="true"
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in restsDataArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
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
                      <span>近亲属备案表(<span style="color:red">{{closeRelativeArr.length}}</span>)</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     :loop="true"
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in closeRelativeArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
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
                      <span>民主评议(<span style="color:red">{{democracyArr.length}}</span>)</span>
                    </div>
                    <div>
                      <!-- banner -->
                      <div class="block"
                           style="width:100%">
                        <el-carousel height="150px"
                                     autoplay
                                     :loop="true"
                                     :interval="3000">
                          <el-carousel-item v-for="(item,index) in democracyArr"
                                            :key="index"
                                            style="display:flex;justify-content:center">
                            <img :src="item"
                                 alt="">
                          </el-carousel-item>
                        </el-carousel>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
            <!-- 审核1 -->
            <div style="marginTop:60px"
                 v-if="form.type === 'th' || form.type ==='th2'"
                 id="page8">
              <h3 class="pageTitle">审核</h3>
              <el-form ref="form"
                       :model="form">
                <!-- 退回意见、退回人 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="审核意见"
                                  label-width="110px">
                      <el-select v-model="form.opinion"
                                 placeholder="请输入审核意见">
                        <el-option label="退回"
                                   value="退回"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="审核人"
                                  label-width="110px">
                      <el-input v-model.trim="form.userName"
                                placeholder="请输入审核人"
                                style="width:100%"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 审核原因 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="审核原因"
                                  label-width="110px">
                      <el-input type="textarea"
                                v-model.trim="form.remark"
                                placeholder="请输入审核原因"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 审核2 -->
            <div style="marginTop:60px"
                 v-if="form.type === 'sh'"
                 id="page8">
              <h3 class="pageTitle">审核</h3>
              <el-form ref="form"
                       :model="form">
                <!-- 审核意见、退回人 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="审核意见"
                                  label-width="110px">
                      <el-select v-model="form.opinion"
                                 placeholder="请输入审核意见">
                        <el-option label="退回"
                                   value="退回"></el-option>
                        <el-option label="同意"
                                   value="同意"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="审核人"
                                  label-width="110px">
                      <el-input v-model.trim="form.userName"
                                placeholder="请输入审核人"
                                style="width:100%"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 退回原因 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="审核原因"
                                  label-width="110px">
                      <el-input type="textarea"
                                v-model.trim="form.remark"
                                placeholder="请输入审核原因"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 审核时间 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="审核时间"
                                  label-width="110px">
                      <div class="block">
                        <el-date-picker v-model="form.date"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        default-time="12:00:00">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 审核sh3 sh2 -->
            <div style="marginTop:60px"
                 v-if="sh3Form.type === 'sh3' || sh3Form.type === 'sp3' || sh3Form.type === 'sh2'"
                 id="page12">
              <h3 class="pageTitle">审核</h3>
              <el-form :model="sh3Form">
                <!-- 审核意见 、 审核人-->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="审核意见"
                                  label-width="140px">
                      <el-select v-model="sh3Form.opinion"
                                 placeholder="请输入审核意见">
                        <el-option label="同意"
                                   value="同意"></el-option>
                        <el-option label="退回"
                                   value="退回"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="审核人"
                                  label-width="140px">
                      <el-input v-model="sh3Form.userName"
                                placeholder="请输入审核人"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 审核时间 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="审核时间"
                                  label-width="140px">
                      <div class="block">
                        <el-date-picker v-model="sh3Form.date"
                                        type="datetime"
                                        placeholder="选择审核时间"
                                        default-time="12:00:00">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 备注 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注"
                                  label-width="140px">
                      <el-input v-model="sh3Form.remark"
                                placeholder=""></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 公示 -->
            <div style="marginTop:60px"
                 v-if="gsForm.type === 'gs'"
                 id="page9">
              <h3 class="pageTitle">公示</h3>
              <el-form :model="gsForm">
                <!-- 公示结果、公示地点 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="公示结果"
                                  label-width="140px">
                      <el-select v-model="gsForm.opinion"
                                 placeholder="请输入公示结果">
                        <el-option label="无异议"
                                   value="无异议"></el-option>
                        <el-option label="有异议"
                                   value="有异议"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="公示地点"
                                  label-width="140px">
                      <el-input v-model="gsForm.place"
                                placeholder="请输入公示地点"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 公示开始时间、公示结束时间 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="公示开始时间"
                                  label-width="140px">
                      <div class="block">
                        <el-date-picker v-model="gsForm.startingTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        default-time="12:00:00">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="公示结束时间"
                                  label-width="140px">
                      <div class="block">
                        <el-date-picker v-model="gsForm.endTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        default-time="12:00:00">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 备注 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注"
                                  label-width="140px">
                      <el-input type="textarea"
                                v-model.trim="gsForm.remark"
                                placeholder="请输入备注"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 公示图片 -->
                <el-row>
                  <el-col :span="12">
                    <el-card class="box-card">
                      <div slot="header"
                           class="clearfix"
                           id="gsBanner">
                        <span @click="upload">上传</span>
                        <span>公式图片</span>
                        <span @click="bannerDialogVisible = true">删除</span>
                      </div>
                      <div>
                        <!-- banner -->
                        <div class="block"
                             style="width:100%">
                          <el-carousel height="150px"
                                       autoplay
                                       loop
                                       :interval="3000">
                            <el-carousel-item v-for="(item,index) in gsFormImg"
                                              :key="index"
                                              style="display:flex;justify-content:center">
                              <img :src="item"
                                   alt="">
                            </el-carousel-item>
                          </el-carousel>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 审批 -->
            <div style="marginTop:60px"
                 v-if="spForm.type === 'sp'|| this.spForm.type === 'sp2'"
                 id="page10">
              <h3 class="pageTitle">审批</h3>
              <el-form :model="spForm">
                <!-- 审批意见、审批人 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="审批意见"
                                  label-width="140px">
                      <el-select v-model="spForm.opinion"
                                 placeholder="请选择">
                        <el-option label="同意"
                                   value="同意"></el-option>
                        <el-option label="退回"
                                   value="退回"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="审批人"
                                  label-width="140px">
                      <el-input v-model="spForm.userName"
                                placeholder="请输入审批人"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 审批时间 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="审批时间"
                                  label-width="140px">
                      <div class="block">
                        <el-date-picker v-model="spForm.date"
                                        type="datetime"
                                        placeholder="选择审批时间"
                                        default-time="12:00:00">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 备注 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注"
                                  label-width="140px">
                      <el-input type="textarea"
                                v-model.trim="spForm.remark"
                                placeholder="请输入备注"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 注销 -->
            <div style="marginTop:60px"
                 v-if="zxForm.type === 'zx'"
                 id="page11">
              <h3 class="pageTitle">注销</h3>
              <el-form :model="zxForm">
                <!-- 注销时间 -->
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="注销时间"
                                  label-width="140px">
                      <div class="block">
                        <el-date-picker v-model="zxForm.date"
                                        type="datetime"
                                        placeholder="选择注销时间"
                                        default-time="12:00:00">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 注销原因 -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="注销原因"
                                  label-width="140px">
                      <el-input type="textarea"
                                v-model.trim="zxForm.remark"
                                placeholder="请输入备注"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 审批记录 -->
            <div style="marginTop:60px"
                 id="page7">
              <h3 class="pageTitle">审批记录</h3>
              <template v-if="disabledRecordDat.length">
                <div v-for="(item,index) in disabledRecordDat"
                     :key="index">
                  <!-- 处理步骤，处理时间，处理结果 -->
                  <el-row style="marginBottom:8px">
                    <!-- 处理步骤 -->
                    <el-col :span="8">
                      <el-row>
                        <el-col :span="6">处理步骤:</el-col>
                        <el-col :span="18">{{item.ar_ex4}}</el-col>
                      </el-row>
                    </el-col>
                    <!-- 处理时间 -->
                    <el-col :span="8">
                      <el-row>
                        <el-col :span="6">处理时间：</el-col>
                        <el-col :span="18">{{item.ar_dat1 | formatDate}}</el-col>
                      </el-row>
                    </el-col>
                    <!-- 处理结果 -->
                    <el-col :span="8">
                      <el-row>
                        <el-col :span="6">处理结果：</el-col>
                        <el-col :span="18">{{item.ar_ex3}}</el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <!-- 处理人，处理用时 -->
                  <el-row style="marginBottom:8px">
                    <el-col :span="8">
                      <el-row>
                        <el-col :span="6">处理人：</el-col>
                        <el-col :span="18">{{item.ar_ex5}}</el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="8">
                      <el-row>
                        <el-col :span="8">处理用时：</el-col>
                        <el-col :span="16">{{item.ar_ex6 + `天`}}</el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <!-- 处理意见 -->
                  <el-row style="marginBottom:24px">
                    <el-col :span="24">
                      <el-row>
                        <el-col :span="2">处理意见：</el-col>
                        <el-col :span="22">{{item.ar_ex2}}</el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </div>
              </template>
              <p v-if="!disabledRecordDat.length">暂无审批记录</p>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <div class="right-button">
              <el-button type="primary"
                         v-if="!$route.query.view"
                         @click="onsave"
                         :disabled="saveLoading">保存</el-button>
              <el-button @click="oncancel">返回</el-button>
            </div>
          </div>
          <div class="right-ui">
            <ul>
              <li><a href="#page1">档案信息</a></li>
              <li v-if="$route.query.type2 === 'bg'"><a href="#page13">变更信息</a></li>
              <li><a href="#page2">基础信息</a></li>
              <li><a href="#page3">银行信息</a></li>
              <li><a href="#page4">家庭财产情况</a></li>
              <li><a href="#page5">已享受救助情况</a></li>
              <li><a href="#page6">电子附件</a></li>
              <li v-if="form.type === 'th' || form.type ==='th2'|| form.type ==='sh'"><a href="#page8">审核</a></li>
              <li v-if="gsForm.type === 'gs'"><a href="#page9">公示</a></li>
              <li v-if="spForm.type === 'sp'|| spForm.type === 'sp2'"><a href="#page10">审批</a></li>
              <li v-if="zxForm.type === 'zx'"><a href="#page11">注销</a></li>
              <li v-if="sh3Form.type === 'sh3' || sh3Form.type === 'sp3' || sh3Form.type === 'sh2'"><a href="#page12">审核</a></li>
              <li><a href="#page7">审批记录</a></li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- dialog 上传按钮弹出层 -->
    <el-dialog title="提示"
               v-if="dialogVisible"
               :close="onClose"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <!-- 上传图片对话框 -->
      <el-upload class="upload-demo"
                 drag
                 :on-success="onSuccess"
                 action="/social/minios/fileUpload"
                 multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip"
             slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary"
                   @click="onAffirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除banner对话框 -->
    <el-dialog title="提示"
               :visible.sync="bannerDialogVisible"
               width="30%">
      <span>是否删除该项的所有资料图片</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="bannerCancel">取 消</el-button>
        <el-button type="primary"
                   @click="bannerConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// api 
import { getDisabilityAllowanceApi, getRescueSituationApi, getDisabledRecordDataApi, getBannersApi, disabledFlowPathApi } from "@/api/lifeRescue/disabilityAllowance"
import dayjs from "dayjs"
export default {
  name: "toViewThePage",
  data () {
    return {
      tableData: {
        data: [],
        data2: []
      },
      userData: {
        idCard: "",
        sId: "",
      },
      disabledInfo: {
        abd_ex28: ""
      },
      disabledRecordDat: [],
      loading: false,
      authorizationArr: [],   // 核对授权书
      IDCardArr: [],    //  身份证拍照
      PublicityPicturesArr: [],  //  公示图片
      approvalFormArr: [],   //  审核审批表
      restsDataArr: [],  //  其他证明材料
      closeRelativeArr: [], //   近亲属备案表
      democracyArr: [],     //  民主评议
      // 审核
      form: {
        sId: "",
        type: "",
        opinion: "退回",  // 退回意见
        userName: "",  // 退回人
        remark: "",   // 退回原因
        date: null
      },
      saveLoading: false,
      // 公示
      gsForm: {
        sId: "",
        type: "",
        opinion: "",  //公示结果
        place: "", // 公示地点
        startingTime: null,  // 公示开始时间
        endTime: null,   //  公示结束时间
        remark: "", // 备注
        img: []  // 存放banner图片在后端路径
      },
      gsFormImg: [],  // 公示图片banner base64数组
      dialogVisible: false,
      fileList: [],
      bannerDialogVisible: false,
      // 审批
      spForm: {
        sId: "",
        type: "",
        opinion: "",   // 审批意见
        userName: "",  // 审批人
        date: null,      // 审批时间
        remark: ""     // 备注
      },
      // 注销
      zxForm: {
        sId: "",
        type: "",
        remark: "",
        date: null
      },
      // sh3
      sh3Form: {
        sId: "",
        type: "",
        opinion: "",
        userName: "",
        date: null,
        remark: ""
      },
      // 变更信息
      changeInfo: []
    }
  },
  created () {
    this.getDisabilityAllowance({
      sId: this.userData.sId
    })
    this.getRescueSituation({
      idcard: this.userData.idCard
    })
    this.getDisabledRecordDat({
      sId: this.userData.sId
    })
  },
  methods: {
    // 获取残疾人信息
    async getDisabilityAllowance (data) {
      try {
        let newData = data
        if (this.$route.query.type2 === "bg") newData.cId = this.$route.query.fId
        await getDisabilityAllowanceApi(newData)
      } catch (error) {
        console.log(error, "获取残疾人信息")
        if (error.response.data.status === '+OK') {
          this.disabledInfo = error.response.data.data.data
          this.disabledInfo.abd_ex28 = this.disabledInfo.abd_ex28.replace(/[#0-9,]/g, "")
          let userName = this.disabledInfo.userName
          this.form.userName = userName
          this.spForm.userName = userName
          this.sh3Form.userName = userName
          // 变更信息 数据回显
          if (error.response.data.data.disabled) this.changeInfo = error.response.data.data.disabled
          // 核对授权书 banner回显
          this.disabledInfo.abd_ex92.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.authorizationArr.push(error.response.data)
              }
            }
          })
          // 身份证拍照 banner 数据回显
          this.disabledInfo.abd_ex37.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              console.log(error, "IDCardArrIDCardArr")
              if (error && error.response && error.response.statusText === "OK") {
                this.IDCardArr.push(error.response.data)
              }
            }
          })
          // 公示图片 banner 数据回显
          this.disabledInfo.abd_ex93.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.PublicityPicturesArr.push(error.response.data)
              }
            }
          })
          // 审核审批标 banner数据回显
          this.disabledInfo.abd_ex94.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.approvalFormArr.push(error.response.data)
              }
            }
          })
          // 其他证明材料 banner数据回显
          this.disabledInfo.abd_ex38.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.restsDataArr.push(error.response.data)
              }
            }
          })
          // 近亲属备案表 banner数据回显
          this.disabledInfo.abd_ex95.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.closeRelativeArr.push(error.response.data)
              }
            }
          })
          // 民主评议 banner数据回显
          this.disabledInfo.abd_ex96.split(",").forEach(async item => {
            try {
              if (item) await getBannersApi(item)
            } catch (error) {
              if (error && error.response && error.response.statusText === "OK") {
                this.democracyArr.push(error.response.data)
              }
            }
          })
          console.log(this.disabledInfo, "this.disabledInfothis.disabledInfo")
        }
      }
    },
    // 已享受救助信息
    async getRescueSituation (data) {
      this.loading = true
      try {
        await getRescueSituationApi(data)
      } catch (error) {
        if (error && error.response && error.response.data.status === "+OK") {
          this.tableData = error.response.data.data
        }
      } finally {
        this.loading = false
      }
    },
    // 审批记录
    async getDisabledRecordDat (data) {
      try {
        let newData = data
        if (this.$route.query.type2 === "zx") {
          newData.type = "zx"
          newData.sId = this.$route.query.fId
        }
        if (this.$route.query.type2 === "bg") {
          newData.type = "bg"
          newData.sId = this.$route.query.fId
        }
        await getDisabledRecordDataApi(newData)
      } catch (error) {
        if (error.response.data.status === "+OK") {
          this.disabledRecordDat = error.response.data.data
          console.log(this.disabledRecordDat, "this.disabledRecordDat")
        }
      }
    },
    // 返回按钮
    oncancel () {
      // if (this.$route.query.type2 === "bg") return this.$router.push("/SubsidyDisabled/alteration")
      // if (this.$route.query.type2 === "zx") return this.$router.push("/SubsidyDisabled/subsidyCancell")
      // this.$router.push("/SubsidyDisabled/audit")
      this.$router.go(-1);
      if (process.env.NODE_ENV != "development") this.$router.go(-1);
    },
    // 保存按钮
    async onsave () {
      try {
        this.saveLoading = true
        // th th2
        if (this.form.opinion && this.form.userName && this.form.remark && this.form.type === "th" || this.form.type === "th2") {
          await disabledFlowPathApi(this.form)
        }
        // sh
        else if (this.form.opinion && this.form.userName && this.form.remark && this.form.date && this.form.type === "sh") {
          // 处理成后端想要的时间格式
          this.form.date = this.formatDate(this.form.date)
          await disabledFlowPathApi(this.form)
        }
        // gs
        else if (this.gsForm.opinion && this.gsForm.place && this.gsForm.startingTime && this.gsForm.endTime && this.gsFormImg.length && this.gsForm.type === "gs") {
          console.log("gs条件满足了")
          // 处理成后端想要的时间格式
          this.gsForm.startingTime = this.formatDate(this.gsForm.startingTime)
          this.gsForm.endTime = this.formatDate(this.gsForm.endTime)
          // 处理成后端想要的图片路径格式
          this.gsForm.img = this.gsForm.img.join()
          await disabledFlowPathApi(this.gsForm)
        }
        // sp sp2
        else if (this.spForm.opinion && this.spForm.userName && this.spForm.date && this.spForm.type === 'sp' || this.spForm.type === 'sp2') {
          console.log("进审批了")
          this.spForm.date = this.formatDate(this.spForm.date)
          await disabledFlowPathApi(this.spForm)
        }
        // zx
        else if (this.zxForm.date && this.zxForm.remark && this.zxForm.type === 'zx') {
          console.log("进入了注销页面")
          this.zxForm.date = this.formatDate(this.zxForm.date)
          await disabledFlowPathApi(this.zxForm)
        }
        // sh3 sp3 sh2
        else if (this.sh3Form.opinion && this.sh3Form.userName && this.sh3Form.date && this.sh3Form.type === 'sh3' || this.sh3Form.type === "sp3" || this.sh3Form.type === "sh2") {
          this.sh3Form.date = this.formatDate(this.sh3Form.date)
          console.log("sh3,sp3")
          await disabledFlowPathApi(this.sh3Form)
        }
        else {
          this.$message.warning("请填写完整的信息")
        }
      } catch (error) {
        console.log(error)
        if (error && error.response && error.response.data.status === "+OK") {
          this.$message.success(error.response.data.msg)
          if (this.$route.query.type2 === "sh") this.$router.push("/SubsidyDisabled/audit")
          if (this.$route.query.type2 === "bg") this.$router.push("/SubsidyDisabled/alteration")
          if (this.$route.query.type2 === "zx") this.$router.push("/SubsidyDisabled/subsidyCancell")
        } else {
          this.$message.error(error.response.data.msg)
        }
      } finally {
        this.saveLoading = false
      }
    },
    // 公示上传按钮
    upload () {
      this.dialogVisible = true
    },
    // dialog关闭的回调
    onClose () {
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    // 图片上传成功的回调
    onSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      this.fileList = fileList
    },
    onClose () {
      this.dialogVisible = false
    },
    // 图片上传确认按钮
    onAffirm () {
      this.fileList.forEach(item => {
        this.gsForm.img.push(`/social/minios/show?filename=${item.response[0].filename}`)
        this.fileToBase64Async(item.raw)
      })
      this.onClose()
    },    // file 文件转换为 dataUrl
    fileToBase64Async (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.gsFormImg.push(e.target.result)
          resolve(e.target.result);
        };
      });
    },
    // 取消删除
    bannerCancel () {
      this.bannerDialogVisible = false
    },
    // 确定删除
    bannerConfirm () {
      this.gsForm.img = []  // 文件路径清空
      this.gsFormImg = []  // banner清空
      this.bannerDialogVisible = false  // 关闭弹层
    },
    formatDate (val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss")
    }
  },
  components: {
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        console.log(this.$route)
        if (to.query.type === "th") this.form.type = "th"
        if (to.query.type === "th2") this.form.type = "th2"
        if (to.query.type === "sh") this.form.type = "sh"
        if (to.query.type === "gs") {
          this.gsForm.sId = to.query.sId
          this.gsForm.type = "gs"
        }
        if (to.query.type === "sp") {
          this.spForm.sId = to.query.sId
          this.spForm.type = "sp"
        }
        if (to.query.type === "zx") {
          this.zxForm.sId = to.query.sId
          this.zxForm.type = "zx"
        }
        if (to.query.type === "sh3") {
          this.sh3Form.type = "sh3"
          this.sh3Form.sId = to.query.fId
        }
        if (to.query.type === "sp3") {
          this.sh3Form.type = "sp3"
          this.sh3Form.sId = to.query.fId
        }
        if (to.query.type === "sh2") {
          this.sh3Form.type = "sh2"
          this.sh3Form.sId = to.query.fId
        }
        if (to.query.type === "sp2") {
          this.spForm.type = "sp2"
          this.spForm.sId = to.query.fId
        }
        if (to) {
          console.log(to, "tooooooooooooo")
          this.userData = to.query
          this.form.sId = this.userData.sId
        }
      }
    }
  },
}
</script>

<style scoped lang='less'>
/deep/ .box-card {
  .el-select.el-select--small {
    width: 100% !important;
  }
  /* 公示banner */
  #gsBanner {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    span {
      flex: 1;
    }
    span:nth-child(1) {
      display: flex;
      justify-content: flex-start;
      color: #409eff;
      cursor: pointer;
    }
    span:nth-child(2) {
      display: flex;
      justify-content: center;
    }
    span:nth-child(3) {
      display: flex;
      justify-content: flex-end;
      color: #409eff;
      cursor: pointer;
    }
  }
}
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
}
.right-button {
  height: 40px;
  text-align: center;
  margin-left: 40px;
  border-bottom: 1px solid rgb(221, 221, 221);
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

/deep/ .el-carousel__indicator.el-carousel__indicator--horizontal.is-active {
  .el-carousel__button {
    background-color: #409eff;
  }
}
</style>
