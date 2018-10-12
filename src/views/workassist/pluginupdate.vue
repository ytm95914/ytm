<template>
    <div class="pluginupdate">
        <div class="button">
            <!--<el-button  type="primary" style="padding:8px 12px 12px 12px; background:#11a0f8;" @click="dialogVisible=true">-->
                <!--<svg-icon icon-class="export" class="svg-icon" />-->
                <!--<span class="shc">上传</span>-->
            <!--</el-button>-->
            <el-button type="primary" style="padding:12px" @click="dialogVisible=true">
                <svg-icon icon-class="export" id="svg-icon" />
                <span>上传</span>
            </el-button>
        </div>
        <div class="table">
            <template>
                <el-table :header-cell-style="getRowClass" :data="tableData" style="width: 100%">
                    <el-table-column prop="createTime" label="更新日期" width="250">
                    </el-table-column>
                    <el-table-column prop="versionNumber" label="版本号" width="180">
                    </el-table-column>
                    <el-table-column prop="fileName" label="更新人">
                    </el-table-column>
                    <el-table-column prop="name" label="操作">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="download(scope.$index)">下载</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!--上传弹框-->
        <el-dialog title="版本更新" :visible.sync="dialogVisible" width="33%" :lock-scroll="false">
            <el-form  label-width="100px" class="demo-ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="版本号" prop="number">
                    <el-input type="text" v-model="ruleForm.number"></el-input>
                </el-form-item>
                <el-form-item label="更新内容" prop="text">
                    <el-input type="textarea" v-model="ruleForm.text"></el-input>
                </el-form-item>
                <el-form-item label="选取文件" >
                </el-form-item>
                <div class="ch">
                    <p><span class="plug">上传文件</span> <span class="zy">(上传文件格式为Zip格式，大小控制在50m以内)</span></p>
                </div>
                <el-form-item>
                    <el-button type="primary" style="background-color:#55CE63;color:#fff;border:0" @click="preservation('ruleForm')">保 存</el-button>
                    <el-button  style="margin-left:20px;background-color:#c7c2cc;color:#fff">取 消</el-button>
                </el-form-item>
            </el-form>
            <el-upload
                class="upload-excel"
                ref="upload"
                :action="uploadUrl()"
                :file-list="fileList"
                :auto-upload="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :beforeUpload="beforeAvatarUpload"
                :on-change="handleChange">
                <el-button slot="trigger" class="selectFile">
                    <svg-icon icon-class="select" style="width:15px;height:15px;vertical-align: -.1em;"/>
                    <span>选取</span>
                </el-button>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
    /**
     * @author Chenxi Liu
     * @date 2018/9/5
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */
    import {pluginList} from '@/api/workassist/pluginupdate'
    import comm from '@/utils/comm'
    import{version,content} from '@/utils/validate/pluginupdate'
    export default {
        name: "pluginupdate",
        data () {
            return {
                dialogVisible: false,
                tableData: [],
                msg:'',
                fileList: [],
                ruleForm:{
                    number: '',
                    text: '',
                },
                rules: {
                    number: [
                        {trigger: 'blur', validator: version}
                    ],
                    text: [
                        {trigger: 'blur', validator: content}
                    ]
                }
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
            },
            //表格渲染
            pluginlists() {
                pluginList().then((res)=>{
                    this.tableData=res.data;
                })
            },
            //下载
            download(index){
                window.location.href= process.env.BASE_API + `/admin/bpoAutoUpdate/downbyid?id=${this.tableData[index].id}`;
            },
            //上传文件
            uploadUrl(){
                let url = process.env.BASE_API + "/admin/bpoPunchClock/importPunchClockExcel";
                return url;
            },
            uploadSuccess(res){
                if(res.data.length){
                    this.errorDatas = res.data;
                    this.dialogFormVisible = false;
                    this.ruleForm.months = "";
                    setTimeout(()=>{this.listDialogVisible = true;},500);
                }
                if(res.data==false){
                    console.log(res.data)
                    this.$notify({
                        title: '提示',
                        message: '请选择正确模板',
                        duration: 1000
                    });
                }
            },
            uploadError(err){
                console.log('导入失败，请查看网络')
            },
            beforeAvatarUpload(file){
                const isLt5M = file.size / 1024 / 1024 < 50;
                if(!isLt5M){
                    comm.warnRemid(this,'上传文件不能大于50M');
                    return false
                }
                let reg = /.zip/;
                if(!reg.test(file.name)){
                    comm.warnRemid(this,'请导入正确的模板');
                    return false
                }
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
            },
            //保存按钮
            preservation(formName){
                this.$refs[formName].validate();
                if(this.ruleForm.number!=""&&this.ruleForm.text!=""){

                }
            }
        },
        mounted(){
            this.pluginlists();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .pluginupdate{
        margin-top: 20px;
        border:2px solid #E9F1F3;
        .button{
            height: 36px;
            line-height: 36px;
            float: right;
            margin: 20px 10px 0 0;
        }
        .table{
            margin-top: 80px;
        }
        .demo-ruleForm{
            width:354px;
            .ch{
                margin-left: 36px;
                margin-bottom: 20px;
                .plug{
                    color: #39b0f9;
                    border-bottom: 1px solid #39b0f9 ;
                    cursor: pointer;
                }
                .zy{
                    color: #ff7b7b;
                    font-size: 12px;
                }
            }
        }
        .selectFile{
            position: absolute;
            top:220px;
            left:120px;
        }
    }
</style>
