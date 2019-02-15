<template>
	<div>
		<el-tabs v-model="activeName"> 
			<el-tab-pane label="最近订单" name="first"></el-tab-pane>
		</el-tabs>

		
		<div class="order_container">
			<div class="intro">
				<el-row>
					<el-col :span="2">
						下单时间
					</el-col>
					<el-col :span="10">
						订单内容
					</el-col>
					<el-col :span="2">
						支付金额
					</el-col>
					<el-col :span="2">
						状态
					</el-col>
					<el-col :span="8">
						操作
					</el-col>
				</el-row>
			</div>
			<!-- <RestaurantOrder></RestaurantOrder> -->
			<el-row v-for="(item, index) in orders" :key="item.orderId">
				<RestaurantOrder :order="item"></RestaurantOrder>
			</el-row>

		</div>
	</div>
</template>

<script>
	import RestaurantOrder from '../components/restaurantOrder'
	export default {
		components: {
			RestaurantOrder
		},
		data() {
			return {
				activeName: 'first',
				orders: {}
			}
		},

		mounted() {
			let param = new URLSearchParams()
			param.append("restaurantId", this.$route.params.id)
			this.axios.post('http://localhost:8080/restaurant/getOrders', param).then(response => {
				console.log(response.data.data)
				this.orders = response.data.data
			})
		}
	}
</script>

<style>
	.order_container {
		margin-left: 50px;
		margin-right: 50px;
	}

	.intro {
		background: #eaeaea;
	}
</style>