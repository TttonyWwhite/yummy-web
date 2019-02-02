<template>
	<div>
		<div class="page-top">
			<Header></Header>

			<Banner :shop="this.shop"></Banner>
		</div>
	<div class="container">
		
		<div class="products">
			<div class="clearfix">
				<product v-for="product in products" :product="product"></product>
			</div>
		</div>

		<div class="shopping-cart">
			<shopping-cart></shopping-cart>
		</div>
	</div>	
	</div>
</template>

<script>
	import Header from '../components/Header'
	import Banner from '../components/banner'
	import ShoppingCart from '../components/ShoppingCart'
	import Product from '../components/Product'
	export default {
		name: 'shop',
		created() {
			//要从url中得到当前的餐厅id
			//要从服务器拿到店铺的信息
			let id = this.$route.params.id
			console.log(id)

			let param = new URLSearchParams()
			param.append("restaurantId", id)

			this.axios.post('http://localhost:8080/getRestaurant', param).then(response => {
				console.log(response.data.data)
				this.shop = response.data.data
			})
			//从服务器拿到这个店铺的所有商品信息	
			
		 	this.axios.post('http://localhost:8080/getFoods', param).then(response => {
		 		console.log(response.data.data)
		 		this.products = response.data.data
		 	})

		},
		components: {
			ShoppingCart,
			Product,
			Header,
			Banner
		},
		data() {
			return {
				products: [],
				shop: {
					
				}
			}
		}

	}
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Helvetica, sans-serif;
    margin: 0;
  }

  .clearfix:after {
     content: " ";
     visibility: hidden;
     display: block;
     height: 0;
     clear: both;
  }

  .container {
    width: 100%;
    color: #4C5263;
    width: 100%;
    padding: 2em;
  }

  .products {
    width: 75%;
    float: left;
  }

  .shopping-cart {
    width: 25%;
    float: left;
  }
</style>