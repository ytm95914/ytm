<template>
    <section class="dialog">
        <el-dialog
            class="dialogframe"
            title="导入考勤"
            :visible.sync="dialogFormVisible"
            width="444px"
            :lock-scroll="false" @close='closeDialog'>
            <el-form class="bd" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" >
                <el-form-item label="考勤月份" prop="months">
                    <el-date-picker
                        v-model="ruleForm.months"
                        type="month"
                        value-format="yyyy-MM"
                        @change="getmonth"
                        placeholder="选择年月">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <section class="uploadContent">
                <div class="uploadContent-select">
                    <span>选取文件</span>
                </div>
                <div class="uploadContent-info">
                    <p class="uploadContent-infop">1、点击下载<span @click="downloadTemplate" class="templet">《导入考勤模板》</span></p>
                    <p>2、请上传.xls或.xlsx文件，文件大小不超过5M</p>
                </div>
                <div class="uploadContent-btn">
                    <el-button type="success" @click="hh('ruleForm')">确定</el-button>
                    <el-button class="qxbutton" type="info" @click="cancel('ruleForm')">取消</el-button>
                </div>
            </section>
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
                <el-button slot="trigger" class="selectFile"  style="padding-top: 10px;">
                    <svg-icon icon-class="select" style="width:14px;height:14px;vertical-align: -.1em;"/>
                    <span>选取</span>
                </el-button>
            </el-upload>
        </el-dialog>
        <!--导入失败回显数据-->
        <el-dialog title="错误数据" :visible.sync="listDialogVisible">
            <div>
                <p>导入失败，已导入0条数据</p>
                <p>失败原因如下，请修改模板数据</p>
            </div>
            <el-table :data="errorDatas">
                <el-table-column property="excelRow" label="EXCEL行" width="150"></el-table-column>
                <el-table-column property="userName" label="工号" width="200"></el-table-column>
                <el-table-column property="realName" label="真实姓名"></el-table-column>
                <el-table-column property="failReason" label="失败原因"></el-table-column>
            </el-table>
        </el-dialog>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/30
     * @desc 【人员新增】 弹层
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */
    import comm from '@/utils/comm'
    import {confirms} from '@/api/layout/importdaily'
    import {month1} from '@/utils/validate/importdaily'
    import { mapGetters,mapActions } from 'vuex'

    export default {
        name: "index",
        data(){
            return {
                dialogFormVisible: false,
                listDialogVisible:false,    //导入失败返回数据展示
                formLabelWidth:'140px',
                years:"",
                months:"",
                fileList: [],
                errorDatas: [],
                msg: '',
                ruleForm:{
                    years: '',
                    months: '',
                    month:'',
                },
                rules: {
                    months: [
                        {trigger: 'change', validator: month1},
                    ],
                },
            }
        },
        methods:{
            closeDialog(){
                this.setAttendance(false);
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
            },
            submitUpload(){
                this.$refs.upload.submit();
            },
            uploadUrl(){
                let url = process.env.BASE_API + "/admin/bpoPunchClock/importPunchClockExcel";
                return url;
            },
            downloadTemplate(){
                window.location.href= process.env.BASE_API + `/admin/bpoPunchClock/dowloadPunchClockModel`;
            },
            uploadSuccess(res){
                if(res.data.length){
                    this.errorDatas = res.data;
                    this.dialogFormVisible = false;
                    this.ruleForm.months = "";
                    setTimeout(()=>{this.listDialogVisible = true;},500);
                }
                if(res.data.length==0){
                    let params={
                        year: this.ruleForm.years,
                        month: this.ruleForm.month,
                        path: "22222"
                    };
                    confirms(params).then((res) => {
                        if (res.data.msg == "success") {
                            this.$notify({
                                title: '提示',
                                message: '导入成功',
                                duration: 1000
                            });
                            this.dialogFormVisible = false;
                            this.ruleForm.months = "";
                        }
                    })
                    this.dialogFormVisible = false;
                    return false;
                }
                if(res.data==false){
                    this.$notify({
                        title: '提示',
                        message: '导入内容不正确',
                        duration: 2000
                    });
                    this.fileList = [];
                    this.dialogFormVisible = false;
                }
            },
            uploadError(err){
                console.log('导入失败，请查看网络')
            },
            beforeAvatarUpload(file){
                const isLt5M = file.size / 1024 / 1024 < 5;
                if(!isLt5M){
                    comm.warnRemid(this,'上传文件不能大于5M');
                    return false
                }
                let reg = /.xlsx|.xls/;
                if(!reg.test(file.name)){
                    comm.warnRemid(this,'请导入正确的模板');
                    return false
                }
            },
            //获取年月
            getmonth(val){
                this.ruleForm.years=val.slice(0,4)
                this.ruleForm.month=val.slice(5)
            },
            //确定
            hh(formName) {
                this.$refs[formName].validate();
                if(this.ruleForm.months!="") {
                    this.submitUpload();
                    this.$refs[formName].resetFields()
                }
            },
            cancel(formName){
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
                this.ruleForm.months = "";
            },
            ...mapActions(['setAttendance'])
        },
        watch:{
            dialogFormVisible(){
                if(!this.dialogFormVisible){
                    this.fileList = [];
                }
            },
            //Lindong 监听vuex
            "$store.state.attendance"(val){
                this.dialogFormVisible = val
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .inputs{
        width:205px;
    }
    .dialog-footer{
        text-align: center;
        .el-button{
            margin:0 15px;
        }
    }
    .dialog{
        .bd{
            margin-left: 25px;
        }
        .file{
            position: absolute;
            top: 155px;
            left: 288px;
            cursor: pointer;
            border-bottom: 1px solid #2d3a4b;
        }
        .uploadContent{
            margin-left:60px;
            .uploadContent-select{
                margin-top:28px;
            }
            .uploadContent-btn{
                margin-top: 20px;
            }
            .uploadContent-info{
                margin-top:28px;
                .uploadContent-infop{
                    margin-bottom: 10px;
                    .templet{
                        color:#11A0F8;
                        cursor: pointer;
                    }
                }
            }
            .uploadContent-btn{
                margin-left:28px;
                .qxbutton{
                    margin-left:54px;
                    background-color: #11a0f8;
                    border:0;
                }
            }
        }
        .selectFile{
            position: absolute;
            top:140px;
            left:146px;
        }
    }
</style>
