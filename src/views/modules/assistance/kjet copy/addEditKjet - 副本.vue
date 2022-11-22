<template>
	<div class="g-box">
		<div class="g-box2">
			<div class="info2">
				<el-form :model="dibaoForm" :rules="rules"  :inline-message="true" :show-message="false" ref="dibaoForm" label-width="auto" style='padding-right: 10px;' @submit.native.prevent>
					<h3 class="line_blue" id="page1">&emsp;儿童基本情况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="收养状态" prop="adoptedType">
								<el-select v-model="dibaoForm.basicInfo.adoptedType" placeholder="请选择"  style="width:100%">
									<el-option label="无需收养" :value="0"></el-option>
									<el-option label="未被收养" :value="1"></el-option>
									<el-option label="已被收养" :value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="dibaoForm.basicInfo.name" placeholder="请输入儿童姓名"></el-input>
							</el-form-item>
						</el-col>
						
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="身份证号" prop="idCard">
								<el-input v-model="dibaoForm.basicInfo.idCard" placeholder="请输入身份证号" @change="changeCid"></el-input>
							</el-form-item>
						</el-col>
                        <el-col :span="12">
                        	<el-form-item label="性别" prop="gender">
                        		<el-select v-model='dibaoForm.basicInfo.gender' disabled style="width:100%;" >
                        			<el-option label="男" value="男"></el-option>
                        			<el-option label="女" value="女"></el-option>
                        		</el-select>
                        	</el-form-item>
                        </el-col>
					</el-row>

					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="民族" prop="nation">
								<el-select v-model="dibaoForm.basicInfo.nation"  style="width:100%;" >
									<el-option v-for="(item,index) in nation" :key="index" :label="item" :value="item"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="行政区域" prop="divisionCode">
								<el-cascader :props="props" v-model="xzqhArray" placeholder="请选择" style="width:100%;" v-if="isFinish"></el-cascader>
							</el-form-item>
						</el-col>
						
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="户籍类型" prop="censusRegisterType">
								<el-select v-model="dibaoForm.basicInfo.censusRegisterType" style="width:100%;">
									<el-option label="农村社区" value="农村社区"></el-option>
									<el-option label="城市社区" value="城市社区"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="户籍地址" prop="censusRegisterAddress">
								<el-input v-model="dibaoForm.basicInfo.censusRegisterAddress" placeholder="请输入户籍地址"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="居住地址" prop="residentialAddress">
								<el-input v-model="dibaoForm.basicInfo.residentialAddress" placeholder="请输入居住地址"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="儿童主任姓名" prop="childrenDirectorName">
								<el-input v-model="dibaoForm.basicInfo.childrenDirectorName" placeholder="请输入儿童主任姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="儿童主任联系电话" prop="childrenDirectorTel">
								<el-input v-model="dibaoForm.basicInfo.childrenDirectorTel" type="number" placeholder="请输入儿童主任联系电话"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					
					<h3 class="line_blue" id="page2">&emsp;儿童身体状况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<!-- 身体状况 -->
						<el-col :span="12">
							<el-form-item label="是否健康" prop="whetherHealth">
								<el-select v-model="dibaoForm.basicInfo.whetherHealth" style="width:100%;" >
									<el-option label="是" :value="true"></el-option>
									<el-option label="否" :value="false"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
                        <el-col :span="12">
                        	<el-form-item label="是否残疾" prop="whetherDisability">
                        		<el-select v-model="dibaoForm.basicInfo.whetherDisability" style="width:100%;" >
                        			<el-option label="是" :value="true"></el-option>
                        			<el-option label="否" :value="false"></el-option>
                        		</el-select>
                        	</el-form-item>
                        </el-col>
					</el-row>
					<el-row :gutter="20" >
                        <el-col :span="12">
                        	<el-form-item label="残疾类型" prop="disabilityType">
                        		<el-select v-model="dibaoForm.basicInfo.disabilityType" clearable style="width:100%;">
                        			<el-option label="智力残疾" value="智力残疾"></el-option>
                        			<el-option label="肢体残疾" value="肢体残疾"></el-option>
                        			<el-option label="精神残疾" value="精神残疾"></el-option>
                        			<el-option label="孤独症" value="孤独症"></el-option>
                        			<el-option label="视力残疾" value="视力残疾"></el-option>
                        			<el-option label="听力残疾" value="听力残疾"></el-option>
                        			<el-option label="言语残疾" value="言语残疾"></el-option>
                        			<el-option label="多重残疾" value="多重残疾"></el-option>
                        			<el-option label="预防接种异常反应残疾" value="预防接种异常反应残疾"></el-option>
                        			<el-option label="其他" value="其他"></el-option>
                        		</el-select>
                        	</el-form-item>
                        </el-col>
                        <el-col :span="12">
                        	<el-form-item label="其他残疾类型情况说明" prop="descriptionOfDisability">
                        		<el-input v-model="dibaoForm.basicInfo.descriptionOfDisability" placeholder="请输入其他残疾类型情况说明"></el-input>
                        	</el-form-item>
                        </el-col>
					</el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                        	<el-form-item label="残疾等级" prop="disabilityLevel">
                        		<el-select v-model="dibaoForm.basicInfo.disabilityLevel" clearable style="width:100%;">
                        			<el-option label="一级" :value="1"></el-option>
                        			<el-option label="二级" :value="2"></el-option>
                        			<el-option label="三级" :value="3"></el-option>
                        			<el-option label="四级" :value="4"></el-option>
                        		</el-select>
                        	</el-form-item>
                        </el-col>
                        <el-col :span="12">
                        	<el-form-item label="是否重病" prop="whetherSeriousIllness">
                        		<el-select v-model="dibaoForm.basicInfo.whetherSeriousIllness" style="width:100%;" >
                        			<el-option label="是" :value="true"></el-option>
                        			<el-option label="否" :value="false"></el-option>
                        		</el-select>
                        	</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                        	<el-form-item label="重病类型" prop="seriousIllnessType">
                        		<el-select v-model="dibaoForm.basicInfo.seriousIllnessType" clearable style="width:100%;">
                        			<el-option label="艾滋病病毒感染" value="艾滋病病毒感染"></el-option>
                        			<el-option label="白血病" value="白血病"></el-option>
                        			<el-option label="再生障碍性贫血" value="再生障碍性贫血"></el-option>
                        			<el-option label="血友病" value="血友病"></el-option>
                        			<el-option label="地中海贫血" value="地中海贫血"></el-option>
                        			<el-option label="先天性心脏病" value="先天性心脏病"></el-option>
                        			<el-option label="尿毒症" value="尿毒症"></el-option>
                        			<el-option label="慢性肾功能衰竭" value="慢性肾功能衰竭"></el-option>
                        			<el-option label="器官移植" value="器官移植"></el-option>
                        			<el-option label="恶性肿瘤" value="恶性肿瘤"></el-option>
                        			<el-option label="颅内良性肿瘤" value="颅内良性肿瘤"></el-option>
                                    <el-option label="上年度医保政策规定的住院和门诊治疗费用1年中自付部分超过2万元的疾病" value="上年度医保政策规定的住院和门诊治疗费用1年中自付部分超过2万元的疾病"></el-option>
                        		</el-select>
                        	</el-form-item>
                        </el-col>
                    </el-row>

					<!-- 教育状况 -->
					<h3 class="line_blue" >&emsp;教育情况</h3>
					<div class="lineSt" id="page3"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="教育情况类型" prop="education">
								<el-cascader
									v-model="education"
									:options="options"
									style="width:100%;"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="参加课外辅导班" prop="tutorialClass">
								<el-cascader
									v-model="tutorialClass"
									:options="options2"
									style="width:100%;"></el-cascader>
							</el-form-item>
						</el-col>
					</el-row>
					<!-- 教育情况类型选择不是未入学时显示 学校名称、年级（班级）、教师妈妈、教师妈妈联系电话 -->
					<el-row :gutter="20">
						<el-col :span="12" >
							<el-form-item label="学校名称" prop="schoolName">
								<el-input v-model="dibaoForm.basicInfo.schoolName" placeholder="请输入学校名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="年级（班级）" prop="gradeClass">
								<el-input v-model="dibaoForm.basicInfo.gradeClass" placeholder="请输入年级（班级）"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="教师妈妈" prop="teacher">
								<el-input v-model="dibaoForm.basicInfo.teacher" placeholder="请输入教师妈妈名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="教师妈妈联系电话" prop="teacherTel">
								<el-input v-model="dibaoForm.basicInfo.teacherTel" type="number" placeholder="请输入联系电话"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<!-- 相关经历 -->
					<h3 class="line_blue" id="page4">&emsp;相关经历</h3>
					<div class="lineSt"></div>
                    <el-row :gutter="20">
                    	<el-col :span="24">
                    		<el-form-item label="遭受侵害和虐待" prop="typeOfInfringed">
                    			<el-select v-model="typeOfInfringed" multiple style="width:100%" @change="changeExperience($event,'whetherInfringed','infringedSketch')">
                    				<el-option label="性侵害" value="性侵害"></el-option>
                    				<el-option label="拐卖" value="拐卖"></el-option>
                    				<el-option label="遗弃" value="遗弃"></el-option>
                    				<el-option label="虐待" value="虐待"></el-option>
                    				<el-option label="暴力伤害" value="暴力伤害"></el-option>
                    				<el-option label="其他" value="其他"></el-option>
                    			</el-select>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="24">
                    		<el-form-item label="遭受侵害和虐待情况简述" prop="infringedSketch">
                    			<el-input v-model="dibaoForm.basicInfo.infringedSketch" placeholder="请输入遭受侵害和虐待情况简述"></el-input>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="24">
                    		<el-form-item label="失足未成年人" prop="typeOfJuvenileDelinquent">
                    			<el-select v-model="typeOfJuvenileDelinquent" multiple style="width:100%" @change="changeExperience($event,'whetherJuvenileDelinquent','juvenileDelinquentSketch')">
                    				<el-option label="追究刑事责任" value="追究刑事责任"></el-option>
                    				<el-option label="治安拘留" value="治安拘留"></el-option>
                    				<el-option label="附条件不诉" value="附条件不诉"></el-option>
                    			</el-select>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="24">
                    		<el-form-item label="失足未成年人情况简述" prop="juvenileDelinquentSketch">
                    			<el-input v-model="dibaoForm.basicInfo.juvenileDelinquentSketch" placeholder="请输入失足未成年人情况简述"></el-input>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="24">
                    		<el-form-item label="遭遇困境类型" prop="typeOfEncounteringEmergencies">
                    			<el-select v-model="typeOfEncounteringEmergencies" multiple style="width:100%" @change="changeExperience($event,'whetherEncounteringEmergencies','encounteringEmergenciesSketch')">
                    				<el-option label="火灾" value="火灾"></el-option>
                    				<el-option label="爆炸" value="爆炸"></el-option>
                    				<el-option label="交通事故" value="交通事故"></el-option>
                    				<el-option label="人身伤害" value="人身伤害"></el-option>
                    				<el-option label="其他" value="其他"></el-option>
                    			</el-select>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="24">
                    		<el-form-item label="遭遇困境情况简述" prop="encounteringEmergenciesSketch">
                    			<el-input v-model="dibaoForm.basicInfo.encounteringEmergenciesSketch" placeholder="请输入遭遇困境情况简述"></el-input>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="24">
                    		<el-form-item label="流浪儿童类型" prop="typeOfStreetChildren">
                    			<el-select v-model="dibaoForm.basicInfo.typeOfStreetChildren" clearable style="width:100%" @change="changeExperience2($event,'streetChildrenSketch')">
                    				<el-option label="长期在外流浪儿童" value="长期在外流浪儿童"></el-option>
                    				<el-option label="外地长期在本地流浪儿童" value="外地长期在本地流浪儿童"></el-option>
                    			</el-select>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
					<el-row :gutter="20">
						<el-col :span="24">
							<el-form-item label="流浪儿童情况简述" prop="streetChildrenSketch">
								<el-input v-model="dibaoForm.basicInfo.streetChildrenSketch" placeholder="请输入流浪儿童情况简述"></el-input>
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
								placeholder="选择变更时间" style="width: 100% !important;">
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

					<h3 class="line_blue" id="page5">&emsp;其他信息</h3>
					<div class="lineSt"></div>

					<h3 class="line_blue" id="page3">&emsp;儿童家庭状况</h3>
					<div class="lineSt"></div>
					
					<!-- 父母情况 -->
					<h3 class="line_blue" id="page6">&emsp;父母情况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="父亲姓名" prop="fatherName">
								<el-input v-model="dibaoForm.familyInfo.father.name" placeholder="请输入父亲姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="父亲身份证号码" prop="fatherCardId">
								<el-input v-model="dibaoForm.familyInfo.father.cardId" placeholder="请输入父亲身份证号码"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="父亲联系电话" prop="fatherTel">
								<el-input v-model="dibaoForm.familyInfo.father.tel" type="number" placeholder="请输入父亲联系电话"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="父亲当前状况" prop="fatherType">
								<el-select v-model="dibaoForm.familyInfo.father.type" placeholder="请选择父亲当前状况" style="width:100%" @change='changeType($event,"father")'>
									<el-option label="健康" value="健康"></el-option>
									<el-option label="重病" value="重病"></el-option>
									<el-option label="残疾" value="残疾"></el-option>
									<el-option label="自然死亡" value="自然死亡"></el-option>
									<el-option label="宣告死亡" value="宣告死亡"></el-option>
									<el-option label="宣告失踪" value="宣告失踪"></el-option>
									<el-option label="离家出走" value="离家出走"></el-option>
									<el-option label="长期外出打工" value="长期外出打工"></el-option>
									<el-option label="不履行监护抚养责任" value="不履行监护抚养责任"></el-option>
									<el-option label="服刑在押" value="服刑在押"></el-option>
									<el-option label="强制戒毒" value="强制戒毒"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
                        <el-col :span="12">
                        	<el-form-item label="父亲重病情况简述" prop="fatherSeriousIllnessDesc">
                        		<el-input v-model="dibaoForm.familyInfo.father.seriousIllnessDesc" placeholder="请输入父亲重病情况简述"></el-input>
                        	</el-form-item>
                        </el-col>
                        <el-col :span="12">
                        	<el-form-item label="父亲残疾状况" prop="fatherDisabilityStatus">
                        		<el-select v-model="dibaoForm.familyInfo.father.disabilityStatus" clearable placeholder="请选择父亲残疾状况" style="width:100%">
                        			<el-option label="二级以上残疾" value="二级以上残疾"></el-option>
                        			<el-option label="三级四级精神残疾" value="三级四级精神残疾"></el-option>
                        			<el-option label="三级四级智力残疾" value="三级四级智力残疾"></el-option>
                        			<el-option label="其他" value="其他"></el-option>
                        		</el-select>
                        	</el-form-item>
                        </el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="父亲不履行监护抚养责任是否报案" prop="fatherWhetherToReport">
								<el-select v-model="dibaoForm.familyInfo.father.whetherToReport" clearable style="width:100%">
									<el-option label="未报案" :value="false"></el-option>
									<el-option label="已报案" :value="true"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
                        <el-col :span="12">
                        	<el-form-item label="父亲不履行监护抚养责任报案时间" prop="fatherReportTime">
                        		<el-date-picker v-model="dibaoForm.familyInfo.father.reportTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择父亲不履行监护抚养责任报案时间" style="width: 100% !important;" @change='changeTime($event,"father","reportingTime")'></el-date-picker>
                        	</el-form-item>
                        </el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="父亲服刑在押羁押时间" prop="fatherDetentionTime">
								<el-date-picker v-model="dibaoForm.familyInfo.father.detentionTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择父亲服刑在押羁押时间" style="width: 100% !important;" @change='changeTime2("father","detentionTime","termInCustody","timeRemaining")'></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="父亲服刑在押羁押期限(月)" prop="fatherTermInCustody">
								<el-input v-model="dibaoForm.familyInfo.father.termInCustody" type='number' placeholder="请输入父亲服刑在押羁押期限(月)" @input='changeTime2("father","detentionTime","termInCustody","timeRemaining")'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
                    <el-row :gutter="20">
                    	<el-col :span="12">
                    		<el-form-item label="父亲强制戒毒隔离时间" prop="fatherIsolationTime">
                    			<el-date-picker v-model="dibaoForm.familyInfo.father.isolationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择父亲强制戒毒隔离时间" style="width: 100% !important;" @change='("father","isolationTime","isolationPeriod","isolationTimeRemaining")'></el-date-picker>
                    		</el-form-item>
                    	</el-col>
                    	<el-col :span="12">
                    		<el-form-item label="父亲强制戒毒隔离期限(月)" prop="fatherIsolationPeriod">
                    			<el-input v-model="dibaoForm.familyInfo.father.isolationPeriod" type='number' placeholder="请输入父亲强制戒毒隔离期限(月)" @input='("father","isolationTime","isolationPeriod","isolationTimeRemaining")'></el-input>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
					<el-row :gutter="20">
						<el-col :span="24">
							<el-form-item label="其他情况(父亲)描述" prop="fatherOtherSituation">
								<el-input v-model="dibaoForm.familyInfo.father.otherSituation" placeholder="请输入其他情况(父亲)描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
                    <!-- 母亲情况 -->
                    <el-row :gutter="20">
                    	<el-col :span="12">
                    		<el-form-item label="母亲姓名" prop="motherName">
                    			<el-input v-model="dibaoForm.familyInfo.mother.name" placeholder="请输入母亲姓名"></el-input>
                    		</el-form-item>
                    	</el-col>
                    	<el-col :span="12">
                    		<el-form-item label="母亲身份证号码" prop="motherCardId">
                    			<el-input v-model="dibaoForm.familyInfo.mother.cardId" placeholder="请输入母亲身份证号码"></el-input>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="12">
                    		<el-form-item label="母亲联系电话" prop="motherTel">
                    			<el-input v-model="dibaoForm.familyInfo.mother.tel" type="number" placeholder="请输入母亲联系电话"></el-input>
                    		</el-form-item>
                    	</el-col>
                    	<el-col :span="12">
                    		<el-form-item label="母亲当前状况" prop="motherType">
                    			<el-select v-model="dibaoForm.familyInfo.mother.type" placeholder="请选择母亲当前状况" style="width:100%" @change='changeType($event,"mother")'>
                    				<el-option label="健康" value="健康"></el-option>
                    				<el-option label="重病" value="重病"></el-option>
                    				<el-option label="残疾" value="残疾"></el-option>
                    				<el-option label="自然死亡" value="自然死亡"></el-option>
                    				<el-option label="宣告死亡" value="宣告死亡"></el-option>
                    				<el-option label="宣告失踪" value="宣告失踪"></el-option>
                    				<el-option label="离家出走" value="离家出走"></el-option>
                    				<el-option label="长期外出打工" value="长期外出打工"></el-option>
                    				<el-option label="不履行监护抚养责任" value="不履行监护抚养责任"></el-option>
                    				<el-option label="服刑在押" value="服刑在押"></el-option>
                    				<el-option label="强制戒毒" value="强制戒毒"></el-option>
                    			</el-select>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                        	<el-form-item label="母亲重病情况简述" prop="motherSeriousIllnessDesc">
                        		<el-input v-model="dibaoForm.familyInfo.mother.seriousIllnessDesc" placeholder="请输入母亲重病情况简述"></el-input>
                        	</el-form-item>
                        </el-col>
                        <el-col :span="12">
                        	<el-form-item label="母亲残疾状况" prop="motherDisabilityStatus">
                        		<el-select v-model="dibaoForm.familyInfo.mother.disabilityStatus" clearable placeholder="请选择母亲残疾状况" style="width:100%">
                        			<el-option label="二级以上残疾" value="二级以上残疾"></el-option>
                        			<el-option label="三级四级精神残疾" value="三级四级精神残疾"></el-option>
                        			<el-option label="三级四级智力残疾" value="三级四级智力残疾"></el-option>
                        			<el-option label="其他" value="其他"></el-option>
                        		</el-select>
                        	</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="12">
                    		<el-form-item label="母亲不履行监护抚养责任是否报案" prop="motherWhetherToReport">
                    			<el-select v-model="dibaoForm.familyInfo.mother.whetherToReport" clearable style="width:100%">
                    				<el-option label="未报案" :value="false"></el-option>
                    				<el-option label="已报案" :value="true"></el-option>
                    			</el-select>
                    		</el-form-item>
                    	</el-col>
                        <el-col :span="12">
                        	<el-form-item label="母亲不履行监护抚养责任报案时间" prop="motherReportTime">
                        		<el-date-picker v-model="dibaoForm.familyInfo.mother.reportTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择母亲不履行监护抚养责任报案时间" style="width: 100% !important;" @change='changeTime($event,"mother","reportingTime")'></el-date-picker>
                        	</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="12">
                    		<el-form-item label="母亲服刑在押羁押时间" prop="motherDetentionTime">
                    			<el-date-picker v-model="dibaoForm.familyInfo.mother.detentionTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择母亲服刑在押羁押时间" style="width: 100% !important;" @change='changeTime2("mother","detentionTime","termInCustody","timeRemaining")'></el-date-picker>
                    		</el-form-item>
                    	</el-col>
                    	<el-col :span="12">
                    		<el-form-item label="母亲服刑在押羁押期限(月)" prop="motherTermInCustody">
                    			<el-input v-model="dibaoForm.familyInfo.mother.termInCustody" type='number' placeholder="请输入母亲服刑在押羁押期限(月)" @input='changeTime2("mother","detentionTime","termInCustody","timeRemaining")'></el-input>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="12">
                    		<el-form-item label="母亲强制戒毒隔离时间" prop="motherIsolationTime">
                    			<el-date-picker v-model="dibaoForm.familyInfo.mother.isolationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择母亲强制戒毒隔离时间" style="width: 100% !important;" @change='("mother","isolationTime","isolationPeriod","isolationTimeRemaining")'></el-date-picker>
                    		</el-form-item>
                    	</el-col>
                    	<el-col :span="12">
                    		<el-form-item label="母亲强制戒毒隔离期限(月)" prop="motherIsolationPeriod">
                    			<el-input v-model="dibaoForm.familyInfo.mother.isolationPeriod" type='number' placeholder="请输入母亲强制戒毒隔离期限(月)" @input='("mother","isolationTime","isolationPeriod","isolationTimeRemaining")'></el-input>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
                    <el-row :gutter="20">
                    	<el-col :span="24">
                    		<el-form-item label="其他情况(母亲)描述" prop="motherOtherSituation">
                    			<el-input v-model="dibaoForm.familyInfo.mother.otherSituation" placeholder="请输入其他情况(母亲)描述"></el-input>
                    		</el-form-item>
                    	</el-col>
                    </el-row>
					
					<h3 class="line_blue" id="page7">&emsp;实际监护人情况</h3>
					<div class="lineSt"></div>
					<el-table :data="dibaoForm.familyInfo.guardians" border empty-text='空' class="my-table">
						
						<!-- <el-table-column type="selection" width="40" align="center" /> -->
						<el-table-column prop="actualGuardianName" label="姓名" min-width="110">
							<template slot-scope="scope">
								<el-input v-model="dibaoForm.familyInfo.guardians[scope.rowIndex].actualGuardianName"></el-input>
							</template>
						</el-table-column>
						<!-- <el-table-column prop="abc_ex85" label="与儿童关系" min-width="125">
							<template slot-scope="scope">
								<el-input v-model="dibaoForm.familyInfo.guardians[scope.rowIndex].abc_ex85"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="abc_ex86" label="身份证号码" min-width="190">
							<template slot-scope="scope">
								<el-input v-model="dibaoForm.familyInfo.guardians[scope.rowIndex].abc_ex86"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="abc_ex87" label="身体状况" min-width="120">
							<template slot-scope="scope">
								<el-input v-model="dibaoForm.familyInfo.guardians[scope.rowIndex].abc_ex87"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="abc_ex88" label="联系电话" min-width="150">
							<template slot-scope="scope">
								<el-input v-model="dibaoForm.familyInfo.guardians[scope.rowIndex].abc_ex88"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="abc_ex89" label="教育程度" min-width="100">
							<template slot-scope="scope">
								<el-input v-model="dibaoForm.familyInfo.guardians[scope.rowIndex].abc_ex89"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="abc_ex90" label="是否同住" min-width="100">
							<template slot-scope="scope">
								<el-input v-model="dibaoForm.familyInfo.guardians[scope.rowIndex].abc_ex90"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="abc_ex91" label="亲密程度（好、差）" min-width="150">
							<template slot-scope="scope">
								<el-input v-model="dibaoForm.familyInfo.guardians[scope.rowIndex].abc_ex91"></el-input>
							</template>
						</el-table-column> -->
					</el-table>

					<h3 class="line_blue" id="page11">&emsp;儿童监护状况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="亲子关系" prop="abc_ex271">
								<el-select v-model="dibaoForm.abc_ex271" style="width:100%">
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
								<el-select v-model="dibaoForm.abc_ex272" style="width:100%">
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
								<el-select v-model="dibaoForm.abc_ex274" style="width:100%">
									<el-option label="正常" value="正常"></el-option>
									<el-option label="父母一方缺失" value="父母一方缺失"></el-option>
									<el-option label="父母双方缺失" value="父母双方缺失"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="监护人具体描述" prop="abc_ex275" >
								<el-input v-model="dibaoForm.abc_ex275" placeholder="请输入监护人具体描述"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="受监护侵害和虐待情况" prop="abc_ex276">
								<el-input v-model="dibaoForm.abc_ex276" placeholder="请输入受监护侵害和虐待情况"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<h3 class="line_blue" id="page9">&emsp;家庭经济状况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="家庭经济状况" prop="abc_ex78">
								<el-select v-model="dibaoForm.abc_ex78" style="width:100%">
									<el-option label="非贫困家庭" value="非贫困家庭"></el-option>
									<el-option label="贫困家庭" value="贫困家庭"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12" >
							<!--家庭经济状况 选择贫困时显示  -->
							<el-form-item label="贫困类型" prop="abc_ex79">
								<el-select v-model="dibaoForm.abc_ex79" style="width:100%">
									<el-option label="最低生活保障" value="最低生活保障"></el-option>
									<el-option label="特困供养" value="特困供养"></el-option>
									<el-option label="建档立卡户" value="建档立卡户"></el-option>
									<el-option label="低收入家庭（低保边缘户）" value="低收入家庭（低保边缘户）"></el-option>
									<el-option label="临时救助" value="临时救助"></el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<!-- 贫困类型 选择其他是显示 -->
							<el-form-item label="家庭贫困情形简述" prop="abc_ex80">
								<el-input v-model="dibaoForm.abc_ex80"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<h3 class="line_blue" id="page10">&emsp;成长关爱需求</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="儿童微心愿" prop="abc_ex81">
								<el-input v-model="dibaoForm.abc_ex81" placeholder="请输入儿童微心愿"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="其他需求" prop="abc_ex82">
								<el-input v-model="dibaoForm.abc_ex82" placeholder="请输入其他需求"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="家庭主要诉求" prop="abc_ex83">
								<el-input v-model="dibaoForm.abc_ex83" placeholder="请输入家庭主要诉求"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					
					
					<h3 class="line_blue" id="page14">&emsp;儿童保障情况</h3>
					<div class="lineSt"></div>
					<!-- <div> -->
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="生活保障情况" prop="abc_ex92">
									<el-select v-model="dibaoForm.abc_ex92" style="width:100%">
										<el-option label="未保障" value="未保障"></el-option>
										<el-option label="已保障" value="已保障"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="保障方式" prop="abc_ex93">
									<el-select v-model="dibaoForm.abc_ex93" style="width:100%">
										<el-option label="孤儿" value="孤儿"></el-option>
										<el-option label="重病" value="重病"></el-option>
										<el-option label="重残（生活补贴 、护理补贴）" value="重残（生活补贴 、护理补贴）"></el-option>
										<el-option label="贫困家庭（低保/特困供养/建档立卡）" value="贫困家庭（低保/特困供养/建档立卡）"></el-option>
										<el-option label="低收入家庭（低保边缘户）" value="低收入家庭（低保边缘户）"></el-option>
										<el-option label="临时救助" value="临时救助"></el-option>
										<el-option label="父母监护缺失" value="父母监护缺失"></el-option>
										<el-option label="父母无力履行监护责任" value="父母无力履行监护责任"></el-option>
										<el-option label="流浪儿童" value="流浪儿童"></el-option>
										<el-option label="其他" value="其他"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<!-- 保障方式 选择其他时显示-->
							<el-col :span="12">
								<el-form-item label="其他保障方式" prop="abc_ex96">
									<el-input v-model="dibaoForm.abc_ex96" placeholder="请填报其他保障方式"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="发放金额" prop="abc_ex97">
									<el-input v-model="dibaoForm.abc_ex97" placeholder="请填报发放金额"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="发放周期" prop="abc_ex99">
									<el-select v-model="dibaoForm.abc_ex99" style="width:100%">
										<el-option label="每年" value="每年"></el-option>
										<el-option label="每季" value="每季"></el-option>
										<el-option label="半年一次" value="半年一次"></el-option>
										<el-option label="一年一次" value="一年一次"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="发放方式" prop="abc_ex100">
									<el-select v-model="dibaoForm.abc_ex100" style="width:100%">
										<el-option label="现金" value="现金"></el-option>
										<el-option label="社会化打卡发放" value="社会化打卡发放"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="收领人" prop="abc_ex101">
									<el-input v-model="dibaoForm.abc_ex101" placeholder="请填报收领人"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="与儿童关系" prop="abc_ex102">
									<el-input v-model="dibaoForm.abc_ex102" placeholder="请填与儿童关系"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<h3 class="line_blue" id="">&emsp;教育资助</h3>
						<div class="lineSt"></div>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="是否有教育资助" prop="abc_ex103">
									<el-select v-model="dibaoForm.abc_ex103" style="width:100%">
										<el-option label="无" value="无"></el-option>
										<el-option label="有" value="有"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<!--教育资助情况 选择‘有’显示  -->
							<el-col :span="12">
								<el-form-item label="教育资助类型" prop="abc_ex104">
									<el-select v-model="dibaoForm.abc_ex104" style="width:100%">
										<el-option label="免学杂费" value="免学杂费"></el-option>
										<el-option label="免书本费" value="免书本费"></el-option>
										<el-option label="减保教费" value="减保教费"></el-option>
										<el-option label="教育资助" value="教育资助"></el-option>
										<el-option label="孤儿助学项目资助" value="孤儿助学项目资助"></el-option>
										<el-option label="牵手贫困学子项目资助" value="牵手贫困学子项目资助"></el-option>
										<el-option label="其他" value="其他"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row  :gutter="20">
							<el-col :span="12">
								<el-form-item label="减保教费(元/年)" prop="abc_ex105">
									<el-input v-model="dibaoForm.abc_ex105" placeholder="请填写减保教费"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="教育资助(元/年)" prop="abc_ex106">
									<el-input v-model="dibaoForm.abc_ex106" placeholder="请填写教育资助"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="孤儿助学项目资助(元/年)"  prop="abc_ex107" label-width="190px">
									<el-input v-model="dibaoForm.abc_ex107" placeholder="请填写孤儿助学项目资助"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="牵手贫困学子项目资助(元/年)" prop="abc_ex108" label-width="220px">
									<el-input v-model="dibaoForm.abc_ex108" placeholder="请填写牵手贫困学子项目资助"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="其他资助情况" prop="abc_ex109">
									<el-input v-model="dibaoForm.abc_ex109" placeholder="请填写其他资助情况"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					<!-- </div> -->
					<h3 class="line_blue" id="page15">&emsp;医疗救助情况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<!-- 保障方式 选择其他时显示-->
						<el-col :span="12">
							<el-form-item label="基本医疗保险" prop="abc_ex110">
								<el-select v-model="dibaoForm.abc_ex110" style="width:100%">
									<el-option label="政府资助参保" value="政府资助参保"></el-option>
									<el-option label="自费参保" value="自费参保"></el-option>
									<el-option label="未参保" value="未参保"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="个人医疗费" prop="abc_ex111">
								<el-input v-model="dibaoForm.abc_ex111" placeholder="请填写个人医疗费用（元）"></el-input>
							</el-form-item>
						</el-col>
					<!-- </el-row> -->
					<!-- <el-row> -->
						<el-col :span="12" v-if="dibaoForm.abc_ex111>0">
							<el-form-item label="门诊（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex111" placeholder="请填写门诊费用"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex111>0">
							<el-form-item label="住院（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex111" placeholder="请填写住院疗费"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex111>0">
							<el-form-item label="住院（天）" prop="">
								<el-input v-model="dibaoForm.abc_ex111" placeholder="请填写住院天数"></el-input>
							</el-form-item>
						</el-col>
					<!-- </el-row> -->

					<!-- <el-row :gutter="20"> -->
						<el-col :span="12" >
							<el-form-item label="门诊费用报支" prop="abc_ex115">
								<el-input v-model="dibaoForm.abc_ex115" placeholder="请填写门诊费用报支"></el-input>
							</el-form-item>
						</el-col>
					<!-- </el-row> -->
					<!-- <el-row :gutter="20"> -->
						<el-col :span="12" v-if="dibaoForm.abc_ex115>0">
							<el-form-item label="医疗报销（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex115" placeholder="请填写医疗报销费用"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex115>0">
							<el-form-item label="明天计划（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex115" placeholder="请填写明天计划费用"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex115>0">
							<el-form-item label="大病慈善救助（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex115" placeholder="请填写大病慈善救助费用"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex115>0">
							<el-form-item label="牵手困境儿童（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex115" placeholder="请填写牵手困境儿童费用"></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item label="住院费用报支（元）" prop="abc_ex120">
								<el-input v-model="dibaoForm.abc_ex120" placeholder="请填写住院费用报支"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex120>0">
							<el-form-item label="医疗报销（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex120" placeholder="请填写医疗报销费用"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex120>0">
							<el-form-item label="明天计划（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex120" placeholder="请填写明天计划费用"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex120>0">
							<el-form-item label="大病慈善救助（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex115" placeholder="请填写大病慈善救助费用"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex120>0">
							<el-form-item label="牵手困境儿童（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex115" placeholder="请填写牵手困境儿童费用"></el-input>
							</el-form-item>
						</el-col>


						<el-col :span="12">
							<el-form-item label="个人自付医疗费用（元）"  prop="abc_ex125">
								<el-input v-model="dibaoForm.abc_ex125" placeholder="请填写个人自付医疗费用"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex125>0">
							<el-form-item label="门诊（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex120" placeholder="请填写门诊费用"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="dibaoForm.abc_ex125>0">
							<el-form-item label="住院（元）" prop="">
								<el-input v-model="dibaoForm.abc_ex120" placeholder="请填写住院费用"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<h3 class="line_blue" id="page16">&emsp;康复救助情况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="残疾确诊时年龄" prop="abc_ex128"> 
								<el-input v-model="dibaoForm.abc_ex128" placeholder="请填写残疾确诊时年龄"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="残疾确诊情况简述" prop="abc_ex129"> 
								<el-input v-model="dibaoForm.abc_ex129" placeholder="请填写残疾确诊时情况简述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="康复训练参加情况" prop="abc_ex130">
								<el-select v-model="dibaoForm.abc_ex130" style="width:100%">
									<el-option label="已参加" value="政府资助参保"></el-option>
									<el-option label="未参加" value="未参加"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="康复机构" prop="abc_ex131">
								<el-input v-model="dibaoForm.abc_ex131" placeholder="请填写康复机构"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="康复效果" prop="abc_ex132"> 
								<el-input v-model="dibaoForm.abc_ex132" placeholder="请填写康复效果"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="未参加原因" prop="abc_ex134"> 
								<el-select v-model="dibaoForm.abc_ex134" style="width:100%">
									<el-option label="交通因素" value="交通因素"></el-option>
									<el-option label="家庭人力因素" value="家庭人力因素"></el-option>
									<el-option label="不知道政策" value="不知道政策"></el-option>
									<el-option label="康复效果不佳" value="康复效果不佳"></el-option>
									<el-option label="其他" value="其他"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="矫治器具配备情况" prop="abc_ex136"> 
								<el-select v-model="dibaoForm.abc_ex136" style="width:100%">
									<el-option label="已配备" value="已配备"></el-option>
									<el-option label="未配备" value="未配备"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="配备器具" prop="abc_ex137"> 
								<el-select v-model="dibaoForm.abc_ex137" style="width:100%">
									<el-option label="验配助视器" value="验配助视器"></el-option>
									<el-option label="验配助听器（双耳）" value="验配助听器（双耳）"></el-option>
									<el-option label="装配假肢或矫形器、适配轮椅、坐姿椅、站立架、助行器" value="装配假肢或矫形器、适配轮椅、坐姿椅、站立架、助行器"></el-option>
									<el-option label="配基本型人工耳蜗" value="配基本型人工耳蜗"></el-option>
									<el-option label="未收取费用" value="未收取费用"></el-option>
									<el-option label="收取费用" value="收取费用"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="矫治器具配备简述" prop="abc_ex139"> 
								<el-input v-model="dibaoForm.abc_ex139" placeholder="请填写矫治器具配备简述"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="未配备原因"> 
								<el-select v-model="dibaoForm.abc_ex140" style="width:100%">
									<el-option label="不需要" value="不需要"></el-option>
									<el-option label="不知道" value="不知道"></el-option>
									<el-option label="不符合政策" value="不符合政策"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<h3 class="line_blue" id="page17">&emsp;司法援助情况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="是否需要司法援助">
								<el-select v-model="dibaoForm.abc_ex141" style="width:100%">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="司法援助情况简述"> 
								<el-input v-model="dibaoForm.abc_ex142" placeholder="请填写司法援助情况简述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<h3 class="line_blue" id="page18">&emsp;群团组织及社会关爱情况</h3>
					<div class="lineSt"></div>
					<el-row :gutter="20">
						<!-- <el-col :span="12">
							<el-form-item label="是否有群体组织及社会关爱" label-width="210px">
								<el-select v-model="dibaoForm.abc_ex143" style="width:100%">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col> -->
						<el-col :span="12">
							<el-form-item label="是否有志愿者结对关爱" label-width="210px">
								<el-select v-model="dibaoForm.abc_ex143" style="width:100%">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="志愿者结对关爱情况简述" label-width="210px"> 
								<el-input v-model="dibaoForm.abc_ex145" placeholder="请填写志愿者结对关爱情况简述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" >
						<el-col :span="12">
							<el-form-item label="是否有部门（单位）结对关爱" label-width="230px">
								<el-select v-model="dibaoForm.abc_ex146" style="width:100%">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="部门（单位）结对关爱情况简述" label-width="230px"> 
								<el-input v-model="dibaoForm.abc_ex147" placeholder="请填写部门（单位）结对关爱情况简述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" >
						<el-col :span="12">
							<el-form-item label="是否有社会捐助" label-width="210px">
								<el-select v-model="dibaoForm.abc_ex148" style="width:100%">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="社会捐助情况简述" label-width="210px"> 
								<el-input v-model="dibaoForm.abc_ex149" placeholder="请填写社会捐助情况简述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20" style="margin-bottom:20px">
						<el-col :span="12">
							<el-form-item label="是否有其他关爱" label-width="210px">
								<el-select v-model="dibaoForm.abc_ex150" style="width:100%">
									<el-option label="是" value="是"></el-option>
									<el-option label="否" value="否"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="其他关爱情况简述" label-width="210px"> 
								<el-input v-model="dibaoForm.abc_ex151" placeholder="请填写其他关爱情况简述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<h3 class="line_blue" id="page12" v-if="this.dibaoForm.abc_ex205=='委托确认'">&emsp;核查情况</h3>
					<div class="lineSt"  v-if="this.dibaoForm.abc_ex205=='委托确认'"></div>
					<el-row :gutter="20"  v-if="this.dibaoForm.abc_ex205=='委托确认'">
						<el-col :span="12">
							<el-form-item label="上门核对人" prop="abc_ex209">
								<el-input v-model="dibaoForm.abc_ex209" placeholder="核对人人以' , '分隔(如 张三,李四 )"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="调查时间" prop="abc_dat11">
								<el-date-picker v-model="dibaoForm.abc_dat11" type="date" value-format="yyyy-MM-dd" placeholder="选择调查时间" style="width: 100% !important;"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<!-- <h3 class="line_blue" id="page13">&emsp;身份证及其他证明材料</h3>
					<div class="lineSt"></div>
					<div id="recordt" style="margin-bottom:10px">
						<el-row :gutter="20">
							<el-col :span="12" class="my-col">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'abc_ex206')">删除</el-button>
										<span>儿童身份证明材料(<span class="photo_num">{{imgNum.abc_ex206_img}}</span>)</span>
										<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abc_ex206','dibaoForm')">上传</el-button>
									</div>
									<div class="block">
										<image-view :imgList="uploadImg.abc_ex206_img"  @Imgindex='getImgIndex'></image-view>
									</div>
								</el-card>
							</el-col>
							<el-col :span="12" class="my-col">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'abc_ex225')">删除</el-button>
										<span>父母证明材料(<span class="photo_num">{{imgNum.abc_ex225_img}}</span>)</span>
										<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abc_ex225','dibaoForm')">上传</el-button>
									</div>
									<div class="block">
										<image-view :imgList="uploadImg.abc_ex225_img"  @Imgindex='getImgIndex'></image-view>
									</div>
								</el-card>
							</el-col>
						</el-row>
						<el-row :gutter="20" style='margin-top:10px;'>
							<el-col :span="12" class="my-col">
								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'abc_ex207')">删除</el-button>
										<span>其他证明材料(<span class="photo_num">{{imgNum.abc_ex207_img}}</span>)</span>
										<el-button style="float: right; padding: 3px 0" type="text" @click="uploads('abc_ex207','dibaoForm')">上传</el-button>
									</div>
									<div class="block">
										<image-view :imgList="uploadImg.abc_ex207_img"  @Imgindex='getImgIndex'></image-view>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</div> -->
					<el-dialog :visible.sync="dialogVisible" append-to-body>
						<el-image :src="dialogImageUrl" :preview-src-list="dialogImageArray"></el-image>
					</el-dialog>
					<el-dialog title="上传" :visible.sync="dialogVisible3" width="500px" append-to-body @close='uploadEvent2'>
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
							<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#page2')">儿童身体状况</a><br>
						</li>
						<li :class="{listStyle:isShow3}" @click="isShow(3)">
							<a class="ainfoFont" :class="{listStyleA:!isShow3}" @click="counter('#page3')">儿童家庭状况</a><br>
						</li>
						<li :class="{listStyle:isShow4}" @click="isShow(4)">
							<a class="ainfoFont" :class="{listStyleA:!isShow4}" @click="counter('#page4')">相关经历</a><br>
						</li>
						<li :class="{listStyle:isShow5}" @click="isShow(5)">
							<a class="ainfoFont" :class="{listStyleA:!isShow5}" @click="counter('#page5')">其他信息</a><br>
						</li>
						<li :class="{listStyle:isShow6}" @click="isShow(6)">
							<a class="ainfoFont" :class="{listStyleA:!isShow6}" @click="counter('#page6')">父母情况</a><br>
						</li>
						<li :class="{listStyle:isShow7}" @click="isShow(7)">
							<a class="ainfoFont" :class="{listStyleA:!isShow7}" @click="counter('#page7')">实际监护人情况</a><br>
						</li>
						<li :class="{listStyle:isShow11}" @click="isShow(11)">
							<a class="ainfoFont" :class="{listStyleA:!isShow11}" @click="counter('#page11')">监护状况</a><br>
						</li>
						<li :class="{listStyle:isShow9}" @click="isShow(9)">
							<a class="ainfoFont" :class="{listStyleA:!isShow9}" @click="counter('#page9')">家庭经济状况</a><br>
						</li>
						<li :class="{listStyle:isShow10}" @click="isShow(10)">
							<a class="ainfoFont" :class="{listStyleA:!isShow10}" @click="counter('#page10')">成长关爱需求</a><br>
						</li>
						<li :class="{listStyle:isShow12}" @click="isShow(12)">
							<a class="ainfoFont" :class="{listStyleA:!isShow12}" @click="counter('#page12')">核查情况</a><br>
						</li>
						<li :class="{listStyle:isShow14}" @click="isShow(14)">
							<a class="ainfoFont" :class="{listStyleA:!isShow14}" @click="counter('#page14')">儿童保障情况</a><br>
						</li>
						<li :class="{listStyle:isShow15}" @click="isShow(15)">
							<a class="ainfoFont" :class="{listStyleA:!isShow15}" @click="counter('#page15')">医疗救助情况</a><br>
						</li>
						<li :class="{listStyle:isShow16}" @click="isShow(16)">
							<a class="ainfoFont" :class="{listStyleA:!isShow16}" @click="counter('#page16')">康复救助情况</a><br>
						</li>
						<li :class="{listStyle:isShow17}" @click="isShow(17)">
							<a class="ainfoFont" :class="{listStyleA:!isShow17}" @click="counter('#page17')">群团组织及社会关爱情况</a><br>
						</li>
						<!-- <li :class="{listStyle:isShow13}" @click="isShow(13)">
							<a class="ainfoFont" :class="{listStyleA:!isShow13}" @click="counter('#page13')">身份证及其他证明材料</a><br>
						</li> -->
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
				xzqhArray:[],
				isFinish:false,
				// el-cascader懒加载
				props: {
					lazy: true,
					lazyLoad(node, resolve) {
						const { level } = node; // 获取当前node对象中的level属性
						let pId = "0";
						if(level>0){
							let value = node.value;
							if(value){
								let values = value.split("#")
								pId = values.length>1 ? values[1] : "0";
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
								item.value = item.cs_ex2 + "#" + item.cs_ex1;
								item.label = item.cs_ex2;
								item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
							})
							resolve(nodes);
						})
					}
				},

				dibaoForm: {
					abc_ex92:'',
				},

				education:[], // 教育情况类型
                tutorialClass: [], //辅导班
				typeOfJuvenileDelinquent:[], //失足未成年人
                typeOfEncounteringEmergencies:[], //遭遇困境类型
                typeOfInfringed: [], //遭受侵害和虐待

				// 材料上传图片存储数组
				uploadImg: {
					// abc_ex206_img: [],
					// abc_ex225_img: [],
					// abc_ex207_img: [],
				},
				imgIndex: {
					// abc_ex206:0,
					// abc_ex225: 0,
					// abc_ex207: 0
				},
				ac_ex10:'',
				imgNum:{},//图片数量
				uploadId: '',
				rules: {
					name: [{
						required: true,
						message: '姓名不能为空',
						trigger: 'blur'
					}],
					idCard: [{
						required: true,
						message: '身份证不能为空',
						trigger: 'blur'
					}],
					basicInfo: [{
						required: true,
						message: '户籍类型不能为空',
						trigger: 'blur'
					}],
					gender: [{
						required: true,
						message: '性别不能为空',
						trigger: 'blur'
					}],
					// childrenDirectorName: [{
					// 	required: true,
					// 	message: '儿童主任姓名不能为空',
					// 	trigger: 'blur'
					// }],
					nation: [{
						required: true,
						message: '民族不能为空',
						trigger: 'blur'
					}],
					divisionCode: [{
						required: true,
						message: '行政区划不能为空',
						trigger: 'blur'
					}],
					censusRegisterAddress: [{
						required: true,
						message: '户籍地址不能为空',
						trigger: 'blur'
					}],
					residentialAddress: [{
						required: true,
						message: '居住地址不能为空',
						trigger: 'blur'
					}],
					whetherHealth: [{
						required: true,
						message: '是否健康不能为空',
						trigger: 'blur'
					}],
					// abc_ex271: [{
					// 	required: true,
					// 	message: '亲子关系不能为空',
					// 	trigger: 'blur'
					// }],
					// abc_ex272: [{
					// 	required: true,
					// 	message: '监护状况不能为空',
					// 	trigger: 'blur'
					// }],
					// abc_ex273: [{
					// 	required: true,
					// 	message: '监护状况具体描述不能为空',
					// 	trigger: 'blur'
					// }],
					// abc_ex274: [{
					// 	required: true,
					// 	message: '监护人不能为空',
					// 	trigger: 'blur'
					// }],
					// abc_ex275: [{
					// 	required: true,
					// 	message: '监护人具体描述不能为空',
					// 	trigger: 'blur'
					// }],
					adoptedType: [{
						required: true,
						message: '收养状况不能为空',
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
				isShow9: true,
				isShow10: true,
				isShow11: true,
				isShow12: true,
				isShow13: true,
				isShow14: true,
				isShow15: true,
				isShow16: true,
				isShow17: true,
				options: [
					{
						value: '学龄前',
						label: '学龄前',
						children: [
							{
								value: '未入园',
								label: '未入园',
							},{
								value: '幼儿园',
								label: '幼儿园',
							},{
								value: '特教',
								label: '特教',
							}
						]
					},{
						value: '义务教育',
						label: '义务教育',
						children: [
							{
								value: '小学',
								label: '小学',
							},{
								value: '初中',
								label: '初中',
							},{
								value: '特教',
								label: '特教',
							}
						]
					},{
						value: '高中',
						label: '高中',
						children: [
							{
								value: '高中',
								label: '高中',
							},{
								value: '中职',
								label: '中职',
							},{
								value: '特教',
								label: '特教',
							}
						]
					},{
						value: '高等教育',
						label: '高等教育',
						children: [
							{
								value: '大专',
								label: '大专',
							},{
								value: '本科',
								label: '本科',
							}
						]
					},{
						value: '其他',
						label: '其他',
						children: [
							{
								value: '辍学',
								label: '辍学',
							},{
								value: '无随班就读能力',
								label: '无随班就读能力',
							},{
								value: '待业',
								label: '待业',
							},{
								value: '就业',
								label: '就业',
							}
						]
					}
				],
				options2:[
					{
						value: true,
						label: '是',
						children: [
							{
								value: '每天',
								label: '每天',
							},{
								value: '休息日',
								label: '休息日',
							},{
								value: '寒暑假',
								label: '寒暑假',
							}
						]
					},{
						value: false,
						label: '否',
					}
				],
			}
		},
		watch:{
			xzqhArray(newA,oldA){
				let qu = newA[0].split("#")[0]
				let zhen = newA[1].split("#")[0]
				let cun = newA[2].split("#")[0]
				this.dibaoForm.basicInfo.divisionCode = newA[0]+","+newA[1]+","+newA[2]
				this.dibaoForm.basicInfo.district = qu
				this.dibaoForm.basicInfo.townStreet = zhen
				this.dibaoForm.basicInfo.rusticate = cun
			}
		},

		created() {
			this.loadData();
		},
		methods: {

			// 菜单点击事件
			counter(id) { //counter1是绑定的点击事件名称
				document.querySelector(id).scrollIntoView(true);
			},

			loadData() {
				this.isFinish=false;
				if (this.$route.query.sId) {
                    this.getBasic({
                    	id: this.$route.query.sId,
                    }).then(res => {
                    	
                    }).catch(res => {
                    	if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
                    		console.log('请求失败了-----------------------')
                    		this.$message.error('数据获取失败或请求超时')
                    		this.$emit("closes", false)
                    		this.$router.go(-1)
                    		return false
                    	}
                        let data = res.response.data.data
                        console.log(data)
                    	this.dibaoForm = data
                    
                    	// 儿童身份证明材料、父母证明材料、其他证明材料
                    	// this.uploadImg.abc_ex206_img = data.abc_ex206 ? data.abc_ex206.split(",") : [];
                    	// this.uploadImg.abc_ex207_img = data.abc_ex207 ? data.abc_ex207.split(",") : [];
                    	// this.uploadImg.abc_ex225_img = data.abc_ex225 ? data.abc_ex225.split(",") : [];
                    	
                    	// 获取图片数量
                    	// this.getImgNum()
                    	let  xzqhArray = this.dibaoForm.basicInfo.divisionCode ? this.dibaoForm.basicInfo.divisionCode.split(",") : [];
                    
                    	// 相关经历
                    	this.typeOfJuvenileDelinquent = this.dibaoForm.basicInfo.typeOfJuvenileDelinquent ? this.dibaoForm.basicInfo.typeOfJuvenileDelinquent.split(',') : [];
                    	this.typeOfEncounteringEmergencies = this.dibaoForm.basicInfo.typeOfEncounteringEmergencies ? this.dibaoForm.basicInfo.typeOfEncounteringEmergencies.split(',') : [];
                        
                        if (this.dibaoForm.basicInfo.educationStage && this.dibaoForm.basicInfo.educationType) {
                            this.education = [this.dibaoForm.basicInfo.educationStage, this.dibaoForm.basicInfo.educationType];
                        }
                        if (this.dibaoForm.basicInfo.tutorialClass == true) {
                            this.tutorialClass = [this.dibaoForm.basicInfo.tutorialClass, this.dibaoForm.basicInfo.typeOfTutorialClass];
                        } else if (this.dibaoForm.basicInfo.tutorialClass == false) {
                            this.tutorialClass = [this.dibaoForm.basicInfo.tutorialClass];
                        }
                        
                        this.typeOfInfringed = this.dibaoForm.basicInfo.typeOfInfringed ? this.dibaoForm.basicInfo.typeOfInfringed.split(',') : [];
                    
                    
                    
                    	if(xzqhArray.length==3){
                    		this.$set(this.xzqhArray,0,xzqhArray[0]);
                    		this.$set(this.xzqhArray,1,xzqhArray[1]);
                    		this.$set(this.xzqhArray,2,xzqhArray[2]);
                    	}else{
                    		this.xzqhArray = [];
                    	}
                    	this.isFinish = true;
                    })
                } else {
                    this.dibaoForm = {
                        "assureInfo": {
                            "correctionSketch": "",
                            "correctorType": "",
                            "departmentCareSketch": "",
                            "disabilityDiagnosisAge": "",
                            "disabilitySketch": "",
                            "distributionCycle": "",
                            "distributionMethod": "",
                            "educationSubsidyOfMoney": "",
                            "financialAidForOrphansOfMoney": 0,
                            "financialAidForPoorStudentsOfMoney": "",
                            "guaranteeMode": "",
                            "guaranteeModeResume": "",
                            "haAssistanceForChildrenInNeed": 0,
                            "haCharityAidForSeriousIllness": 0,
                            "haMedicalReimbursement": 0,
                            "haPlannedExpensesForTomorrow": 0,
                            "hospitalizationExpenses": 0,
                            "id": 0,
                            "individualPayHospitalization": 0,
                            "individualPayOutpatient": 0,
                            "individualPaymedicalCare": 0,
                            "judicialAssistanceSketch": "",
                            "lengthOfStay": 0,
                            "medicalExpense": 0,
                            "medicalInsuranceType": "",
                            "opcAssistanceForChildrenInNeed": 0,
                            "opcCharityAidForSeriousIllness": 0,
                            "opcMedicalReimbursement": 0,
                            "opcPlannedExpensesForTomorrow": 0,
                            "otherCareSketch": "",
                            "otherFundingDescription": "",
                            "otherNoRecoverySketch": "",
                            "outpatientExpenses": 0,
                            "paymentAmount": 0,
                            "receiver": "",
                            "reduceTheAmountOfTuition": 0,
                            "rehabilitationEffect": "",
                            "rehabilitationExpenses": "",
                            "rehabilitationInstitution": "",
                            "socialDonationsSketch": "",
                            "volunteerCareSketch": "",
                            "whetherCharge": true,
                            "whetherDepartmentCare": true,
                            "whetherEducationSubsidy": "",
                            "whetherEquipmentCorrector": true,
                            "whetherFreeBooks": true,
                            "whetherFreeOfSchoolFees": true,
                            "whetherGuarantee": "",
                            "whetherJudicialAssistance": true,
                            "whetherOtherCare": true,
                            "whetherRehabilitationTraining": true,
                            "whetherSocialAssistance": true,
                            "whetherSocialDonations": true,
                            "whetherVolunteerCare": true,
                            "whyNoEquipmentCorrector": "",
                            "whyNoRecovery": "",
                            "withChildren": ""
                        },
                        "basicInfo": {
                            "adoptedType": 0,
                            "birth": "",
                            "censusRegisterAddress": "",
                            "censusRegisterType": "",
                            "childrenDirectorName": "",
                            "childrenDirectorTel": "",
                            "descriptionOfDisability": "",
                            "disabilityLevel": '', //int
                            "disabilityType": "",
                            "district": "",
                            "divisionCode": "",
                            "educationStage": "",
                            "educationType": "",
                            "encounteringEmergenciesSketch": "",
                            "gender": "",
                            "gradeClass": "",
                            "id": 0,
                            "idCard": "",
                            "infringedSketch": "",
                            "juvenileDelinquentSketch": "",
                            "name": "",
                            "nation": "",
                            "residentialAddress": "",
                            "rusticate": "",
                            "schoolAddress": "",
                            "schoolName": "",
                            "seriousIllnessType": "",
                            "source": "",
                            "streetChildrenSketch": "",
                            "teacher": "",
                            "teacherTel": "",
                            "townStreet": "",
                            "tutorialClass": '', //Boolean
                            "typeOfEncounteringEmergencies": "",
                            "typeOfInfringed": "",
                            "typeOfJuvenileDelinquent": "",
                            "typeOfStreetChildren": "",
                            "typeOfTutorialClass": "",
                            "whetherDisability": true,
                            "whetherEncounteringEmergencies": true,
                            "whetherHealth": true,
                            "whetherInfringed": true,
                            "whetherJuvenileDelinquent": true,
                            "whetherSeriousIllness": true
                        },
                        "familyInfo": {
                            "childrenNeeds": "",
                            "familyNeeds": "",
                            "father": {
                                "cardId": "",
                                "detentionTime": "",
                                "disabilityStatus": "",
                                "id": 0,
                                "isolationPeriod": 0,
                                "isolationTime": "",
                                "isolationTimeRemaining": 0,
                                "name": "",
                                "otherSituation": "",
                                "relation": "",
                                "reportTime": "",
                                "reportingTime": 0,
                                "seriousIllnessDesc": "",
                                "tel": "",
                                "termInCustody": 0,
                                "timeRemaining": 0,
                                "type": "",
                                "whetherCompulsoryDetoxification": true,
                                "whetherDisability": true,
                                "whetherInCustody": true,
                                "whetherPerformObligations": true,
                                "whetherToReport": true
                            },
                            "guardians": [
                                {
                                    "actualGuardianCardId": "",
                                    "actualGuardianEducationalLevel": "",
                                    "actualGuardianHealthStatus": "",
                                    "actualGuardianName": "",
                                    "actualGuardianTel": "",
                                    "id": 0,
                                    "intimacy": "",
                                    "relationshipWithChildren": "",
                                    "whetherCohabitation": true
                                },
                                {
                                    "actualGuardianCardId": "",
                                    "actualGuardianEducationalLevel": "",
                                    "actualGuardianHealthStatus": "",
                                    "actualGuardianName": "",
                                    "actualGuardianTel": "",
                                    "id": 0,
                                    "intimacy": "",
                                    "relationshipWithChildren": "",
                                    "whetherCohabitation": true
                                },
                                {
                                    "actualGuardianCardId": "",
                                    "actualGuardianEducationalLevel": "",
                                    "actualGuardianHealthStatus": "",
                                    "actualGuardianName": "",
                                    "actualGuardianTel": "",
                                    "id": 0,
                                    "intimacy": "",
                                    "relationshipWithChildren": "",
                                    "whetherCohabitation": true
                                }
                            ],
                            "id": 0,
                            "mother": {
                                "cardId": "",
                                "detentionTime": "",
                                "disabilityStatus": "",
                                "id": 0,
                                "isolationPeriod": 0,
                                "isolationTime": "",
                                "isolationTimeRemaining": 0,
                                "name": "",
                                "otherSituation": "",
                                "relation": "",
                                "reportTime": "",
                                "reportingTime": 0,
                                "seriousIllnessDesc": "",
                                "tel": "",
                                "termInCustody": 0,
                                "timeRemaining": 0,
                                "type": "",
                                "whetherCompulsoryDetoxification": true,
                                "whetherDisability": true,
                                "whetherInCustody": true,
                                "whetherPerformObligations": true,
                                "whetherToReport": true
                            },
                            "otherNeeds": "",
                            "otherTypeOfSketch": "",
                            "typesOfPoverty": "",
                            "whetherPoorFamilies": true
                        }
                    }
                    this.isFinish = true;
                }
                
				
			},
            // 相关经历对应的是否字段赋值，如果无相关经历，对应的简述赋值为空
			changeExperience(val,field1,field2) {
                if (val.length == 0) {
                    this.dibaoForm.basicInfo[field1] = false
                    this.dibaoForm.basicInfo[field2] = ''
                } else {
                    this.dibaoForm.basicInfo[field1] = true
                }
            },
            changeExperience2(val,field1) {
                if (!val) {
                    this.dibaoForm.basicInfo[field1] = ''
                }
            },
            changeType(val,val2) {
                this.dibaoForm.familyInfo[val2].whetherDisability = false
                this.dibaoForm.familyInfo[val2].whetherInCustody = false
                this.dibaoForm.familyInfo[val2].whetherCompulsoryDetoxification = false
                if (val == '残疾') {
                    // 是否残疾
                    this.dibaoForm.familyInfo[val2].whetherDisability = true
                } else if (val == '服刑在押') {
                    // 是否服刑在押
                    this.dibaoForm.familyInfo[val2].whetherInCustody = true
                }   else if (val == '强制戒毒') {
                    // 是否强制戒毒
                    this.dibaoForm.familyInfo[val2].whetherCompulsoryDetoxification = true
                }  
            },
            changeTime(val,val2,val3) {
                let year = new Date().getFullYear() - new Date(val).getFullYear()
                let month = new Date().getMonth() - new Date(val).getMonth()
                month += year * 12
                console.log(month)
                // 报案时长
                this.dibaoForm.familyInfo[val2][val3] = month
            },
            // 剩余月份
            changeTime2(val1,val2,val3,val4) {
                if (this.dibaoForm.familyInfo[val1][val2] && this.dibaoForm.familyInfo[val1][val3]) {
                    let year = new Date(this.dibaoForm.familyInfo[val1][val2]).getFullYear()
                    let month = new Date(this.dibaoForm.familyInfo[val1][val2]).getMonth() + 1
                    month += Number(this.dibaoForm.familyInfo[val1][val3])
                    console.log(Math.floor(month / 12))
                    if (month / 12 > 0) {
                        year += Math.floor(month / 12)
                        month = month % 12
                        console.log(year)
                        console.log(month)
                    }
                    let nowYear = new Date().getFullYear()
                    let nowMonth = new Date().getMonth() + 1
                    if (year - nowYear >= 0) {
                       let t = (year - nowYear) * 12 + (month - nowMonth)
                       if (t>=0) {
                           this.dibaoForm.familyInfo[val1][val4] = t
                       } else {
                           this.dibaoForm.familyInfo[val1][val4] = 0
                       }
                    } else {
                        this.dibaoForm.familyInfo[val1][val4] = 0
                    }
                    // console.log(this.dibaoForm.familyInfo[val1].timeRemaining)
                }
                
                
            },
			// 身份证号改变后检查是否符合申请条件
			changeCid(val){
				this.dibaoForm.basicInfo.gender = this.getSex(val);
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
					// 		// this.dibaoForm.basicInfo.idCard = ''
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
							// this.dibaoForm.basicInfo.idCard = ''
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
				this.isShow1 = true;
				this.isShow2 = true;
				this.isShow3 = true;
				this.isShow4 = true;
				this.isShow5 = true;
				this.isShow6 = true;
				this.isShow7 = true;
				this.isShow8 = true;
				this.isShow9 = true;
				this.isShow10 = true;
				this.isShow11 = true;
				this.isShow12 = true;
				this.isShow13 = true;
				this.isShow14 = true;
				this.isShow15 = true;
				this.isShow16 = true;
				this.isShow17 = true;

				if (n == 1) {
					this.isShow1 = false;
				} else if (n == 2) {
					this.isShow2 = false;
				} else if (n == 3) {
					this.isShow3 = false;
				} else if (n == 4) {
					this.isShow4 = false;
				} else if (n == 5) {
					this.isShow5 = false;
				} else if (n == 6) {
					this.isShow6 = false;
				} else if (n == 7) {
					this.isShow7 = false;
				}else if (n == 8) {
					this.isShow8 = false;
				}else if (n == 9) {
					this.isShow9 = false;
				}else if (n == 10) {
					this.isShow10 = false;
				}else if (n == 11) {
					this.isShow11 = false;
				}else if (n == 12) {
					this.isShow12 = false;
				}else if (n == 13) {
					this.isShow13 = false;
				}else if (n == 14) {
					this.isShow14 = false;
				}else if (n == 15) {
					this.isShow15 = false;
				}else if (n == 16) {
					this.isShow16 = false;
				}else if (n == 17) {
					this.isShow17 = false;
				}
			},
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			}, 

			getImgIndex(item){
				let data = JSON.parse(item);
				this.imgIndex[data.id] = data.index;
			},
			// 获取图片数量
			getImgNum(){
				for(let key in this.uploadImg){
					if(this.uploadImg[key][0]==''){
						this.uploadImg[key].length=0
						this.imgNum[key]=this.uploadImg[key].length
					}else{
						this.imgNum[key]=this.uploadImg[key].length
					}
				}
				console.log("图片数量",this.imgNum);
			},

			// 上传材料
			uploads(id,dataName) {
				this.dialogVisible3 = true;
				this.uploadId = id;

				//r是处理好的数组
				if(this[dataName][id] == null) this[dataName][id] = "";
				var r = this[dataName][id].split(",").filter(function (s) {
					return s && s.trim();
				});
				this[dataName][id]=r.toString();
				this.uploadId = id;
				this.uploadDataName = dataName;
				// console.log(this.uploadId);

				try {
					this.$refs.myUpload.clears();
				} catch (e) {}

				console.log(this.imgNum,'图片数量');
			},
			// 上传事件
			uploadEvent(data) {
				let val = this.dibaoForm[this.uploadId];
				val = val == "" ? data : val + "," + data;
				this.dibaoForm[this.uploadId] = val;
				this.uploadImg[this.uploadId + "_img"] = val.split(",");
			},
			uploadEvent2(){
				this.uploadImg[this.uploadId + "_img"] = this[this.uploadDataName][this.uploadId].split(",");
				this.uploadDataName = null;
				this.getImgNum()   // 获取图片数量
			},
			
			// 删除事件
			handleRemove(file, str) {
				this.$confirm('是否删除该图片？',"提示" , {
				confirmButtonText: '确定',
				cancelButtonText: '取消'
				}).then(() => {
					this.$delete(this.uploadImg[str+"_img"],this.imgIndex[str]);
					this.dibaoForm[str]=this.uploadImg[str+"_img"].join(",");
					this.getImgNum()  //获取图片数量

					// console.log(this.imgNum,'imgNum：各类图片的数量-删除后');
				
				}).catch(action => {
					console.log("留在本页");
				});
			},

			save() {
				
				this.dibaoForm.basicInfo.typeOfJuvenileDelinquent = this.typeOfJuvenileDelinquent.join(',');
				this.dibaoForm.basicInfo.typeOfEncounteringEmergencies = this.typeOfEncounteringEmergencies.join(',');
                
				this.dibaoForm.abc_ex22 = this.abc_ex22.join(',');
                if (this.education.length == 2) {
                    this.dibaoForm.basicInfo.educationStage = this.education[0]
                    this.dibaoForm.basicInfo.educationType = this.education[1]
                }
                if (this.tutorialClass.length == 2) {
                    this.dibaoForm.basicInfo.tutorialClass = this.tutorialClass[0]
                    this.dibaoForm.basicInfo.typeOfTutorialClass = this.tutorialClass[1]
                } else if (this.tutorialClass.length == 1) {
                    this.dibaoForm.basicInfo.tutorialClass = this.tutorialClass[0]
                }
                
				this.dibaoForm.basicInfo.typeOfInfringed = this.typeOfInfringed.join(',');
                

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
				if(this.dibaoForm.basicInfo.idCard){
					let msg=this.isCardID(this.dibaoForm.basicInfo.idCard);
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
					url: "/social/child/getChildDetailInfo",
					// url: "/social/assistance/getChildrenBasics",
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
	.photo_num{
		color:red;
	}
</style>
