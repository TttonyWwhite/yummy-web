<template>
	<div id="view"> 
		<el-row :gutter="20"> 
			<el-col :span="2">
				<div class="user_img">
					<img src="http://pnfspjeff.bkt.clouddn.com/%E5%A6%99%E5%A6%99%E5%A4%B4%E5%83%8F.jpg" class="round_icon" alt="">
				</div>	
			</el-col>
			<el-col :span="3">
				<div class="welcome">
					<span> 欢迎, {{memberName}} </span>
				</div>
			</el-col>
			<el-col :span="4">
				<span> 我的红包 </span>
				<br>
				<span> 0 个 </span>
			</el-col>
			<el-col :span="5">
				<span> 我的等级 </span>
				<br>
				<span> Level {{ level }} </span>
			</el-col>
			<el-col :span="5">
				<span> 账户余额 </span>
				<br>
				<span> {{balance}}元 </span>
			</el-col>
			<el-col :span="2">
				<el-button @click="chargeVisible = true">余额充值</el-button>
			</el-col>
		</el-row>

		<el-dialog
			title="余额充值"
			:visible.sync="chargeVisible"
			width="30%">
			<h2>请输入充值金额</h2>
			<el-input style="width: 200px;" v-model="chargeAmount"></el-input>
			<br>
			<br>
			<el-button type="primary" @click="charge">确认充值</el-button>
		</el-dialog>
	</div>
</template>


<script>
	export default {
		name: 'infoSummary',
		data() {
			return {
				memberName: localStorage.getItem("username"),
				balance: null,
				level: null,
				chargeVisible: false,
				chargeAmount: 0
			}
		},

		created() {
			let param = new URLSearchParams()
			param.append('memberId', this.$route.params.id)
			this.axios.post('http://localhost:8080/getBalance', param).then(response => {
				this.balance = response.data.data
			})

			this.axios.post('http://localhost:8080/getLevel', param).then(response => {
				this.level = response.data.data
			})
		},

		methods: {
			charge() {
				let param = new URLSearchParams()
				param.append('memberId', this.$route.params.id)
				param.append('chargeAmount', this.chargeAmount)
				this.axios.post('http://localhost:8080/charge', param).then(response => {
					this.balance = response.data.data;
					this.chargeVisible = false;
					this.$message('充值成功')
				})
			},
			handlePay(val) {
				this.balance -= val
			},
			handleRefund(val) {
				this.balance += val
			}
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