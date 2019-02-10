<template>
	<el-container>
			<el-header>
			<Header :name="username"></Header>
			</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu class="el-menu-vertical-demo">
					<el-menu-item index="1">
						<i class="el-icon-menu"></i>
						<span slot="title">个人中心</span>
					</el-menu-item>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">我的订单</span>
					</el-menu-item>
					<el-menu-item index="3">
						<i class="el-icon-menu"></i>
						<span slot="title">我的资产</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main >
				<!--todo 显示最近订单和简单的个人信息，比如账户余额 -->
				<InfoSummary></InfoSummary>
				<RecentOrder></RecentOrder>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	import Header from '../components/Header'
	import InfoSummary from '../components/InfoSummary'
	import RecentOrder from '../components/recentOrder'
	export default {
		name: 'personalInfo',
		components: {
			Header,
			InfoSummary,
			RecentOrder
		},
		data() {
			return {
				username: '',
				form: {
					name: ''
				}
			}
		},
		mounted() {
			this.username = localStorage.getItem('username')
			this.form.name = localStorage.getItem('username')

			
		}
	}
</script>

<style>
	
	 .el-aside {
	    background-color: #D3DCE6;
	    color: #333;
	    text-align: center;
	    line-height: 200px;
	  }

	 .el-main {
	 	background-color: #ffffff;
	 }
</style>