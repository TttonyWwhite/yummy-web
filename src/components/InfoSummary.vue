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
					<span> 欢迎, {{memberName}} </span>
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
				<span> {{balance}}元 </span>
			</el-col>
		</el-row>
	</div>
</template>


<script>
	export default {
		name: 'infoSummary',
		data() {
			return {
				memberName: localStorage.getItem("username"),
				balance: null
			}
		},

		created() {
			let param = new URLSearchParams()
			param.append('memberId', this.$route.params.id)
			this.axios.post('http://localhost:8080/getBalance', param).then(response => {
				this.balance = response.data.data
			})
		}
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