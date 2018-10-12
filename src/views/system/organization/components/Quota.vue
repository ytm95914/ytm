<template>
    <div class="quota">
        <el-form ref="form" :model="form">
            <el-row>
                 <div class="quotafun">
            <el-button type="success">编辑</el-button>
        </div>
                <el-col :span="12">
                    <el-form-item label="选择指标" :label-width=quotaWidth>
                        <el-select v-model="form.region" placeholder="请选择指标">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指标编号" :label-width=quotaWidth>
                        <el-input v-model="form.number"></el-input>
                    </el-form-item>
                    <el-form-item label="折算系数" :label-width=quotaWidth>
                        <el-input v-model="form.ratio"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="指标类型" :label-width=quotaWidth>
                        <span>基础审核数据</span>
                    </el-form-item>
                    <el-form-item label="指标单位" :label-width=quotaWidth>
                        <el-input v-model="form.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="指标展示数据类型" :label-width=quotaWidth class="quotanum">
                        <el-select v-model="form.unitnumber" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="指标说明" :label-width=quotaWidth>
                <el-input type="textarea" v-model="form.unitdesc"></el-input>
            </el-form-item>
            <div class="quotabtn">
                <el-form-item>
                    <el-button type="success" @click="onSave">保存</el-button>
                    <el-button type="info">取消</el-button>
                </el-form-item>
            </div>

        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    region: "",
                    number: "",
                    ratio: "",
                    unit: "",
                    unitnumber: "",
                    unitdesc: ""
                },
                quotaWidth: "77px"
            };
        },
        methods: {
            onSave: function () {
                console.log(111);
            }
        }
    };

</script>
<style rel="stylesheet/scss" lang="scss">
    .quota {
        width: 100%;
        height: 680px;
        border: 1px solid #E9F1F3;
        .el-form-item__label {
            line-height: 38px;
            color: #333;
        }
        .quotanum .el-form-item__label {
            line-height: 20px;
        }
        .el-form-item__content {
            line-height: 38px;
        }
        .quotabtn {
            width: 100%;
            text-align: center;
            margin-top: 180px;
        }
        .quotafun{
            padding:20px;
            width: 50%;
            float: right;
            text-align: right;
        }
    }

</style>

