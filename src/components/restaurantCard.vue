<template>
    <div id="cart_content" style="height: 120px;width: 100%;border-top: 1px #f7f7f7 solid" onmouseover="this.className='over'" onmouseout="this.className='out'" @click="onClick">
        <div style="width: 100px;height: 120px;float: left;display: flex;justify-content: space-between;align-items: center;flex-direction: column">
            <img :src="imgUrl" width="70" height="70" style="margin-top: 15px">
            <span style="font-size: 12px; color: #a3a3a3;margin-bottom: 10px">{{deliveryTime}} 分钟</span>
        </div>
        <div style="width:auto;height: 120px;display: flex;flex-direction: column">
            <h4 style="margin-top: 15px;word-break: keep-all;white-space: nowrap;text-overflow:ellipsis;overflow: hidden">{{shopName}}</h4>
            <span style="margin-top: 10px"><Rate :value="rate" :readonly="true" size='15px'/></span>
            <span style="color: #a3a3a3; font-size: 14px; " v-if="deliveryCost === 0">免配送费</span>
            <span style="color: #a3a3a3; font-size: 14px; " v-else>配送费: {{deliveryCost}}¥</span>
        </div>
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
                // console.log(this.restaurant_id)
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
    }
    .over {
        background-color: #f7f7f7;
    }
    .out {
        background-color: #ffffff;
    }
</style>