<template>
    <section class="block">
        <el-pagination
            @current-change="handleCilck"
            :current-page.sync="currentPage"
            layout="prev, pager, next,slot"
            :total="total"
            :page-size="pagesize">
            <div class="jumpBox">
                <span>前往</span>
                <input type="text" v-model="value" @keyup.enter="jumpPage" >
                <span style="min-width:20px">页</span>
                <span class="myscal" @click="jumpPage">GO</span>
            </div>
        </el-pagination>
    </section>
</template>

<script>

    /**
     * @author Lindong Ding
     * @date 2018/9/11
     * @desc 全局公共翻页器 [ 该组件谁需要应用的时候在下面留下信息 ]
     * @params 参数信息
     *      1.totalPages [共多少页pages]
     *      2.total [共多少条数据total]
     *      3.currentPages [显示的页码值]
     *
     * @config 配置信息
     *      1.handleCilck() 任意翻页触发事件
     *          向父组件传递事件 this.$emit('changePage',val)
     *          val为当前切换页码值
     *
     * 	    2.jumpPage() GO按钮触发事件
     * 	        向父亲组件传递事件 this.$emit('jumpPage',this.value)
     * 	        value为当前切换页码值
     *
     * @module 组件引用位置
     *      1. 系统管理-用户管理 [src/views/system/user/User.vue]
     *      2. 我的考勤-我的请假 [src/views/attendance/MyLeave.vue]
     *      3. 我的考勤-我的加班 [src/views/attendance/MyOvertimeWork.vue]
     *      4. 人员管理-人员管理 [src/views/manage/Manage.vue]
     *      5. 人员管理-人员调出 [src/views/manage/PersonnelTransfer.vue]
     *      6. 人员管理-人员调入 [src/views/manage/PersonnelStaffing.vue]
     *      7. 系统管理-班次管理 [src/views/system/classes/Classes.vue]
     *      8. 排班-排班管理 [src/views/scheduling/SchedulingManage]
     */

    export default {
        name: "index",
        props:['total','totalPages','currentPages'],
        data(){
            return {
                value:1,
                currentPage:this.currentPages,
                pagesize:10
            }
        },
        methods:{
            handleCilck(val){
                this.$emit('changePage',val)
            },
            jumpPage(){
                if(this.value == this.currentPage){
                    return false;
                }else{
                    if(Number(this.value)>this.totalPages){
                        this.value =  this.totalPages;
                        this.currentPage =  Number(this.totalPages);
                    }else{
                        this.currentPage = Number(this.value);
                    }
                }
                this.$emit('jumpPage',this.value)
            }
        },
        watch:{
            currentPages(){
                this.currentPage = this.currentPages;
            },
            value(val){
                if(isNaN(val)){
                    this.value = 1
                }else{
                    if(val.toString().indexOf('-')!=-1){
                        this.value = 1;
                    }else{
                        this.value =parseInt(val)
                    }
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
