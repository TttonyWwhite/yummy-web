<template>
    <el-row>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="14">
            <div style="display: flex; align-items: center;height: 60px">
                <label style="color: white;font-size: xx-large">YUMMY!</label>
                <el-menu :default-active="$route.name" :router="true" class="el-menu-demo" mode="horizontal" background-color="#1d7eb8" text-color="#ffffff">
                    <el-menu-item :route="{name: 'homepage', params: {id: this.$route.params.id}}" index="homepage">
                        <template slot="title">
                            <span>首页</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item :route="{name: 'personalCenter', params: {id: this.$route.params.id}}" index="personalCenter">
                        <template slot="title">
                            <span>我的订单</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-col>
        <el-col :span="4">
            <el-dropdown placement="bottom" v-if="isLogin" style="margin-top: 20px;float: right" @command="handleCommand">
              <span style="color: white;font-size: larger">
                {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                    <router-link :to="{path:'/member/'+ this.$route.params.id +'/personalCenter'}" style="text-decoration: none">
                        <el-dropdown-item style="font-size: small"><label class="icon-user"></label>个人中心</el-dropdown-item>
                    </router-link>
                    <router-link :to="{path:'/member/'+ this.$route.params.id +'/address'}" style="text-decoration: none">
                        <el-dropdown-item style="font-size: small"><label class="icon-place"></label>我的地址</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided style="font-size: small" command="logout"><label class="icon-logout"></label>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <router-link v-else to="/login">
                <el-button  style="border: 0;border-radius: 0;float: right;height: 60px;width: 80px;background-color: #1d7eb8;color: white">登陆</el-button>
            </router-link>
        </el-col>
        <el-col :span="3">
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'Header',
        props: ['name'],
        data() {
            return {
                activeIndex: '1',
                isLogin:true
            }
        },
        computed: {
            targetIndex: function() {
                return '/member/' + localStorage.getItem("ID") + '/personalCenter'
            }
        },
        methods: {
            handleCommand(){

            }
        }
    }
</script>

<style>
    .icon-user {
        background: url('../assets/images/user2.svg') no-repeat;
        background-size: cover;
        height: 18px;
        width: 18px;
        vertical-align: middle;
        display: inline-block;
        margin-left: -3px;
        margin-top: -1px;
    }
    .icon-place {
        background: url('../assets/images/place.svg') no-repeat;
        background-size: cover;
        height: 18px;
        width: 18px;
        vertical-align: middle;
        display: inline-block;
        margin-left: -3px;
        margin-top: -1px;
    }
    .icon-logout {
        background: url('../assets/images/logout.svg') no-repeat;
        background-size: cover;
        height: 18px;
        width: 18px;
        vertical-align: middle;
        display: inline-block;
        margin-left: -3px;
        margin-top: -1px;
    }
</style>