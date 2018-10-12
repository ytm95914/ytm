<template>
    <section class="block" v-show="isshow">
        <el-pagination
            @current-change="handleCilck"
            :current-page.sync="value"
            :page-size="10"
            layout="prev, pager, next,slot"
            :total="total">
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
     * @date 2018/9/3
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    export default {
        name: "Pagination",
        props: {
            //显示或隐藏
            isshow: {
                default: false
            },
            val:{
                default: 1
            },
            total:{
                default: 1
            }
        },
        data(){
            return {
                value:1
            }
        },
        methods:{
            jumpPage(){
                console.log('测试GO')
            },
            handleCilck(){
                console.log('修改页面')
            }
        },
        mounted(){
            this.value = Number(this.val);
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
