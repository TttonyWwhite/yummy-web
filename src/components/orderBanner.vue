<template>
	<div>
		<el-row>
			<el-col :span="2">
				<div class="restaurant_logo">
					<img :src="order.image" width="70" height="70" alt="">
				</div>
			</el-col>

			<el-col :span="6">
				<div class="restaurant_intro">
					<span>{{order.title}}</span>
				</div>
			</el-col>

			<el-col :span="6">
				<span>{{order.time}}</span>
			</el-col>

			<el-col :span="5">
				<span>¥{{order.price}}</span>
			</el-col>

			<el-col :span="4">
				<div class="state">
					<span>{{order.state}}</span>
					<br>
					<span>
						<el-button size="mini" @click="gotoDetail">详情</el-button>
						<el-button v-if="order.state == '待付款'" size="mini" type="primary" @click="payDialogVisible = true">付款</el-button>
						<el-button v-if="order.state == '商家已接单'" size="mini" type="primary">确认收货</el-button>
						<el-button v-if="order.state != '待付款' && order.state !='支付超时' && order.state != '已送达' && order.state != '已退款'" type="danger" size="mini" @click="refundDialogVisible = true">退款</el-button>
					</span>
				</div>
			</el-col>
		</el-row>

		<el-dialog
			title="付款"
			:visible.sync="payDialogVisible"
			width="36%"
            :before-close="handleClose">
            <h2>您的订单总额为{{order.price}}元</h2>
            <el-button @click="payDialogVisible = false">取消</el-button>
            <el-button type="success" @click="pay">确认支付</el-button>
        </el-dialog>

        <el-dialog
        	title="退款"
        	:visible.sync="refundDialogVisible"
        	width="36%"
        	:before-close="handleClose">
        	<h2>确定要退款吗?</h2>
        	<el-button @click="refundDialogVisible = false">取消</el-button>
            <el-button type="success" @click="refund">确认</el-button>
        </el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'orderBanner',
		props: ['order'],
		data() {
			return {
				payDialogVisible: false,
				refundDialogVisible: false
			}
		},
		computed: {
			detail_url() {
				var currentUrl = self.location.href + '/order/'
				currentUrl += this.order.orderId
				return currentUrl
			}
		},
		methods: {
			gotoDetail() {
				console.log(this.order.orderId)
				this.$router.push({name: 'order', params: {orderId: this.order.orderId}})
			},
			pay() {
				let param = new URLSearchParams()
				param.append('orderId', this.order.orderId)
				this.axios.post('http://localhost:8080/payForOrder', param).then(response => {
					//console.log(response);
					if (response.data.code == 11125) {
						this.$message('余额不足，请先充值')
					} else {
						this.$emit('orderPayed', this.order.orderId)
						this.payDialogVisible = false
						this.$message('付款成功')
					}
					

				})
			},

			refund() {
				let param = new URLSearchParams()
				param.append('orderId', this.order.orderId)
				this.axios.post('http://localhost:8080/refund', param).then(response => {
					this.$emit('orderRefund', this.order.orderId)
					this.refundDialogVisible = false
					this.$message('退款成功')
				})
			},

			handleClose(done) {
                this.$confirm('确认关闭？')
                  .then(_ => {
                    done();
                  })
                  .catch(_ => {});
            },
		}

	}
</script>

<style>
	.restaurant_intro {
		float: left;
		margin-left: 60px;
	}

	.order_detail {
		font-size: 8px;
	}

	.state {
		position: absolute;
		top: -8px;
		text-align: left;
	}
</style>