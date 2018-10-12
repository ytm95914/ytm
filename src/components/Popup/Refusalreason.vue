<template>
    <div class="refusalreason ">
        <el-button type="text" @click="dialogVisible = true">拒绝原因</el-button>
        <el-dialog title="拒绝原因" :visible.sync="dialogVisible" width="500px">
            <el-form ref="form" :model="form">
                <el-form-item label="调出时间:" :label-width=refusalWidth>
                    <span>2018-08-03</span>
                </el-form-item>
                <el-form-item label="调出项目:" :label-width=refusalWidth>
                    <span>视频</span>
                </el-form-item>
                <el-form-item label="调出小组:" :label-width=refusalWidth>
                    <span>标注一组</span>
                </el-form-item>
                <el-form-item label="调入时间:" :label-width=refusalWidth>
                    <span>2018-08-03</span>
                </el-form-item>
                <el-form-item label="调入项目:" :label-width=refusalWidth>
                    <span>地图</span>
                </el-form-item>
                <el-form-item label="调入小组:" :label-width=refusalWidth>
                    <span>标注二组</span>
                </el-form-item>
                <el-form-item label="调出原因:" :label-width=refusalWidth>
                    <span>因地图项目人员不足掉入新员工</span>
                </el-form-item>
                <el-form-item label="调出原因" :label-width=refusalWidth>
                    <el-input type="textarea" v-model="form.reasons"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="confirm">确 定</el-button>
                <el-button type="info" @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    /**
     * @author TianMing Yu
     * @date 2018/7/30
     * @desc 【拒绝原因】 弹层
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    export default {
        data() {
            return {
                dialogVisible: false,
                refusalWidth: '160px',
                form: {
                    reasons: ""
                }

            }
        },
        methods:{
            confirm(){
                console.log(this.form);
            }
        }
    };

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .dialog-footer {
        text-align: center;
        .el-button {
            margin: 0 15px;
        }
    }

</style>

