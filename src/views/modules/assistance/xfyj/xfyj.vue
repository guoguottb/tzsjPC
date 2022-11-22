<template>
	<div>
		<common-list :sKey="788" :type="'消防反馈'" :tableName="'消防反馈'"></common-list>
	</div>
</template>
<script>

import commonList from '../commonList'
export default {
	name:"xfyj",
	data(){
		return{
			
		}
		
	},
	beforeRouteLeave (to, from, next){
        sessionStorage.setItem('activeName',this.$children[0].activeName)
		next();
	},
	components:{
		commonList
	}
}
</script>