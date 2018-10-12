<template>
    <!-- 请假弹窗 -->
    <div class="leaveDialog">
        <el-form ref="leaveForm" :model="leaveForm" label-width="90px" :rules="rules">
            <el-form-item label="请假时间：" prop="startTime">
                <el-date-picker v-model="leaveForm.startTime" type="datetime" placeholder="选择开始时间" style="display:inline-block" :picker-options="pickerBeginDateBefore" @blur="chageTime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="endTime">
                <el-date-picker v-model="leaveForm.endTime" type="datetime" placeholder="选择结束时间" style="display:inline-block;margin-left:0" :picker-options="pickerBeginDateAfter" @blur="chageTime">
                </el-date-picker>
            </el-form-item>

            <p class="times">时长：
                <span class="infor" :style="{'color':leavehourColor}"> {{ leavehour }} </span>
            </p>
            <el-form-item label="请假类型" prop="stateid">
                <el-select v-model="leaveForm.stateid" placeholder="请选择类型">
                    <el-option v-for="(option,index) in state" :label="option.label" :value="option.value" :key="index"></el-option>
                </el-select>
                <span v-if="leaveForm.stateid == '0'">剩余年假{{ isYear }} h</span>
            </el-form-item>
            <el-form-item label="手机：" prop="num">
                <el-input v-model="leaveForm.num" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="请假事由：" prop="reason">
                <el-input type="textarea" v-model="leaveForm.reason" :rows="3" maxlength="200" placeholder="不得超过200字！"></el-input>
            </el-form-item>
            <section class="uploadContent">
                <div class="uploadContent-select times">
                    <span>附件：</span>
                </div>
            </section>
            <el-upload class="upload-excel" ref="upload" :action="uploadUrl()" :file-list="fileList" :auto-upload="false" :on-success="uploadSuccess" :on-error="uploadError" :on-change="handleChange">
                <el-button slot="trigger" class="selectFile" type="text">
                    <!-- <svg-icon icon-class="import" style="width:15px;height:15px;vertical-align: -.1em;color:red;" /> -->
                    <!-- <svg-icon icon-class="export" style="width: 14px;height: 14px;vertical-align: middle;margin-right: 5px;" /> -->
                    <svg-icon icon-class="edit" id="svg-icon" style="margin-right:4px;color: #3a8ee6" />
                    <span>上传附件</span>
                </el-button>
            </el-upload>
            <div style="text-align: center;margin-top:10px;">
                <el-button v-if="flag" type="primary" @click="leaveButton('leaveForm')">确定</el-button>
                <el-button v-else type="primary" @click="leaveButton('leaveForm')" disabled>确定</el-button>
                <!-- <el-button type="primary" @click="leaveButton('leaveForm')">确定</el-button> -->
                <el-button type="info" @click="resetForm('leaveForm')">取消</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
/**
 * @author Lindong Ding
 * @date 2018/7/30
 * @desc 组件描述
 * @module 组件引用位置
 *      1.
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
 */
