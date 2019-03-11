<template>
    <section class="login">
        <el-row class="login-main">
            <el-col :span="9" class="login-logo">
                <div>
                    <v-icon icon-class="logo"></v-icon>
                    <h1>Act Now</h1>
                </div>
            </el-col>
            <el-col :span="15" class="login-form">
                <h3>CMS 登录</h3>
                <el-form ref="login" :model="updata" :rules="rules">
                    <el-form-item prop="email">
                        <el-input placeholder="请输入登录邮箱" v-model="updata.email"><v-icon slot="prefix" icon-class="user" class="email"></v-icon></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd">
                        <el-input placeholder="请输入密码" v-model="updata.pwd"><v-icon slot="prefix" icon-class="password" class="pwd"></v-icon></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" class="login-form-btn" @click="onSubmit">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'Login',
        data() {
            const checkEmail = (rule, value, callback) => {
                    if (!this.Tool.regs(value, 'isEmail')) {
                        return callback('邮箱格式不正确, 请核对！');
                    } else {
                        return callback();
                    }
            }
            return {
                updata: {
                    email: '',
                    pwd: ''
                },
                rules: {
                    email: [{ required: true, message: '请输入登录邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }],
                    pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
                },
                redirect: ''
            }
        },
        watch: {
            $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
            }
        },
        methods: {
            ...mapActions(['aLogin']),
            // 点击登录
            onSubmit() {
                this.$refs.login.validate(v => {
                    if(v) {
                        this.$message({ message: '登录成功', type: 'success' });
                        window.localStorage.setItem('token', 'testing');
                        this.$router.push({ path: this.redirect || '/' })
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
        background: linear-gradient(0deg, #414141 0, #373636);
        box-shadow: inset 0 2px 10px #aaa;
        overflow: hidden;
        &-main {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 600px;
            height: 350px;
            border-radius: 3px;
            // background-color: #373636;
            background-color: #eee;
            box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
            overflow: hidden;
        }
        &-logo {
            position: relative;
            height: 100%;
            border-right: 1px solid #d5d2d0; 
            div {
                position: absolute;
                left: 0;
                right: 0;
                margin: 100px auto;
                font-size: 70px;
                color: #3eaf7c;
                text-align: center;
                h1 {
                    text-align: center;
                    color: #ff9900;
                    font-size: 24px;
                    font-style: italic;
                }
            }
        }
        &-form {
            position: relative;
            height: 100%;
            padding: 15px 30px;
            h3 {
                text-align: center;
                font-size: 20px;
                padding-top: 30px; 
                line-height: 60px;
                color: #373636;
                font-weight: 500;
            }
            svg {
                color: #888;
                &.email {
                    font-size: 24px;
                    vertical-align: -8px;
                }
                &.pwd {
                    font-size: 16px;
                    vertical-align: -4px;
                    padding-left: 4px; 
                }
            }
            &-btn {
                width: 100%;
                letter-spacing: 3px;
            }
        }
    }
</style>
