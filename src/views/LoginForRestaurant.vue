<template>
    <div class="login_page">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="manage_tip">
                    <p>餐厅后台登陆</p>
                </div>
                <el-form :model="loginForm"  ref="loginForm">
                    <el-form-item prop="restaurantId">
                        <el-input v-model="loginForm.restaurantId" placeholder="餐厅编号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="login">登陆</el-button>
                    </el-form-item>
                </el-form>
                <p class="restaurant_signup" @click="rsignup">即刻加盟</p>
            </section>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "LoginForRestaurant",
        data() {
            return {
                loginForm: {
                    restaurantId: null,
                    password: null
                }
            }
        },
        methods: {
            login() {
                this.axios.post('http://localhost:8080/loginForRestaurant', this.loginForm).then(response => {
                    if(response.data.code === 11120) {
                        //不存在的id
                        this.$message('id不存在,请重新输入')
                    } else {
                        //登陆成功
                        localStorage.setItem("ID", this.loginForm.restaurantId)
                        this.$router.push({name: 'restaurantCenter', params: {id: this.loginForm.restaurantId}})
                    }

                })
            },
            rsignup() {
                this.$router.push('/signUpForRestaurant')
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .login_page{
        height: 100%;
        width: 100%;
        background: url("../assets/background.png") no-repeat;
    }

    .sign_text{
        font-size: 12px;
        float: left;
    }

    .sign_text:hover{
        color: #4286f4;
    }

    .restaurant_signup {
        font-size: 12px;
        float: right;
    }

    .restaurant_signup:hover {
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