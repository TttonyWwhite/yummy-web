<template>
	<div id="cart_content" style="overflow:hidden;" onmouseover="this.className='over'" onmouseout="this.className='out'">
	<!-- <div style="display:inline;">
		<img src="http://plu6c3si4.bkt.clouddn.com/logo1.png" width="70" height="70">
	</div>
	<div style="display:inline;vertical-align:top;text-align:center;" class="card_content">
		<span style="vertical-align:top;"> &nbsp;&nbsp;&nbsp;&nbsp;{{ shopName }} </span>
		
		<span style="display:block;"> 配送费: {{ deliveryCost }} ¥ </span>
	</div> -->
		<div >
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
			}
		},
		data() {
			return {
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