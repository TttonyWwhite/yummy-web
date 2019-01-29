<template>
    <el-container>
        <el-main class="guide_main">
            <el-row :gutter="20">
                <el-col :span="16" id="left">
                    <h1 id="welcome">Yummy——您的在线订餐平台</h1>
                    <br><br><br><br>
                    <p>是商家?</p>
                    <el-button type="success" @click="rdialogVisible = true">登陆后台</el-button>
                    <el-button type="success" @click="gotoSignUpForRestaurant">即刻注册加盟</el-button>
                    <el-button type="success" @click="tokenTest">Test</el-button>

                </el-col>
                <el-col :span="8" id="right">
                    <el-form ref="form" :model="form" label-width="80px" label-position="top">
                        <el-form-item label="Username" class="whiteItem">
                            <el-input v-model="form.name" placeholder="Pick a username"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" class="whiteItem" >
                            <el-input v-model="form.email" placeholder="you@example.com"></el-input>
                        </el-form-item>
                        <el-form-item label="Password" class="whiteItem">
                            <el-input v-model="form.password" placeholder="Create a password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item id="sgBtn">
                            <el-button type="success" @click="onSubmit">Sign up for yummy</el-button>
                            <el-button type="success" @click="udialogVisible = true">Sign in</el-button>
                            
                        </el-form-item>
                    </el-form>
                </el-col>
             </el-row>

             <el-dialog
                    title="用户登陆"
                    :visible.sync="udialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-form :model="loginForm" label-position="left">
                        <el-form-item label="Username" :label-width="formLabelWidth">
                            <el-input v-model="loginForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Password" :label-width="formLabelWidth">
                            <el-input v-model="loginForm.password" type="password"></el-input>
                        </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="login">确 定</el-button>
                    </div>
            </el-dialog>

            <el-dialog
                title="商户登陆"
                :visible.sync="rdialogVisible"
                width="30%"
                :before-close="handleClose">
                <el-form :model="rLoginForm" label-position="left">
                    <el-form-item label="RestaurantId" :label-width="formLabelWidth">
                        <el-input v-model="rLoginForm.restaurantId"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" :label-width="formLabelWidth">
                        <el-input v-model="rLoginForm.password" type="password"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="restaurantLogin">登陆</el-button>
                </div>
            </el-dialog>
        </el-main>

        <el-footer>
            <!-- todo 下方信息 -->
        </el-footer>
    </el-container>
    
</template>

<script>
    export default {
        name: 'Guide',
        data() {
          return {
            activeIndex: '1',
            activeIndex2: '1',
            udialogVisible: false,
            rdialogVisible: false,
            form: {
                name: '',
                email: '',
                password: ''
            },
            loginForm: {
                name: '',
                password: ''
            },
            rLoginForm: {
                restaurantId: '',
                password: ''
            },
            formLabelWidth: '120px'
          };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            onSubmit() {
                this.axios.post('http://localhost:8080/signup', this.form).then(response => {
                    //console.log(response)
                    //将用户名存到localstorage中
                    localStorage.setItem("username", this.form.name)
                    // this.$store.dispatch("isLogin", true)
                    // localStorage.setItem("Flag", "isLogin")

                    this.$router.push('/homepage')
                }).catch((err)=> {
                    console.log("err")
                })
            },
            login() {
                this.axios.post('http://localhost:8080/login', this.loginForm).then(response => {
                    console.log(response.data)
                    localStorage.setItem("username", this.loginForm.name)
                    //todo 这个地方需要将用户id放到url中，传到下一个页面
                    //会得到一个token
                    localStorage.setItem("JWT_TOKEN", response.data.token)
                    this.axios.defaults.headers.common['token'] = response.data.token
                    this.$router.push('/homepage')
                }).catch((err) => {
                    
                    console.log("err")
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                  .then(_ => {
                    done();
                  })
                  .catch(_ => {});
            },
            gotoSignUpForRestaurant() {
                this.$router.push('/signUpForRestaurant')
            },
            restaurantLogin() {
                this.axios.post('http://localhost:8080/loginForRestaurant', this.rLoginForm).then(response => {
                    console.log(response)
                    if(response.data.code == 3) {
                        //不存在的id
                        this.$message('id不存在,请重新输入')
                    } else if (response.data.code == 0) {
                        //登陆成功
                        this.$router.push({name: 'restaurant', params: {id: this.rLoginForm.restaurantId}})
                    }
                    
                }).catch(err => {
                    console.log(err)
                })
            },

            tokenTest() {
                this.axios.get('http://localhost:8080/test').then(response => {
                    console.log(response)
                })
            }
        }
    }
</script>

<style>
    .guide_main {
        background-color: #0d78da;
        line-height:40px;
    }

    .el-footer {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    #left {
        text-align: center;
        color: white;
    }

    #right {
        text-align: left;
    }

    #sgBtn {
        text-align: center;
    }

    .whiteItem .el-form-item__label{
        color: white;
    }

</style>