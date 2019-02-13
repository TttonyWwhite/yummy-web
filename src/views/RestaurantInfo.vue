<template>
	<el-container>
			<el-header>
			<Header :name="restaurantName"></Header>
			</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu :default-active="$route.path" class="el-menu-demo" mode="vertical" unique-opened router>
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
			<el-main class="info_main">
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
		name: 'personalInfo',
		components: {
			Header
		},
		data() {
			return {
				username: '',
				restaurantid: '',
				form: {
					name: ''
				},
				restaurantName: '',
				items: [
					{
						icon: 'el-icon-menu',
						index: 'restaurantCenter',
						title: '餐厅信息'
					},
					{
						icon: 'el-icon-menu',
						index: 'releaseFood',
						title: '发布菜品'
					},
					{
						icon: 'el-icon-menu',
						index: 'releaseBargin',
						title: '发布优惠'
					}
				]
			}
		},
		mounted() {
			// this.username = localStorage.getItem('username')
			// this.form.name = localStorage.getItem('username')
			let param = new URLSearchParams()
			param.append("restaurantId", this.$route.params.id)
			this.axios.post('http://localhost:8080/getRestaurant', param).then(response => {
				console.log(response)
				this.restaurantName = response.data.data.shopName
			})
		},
		computed: {
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

	 .info_main {
	 	background-color: #ffffff;
	 }
</style>