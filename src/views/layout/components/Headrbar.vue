<template>
    <section class="headerbar">
            <aside class="logo">
                <img src="@/assets/logo.png" alt="logo">
            </aside>
            <div class="right-menu">
                <el-dropdown class="avatar-container right-menu-item" trigger="">
                    <div class="avatar-wrapper">
                        <img class="user-avatar" src="@/assets/default.jpg">
                        <span>{{userInfo.name}}</span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <router-link to="/">
                            <el-dropdown-item>
                                首页
                            </el-dropdown-item>
                        </router-link>
                        <a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
                            <el-dropdown-item>
                                个人中心
                            </el-dropdown-item>
                        </a>
                        <el-dropdown-item divided>
                            <span style="display:block;">退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="exit-wrapper" style="display: inline-block;" @click="logout">
                    <svg-icon icon-class="poweroff" />
                    <span>退出</span>
                </div>
            </div>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/25
     * @desc 头部组件header
     */
    import { mapGetters,mapActions } from 'vuex'
    import Tempache from '@/utils/tempcache'
    import comm from '@/utils/comm'

    export default {
        name:'headerbar',
        data(){
            return {
                userInfo:{
                    name:''
                }
            }
        },
        methods:{
            logout(){
                this.LogOut();
            },
            ...mapActions(['LogOut']),
        },
        mounted(){
            let userInfo = Tempache.getItem('userInfo');
            this.userInfo.name = userInfo.realname;
            let param = Tempache.getItem('whetherFirstLogin');
            if(param=='login'){
                comm.successRemid(this,'登录成功！');
                Tempache.setItem('whetherFirstLogin','logout')
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .headerbar {
        height:70px;
        vertical-align: middle;
        border-bottom: 2px solid #E9F1F3;
        position: fixed;
        width:100%;
        background: #fff;
        top: 0;
        left: 0;
        z-index: 99;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .breadcrumb-container{
            float: left;
        }
        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }
        .logo{
            width:200px;
            height:70px;
            display: inline-block;
            position: relative;
            margin-left:40px;margin-top:5px;
            img{
                position: absolute;
                top: 50%;
                margin-top: -25px;
                cursor:pointer;
            }
        }
        .right-menu {
            float: right;
            height:70px;
            margin-right:40px;
            margin-top:10px;
            &:focus{
                outline: none;
            }
            .right-menu-item {
                display: inline-block;
                margin: 0 8px;
            }
            .screenfull {
                height: 20px;
            }
            .international{
                vertical-align: top;
            }
            .theme-switch {
                vertical-align: 15px;
            }
            .avatar-container {
                height: 50px;
                .avatar-wrapper {
                    cursor: pointer;
                    /*margin-top: 5px;*/
                    position: relative;
                    display: inline-block;
                    .user-avatar {
                        width: 32px;
                        height: 32px;
                        border-radius: 32px;
                        vertical-align: middle;
                    }
                    .el-icon-caret-bottom {
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
            .exit-wrapper{
                cursor: pointer;
                display: inline-block;
                font-size:14px;
                color: #A6AFBB;
                letter-spacing: 0;
                line-height: 48px;
            }
        }
    }
</style>
