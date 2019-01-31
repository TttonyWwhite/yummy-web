<template>
	<!--想想办法搞个背景图片 -->
	<div class="banner">
	<el-row>
		<el-col :span="2">
			<div id="banner_img">
				<img src="http://plu6c3si4.bkt.clouddn.com/%E7%8E%8B%E5%A9%86%E6%B2%B9%E7%82%B8.png" class="round_icon" alt="">
			</div>
			
		</el-col>
		<el-col :span="4">
			<div class="banner_text">
				<span >{{shopName}} <br> rate: {{rate}}</span>
			</div>
		</el-col>
		<el-col :span="2">
			<div class="banner_text">
				<span> 配送费 <br> ¥{{deliveryCost}}</span>
			</div>
		</el-col>
		<el-col :span="18">
			&nbsp;
		</el-col>
	</el-row>
	</div>
</template>


<script>
	export default {
		name: 'banner',
		data() {
			return {
				shopName: '王婆油炸',
				rate: 4,
				deliveryCost: 3
			}
		}
	}
</script>


<style>
	.round_icon {
		width: 80px;
		height: 80px;
		float: left;
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		
	}

	.banner_text {
		margin-top: 16px;
	}

	#banner_img {
		margin-left: 50px;
	}

	.banner {
		margin-top: 10px;
	}

</style>