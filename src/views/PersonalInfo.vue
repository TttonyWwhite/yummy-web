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
                            :default-active="$route.name"
                            style="width: 100%;border-right: white;height:100%"
                            :router="true"
                            @open="handleOpen"
                            @close="handleClose">
                            <el-menu-item :route="{name: 'personalCenter', params: {id: memberId}}" index="personalCenter">
                                <label class="icon-space"></label>
                                <span slot="title" style="font-size: 18px;font-weight: bold;">&nbsp;&nbsp;个人中心</span>
                            </el-menu-item>
                            <el-menu-item :route="{name: 'allOrder', params: {id: memberId}}" index="allOrder">
                                <label class="icon-order"></label>
                                <span slot="title" style="font-size: 18px;font-weight: bold">&nbsp;&nbsp;我的订单</span>
                            </el-menu-item>
                            <el-menu-item :route="{name: 'settings', params: {id: memberId}}" index="settings">
                                <label class="icon-info"></label>
                                <span style="font-size: 18px;font-weight: bold">&nbsp;&nbsp;我的信息</span>
                            </el-menu-item>
                            <el-menu-item :route="{name: 'address', params: {id: memberId}}" index="address">
                                <label class="icon-place2"></label>
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
			    memberId:localStorage.getItem("ID"),
				username: '',
				form: {
					name: ''
				}
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
    .icon-place2 {
        background: url('../assets/images/place-dark.svg') no-repeat;
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