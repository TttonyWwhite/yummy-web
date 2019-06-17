<template>
  <div style="width: 320px;">
    <div style="width: 100%;height: 40px;display: flex;justify-content: space-between;align-items: center;background-color: #fafafa;border-top: 2px royalblue solid">
      <span style="margin-left: 10px">购物车</span>
      <a href="javascript:;" style="margin-right: 10px" @click="clearBuyCar">清空</a>
    </div>
    <div style="width: 100%;background-color: white">
      <div id="orderLine" onmouseover="this.className='over'" onmouseout="this.className='out'" style="height: 35px;border-top: #f8f8f8 1px solid" v-for="orderDetail in items" :key="orderDetail.id">
        <el-row style="height:35px;display: flex;justify-content: center;align-items: center">
          <el-col :span="11">
            <span style="margin-left: 10px;width: 100px;word-break: keep-all;white-space: nowrap;text-overflow:ellipsis;overflow: hidden">{{orderDetail.title}}</span>
          </el-col>
          <el-col :span="8">
            <el-input-number size="mini" style="width: 90px;" @change="removeIfZero(orderDetail)" v-model="orderDetail.qty" :min="0"></el-input-number>
          </el-col>
          <el-col :span="5">
            <span style="margin-right: 10px;color: crimson" >￥{{(orderDetail.price*orderDetail.qty).toFixed(2)}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="width: 100%;height: 40px;display: flex;">
      <div style="width: 65%;display: flex;justify-content: space-between;background: black;align-items: center">
        <div style="width: 65%">
          <label class="icon-buyCar"></label>
          <span style="color: white">￥{{totalCost}}</span>
        </div>
        <div style="margin-top: 10px;margin-left: 10px;width: 35%">
          <span style="color: gainsboro;font-size: 14px">配送费￥3</span>
        </div>
      </div>
      <div v-if="items.length === 0" style="width: 35%;background: gainsboro;display: flex;justify-content: center;align-items: center">
        <a>购物车是空的</a>
      </div>
      <div v-else style="width: 35%;background:cornflowerblue;display: flex;justify-content: center;align-items: center">
        <a href="javascript:;" @click="toPay" style="color: white">去结算</a>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import State from '../shoppingCartState'
export default {
  data () {
    return {
        items: State.data.cart[this.$route.params.id]===undefined?State.data.cart[this.$route.params.id]=[]:State.data.cart[this.$route.params.id],
        totalCost: 0
    }
  },
    watch: {
        items:{
            handler(){
                this.calculateCost()
            },
            deep:true
        }
    },
  methods: {
    clearBuyCar () {
        State.clear(this.$route.params.id)
    },
    removeIfZero (order) {
        if (order.qty === 0){
            State.remove(this.$route.params.id,order)
        }
    },
    calculateCost(){
        let tmp = 0
        for (let index in this.items){
            tmp += this.items[index].price*this.items[index].qty
        }
        this.totalCost = tmp.toFixed(2)
    },
    toPay () {
      // this.$emit('toPay')
    }
  }
}
</script>

<style scoped>
  .icon-buyCar {
    background: url('../assets/images/buyCar.svg') no-repeat;
    background-size: cover;
    height: 30px;
    width: 30px;
    vertical-align: middle;
    display: inline-block;
    margin-left: 10px;
  }

  #orderLine{
  }
  .over {
    background-color: #f7f7f7;
  }
  .out {
    background-color: white;
  }
</style>
