<template>
    <section>
        <PubattendanceTitle :BtnPermission="BtnPermission" />
        <PubattendanceTable :BtnPermission="BtnPermission" />
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/30
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */
    import PubattendanceTitle from './components/PubattendanceTitle.vue'
    import PubattendanceTable from  './components/PubattendanceTable.vue'
    import TempCache from '@/utils/tempcache'

    export default {
        name: "MyAttendance",
        data(){
            return {
                BtnPermission: []
            }
        },
        components:{
            PubattendanceTitle,
            PubattendanceTable
        },
        mounted(){
            this.BtnPermission = TempCache.getItem('我的考勤');
        }
    }
</script>

<style scoped>

</style>
