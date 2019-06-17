<template>
    <el-card style="width: 400px;height: 100px">
        <div style="display: flex;flex-direction: row">
            <div style="width: 100px;margin-left: -20px;margin-top: -20px">
                <img style="width: 100px;height: 100px" :src="product.image"/>
            </div>
            <div style="height:100px;width: 280px;margin-left: 10px;margin-right: -20px;margin-top: -20px">
                <div style="height: 50%">
                    <p style="font-size: 20px">{{product.title}}</p>
                    <!--<p style="font-size: 13px">{{goods.description}}</p>-->
                </div>
                <div style="height: 50%;display: flex;justify-content: space-between;align-items: center">
                    <span v-show="goods.discountPrice === 0" style="color: dodgerblue">￥{{product.price}}</span>
                    <!--<span v-show="goods.discountPrice !== 0" style="color: dodgerblue"><span style="text-decoration: line-through">￥{{goods.price}}</span>￥{{goods.discountPrice}}</span>-->
                    <el-button size="mini" @click="addProduct(goods)" style="">加入购物车</el-button>
                    <!--<el-button v-else disabled style="width: 92px" size="mini">已售完</el-button>-->
                </div>
            </div>
        </div>
    </el-card>
    <!--<div class="product">-->
        <!--<img :src="product.image" class="image">-->
        <!--<p class="title">{{product.title}}</p>-->
        <!--<p class="price">-->
            <!--<span>¥ {{product.price}} </span>-->
            <!--<span class="qty" v-if="qtyInCart > 0">x{{qtyInCart}}</span>-->
        <!--</p>-->
        <!--<div class="controls">-->
            <!--<button class="add-btn" @click="addToCart" v-if="qtyInCart == 0">加入购物车</button>-->
            <!--<div class="clearfix" v-else>-->
                <!--<button class="inc" @click="inc">+</button>-->
                <!--<button class="dec" @click="dec">-</button>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
</template>

<script>
    import _ from 'lodash'
    import State from '../shoppingCartState'

    export default {
        props: ['product'],
        data() {
            return {
                shared: State.data
            }
        },
        methods: {
            addToCart() {
                State.add(this.product)
            },
            inc () {
                State.inc(this.product)
            },
            dec () {
                State.dec(this.product)
            },
            addProduct(goods){

            }
        },
        computed: {
            qtyInCart () {
                var found = _.find(this.shared.cart, ['id', this.product.id])
                if (typeof found == 'object') {
                    return found.qty
                } else {
                    return 0
                }
            }
        }
    }
</script>

<style>
    .product {
        float: left;
        width: 25%;
        padding: 0.5em 0.5em;
        margin-bottom: 1em;
    }

    .image {
        display: block;
        height: 160px;
        width: 200px;
    }

    .title {
        font-weight: bold;
        margin: 0.35em 0;
        text-align: left;
    }

    .price {
        margin: 0.35em 0;
        font-size: 0.9em;
        text-align: left;
    }

    .qty {
        float: right;
        margin-right: 120px;
    }

    .add-btn, .inc, .dec {
        display: block;
        border: none;
        padding: 0.5em;
        outline: none;
    }

    .add-btn {
        width: 62%;
        background: #41B883;
        color: #fff;
    }

    .inc {
        width: 30%;
        background: #418cb8;
        margin-right: 1%;
        color: #fff;
        float: left;
    }

    .dec {
        width: 30%;
        background: #418cb8;
        color: #fff;
        margin-left: 1%;
        float: left;
    }
</style>