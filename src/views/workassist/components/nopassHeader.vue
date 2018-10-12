<template>
    <section>
        <header>
            <span>分类</span>
            <el-select v-model="classId" placeholder="请选择">
                <el-option v-for="item in classification" :key="item.id" :label="item.label" :value="item.id">
                </el-option>
            </el-select>
            <span>不通过原因</span>
            <el-input v-model="centent" placeholder="请输入内容"></el-input>
            <el-button size="small" type="primary" class="btn_Import add" id="button" icon="el-icon-plus" @click="addKey">
                <span>添加</span>
            </el-button>
            <el-button size="small" type="primary" class="btn_Import search" id="button" icon="el-icon-search" @click="searchKey">
                <span>查询</span>
            </el-button>
        </header>
        <el-dialog title="添加图文不通过说明" :visible.sync="dialogVisible" width="30%" :lock-scroll="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动分类">
                        <el-option v-for="(option,index) in optionList" :label="option.label" :value="option.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="原因" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="不通过说明" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </section>
</template>
<script>
/**
 * @author shumei Zhao
 * @date 2018/9/3
 * @desc 组件描述
 * @module 组件引用位置
 *      1.
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
 */

import comm from "@/utils/comm";
export default {
    name: "nopassHeader",
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                name: "",
                region: "",
                desc: ""
            },
            optionList: [
                { label: "视频", value: "1" },
                { label: "文字", value: "2" },
                { label: "图片", value: "3" },
                { label: "评论正文", value: "4" },
                { label: "用户头像", value: "5" },
                { label: "用户昵称", value: "6" }
            ],
            classification: [
                {
                    id: "1",
                    label: "黄金糕"
                },
                {
                    id: "2",
                    label: "双皮奶"
                },
                {
                    id: "3",
                    label: "蚵仔煎"
                },
                {
                    id: "4",
                    label: "龙须面"
                },
                {
                    id: "5",
                    label: "北京烤鸭"
                }
            ],
            classId: "",
            centent: "",
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入原因",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 30,
                        message: "长度在 1 到 30 个字符",
                        trigger: "blur"
                    }
                ],
                region: [
                    {
                        required: true,
                        message: "请选择分类",
                        trigger: "change"
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: "请填写不通过说明",
                        trigger: "blur"
                    },
                    {
                        min: 1,
                        max: 100,
                        message: "长度在 1 到 100 个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        addKey() {
            this.dialogVisible = true;
            this.ruleForm = {
                name: "",
                region: "",
                desc: ""
            };
        },
        searchKey() {
            console.log(this.classId, this.centent);
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // console.log(this.ruleForm)
                    this.dialogVisible = false;
                    comm.open(this,"添加成功")
                    console.log()
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "@/styles/workassist/nopass.scss";
</style>