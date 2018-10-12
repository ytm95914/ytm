<template>
    <!-- 请假弹窗 -->
    <div class="overDialog">
        <el-form ref="overForm" :model="overForm" label-width="90px" :rules="rules">
            <el-form-item label="加班时间：" prop="date" style="width:380px">
                <el-date-picker type="date" placeholder="选择日期" v-model="overForm.date" @blur="chengeOvertime"></el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="startTime">
                <div class="block">
                    <el-time-select placeholder="起始时间" v-model="overForm.startTime" :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '23:00',
                            maxTime: overForm.endTime
                            }" @blur="chengeOvertime">
                    </el-time-select>
                </div>
            </el-form-item>
            <el-form-item label="" prop="endTime">
                <div class="block">
                    <el-time-select placeholder="结束时间" v-model="overForm.endTime" :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '24:00',
                            minTime: overForm.startTime
                            }" @blur="chengeOvertime" prop="checDate">
                    </el-time-select>
                </div>
            </el-form-item>
            <p class="times">
                <span class="infor">时长：
                    <span :style="{'color':overhourColor}">{{ overhour }}</span>
                </span>
            </p>
            <p class="times" v-if="!isRole">
                <span class="infor">小组：
                    <span>{{ groups }}</span>
                </span>
            </p>
            <p class="times" v-if="!isRole">
                <span class="infor">班次：
                    <span>{{ shifts }}</span>
                </span>
            </p>
            <el-form-item label="项目：" v-if="isRole" prop="">
                <el-select v-model="overForm.project" placeholder="请选择项目" @change="chengeGroup">
                    <el-option v-for="(option,index) in projectOption" :label="option.name" :value="option.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="小组：" v-if="isRole" prop="">
                <el-select v-model="overForm.groups" placeholder="请选择小组">
                    <el-option v-for="(option,index) in groupsOption" :label="option.name" :value="option.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机：" prop="num">
                <el-input v-model="overForm.num" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="加班事由：" prop="reason">
                <el-input type="textarea" v-model="overForm.reason" :rows="3" maxlength="200" placeholder="不得超过200字！"></el-input>
            </el-form-item>
            <div style="text-align: center;">
                <el-button v-if="flag" type="primary" @click="overButton('overForm')">确定</el-button>
                <el-button v-else type="primary" @click="overButton('overForm')" disabled>确定</el-button>
                <el-button @click="resetForm('overForm')">取消</el-button>
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
    roleState,
    overDialog,
    projectOption,
    groupsOption,
    isOver
} from "@/api/attendance/myAttendance";
import commdate from "@/utils/commdate";
import TempCache from "@/utils/tempcache";
import comm from "@/utils/comm";
import {
    checkDate,
    checkState,
    checkPhone,
    checkReason,
    checkProject,
    checkGroup,
    checkReasonOver
} from "@/utils/validate/Myattendance";
export default {
    name: "overDialog",
    props: {
        dialogState: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // leaveTime: false, //请假弹窗
            // overTime: false, //加班弹窗
            leavehour: "", //请假时长
            overhour: "", //加班时长
            groups: "", //小组
            shifts: "", //班次
            isYear: "", //年假
            leavehourColor: "",
            flag: false, //是否能加班
            shiftsId: "", //班次id
            path: "", //上传路径
            now: new Date(),
            // flag: false, //时长的状态
            overhourColor: "", //加班时长颜色
            overForm: {
                date: "", //日期
                startTime: "", //开始时间
                endTime: "", //结束时间
                num: "", //手机号
                reason: "", //原因
                project: "", //项目
                groups: "" //小组
            },
            projectOption: [], //项目下拉框
            groupsOption: [], //小组下拉框
            isRole: false, //判断角色
            roleId: "", //角色id
            groupId:"",//小组id
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
                project: [{ validator: checkProject, trigger: "change" }],
                groups: [{ validator: checkGroup, trigger: "change" }],
                num: [{ validator: checkPhone, trigger: "blur" }],
                reason: [{ validator: checkReasonOver, trigger: "blur" }]
            },
            ifRepeat: false, //申请加班时间是否重复
            ifWork: false //申请加班时间是否在班次之内
        };
    },
    methods: {
        // 加班时长
        chengeOvertime() {
            if (
                this.overForm.date &&
                this.overForm.startTime &&
                this.overForm.endTime
            ) {
                let data = {
                    day: this.formatDate(this.overForm.date),
                    timeOne: this.overForm.startTime,
                    timeTwo: this.overForm.endTime
                };
                // console.log(data, "参数");
                isOver(data).then(res => {
                    //判断加班时间是否重复
                    // console.log(res,"是否可以加班")
                    if (res.data.data == true) {
                        // console.log(res.data.data,"是否 重复 ")
                        this.flag = true;
                        overDialog(data)
                            .then(res => {
                                // console.log(res.data.data,"是否在班次之内")
                                //判断加班时间是否在班次之内
                                if (res.data.data == true) {
                                    this.flag = true;
                                    var h =
                                        this.overForm.endTime.substr(0, 2) -
                                        this.overForm.startTime.substr(0, 2);
                                    this.overhour = h + "小时";
                                } else {
                                    this.flag = false;
                                    comm.open(this, "该时间段内不可以申请加班");
                                }
                            })
                            .catch(error => {});
                    } else {
                        this.flag = false;
                        comm.open(this, "该时间段内不可以申请加班");
                    }
                });
                this.chengeOverData();
            }
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
        // 请求班次小组
        chengeOverData() {
            var dateTime = this.formatDate(this.overForm.date);
            overTime({ dateTime: dateTime }).then(res => {
                if (res.data.data[0]) {
                    var data = res.data.data[0];
                    this.groups = data.groupName;
                    this.shifts = data.shiftName;
                    this.shiftsId = data.id;
                    this.groupId = data.groupId;
                } else {
                    // this.overhourColor = "";
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
        // 加班确定按钮
        overButton(formName) {
            this.$refs.overForm.validate(valid => {
                if (valid) {
                    this.overhour = "";
                    var date = this.formatDate(this.overForm.date);
                    let data = {
                        day: date,
                        timeOne: this.overForm.startTime,
                        timeTwo: this.overForm.endTime,
                        duration: this.overhour,
                        shiftsId: this.shiftsId,
                        phone: this.overForm.num,
                        overtimeReason: this.overForm.reason,
                        remarkThree: this.overForm.groups,
                        remarkFour: this.overForm.project,
                        groupId:this.groupId,
                    };
                    console.log(data,122222222222)
                    overData(data)
                        .then(res => {
                            // console.log(res);
                        })
                        .catch(error => {
                            // console.log(error);
                        });
                    this.$emit("close");
                    this.resetForm(formName);
                    this.overhour = "";
                } else {
                    return false;
                }
            });
        },
        // 关闭按钮
        resetForm(formName) {
            this.overhour = "";
            this.$refs[formName].resetFields();
            this.overForm.num = TempCache.getItem("userInfo").phone;
            this.$emit("close");
        },
        chengeGroup() {
            groupsOption({ projectId: this.overForm.project }).then(res => {
                this.groupsOption = res.data.data;
            });
        },
    },
    mounted() {
        this.overForm.num = TempCache.getItem("userInfo").phone;
        roleState().then(res => {
            // console.log(res.data.data, "员工角色");
            if (res && res.data && res.data.data) {
                this.roleId = res.data.data;
                if (this.roleId == true) {
                    this.isRole = true;
                    projectOption()
                        .then(res => {
                            this.projectOption = res.data.data;
                        })
                        .catch(error => {});
                } else {
                    this.isRole = false;
                }
            }
        });
    },
    watch: {
        dialogState(val) {
            if (val) {
                if (
                    this.overForm.date ||
                    this.overForm.startTime ||
                    this.overForm.endTime ||
                    this.overForm.num ||
                    this.overForm.reason ||
                    this.overForm.project ||
                    this.overForm.groups
                ) {
                    this.$refs.overForm.resetFields();
                    this.overForm.num = TempCache.getItem("userInfo").phone;
                    this.overhour = "";
                    this.groups = "";
                    this.shifts = "";
                    this.overForm.project = "";
                    this.overForm.groups = "";
                }
            } else {
                this.$refs.overForm.resetFields();
                this.overForm.num = TempCache.getItem("userInfo").phone;
                this.overhour = "";
                this.groups = "";
                this.shifts = "";
                this.overForm.project = "";
                this.overForm.groups = "";
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
