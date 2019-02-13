<template>
	<div>
		<el-tabs v-model="activeName"> 
				<el-tab-pane label="订单详情" name="first"></el-tab-pane>
		</el-tabs>

		<el-steps :space="200" :active="1" finish-status="success">
		</el-steps>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first'
			}
		}
	}
</script>

