<template>
	<div>
		
		<el-row>
			<el-col :span="12">
				<div class="chart">
					<h2>餐厅分布图</h2>
					<ve-map :data="chartData" :settings="chartSettings"></ve-map>
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
		          	{'位置': '常州市', '餐厅数': 123},
		          	{'位置': '宿迁市', '餐厅数': 123},
		          	{'位置': '淮安市', '餐厅数': 123}
		          ]
		        }
		    }
		},


		mounted() {
			this.axios.post('http://localhost:8080/getRestaurantSummary').then(response => {
				console.log(response)
				let data = response.data.data
				this.rows = new Array()
				for (var i = 0;i < data.length;i++) {
					let temp = {'位置': data[i].cityName, '餐厅数': data[i].restaurantNumber}
					this.chartData.rows.push(temp)

				}

				
			})
		}
	}
</script>