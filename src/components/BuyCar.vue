<template>
  <div style="width: 320px;">
    <div style="width: 100%;height: 40px;display: flex;justify-content: space-between;align-items: center;background: #FAFAFA;border-top: 2px royalblue solid">
      <span style="margin-left: 10px">购物车</span>
      <a href="javascript:;" style="margin-right: 10px" @click="clearBuyCar">清空</a>
    </div>
    <div style="width: 100%">
      <div style="display: flex;justify-content: space-between;align-items: center;height: 35px" v-for="(orderDetail,index) in $store.state.buyCar.orderDetails" :key="index">
        <span style="margin-left: 10px;width: 100px;word-break: keep-all;white-space: nowrap;text-overflow:ellipsis;overflow: hidden">{{orderDetail.name}}</span>
        <el-input-number size="mini" style="width: 90px;" @change="calculateCost" v-model="orderDetail.num" :min="1"></el-input-number>
        <span style="margin-right: 10px;color: crimson" v-if="orderDetail.discountPrice === 0">￥{{(orderDetail.originalPrice*orderDetail.num).toFixed(2)}}</span>
        <span style="margin-right: 10px;color: crimson" v-else>￥{{(orderDetail.discountPrice*orderDetail.num).toFixed(2)}}</span>
      </div>
    </div>
    <div style="width: 100%;height: 40px;display: flex;">
      <div style="width: 65%;display: flex;justify-content: space-between;background: black;align-items: center">
        <div style="width: 65%">
          <label class="icon-buyCar"></label>
          <span style="color: white">￥{{$store.state.buyCar.order.cost}}</span>
        </div>
        <div style="margin-top: 10px;margin-left: 10px;width: 35%">
          <span style="color: gainsboro;font-size: 14px">配送费￥3</span>
        </div>
      </div>
      <div v-if="$store.state.buyCar.orderDetails.length === 0" style="width: 35%;background: gainsboro;display: flex;justify-content: center;align-items: center">
        <a>购物车是空的</a>
      </div>
      <div v-else style="width: 35%;background:cornflowerblue;display: flex;justify-content: center;align-items: center">
        <a href="javascript:;" @click="toPay" style="color: white">去结算</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    clearBuyCar () {
      this.$store.commit('resetBuyCar')
    },
    calculateCost () {
      let tmp = 0
      for (let index in this.$store.state.buyCar.orderDetails) {
        if (this.$store.state.buyCar.orderDetails[index].discountPrice === 0) {
          tmp += this.$store.state.buyCar.orderDetails[index].originalPrice * this.$store.state.buyCar.orderDetails[index].num
        } else {
          tmp += this.$store.state.buyCar.orderDetails[index].discountPrice * this.$store.state.buyCar.orderDetails[index].num
        }
      }
      this.$store.state.buyCar.order.cost = tmp.toFixed(2)
    },
    toPay () {
      this.$emit('toPay')
    }
  }
}
</script>

<style scoped>
  .icon-buyCar {
    background: url('../../assets/images/buyCar.svg') no-repeat;
    background-size: cover;
    height: 30px;
    width: 30px;
    vertical-align: middle;
    display: inline-block;
    margin-left: 10px;
  }
</style>
