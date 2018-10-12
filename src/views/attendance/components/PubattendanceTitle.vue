<template>
    <div class="pubattendancetitle">
        <div class="myattendance">
            <div class="item" v-for="(item,index) in pageDatas">
                <div class="item_box">
                    <div class="item_number" :style="{'color':item.color}">{{ item.time }}</div>
                    <div class="item_txt">{{ item.category }}</div>
                </div>
            </div>
            <div class="item">
                <div class="item_box">
                    <div class="item_btn">
                        <el-button type="primary" @click="leaves" v-if="BtnPermission.includes('请假')">请假</el-button>
                    </div>
                    <div class="item_btn">
                        <el-button type="primary" @click="overtimes" v-if="BtnPermission.includes('加班')">加班</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 请假弹窗 -->
        <el-dialog title="请假申请" :visible.sync="leaveTime" width="40%" :lock-scroll="false" @close='closeDialog'>
            <leaveDialog @close="leaveDialog" :dialogState="dialogState"></leaveDialog>
        </el-dialog>
        <!-- 加班弹窗 -->
        <el-dialog title="加班" :visible.sync="overTime" width="40%" :lock-scroll="false" @close='closeDialog'>
            <overDialog @close="overDialog" :dialogState="dialogState"></overDialog>
        </el-dialog>
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
import leaveDialog from "./myattendance/leaveDialog";
import overDialog from "./myattendance/overDialog";
export default {
    name: "pubattendanceTitle",
    props: ["BtnPermission"],
    data() {
        return {
            leaveTime: false, //请假弹窗
            overTime: false, //加班弹窗
            pageDatas: [
                {
                    category: "本月出勤(天)",
                    time: 0,
                    color: "#11A0F8"
                },
                {
                    category: "本月缺勤(天)",
                    time: 0,
                    color: "#55CE63"
                },
                {
                    category: "本月请假(h)",
                    time: 0,
                    color: "#FFBC34"
                },
                {
                    category: " 本月迟到/早退(h)",
                    time: 0,
                    color: "#999999"
                },
                {
                    category: "年假剩余时长(h)",
                    time: 0,
                    color: "#999999"
                }
            ],
            dialogState:false
            // isYear:'',//剩余年假
        };
    },
    components: {
        leaveDialog,
        overDialog
    },
    methods: {
        closeDialog(){
            this.dialogState = true
            
        },
        // 请假弹窗
        leaves() {
            this.dialogState = false;
            this.leaveTime = true;
        },
        //加班弹窗
        overtimes() {
            this.dialogState = false;
            this.overTime = true;

        },
        //   页面列表
        pageInfo() {
            myAttendances()
                .then(res => {
                    // console.log(res,"pageinfo")
                    if (res && res.data && res.data.data) {
                        var data = res.data.data;
                        // console.log(data,"表头数据")
                        this.pageDatas = [
                            {
                                category: "本月出勤(天)",
                                time: data.attendanceDay,
                                color: "#11A0F8"
                            },
                            {
                                category: "本月缺勤(天)",
                                time: data.absence,
                                color: "#55CE63"
                            },
                            {
                                category: "本月请假(h)",
                                time: data.leaveDuration,
                                color: "#FFBC34"
                            },
                            {
                                category: " 本月迟到/早退(h)",
                                time: data.leaveEarly,
                                color: "#999999"
                            },
                            {
                                category: "年假剩余时长(h)",
                                time: data.yearHoliday,
                                color: "#999999"
                            }
                        ];
                        this.isYear = data.yearHoliday;
                    }
                })
                .catch(error => {});
        },
        // 关闭请假弹窗
        leaveDialog() {
            this.leaveTime = false;
            // console.log("请假关闭")
        },
        // 关闭加班弹窗
        overDialog() {
            this.overTime = false;

            console.log("加班弹窗关闭")
        }
    },
    mounted() {
        this.pageInfo();
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
