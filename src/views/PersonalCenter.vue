<template>
    <div style="margin-left: 20px;height: 100%;width: 100%">
        <div style="height: 160px;width: 100%;background-color: white">
            <div style="height:100%;">
                <el-row style="height: 100%">
                    <el-col :span="6" style="height: 100%">
                        <div style="display: flex;justify-content: center;align-items: center;height: 100%">
                            欢迎，<span style="color: dodgerblue">{{memberName}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div style="display: flex;flex-direction: column;align-items: center;margin-top: 40px;border-left: 2px gainsboro solid">
                            <h3>会员等级</h3>
                            <div style="margin-top: 20px;display: flex;justify-content: center;align-items: baseline">
                                <span style="font-size:32px;font-weight: bold;color: dodgerblue">{{level}}</span><span style="color: dodgerblue">级</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div style="display: flex;flex-direction: column;align-items: center;margin-top: 40px;border-left: 2px gainsboro solid">
                            <h3>我的优惠</h3>
                            <div style="margin-top: 20px;display: flex;justify-content: center;align-items: baseline">
                                <span v-if="level === 1" style="font-size:25px;font-weight: bold;color: crimson">无优惠</span>
                                <span v-else-if="level === 2" style="font-size:32px;font-weight: bold;color: crimson">95</span>
                                <span v-else-if="level === 3" style="font-size:32px;font-weight: bold;color: crimson">9</span>
                                <span v-else style="font-size:32px;font-weight: bold;color: crimson">85</span>
                                <span v-if="level !== 1" style="color: crimson">折</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" style="height: 100%">
                        <div style="display: flex;flex-direction: column;align-items: center;margin-top: 40px;border-left: 2px gainsboro solid;">
                            <h3>账户余额</h3>
                            <div style="display: flex;justify-content: center;align-items: flex-end">
                                <div style="margin-top: 20px;display: flex;justify-content: center;align-items: baseline">
                                    <span style="font-size: 32px;font-weight: bold;color: coral">{{this.balance}}</span><span style="color: coral">元</span>
                                </div>
                                <el-button type="primary" style="margin-bottom: 5px;margin-left: 5px" size="mini" @click="charge">充值</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div style="margin-top: 20px;background-color: white;height: 442px">
            <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: flex-start;margin-left: 20px;margin-right: 20px">
                <el-breadcrumb style="margin-top: 10px">
                    <el-breadcrumb-item style="font-size: 16px;"><h4>最近订单</h4></el-breadcrumb-item>
                </el-breadcrumb>
                <router-link to="order" style="text-decoration: none;margin-top: 10px;height: 16px">
                    <a href="javascript:;" style="font-size: 16px;color: dodgerblue;text-decoration: none">查看更多订单</a>
                </router-link>
            </div>
            <div style="margin-left: 20px;margin-right: 20px;border-top: 3px gainsboro solid;margin-top: 10px">
                <el-row v-for="(item, index) in order" :key="item.orderId">
                    <OrderBanner :order="item" @orderPayed="onPayed" @orderRefund="onRefund" @orderConfirmed="onConfirm"></OrderBanner>
                </el-row>
                <div v-if="order.length === 0" style="width: 100%;display: flex;justify-content: center;align-items: center;height: 360px">
                    <span style="font-size: 30px">暂无订单数据</span>
                </div>
            </div>
            <!--需要一个表格,用于展示最近订单中的前几条 -->
        </div>
        <el-dialog title="充值中心" width="400px" :visible.sync="dialogVisible">
            <div style="width: 100%">
                <div style="width: 100%;margin-top: -30px">
                    <span>请输入充值金额</span>
                </div>
                <div style="width: 100px">
                    <el-input size="medium" style="width: 360px;margin-top: 20px" v-model="value"></el-input>
                </div>
                <div style="width: 100%;display: flex;justify-content: flex-end">
                    <el-button style="margin-top: 20px" @click="confirmCharge">确认充值</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import OrderBanner from '../components/orderBanner'

    export default {
        name: 'personalCenter',
        components: {
            OrderBanner
        },
        data() {
            return {
                memberName: localStorage.getItem("username"),
                order: [],
                activeName: 'first',
                balance: 0,
                level: null,
                dialogVisible: false,
                value: 0,
                discount: 0
            }
        },
        mounted(){
            let param = new URLSearchParams()
            param.append('memberId', this.$route.params.id)
            this.axios.post('http://localhost:8080/getBalance', param).then(response => {
                this.balance = response.data.data
            })
            this.axios.post('http://localhost:8080/getLevel', param).then(response => {
                this.level = response.data.data
            })
        },
        activated() {
            let param = new URLSearchParams()
            param.append("memberId", this.$route.params.id)
            this.axios.post('http://localhost:8080/getOrders', param).then(response => {
                console.log(response)
                this.order = response.data.data
                this.order.reverse()
            })
        },
        methods: {
            confirmCharge(){
                let param = new URLSearchParams()
                param.append('memberId', this.$route.params.id)
                param.append('chargeAmount', this.value)
                this.axios.post('http://localhost:8080/charge', param).then(response => {
                    this.balance = response.data.data;
                    this.dialogVisible = false;
                    this.$message('充值成功')
                })
            },
            charge(){
                this.value = 0
                this.dialogVisible = true
            },
            onPayed(val) {
                for (let i = 0;i < this.order.length;i++) {
                    if (this.order[i].orderId === val) {
                        this.order[i].state = "订单已提交"
                        this.$refs.child1.handlePay(this.order[i].price)
                    }
                }
            },
            onRefund(val) {
                for (let i = 0;i < this.order.length;i++) {
                    if (this.order[i].orderId === val) {
                        this.order[i].state = "已退款"
                        this.$refs.child1.handleRefund(this.order[i].price)
                    }
                }
            },
            onConfirm(val) {
                for (let i = 0;i < this.order.length;i++) {
                    if (this.order[i].orderId === val) {
                        this.order[i].state = "已送达"
                    }
                }
            }
        }
    }
</script>

<style>
    .icon {
        width: 120px;
        height: 120px;
        margin-left: 10px;
        margin-top: 20px;
    }
    .icon-default {
        border: gainsboro 2px solid;
        border-radius: 5px;
        width: 120px;
        height: 120px;
        margin-left: 10px;
        margin-top: 20px;
        background-size: cover;
        display: inline-block;
        background: url('../assets/images/icon-big.svg');
    }
</style>