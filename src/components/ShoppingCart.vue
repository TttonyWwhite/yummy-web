<template>
	<div class="cart">
		<p class="cart-title">购物车</p>
		<p class="cart-empty" v-if="total == 0">购物车空空如也</p>
		<div class="items" v-else>
			<div class="item clearfix" v-for="item in items">
				<img :src="item.image" class="item-image">
				<div class="item-details">
					<p class="item-title">{{item.title}}</p>
					<p class="item-price">
						<span>x{{item.qty}}</span>
						<span class="right">¥ {{item.qty * item.price}} </span>
					</p>
				</div>
			</div>
		</div>
		<div class="cart-total">
			<span>总价 &nbsp;&nbsp;</span>
			<span>¥ {{total}}</span>
			<span class="right"><el-button type="success" @click="paymentVisible = true">立即下单</el-button></span>
		</div>

		<el-dialog 
			title="付款"
			:visible.sync="paymentVisible"
			width="36%"
            :before-close="handleClose">
            <el-form>
            	<el-form-item>
		            <el-table
		            	:data="items">
		            	<el-table-column
		            		prop="title"
		            		label="名称"
		            		width="155">
		            	</el-table-column>
		            	<el-table-column
		            		prop="price"
		            		label="单价"
		            		width="155">
		            	</el-table-column>
		            	<el-table-column
		            		prop="qty"
		            		label="数量"
		            		width="155">
		            	</el-table-column>
		            </el-table>
		        </el-form-item>
		        <el-form-item label="收货地址">
		        	<el-select v-model="address_value" placeholder="请选择收货地址">
		        		<el-option
		        			v-for="item in options"
		        			:key="item.value"
		        			:label="item.label"
		        			:value="item.value">
		        		</el-option>
		        	</el-select>
		        </el-form-item>
		        <el-form-item>
		        	<el-row>
		        		<el-col :span="8">
		        			<span class="payItem">总价 ¥{{totalAfterDiscount}}</span>
		        			<span class="discount_str">{{discount_str}}</span>
		        		</el-col>

		        		<el-col :span="6">
		        			<el-button class="payItem" type="primary" @click="paymentVisible = false">取消</el-button>
		        		</el-col>

		        		<el-col :span="10">
		        			<el-button class="payItem" type="success" @click="order">确认支付</el-button>
		        		</el-col>


		        	</el-row>
		        	
		        	
		        </el-form-item>

		    </el-form>
        </el-dialog>
		
	</div>
</template>

<script>
	import State from '../shoppingCartState'
	import _ from 'lodash'

	export default {
		data() {
			return {
				items: State.data.cart,
				paymentVisible: false,
				options: [
					
				],
				address_value: '',
				discount: 1,
				discount_str: ''
			}
		},
		computed: {
			total() {
				return _.sumBy(this.items, function(item) {
					return (item.price * item.qty) 
				})
				
			},
			totalAfterDiscount() {
				var sum = 0
				for (var i = 0;i < this.items.length;i++) {
					sum += this.items[i].price * this.items[i].qty
				}

				sum *= this.discount

				return sum.toFixed(2)
			}
		},
		methods: {
			order() {
				var total = _.sumBy(this.items, function(item) {
					return (item.price * item.qty)
				})

				let foodsArr = []
				for (var i = 0;i < this.items.length;i++) {
					foodsArr.push(this.items[i].id)
				}

				// let address_number = new Number(this.address_value)

				let data = {
					items: this.items,
					restaurantId: this.$route.params.id,
					memberId: localStorage.getItem("ID"),
					orderTime: new Date(),
					expectTime: new Date(),
					freight: 3,
					addressId: this.address_value
				}

				console.log(data)
				this.axios.post("http://localhost:8080/orderFoods", data).then(response => {
					console.log(response.data)
				})
				//应该跳到订单详情页面
				this.$router.push({name: 'personalCenter', params: {id: localStorage.getItem("ID")}})
			},

			getNowFormatDate() {
				var date = new Date()
				var seperator1 = "-"
    			var seperator2 = ":"
    			var month = date.getMonth() + 1
    			var strDate = date.getDate()
    			 if (month >= 1 && month <= 9) {
				        month = "0" + month;
				    }
				 if (strDate >= 0 && strDate <= 9) {
				        strDate = "0" + strDate;
				    }
				var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
				            + " " + date.getHours() + seperator2 + date.getMinutes()
				            + seperator2 + date.getSeconds();
				return currentdate;
			},

			handleClose(done) {
                this.$confirm('确认关闭？')
                  .then(_ => {
                    done();
                  })
                  .catch(_ => {});
            },
		},

		mounted() {
			//从后台拉取收货地址
			let param = new URLSearchParams()
			param.append("memberId", localStorage.getItem("ID"))
			this.axios.post('http://localhost:8080/getAddress', param).then(response => {
				console.log(response)
				//this.options = response.data.data
				// for (var i = 0;i < response.data.data.length;i++) {
				// 	let temp = {value: i, label: response.data.data[i]}
				// 	this.options.push(temp)
				// }
				for (var i = 0;i < response.data.data.length;i++) {
					let temp = {value: response.data.data[i].addressId, label: response.data.data[i].address}
					this.options.push(temp)
				}

			})

			//从后台获取用户等级以计算折扣

			this.axios.post('http://localhost:8080/getMemberLevel', param).then(response => {
				var memberLevel = response.data.data

				//这是非常不好的写法！
				if (memberLevel == 1) {
					this.discount = 1
				} else if (memberLevel == 2) {
					this.discount = 0.95
					this.discount_str = '5% off'
				} else if (memberLevel == 3) {
					this.discount = 0.92
					this.discount_str = '8% off'
				} else if (memberLevel == 4) {
					this.discount = 0.85
					this.discount_str = '15% off'
				}

			}) 
		}
	}
</script>

<style>
	.cart {
		margin-left: 1em
	}

	.cart-title {
		margin: 0.5em 0 0 0;
	    font-weight: bold;
	    text-transform: uppercase;
	    text-align: center;
	    padding: 0.75em;
	    background: #35495E;
	    color: #fff;
	}

	.cart-empty {
		text-align: center;
	    margin: 4em 0 0 0;
	    min-height: 300px;
	}

	.cart-total {
		background: #F1F1F1;
	    margin: 0;
	    padding: 1em;
	}

	.items {
		min-height: 300px;
	}

	item {
		padding: 0.75em 0.5em;
    	border-top: 1px solid #ddd;
	}

	.right {
		margin-left: 50px;
	}

	.item-image {
		float: left;
		width: 20%;
	}

	.item-details {
		float: left;
		width: 80%;
		padding-left: 0.75em
	}

	.item-title {
		margin: 0;
		font-weight: bold;
	}

	.item-price {
		margin: 0;
		font-size: 0.9em;
	}

	.payItem {
		margin-left: 5px;
		float: left;
	}

	.discount_str {
		color: red;
	}
</style>