<template>
	<common-list-kjet :sKey="180" :type="'困境儿童'" :tableName="'申请'"></common-list-kjet>
</template>
<script>

import commonList from '../commonList'
import CommonListKjet from '../commonListKjet.vue'
export default {
	data(){
		return{

		}
	},
	beforeRouteLeave (to, from, next){
		sessionStorage.setItem('activeName',this.$children[0].activeName)
		next();
	},
	components:{
		commonList,
		CommonListKjet
	}
}
</script>