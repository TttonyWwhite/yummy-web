<!--用于 personalInfo页面中显示最近订单的组件 -->
<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="最近订单" name="first"></el-tab-pane>
		</el-tabs>
		
		<!--需要一个表格,用于展示最近订单中的前几条 -->
		<OrderBanner :order="this.order"></OrderBanner>
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
				order: {
					image: 'http://plu6c3si4.bkt.clouddn.com/%E6%8B%9B%E7%89%8C1.jpg',
					title: '王婆油炸',
					time: '2019-02-05 15:40',
					price: '18.5',

				}
			}
		},
		
	}
</script>

<style>
	
</style>