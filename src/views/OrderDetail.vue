<template>
	<div>
		<el-tabs v-model="activeName"> 
				<el-tab-pane label="订单详情" name="first"></el-tab-pane>
		</el-tabs>
		<div class="step_bar">
			<el-steps :active="active" simple>
			  <el-step title="订单已提交" icon="el-icon-upload"></el-step>
			  <el-step title="商家已接单" icon="el-icon-edit"></el-step>
			  <el-step title="已送达" icon="el-icon-success"></el-step>
			</el-steps>
		</div>

		<div class="order_info">
			<el-row>
				<el-col :span="1">
					<img :src="imgUrl" width="70" height="70">
				</el-col>
				<el-col :span="4">
					<span>{{shopName}} <br><br> 订单号: {{orderId}}</span>
				</el-col>

			</el-row>
			<hr color="#eaeaea"/>
			<el-row>
				<el-col :span="12">
					<div class="orderDetail_title">
						<el-table 
							:data="content"
							style="width: 100%">
							<el-table-column
								prop="title"
								label="菜品"
								width="250">
							</el-table-column>
							<el-table-column
								prop="qty"
								label="数量"
								width="105">
							</el-table-column>
							<el-table-column
								prop="count"
								label="小计"
								width="150">
							</el-table-column>
						</el-table>

						<div class="freight_row">
							<el-row>
								<el-col :span="15">
									配送费
								</el-col>
								<el-col :span="2">
									{{freight}}
								</el-col>
							</el-row>
						</div>

						<div class="summary">
							<el-row>
								<el-col :span="12">
									&nbsp;
								</el-col>
								<el-col :span="6">
									<div><b>实际支付:&nbsp;&nbsp;<span class="total_number">{{total}}</span></b></div>
								</el-col>
								
							</el-row>
						</div>

					</div>
				</el-col>
				<el-col :span="10">
					<div class="delivery_info">
						<strong>配送信息</strong>
						<hr style="border:1px dashed #eaeaea"/>
						<p>联系人: {{contactName}}</p>
						<p>联系电话: {{phoneNumber}}</p>
						<p>收货地址: {{address}}</p>
						<hr style="border:1px dashed #eaeaea"/>
						<p>备注: 无备注</p>
					</div>

				</el-col>
			</el-row>
			<el-row v-if="this.active != 3">
				<div class="confirm_btn">
					<el-button type="primary" @click="confirm">确认收货</el-button>
				</div>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				active: 0,
				active: 0,
				imgUrl: 'http://plu6c3si4.bkt.clouddn.com/%E6%8B%9B%E7%89%8C1.jpg',
				shopName: '',
				contactName: '',
				phoneNumber: '',
				address: '',
				freight: 0,
				orderId: this.$route.params.orderId,
				content: [
					
				],
				total: 0
			}
		},

		methods: {
			next() {
				if (this.active++ > 2) this.active = 0;
			},
			confirm() {
				let param = new URLSearchParams()
				param.append('orderId', this.$route.params.orderId)
				this.axios.post('http://localhost:8080/confirm', param).then(response => {
					this.active = 3
				})
			}
		},

		mounted() {
			let param = new URLSearchParams()
			param.append('orderId', this.$route.params.orderId)
			this.axios.post('http://localhost:8080/getOrderDetail', param).then(response => {
				console.log(response)
				let products = response.data.data.products
				let data = response.data.data
				var total_price = 0
				for (var i = 0;i < products.length;i++) {
					let item = {title: products[i].title, qty: products[i].qty, count: products[i].qty * products[i].price, foodId: products[i].id}
					this.content.push(item)
					total_price += products[i].qty * products[i].price
				}

				total_price *= data.discount

				this.shopName = data.shopName
				this.contactName = data.contactName
				this.phoneNumber = data.phoneNumber
				this.address = data.address
				this.freight = data.freight
				total_price += data.freight
				this.total = total_price.toFixed(2)

				if (data.state == "NotPaid") {
					this.active = 0
				} else if (data.state == "Paid") {
					this.active = 1
				} else if (data.state == "Received") {
					this.active = 2
				} else {
					this.active = 3
				}
			})
		}
	}
</script>

<style>
	@import url("//unpkg.com/element-ui@2.5.4/lib/theme-chalk/index.css");

	.order_info {
		margin-top: 50px;
		
		
	}

	.orderDetail_title {
		text-align: left;
		
	}

	.orderDetail_content {
		text-align: left;
		margin-left: 30px;
	}

	.delivery_info {
		background: #ffffff;
		text-align: left;
	}

	.freight_row {
		margin-left: 15px;
		margin-top: 10px;
	}

	.bigRed {
		color: red;
		font-size: 20px;
	}

	.summary {
		margin-top: 40px;
	}

	b {
		position: relative;
		font-size: 15px;
	}

	.total_number { 
		position:absolute; 
		font-size:30px; 
		top:-14px;  
		color: red;
	}

	.confirm_btn {
		float: right;
		margin-right: 60px;
		margin-top: 20px;
	}
</style>