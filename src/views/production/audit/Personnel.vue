<template>
    <section class="personnel-main">
        <personnelDMY></personnelDMY>
        <personnelAuditDetails></personnelAuditDetails>
        <personnelAuditEcharts></personnelAuditEcharts> 
        <AuditTaleSingle></AuditTaleSingle>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/9/29
     * @desc 员工
     * @module 组件引用位置
     *      1.
     */
	
    import personnelDMY from '@/components/DayMonthYear/personnelDMY'
    import personnelAuditDetails from './components/personnelAuditDetails'
    import personnelAuditEcharts from './components/personnelAuditEcharts'
    import AuditTaleSingle from './components/AuditTaleSingle'
    export default {
        name: "personnel",
         components: {
          personnelDMY,
          personnelAuditDetails,
          personnelAuditEcharts,
          AuditTaleSingle
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
