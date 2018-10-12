<template>
    <el-form ref="initForm" :model="initForm" label-width="80px" :rules="rules" class="list-leave">
        <el-form-item label="请假时间" prop="startDate">
            <el-date-picker v-model="initForm.startDate" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" @blur="chageTime" :picker-options="pickerBeginDateBefore">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="" prop="endDate">
            <el-date-picker v-model="initForm.endDate" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" @blur="chageTime" :picker-options="pickerBeginDateAfter">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="时长">
            <el-input v-model="initForm.leaveTime" class="timeLong" :class="flag?'':'labels'"></el-input>
        </el-form-item>
        <el-form-item label="请假类型" prop="type">
            <el-select v-model="initForm.type" placeholder="请选择类型">
                <el-option v-for="(option,index) in state" :label="option.label" :value="option.value" :key="index"></el-option>
            </el-select>
            <span v-if="initForm.type == '0'">剩余年假{{ isYear }} h</span>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
            <el-input v-model="initForm.phone" maxlength="11" ></el-input>
        </el-form-item>
        <el-form-item label="请假事由" prop="leaveReason">
            <el-input type="textarea" v-model="initForm.leaveReason" :rows="3" maxlength="200" placeholder="不得超过200字！"></el-input>
        </el-form-item>
        <section class="uploadContent">
            <div class="uploadContent-select">
                <span>附件：</span>
            </div>
            <el-upload class="upload-excel" ref="upload" :action="uploadUrl()" :file-list="fileList" :auto-upload="false" :on-success="uploadSuccess" :on-error="uploadError" :on-change="handleChange">
                <el-button slot="trigger" class="selectFile" type="text">
                    <svg-icon icon-class="edit" id="svg-icon" style="margin-right:4px;color: #3a8ee6" />
                    <span>上传附件</span>
                </el-button>
            </el-upload>
        </section>

        <el-form-item>
            <el-button v-if="flag" type="primary" @click="leaveButton('leaveForm')">确定</el-button>
            <el-button v-else type="primary" @click="leaveButton('leaveForm')" disabled>确定</el-button>
            <el-button type="info" @click="resetForm('form')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/9/19
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    import { leaveTime,leaveList,myAttendances } from "@/api/attendance/myAttendance";
    import {checkDate,checkState,checkPhone,checkReason} from "@/utils/validate/Myattendance";
    import TempCache from "@/utils/tempcache";
    import comm from "@/utils/comm";
    export default {
        name: "MyAttendanceListLeave",
        props: ['listLeave','dialogState'],
        data(){
            return {
                isYear:'',
                fileList: [], //导入数据
                flag:false,//按钮禁用
                initForm:{
                    startDate:'',
                    endDate:'',
                    type:'0',
                    phone:'',
                    leaveReason:'',
                    annex:'',
                    leaveTime:''
                },
                rules: {
                    date:[{ validator: checkDate, trigger: "blur" }],
                    startDate: [{ validator: checkDate, trigger: "blur" }],
                    endDate:[{ validator: checkDate, trigger: "blur" }],
                    type: [{ validator: checkState, trigger: "chenge" }],
                    phone: [{ validator: checkPhone, trigger: "blur" }],
                    leaveReason: [{ validator: checkReason, trigger: "blur" }]
                },
                // 请假开始时间不能大于结束时间
                pickerBeginDateBefore: {
                    disabledDate: time => {
                        let beginDateVal = this.initForm.endDate;
                        if (beginDateVal) {
                            return time.getTime() > beginDateVal;
                        }
                    }
                },
                pickerBeginDateAfter: {
                    disabledDate: time => {
                        let beginDateVal = this.initForm.startDate;
                        if (beginDateVal) {
                            return time.getTime() < beginDateVal;
                        }
                    }
                },
                state: [
                    {
                        value: "0",
                        label: "有薪休假"
                    },
                    {
                        value: "1",
                        label: "事假"
                    },
                    {
                        value: "2",
                        label: "病假"
                    },
                    {
                        value: "3",
                        label: "婚假"
                    },
                    {
                        value: "4",
                        label: "生育产假"
                    },
                    {
                        value: "5",
                        label: "哺乳假"
                    },
                    {
                        value: "6",
                        label: "护理假"
                    },
                    {
                        value: "7",
                        label: "流产假"
                    },
                    {
                        value: "8",
                        label: "产前检查"
                    },
                    {
                        value: "9",
                        label: "丧假"
                    },
                    {
                        value: "10",
                        label: "忘打卡"
                    },
                    {
                        value: "11",
                        label: "其他"
                    },
                    {
                        value: "12",
                        label: "因公外出"
                    },
                    {
                        value: "13",
                        label: "出差"
                    }
                ],
                leaveState:"",//已经点击过请假
            }
        },
        methods:{
            // 弹窗确定按钮
            leaveButton(formName) {
                this.$refs.initForm.validate(valid => {
                    if (valid) {
                        var startTime = this.initForm.startDate+'000';
                        var endTime = this.initForm.endDate+'000';
                        
                        this.initForm.startDate = startTime;
                        this.initForm.endDate = endTime;
                        leaveList(this.initForm).then(res => {
                            if(res && res.data){
                                this.leaveState = res.data.data
                                this.$emit('closes','success');
                            }
                        }).catch(error => {
                            // console.log(error + "错误");
                        });
                        comm.open(this,"请假申请提交成功！")
                    } else {
                        return false;
                    }
                });
            },
           /* date(time) {
                var dates =
                    time.getFullYear() +
                    "-" +
                    (time.getMonth() + 1 < 10
                        ? "0" + (time.getMonth() + 1)
                        : time.getMonth() + 1) +
                    "-" +
                    (time.getDate() < 10
                        ? "0" + (time.getDate() )
                        : time.getDate()) +
                    " " +
                    (time.getHours() < 10
                        ? "0" + time.getHours()
                        : time.getHours()) +
                    ":" +
                    (time.getMinutes() < 10
                        ? "0" + time.getMinutes()
                        : time.getMinutes()) +
                    ":" +
                    (time.getSeconds() < 10
                        ? "0" + time.getSeconds()
                        : time.getSeconds()) +
                    ":000";
                return dates;
            },*/
            resetForm(){
                this.$emit('closes','cancel');
            },
            //时间控件失去焦点
            chageTime(){
                if(this.initForm.startDate && this.initForm.endDate) {
                    let data = {
                        startTime: this.initForm.startDate+":000",
                        endTime: this.initForm.endDate+":000",
                    };
                    this.getTimeLong(data)
                }
            },
            //导入请求地址
            uploadUrl() {
                let url = process.env.BASE_API + "/admin/bpoLeaveApply/fileUpload";
                return url;
            },
            //导入成功回调
            uploadSuccess(res) {
                this.initForm.annex = res.filePath
            },
            //导入失败回调
            uploadError(err) {
                // console.log("导入失败，请查看网络");
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
                this.submitUpload()
            },
            //导入上传
            submitUpload() {
                this.$refs.upload.submit();
            },
            //获取父组件时间开始和结束，回显数据，请求是否可以请假
            getTimeLong(data){
                this.initForm.startDate = data.startTime;
                this.initForm.endDate = data.endTime;
                console.log(this.initForm.startDate,1);
                console.log(this.initForm.endDate,2);
                leaveTime(data).then(res => {
                    if(res && res.data && res.data.data){
                        let dataList = res.data.data;
                        this.initForm.leaveTime = dataList.data;
                        if (dataList.flag == false) {
                            this.flag = false
                        }else{
                            this.flag = true
                        }
                    }
                }).catch(error => {
                    // console.log(error + "错误")
                })
            },
             // 剩余年假
            taking(){
                myAttendances().then(res => {
                    let data = res.data.data;
                    this.isYear = data.yearHoliday;
                }).catch(error => {
                    // console.log(error + "错误")
                })
            },
        },
        mounted(){
            this.initForm.phone = TempCache.getItem('userInfo').phone;
            let data = {
                startTime: this.listLeave.dataInfo.startTimes+":000",
                endTime: this.listLeave.dataInfo.endTimes+":000",
            };
            this.getTimeLong(data);
            this.taking();
        },
        watch:{
            listLeave(){
                let data = {
                    startTime: this.listLeave.dataInfo.startTimes+":000",
                    endTime: this.listLeave.dataInfo.endTimes+":000",
                };
                this.getTimeLong(data);
            },
            dialogState(val){
                if(val){
                    if(this.initForm.startDate || this.initForm.endDate || this.initForm.type ||this.initForm.phone||this.initForm.leaveReason || this.initForm.annex|| this.initForm.leaveTime){
                        this.$refs.initForm.resetFields();
                        this.initForm.phone = TempCache.getItem('userInfo').phone;
                        this.fileList = [];
                    }
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .list-leave{
        .el-form-item{
            margin-left:15%;
            .el-input{
                width:220px;
            }
            .el-textarea{
                width:220px;
            }
            .timeLong{
                input{
                    border:0px !important;
                }
            }
            .labels{
                input{
                    color:red
                }
            }
        }
        .uploadContent{
            margin-left:18%;
            position: relative;
            .upload-excel{
                margin-bottom: 10px;
                .el-button{
                    position: absolute;
                    left:66px;
                    top: -13px;
                }
                .el-upload-list {
                    width: 300px;
                }
            }
        }
    }
</style>