import {
    myAttendances,
    overTime,
    overData,
    leaveTime,
    leaveList,
    leavePath,
    userPonhe
} from "@/api/attendance/myAttendance";
import commdate from "@/utils/commdate";
import {
    checkDate,
    checkState,
    checkPhone,
    checkReason
} from "@/utils/validate/Myattendance";
import TempCache from "@/utils/tempcache";
import comm from "@/utils/comm";
export default {
    name: "leaveDialog",
    props:{
        dialogState:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // leaveTime: false, //请假弹窗
            leavehour: "", //请假时长
            groups: "", //小组
            shifts: "", //班次
            isYear: "", //年假
            leavehourColor: "",
            path: "", //上传路径
            flag: false, //时长的状态
            fileList: [], //导入数据
            errorDatas: "错误", //导入错误返回数据展示
            title: "",
            leaveForm: {
                startTime: "", //开始时间
                endTime: "", //结束时间
                leaveHour: "", //请假时长
                stateid: "0", //请假假种id
                num: "", //手机号
                reason: "" //原因
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
            // 请假开始时间不能大于结束时间
            pickerBeginDateBefore: {
                disabledDate: time => {
                    let beginDateVal = this.leaveForm.endTime;
                    if (beginDateVal) {
                        return time.getTime() > beginDateVal;
                    }
                }
            },
            pickerBeginDateAfter: {
                disabledDate: time => {
                    let beginDateVal = this.leaveForm.startTime;
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal;
                    }
                }
            },
            rules: {
                //验证规则
                date: [{ validator: checkDate, trigger: "blur" }],
                startTime: [{ validator: checkDate, trigger: "blur" }],
                endTime: [{ validator: checkDate, trigger: "blur" }],
                stateid: [{ validator: checkState, trigger: "change" }],
                num: [{ validator: checkPhone, trigger: "blur" }],
                reason: [{ validator: checkReason, trigger: "blur" }]
            }
        };
    },
    methods: {
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
            this.submitUpload();
        },
        //导入成功回调
        uploadSuccess(res) {
            this.path = res.filePath;
        },
        //导入失败回调
        uploadError(err) {
            // console.log("导入失败，请查看网络");
        },
        //导入请求地址
        uploadUrl() {
            let url = process.env.BASE_API + "/admin/bpoLeaveApply/fileUpload";
            return url;
        },
        //导入上传
        submitUpload() {
            this.$refs.upload.submit();
        },
        date(time) {
            var dates =
                time.getFullYear() +
                "-" +
                (time.getMonth() + 1 < 10
                    ? "0" + (time.getMonth() + 1)
                    : time.getMonth() + 1) +
                "-" +
                (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) +
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
        },
        // 获取请假时长
        chageTime() {
            if (this.leaveForm.startTime && this.leaveForm.endTime) {
                if (this.leaveForm.startTime > this.leaveForm.endTime) {
                    // console.log("开始时间大于结束时间");
                    this.leaveForm.startTime = this.leaveForm.endTime
                } else {
                    var startTime =this.date(this.leaveForm.startTime);
                    var endTime = this.date(this.leaveForm.endTime);
                    let data = {
                        startTime: startTime,
                        endTime: endTime
                    };
                    // console.log(startTime, "开始时间"),
                    //     console.log(endTime, "结束时间"),
                        leaveTime(data)
                            .then(res => {
                                var data = res.data.data;
                                // this.leavehour = data.data;
                                if (data.flag == false) {
                                    this.leavehourColor = "red";
                                    this.flag = false;
                                    this.leavehour = data.data;
                                } else {
                                    this.leavehourColor = "";
                                    this.flag = true;
                                    this.leavehour = data.data + "h";
                                }
                            })
                            .catch(error => {
                                // console.log(error + "错误");
                            });
                }
            } else if (this.leaveForm.startTime) {
                // console.log(this.leaveForm.startTime, "已选择开始时间");
                this.leaveForm.endTime = this.leaveForm.startTime;
            }
        },
        // 请假确定按钮
        leaveButton(formName) {
            this.$refs.leaveForm.validate(valid => {
                if (valid) {
                    var startTime = this.leaveForm.startTime+'000';
                    var endTime = this.leaveForm.endTime+'000';
                    if (this.flag == false) {
                    }
                    let data = {
//                      startDate: startTime,
//                      endDate: endTime,
                        startDate: this.date(this.leaveForm.startTime),
                        endDate: this.date(this.leaveForm.endTime),
                        leaveReason: this.leaveForm.reason,
                        annex: this.path,
                        phone: this.leaveForm.num,
                        leaveTime: this.leavehour,
                        type: this.leaveForm.stateid
                    };
                    leaveList(data)
                        .then(res => {})
                        .catch(error => {});
                    this.$emit("leaveTime");
                    this.submitUpload();
                    this.resetForm(formName);
                    comm.open(this,"请假申请提交成功！")
                } else {
                    return false;
                }
            });
        },
        // 时间格式转换
        formatDate(date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            var d = date.getDate();
            d = d < 10 ? "0" + d : d;
            return y + "-" + m + "-" + d;
        },
        // 请假弹窗
        leaves() {
            this.fileList = [];
            this.leavehour = "";
            this.leaveForm = {
                startTime: "", //开始时间
                endTime: "", //结束时间
                leaveHour: "", //请假时长
                stateid: "0", //请假假种id
                num: "", //手机号
                reason: "" //原因
            };
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.leaveForm.num = TempCache.getItem("userInfo").phone;
            // this.isYear = "";
            this.leavehour = "";
            this.groups = "";
            this.shifts = "";
            this.$emit("close");
        }
    },
    mounted() {
        this.leaveForm.num = TempCache.getItem("userInfo").phone;
        myAttendances().then(res => {
            // console.log(res,"年假")
            this.isYear = res.data.data.yearHoliday;
        });
    },
    watch:{
        dialogState(val){
            // console.log(val,"手机号")
            if(val){
                if(this.leaveForm.startTime || this.leaveForm.endTime ||this.leaveForm.num||this.leaveForm.reason || this.leaveForm.leaveHour){
                    this.$refs.leaveForm.resetFields();
                    this.leaveForm.num = TempCache.getItem("userInfo").phone;
                    this.leavehour = "";
                    this.fileList = [];
                }
            }else{
                this.$refs.leaveForm.resetFields();
                this.leaveForm.num = TempCache.getItem("userInfo").phone;
                this.leavehour = "";
                this.fileList = [];
            }
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.pubattendancetitle {
    .upload-excel {
        position: relative;
    }
}
</style>
<style scoped>
.el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    padding-left: 22px;
}
.el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
    box-sizing: border-box;
    padding-left: 25px;
}
.block div:nth-child(1) {
    position: relative;
    top: -2px;
}
span.dialog {
    display: block;
    float: left;
    width: 100px;
    text-align: right;
}
.center {
    text-align: center;
}
.el-textarea {
    display: inline-block;
    width: 80%;
    vertical-align: bottom;
    font-size: 14px;
}
.el-input--mini {
    font-size: 12px;
    width: 178px;
    height: 36px;
    line-height: 36px;
}
.paging {
    text-align: center;
}

