<template>
    <section class="data-picker">
        <span>申请日期：</span>
        <el-date-picker v-model="startTime" type="date" placeholder="选择日期" style="width:138px" :editable=false :picker-options="pickerBeginDateBefore">
        </el-date-picker>
        <p style="display:inline-block;font-size:14px">至</p>
        <el-date-picker v-model="endTime" type="date" placeholder="选择日期" style="width:138px" :editable=false :picker-options="pickerBeginDateAfter">
        </el-date-picker>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/9/7
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    import commdate from '@/utils/commdate'
    export default {
        name: "DatePicker",
        data(){
            return {
                startTime:'',
                endTime: '',
                // 请假开始时间不能大于结束时间
                pickerBeginDateBefore: {
                    disabledDate: time => {
                        let beginDateVal = this.endTime;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                pickerBeginDateAfter: {
                    disabledDate: time => {
                        let beginDateVal = this.startTime;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                }
            }
        },
        mounted(){
            this.endTime = new Date();
            this.startTime = this.endTime.getFullYear()+'-'+(this.endTime.getMonth()+1)+'-01'
        },
        watch:{
            startTime(val){
                this.$emit("startTime",commdate.timestampToTime(val))
            },
            endTime(val){
                this.$emit("endTime",commdate.timestampToTime(val))
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .data-picker{
        float:left;
        color:#333;
        font-size:12px;
        input{
            font-size: inherit;
        }
    }
</style>
