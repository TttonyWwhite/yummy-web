<template>
  <div style="margin-left: 20px;background-color: white;min-height: 100%">
    <div style="margin-left: 20px;margin-right: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{name:'allOrder'}" style="font-size: 16px;margin-top: 10px">我的订单</el-breadcrumb-item>
        <el-breadcrumb-item style="font-size: 16px;margin-top: 10px">订单详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="width:100%;margin-top: 10px;border-top: 2px solid #8a8a8a">
        <div class="step">
          <el-steps v-show="orderStatus === 1" :active="active" finish-status="success" space="100px" simple>
            <el-step title="订单已提交"></el-step>
            <el-step title="已付款"></el-step>
            <el-step title="商家已接单"></el-step>
            <el-step title="已送达"></el-step>
          </el-steps>
          <el-steps v-show="orderStatus === 2" :active="2" simple>
            <el-step title="订单已提交"></el-step>
            <el-step title="订单已取消"></el-step>
          </el-steps>
          <el-steps v-show="orderStatus ===3" :active="3" simple>
            <el-step title="订单已提交"></el-step>
            <el-step title="商家已接单"></el-step>
            <el-step title="订单已取消"></el-step>
          </el-steps>
        </div>
        <div style="margin-top: 30px;width: 100%;height: 100px;background: gainsboro;display: flex">
          <div v-show="orderStatus === 1&&active === 1" style="width: 30%;display: flex;flex-direction: column;justify-content: center;align-items: center">
            <p>订单未付款</p>
            <p style="margin-top: 10px">请于{{deadline}}前完成付款</p>
          </div>
          <div v-show="orderStatus === 1&&active === 2" style="width: 30%;display: flex;flex-direction: column;justify-content: center;align-items: center">
            <p>订单已支付完成</p>
            <p style="margin-top: 10px">等待商家接单中</p>
          </div>
          <div v-show="orderStatus === 1&&active === 3" style="width: 30%;display: flex;flex-direction: column;justify-content: center;align-items: center">
            <p>商家已接单</p>
            <p style="margin-top: 10px">商品正在配送中</p>
          </div>
          <div v-show="orderStatus === 1&&active === 4" style="width: 30%;display: flex;flex-direction: column;justify-content: center;align-items: center">
            <p>订单已完成</p>
          </div>
          <div v-show="orderStatus === 2" style="width: 30%;display: flex;flex-direction: column;justify-content: center;align-items: center">
            <p>订单已取消</p>
            <p style="margin-top: 10px">全额退款</p>
          </div>
          <div v-show="orderStatus === 3" style="width: 30%;display: flex;flex-direction: column;justify-content: center;align-items: center">
            <p>订单已取消</p>
            <p style="margin-top: 10px">返还订单80%的金额</p>
          </div>
          <div style="width: 70%;display: flex;justify-content: flex-end;align-items: center">
            <el-button v-show="orderStatus === 1&&active === 1" style="background: gainsboro;border: 0;text-decoration: underline" @click="payOrder">立即付款</el-button>
            <el-button v-show="orderStatus === 1&&active === 3" style="background: gainsboro;border: 0;text-decoration: underline" @click="confirmOrder">确认收货</el-button>
            <el-button v-show="orderStatus === 1&&active !== 4" style="background: gainsboro;border: 0;text-decoration: underline" @click="cancelOrder">取消订单</el-button>
          </div>
        </div>
        <div style="width: 100%;margin-top: 15px;margin-bottom: 30px">
          <div style="width: 100%;height: 80px;display: flex;background: #f8f8f8">
            <div style="width: 80px;height: 100%;display: flex;justify-content: center;align-items: center">
              <img style="width: 60px;height: 60px" :src="Info.imageUrl"/>
            </div>
            <div style="height: 100%;display: flex;flex-direction: column">
              <div style="height: 50%">
                <p style="margin-top: 12px;font-size: 14px">{{Info.shopName}}</p>
              </div>
              <div style="height: 50%;display: flex;flex-direction: column;justify-content: flex-end">
                <span style="font-size: 14px;margin-bottom: 12px;color: darkgray">订单号：{{$route.params.orderId}}</span>
              </div>
            </div>
          </div>
          <div style="width: 100%;display: flex;background: #f8f8f8;border-top: #EBEEF5 1px solid">
            <div style="width: 50%;height: 100%;border-right: #EBEEF5 1px solid">
              <el-table :row-style="headerStyle" style="background: #f8f8f8" :header-cell-style="headerStyle" :data="orderDetails">
                <el-table-column label="商品" prop="title"></el-table-column>
                <el-table-column align="center" label="份数" prop="qty"></el-table-column>
                <el-table-column align="center" label="小计（元）">
                  <template slot-scope="scope">
                    <span>{{(scope.row.price*scope.row.qty).toFixed(2)}}</span>
                  </template>
                </el-table-column>
              </el-table>
              <div style="width: 100%;height: 47px;display: flex;justify-content: space-between;align-items: center;border-bottom: #EBEEF5 1px solid">
                <el-row style="width: 100%">
                  <el-col :span="8">
                    <span style="margin-left: 10px;font-size: 14px">配送费</span>
                  </el-col>
                  <el-col :span="11">&nbsp;</el-col>
                  <el-col :span="5">
                    <span style="">￥{{Info.freight}}</span>
                  </el-col>
                </el-row>
              </div>
              <div style="width: 100%;height: 47px;display: flex;justify-content: space-between;align-items: center;border-bottom: #EBEEF5 1px solid">
                <el-row style="width: 100%">
                  <el-col :span="8">
                    <span style="margin-left: 10px;font-size: 14px">优惠</span>
                  </el-col>
                  <el-col :span="11">&nbsp;</el-col>
                  <el-col :span="5">
                    <span style="">￥{{0}}</span>
                  </el-col>
                </el-row>
              </div>
              <div style="width: 100%;height: 47px;display: flex;justify-content: space-between;align-items: center">
                <el-row style="width: 100%">
                  <el-col :span="8">
                    <span style="margin-left: 10px;font-size: 14px">实际支付</span>
                  </el-col>
                  <el-col :span="11">&nbsp;</el-col>
                  <el-col :span="5">
                    <span style="color: crimson;font-weight: bold;font-size: large">￥{{0}}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div style="width: 50%;height: 100%">
              <div style="width: 100%;height:47px;display: flex;justify-content: left;align-items: center">
                <h4 style="margin-left: 30px">配送信息</h4>
              </div>
              <div style="border-top: #EBEEF5 1px solid">
                <el-form size="mini" style="margin-top: 15px" label-position="right" label-width="116px">
                  <el-form-item label="联系人：">{{Info.contactName}}</el-form-item>
                  <el-form-item label="联系电话：">{{Info.phoneNumber}}</el-form-item>
                  <el-form-item label="收货地址：">
                    <p style="width: 300px">{{Info.address}}</p>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
        orderId:null,
      orderStatus: 1,
      headerStyle: {
        background: '#f8f8f8'
      },
      active: 1,
      Info: {},
      orderDetails: [],
      deadline:'xxxx-xx-xx'
    }
  },
  created () {
      this.orderId = this.$route.params.orderId
      let param = new URLSearchParams()
      param.append('orderId', this.$route.params.orderId)
      this.axios.post('http://localhost:8080/getOrderDetail', param).then(response => {
          let products = response.data.data.products
          let data = response.data.data
          console.log(data)
          this.Info = data
          this.orderDetails =products
          switch (this.Info.state){
              case 'Canceled':
                  this.orderStatus =2
                  break
              case 'NotPaid':
                  this.active = 1
                  break
              case 'Paid':
                  this.active = 2
                  break
              case 'Accepted':
                  this.active =3
                  break
              case 'Arrived':
                  this.active = 4
                  break
              case 'Refund':
                  this.orderStatus = 3
                  break
          }
      })
  },
  methods: {
    payOrder () {
        let param = new URLSearchParams()
        param.append('orderId', this.orderId)
        this.axios.post('http://localhost:8080/payForOrder', param).then(response => {
            if (response.data.code === 11125) {
                this.$message('余额不足，请先充值')
            } else {
                this.$confirm('支付成功')
                this.active = 2
            }
        })
    },
    confirmOrder () {
        let param = new URLSearchParams()
        param.append('orderId', this.$route.params.orderId)
        this.axios.post('http://localhost:8080/confirm', param).then(_ => {
            this.active = 4
        })
    },
    cancelOrder () {
        let param = new URLSearchParams()
        param.append('orderId', this.orderId)
        this.axios.post('http://localhost:8080/refund', param).then(response => {
            this.$confirm('取消成功')
            if (this.orderStatus === 1 && this.active === 3) {
                this.orderStatus = 3
            } else {
                this.orderStatus = 2
            }
        })
    }
  }
}
</script>

<style scoped>
  .step {
    margin-top: 30px;
    width: 100%;
    height: 30px;
  }
</style>
