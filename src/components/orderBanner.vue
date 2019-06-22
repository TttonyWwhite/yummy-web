<template>
    <div style="height: 120px;display: flex;flex-direction: row;justify-content: space-between;border-top: gainsboro 1px solid">
        <div style="display: flex;width: 60%">
            <div style="height: 100%;width: 85px;display: flex;justify-content: left;align-items: center">
                <img :src="order.image" width="70" height="70">
            </div>
            <div style="height: 100%;;display: flex;flex-direction: column">
                <h4 style="margin-top: 25px ">{{order.title}}</h4>
                <span style="margin-top: 30px">{{order.time}}</span>
            </div>
        </div>
        <div style="height: 100%;width: 40%;display: flex;justify-content: space-between">
            <div style="height: 100%;display: flex;justify-content: center;align-items: center">
                <span style="font-size: 22px">¥{{order.price.toFixed(2)}}</span>
            </div>
            <div style="height: 100%;display: flex;justify-content: center;align-items: center">
                <span style="font-size: 20px">{{order.state}}</span>
            </div>
            <div style="height: 100%;display: flex;justify-content: center;align-items: center">
                <el-button size="mini" type="primary" @click="gotoDetail">详情</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'orderBanner',
        props: ['order'],
        data() {
            return {
            }
        },
        methods: {
            gotoDetail() {
                this.$router.push({name: 'orderDetail', params: {orderId: this.order.orderId}})
            }
        }

    }
</script>

<style>
</style>