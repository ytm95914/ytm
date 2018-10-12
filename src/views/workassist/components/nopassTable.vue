<template>
  <section>
    <table>
      <tr class="title ">
        <th style="padding-left: 20px;">序号</th>
        <th>分类</th>
        <th>不通过原因</th>
        <th>问题说明</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in tableData" :class="{'active':index%2 != 1}">
        <td style="padding-left: 20px;">{{ index+1 }}</td>
        <td>{{ item.classes }}</td>
        <td>{{ item.reason }}</td>
        <td>{{ item.explain }}</td>
        <td>
          <el-button type="text" size="small" style="color:#11A0F8" @click="editRole(item,index)">编辑</el-button>
          <el-button type="text" size="small" style="color:#E65E5E" @click="delRole(item,index)">删除</el-button>
        </td>
      </tr>
    </table>
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

export default {
    name: "nopassTable",
    data() {
        return {
            dialogVisible: false,
            myIndex:0,
            tableData: [
                {
                    classes: "视频",
                    value: "1",
                    reason: "视频不通过",
                    explain: "视频视频不通过"
                },
                {
                    classes: "图片",
                    value: "3",
                    reason: "图片不通过",
                    explain: "图片图片不通过"
                },
                {
                    classes: "用户头像",
                    value: "5",
                    reason: "头像不通过",
                    explain: "222222222222"
                },
                {
                    classes: "文字",
                    value: "2",
                    reason: "文字不通过",
                    explain: "3333333333333333333333333"
                }
            ],
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
        editRole(item, index) {
            // console.log(item, index);
            this.dialogVisible = true;
            this.ruleForm = {
                name: item.reason,
                region: item.value,
                desc: item.explain
            };
        },
        delRole(item, index) {
            console.log(item, index);
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                lockScroll: false
            })
                .then(() => {
                    this.tableData.splice(index, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        submitForm(formName,) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // console.log(this.ruleForm)
                    this.dialogVisible = false;
                    console.log();
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