<template>
	<div>
		<el-row>
			<el-col class="order_time" :span="2">
				<p>{{order.time}}</p>
			</el-col>
			<el-col class="order_content" :span="10">
				<p>{{order.content}}</p>
			</el-col>
			<el-col class="order_price" :span="2">
				<p>{{order.price}}</p>
			</el-col>
			<el-col class="order_state" :span="2">
				<p>{{order.state}}</p>
			</el-col>
			<el-col class="operation" :span="8">
				<div class="opertaion_btn">
					<el-button size="mini">订单详情</el-button>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'restaurantOrder',
		props: ['order'],
		data() {
			return {
				
			}
		}
	}
</script>

<style>
	.opertaion_btn {
		margin-top: 13px;
	}
</style>