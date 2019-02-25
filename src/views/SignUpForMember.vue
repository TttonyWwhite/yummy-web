<template>
    <div class="login_page">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="manage_tip">
                    <p>会员注册</p>
                </div>
                <el-form :model="form"  ref="form">
                    <el-form-item prop="username">
                        <el-input v-model="form.name" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="form.phoneNumber" placeholder="电话号码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="signup">注册</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SignUpForMember",
        data() {
            return {
                form: {
                    name: null,
                    password: null,
                    email: null,
                    phoneNumber: null
                }
            }
        },

        methods: {
            signup() {
                this.axios.post('http://localhost:8080/signup', this.form).then(response => {
                    if (response.data.code === 11126) {
                        this.$message('邮箱已被注册，请登陆或使用其他邮箱注册')
                    } else {
                        localStorage.setItem("username", this.form.name)
                        this.$message('已发送验证邮件，请查看您的邮箱')
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .login_page{
        background: #324057;
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