<template>
    <el-scrollbar wrapClass="scrollbar-wrapper" class="sidebar-container">
        <el-menu
            mode="vertical"
            :show-timeout="200"
            :default-active="$route.path"
            text-color="#54667A"
            background-color="#F2F7F8"
            active-text-color="#11A0F8" >
            <sidebar-item :routes="permission_routers"></sidebar-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/25
     * @desc 侧导航父亲组件
     */

    import { mapGetters } from 'vuex'
    import SidebarItem from './SidebarItem'

    export default {
        components: {
            SidebarItem
        },
        computed: {
            ...mapGetters([
                'permission_routers'
            ])
        },
        mounted(){

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    // 侧边栏
    .sidebar-container {
        width: 250px;
        transition: width 0.28s;
        height: 90%;
        position: fixed;
        top: 72px;
        bottom: 0;
        left: 0;
        z-index: 99;
        overflow: hidden;
        //reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }

        .is-horizontal {
            display: none;
        }
        a {
            display: inline-block;
            width: 100%;
            overflow: hidden;
        }
        .svg-icon {
            margin-right: 16px;
        }
        .el-menu {
            border: none;
            height: 100%;
            width: 100% !important;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" >
    .sidebar-container{
        .scrollbar-wrapper {
            overflow-x: hidden;
        }
    }
</style>
