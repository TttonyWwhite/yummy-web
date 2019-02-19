<template>
	<div>
		<el-row>
			<el-col :span="6">
				<p>{{request.shopName}}</p>	
			</el-col>

			<el-col :span="6">
				<p>{{request.requestTime}}</p>
			</el-col>

			<el-col :span="2">
				<p>{{request.state}}</p>
			</el-col>

			<el-col :span="8">
				<div class="btn">
				<el-button size="mini" @click="gotoDetail">查看详情</el-button>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		props: ['request'],
		methods: {
			gotoDetail() {
				this.$router.push({name: 'request', params: {requestId: this.request.requestId}})
			}
		}
	}
</script>

<style>
	.btn {
		margin-top: 10px;
	}
</style>