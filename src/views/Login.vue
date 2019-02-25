<template>
    <div class="login_page">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p>Yummy在线订餐平台</p>
                </div>
                <el-form :model="loginForm"  ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.name" placeholder="用户名"><span>dsfsf</span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="login">登陆</el-button>
                    </el-form-item>
                </el-form>
                <p class="sign_text" @click="signup">没有账号，立即注册</p>
                <p class="restaurant_login" @click="rsignin">餐厅登陆</p>
            </section>
        </transition>
    </div>
</template>


<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    name: '',
                    password: '',
                },
                showLogin: false
            }
        },
        mounted() {
            this.showLogin = true
        },
        methods: {
            login() {
                this.axios.post('http://localhost:8080/login', this.loginForm).then(response => {
                    if (response.data.code === 11111) {
                        this.$message("用户不存在")
                    } else if (response.data.code === 11112) {
                        this.$message("密码错误")
                    } else if (response.data.code === 11113) {
                        this.$message("用户已注销")
                    } else {
                        localStorage.setItem("username", this.loginForm.name)
                        //todo 这个地方需要将用户id放到url中，传到下一个页面
                        //会得到一个token
                        localStorage.setItem("JWT_TOKEN", response.data.data.token)
                        localStorage.setItem("ID", response.data.data.member.memberId)
                        this.axios.defaults.headers.common['token'] = response.data.data.token
                        this.$router.push({name: 'homepage', params: {id: response.data.data.member.memberId}})
                    }

                })
            },

            signup() {
                this.$router.push('signUpForMember')
            },
            rsignin() {
                //跳转前往餐厅登陆界面
                this.$router.push('LoginForRestaurant')
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .login_page{
        background: #324057;
    }

    .sign_text{
        font-size: 12px;
        float: left;
    }

    .sign_text:hover{
        color: #4286f4;
    }

    .restaurant_login{
        font-size: 12px;
        float: right;
    }

    .restaurant_login:hover{
        color: #4286f4;
    }

    .manage_tip{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 34px;
            color: #324057;
        }
    }
    .form_contianer{
        .wh(320px, 210px);
        .ctp(320px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
</style>