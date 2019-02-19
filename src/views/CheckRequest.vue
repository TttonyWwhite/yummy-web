<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="最近申请" name="first"></el-tab-pane>
		</el-tabs>

		<div class="request_container">
			<div class="intro">
				<el-row>
					<el-col :span="6">
						申请餐厅
					</el-col>

					<el-col :span="6">
						申请时间
					</el-col>

					<el-col :span="2">
						当前状态
					</el-col>

					<el-col :span="8">
						操作
					</el-col>
				</el-row>

				<el-row v-for="(item, index) in requests" :key="item.requestId">
					<UpdateRequest :request="item"></UpdateRequest>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import UpdateRequest from '../components/updateRequest'
	export default {
		components: {
			UpdateRequest
		},
		data() {
			return {
				activeName: 'first',
				requests: []
			}
		},

		methods: {
			
		},

		activated() {
			this.axios.post('http://localhost:8080/getRequests').then(response => {
				console.log(response)

				this.requests = response.data.data
			})
		}
	}
</script>
