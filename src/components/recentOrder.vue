<!--用于 personalInfo页面中显示最近订单的组件 -->
<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="最近订单" name="first"></el-tab-pane>
		</el-tabs>
		
		<!--需要一个表格,用于展示最近订单中的前几条 -->
		<el-row v-for="(item, index) in order" :key="item.orderId">
			<OrderBanner :order="item" @orderPayed="onPayed"></OrderBanner>
		</el-row>
	</div>
</template>

<script>
	import OrderBanner from '../components/orderBanner'
	export default {
		name: 'recentOrder',
		components: {
			OrderBanner
		},

		data() {
			return {
				activeName: 'first',
				order: []
			}
		},


		mounted() {
			let param = new URLSearchParams()
			param.append("memberId", this.$route.params.id)
			this.axios.post('http://localhost:8080/getOrders', param).then(response => {
				console.log(response.data.data)
				this.order = response.data.data
				this.order.reverse()
			})	

			if (localStorage.getItem('reloaded')) {
				localStorage.removeItem('reloaded')
			} else {
				localStorage.setItem('reloaded', '1')
				location.reload()
			}
		},

		methods: {
			onPayed(val) {
				for (var i = 0;i < this.order.length;i++) {
					if (this.order[i].orderId == val) {
						this.order[i].state = "订单已提交"
					}
				}
			}
		},

		watch: {
			order: {
				deep: true,
				handler(nv, ov) {
					this.orderInfo = nv
				}
			}
		}

		
		
		
	}
</script>

<style>
	
</style>