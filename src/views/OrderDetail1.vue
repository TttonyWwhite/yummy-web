<template>
  <div style="margin-left: 20px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item style="font-size: 16px">订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 20px;border-top: 2px solid #8a8a8a"></div>
    <div style="width: 100%;margin-top: 15px">
      <div style="width: 100%;height: 80px;display: flex;background: #f8f8f8">
        <div style="width: 80px;height: 100%;display: flex;justify-content: center;align-items: center">
          <img style="width: 60px;height: 60px" :src="merchantInfo.icon"/>
        </div>
        <div style="height: 100%;display: flex;flex-direction: column">
          <div style="height: 50%">
            <p style="margin-top: 12px;font-size: 14px">测试</p>
          </div>
          <div style="height: 50%;display: flex;flex-direction: column;justify-content: flex-end">
            <span style="font-size: 14px;margin-bottom: 12px;color: darkgray">订单号：{{order.orderId}}&nbsp;&nbsp;商家电话：{{merchantInfo.phoneNumber}}</span>
          </div>
        </div>
      </div>
      <div style="width: 100%;display: flex;background: #f8f8f8;border-top: #EBEEF5 1px solid">
        <div style="width: 50%;height: 100%;border-right: #EBEEF5 1px solid">
          <el-table :row-style="headerStyle" style="background: #f8f8f8" :header-cell-style="headerStyle" :data="orderDetails">
            <el-table-column label="商品" prop="name"></el-table-column>
            <el-table-column label="份数" prop="num"></el-table-column>
            <el-table-column label="小计（元）">
              <template slot-scope="scope">
                <span v-if="scope.row.discountPrice === 0">{{(scope.row.originalPrice*scope.row.num).toFixed(2)}}</span>
                <span v-else>{{(scope.row.discountPrice*scope.row.num).toFixed(2)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="width: 100%;height: 47px;display: flex;justify-content: space-between;align-items: center;border-bottom: #EBEEF5 1px solid">
            <span style="margin-left: 10px;font-size: 14px">配送费</span>
            <span style="margin-right: 117px">￥{{order.deliveryCost}}</span>
          </div>
          <div style="width: 100%;height: 47px;display: flex;justify-content: space-between;align-items: center;border-bottom: #EBEEF5 1px solid">
            <span style="margin-left: 10px;font-size: 14px">优惠</span>
            <span style="margin-right: 109px">-￥{{order.discount}}</span>
          </div>
          <div style="width: 100%;height: 47px;display: flex;justify-content: space-between;align-items: center">
            <span style="margin-left: 10px;font-size: 14px">实际支付</span>
            <span style="margin-right: 80px;color: crimson;font-weight: bold;font-size: large">￥{{(order.cost*1+order.deliveryCost*1-order.discount*1).toFixed(2)}}</span>
          </div>
        </div>
        <div style="width: 50%;height: 100%">
          <div style="width: 100%;height:47px;display: flex;justify-content: left;align-items: center">
            <h4 style="margin-left: 30px">配送信息</h4>
          </div>
          <div style="border-top: #EBEEF5 1px solid">
            <el-form size="mini" style="margin-top: 15px" label-position="right" label-width="116px">
              <el-form-item label="联系人：">{{member.name}}</el-form-item>
              <el-form-item label="联系电话：">{{member.phoneNumber}}</el-form-item>
              <el-form-item label="收货地址：">
                <p style="width: 300px">{{address}}</p>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div v-show="order.orderStatus === '已付款,等待商家接单'" style="margin-top: 15px;width: 100%;height: 80px;background: #f8f8f8;display: flex;justify-content: flex-end;align-items: center">
      <el-button v-if="accepted" style="background: #f8f8f8;border: 0;text-decoration: underline;margin-right: 20px" @click="back">返回</el-button>
      <el-button v-else style="background: #f8f8f8;border: 0;text-decoration: underline;margin-right: 20px" @click="acceptOrder">接受订单</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      headerStyle: {
        background: '#f8f8f8'
      },
      merchantInfo: {},
      order: {},
      orderDetails: [],
      member: {},
      address: '',
      accepted: false
    }
  },
  created () {
    let orderId = this.$route.query.oid
    let identifierCode = this.$store.state.login.id
    axios.post('/api/yummy-order/getOrder', {
      orderId: orderId
    })
      .then((response) => {
        if (response.data.code === 0) {
          this.order = response.data.data
          this.orderDetails = response.data.data.orderDetails
          this.getAddress(this.order.addressId)
          this.getMember(this.order.memberId)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    axios.post('/api/yummy-merchant/getInfo', {
      id: identifierCode
    })
      .then((response) => {
        if (response.data.code === 0) {
          this.merchantInfo = response.data.data
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    getAddress (addressId) {
      axios.post('/api/yummy-member/getAddress', {
        addressId: addressId
      })
        .then((response) => {
          if (response.data.code === 0) {
            this.address = response.data.data.position + response.data.data.detail
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getMember (memberId) {
      axios.post('/api/yummy-member/getMemberInfo', {
        memberId: memberId
      }).then((response) => {
        if (response.data.code === 0) {
          this.member = response.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    acceptOrder () {
      axios.post('/api/yummy-order/acceptOrder', {
        orderId: this.$route.query.oid
      })
        .then((response) => {
          if (response.data.code === 0) {
            axios.post('/api/yummy-order/sendAcceptMessage', {
              memberId: this.order.memberId,
              orderId: this.$route.query.oid
            })
            this.accepted = true
            this.$message('接单成功')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    back () {
      this.$router.push('/shopManage/newOrder')
    }
  }
}
</script>

<style scoped>

</style>
