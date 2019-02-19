<template>
	<el-container>
			<el-header>
			<Header :name="username"></Header>
			</el-header>
		<el-container>
			<el-aside width="200px">
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
				<keep-alive>
					<router-view/>
				</keep-alive>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	import Header from '../components/Header'
	export default {
		name: 'managerPage',
		components: {
			Header
		},
		data() {
			return {
				username: '经理',
				items: [
					{
						icon: 'el-icon-menu',
						index: 'restaurantSummary',
						title: '餐厅统计'
					},
					{
						icon: 'el-icon-menu',
						index: 'memberSummary',
						title: '会员统计'
					},
					{
						icon: 'el-icon-menu',
						index: 'checkRequest',
						title: '申请批准'
					}
				]
			}
		}
	}
</script>