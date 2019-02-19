<template>
	<div>
		<el-row>
			<el-col :span="1">
				&nbsp;
			</el-col>
			<el-col :span="12">
				<el-form ref="form" :model="form" label-width='90px'>
					<el-form-item label="餐厅名称">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="餐厅地址">
						<div id="g-wrapper" v-hljs>
			            <div class="m-part">
			                <mapDrag @drag="dragMap" class="mapbox"></mapDrag>
			            </div>
			                <span>地址：{{ dragData.address }}</span>
			            </div>
					</el-form-item>

					<el-form-item label="招牌图片">
		            <div id="app">
		                <el-upload 
		                    class="upload-demo"
		                    drag
		                    :action="this.upload_qiniu_url"
		                    :show-file-list="false"
		                    :on-success="handleAvatarSuccess"
		                    :on-error="handleError"
		                    :before-upload="beforeAvatarUpload"
		                    :data="qiniuData">
		                    <img v-if="imgUrl" :src="imgUrl" class="avatar">
		                    <div v-else class="el-default">
		                        <i class="el-icon-upload"></i>
		                        <div class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
		                    </div>
		                    <div class="el-upload_tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
		                </el-upload>
		            </div>
		          </el-form-item>

		          <el-form-item label="餐厅类型">
		            <el-checkbox-group v-model="form.type">
		              <el-checkbox label="美食" name="type"></el-checkbox>
		              <el-checkbox label="快餐便当" name="type"></el-checkbox>
		              <el-checkbox label="特色菜系" name="type"></el-checkbox>
		              <el-checkbox label="异国料理" name="type"></el-checkbox>
		              <el-checkbox label="小吃夜宵" name="type"></el-checkbox>
		              <el-checkbox label="甜品饮品" name="type"></el-checkbox>
		            </el-checkbox-group>
		          </el-form-item>

		          <el-form-item label="负责人电话">
		            <el-input v-model="form.phoneNumber"></el-input>
		          </el-form-item>

		          <el-form-item>
		            <el-button type="primary" @click="onSubmit">提交修改申请</el-button>
		            <el-button>取消</el-button>
		          </el-form-item>
				</el-form>
			</el-col>

			<el-col :span="6">
				&nbsp;
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import mapDrag from '../components/mapDrag'
	function sleep(time) {
	  return new Promise((resolve) => setTimeout(resolve, time));
	}
	export default {
		components: {
			mapDrag
		},

		data() {
			return {
				form: {
		          name: '',
		          type: [],
		          phoneNumber: '',
		        },
		        dragData: {
		         lng: null,
		         lat: null,
		         address: null,
		         nearestJunction: null,
		         nearestRoad: null,
		         nearestPOI: null
		        },
		        qiniuData: {
		            key: "",
		            token: ""
		        },
		        imgUrl: "",
		        upload_qiniu_url: 'http://upload.qiniu.com/', 
		        upload_qiniu_addr: 'http://plu6c3si4.bkt.clouddn.com',
		        accept: 'image/png, image/jpeg, image/gif, image/jpg, image/bmp',
			}
		},

		methods: {
			placeToken() {
	            this.axios.post("http://localhost:8080/getToken").then(response => {
	                //console.log(response.data)
	                this.token = response.data
	                this.qiniuData.token = response.data
	            }).catch(err => {
	                console.log(err)
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

		    beforeAvatarUpload(file) {
		        this.qiniuData.key = file.name
		        const isJPG = file.type === "image/jpeg";
		        const isPNG = file.type === "image/png";
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG && !isPNG) {
		            this.$message.error("图片只能是 JPG/PNG 格式!");
		            return false;
		        }
		        if (!isLt2M) {
		            this.$message.error("图片大小不能超过 2MB!");
		            return false;
		        }
		    },

		    handleAvatarSuccess(res, file) {
		         this.imgUrl = this.upload_qiniu_addr + '/' +  res.key
		        // this.showImg = true;
		    
		        console.log(this.imgUrl);
		    },

		    handleError(res) {
		        this.$message({
		            message: '上传失败',
		            duration: 2000,
		            type: "warning"
		        });
		    },

		    onSubmit() {
		    	console.log("this is id" + this.$route.params.id)
		    	this.axios.post('http://localhost:8080/updateRestaurant', {
		    		restaurantId: this.$route.params.id,
		    		shopName: this.form.name,
		    		address: this.dragData.address,
		    		lng_lat: this.dragData.lng + ',' + this.dragData.lat,
		    		imgUrl: this.imgUrl,
		    		type: this.form.type.toString(),
		    		phoneNumber: this.form.phoneNumber
		    	}).then(response => {
		    		this.$message('修改申请已经提交, 请等待管理员批准')
		    		sleep(1500).then(() => {
		              location.reload()
		            })
		    	})
		    }
		},
		created() {
			this.placeToken()
		}
	}
</script>

<style>
    .el-row {
        text-align: left;
    }
    body{ margin: 0; }
.page-header{
  color: #fff; text-align: center; background: #159957;
  background-image: -webkit-linear-gradient(330deg,#155799,#159957);
  background-image: linear-gradient(120deg,#155799,#159957);
  padding: 3rem 4rem; margin-bottom: 30px;
}
.page-header h1{ margin: 0; font-size: 40px; }
.page-header p{ color: #ccc; margin: 0; margin-bottom: 30px; }
.page-header a{ display: inline-block; border: 1px solid #fff; margin-right: 10px; line-height: 40px; padding: 0 20px; border-radius: 4px; color: #fff; text-decoration: none; transition: all .3s; }
.page-header a:hover{ background: #fff; color: #333; }
.g-wraper{ width: 1000px; margin: 0 auto; color: #666; font-size: 16px; line-height: 30px; }
.m-part{ margin-bottom: 30px; }
.m-part::after{ content: ''; display: block; clear: both; }
.m-part .title{ font-size: 30px; line-height: 60px; margin-bottom: 10px; color: #333; }
.m-part .mapbox{ width: 600px; height: 400px; margin-bottom: 20px; float: left; }
.m-part .info{ margin: 0; padding: 0; list-style: none; line-height: 30px; margin-left: 620px; }
.m-part .info span{ display: block; color: #999; }
.m-part ol{ line-height: 40px; margin-left: 0; padding-left: 0; }
.m-part pre{ padding: 10px 20px; line-height: 30px; border-radius: 3px; box-shadow: 0 0 15px rgba(0,0,0,.5); }
.m-footer{ background: #eee; line-height: 60px; text-align: center; color: #999; font-size: 12px; }
.m-footer a{ margin:  0 5px; color: #999; text-decoration: none; }
</style>
