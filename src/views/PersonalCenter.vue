<template>
	<div>
		<InfoSummary ref="child1"></InfoSummary>

		<el-tabs v-model="activeName">
			<el-tab-pane label="最近订单" name="first"></el-tab-pane>
		</el-tabs>

		<!--需要一个表格,用于展示最近订单中的前几条 -->
		<el-row v-for="(item, index) in order" :key="item.orderId">
			<OrderBanner :order="item" @orderPayed="onPayed" @orderRefund="onRefund" @orderConfirmed="onConfirm"></OrderBanner>
		</el-row>
	</div>
</template>


<script>
	import InfoSummary from '../components/InfoSummary'
	import OrderBanner from '../components/orderBanner'

	export default {
		name: 'personalCenter',
		components: {
			InfoSummary,
			OrderBanner
		},
		data() {
			return {
				order: [],
				activeName: 'first'
			}
		},

		activated() {
			let param = new URLSearchParams()
			param.append("memberId", this.$route.params.id)
			this.axios.post('http://localhost:8080/getOrders', param).then(response => {
				this.order = response.data.data
				this.order.reverse()
			})

		},


		methods: {
			onPayed(val) {
				for (let i = 0;i < this.order.length;i++) {
					if (this.order[i].orderId === val) {
						this.order[i].state = "订单已提交"
						this.$refs.child1.handlePay(this.order[i].price)
					}
				}
			},
			onRefund(val) {
				for (let i = 0;i < this.order.length;i++) {
					if (this.order[i].orderId === val) {
						this.order[i].state = "已退款"
						this.$refs.child1.handleRefund(this.order[i].price)
					}
				}
			},
			onConfirm(val) {
				for (let i = 0;i < this.order.length;i++) {
					if (this.order[i].orderId === val) {
						this.order[i].state = "已送达"
					}
				}
			}
		},

		// watch: {
		// 	order: {
		// 		deep: true,
		// 		handler(nv, ov) {
		// 			this.orderInfo = nv
		// 		}
		// 	}
		// }
	}
</script>