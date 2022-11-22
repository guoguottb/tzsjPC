// 超龄预警
<template>
	<div>
        <!-- 超龄预警 -->
		<common-list :sKey="566" :type="'超龄预警'"></common-list>

	</div>
</template>
<script>
	import commonList from "@/views/modules/assistance/commonList.vue"
	export default{
		name:'clyj',
		components:{
			commonList
		},
		data(){
			return{
				
			}
		},
	}
</script>