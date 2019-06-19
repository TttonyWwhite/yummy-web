<template>
	<el-container style="height: 100%">
		<el-header style="background-color: #1d7eb8">
			<Header :name="username"></Header>
		</el-header>
		<el-main style="height: 100%;background-color: #f7f7f7">
			<el-row style="height: 100%">
				<el-col :span="3">&nbsp;</el-col>
                <el-col :span="3" style="height: 100%">
                    <el-menu
                            default-active="personalCenter"
                            style="width: 100%;border-right: white;height:100%"
                            router="true"
                            @open="handleOpen"
                            @close="handleClose">
                        <el-menu-item index="personalCenter">
                            <label class="icon-space"></label>
                            <span slot="title" style="font-size: 18px;font-weight: bold;">&nbsp;&nbsp;个人中心</span>
                        </el-menu-item>
                        <el-menu-item index="order">
                            <label class="icon-order"></label>
                            <span slot="title" style="font-size: 18px;font-weight: bold">&nbsp;&nbsp;我的订单</span>
                        </el-menu-item>
                        <el-menu-item index="address">
                            <label class="icon-info"></label>
                            <span style="font-size: 18px;font-weight: bold">&nbsp;&nbsp;我的地址</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="15" style="height: 100% ">
                    <!--<keep-alive>-->
                        <router-view/>
                    <!--</keep-alive>-->
                </el-col>
                <el-col :span="3">
                </el-col>
			</el-row>
			<!--<el-aside width="200px">-->
				<!--<el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>-->
					<!--<template v-for="item in items">-->
						<!--<template v-if="item.subs">-->
							<!--<el-submenu :index="item.index" :key="item.orderId">-->
								<!--<template slot="title">-->
									<!--<i :class="item.icon"></i> {{ item.title }}-->
								<!--</template>-->
								<!--<el-menu-item v-for="(subItem, i) in item.subs" :key="i" :index="subItem.index"> {{ subItem.title }} </el-menu-item>-->
							<!--</el-submenu>-->
						<!--</template>-->
						<!--<template v-else>-->
							<!--<el-menu-item :index="item.index" :key="item.orderId">-->
								<!--<i :class="item.icon"></i> {{ item.title }}-->
							<!--</el-menu-item>-->
						<!--</template>-->
					<!--</template>-->
				<!--</el-menu>-->
			<!--</el-aside>-->
		</el-main>
	</el-container>

</template>

<script>
	import Header from '../components/Header'
	export default {
		name: 'personalInfo',
		components: {
			Header,
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
						index: 'personalCenter',
						title: '用户信息'
					},
					{
						icon: 'el-icon-menu',
						index: 'settings',
						title: '账户设定'
					}
				]
			}
		},
		mounted() {
			this.username = localStorage.getItem('username')
			this.form.name = localStorage.getItem('username')
		},
        methods:{
            handleOpen(){

            },
            handleClose(){

            }
        }
	}
</script>

<style>
    .icon-space {
        background: url('../assets/images/personalSpace.svg') no-repeat;
        background-size: cover;
        height: 26px;
        width: 26px;
        vertical-align: middle;
        display: inline-block;
    }
    .icon-order {
        background: url('../assets/images/order.svg') no-repeat;
        background-size: cover;
        height: 26px;
        width: 26px;
        vertical-align: middle;
        display: inline-block;
    }
    .icon-property {
        background: url('../assets/images/money.svg') no-repeat;
        background-size: cover;
        height: 26px;
        width: 26px;
        vertical-align: middle;
        display: inline-block;
    }
    .icon-info {
        background: url('../assets/images/user-info.svg') no-repeat;
        background-size: cover;
        height: 26px;
        width: 26px;
        vertical-align: middle;
        display: inline-block;
        margin-top: -2px;
    }
</style>