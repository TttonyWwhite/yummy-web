<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="个人资料" name="first"></el-tab-pane>
		</el-tabs>
		<el-form ref="form" :model="memberInfo" label-width="80px">
			<el-form-item label="用户名:">
				<el-input v-model="memberInfo.memberName" :disabled="this.nameChange" style="width:200px;float:left;"></el-input>
			</el-form-item>
			<el-form-item label="注册电话:">
				<el-input v-model="memberInfo.phoneNumber" :disabled="this.phoneNumberChange" style="width:200px;float:left;"></el-input>
			</el-form-item>


		</el-form>

		<el-row>
			<div class="btns">
				<el-button type="primary" @click="changeInfo">修改</el-button>
				<el-button type="primary" @click="submitChange">提交</el-button>
			</div>
		</el-row>

		<el-tabs v-model="activeName1">
			<el-tab-pane label="地址管理" name="first"></el-tab-pane>
		</el-tabs>

		<div class="address_container">
			<el-row :gutter="12">
				<!-- <el-col :span="8">
					<AddressCard :addressInfo="addressInfo"></AddressCard>
				</el-col> -->
				<!-- <AddressCard v-for="item in address" :addressInfo="item"></AddressCard> -->
				<el-col :span="8" v-for="(item, index) in address" :key="item.addressId">
					<AddressCard :addressInfo="item" @addressInfoChange="onInfoChange"></AddressCard>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import AddressCard from '../components/addressCard'
	import Vue from 'vue'
	export default {
		name: 'memberSettings',
		components: {
			AddressCard
		},
		data() {
			return {
				activeName: 'first',
				activeName1: 'first',
				memberInfo: {

				},
				nameChange: true,
				phoneNumberChange: true,
				address: []
			}
		},
		methods: {
			onInfoChange(val) {
				for(var i = 0;i < this.address.length;i++) {
					if (this.address[i].addressId == val.addressId) {
						Vue.set(this.address, i, val)
					}
				}
			},
			changeInfo() {
				this.nameChange = false;
				this.phoneNumberChange = false;
			},
			submitChange() {
				console.log(this.memberInfo)
				this.axios.post('http://localhost:8080/modifyInfo', this.memberInfo).then(response => {
					console.log(response)
					this.nameChange = true
					this.phoneNumberChange = true
				})
			}
		},

		mounted() {
			let param = new URLSearchParams()
			param.append("memberId", localStorage.getItem('ID'))
			this.axios.post('http://localhost:8080/getMemberInfo', param).then(response => {
				
				this.memberInfo = response.data.data
				this.address = response.data.data.addresses
			})
		}
	}
</script>

<style>
	.btns {
		float: left;
		margin-left: 80px;
	}
</style>