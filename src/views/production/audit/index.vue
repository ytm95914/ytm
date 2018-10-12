<template>
    <section class="audit-main">
        <manageDMY></manageDMY>
        <manageAuditDetails></manageAuditDetails>
        <manageAuditEcharts></manageAuditEcharts>
        <AuditTbale></AuditTbale>
        <dayAuditTrend></dayAuditTrend>
    </section>
</template>

<script>
    /**
     * @author
     * @date 2018/9/27
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     */
    import manageDMY from '@/components/DayMonthYear/manageDMY'
    import manageAuditDetails from './components/manageAuditDetails'
    import manageAuditEcharts from './components/manageAuditEcharts'
    import AuditTbale from './components/AuditTbale'
    import dayAuditTrend from './components/dayAuditTrend'
    export default {
        name: "index",
         components: {
            manageDMY,
            manageAuditDetails,
            manageAuditEcharts,
            AuditTbale,
            dayAuditTrend
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .audit-main{

    }
</style>
