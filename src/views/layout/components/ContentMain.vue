<template>
    <section class="main-container">
        <!--<Breadcrumb></Breadcrumb>-->
        <transition name="fade-transform" mode="out-in">
            <!--<keep-alive :include="cachedViews">-->
                <router-view></router-view>
            <!--</keep-alive>-->
        </transition>
        <!--loading-->
        <Loading v-show="getLoading"></Loading>

        <!--导入考勤-->
        <AttendanceImport> </AttendanceImport>

    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/25
     * @desc 主要内容部分main
     */

    import Breadcrumb from '@/components/Breadcrumb'
    import Loading from '@/components/Loading'
    import AttendanceImport from './Sidebar/AttendanceImport'
    import { mapGetters,mapActions } from 'vuex'

    export default {
        name: 'ContentMain',
        components:{
            Breadcrumb,
            Loading,
            AttendanceImport
        },
        computed:{
            ...mapGetters([
                'getLoading'
            ])
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    // 主体区域
    .main-container {
        transition: margin-left .28s;
        height: 100%;
        // border: 1px solid #f00;
        padding: 20px;
        overflow: auto;
        margin-left: 250px;
        margin-top: 70px;
    }
</style>

