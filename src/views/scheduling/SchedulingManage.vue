<template>
    <!-- 主管 组长 排班 -->
    <section class="schedulingmanage">
        <SchedulingButton />
        <SchedulingSwitch />
        <section class="statistics">
            <SchedulingDetail />
            <SchedulingTable />
        </section>
    </section>
</template>

<script>
    /**
     * @author Shumei Zhao
     * @date 2018/7/31
     * @desc [排班管理] 页面
     * @module 组件引用位置
     */

    import SchedulingButton from './components/SchedulingButton'
    import SchedulingSwitch from './components/SchedulingSwitch'
    import SchedulingDetail from './components/SchedulingDetail'
    import SchedulingTable from './components/SchedulingTable'

    export default {
        name: "schedulingmanage",
        components: {
            SchedulingButton,
            SchedulingSwitch,
            SchedulingDetail,
            SchedulingTable
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "@/styles/scheduling/schedulingmanage.scss";
</style>
