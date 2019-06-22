<template>
  <div style="margin-left: 20px;background-color: white;min-height: 100%;margin-bottom: 20px">
    <div style="margin-left: 20px;margin-right: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="font-size: 16px;margin-top: 10px"><h4>我的订单</h4></el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-top: 10px;border-top: 2px solid #8a8a8a">
        <el-table :data="orders">
          <el-table-column width="100px" label="商家">
            <template slot-scope="scope">
              <img :src="scope.row.image" style="height: 70px;width: 70px"/>
            </template>
          </el-table-column>
          <el-table-column label="订单编号" prop="orderId"></el-table-column>
          <el-table-column align="center" label="下单时间" prop="time"></el-table-column>
          <el-table-column align="center" label="支付金额（元）">
            <template slot-scope="scope">
              {{scope.row.price.toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" prop="state"></el-table-column>
          <el-table-column align="center" label="详情/操作">
            <template slot-scope="scope">
              <el-button type="primary"  @click="toDetail(scope.row)">订单详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      orders: []
    }
  },
  created () {
    let param = new URLSearchParams()
    param.append("memberId", this.$route.params.id)
    this.axios.post('http://localhost:8080/getOrders', param).then(response => {
      this.orders = response.data.data
      this.orders.reverse()
    })
  },
  methods: {
    toDetail (order) {
        this.$router.push({name: 'orderDetail', params: {orderId: order.orderId}})
    }
  }
}
</script>

<style scoped>

</style>
