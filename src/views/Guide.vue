<template>
    <el-container>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="14" id="left">
                    <h1 id="welcome">Yummy——您的在线订餐平台</h1>
                </el-col>
                <el-col :span="10" id="right">
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
                        </el-form-item>
                    </el-form>
                </el-col>
             </el-row>
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
            form: {
                name: '',
                email: '',
                password: ''
            }
          };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            onSubmit() {
                this.axios.post('http://localhost:8080/signup', this.form).then(response => {
                    console.log(response)
                    //将用户名存到localstorage中
                    //localStroage.setItem("username", this.form.name)
                    console.log(this.form.name)
                    localStorage.setItem("username", this.form.name)
                    //this.$store.dispatch("userLogin", true)
                    this.$router.push('/homepage')
                }).catch((err)=> {
                    console.log("err")
                })
            }
        }
    }
</script>

<style>
    .el-main {
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