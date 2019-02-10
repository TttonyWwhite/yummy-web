<template>
	<div>
		<el-row>
			<el-col :span="2">
				<div class="restaurant_logo">
					<img :src="order.image" width="70" height="70" alt="">
				</div>
			</el-col>

			<el-col :span="9">
				<div class="restaurant_intro">
					<span>{{order.title}}</span>
				</div>
			</el-col>

			<el-col :span="5">
				<span>{{order.time}}</span>
			</el-col>

			<el-col :span="4">
				<span>¥{{order.price}}</span>
			</el-col>

			<el-col :span="4">
				<span>{{order.state}}</span>
				<br>
				<span><a class="order_detail" href="">订单详情</a></span>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'orderBanner',
		props: ['order'],

	}
</script>

<style>
	.restaurant_intro {
		float: left;
		margin-left: 60px;
	}

	.order_detail {
		font-size: 8px;
	}
</style>