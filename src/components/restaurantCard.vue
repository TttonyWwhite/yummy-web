<template>
    <div id="cart_content" style="overflow:hidden;" onmouseover="this.className='over'" onmouseout="this.className='out'" @click="onClick">
        <el-row>
            <el-col>
                <img :src="imgUrl" width="70" height="70" style="float: left">
                <div style="float: left; text-align: left; margin-left: 20px">{{shopName}}
                    <br><span><Rate :value="rate" :readonly="true" size='15px'/></span>
                    <span style="color: #a3a3a3; font-size: 14px; margin-top: -10px" v-if="deliveryCost === 0">免配送费</span>
                    <span style="color: #a3a3a3; font-size: 14px; margin-top: -10px" v-else>配送费: {{deliveryCost}}¥</span>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col>
                <span style="float: left; margin-left: 12px; font-size: 12px; color: #a3a3a3;">{{deliveryTime}} 分钟</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Rate from 'vue-tiny-rate'
    export default {
        name: 'card',
        components: {
          Rate
        },
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