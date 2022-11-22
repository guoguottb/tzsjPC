<template>
	<common-list :sKey="136" :type="'临时救助'" :tableName="'申请'"></common-list>
</template>
<script>

import commonList from '../commonList'
export default {
	components:{commonList},
	data(){
		return{

		}
	},
	beforeRouteLeave (to, from, next){

		sessionStorage.setItem('activeName',this.$children[0].activeName)
		// console.log(this.$children[0].activeName);
		// sessionStorage.setItem('searchData',JSON.stringify(this.$children[0].searchData))
		next();
	},

	
}
</script>