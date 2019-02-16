<template>
	<div>
		<el-row>
			<el-col :span="12">
				<div class="memberPosition">
					<h2>用户分布图</h2>
					<ve-map :data="positionData" :settings="chartSettings"></ve-map>
				</div>
			</el-col>

			<el-col :span="12">
				<div class="memberLevel">
					<h2>用户等级</h2>
					<ve-histogram :data="levelData" width="550px"></ve-histogram>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			this.chartSettings = {
		        position: 'province/jiangsu'
		    }

			return {
				positionData: {
					columns: ['位置', '用户数'],
					rows: []
				},
				levelData: {
					columns: ['等级', '用户数'],
					rows: []
				}
			}
		},

		mounted() {
			this.axios.post('http://localhost:8080/getMemberPositionSummary').then(response => {
				//console.log(response)
				let data = response.data.data
				for (var i = 0;i < data.length;i++) {
					let temp = {'位置': data[i].summaryItem, '用户数': data[i].memberNumber}
					this.positionData.rows.push(temp)

				}
			})

			this.axios.post('http://localhost:8080/getMemberLevelSummary').then(response => {
				let data = response.data.data
				console.log(data)
				for (var i = 0;i < data.length;i++) {
					let temp = {'等级': data[i].summaryItem, '用户数': data[i].memberNumber}
					this.levelData.rows.push(temp)

				}
			})
		}
	}
</script>