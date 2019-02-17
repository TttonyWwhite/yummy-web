<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="一周营业额统计" name="first">
		    	<ve-line :data="businessData"></ve-line>
		    </el-tab-pane>
		    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
		    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
		    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				businessData: {
					columns: ['日期', '营业额'],
					rows: []
				}
			}
		},
		methods: {
			handleClick(tab, event) {
		        console.log(tab, event);
		    }
		},
		created() {
			let param = new URLSearchParams()
			param.append('restaurantId', this.$route.params.id)
			this.axios.post('http://localhost:8080/getBusinessSummary', param).then(response => {
				let data = response.data.data
				data.reverse()
				for (var i = 0;i < data.length;i++) {
					let temp = {'日期': data[i].date, '营业额': data[i].total}
					this.businessData.rows.push(temp)
				}
			})
		}	
	}
</script>