<template>
	<div id="cart_content" style="overflow:hidden;" onmouseover="this.className='over'" onmouseout="this.className='out'">
		<div @click="onClick">
			<img :src="imgUrl" width="70" height="70" style="float: left">
			<span>{{shopName}}<br> 配送费: {{ deliveryCost }} ¥ </span>
		</div>
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