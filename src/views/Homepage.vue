<template>
    <div class="app">
        <Header :name="name"></Header>
        <div class="shops">
        <el-row class="shops_view" :gutter="50">
            <!-- <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="1" style="margin-left:105px;">
                <Card></Card>
            </el-col> -->
            <el-col :sm="12" :md="6" v-for="(card, index) in showShopList" :key="card.id" >
                <Card :shopName="card.shopName" :rate="card.rate" :deliveryCost="card.deliveryCost"
                        :imgUrl="card.imgUrl" :restaurantId="card.restaurantId"></Card>
            </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header'
    import Card from '../components/restaurantCard'
    export default {
        name: 'homepage',
        data() {
            return {
                name: '',
                shopList: [

                ],
                currentPage: 1,
                perpage: 16,
            }
        },
        components: {
            Header,
            Card
        },
        mounted() {
         this.name = localStorage.getItem('username')
         localStorage.setItem("ID", this.$route.params.id)
         //从后台拉取店铺数据
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
        }
    }
</script>

<style>
    #nameMenu {
        margin-right: 500px;
    }

    .shops_view {
        margin-top: 20px;
        vertical-align: text-top;
    }

    .shops {
        width: 70%;
        margin: 0 auto;

    }

</style>