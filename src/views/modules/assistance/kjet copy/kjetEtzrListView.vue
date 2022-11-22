<template>
	<div class="g-box" v-loading="loading">
		<div class='g-box2'>
			<div class="info2">
				<el-form :inline="true" class="demo-form-inline">
					<h3 class="line_blue" id="page1">&emsp;基本信息</h3>
					<div class="lineSt"></div>
					<!-- <div class="top_1"> -->
						<table class="top_2">
							<tr style="height:40px;">
								
								<td style="width:10%;">姓名:</td>
								<td style="width:20%;color:#666">{{basicInf.abcd_ex4}}</td>
								<td style="width:10%;">证件类型:</td>
								<td style="width:20%;color:#666">{{basicInf.abcd_ex5}}</td>
								<td rowspan="4" colspan="2" class="photoBox" >
									<!-- <div class="head_photo">
										 <div v-if="!this.imgUrl" style="margin-top:60px;text-align:center;color:#666">暂无头像</div>
										 <el-image class="head_img" :src="imgUrl" :preview-src-list="[imgUrl]" v-if="this.url"></el-image>
									</div> -->
									<div class="head_box">
										<div class="head_photo">
											<div v-if="!this.imgUrl" class="head_img2" >
												<p style="margin-top:60px;text-align:center;color:#666">暂无头像</p> 
											</div>
											<el-image class="head_img" :src="imgUrl" :preview-src-list="[imgUrl]" v-if="this.url"></el-image>
										</div>
										<!-- <el-button type="success" size="small" class="head_btn">上传照片</el-button> -->
									</div>
								</td>
							</tr>

							<!-- <tr style="height:40px;">

							</tr> -->
							<tr style="height:40px;">
								<td style="width:10%;">证件号码:</td>
								<td style="width:20%;color:#666">{{basicInf.abcd_ex6}}</td>
								<td style="width:10%;">民族:</td>
								<td style="width:20%;color:#666">{{basicInf.abcd_ex7}}</td>
							</tr>

							<!-- <tr style="height:40px;">
								
								
							</tr> -->
							<tr style="height:40px;">
								<td>性别:</td>
								<td style="color:#666">{{basicInf.abcd_ex8}}</td>
								<td>出生日期:</td>
								<td style="color:#666">{{basicInf.abcd_ex9}}</td>
							</tr>
							<tr style="height:40px;">
								<td>特长:</td>
								<td style="color:#666">{{basicInf.abcd_ex10}}</td>
								<td>政治面貌:</td>
								<td style="color:#666">{{basicInf.abcd_ex11}}</td>
								
							</tr>
							<tr style="height:40px;">
								<td style="width:10%;">文化程度:</td>
								<td style="color:#666">{{basicInf.abcd_ex12}}</td>
									<td>专业:</td>
								<td style="color:#666">{{basicInf.abcd_ex13}}</td>
								<td>工作单位:</td>
								<td style="color:#666">{{basicInf.abcd_ex13}}</td>
							</tr>
							<tr style="height:40px;">
							
								<td>职务:</td>
								<td style="color:#666">{{basicInf.abcd_ex13}}</td>
								<td >健康状况:</td>
								<td style="color:#666">{{basicInf.abcd_ex14}}</td>
								<td>婚姻状况:</td>
								<td style="color:#666">{{basicInf.abcd_ex15}}</td>
							</tr>
							
							<tr style="height:40px;">
								
								<td>邮箱:</td>
								<td style="color:#666">{{basicInf.abcd_ex16}}</td>
								<td>取得证书:</td>
								<td style="color:#666">{{basicInf.abcd_ex17}}</td>
								<td>手机号码:</td>
								<td style="color:#666">{{basicInf.abcd_ex18}}</td>
							</tr>
							<!-- <tr style="height:40px;">

							</tr> -->

							<tr style="height:40px;">
								
								<td>座机号:</td>
								<td style="color:#666">{{basicInf.abcd_ex19}}</td>
								<td>是否政府购买服务:</td>
								<td style="color:#666">{{basicInf.abcd_ex21}}</td>
								<td>是否专兼职:</td>
								<td style="color:#666">{{basicInf.abcd_ex20}}</td>
							</tr>
							<tr style="height:40px;">
								<td>津贴:</td>
								<td style="color:#666">{{basicInf.abcd_ex22}}</td>
								<td>开始从事儿童工作:</td>
								<td style="color:#666">{{basicInf.abcd_dat3}}</td>
								<td v-if="basicInf.abcd_ex28=='儿童主任'">其他职务:</td>
								<td v-if="basicInf.abcd_ex28=='儿童主任'" style="color:#666">{{basicInf.abcd_ex13}}</td>
							</tr>
							<!-- <tr style="height:40px;">
								
							
							</tr> -->
							<tr style="height:40px;">
								<td >行政区划:</td>
								<td colspan="2" style="color:#666">{{basicInf.abcd_ex34 ? basicInf.abcd_ex34.split(',')[0].split('#')[0] + basicInf.abcd_ex34.split(',')[1].split('#')[0] + basicInf.abcd_ex34.split(',')[2].split('#')[0] : ''}}</td>
								
							</tr>
							<tr style="height:40px;">
								<td>从业状况:</td>
								<td colspan="3" style="color:#666">{{basicInf.abcd_ex13}}</td>
							</tr>
							<tr style="height:40px;">
								<td>职责补充:</td>
								<td colspan="3" style="color:#666">{{basicInf.abcd_ex24}}</td>
							</tr>
							<tr style="height:40px;">
								<td>工作及培训经历:</td>
								<td colspan="3" style="color:#666">{{basicInf.abcd_ex26}}</td>
							</tr>
						</table>
					<!-- </div> -->
					
					<h3 class="line_blue" id="page2" style='margin-top:25px'>&emsp;电子附件</h3>
					<div class="lineSt"></div>
					<div class="top_1">
						<!-- <div class="top_4"> -->
							<el-row :gutter="20">
								<el-col :span="12">
									<el-card class="box-card">
										<div slot="header" class="clearfix">
											<!-- <span>儿童主任身份证明材料(<span style='color:red'>{{basicInf.abcd_ex27.split(',')[0]=="" ? 0 : basicInf.abcd_ex27.split(',').length}}</span>)</span> -->
											<span>儿童主任身份证明材料(<span style='color:red'>{{imgNum.abcd_ex27_img}}</span>)</span>
										</div>
										<!-- <image-view :imgList="this.basicInf.abcd_ex27.split(',')" height="150px" width="150px"></image-view> -->
										<image-view :imgList="this.imgArr.abcd_ex27_img" height="150px" width="150px"></image-view>
									</el-card>
								</el-col>
								<!-- <el-col :span="12">
									<el-card class="box-card">
										<div slot="header" class="clearfix">
											<span>儿童主任头像(<span style='color:red'>{{imgNum.abcd_ex27_img}}</span>)</span>
										</div>
										<image-view :imgList="this.imgArr.abcd_ex27_img" height="150px" width="150px"></image-view>
									</el-card>
								</el-col> -->
							</el-row>
							<el-row>
								
							</el-row>
						<!-- </div> -->
					</div>
					<!-- 不能删除 -->
					<div id="recordt"></div>
				</el-form>
			</div>
			<div class="ainfo2">
				<div style="margin-left:20px;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;">
					<!-- <el-button type="primary" size="small" @click="save">保存</el-button> -->
					<el-button size="small" @click="closeView">返回</el-button>
				</div>
				<div style="margin-left:20px;margin-top:20px;">
					<ul>
						<li :class="{listStyle:isShow1}" @click="isShow(1)">
							<a class="ainfoFont" :class="{listStyleA:!isShow1}" @click="counter('#page1')">基本信息</a><br>
						</li>
						<li :class="{listStyle:isShow2}" @click="isShow(2)">
							<a class="ainfoFont" :class="{listStyleA:!isShow2}" @click="counter('#page2')">电子附件</a><br>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import request from '@/utils/request'
	import imageView from '@/views/modules/assistance/imageView.vue'
	// import upload from '@/views/upload'
	// import  baseURL from '@/utils/baseUrl'
	export default {
		name: "KjetEtzrListView",
		components:{
			imageView,
			// upload
		},
		data() {
			return {
				// dialogVisible3:false,
				// uploadId: '',
				loading: false,
				isShow1: false,
				isShow2: true,
				basicInf: {},
				sId: "",
				cId: "",
				type: "",
				imgArr:{
					abcd_ex27_img:[],
				},
				imgNum:{},
				imgIndex: {    //图片索引
					abcd_ex27:0,
				},
				url:'',
				imgUrl:'',//头像图片
			}
		},
		created() {
			this.loadData();
		},
		mounted() {
			// 滚动鼠标右侧导航栏跟随滚动位置改变而改变显示
			// window.removeEventListener('scroll',this.scroll,false)
			window.addEventListener('scroll',this.scroll,true)
		},
		methods: {
			closeView() {
				this.$emit("closes", false)
				this.$router.go(-1)
			},
			scroll(){
				// scrollHeight（文档内容实际高度，包括超出视窗的溢出部分）
				// scrollTop（滚动条滚动距离）
				// clientHeight（窗口可视范围高度）
				// var scrollTop =document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
				if(document.querySelector('.info2') == null || document.querySelector('#recordt') == null){
					return ''
				}
				let scrollTop = document.querySelector('.info2').scrollTop
				let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				let oDiv1 = document.querySelector('#page1');
				let oDiv2 = document.querySelector('#page2');
				
				// 顺序跟上面显示顺序要相反
				let clientHeight = document.querySelector('.info2').clientHeight
				let recordtClientHeight = document.querySelector('#recordt').scrollHeight
				// 在新增dialog打开时不执行后面的程序
				if(!oDiv1 || !oDiv2 ){
					return ''
				}
				// 滚动到底部 可视范围大于最后的recordt范围(recordt不足占一页) 并且 滚动距离大于 odiv8-odiv1-clientheight(从odiv1滚动到odiv8的距离)加上recordt的范围(滚动到最底部) 
				if(recordtClientHeight + oDiv2.clientHeight < clientHeight && scrollTop > (oDiv2.offsetTop-oDiv1.offsetTop-clientHeight+recordtClientHeight+oDiv2.clientHeight)){
					// console.log('触发了2-1')
					this.isShow(2)
				}else if(scrollTop > (oDiv2.offsetTop - oDiv1.offsetTop)){
					// console.log('触发了2-2')
					this.isShow(2)
				}else if(scrollTop > (oDiv1.offsetTop - oDiv1.offsetTop)){
					// console.log('触发了1')
					this.isShow(1)
				}
			},
			counter(id) {
				document.querySelector(id).scrollIntoView(true);
			},
			async loadData() {
				this.sId = this.$route.query.sId;
				this.cId = this.$route.query.cId;
				this.type = this.$route.query.type;

				this.getData({
					sId: this.sId,
				}).then(res => {
					// this.basicInf = res[0]
					// console.log(res[0])
				}).catch(res => {
					// this.$emit("closes", false)
					// console.log(res)
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------')
						this.$message.error('数据获取失败或请求超时')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					this.basicInf = res.response.data[0];
					this.imgArr.abcd_ex27_img = this.basicInf.abcd_ex27.split(",")
					this.url = this.basicInf.abcd_ex27;
					this.url = this.url.replace("social/weixinMinios","social/minios");
					
					for(let key in this.imgArr){
						if(this.imgArr[key][0]==''){
							this.imgArr[key].length=0
							this.imgNum[key]=this.imgArr[key].length
						}else{
							this.imgNum[key]=this.imgArr[key].length
						}
					}
					if(this.basicInf.abcd_ex26){
						this.basicInf.abcd_ex26 = this.basicInf.abcd_ex26.replace('<br>','\n');
						// this.basicInf.abcd_ex26 = this.basicInf.abcd_ex26.replace('\n','\n');
					}
					console.log('头像照片',this.url);
					this.getImgNum();
					this.loadImg();

				})

			},

			// 加载图片 将图片路径作为参数发送给后端
			async loadImg(){
				if(this.url){
					this.url = this.url.replace("social/weixinMinios","social/minios");
					await request({
						method: 'post',
						url: this.url,
						data: {}
					}).then(res => {
						// this.imageList.push(res)
						// if(this.imageList.length>=this.len){
							// this.isOk=true;
						// }
					}). catch ( res =>  {
						// console.log(res.response.data,'照片数据');
						// this.imageList.push(res.response.data)
						// if(this.imageList.length >= this.len){
						// 	this.isOk = true;
						// }
						
						// if(this.imageList.length > this.imgList.length){
							// console.log('重复执行');
							// this.first = 100;
							// this.setData();
						// }
						console.log(res.response,'照片1')
						this.imgUrl = res.response.data;
					})
				}
			},


			// 获取图片数量
			getImgNum(){
				for(let key in this.imgArr){
					if(this.imgArr[key][0]==''){
						this.imgArr[key].length=0
						this.imgNum[key]=this.imgArr[key].length
					}else{
						this.imgNum[key]=this.imgArr[key].length
						console.log("图片数量",this.imgArr[key].length);
					}
				}
				console.log(this.imgArr,"this.imgArr");
				console.log(this.imgNum,"this.imgNum");
			},

			getData(sid) {
				return request({
					headers: {
						'Accept': 'application/json',
					},
					url: '/social/assistance/getDirector',
					method: 'post',
					// data:{
					// sId:"57943",
					// },
					data: sid
				})
			},
			isShow(n) {
				this.isShow1 = true
				this.isShow2 = true
				if (n == 1) {
					this.isShow1 = false
				} else if (n == 2) {
					this.isShow2 = false
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
	.lineSt {
		background-color: #dcdfe6;
		height: 1px;
		width: 100%;
		margin-bottom: 10px;
	}

	.top_2 {
		width: 100%;
	}

	.top_1 {
		margin-bottom: 50px;
	}

	.imgSt {
		width: 140px;
		margin-top: -4%;
		z-index: 10000;
		transform: rotate(30deg);
		-ms-transform: rotate(30deg);
		/* IE 9 */
	}

	.line_blue {
		border-left: 2px solid #3385FF;
	}

	.family {
		width: 90%;
		margin-top: 20px;
		margin-left: 5%;
		margin-bottom: 50px;
	}

	.top_3 {
		width: 50%;
		float: left;
	}

	.top_4 {
		height: 200px;
		margin-top: 40px;
		margin-bottom: -30px;
	}

	.demo-image__preview {
		height: 200px;
		width: 200px;
		float: left;
		margin-left: 5%;
		overflow: hidden;
		margin-top:15px;
	}

	.info2 {
		flex: 1;
		padding-right: 10px;
		box-sizing: border-box;
		border-right: 1px solid #ddd;
		overflow: auto
	}

	.ainfo2 {
		width: 240px;
		font-size: 14px;
		line-height: 20px;
		text-align: left;
		padding-left: 10px;
		box-sizing: border-box;
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


	.btn button {
		padding: 2px 6px;
		background: #ffffff;
		border: 1px solid #606266;
	}

	.btn :nth-child(1) {
		margin-right: 5px;
		background: blue;
		color: #ffffff;
		border: 1px solid blue;

	}
	.photoBox{
		/* width:5%;
		height:50%; */
		/* background-color:#aaa; */
	}
	/* .head_photo{
		width: 120px;
		height: 140px;
		transform: translateX(50px);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 3px 3px 5px rgba(153, 153, 153, 0.438);
	}
	.head_img{
		width: 120px;
		height:140px;
		padding:5px;
		border-radius:30px;
		display: block;
	} */
	.head_box{
		 width:80%;
		 height: 100%;
		 display:flex;
		 flex-direction: column;
		 border-radius: 5px;
		 float: right;
		 margin-left:10px ;
		 box-sizing: border-box;
		 overflow: hidden;
		 /* padding: 5px 10px; */
		 /* border:1px dashed #333; */
	}
	.head_photo{
		margin:0 auto;
		width: 100%;
		height: 220px;
		border-radius: 10px;
		overflow: hidden;
		/* box-shadow: 3px 3px 5px rgba(211, 211, 211, 0.438); */
		float: right;
		/* border: 1px solid #eee; */
		/* background-color: rgb(245, 245, 245); */
	}
	.head_img2{
		width: 120px;
		height:140px;
		border: 1px solid #eee;
		border-radius:10px;
		margin: 10px auto;
		box-sizing: border-box;
		background-color: #ececec;
	}
	.head_img{
		width: 160px;
		height:200px;
		border: 1px solid #eee;
		/* padding:5px; */
		border-radius:10px;
		display: block;
		margin: 10px auto;
		box-sizing: border-box;
	}
</style>
