<template>
    <div class="callout">
        <el-button type="text" @click="dialogVisible = true">人员调出</el-button>
        <el-dialog title="人员调出" :visible.sync="dialogVisible" width="500px">
            <el-form ref="form" :model="form">
                <el-form-item label="调出时间" :label-width=labelWidth>
                    <el-date-picker v-model="form.time1" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="调出项目" :label-width=labelWidth>
                    <el-select v-model="form.region">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调入时间" :label-width=labelWidth>
                    <el-date-picker v-model="form.time2" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="调入项目" :label-width=labelWidth>
                    <el-select v-model="form.regionin">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调出原因" :label-width=labelWidth>
                    <el-input type="textarea" v-model="form.desc"></el-input>
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
     * @desc 【人员调出】 弹层
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
                labelWidth: '160px',
                form: {
                    region: "",
                    regionin: "",
                    time1: "",
                    time2: "",
                    desc: ""
                }
            };
        },
        methods: {
            confirm() {
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

