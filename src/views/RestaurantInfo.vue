<template>
	<el-container>
			<el-header>
			<Header :name="餐厅名"></Header>
			</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu class="el-menu-vertical-demo">
					<el-menu-item index="1">
						<i class="el-icon-menu"></i>
						<span slot="title">餐厅信息</span>
					</el-menu-item>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">发布菜品</span>
					</el-menu-item>
					<el-menu-item index="3">
						<i class="el-icon-menu"></i>
						<span slot="title">发布优惠</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main >

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
				form: {
					name: ''
				}
			}
		},
		mounted() {
			// this.username = localStorage.getItem('username')
			// this.form.name = localStorage.getItem('username')
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