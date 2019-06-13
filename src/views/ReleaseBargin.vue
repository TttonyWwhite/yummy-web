<template>
    <div>
        <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="12">
                <div class="transefer">
                    <el-transfer
                            v-model="value1"
                            :titles="['所有菜品', '套餐菜品']"
                            :button-texts="['删除', '添加']"
                            :data="data">
                    </el-transfer>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="combo_info">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="套餐名">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>

                        <el-form-item label="菜品原价">
                            <el-input v-model="this.originPrice"></el-input>
                        </el-form-item>

                        <el-form-item label="套餐价格">
                            <el-input v-model="form.price"></el-input>
                        </el-form-item>

                        <el-form-item label="套餐图片">
                            <el-upload
                                    class="avatar-upload"
                                    :action="this.upload_qiniu_url"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :data="qiniuData"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="foodImg" width="100" height="100">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div class="submitBtn">
                        <el-button type="primary" @click="submit">确认提交</el-button>
                    </div>
                </div>

            </el-col>
        </el-row>

    </div>
</template>

<script>
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    export default {
        data() {
            return {
                data: [


                ],
                value1: [],
                form: {
                    title: null,
                    price: null
                },
                originPrice: null,
                imageUrl: '',
                token: '',
                upload_qiniu_url: 'http://upload.qiniu.com/',
                upload_qiniu_addr: 'http://ps7ukx8ef.bkt.clouddn.com',
                accept: 'image/png, image/jpeg, image/gif, image/jpg, image/bmp',
                qiniuData: {
                    key: "",
                    token: ""
                },
            }
        },

        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = this.upload_qiniu_addr + '/' +  res.key
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
            placeToken() {
                this.axios.post("http://localhost:8080/getToken").then(response => {
                    this.token = response.data
                    this.qiniuData.token = response.data
                }).catch(err => {
                    console.log(err)
                })
            },
            submit() {
                this.axios.post('http://localhost:8080/releaseFood', {
                    foodName: this.form.title,
                    price: this.form.price,
                    imgUrl: this.imageUrl,
                    restaurantId: this.$route.params.id
                }).then(response => {
                    this.$message('套餐发布成功')
                    sleep(2000).then(() => {
                        location.reload()
                    })
                })
            }
        },

        created() {
            this.placeToken()
            let param = new URLSearchParams()
            param.append('restaurantId', this.$route.params.id)

            this.axios.post('http://localhost:8080/getFoods', param).then(response => {
                console.log(response)
                let data = response.data.data
                for (var i = 0;i < data.length;i++) {
                    var disable = false
                    if (data[i].title.includes('套餐')) {
                        disable = true
                    }

                    let temp = {key: data[i].id, label: data[i].title, price: data[i].price, disabled: disable}
                    this.data.push(temp)
                }
            })
        },

        watch: {
            value1: function(newData, oldData) {
                var op = 0;
                for (var i = 0;i < newData.length;i++) {
                    for (var j = 0;j < this.data.length;j++) {
                        if (newData[i] == this.data[j].key) {
                            op += this.data[j].price
                        }

                    }
                }
                this.originPrice = op;
            }
        }
    }
</script>

<style>
    .el-transfer-panel {
        text-align: left;
        display: inline-block;
    }

    .combo_info {
        float: left;
    }

    .transefer {
        float: left;
        margin-left: 40px;
    }

    .submitBtn {
        margin-left: 90px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>