<template>
	<div class="card_container">

		<el-card v-if="addressInfo.contactName" shadow="hover">
			<el-row>
				<el-col :span="15">
					<span class="info">{{addressInfo.contactName}}</span>
				</el-col>
				<el-col :span="2">
					<span class="change" @click="modify">修改</span>
				</el-col>
				<el-col :span="6">
					<span class="change" @click="deleteAddress">删除</span>
				</el-col>
			</el-row>

			<el-row>
				<span class="info">{{addressInfo.address}}</span>
			</el-row>
			<el-row>
				<span class="info">{{addressInfo.phoneNumber}}</span>
			</el-row>
		</el-card>

		<el-card v-else shadow="hover">
			<div class="add_card" @click="add">
				<i class="el-icon-plus"></i>
				<p>添加新地址</p>
			</div>
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

		<el-dialog
			title="添加新地址"
			:visible.sync="addVisible"
			width="50%">
			<el-form :model="newAddress">
				<el-form-item label="姓名" label-width="60px">
					<el-input v-model="newAddress.contactName"></el-input>
				</el-form-item>
				<el-form-item label="位置" label-width="60px">
					<el-input v-model="dragData.address"></el-input>
				</el-form-item>
				<el-form-item label="手机号" label-width="60px">
					<el-input v-model="newAddress.phoneNumber"></el-input>
				</el-form-item>
			</el-form>
			<div class="m-part">
                <mapDrag @drag="dragMap" class="mapbox"></mapDrag>
            </div>
			<el-button type="primary" @click="saveAddress">保存</el-button>
			<el-button @click="addVisible=false">取消</el-button>
		</el-dialog>
	</div>
</template>

<script>
	import mapDrag from '../components/mapDrag'
	export default {
		name: 'addressCard',
		props: ['addressInfo'],
		components: {
	        mapDrag
	    },
		data() {
			return {
				modifyVisible: false,
				addVisible: false,
				addressInfoDummy: {},
				newAddress: {
					memberId: this.$route.params.id,
					address: '',
					contactName: '',
					phoneNumber: '',
					lng: 0,
					lat: 0
				},

				dragData: {
		         lng: null,
		         lat: null,
		         address: null,
		         nearestJunction: null,
		         nearestRoad: null,
		         nearestPOI: null
		        },
			}
		},
		methods: {
			modify() {
				this.modifyVisible = true
			},
			deleteAddress() {
				this.$emit("addressInfoDelete", this.addressInfo.addressId)
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
			},
			add() {
				this.addVisible = true
			},

			saveAddress() {
				this.newAddress.lng = this.dragData.lng
				this.newAddress.lat = this.dragData.lat
				this.newAddress.address = this.dragData.address

				this.axios.post('http://localhost:8080/addAddress', this.newAddress).then(response => {
					this.$emit("addressAdded", this.newAddress)
					this.addVisible = false
				})
			},

			dragMap(data) {
		        this.dragData = {
		            lng: data.position.lng,
		            lat: data.position.lat,
		            address: data.address,
		            nearestJunction: data.nearestJunction,
		            nearestRoad: data.nearestRoad,
		            nearestPOI: data.nearestPOI
		        }
		      },
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

	.add_card {
		height: 68px;
	}

	.card_container {
		margin-top: 5px;
	}

	.m-part{ margin-bottom: 30px; }
	.m-part::after{ content: ''; display: block; clear: both; }
	.m-part .title{ font-size: 30px; line-height: 60px; margin-bottom: 10px; color: #333; }
	.m-part .mapbox{ width: 250px; height: 200px; margin-bottom: 20px; margin-left: 70px; }
	.m-part .info{ margin: 0; padding: 0; list-style: none; line-height: 30px; margin-left: 620px; }
	.m-part .info span{ display: block; color: #999; }
	.m-part ol{ line-height: 40px; margin-left: 0; padding-left: 0; }
	.m-part pre{ padding: 10px 20px; line-height: 30px; border-radius: 3px; box-shadow: 0 0 15px rgba(0,0,0,.5); }
	.m-footer{ background: #eee; line-height: 60px; text-align: center; color: #999; font-size: 12px; }
	.m-footer a{ margin:  0 5px; color: #999; text-decoration: none; }
</style>