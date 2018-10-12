<template>
    <section class="error-container">
        <transition name="form-fade" mode="in-out">
            <section class="error-content">
                <img src="../../assets/404.png" alt="">
                <div class="error-info">
                    <h3>OPPS...</h3>
                    <p class="info-msg404">真遗憾页面找不到了~</p>
                    <el-button type="success" class="backBtn" @click="toHome">
                        <!--<router-link to="/home"></router-link>-->
                        返回首页
                    </el-button>
                </div>
            </section>
        </transition>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/8/27
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    export default {
        name: "404",
        methods:{
            toHome(){
                window.history.go(-1);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/error/error.scss';
</style>
