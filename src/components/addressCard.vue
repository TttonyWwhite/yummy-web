<template>
	<div>
		<el-card shadow="hover">
			<el-row>
				<el-col :span="15">
					<span class="info">{{addressInfo.contactName}}</span>
				</el-col>
				<el-col :span="2">
					<span class="change" @click="modify">修改</span>
				</el-col>
				<el-col :span="6">
					<span class="change">删除</span>
				</el-col>
			</el-row>

			<el-row>
				<span class="info">{{addressInfo.address}}</span>
			</el-row>
			<el-row>
				<span class="info">{{addressInfo.phoneNumber}}</span>
			</el-row>
		</el-card>

		<el-dialog
			title="编辑地址"
			:visible.sync="modifyVisible"
			width="30%">
			<el-form :model="addressInfo">
				<!-- <el-form-item label="地址编号" label-width="80px">
					<el-input v-model="addressInfoDummy.addressId" :disabled="true"></el-input>
				</el-form-item> -->
				<el-form-item label="姓名" label-width="80px">
					<el-input v-model="addressInfoDummy.contactName"></el-input>
				</el-form-item>
				<el-form-item label="地址" label-width="80px">
					<el-input v-model="addressInfoDummy.address"></el-input>
				</el-form-item>
				<el-form-item label="手机号" label-width="80px">
					<el-input v-model="addressInfoDummy.phoneNumber"></el-input>
				</el-form-item>
			</el-form>

			<el-button type="primary" @click="save">保存</el-button>
			<el-button @click="cancel">取消</el-button>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'addressCard',
		props: ['addressInfo'],
		data() {
			return {
				modifyVisible: false,
				addressInfoDummy: {}
			}
		},
		methods: {
			modify() {
				this.modifyVisible = true
			},
			cancel() {
				this.modifyVisible = false
			},
			save() {
				this.axios.post('http://localhost:8080/modifyAddress', this.addressInfoDummy).then(response => {
					console.log(response)
					//this.addressInfo = JSON.parse(JSON.stringify(this.addressInfoDummy))
					this.$emit("addressInfoChange", this.addressInfoDummy)
					this.modifyVisible = false
				})
			}
		},
		mounted() {
			//深拷贝addressInfo,防止未保存的修改引起的错误
			this.addressInfoDummy = JSON.parse(JSON.stringify(this.addressInfo))
		},

	}
</script>

<style>
	.change {
		color: grey;
		font-size: 9px;
		float: top;
	}

	.change:hover {
		color: blue;
	}

	.info {
		float: left;
		margin-left: 20px;
	}
</style>