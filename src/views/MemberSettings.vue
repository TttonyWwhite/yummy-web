<template>
    <div style="margin-left: 20px;background-color: white;height: 100%">
        <div style="margin-right: 20px;margin-left: 20px">
            <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: flex-start">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item style="font-weight: bold;font-size: 16px;margin-top: 10px">我的资料</el-breadcrumb-item>
                    <el-breadcrumb-item style="font-size: 16px;margin-top: 10px">个人资料</el-breadcrumb-item>
                </el-breadcrumb>
                <el-button size="mini" type="danger" style="margin-bottom: -16px;margin-top: 5px" @click="writeOff">注销</el-button>
            </div>
            <div style="margin-top: 10px;border-top: 2px solid #8a8a8a">
                <el-form label-position="right" label-width="80px" style="margin-top: 10px" v-model="info">
                    <el-form-item label="用户名:">
                        <label for="username"></label>
                        <input id="username" :readonly="unchangeable" class="input" v-model="info.username">
                    </el-form-item>
                    <el-form-item label="邮箱:">
                        <label for="email"></label>
                        <input id="email" readonly class="input" v-model="info.email">
                    </el-form-item>
                    <el-form-item label="联系电话:">
                        <label for="phoneNumber"></label>
                        <input id="phoneNumber" :readonly="unchangeable" class="input" v-model="info.phoneNumber">
                    </el-form-item>
                </el-form>
                <el-button v-show="unchangeable" style="margin-left: 10px" type="primary" @click="change">修改信息</el-button>
                <el-button v-show="!unchangeable" type="primary" @click="save">保存修改</el-button>
                <el-button v-show="!unchangeable" type="info" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
    <!--<div>-->
        <!--<el-tabs v-model="activeName">-->
            <!--<el-tab-pane label="个人资料" name="first"></el-tab-pane>-->
        <!--</el-tabs>-->
        <!--<el-form ref="form" :model="memberInfo" label-width="80px">-->
            <!--<el-form-item label="用户名:">-->
                <!--<el-input v-model="memberInfo.memberName" :disabled="this.nameChange" style="width:200px;float:left;"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="注册电话:">-->
                <!--<el-input v-model="memberInfo.phoneNumber" :disabled="this.phoneNumberChange" style="width:200px;float:left;"></el-input>-->
            <!--</el-form-item>-->


        <!--</el-form>-->

        <!--<el-row>-->
            <!--<el-col :span="12">-->
                <!--<div class="btns">-->
                    <!--<el-button type="primary" @click="changeInfo">修改</el-button>-->
                    <!--<el-button type="primary" @click="submitChange">提交</el-button>-->
                <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
                <!--<div class="writeoff_btn">-->
                    <!--<el-button type="danger" @click="alertVisible = true">注销</el-button>-->
                <!--</div>-->
            <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-dialog-->
                <!--title="提示"-->
                <!--:visible.sync="alertVisible"-->
                <!--width="30%">-->
            <!--<div class="writeoff_alert">-->
                <!--<h2>您确定要注销账号吗？</h2>-->
                <!--<el-button type="danger" @click="writeOff">确定</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->

    <!--</div>-->
</template>

<script>
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    import AddressCard from '../components/addressCard'
    import Vue from 'vue'
    export default {
        name: 'memberSettings',
        components: {
            AddressCard
        },
        data() {
            return {
                info:{
                    username:'',
                    phoneNumber: '',
                    email: ''
                },
                unchangeable:true,
                activeName: 'first',
                activeName1: 'first',
                memberInfo: {

                },
                nameChange: true,
                phoneNumberChange: true,
                address: [],
                emptyAddress: {
                    memberId: this.$route.params.id,
                    address: '',
                    contactName: '',
                    phoneNumber: ''
                },
                alertVisible: false

            }
        },
        methods: {
            change () {
                this.unchangeable = false
            },
            cancel () {
                // this.info = JSON.parse(JSON.stringify(this.$store.state.login.information))
                this.unchangeable = true
            },
            save(){
                let member = {
                    memberId: this.$route.params.id,
                    memberName: this.info.username,
                    phoneNumber: this.info.phoneNumber,
                    email: this.info.email
                }
                this.axios.post('http://localhost:8080/modifyInfo', member).then(response => {
                    this.$message('修改成功')
                    this.unchangeable = true
                })
            },
            onInfoChange(val) {
                for(var i = 0;i < this.address.length;i++) {
                    if (this.address[i].addressId == val.addressId) {
                        Vue.set(this.address, i, val)
                    }
                }
            },
            onAdd(val) {
                Vue.set(this.address, this.address.length-1, val)
                Vue.set(this.address, this.address.length, this.emptyAddress) //需要把空的地址重新加上去
            },
            onDelete(val) {

                for (var i = 0;i < this.address.length;i++) {
                    if (this.address[i].addressId == val) {
                        this.address.splice(i, 1)
                    }
                }

                let param = new URLSearchParams()
                param.append("addressId", val);
                this.axios.post('http://localhost:8080/deleteAddress', param).then(response => {
                    this.$message("删除成功")
                })
            },
            changeInfo() {
                this.nameChange = false;
                this.phoneNumberChange = false;
            },
            submitChange() {
                console.log(this.memberInfo)
                this.axios.post('http://localhost:8080/modifyInfo', this.memberInfo).then(response => {
                    this.nameChange = true
                    this.phoneNumberChange = true
                })
            },
            writeOff() {
                let param = new URLSearchParams()
                param.append("memberId", this.$route.params.id)
                this.axios.post('http://localhost:8080/writeOff', param).then(response => {
                    //console.log(response)
                    this.$message('注销成功，即将前往首页')
                    sleep(2000).then(() => {
                        this.$router.push('/')
                    })
                })
            }


        },

        mounted() {
            let param = new URLSearchParams()
            param.append("memberId", localStorage.getItem('ID'))
            this.axios.post('http://localhost:8080/getMemberInfo', param).then(response => {
                this.info.username = response.data.data.memberName
                this.info.phoneNumber = response.data.data.phoneNumber
                this.info.email = response.data.data.email
            })
        }
    }
</script>

<style>
    .btns {
        float: left;
        margin-left: 80px;
    }

    .writeoff_btn {
        float: right;
        margin-right: 130px;
    }

    .writeoff_alert {
        margin-bottom:  30px;
    }
    .input {
        border: none;
        outline: none;
        background: none;
        border-bottom: gainsboro 2px solid;
        width: 300px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        padding: 0 5px;
    }
</style>