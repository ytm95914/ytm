<template>
    <section class="error-container">
        <transition name="form-fade" mode="in-out">
            <section class="error-content">
                <img src="../../assets/401.png" alt="">
                <div class="error-info">
                    <h3>OPPS...</h3>
                    <p class="info-msg">请求接口报错，无数据返回！</p>
                    <p class="info-desc">请及时联系相关人员~</p>
                    <el-button type="success" class="backBtn">
                        <router-link to="/home">返回首页</router-link>
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
        name: "error"
    }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/error/error.scss';
</style>
