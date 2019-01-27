<!--用于 personalInfo页面中显示最近订单的组件 -->
<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="最近订单" name="first"></el-tab-pane>
		</el-tabs>

		<!--需要一个表格,用于展示最近订单中的前几条 -->
	</div>
</template>

<script>
	export default {
		name: 'recentOrder',
		data() {
			return {
				activeName: 'first'
			}
		}
	}
</script>

<style>
	
</style>