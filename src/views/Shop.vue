<template>
    <el-container style="height: 100%">
        <el-header style="background-color: #1d7eb8">
            <Header :name="name"></Header>
        </el-header>
        <el-main style="background-color:#f7f7f7">
            <Banner :shop="this.shop"></Banner>
            <el-row style="margin-left: -20px;margin-right: -20px">
                <el-col :span="3">&nbsp;</el-col>
                <el-col :span="16">
                    <div style="display: flex;flex-direction: row;flex-wrap: wrap">
                         <el-card style="width: 400px;height: 100px;margin-top: 15px;margin-left: 20px;border: 1px #dfdfdf solid" body-style="padding:0" v-for="product in products" :key="product.id">
                            <div style="display: flex;flex-direction: row">
                                <div style="width: 100px">
                                    <img style="width: 100px;height: 100px" :src="product.image"/>
                                </div>
                                <div style="height:100px;width: 300px;margin-left: 10px">
                                    <div style="height: 50%">
                                        <p style="font-size: 20px">{{product.title}}</p>
                                    </div>
                                    <div style="height: 50%;display: flex;justify-content: space-between;align-items: center">
                                        <span style="color: dodgerblue">￥{{product.price}}</span>
                                        <el-button size="mini" type="primary" @click="addProduct(product)" style="margin-right: 20px">加入购物车</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="5">
                    <shopping-cart style="position: fixed;bottom: 0;right: 15px;box-shadow:-10px 0 10px -10px gray "></shopping-cart>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import Header from '../components/Header'
    import Banner from '../components/banner'
    import ShoppingCart from '../components/BuyCar'
    import State from '../shoppingCartState'
    import _ from 'lodash'

    export default {
        name: 'shop',
        created() {
            //要从url中得到当前的餐厅id
            //要从服务器拿到店铺的信息
            let id = this.$route.params.id

            let param = new URLSearchParams()
            param.append("restaurantId", id)

            this.axios.post('http://localhost:8080/getRestaurant', param).then(response => {
                //console.log(response.data.data)
                this.shop = response.data.data
            })
            //从服务器拿到这个店铺的所有商品信息

            this.axios.post('http://localhost:8080/getFoods', param).then(response => {
                //console.log(response.data.data)
                this.products = response.data.data
            })

        },
        components: {
            ShoppingCart,
            Header,
            Banner
        },
        data() {
            return {
                products: [],
                shop: {

                },
                name: localStorage.getItem('username')
            }
        },
        methods: {
            addProduct(product){
                product['sid'] = this.$route.params.id
                State.add(product)
            }
        }

    }
</script>

<style>
    .shopping-cart {
        width: 25%;
        float: left;
    }
</style>