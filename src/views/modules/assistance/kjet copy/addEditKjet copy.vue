<template>
	<div class="g-box">
		<div class="g-box2">
			<div class="info2">
				<el-form :model="dibaoForm" :rules="rules"  :inline-message="true" :show-message="false" ref="dibaoForm" label-width="auto" style='padding-right: 10px;'>
					<h3 class="line_blue" id="page1">&emsp;儿童基本情况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="姓名" prop="abc_ex6">
								<el-input v-model="dibaoForm.abc_ex6" placeholder="请输入姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="abc_ex7">
								<el-input v-model="dibaoForm.abc_ex7" placeholder="请输入身份证" @change="changeCid"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<!-- <el-col :span="12">
							<el-form-item label="户籍状况" prop="abc_ex8">
								<el-select v-model="dibaoForm.abc_ex8">
									<el-option label="农村社区" value="农村社区"></el-option>
									<el-option label="城市社区" value="城市社区"></el-option>
								</el-select>
							</el-form-item>
						</el-col> -->
						<el-col :span="12">
							<el-form-item label="性别" prop="abc_ex9">
								<el-select v-model='dibaoForm.abc_ex9'>
									<el-option label="男" value="男"></el-option>
									<el-option label="女" value="女"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="村(社区)儿童主任">
								<el-input v-model="dibaoForm.abc_ex10" placeholder="请输入村(社区)儿童主任"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="民族" prop="abc_ex12">
								<el-select v-model="dibaoForm.abc_ex12">
									<el-option v-for="(item,index) in nation" :key="index" :label="item" :value="item"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话" prop="abc_ex190">
								<el-input v-model="dibaoForm.abc_ex190" type="number" placeholder="请输入联系电话"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="行政区域" prop="abc_ex234">
								<el-cascader :props="props" v-model="xzqhArray" placeholder="请选择" style="width:100%;" v-if="isFinish"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="户籍地址" prop="abc_ex13">
								<el-input v-model="dibaoForm.abc_ex13" placeholder="请输入户籍地址"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="现住地址" prop="abc_ex14">
								<el-input v-model="dibaoForm.abc_ex14" placeholder="请输入现住地址"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="健康状况" prop="abc_ex15">
								<el-select v-model="dibaoForm.abc_ex15" @change='stzkChange'>
									<el-option label="健康" value="健康"></el-option>
									<el-option label="残疾" value="残疾"></el-option>
									<el-option label="患病" value="患病"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex15 == '残疾'">
						<el-col :span="12">
							<el-form-item label="残疾类别" >
								<el-select v-model="dibaoForm.abc_ex17">
									<el-option label="视力残疾" value="视力残疾"></el-option>
									<el-option label="肢体残疾" value="肢体残疾"></el-option>
									<el-option label="智力残疾" value="智力残疾"></el-option>
									<el-option label="精神残疾" value="精神残疾"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否残疾二代证" >
								<el-select v-model="dibaoForm.abc_ex16">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex15 == '残疾'">
						<el-col :span="12">
							<el-form-item label="残疾等级" >
								<el-select v-model="dibaoForm.abc_ex18">
									<el-option label="一级" value="一级"></el-option>
									<el-option label="二级" value="二级"></el-option>
									<el-option label="三级" value="三级"></el-option>
									<el-option label="四级" value="四级"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="残疾证号" >
								<el-input v-model="dibaoForm.abc_ex20" placeholder="请输入现住地址"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex15 == '患病'">
						<el-col :span="12">
							<el-form-item label="患病时间" >
								<el-date-picker v-model="dibaoForm.abc_ex236" type="date" value-format="yyyy-MM-dd" placeholder="选择变更时间" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="患病名称">
								<el-input v-model="dibaoForm.abc_ex238" placeholder="请输入患病名称"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex15 == '患病'">
						<el-col :span="12">
							<el-form-item label="患病描述">
								<el-input v-model="dibaoForm.abc_ex239" placeholder="请输入患病描述"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="医保政策">
								<el-select v-model="dibaoForm.abc_ex240" style="width: 100%;">
									<el-option label="医保政策规定的住院和门诊治疗费用1年中自付部分超过两万元" value="是"></el-option>
									<el-option label="医保政策规定的住院和门诊治疗费用1年中自付部分不超过两万元" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="就学情况" prop="abc_ex22">
								<el-select v-model="dibaoForm.abc_ex22">
									<el-option label="未入学" value="未入学"></el-option>
									<el-option label="学前班" value="学前班"></el-option>
									<el-option label="小学" value="小学"></el-option>
									<el-option label="初中" value="初中"></el-option>
									<el-option label="高中" value="高中"></el-option>
									<el-option label="职高" value="职高"></el-option>
									<el-option label="中专" value="中专"></el-option>
									<el-option label="大学本科" value="大学本科"></el-option>
									<el-option label="不在校" value="不在校"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex22 && dibaoForm.abc_ex22!= '未入学'">
							<el-form-item label="就读学校">
								<el-input v-model="dibaoForm.abc_ex26" placeholder="请输入就读学校"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="务工情况" prop="abc_ex241">
								<el-select v-model="dibaoForm.abc_ex241">
									<el-option label="从未就业" value="从未就业"></el-option>
									<el-option label="就业后自愿失业" value="就业后自愿失业"></el-option>
									<el-option label="就业后非自愿失业" value="就业后非自愿失业"></el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex241 == '其他'">
							<el-form-item label="其他务工情况">
								<el-input v-model="dibaoForm.abc_ex242" placeholder="请输入其他务工情况"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="违法犯罪经历">
								<el-select v-model="dibaoForm.abc_ex243">
									<el-option label="" value=""></el-option>
									<el-option label="曾行政处罚" value="曾行政处罚"></el-option>
									<el-option label="曾劳动教养" value="曾劳动教养"></el-option>
									<el-option label="曾刑事处罚" value="曾刑事处罚"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="24">
							<el-form-item label="求助原因" prop="abc_ex230">
								<el-checkbox-group v-model="abc_ex230">
									<el-checkbox label="缺乏劳动力"></el-checkbox>
									<el-checkbox label="无生活来源"></el-checkbox>
									<el-checkbox label="疾病"></el-checkbox>
									<el-checkbox label="残疾"></el-checkbox>
									<el-checkbox label="教育"></el-checkbox>
									<el-checkbox label="住房"></el-checkbox>
									<el-checkbox label="受灾"></el-checkbox>
									<el-checkbox label="其他"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-col>
					</el-row>
					<!-- 办结变更时的页面 -->
					<h3 v-if="$route.query.type == 'bg'" class="line_blue" id="page8">&emsp;变更信息</h3>
					<div v-if="$route.query.type == 'bg'" class="lineSt"></div>
					<el-row v-if="$route.query.type == 'bg'">
						<el-col :span="2" style="line-height: 30px;text-align:center;">
							<div>变更时间</div>
						</el-col>
						<el-col :span="22">
							<el-date-picker
								v-model="dibaoForm.abc_dat2"
								type="date"
								value-format="yyyy-MM-dd"
								placeholder="选择变更时间">
							</el-date-picker>
						</el-col>
					</el-row>
					<el-row v-if="$route.query.type == 'bg'" style="margin-top: 10px;">
						<el-col :span="2" style="line-height: 30px;text-align:center">
							<div>变更简述</div>
						</el-col>
						<el-col :span="22">
							<el-input type="textarea" autosize v-model="ac_ex10"></el-input>
						</el-col>
					</el-row>
					<!-- 办结变更时的页面 -->

					<h3 class="line_blue" id="page2">&emsp;其他信息</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="开户银行" prop="abc_ex192">
								<el-input v-model="dibaoForm.abc_ex192" placeholder="请输入开户银行"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="开户人" prop="abc_ex193">
								<el-input v-model="dibaoForm.abc_ex193" placeholder="请输入开户人"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="银行账号" prop="abc_ex195">
								<el-input v-model="dibaoForm.abc_ex195" placeholder="请输入银行账号"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					
					<h3 class="line_blue" id="page3">&emsp;家庭状况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="24">
							<el-form-item label="家庭主要成员">
								<el-checkbox-group v-model="abc_ex244" @change='changeJtcy'>
									<el-checkbox label="祖父"></el-checkbox>
									<el-checkbox label="外祖父"></el-checkbox>
									<el-checkbox label="父亲"></el-checkbox>
									<el-checkbox label="母亲"></el-checkbox>
									<el-checkbox label="哥哥"></el-checkbox>
									<el-checkbox label="弟弟"></el-checkbox>
									<el-checkbox label="祖母"></el-checkbox>
									<el-checkbox label="外祖母"></el-checkbox>
									<el-checkbox label="继父"></el-checkbox>
									<el-checkbox label="姐姐"></el-checkbox>
									<el-checkbox label="妹妹"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="是否独生子女" prop="abc_ex250">
								<el-select v-model="dibaoForm.abc_ex250">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="家庭类型">
								<el-select v-model="dibaoForm.abc_ex249">
									<el-option label="组合家庭" value="组合家庭"></el-option>
									<el-option label="单亲家庭" value="单亲家庭"></el-option>
									<el-option label="未婚单亲家庭" value="未婚单亲家庭"></el-option>
									<el-option label="正常家庭" value="正常家庭"></el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12" v-if="abc_ex244.indexOf('哥哥')!= -1">
							<el-form-item label="哥哥个数">
								<el-input v-model="dibaoForm.abc_ex245" type="number" placeholder="请输入哥哥个数" @change='changeNum'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="abc_ex244.indexOf('弟弟')!= -1">
							<el-form-item label="弟弟个数">
								<el-input v-model="dibaoForm.abc_ex246" type="number" placeholder="请输入弟弟个数" @change='changeNum'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12" v-if="abc_ex244.indexOf('姐姐')!= -1">
							<el-form-item label="姐姐个数">
								<el-input v-model="dibaoForm.abc_ex247" type="number" placeholder="请输入姐姐个数" @change='changeNum'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="abc_ex244.indexOf('妹妹')!= -1">
							<el-form-item label="妹妹个数">
								<el-input v-model="dibaoForm.abc_ex248" type="number" placeholder="请输入妹妹个数" @change='changeNum'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="家庭成员数量" prop="abc_ex251">
								<el-input v-model="dibaoForm.abc_ex251" type="number" placeholder="请输入家庭成员数量"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="abc_ex244.indexOf('哥哥')!= -1 || abc_ex244.indexOf('弟弟')!= -1 || abc_ex244.indexOf('姐姐')!= -1 || abc_ex244.indexOf('妹妹')!= -1" >
							<el-form-item label="兄弟姐妹数量">
								<el-input v-model="dibaoForm.abc_ex252" type="number" placeholder="请输入兄弟姐妹数量"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="abc_ex244.indexOf('父亲')!= -1">
						<el-col :span="12">
							<el-form-item label="父亲姓名">
								<el-input v-model="dibaoForm.abc_ex42" placeholder="请输入父亲姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="父亲职业描述">
								<el-input v-model="dibaoForm.abc_ex253" placeholder="请输入父亲职业描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="abc_ex244.indexOf('父亲')!= -1">
						<el-col :span="12">
							<el-form-item label="父亲就业地点">
								<el-input v-model="dibaoForm.abc_ex254" placeholder="请输入父亲就业地点"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="父亲健康状况">
								<el-select v-model="dibaoForm.abc_ex52">
									<el-option label="健康" value="健康"></el-option>
									<el-option label="残疾" value="残疾"></el-option>
									<el-option label="患病" value="患病"></el-option>
									<el-option label="死亡" value="死亡"></el-option>
									<el-option label="失踪" value="失踪"></el-option>
									<el-option label="宣告死亡" value="宣告死亡"></el-option>
									<el-option label="宣告失踪" value="宣告失踪"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex52 == '残疾'">
						<el-col :span="12">
							<el-form-item label="残疾类别及等级描述">
								<el-input v-model="dibaoForm.abc_ex261" placeholder="请输入残疾类别及等级描述"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否领证">
								<el-select v-model="dibaoForm.abc_ex262">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex52 == '患病'">
						<el-col :span="12">
							<el-form-item label="患病时间">
								<el-date-picker v-model="dibaoForm.abc_ex263" type="date" value-format="yyyy-MM-dd" placeholder="选择变更时间"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="患病名称">
								<el-input v-model="dibaoForm.abc_ex264" placeholder="请输入患病名称"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex52 == '患病'">
						<el-col :span="12">
							<el-form-item label="患病描述">
								<el-input v-model="dibaoForm.abc_ex265" placeholder="请输入患病描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					
					<el-row :gutter="20" v-if="abc_ex244.indexOf('母亲')!= -1">
						<el-col :span="12">
							<el-form-item label="母亲姓名">
								<el-input v-model="dibaoForm.abc_ex47" placeholder="请输入母亲姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="母亲职业描述">
								<el-input v-model="dibaoForm.abc_ex255" placeholder="请输入母亲职业描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="abc_ex244.indexOf('母亲')!= -1">
						<el-col :span="12">
							<el-form-item label="母亲就业地点">
								<el-input v-model="dibaoForm.abc_ex256" placeholder="请输入母亲就业地点"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="母亲健康状况">
								<el-select v-model="dibaoForm.abc_ex65">
									<el-option label="健康" value="健康"></el-option>
									<el-option label="残疾" value="残疾"></el-option>
									<el-option label="患病" value="患病"></el-option>
									<el-option label="死亡" value="死亡"></el-option>
									<el-option label="失踪" value="失踪"></el-option>
									<el-option label="宣告死亡" value="宣告死亡"></el-option>
									<el-option label="宣告失踪" value="宣告失踪"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex65 == '残疾'">
						<el-col :span="12">
							<el-form-item label="残疾类别及等级描述">
								<el-input v-model="dibaoForm.abc_ex266" placeholder="请输入残疾类别及等级描述"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否领证">
								<el-select v-model="dibaoForm.abc_ex267">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex65 == '患病'">
						<el-col :span="12">
							<el-form-item label="患病时间">
								<el-date-picker v-model="dibaoForm.abc_ex268" type="date" value-format="yyyy-MM-dd" placeholder="选择变更时间"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="患病名称">
								<el-input v-model="dibaoForm.abc_ex269" placeholder="请输入患病名称"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" v-if="dibaoForm.abc_ex65 == '患病'">
						<el-col :span="12">
							<el-form-item label="患病描述">
								<el-input v-model="dibaoForm.abc_ex270" placeholder="请输入患病描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="住房" prop="abc_ex257">
								<el-select v-model="dibaoForm.abc_ex257">
									<el-option label="农村自建房" value="农村自建房"></el-option>
									<el-option label="购买商品房" value="购买商品房"></el-option>
									<el-option label="租房" value="租房"></el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="住房面积" prop="abc_ex258">
								<el-input v-model="dibaoForm.abc_ex258" type="number" placeholder="请输入住房面积"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="住房套数" prop="abc_ex259">
								<el-input v-model="dibaoForm.abc_ex259" type="number" placeholder="请输入住房套数"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="家庭月收入描述" prop="abc_ex260">
								<el-input v-model="dibaoForm.abc_ex260" placeholder="请输入家庭月收入描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<h3 class="line_blue" id="page4">&emsp;监护状况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="亲子关系" prop="abc_ex271">
								<el-select v-model="dibaoForm.abc_ex271">
									<el-option label="溺爱型" value="溺爱型"></el-option>
									<el-option label="冷漠型" value="冷漠型"></el-option>
									<el-option label="粗暴型" value="粗暴型"></el-option>
									<el-option label="朋友型" value="朋友型"></el-option>
									<el-option label="专制型" value="专制型"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="监护状况" prop="abc_ex272">
								<el-select v-model="dibaoForm.abc_ex272">
									<el-option label="正常监护" value="正常监护"></el-option>
									<el-option label="无力监护" value="无力监护"></el-option>
									<el-option label="监护缺失" value="监护缺失"></el-option>
									<el-option label="隔代照料" value="隔代照料"></el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="监护状况具体描述" prop="abc_ex273">
								<el-input v-model="dibaoForm.abc_ex273" placeholder="请输入监护状况具体描述"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="监护人" prop="abc_ex274">
								<el-select v-model="dibaoForm.abc_ex274">
									<el-option label="正常" value="正常"></el-option>
									<el-option label="父母一方缺失" value="父母一方缺失"></el-option>
									<el-option label="父母双方缺失" value="父母双方缺失"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="监护人具体描述" prop="abc_ex275">
								<el-input v-model="dibaoForm.abc_ex275" placeholder="请输入监护人具体描述"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="受监护侵害和虐待情况" >
								<el-input v-model="dibaoForm.abc_ex276" placeholder="请输入受监护侵害和虐待情况"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="其他情况(父亲)">
								<el-select v-model="dibaoForm.abc_ex277">
									<el-option label="" value=""></el-option>
									<el-option label="失踪" value="失踪"></el-option>
									<el-option label="宣告失踪" value="宣告失踪"></el-option>
									<el-option label="召婿" value="召婿"></el-option>
									<el-option label="长期无法联系" value="长期无法联系"></el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex277 == '其他'">
							<el-form-item label="其他情况(父亲)描述" >
								<el-input v-model="dibaoForm.abc_ex64" placeholder="请输入其他情况(父亲)描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="其他情况(母亲)">
								<el-select v-model="dibaoForm.abc_ex279">
									<el-option label="" value=""></el-option>
									<el-option label="失踪" value="失踪"></el-option>
									<el-option label="宣告失踪" value="宣告失踪"></el-option>
									<el-option label="召婿" value="召婿"></el-option>
									<el-option label="长期无法联系" value="长期无法联系"></el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex279 == '其他'">
							<el-form-item label="其他情况(母亲)描述" >
								<el-input v-model="dibaoForm.abc_ex77" placeholder="请输入其他情况(母亲)描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="父亲有无特殊情况">
								<el-select v-model="dibaoForm.abc_ex281">
									<el-option label="" value=""></el-option>
									<el-option label="社会矫正" value="社会矫正"></el-option>
									<el-option label="强制戒毒" value="强制戒毒"></el-option>
									<el-option label="服刑在押" value="服刑在押"></el-option>
									<el-option label="流浪乞讨" value="流浪乞讨"></el-option>
									<el-option label="有严重不良嗜好" value="有严重不良嗜好"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="母亲有无特殊情况" >
								<el-select v-model="dibaoForm.abc_ex282">
									<el-option label="" value=""></el-option>
									<el-option label="社会矫正" value="社会矫正"></el-option>
									<el-option label="强制戒毒" value="强制戒毒"></el-option>
									<el-option label="服刑在押" value="服刑在押"></el-option>
									<el-option label="流浪乞讨" value="流浪乞讨"></el-option>
									<el-option label="有严重不良嗜好" value="有严重不良嗜好"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="其他需要说明的情况">
								<el-input v-model="dibaoForm.abc_ex278" placeholder="其他需要说明的情况"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					
					<h3 class="line_blue" id="page5">&emsp;核查情况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="上门核对人">
								<el-input v-model="dibaoForm.abc_ex209" placeholder="核对人人以' , '分隔(如 张三,李四 )"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="调查时间">
								<el-date-picker v-model="dibaoForm.abc_dat11" type="date" value-format="yyyy-MM-dd" placeholder="选择调查时间"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					
					<h3 class="line_blue" id="page7">&emsp;身份证及其他证明材料</h3>
					<div class="lineSt"></div>
					<div id="recordt">
						<el-row :gutter="20">
							<el-col :span="12" class="my-col">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>儿童身份证明材料</span>
										<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abc_ex206')">上传</el-button>
									</div>
									<div class="block">
										<image-view :imgList="uploadImg.abc_ex206_img"></image-view>
										
									</div>
								</el-card>
							</el-col>
							<el-col :span="12" class="my-col">
						
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>父母证明材料</span>
										<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abc_ex225')">上传</el-button>
									</div>
									<div class="block">
										<image-view :imgList="uploadImg.abc_ex225_img"></image-view>
									</div>
								</el-card>
							</el-col>
						</el-row>
						<el-row :gutter="20" style='margin-top:10px'>
							<!-- <el-col :span="12" class="my-col">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>一折通银行存折复印件</span>
										<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abc_ex226')">上传</el-button>
									</div>
									<div class="block">
										<image-view :imgList="uploadImg.abc_ex226_img"></image-view>
									</div>
								</el-card>
							</el-col> -->
							<el-col :span="12" class="my-col">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>其他证明材料</span>
										<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abc_ex207')">上传</el-button>
									</div>
									<div class="block">
										<image-view :imgList="uploadImg.abc_ex207_img"></image-view>
									</div>
								</el-card>
							</el-col>
						</el-row>
						
						<!-- <el-row :gutter="20" style='margin-top:10px'>
							<el-col :span="12" class="my-col">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>申请审批表</span>
										<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abc_ex227')">上传</el-button>
									</div>
									<div class="block">
										<image-view :imgList="uploadImg.abc_ex227_img"></image-view>
									</div>
								</el-card>
							</el-col>
						</el-row> -->
					</div>
					


					<el-dialog :visible.sync="dialogVisible" append-to-body>
						<el-image :src="dialogImageUrl" :preview-src-list="dialogImageArray"></el-image>
					</el-dialog>

					<el-dialog title="上传" :visible.sync="dialogVisible3" width="500px" append-to-body>
						<upload @upload="uploadEvent" ref="myUpload"></upload>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible3 = false">取 消</el-button>
							<el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
						</span>
					</el-dialog>
				</el-form>
			</div>
			<div class="ainfo2">
				<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
					<el-button type="primary" size="small" @click="save">保存</el-button>
					<el-button size="small" @click="closeView">返回</el-button>
				</div>

				<div style="margin-left:20px;margin-top:20px;">
					<ul>
						<li :class="{listStyle:isShow1}" @click="isShow(1)">
							<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#page1')">儿童基本情况</a><br>
						</li>
						<!-- 办结变更时的页面 -->
						<li v-if="$route.query.type == 'bg'" :class="{listStyle:isShow8}" @click="isShow(8)">
							<a class="ainfoFont" :class="{listStyleA:!isShow8}" @click="counter('#page8')">变更信息</a><br>
						</li>
						<!-- 办结变更时的页面 -->
						
						<li :class="{listStyle:isShow2}" @click="isShow(2)">
							<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#page2')">其他信息</a><br>
						</li>
						<li :class="{listStyle:isShow3}" @click="isShow(3)">
							<a class="ainfoFont" :class="{listStyleA:!isShow3}" @click="counter('#page3')">家庭状况</a><br>
						</li>
						<li :class="{listStyle:isShow4}" @click="isShow(4)">
							<a class="ainfoFont" :class="{listStyleA:!isShow4}" @click="counter('#page4')">监护状况</a><br>
						</li>
						<li :class="{listStyle:isShow5}" @click="isShow(5)">
							<a class="ainfoFont" :class="{listStyleA:!isShow5}" @click="counter('#page5')">核查情况</a><br>
						</li>
						<li :class="{listStyle:isShow7}" @click="isShow(7)">
							<a class="ainfoFont" :class="{listStyleA:!isShow7}" @click="counter('#page7')">身份证及其他证明材料</a><br>
						</li>

					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import request from '@/utils/request'
	import upload from '@/views/modules/assistance/upload.vue'
	import imageView from '@/views/modules/assistance/imageView.vue'
	export default {
		name: "addEditDibao",
		components: {
			upload,
			imageView
		},
		data() {
			return {
				test:{
					xzqhArray:[]
				},
				xzqhArray:[],
				isFinish:false,
				// el-cascader懒加载
				props: {
					lazy: true,
					lazyLoad(node, resolve) {
						const { level } = node; // 获取当前node对象中的level属性
						let pId="0";
						if(level>0){
							let value=node.value;
							if(value){
								let values=value.split("#")
								pId=values.length>1 ? values[1]:"0";
							}
						}
						request({
							url:"/social/assistance/getCityOption",
							method:"post",
							data:{
								pId:pId
							}
						}).then(res => {
							// const nodes = res;
							// nodes.forEach(item => {
							// 	item.value = item.cs_ex2+"#"+item.cs_ex1;
							// 	item.label = item.cs_ex2;
							// 	item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
							// })
							// resolve(nodes);
						}).catch(res=>{
							const nodes = res.response.data;
							nodes.forEach(item => {
								item.value = item.cs_ex2+"#"+item.cs_ex1;
								item.label = item.cs_ex2;
								item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
							})
							resolve(nodes);
						})
					}
				},
				dibaoForm: {
					abc_ex15:'',
					abc_ex16:'',
					abc_ex20:'',
					abc_ex92:'',
				},
				abc_ex230:[],
				abc_ex93:[],
				abc_ex94:[],
				abc_ex95:[],
				abc_ex104:[],
				// 家庭主要成员
				abc_ex244:[],
				uploadImg: {
					abc_ex206_img: [],
					abc_ex225_img: [],
					abc_ex207_img: [],
					// abc_ex226_img: [],
					// abc_ex227_img: [],
				},
				ac_ex10:'',
				uploadId: '',
				rules: {
					abc_ex6: [{
						required: true,
						message: '户主姓名不能为空',
						trigger: 'blur'
					}],
					abc_ex7: [{
						required: true,
						message: '户主身份证不能为空',
						trigger: 'blur'
					}],
					// abc_ex8: [{
					// 	required: true,
					// 	message: '户籍状况不能为空',
					// 	trigger: 'blur'
					// }],
					abc_ex9: [{
						required: true,
						message: '性别不能为空',
						trigger: 'blur'
					}],
					// abc_ex10: [{
					// 	required: true,
					// 	message: '村(社区)儿童主任不能为空',
					// 	trigger: 'blur'
					// }],
					abc_ex12: [{
						required: true,
						message: '民族不能为空',
						trigger: 'blur'
					}],
					abc_ex190: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}],
					abc_ex234: [{
						required: true,
						message: '行政区划不能为空',
						trigger: 'blur'
					}],
					abc_ex13: [{
						required: true,
						message: '户籍地址不能为空',
						trigger: 'blur'
					}],
					abc_ex14: [{
						required: true,
						message: '现住地址不能为空',
						trigger: 'blur'
					}],
					abc_ex15: [{
						required: true,
						message: '身体状况不能为空',
						trigger: 'blur'
					}],
					abc_ex22: [{
						required: true,
						message: '就学情况不能为空',
						trigger: 'blur'
					}],
					abc_ex241: [{
						required: true,
						message: '务工情况不能为空',
						trigger: 'blur'
					}],
					abc_ex230: [{
						required: true,
						message: '求助原因不能为空',
						trigger: 'blur'
					}],
					abc_ex250: [{
						required: true,
						message: '是否独生子女不能为空',
						trigger: 'blur'
					}],
					abc_ex251: [{
						required: true,
						message: '家庭成员数量不能为空',
						trigger: 'blur'
					}],
					abc_ex257: [{
						required: true,
						message: '住房不能为空',
						trigger: 'blur'
					}],
					abc_ex258: [{
						required: true,
						message: '住房面积不能为空',
						trigger: 'blur'
					}],
					abc_ex259: [{
						required: true,
						message: '住房套数不能为空',
						trigger: 'blur'
					}],
					abc_ex260: [{
						required: true,
						message: '家庭月收入描述不能为空',
						trigger: 'blur'
					}],
					abc_ex271: [{
						required: true,
						message: '亲子关系不能为空',
						trigger: 'blur'
					}],
					abc_ex272: [{
						required: true,
						message: '监护状况不能为空',
						trigger: 'blur'
					}],
					abc_ex273: [{
						required: true,
						message: '监护状况具体描述不能为空',
						trigger: 'blur'
					}],
					abc_ex274: [{
						required: true,
						message: '监护人不能为空',
						trigger: 'blur'
					}],
					abc_ex275: [{
						required: true,
						message: '监护人具体描述不能为空',
						trigger: 'blur'
					}],
				},
				nation: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '彝族', '土家族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族',
					'哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族',
					'拉祜族', '高山族', '东乡族', '佤族', '水族', '纳西族', '羌族', '土族', '锡伯族', '仫佬族', '柯尔克孜族', '达斡尔族', '景颇族', '撒拉族',
					'布朗族', '毛难族', '塔吉克族', '普米族', '阿昌族', '怒族',
					'鄂温克族', '京族', '基诺族', '德昂族', '乌孜别克族', '俄罗斯族', '保安族', '裕固族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
					'珞巴族'
				],
				dialogImageUrl: '',
				dialogImageArray: [],
				dialogVisible: false,
				dialogVisible3: false,
				isShow1: false,
				isShow2: true,
				isShow3: true,
				isShow4: true,
				isShow5: true,
				isShow6: true,
				isShow7: true,
				isShow8: true,

			}
		},
		mounted() {
			// 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
			// window.removeEventListener('scroll',this.scroll,false)
			window.addEventListener('scroll',this.scroll,true)
		},
		watch:{
			xzqhArray(newA,oldA){
				let qu = newA[0].split("#")[0]
				let cun = newA[1].split("#")[0]
				let zhen = newA[2].split("#")[0]
				// let i =qu+"#"+cun+"#"+zhen
				this.dibaoForm.abc_ex234 = newA[0]+","+newA[1]+","+newA[2]
				this.dibaoForm.abc_ex1 = qu
				this.dibaoForm.abc_ex2 = zhen
				this.dibaoForm.abc_ex3 = cun
			}
		},
		created() {
			this.loadData();
		},
		methods: {
			scroll(){
				// var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
				if(document.querySelector('.info2')==null || document.querySelector('#recordt')==null){
					return ''
				}
				let scrollTop = document.querySelector('.info2').scrollTop
				let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				let oDiv1 = document.querySelector('#page1');
				let oDiv2 = document.querySelector('#page2');
				let oDiv3 = document.querySelector('#page3');
				let oDiv4 = document.querySelector('#page4');
				let oDiv5 = document.querySelector('#page5');
				let oDiv7 = document.querySelector('#page7');
				let oDiv8 = document.querySelector('#page8');

			
				// 顺序跟上面显示顺序要相反
				let clientHeight = document.querySelector('.info2').clientHeight
				let recordtClientHeight = document.querySelector('#recordt').scrollHeight
				if(!oDiv1 || !oDiv2 || !oDiv3 || !oDiv4 || !oDiv5 || !oDiv7){
					return ''
				}
				if(recordtClientHeight+oDiv7.clientHeight<clientHeight && scrollTop>(oDiv7.offsetTop-oDiv1.offsetTop-clientHeight+recordtClientHeight+oDiv7.clientHeight)){
					// console.log('触发了7-1')
					this.isShow(7)
				}else if(scrollTop > (oDiv7.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了7-2')
					this.isShow(7)
				}else if(scrollTop > (oDiv5.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了5')
					this.isShow(5)
				}else if(scrollTop > (oDiv4.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了4')
					this.isShow(4)
				}else if(scrollTop > (oDiv3.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了3')
					this.isShow(3)
				}else if(scrollTop > (oDiv2.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了2')
					this.isShow(2)
				}else if(oDiv8 && scrollTop > (oDiv8.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了8')
					this.isShow(8)
				}else if(scrollTop > (oDiv1.offsetTop-oDiv1.offsetTop)){
					// console.log('触发了1')
					this.isShow(1)
				}
			},
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
			},
			loadData() {
				this.isFinish=false;
				this.getBasic({
					sId: this.$route.query.sId,
				}).then(res => {
					// console.log(res)
					// this.dibaoForm = res[0]
					// if(res[0].abc_ex230){
					// 	this.abc_ex230 = res[0].abc_ex230.split(',')
					// }
					// // 分割成数组进行选择，保存再拼接回来
					// // 家庭主要成员
					// this.abc_ex244 = res[0].abc_ex244 ? res[0].abc_ex244.split(',') : [],
					
					// this.abc_ex93 = res[0].abc_ex93 ? res[0].abc_ex93.split(',') : []
					// this.abc_ex94 = res[0].abc_ex94 ? res[0].abc_ex94.split(',') : []
					// this.abc_ex95 = res[0].abc_ex95 ? res[0].abc_ex95.split(',') : []
					// this.abc_ex104 = res[0].abc_ex104 ? res[0].abc_ex104.split(',') : []

					// this.uploadImg.abc_ex206_img = res[0].abc_ex206.split(",");
					// this.uploadImg.abc_ex225_img = res[0].abc_ex225.split(",");
					// // this.uploadImg.abc_ex226_img = res[0].abc_ex226.split(",");
					// this.uploadImg.abc_ex207_img = res[0].abc_ex207.split(",");
					// // this.uploadImg.abc_ex227_img = res[0].abc_ex227.split(",");
					// let  xzqhArray=this.dibaoForm.abc_ex234.split(",");
					// if(xzqhArray.length==3){
					// 	this.$set(this.xzqhArray,0,xzqhArray[0]);
					// 	this.$set(this.xzqhArray,1,xzqhArray[1]);
					// 	this.$set(this.xzqhArray,2,xzqhArray[2]);
					// 	this.$set(this.test,"xzqhArray",xzqhArray);
					// }else{
					// 	this.xzqhArray=[]
					// }
					// this.isFinish=true;
					// console.log(this.xzqhArray)
				}).catch(res => {
					// this.$emit("closes", false)
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					this.dibaoForm = res.response.data[0]
					if(res.response.data[0].abc_ex230){
						this.abc_ex230 = res.response.data[0].abc_ex230.split(',')
					}
					// 分割成数组进行选择，保存再拼接回来
					// 家庭主要成员
					this.abc_ex244 = res.response.data[0].abc_ex244 ? res.response.data[0].abc_ex244.split(',') : [],
					
					this.abc_ex93 = res.response.data[0].abc_ex93 ? res.response.data[0].abc_ex93.split(',') : []
					this.abc_ex94 = res.response.data[0].abc_ex94 ? res.response.data[0].abc_ex94.split(',') : []
					this.abc_ex95 = res.response.data[0].abc_ex95 ? res.response.data[0].abc_ex95.split(',') : []
					this.abc_ex104 = res.response.data[0].abc_ex104 ? res.response.data[0].abc_ex104.split(',') : []
					
					this.uploadImg.abc_ex206_img = res.response.data[0].abc_ex206.split(",");
					this.uploadImg.abc_ex225_img = res.response.data[0].abc_ex225.split(",");
					// this.uploadImg.abc_ex226_img = res.response.data[0].abc_ex226.split(",");
					this.uploadImg.abc_ex207_img = res.response.data[0].abc_ex207.split(",");
					// this.uploadImg.abc_ex227_img = res.response.data[0].abc_ex227.split(",");
					let  xzqhArray=this.dibaoForm.abc_ex234.split(",");
					if(xzqhArray.length==3){
						this.$set(this.xzqhArray,0,xzqhArray[0]);
						this.$set(this.xzqhArray,1,xzqhArray[1]);
						this.$set(this.xzqhArray,2,xzqhArray[2]);
						this.$set(this.test,"xzqhArray",xzqhArray);
					}else{
						this.xzqhArray=[]
					}
					this.isFinish=true;
				})
			},
			// 根据家庭主要成员判断是否独生子女，显示部分输入框/选项
			changeJtcy(value){
				console.log(value)
				if(value.indexOf('父亲') == -1){
					this.dibaoForm.abc_ex42 = ''
					this.dibaoForm.abc_ex253 = ''
					this.dibaoForm.abc_ex254 = ''
					this.dibaoForm.abc_ex52 = ''
					this.dibaoForm.abc_ex261 = ''
					this.dibaoForm.abc_ex262 = ''
					this.dibaoForm.abc_ex263 = ''
					this.dibaoForm.abc_ex264 = ''
					this.dibaoForm.abc_ex265 = ''
				}
				if(value.indexOf('母亲') == -1){
					this.dibaoForm.abc_ex47 = ''
					this.dibaoForm.abc_ex255 = ''
					this.dibaoForm.abc_ex256 = ''
					this.dibaoForm.abc_ex65 = ''
					this.dibaoForm.abc_ex266 = ''
					this.dibaoForm.abc_ex267 = ''
					this.dibaoForm.abc_ex268 = ''
					this.dibaoForm.abc_ex269 = ''
					this.dibaoForm.abc_ex270 = ''
				}
				if(value.indexOf('哥哥') == -1){
					this.dibaoForm.abc_ex245 = ''
				}
				if(value.indexOf('弟弟') == -1){
					this.dibaoForm.abc_ex246 = ''
				}
				if(value.indexOf('姐姐') == -1){
					this.dibaoForm.abc_ex247 = ''
				}
				if(value.indexOf('妹妹') == -1){
					this.dibaoForm.abc_ex248 = ''
				}
				// this.dibaoForm.abc_ex252 = this.dibaoForm.abc_ex245 + this.dibaoForm.abc_ex246 + this.dibaoForm.abc_ex247 + this.dibaoForm.abc_ex248
				if(value.indexOf('哥哥') == -1 && value.indexOf('弟弟') == -1 && value.indexOf('姐姐') == -1 && value.indexOf('妹妹') == -1){
					this.dibaoForm.abc_ex252 = ''
					this.dibaoForm.abc_ex250 = '是'	// 是否独生子女
				}else{
					this.dibaoForm.abc_ex250 = '否'	// 是否独生子女
				}
				// this.changeNum()
				
			},
			// 兄弟姐妹个数
			changeNum(value){
				this.dibaoForm.abc_ex252 = Number(this.dibaoForm.abc_ex245) + Number(this.dibaoForm.abc_ex246) + Number(this.dibaoForm.abc_ex247) + Number(this.dibaoForm.abc_ex248)
			},
			// 健康状况改变其他字段的值设为空
			stzkChange(val){
				console.log(val)
				if(val == '健康'){
					this.dibaoForm.abc_ex17 = ''
					this.dibaoForm.abc_ex16 = ''
					this.dibaoForm.abc_ex18 = ''
					this.dibaoForm.abc_ex20 = ''
					this.dibaoForm.abc_ex236 = ''
					this.dibaoForm.abc_ex238 = ''
					this.dibaoForm.abc_ex239 = ''
					this.dibaoForm.abc_ex240 = ''
				}else if(val == '残疾'){
					this.dibaoForm.abc_ex236 = ''
					this.dibaoForm.abc_ex238 = ''
					this.dibaoForm.abc_ex239 = ''
					this.dibaoForm.abc_ex240 = ''
				}else if(val == '患病'){
					this.dibaoForm.abc_ex17 = ''
					this.dibaoForm.abc_ex16 = ''
					this.dibaoForm.abc_ex18 = ''
					this.dibaoForm.abc_ex20 = ''
				}
			},
			// 身份证号改变后检查是否符合申请条件
			changeCid(val){
				this.dibaoForm.abc_ex9 = this.getSex(val);
				request({
					// headers: {
					// 	'Accept': 'application/json',
					// },
					url: "/social/assistance/checkChildrenIdcard",
					method: 'post',
					data: {
						abc_ex7: val
					}
				}).then((res)=>{
					// if(res[0].status == '+OK'){
					// 	// this.$message.error(res[0].msg)
					// 	this.$alert(res[0].msg,'提示',{
					// 		type :'warning',
					// 	}).then(res=>{
					// 		// this.dibaoForm.abc_ex7 = ''
					// 	})
					// }
				}).catch(()=>{
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					if(res.response.data[0].status == '+OK'){
						// this.$message.error(res[0].msg)
						this.$alert(res.response.data[0].msg,'提示',{
							type :'warning',
						}).then(res=>{
							// this.dibaoForm.abc_ex7 = ''
						})
					}
				})
			},
			getSex(card){
				let sex="";
				let msg=this.isCardID(card);
				if(!msg){
					//获取性别 
					if(parseInt(card.substr(16,1))%2==1){ 
						sex="男";
					}else 
					{ 
						sex="女";
					} 
				}
				
				return sex;
			},
			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				this.isShow3 = true
				this.isShow4 = true
				this.isShow5 = true
				this.isShow6 = true
				this.isShow7 = true
				this.isShow8 = true


				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
				} else if (n == 3) {
					this.isShow3 = false
				} else if (n == 4) {
					this.isShow4 = false
				} else if (n == 5) {
					this.isShow5 = false
				} else if (n == 6) {
					this.isShow6 = false
				} else if (n == 7) {
					this.isShow7 = false
				}else if (n == 8) {
					this.isShow8 = false
				}
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			uploads(id) {
				this.dialogVisible3 = true;
				this.uploadId = id;
				try {
					this.$refs.myUpload.clears();
				} catch (e) {}
			},
			uploadEvent(data) {
				let val = this.dibaoForm[this.uploadId];
				val = val == "" ? data : val + "," + data;
				this.dibaoForm[this.uploadId] = val;
				this.uploadImg[this.uploadId + "_img"] = val.split(",");
			},
			save() {
				this.dibaoForm.abc_ex230 = this.abc_ex230.join(',')
				this.$refs['dibaoForm'].validate((valid) => {
					if (valid) {
					} else {
						//console.log('error submit!!');
						return false;
					}
				});
				let msgs=this.validate();
				if(msgs){
					this.$message.warning(msgs);
					return false
				}
				if(this.dibaoForm.abc_ex7){
					let msg=this.isCardID(this.dibaoForm.abc_ex7);
					if(msg){
						this.$message.warning("户主"+msg);
						return false
					}
				}

				// 变更信息
				if(this.$route.query.type == 'bg'){
					if(this.ac_ex10 == ''){
						this.$message.warning('请输入变更简述');
						return false
					}
				}
				// 拼接数组保存
				this.dibaoForm.abc_ex244 = this.abc_ex244.join(',')
				this.dibaoForm.abc_ex93 = this.abc_ex93.join(',')
				this.dibaoForm.abc_ex94 = this.abc_ex94.join(',')
				this.dibaoForm.abc_ex95 = this.abc_ex95.join(',')
				this.dibaoForm.abc_ex104 = this.abc_ex104.join(',')

				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});

				this.saveBasic({
					data:'['+JSON.stringify(this.dibaoForm)+']',
					type:this.$route.query.type,
					ac_ex10: this.ac_ex10,
				}).then((res) => {
					// if (res[0].status=="+OK") {
					// 	loading.close()
					// 	this.$message.success(res[0].msg)
					// 	this.$emit("closes", false)
						
					// } else {
					// 	loading.close()
					// 	this.$message.error(res[0].msg)
					// }
				}).catch((res) => {
					// loading.close()
					// this.$message.error("请求超时或网络异常");
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					if (res.response.data[0].status=="+OK") {
						loading.close()
						this.$message.success(res.response.data[0].msg)
						this.$emit("closes", false)
						this.$router.go(-1)
					} else {
						loading.close()
						this.$message.error(res.response.data[0].msg)
					}
				})
			},
			getBasic(data) {
				return request({
					// headers: {
					// 	'Accept': 'application/json',
					// },
					url: "/social/assistance/getChildrenBasics",
					method: 'post',
					data: data
				})
			},
			saveBasic(data) {
				return request({
					// headers: {
					// 	accept: 'application/json',
					// }
					method: 'post',
					// url: '/social/assistance/childrenBasicsEdit?type='+this.$route.query.type,
					url: '/social/assistance/childrenBasicsEdit',
					data: data
				})
			},
			isCardID(sId){
				var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
				var iSum=0 ;
				var info="" ;
				if(!/^\d{17}(\d|x)$/i.test(sId)) return "身份证长度或格式错误";
				sId=sId.replace(/x$/i,"a");
				if(aCity[parseInt(sId.substr(0,2))]==null) return "身份证地区非法";
				let sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
				var d=new Date(sBirthday.replace(/-/g,"/")) ;
				if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
				for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
				if(iSum%11!=1) return "身份证号非法";
				//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
				return "";
			},
			validate(){
				try{
						let msg="";
						for(let key in this.rules){
							try{
								let r_=this.rules[key];
								let val=this.dibaoForm[key];
								if(val==""){
									msg=r_[0].message;
									//document.getElementById(key).style.border="1px solid red"
									break;
								}else{
									//document.getElementById(key).style.border="1px solid #C0C4CC"
								}
							}catch(e){
								
							}
							
						}
						return msg;
				}catch(e){
					return "";
				}
			
			},

		}
	}
</script>

<style scoped>
	.g-box {
		height: 80VH !important;
	}
	.g-box2{
		width:100%;
		height:100%;
		overflow: auto !important;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
	}

	.info2 {
		flex: 1;
		padding-right: 10px;
		box-sizing: border-box;
		border-right: 1px solid #ddd;
		overflow: auto
	}

	.my-divider {
		margin: 15px auto 10px;
	}

	.my-table {
		width: 100%;
		margin-bottom: 5px;
	}

	.my-col {
		text-align: center;
		color: #909399;
	}

	.button-group {
		margin-bottom: 5px;
		margin-left: 10px
	}

	.el-table__body-wrapper .el-table__empty-block {
		background-image: none;
		min-height: auto;
		height: auto !important;
	}

	.el-table__empty-block .el-table__empty-text {
		display: block;
		line-height: 40px;
	}

	.el-table--border {
		border-bottom: 1px solid #EBEEF5 !important;
	}


	.ainfo2 {

		width: 240px;
		font-size: 14px;
		line-height: 20px;
		text-align: left;
		padding-left: 10px;
		box-sizing: border-box;
	}



	.line_blue {
		border-left: 2px solid #3385FF;
		margin-top: 25px;
	}

	.lineSt {
		background-color: #dcdfe6;
		height: 1px;
		width: 100%;
		margin-bottom: 10px;
	}

	.ainfoFont {
		cursor: pointer;
		display: block;
		margin-bottom: -15px;
		font-weight: bold;
		color: #606266;
	}

	.listStyle {
		list-style: none;
	}

	.listStyleA {
		color: #3385FF !important
	}

	/* 	.my-table .el-input .el-input__inner{
		border: none !important;
	} */
	.my-table>>>.el-input__inner {
		border: 0;
	}
</style>
