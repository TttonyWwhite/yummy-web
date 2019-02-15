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
					<el-button size="mini" @click="gotoDetail">订单详情</el-button>
					<el-button v-if="order.state == '订单已提交'" size="mini" type="primary" @click="acceptOrder">确认接单</el-button>
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
		},
		methods: {
			gotoDetail() {
				//console.log(this.order.orderId)
				this.$router.push({name: 'order', params: {orderId: this.order.orderId}})
			},
			acceptOrder() {
				let param = new URLSearchParams()
				param.append('orderId', this.order.orderId)
				this.axios.post('http://localhost:8080/acceptOrder', param).then(response=> {
					console.log(response)
					this.$emit('orderAccepted', this.order.orderId)
				})
			}
		}
	}
</script>

<style>
	.opertaion_btn {
		margin-top: 13px;
	}
</style>