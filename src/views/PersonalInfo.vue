<template>
	<el-container>
			<el-header>
			<Header :name="username"></Header>
			</el-header>
		<el-container>
			<el-aside width="200px">
				<!-- <el-menu class="el-menu-vertical-demo">
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
				</el-menu> -->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>
					<template v-for="item in items">
						<template v-if="item.subs">
							<el-submenu :index="item.index">
								<template slot="title">
									<i :class="item.icon"></i> {{ item.title }}
								</template>
								<el-menu-item v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index"> {{ subItem.title }} </el-menu-item>
							</el-submenu>
						</template>
						<template v-else>
							<el-menu-item :index="item.index">
								<i :class="item.icon"></i> {{ item.title }}
							</el-menu-item>
						</template>
					</template>
				</el-menu>
			</el-aside>
			<el-main >
				<!--todo 显示最近订单和简单的个人信息，比如账户余额 -->
				<!-- <InfoSummary></InfoSummary>
				<RecentOrder :order="this.order"></RecentOrder> -->
				<keep-alive>
					<router-view/>
				</keep-alive>
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
				},
				order: {
					image: '',
					orderId: '',
					price: 0,
					state: '',
					time: '',
					title: ''
				},
				items: [
					{
						icon: 'el-icon-menu',
						index: '/personCenter' + '/' + this.$route.params.id,
						title: '餐厅信息'
					},
					{
						icon: 'el-icon-menu',
						index: '/settings',
						title: '账户设定'
					}
				]
			}
		},
		mounted() {
			this.username = localStorage.getItem('username')
			this.form.name = localStorage.getItem('username')
			//从后台拿数据
			
			
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