<template>
    <el-row>
        <el-col :span="20">
            <el-menu :default-active="$route.name" :router="true" class="el-menu-demo" mode="horizontal" background-color="#0d78da" text-color="#ffffff">
              <el-menu-item :route="{name: 'guide'}" index="guide">
                    <template slot="title">
                        <span>首页</span>
                    </template>
              </el-menu-item>
              <el-menu-item :route="{name: 'restaurantSummary'}" index="managerPage">
                    <template slot="title">
                        <span>管理中心</span>
                    </template>
              </el-menu-item>
              <el-menu-item index="3">消息中心</el-menu-item>
            </el-menu>
        </el-col>

        <el-col :span="4">
            <el-menu :default-active="this.$router.path" router class="el-menu-demo" mode="horizontal" background-color="#0d78da" text-color="#ffffff">
                <el-submenu index="1">
                    <template slot="title"> {{ name }} </template>
                    <el-menu-item  :index="targetIndex">管理中心</el-menu-item>
                    
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
                return '/managerPage/RestaurantSummary'
            }
        }
    }
</script>