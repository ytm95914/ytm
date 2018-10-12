<template>
    <section class="login-container">
        <transition name="form-fade" mode="in-out">
            <el-form class="login-form" autoComplete="on"  :model="loginForm" :rules="rules"  ref="loginForm" label-position="left" v-show="showLogin">
                <div class="title-container">
                    <img src="../../assets/login-logo.png" alt="">
                </div>
                <el-form-item prop="username">
                    <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" @focus="focus('user')" @blur="blurs('user')"/>
                    <span class="svg-container" :class="userstate?'svg-container_user':''">
                        <svg-icon icon-class="login-user"/>
                    </span>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" @focus="focus('password')" @blur="blurs('password')"/>
                    <span class="svg-container" :class="passwordstate?'svg-container_password':''">
                        <svg-icon icon-class="login-password" />
                    </span>
                </el-form-item>

                <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
            </el-form>
        </transition>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/24
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    import { logout } from '@/api/login'
    import { checkUsername,checkPassword } from '@/utils/validate/loginValidate'
    import { encrypt } from '@/utils/validate/validate'
    import Tempache from '@/utils/tempcache'
    import comm from '@/utils/comm'

    export default {
        name: "Login",
        data(){
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{ required: true, trigger: 'blur', validator: checkUsername }],
                    password: [{ required: true, trigger: 'blur', validator: checkPassword }],
                },
                loading: false,
                showLogin:false,
                userstate:false,
                passwordstate:false,
                submitData:{}
            }
        },
        methods:{
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.submitData = {
                            username: this.loginForm.username.trim(),
                            password: (encrypt(this.loginForm.password)),
                            randomStr: new Date().getTime(),
                            grant_type: 'password',
                            scope: 'server'
                        };
                        this.$store.dispatch('LoginByUsername', this.submitData).then(() => {
                            this.loading = false;
                            this.$router.push({ path: '/attendance/myattendance' })
                        }).catch((error) => {
                            if(error.response){
                                let state = error.response.status;
                                if(state==401 || state==400 || state==500){
                                    comm.warnRemid(this,'用户名或密码错误');
                                    this.loginForm = {};
                                }else{
                                    this.$router.push({ path: '/error' })
                                }
                                this.loading = false;
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false
                    }
                })
            },
            focus(val){
                val == 'user' ? this.userstate = true:this.passwordstate = true
            },
            blurs(val){
                val == 'user' ? this.userstate = false:this.passwordstate = false
            }
        },
        mounted(){
            this.showLogin = true;
            let param = Tempache.getItem('whetherFirstLogin');
            if(param=='logout'){
                comm.successRemid(this,'退出成功！');
                Tempache.setItem('whetherFirstLogin','login')
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/login/login.scss';
</style>

<style rel="stylesheet/scss" lang="scss">
    /* reset element-ui css */
    .login-container {
        .el-input__inner{
            border:0px;
            padding:0px;
        }
    }
</style>
