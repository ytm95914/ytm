<template>
    <section class="system-cost">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.realname" placeholder=""></el-input>
            </el-form-item>

            <el-form-item class="inquire">
                <el-button type="primary" style="padding:12px" >
                    <router-link :to="'/system/add/'+1">
                        <svg-icon icon-class="export" id="svg-icon" />
                        <span>新增</span>
                    </router-link>
                </el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%" :header-cell-style="getRowClass">
            <el-table-column
                prop="date"
                label="名称"
                width="180" align="center">
            </el-table-column>
            <el-table-column
                prop="name"
                label="说明"
                width="380" align="center">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" style="color:#20ff63">启用</el-button>
                    <el-button type="text" style="color:#ff4343">禁用</el-button>
                    <el-button type="text">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

    </section>
</template>

<script>
    /**
     * @author ...
     * @date 2018/8/3
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    export default {
        name: "Cost",
        data(){
            return {
                formInline:{
                    realname:''
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods: {
            getRowClass({
                            row,
                            column,
                            rowIndex,
                            columnIndex
                        }) {
                if(rowIndex == 0) {
                    return {
                        background: '#92A6B1',
                        color: '#ffffff'
                    }
                } else {
                    return ''
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .system-cost{
        border:2px solid #E9F1F3;
    }
    .inquire{
        float:right;
    }
    .demo-form-inline{
        margin-left: 20px ;
        margin-top: 20px;
    }

</style>
