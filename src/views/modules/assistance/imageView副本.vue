<template>
	<div class="img-body">
	
		<el-carousel :height="heights" :autoplay="false" trigger='click'  @change="prev">
			<el-carousel-item v-for="(item,index) in imageList" :key="index" >
				<!-- <div>上一张</div> -->
				<el-image :src="item" :preview-src-list="dialogImageArray"  >
					<div slot="error">
						<!-- 图片加载失败不显示
						<i class="el-icon-picture-outline"></i> -->
					</div>
				</el-image>
					 <!-- <i class="el-icon-delete-solid del-icon" ></i> -->
			</el-carousel-item>
		</el-carousel>
		<el-dialog :visible.sync="dialogVisible" append-to-body style='max-height:80VH;overflow:hidden'>
			<el-image :src="dialogImageUrl" :preview-src-list="dialogImageArray" fit="contain"></el-image>
		</el-dialog>
	</div>

</template>
<script>
	import request from '@/utils/request'
	export default {
		name: "imageView",
		props: ["imgList", "height","del"],
		data() {
			return {
				imageList: [],
				heights: "200px",
				dialogVisible: false,
				dialogImageUrl: '',
				dialogImageArray: [],
				imgIndex:0,
				len:0
			}
		},
		created() {
			this.setData();
			if (this.height) {
				this.heights = this.height;
			}
		},
		methods: {
			 prev (i) {
				//  this.imageList
				 console.log('触发prev',i);
				 
				
				this.imgIndex=i;
				console.log('imgIndex',this.imgIndex);
				this.$emit('Imgindex',i)
				this.imgList
				// console.log(this.imgList,'imgList');
				console.log(this.len,this.imgList.length,'prev--len');
				
			},
			deleteIm(i){
				
				this.dialogImageArray.splice(i,1)
				 this.imageList=this.dialogImageArray;
				console.log("del",i);
				this.len=this.imgList.length
				// console.log(this.dialogImageArray);
				// console.log(this.dialogImageArray);
			},
			setData() {
				// this.imageList=[]
				// this.dialogImageArray=[]
				console.log(this.len,this.imgList.length,'setData--len');
				console.log(this.imgList.length);
				this.len=this.imgList.length;
				console.log("this.imgList===================================",this.imgList)

				this.imageList = [];
				//         for(let i=0;i<this.imgList.length;i++){
				//             request({
				// 	method: 'post',
				// 	url: this.imgList[i],
				// 	data: {}
				// }).then(res=>{

				//                 this.imageList.push(res);
				//                 if(this.dialogImageArray.length>0){
				//                     this.dialogImageUrl=this.dialogImageArray[0];
				//                 }
				//             }).catch(res=>{
				// 	console.log(res.response)
				//                 // this.imageList.push(res.response.data);
				// 	this.imageList[i] =res.response.data;
				//                 this.dialogImageArray=this.imageList;
				//                 if(this.dialogImageArray.length>0){
				//                     this.dialogImageUrl=this.dialogImageArray[0];
				//                 }
				// 	// console.log(this.imageList.length)
				// 	// console.log(res.response.data)
				//             })
				//         }
				this.imgList.forEach((value, i)=>{
					let url=this.imgList[i];
					
					if(url){
						url=url.replace("social/weixinMinios","social/minios");
						request({
							method: 'post',
							url: url,
							data: {}
						}).then(res => {
							console.log(res)
							// this.imageList.push(res);
							// this.imageList[i] = res;
							this.$set(this.imageList,i,res)
							this.dialogImageArray = this.imageList;
							if (this.dialogImageArray.length > 0) {
								this.dialogImageUrl = this.dialogImageArray[0];
							}
							// console.log(this.imageList.length)
							// console.log(res)
						}).catch(res => {
							console.log(res.response)
							// this.imageList.push(res.response.data);
							// this.imageList[i] = res.response.data;
							this.$set(this.imageList,i,res.response.data)
							this.dialogImageArray = this.imageList;
							if (this.dialogImageArray.length > 0) {
								this.dialogImageUrl = this.dialogImageArray[0];
							}
							// console.log(this.imageList.length)
							// console.log(res.response.data)
						})
					}
					
				})
			},
			handlePictureCardPreview(item) {
				this.dialogVisible = true;
				this.dialogImageUrl = item;
			}
		},
		watch: {
			immediate: true,
			imgList: {
				handler:function(newVal,oldVal) {
					this.deleteIm(this.imgIndex)
					if(newVal.toString()!=oldVal.toString()){
						console.log(newVal,oldVal,'============================');
						this.setData()
						
					}
				},
				deep: true //深度监听
			},
			
		}
	}
</script>
<style>
/* .img-body{
	border: 1px solid red;

} */
/* .del-icon{
	position: absolute;
	color: rgb(255, 255, 255);
	font-size: 20px;
	width: 30px;
	height: 30px;
	line-height: 30px;
	border-radius: 50%;
	transform: translate(-50%,-50%);
	top: 50%;
	left: 50%;
}
.del-icon:hover{
	display: block;
	z-index: 2001;
	background-color: rgba(180, 180, 180, 0.438);
	cursor: pointer;
} */
/* body{
	border: solid;
} */
</style>
