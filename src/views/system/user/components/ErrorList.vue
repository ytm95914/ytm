<template>
    <section class="errorList">
        <article class="title">
            <svg-icon icon-class="importerror" class="face"/>
            <div class="info">
                <h3>导入失败！</h3>
                <p>已导入0条数据，失败原因如下，请修改模板数据</p>
            </div>
        </article>

        <el-table
            :data="errorData"
            stripe
            :header-cell-style="getRowClass">
            <el-table-column type="index" label="序号"  width="50"></el-table-column>
            <el-table-column property="excelRow" label="EXCEL行"  width="90"></el-table-column>
            <el-table-column property="userName" label="工号" width="90"></el-table-column>
            <el-table-column property="realName" label="真实姓名" width="100"></el-table-column>
            <el-table-column property="failReason" label="失败原因"></el-table-column>
        </el-table>
    </section>

</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/8/3
     * @desc [导入错误信息] 弹框
     * @module 组件引用位置
     */

    export default {
        name: "ErrorList",
        props: ['errorData'],
        methods:{
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return {background:'#92A6B1',color:'#ffffff'}
                } else {
                    return ''
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .errorList{
        .title{
            vertical-align: middle;
            margin:8px 0 35px 220px;
            .face{
                color:#11A0F8;
                width:34px;
                height:34px;
            }
            .info{
                margin-left:6px;
                display: inline-block;
                h3{
                    line-height: 20px
                }
            }
        }
    }
</style>
