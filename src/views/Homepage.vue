<template>
    <el-container style="height: 100%">
        <el-header style="background-color: #1d7eb8">
            <Header :name="name"></Header>
        </el-header>
        <el-main style="background-color:#f7f7f7;height: 100%">
            <div>
                <div class="shops">
                    <div style="width: 100%">
                        <span>当前位置：</span>
                        <span>{{position}}</span>
                        <router-link to="/profile/address" style="color: cornflowerblue;font-size: 13px;margin-left: 5px">切换地址</router-link>
                    </div>
                    <div style="width: 100%;margin-top: 20px;background: white;height: 60px;display: flex">
                        <div style="height: 100%;width: 10%;display: flex;align-items: center">
                            <span style="margin-left: 0px;margin-top: -4px">商家分类：</span>
                        </div>
                        <div style="height: 100%;width: 90%;display: flex;align-items: center">
                            <el-button style="border: 0" @click="changeShop(type)" v-for="(type, index) in types" :key="index">{{type}}</el-button>
                        </div>
                    </div>
                    <el-row class="shops_view" :gutter="50">
                        <el-col :sm="12" :md="6" v-for="(card, index) in showShopList" :key="card.id" >
                            <Card :shopName="card.shopName" :rate="card.rate" :deliveryCost="card.deliveryCost"
                                  :imgUrl="card.imgUrl" :restaurantId="card.restaurantId"></Card>
                            <br>
                        </el-col>
                    </el-row>
                </div>
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
            this.defaultPosition()
            this.axios.get('http://localhost:8080/getAllShops').then(response => {
                this.shopList = response.data.data
            })
        },
        computed: {
            showShopList() {
                return this.shopList.slice((this.currentPage - 1) * this.perpage, this.currentPage * this.perpage);
            }
        },
        methods: {
            changeShop(type){
                //todo
            },
            defaultPosition () {
                let citysearch = new AMap.CitySearch()
                citysearch.getLocalCity((status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.city && result.bounds) {
                            this.position = result.city
                            this.city = result.city
                            this.center.lng = (result.bounds.northeast.lng + result.bounds.southwest.lng) / 2
                            this.center.lat = (result.bounds.northeast.lat + result.bounds.southwest.lat) / 2
                        }
                    }
                })
            }
        }
    }
</script>

<style>
    .shops_view {
        margin-top: 20px;
        vertical-align: text-top;
    }
    .shops {
        width: 75%;
        margin: 0 auto;
    }

</style>