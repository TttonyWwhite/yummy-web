<template>
	<div id="view"> 
		<el-row :gutter="20"> 
			<el-col :span="2">
				<div class="user_img">
					<img src="http://plu6c3si4.bkt.clouddn.com/%E5%A6%99%E5%A6%99%E5%A4%B4%E5%83%8F.jpg" class="round_icon" alt="">
				</div>	
			</el-col>
			<el-col :span="4">
				<div class="welcome">
					<span> 中午好, illiant </span>
				</div>
			</el-col>
			<el-col :span="5">
				<span> 我的红包 </span>
				<br>
				<span> 0 个 </span>
			</el-col>
			<el-col :span="5">
				<span> 我的金币 </span>
				<br>
				<span> 0 个 </span>
			</el-col>
			<el-col :span="6">
				<span> 账户余额 </span>
				<br>
				<span> 0.00元 </span>
			</el-col>
		</el-row>
	</div>
</template>


<script>
	export default {
		name: 'infoSummary',

	}
</script>


<style>
	#view {
		height: 100px;
		background-color: gery;
	}

	.round_icon {
		width: 40px;
		height: 40px;
		display: flex;
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.user_img {
		margin-left: 10px;
	}

	.welcome {
		margin-top: 10px;
	}
</style>