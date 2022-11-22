<template>
<div>
	<common-list :sKey="466" :type="'救助资金发放信息管理'" :tableName="'救助资金发放信息管理'" :search="search"></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"jzffList",
	data(){
		return{
			search:{}
		}
	},
	
	components:{
		commonList
	},
	
	methods:{
		loadData(){
			// console.log(this.$route.query,'this.$route.query');
			// for( var key in this.this.$route.query){
			// 	this.search[key]=this.$route.query[key]
			// }
		},
	},
	created(){
		this.loadData()
	},
}
</script>