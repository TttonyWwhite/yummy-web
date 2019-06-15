<template>
    <div id="cart_content" style="overflow:hidden;" onmouseover="this.className='over'" onmouseout="this.className='out'">
        <!--<div @click="onClick">-->
            <!--<img :src="imgUrl" width="70" height="70" style="float: left">-->
            <!--<span>{{shopName}}<br> 配送费: {{ deliveryCost }} ¥ </span>-->
        <!--</div>-->
        <el-row>
            <el-col>
                <img :src="imgUrl" width="70" height="70" style="float: left">
                <div style="float: left; text-align: left; margin-left: 20px">{{shopName}}
                    <br>评分: {{rate}}
                    <br>配送费: {{ deliveryCost }} </div>

            </el-col>
        </el-row>

        <el-row>
            <el-col>
                <span style="float: left;">{{deliveryTime}} 分</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            shopName: {
                type: String,
                default: '店铺名称'
            },
            rate: {
                type: Number,
                default: 0
            },
            deliveryCost: {
                type: Number,
                default: 1
            },
            imgUrl: {
                type: String,
                default: ''
            },
            restaurantId: {
                type: String,
                default: ''
            },
            deliveryTime: {
                type: Number,
                default: 30
            }
        },
        data() {
            return {
                restaurant_id: ''
            }
        },
        methods: {
            onClick() {
                console.log(this.restaurant_id)
                this.$router.push({name: 'shop', params: {id: this.restaurant_id}})
            }
        },
        watch: {
            restaurantId: {
                immediate: true,
                handler(val) {
                    this.restaurant_id = val;
                }
            }
        }
    }
</script>

<style>
    #card_content {
        overflow: hidden;
        height: 300px;
    }
    .over {
        background-color: #f2f2f2;
    }
    .out {
        background-color: #ffffff;
    }
</style>