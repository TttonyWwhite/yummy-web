<template>
	<div>
		
		<el-row>
			<el-col :span="12">
				<div class="chart">
					<h2>餐厅分布图</h2>
					<ve-map :data="chartData" :settings="chartSettings"></ve-map>
				</div>
			</el-col>

			<el-col :span="12">
				<div class="histogramChart">
					<h2>餐厅种类图</h2>
					<ve-histogram :data="histogramData" width="550px"></ve-histogram>
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
		    	chartData: {
		          columns: ['位置', '餐厅数'],
		          rows: [
		          	
		          ]
		        },

		        histogramData: {
		        	columns: ['餐厅类型', '餐厅数'],
		        	rows: [
		        		
		        	]
		        }
		    }
		},


		mounted() {
			this.axios.post('http://localhost:8080/getRestaurantSummary').then(response => {
				//console.log(response)
				let data = response.data.data
				for (var i = 0;i < data.length;i++) {
					let temp = {'位置': data[i].summaryItem, '餐厅数': data[i].restaurantNumber}
					this.chartData.rows.push(temp)

				}
			})

			this.axios.post('http://localhost:8080/getRestaurantClassSummary').then(response => {
				let data = response.data.data
				for (var i = 0;i < data.length;i++) {
					let temp = {'餐厅类型': data[i].summaryItem, '餐厅数': data[i].restaurantNumber}
					this.histogramData.rows.push(temp)
				}


			})
		}
	}
</script>

<style>
	.histogramChart {
	}
</style>