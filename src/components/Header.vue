<template>
    <el-row>
        <el-col :span="20">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#0d78da" text-color="#ffffff">
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="2">我的订单</el-menu-item>
              <el-menu-item index="3" disabled>消息中心</el-menu-item>
            </el-menu>
        </el-col>

        <el-col :span="4">
            <el-menu :default-active="this.$router.path" router class="el-menu-demo" mode="horizontal" background-color="#0d78da" text-color="#ffffff">
                <el-submenu index="1">
                    <template slot="title"> {{ name }} </template>
                    <el-menu-item  :index="targetIndex">个人中心</el-menu-item>
                    
                </el-submenu>
            </el-menu>
            
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'Header',
        props: ['name'],
        data() {
            return {
                activeIndex: '1'
            }
        },
        computed: {
            targetIndex: function() {
                return '/personalCenter/' + localStorage.getItem("ID")
            }
        }
    }
</script>