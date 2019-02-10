<!--用于 personalInfo页面中显示最近订单的组件 -->
<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="最近订单" name="first"></el-tab-pane>
		</el-tabs>
		
		<!--需要一个表格,用于展示最近订单中的前几条 -->
		<el-row v-for="(item, index) in orderInfo" :key="item.orderId">
			<OrderBanner :order="item"></OrderBanner>
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
		props: ['order'],

		data() {
			return {
				activeName: 'first',
				orderInfo: null
			}
		},

		mounted() {
			this.orderInfo = this.order
			
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