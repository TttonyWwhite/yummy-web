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
    <el-dialog title="订单信息" width="1000px" :modal="false" :visible.sync="dialogVisible">
      <div style="width: 100%;display: flex;justify-content: space-between">
        <div style="width: 38%">
          <div style="width:100%;margin-top: -30px">
            <h3>订单详情</h3>
          </div>
          <div style="width:100%;border-top: gainsboro 2px solid;margin-top: 10px">
            <el-table header-align="right" :data="items">
              <el-table-column  label="商品" prop="title"></el-table-column>
              <el-table-column  align="center" label="份数" prop="qty"></el-table-column>
              <el-table-column  align="center" label="小计（元）">
                <template slot-scope="scope">
                  <span>{{(scope.row.price*scope.row.qty).toFixed(2)}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div style="width: 100%;height: 47px;display: flex;justify-content: space-between;align-items: center;border-bottom: #EBEEF5 1px solid">
              <el-row style="width: 100%">
                <el-col :span="8">
                  <span style="margin-left: 10px">配送费</span>
                </el-col>
                <el-col :span="11">&nbsp;</el-col>
                <el-col :span="5">
                  <span>￥{{deliveryCost}}</span>
                </el-col>
              </el-row>
            </div>
            <div style="width: 100%;height: 47px;display: flex;justify-content: space-between;align-items: center;border-bottom: #EBEEF5 1px solid">
              <el-row style="width: 100%">
                <el-col :span="8">
                  <span style="margin-left: 10px">优惠</span>
                </el-col>
                <el-col :span="11">&nbsp;</el-col>
                <el-col :span="5">
                  <span>-￥{{totalCost-(totalCost*discount).toFixed(2)}}</span>
                </el-col>
              </el-row>
            </div>
            <div style="width: 100%;height: 47px;display: flex;justify-content: space-between;align-items: center">
              <el-row style="width: 100%">
                <el-col :span="8">
                  <span style="margin-left: 10px">总计</span>
                </el-col>
                <el-col :span="10">&nbsp;</el-col>
                <el-col :span="6">
                  <span style="color: crimson;font-weight: bold;font-size: large">￥{{(totalCost*discount).toFixed(2)}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div style="width: 59%">
          <div style="width: 100%">
            <div style="width: 100%;margin-top: -30px">
              <h3>收货地址</h3>
            </div>
            <div style="width: 100%;height: 46px;border-top: gainsboro 2px solid;margin-top: 10px;border-bottom: gainsboro 2px solid;display: flex;align-items: center">
              <span>{{address}}</span>
            </div>
          </div>
          <div style="width: 100%">
            <div style="width: 100%;margin-top: 10px">
              <h3>可选优惠</h3>
            </div>
            <div style="margin-top: 10px">
              <span>无可用优惠</span>
            </div>
          </div>
          <el-button @click="confirmBuy" style="position: absolute;bottom: 20px;right: 20px" type="danger">确认下单</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import State from '../shoppingCartState'
export default {
  data () {
    return {
        items: State.data.cart[this.$route.params.id]===undefined?State.data.cart[this.$route.params.id]=[]:State.data.cart[this.$route.params.id],
        totalCost: 0,
        dialogVisible: false,
        discount: 1,
        deliveryCost:0,//todo 配送费
        address:''
        //todo 获得默认地址，就是首页上那一个
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
    created(){
      this.calculateCost()
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
        this.dialogVisible = true
    },
      confirmBuy(){
        //todo 下订单,优惠相关的你自己先写一写，我再改一改界面
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
