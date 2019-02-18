<template>
	<div>
		<!-- <h1> 发布菜品 </h1> -->
		<el-tabs>
			<el-tab-pane label="发布菜品" name="first"></el-tab-pane>
		</el-tabs>
		<el-row> 
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="12">
				<el-form ref="form" :model="form" label-width="90px">

					<el-form-item label="菜品名称">
						<el-input v-model="form.foodName"></el-input>
					</el-form-item>
					<el-form-item label="菜品照片">
						<div id="app">
							<el-upload
								class="upload-demo"
								drag
								:action="this.upload_qiniu_url"
								:show-file-list="false"
								:on-success="handleUploadSuccess"
								:on-error="handleError"
								:before-upload="beforeUpload"
								:data="qiniuData">
								<img v-if="form.imgUrl" :src="form.imgUrl" class="foodImg" width="200" height="200">
								<div v-else class="el-default">
									<i class="el-icon-upload"></i>
									<div class="el-upload_text">将菜品图片拖到此处，或<em>点击上传</em></div>
								</div>
								<!--todo 应该想办法把上传变成点击上传按钮后再上传，而不是自动上传 -->
							</el-upload>
						</div>
					</el-form-item>

					<el-form-item label="单价">
						<el-input v-model="form.price"> </el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="onSubmit">确认发布</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="11">&nbsp;</el-col>
		</el-row>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				form: {
					foodName: '',
					price: '',
					imgUrl: '',
					restaurantId: ''
				},
				qiniuData: {
					key: "",
					token: ""
				},
				token: '',
				upload_qiniu_url: 'http://upload.qiniu.com/', 
		        upload_qiniu_addr: 'http://plu6c3si4.bkt.clouddn.com',
		        accept: 'image/png, image/jpeg, image/gif, image/jpg, image/bmp',
			}
		},
		methods: {
			beforeUpload(file) {
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

			handleUploadSuccess(res, file) {
				this.imgUrl = this.upload_qiniu_addr + '/' +  res.key
				
			},

			onSubmit() {
				this.form.restaurantId = this.$route.params.id
				this.axios.post("http://localhost:8080/releaseFood", this.form).then(response => {
					console.log(response)
				}).catch(err => {
					console.log(err)
				})

			},

			handleError() {
				this.$message({
					message: '上传失败',
					duration: 2000,
					type: 'warning'
				})
			},

			placeToken() {
            this.axios.post("http://localhost:8080/getToken").then(response => {
                this.token = response.data
                this.qiniuData.token = response.data
            }).catch(err => {
                console.log(err)
            })
        }
		},

		mounted() {
			this.placeToken()
		}
	}
</script>