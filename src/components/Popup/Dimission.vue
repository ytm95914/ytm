<template>

    <el-dialog
        title="离职人员"
        :visible.sync="dialogFormVisible"
        width="500px">
        <el-form :model="form" style="margin:0 auto">
            <el-form-item label="离职时间" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai1"></el-option>
                    <el-option label="区域二" value="beijing2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="离职类型" :label-width="formLabelWidth">
                <el-select v-model="form.types" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai3"></el-option>
                    <el-option label="区域二" value="beijing4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="流失原因" :label-width="formLabelWidth">
                <el-select v-model="form.reasons" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai5"></el-option>
                    <el-option label="区域二" value="beijing6"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="confirm">确 定</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/30
     * @desc 【离职人员】 弹层
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    export default {
        name: "Dimission",
        props:{
            dialogFormVisible:{
                type:Boolean,
                default: false
            }
        },
        data(){
            return {
                dialogFormVisibleCLONE:'',
                form: {
                    region: '',
                    reasons: '',
                    types: ''
                },
                formLabelWidth:'140px'
            }
        },
        mounted(){
        },
        methods:{
            confirm(){
                console.log(this.form,666)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dialog-footer{
        text-align: center;
        .el-button{
            margin:0 15px;
        }
    }
</style>
