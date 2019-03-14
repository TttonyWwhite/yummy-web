<template>
    <div>
        <el-row>
            <el-col :span="1">
                &nbsp;
            </el-col>
            <el-col :span="12">
                <h2>修改内容</h2>
                <el-form ref="form" :model="form" label-width="90px">
                    <el-form-item label="餐厅名称">
                        <el-input v-model="form.shopName"></el-input>
                    </el-form-item>

                    <el-form-item label="餐厅地址">
                        <el-input v-model="form.address"></el-input>

                    </el-form-item>

                    <el-form-item label="招牌图片">
                        <img :src="form.imgUrl" width="100" height="100">
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

                    <el-form-item label="联系人电话">
                        <el-input v-model="form.phoneNumber"></el-input>
                    </el-form-item>

                </el-form>

                <el-button type="danger" @click="reject">驳回</el-button>
                <el-button type="primary" @click="approve">批准</el-button>
            </el-col>

            <el-col :span="6">
                &nbsp;
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
                form: {
                    shopName: null,
                    address: null,
                    imgUrl: null,
                    type: [],
                    phoneNumber: null
                }
            }
        },

        methods: {
            reject() {
                let param = new URLSearchParams()
                param.append("requestId", this.$route.params.requestId)
                this.axios.post('http://localhost:8080/rejectRequest', param).then(response => {
                    this.$message('已驳回申请')
                    sleep(1500).then(() => {
                        this.$router.push({name: 'checkRequest'})
                    })
                })
            },

            approve() {
                let param = new URLSearchParams()
                param.append("requestId", this.$route.params.requestId)
                this.axios.post('http://localhost:8080/approveRequest', param).then(response => {
                    this.$message('已批准申请')
                    sleep(1500).then(() => {
                        this.$router.push({name: 'checkRequest'})
                    })
                })
            }
        },

        created() {
            let param = new URLSearchParams()
            param.append("requestId", this.$route.params.requestId)

            this.axios.post('http://localhost:8080/getRequest', param).then(response => {
                let data = response.data.data
                this.form = data
                var str = data.type
                var strList = null
                var temp_type = []

                if (str.includes(",")) {
                    strList = str.split(",")
                    for (var i = 0;i < strList.length;i++ ) {
                        temp_type.push(strList[i])
                    }
                } else {
                    temp_type.push(str)
                }

                this.form.type = temp_type

            })
        }
    }
</script>