.myattendance {
    border: 1px solid #e9f1f3;
    height: 200px;
    box-sizing: border-box;
    margin-bottom: 20px;
}
.item {
    float: left;
    width: 16.5%;
    padding-top: 60px;
    box-sizing: border-box;
}
.item_box {
    border-right: 1px solid #e9f1f3;
}
.item_number {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
    height: 36px;
}
.item_txt {
    font-size: 18px;
    color: #999999;
    text-align: center;
}
.item:last-child .item_box {
    border: none;
}
.item_btn {
    text-align: center;
    margin-bottom: 10px;
}
/* 弹窗 */
.el-input {
    width: 300px;
    height: 36px;
    line-height: 36px;
}
.el-input .el-input__inner {
    width: 300px;
}
.el-input__inner {
    width: 300px;
}
.el-textarea__inner {
    width: 300px;
}
.el-form-item__content {
    width: 300px;
}
.el-textarea {
    width: 300px;
}
.infor {
    padding: 0 10px;
}
.leave_time > div {
    width: 188px !important;
    display: inline-block;
}
#endTime > div.el-form-item__content {
    margin-left: 0 !important;
}
/* 上传文件 */
.upload-excel .el-button {
    position: absolute;
    left: 90px;
    top: -40px;
}
/* .el-select {
    width: 300px;
}
.el-textarea {
    width: 300px;
}
.el-date-editor {
    width: 400px;
} */
/* input select 样式 */

.el-select > .el-input {
    display: block;
    font-size: 12px;
}
.times {
    line-height: 36px;
    padding-left: 7%;
}
</style>
