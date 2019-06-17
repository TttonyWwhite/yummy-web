<template>
	<!--想想办法搞个背景图片 -->
	<div>
		<el-row style="height:25%;background-color: gainsboro;margin-right: -20px;margin-left: -20px;margin-top: -20px">
			<el-col :span="3">&nbsp;</el-col>
			<el-col :span="18">
				<div class="brief">
					<div style="width: 1000px;display: flex;justify-content: flex-start;align-items: center;margin-left: 20px">
						<img :src="shop.imgUrl" class="round_icon"/>
						<div>
							<h2 style="margin-left: 20px;margin-top: -10px">{{shop.shopName}}</h2>
							<Rate style="margin-left: 20px;margin-top: 10px" :value="shop.rate" :readonly="true"></Rate>
							<h3 style="margin-left: 20px;margin-top: 20px">地址：{{shop.position}}{{shop.detail}}</h3>

						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="3">&nbsp;</el-col>
		</el-row>
				<!--<span> 配送费 <br> ¥{{shop.deliveryCost}}</span>-->
	</div>
</template>


<script>
	import Rate from "vue-tiny-rate";
    export default {
		name: 'banner',
        components: {Rate},
        props: ['shop'],
		data() {
			return {
				// shopName: '王婆油炸',
				// rate: 4,
				// deliveryCost: 3
			}
		}
	}
</script>


<style>
	.round_icon {
		width: 100px;
		height: 100px;
		float: left;
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		
	}

	.brief{
		display: flex;
		flex-direction: row;
		height: 150px;
		justify-content: space-between;
		align-items: center;
	}
</style>