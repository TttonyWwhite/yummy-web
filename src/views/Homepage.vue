<template>
    <el-container style="height: 100%">
        <el-header style="background-color: #1d7eb8">
            <Header :name="name"></Header>
        </el-header>
        <el-main style="background-color:#f7f7f7;height: 100%">
            <div class="shops">
                <div style="display: flex">
                    <div style="width: 75%">
                        <span>当前位置：</span>
                        <span>{{position}}</span>
                        <router-link to="/profile/address" style="color: cornflowerblue;font-size: 13px;margin-left: 5px;text-decoration: none">[切换地址]</router-link>
                    </div>
                    <div style="width: 25%">
                        <el-input placeholder="搜索商家..." v-model="searchKey" size="mini">
                            <el-button slot="append" icon="el-icon-search" @click="searchShop"></el-button>
                        </el-input>
                    </div>
                </div>
                <div style="width: 100%;margin-top: 20px;background: white;height: 60px;display: flex">
                    <div style="height: 100%;width: 10%;display: flex;align-items: center">
                        <span style="margin-left: 15px;margin-top: -3px">商家分类：</span>
                    </div>
                    <div style="height: 100%;width: 90%;display: flex;align-items: center;flex-wrap: wrap">
                        <el-button style="border: 0" @click="changeShop(type)" v-for="(type, index) in types" :key="index">{{type}}</el-button>
                    </div>
                </div>
                <el-row class="shops_view" :gutter="0">
                    <el-col :sm="12" :md="6" v-for="(card, index) in showShopList" :key="card.id" >
                        <Card :shopName="card.shopName" :rate="card.rate" :deliveryCost="card.deliveryCost"
                              :imgUrl="card.imgUrl" :restaurantId="card.restaurantId" :deliveryTime="card.deliveryTime"></Card>
                    </el-col>
                </el-row>
                <el-button @click="moreShops" style="width: 100%;border: 0">点击加载更多商家...</el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import Header from '../components/Header'
    import Card from '../components/restaurantCard'

    export default {
        name: 'homepage',
        data() {
            return {
                searchKey:'',
                name: '',
                shopList: [],
                currentPage: 1,
                perpage: 16,
                types:[
                    '全部商家', '快餐便当', '特色菜系', '异国料理', '小吃夜宵', '甜品饮品'
                ],
                position:'',
                city:'',
                center:{
                    lng: '',
                    lat: ''
                }
            }
        },
        components: {
            Header,
            Card
        },
        mounted() {
            this.name = localStorage.getItem('username')
            localStorage.setItem("ID", this.$route.params.id)
            //从后台拉取店铺数据 todo 如果用户设置了当前地址，则用当前地址，否则使用IP所在城市
            this.getUserAddress()
            if (this.position === '') {
                this.defaultPosition()
            }else {
                this.initShops()
            }
        },
        computed: {
            showShopList() {
                return this.shopList.slice((this.currentPage - 1) * this.perpage, this.currentPage * this.perpage);
            }
        },
        methods: {
            changeShop(type){
                let param = new URLSearchParams()
                param.append("type", type);
                this.axios.post('http://localhost:8080/getShopsByType', param).then(response => {
                    this.shopList = response.data.data
                })
            },
            searchShop(){
                let param = new URLSearchParams()
                param.append("keyword", this.searchKey)
                this.axios.post("http://localhost:8080/searchShop", param).then(response => {
                    this.shopList = response.data.data
                })
            },

            initShops() {
                let param = new URLSearchParams()
                param.append("lng", this.center.lng)
                param.append("lat", this.center.lat)

                this.axios.post('http://localhost:8080/getShopsByPosition', param).then(response => {
                    this.shopList = response.data.data
                })
            },

            defaultPosition () {
                let self = this
                AMap.plugin(['AMap.CitySearch',],function () {
                    let citysearch = new AMap.CitySearch()
                    citysearch.getLocalCity((status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.city && result.bounds) {
                                self.position = result.city
                                self.city = result.city
                                self.center.lng = (result.bounds.northeast.lng + result.bounds.southwest.lng) / 2
                                self.center.lat = (result.bounds.northeast.lat + result.bounds.southwest.lat) / 2
                                self.initShops()
                            }
                        }
                    })
                })
            },
            //todo 获得用户的地址
            getUserAddress(){

            },
            moreShops() {
                this.perpage += 16
            }
        }
    }
</script>

<style>
    .shops_view {
        margin-top: 20px;
        vertical-align: text-top;
        background-color: white;
    }
    .shops {
        width: 75%;
        margin: 0 auto;
    }
</style>