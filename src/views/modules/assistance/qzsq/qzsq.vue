<template>
<div>
	<common-list :sKey="443" :type="'全部'" :tableName="'群众申请'" ></common-list>
</div>
	
</template>
<script>

import commonList from '../commonList'
export default {
	name:"qzsq",
	data(){
		return{
			// keydown:false	
		}
	
	},
	beforeRouteLeave (to, from, next){
		// 业务模块名称缓存
		sessionStorage.setItem('activeName',this.$children[0].activeName);
		// 搜索内容缓存
		sessionStorage.setItem('searchData',JSON.stringify(this.$children[0].searchData));
		
		next();
	},
	
	components:{
		commonList
	}
}
</script>