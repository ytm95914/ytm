<template>
    <section>
        <div class="personal_attendance ">
            <div class="personal_title">
                个人考勤详情
            </div>
            <div class="querybar">
                <PublicDatePicker @startTime="gteStartTime" @endTime="getEndTime"></PublicDatePicker>
                <span>班次：</span>
                <div class="input_select">
                    <el-input v-model="initForm.shifts" placeholder="请输入班次"></el-input>
                    <!--<el-select
                        v-model="initForm.shifts"
                        placeholder="请输入班次"
                        filterable
                        remote>
                        <el-option v-for="(item,index) in classes" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>-->
                </div>
                <span>状态：</span>
                <div class="input_select">
                    <el-select v-model="initForm.status" placeholder="请选择">
                        <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="Buttongroup">
                    <el-button type="primary" icon="el-icon-search" @click="queryList" style='padding: 0;width: 72px;'>查询</el-button>
                    <el-button type="success" @click="exportTableFac" style="padding: 11px;" v-if="BtnPermission.includes('导出')">
                        <svg-icon icon-class="export" style="width: 14px;height: 14px;vertical-align: middle;margin-right: 5px;" />导出
                    </el-button>
                    <!--<el-button type="primary3" icon="el-icon-search" @click="exportTableFac" v-if="BtnPermission.includes('导出')">导出</el-button>-->
                </div>
            </div>
            <!--表格-->
            <SimpleTable :tableDatad="tableDtats" :tableHead="tableHead" :tableOperation="tableOperation" @getOperation="getOperation"></SimpleTable>
            <!-- <el-table :header-cell-style="getRowClass" stripe :data="tableDtats" style="width: 100%">
                <el-table-column fixed prop="remarkOne" label="班次">
                </el-table-column>
                <el-table-column fixed prop="attendanceTime" label="日期">
                </el-table-column>
                <el-table-column prop="onDutyTime" label="上班时间">
                </el-table-column>
                <el-table-column prop="offDutyTime" label="下班时间">
                </el-table-column>
                <el-table-column prop="remarkThree" label="状态">
                </el-table-column>
                <el-table-column prop="onDutyPunchTime" label="上班打卡时间">
                </el-table-column>
                <el-table-column prop="offDutyPunchTime" label="下班打卡时间">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="getOperation(scope.row)" type="text">请假</el-button>
                        <p type="text">审批中</p>
                        <p type="text"></p>
                    </template>
                </el-table-column>
            </el-table> -->
            <NoData v-show="!tableDtats.length"></NoData>
            <!--分页-->
            <Pagination v-show="tableDtats.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
        </div>
        <!-- 请假申请弹窗 -->
        <el-dialog title="请假申请" :visible.sync="leave" width="40%" :lock-scroll="false" @close='closeDialog'>
            <MyAttendanceListLeave :listLeave="listLeave" @closes="closeListLeave" :dialogState="dialogState"></MyAttendanceListLeave>
        </el-dialog>
    </section>
</template>

<script>
/**
 * @author zhen Liu
 * @date 2018/9/5
 * @desc 组件描述
 * @module 组件引用位置
 *      1.
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
 */

import SimpleTable from "./SimpleTable";
import PublicDatePicker from "./PublicDatePicker";
import Pagination from "@/components/Pagination";
import NoData from "@/components/NoData";
import MyAttendanceListLeave from "./myattendance/MyAttendanceListLeave";

import {
    myAttendancesTable,
    classes,
    myAttendances
} from "@/api/attendance/myAttendance";
import TempCache from "@/utils/tempcache";
import commdate from "@/utils/commdate";
export default {
    name: "pubattendanceTable",
    props: ["BtnPermission"],
    data() {
        return {
            listLeave: "",
            initForm: {
                startTime: "",
                endTime: "",
                shifts: '',
                status: ""
            },
            submitForm: {
                startTime: "",
                endTime: "",
                shifts: "",
                status: ""
            },
            isYear: "", //剩余年假
            leave: false,
            userId: "",
            currentPage: 1, // 当前
            total: 1, //总条数
            totalPages: "", //总共多少页
            classes: [],
            state: [
                {
                    value: "",
                    label: "请选择"
                },
                {
                    value: "1",
                    label: "正常"
                },
                {
                    value: "2",
                    label: "迟到/早退"
                },
                {
                    value: "3",
                    label: "缺勤"
                },
                {
                    value: "4",
                    label: "有薪休假"
                },
                {
                    value: "5",
                    label: "事假"
                },
                {
                    value: "6",
                    label: "病假"
                },
                {
                    value: "7",
                    label: "婚假"
                },
                {
                    value: "8",
                    label: "生育产假"
                },
                {
                    value: "9",
                    label: "哺乳假"
                },
                {
                    value: "10",
                    label: "护理假"
                },
                {
                    value: "11",
                    label: "流产假"
                },
                {
                    value: "12",
                    label: "产前检查"
                },
                {
                    value: "13",
                    label: "丧假"
                },
                {
                    value: "14",
                    label: "忘打卡"
                },
                {
                    value: "15",
                    label: "其他"
                },
                {
                    value: "16",
                    label: "因公外出"
                },
                {
                    value: "17",
                    label: "出差"
                }
            ],
            tableHead: [
                { label: "班次", fixed: true, prop: "remarkOne",width:"190" },
                { label: "日期", fixed: true, prop: "attendanceTime" },
                { label: "上班时间", fixed: false, prop: "onDutyTime" },
                { label: "下班时间", fixed: false, prop: "offDutyTime" },
                { label: "状态", fixed: false, prop: "remarkThree" },
                { label: "上班打卡时间", fixed: false, prop: "onDutyPunchTime" },
                { label: "下班打卡时间", fixed: false, prop: "offDutyPunchTime" },
                { label:'操作',fixed:'right',prop:'operation',width:"80" },
            ],
            tableDtats: [],
            tableOperation: [{ operation: "请假", type: "update" }],
            dialogState: false,
        };
    },
    components: {
        SimpleTable,
        PublicDatePicker,
        Pagination,
        NoData,
        MyAttendanceListLeave
    },
    methods: {
        // 表头颜色
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return "background:#92A6B1;color:#fff";
            } else {
                return "";
            }
        },
        closeDialog() {
            this.dialogState = true;
        },
        //列表请假弹框取消
        closeListLeave() {
            this.leave = false;
        },
        // 获取开始时间
        gteStartTime(val) {
            this.initForm.startTime = val;
        },
        // 获取结束时间
        getEndTime(val) {
            this.initForm.endTime = val;
        },
        /*input[file]表单控件*/
        // 弹窗
        getOperation(info) {
            this.listLeave = info;
            this.dialogState = false;
            this.leave = true;
        },
        handleCilck(val) {
            this.submitForm.page = val;
            Object.assign(this.initForm, this.submitForm);
            this.tableData(this.submitForm);
        },
        jumpPage(value) {
            this.submitForm.page = value;
            Object.assign(this.initForm, this.submitForm);
            this.tableData(this.submitForm);
        },
        // 列表数据
        tableData(data) {
            console.log(this.initForm)
            console.log(this.initForm.startTime)
            myAttendancesTable(data)
                .then(res => {
                    // console.log(res, "列表");
                    this.currentPage = res.data.current;
                    this.total = res.data.total;
                    this.totalPages = res.data.pages;
                    this.tableDtats = res.data.records;
                    this.tableDtats.forEach(items => {
                        if (items.offDutyPunchTime) {
                            items.offDutyPunchTime = commdate.getDateHms(
                                items.offDutyPunchTime
                            ); //下班打卡时间
                        } else {
                            items.offDutyPunchTime = "";
                        }
                        if (items.onDutyPunchTime) {
                            items.onDutyPunchTime = commdate.getDateHms(
                                items.onDutyPunchTime
                            ); //上班打卡时间
                        } else {
                            items.onDutyPunchTime = "";
                        }
                        items.offDutyTime = commdate.getDateHms(
                            items.offDutyTime
                        ); //下班时间
                        items.onDutyTime = commdate.getDateHms(
                            items.onDutyTime
                        ); //上班时间
                        items.startTimes =
                            items.attendanceTime + " " + items.onDutyTime; //上班时间存储
                        items.endTimes =
                            items.attendanceTime + " " + items.offDutyTime; //下班时间存储
                        if (items.remarkThree == "正常") {
                            items.operation = [
                                {
                                    operation: "",
                                    type: ""
                                }
                            ];
                        } else {
                            items.operation = [
                                {
                                    operation: "请假",
                                    type: "update"
                                }
                            ];
                        }
                    });
                })
                .catch(error => {
                    // console.log(error + "错误");
                });
        },
        // 查询
        queryList() {
            this.initForm.page = 1;
            Object.assign(this.submitForm, this.initForm);
            this.tableData(this.initForm);
        },
        // 导出
        exportTableFac() {
            this.userId = TempCache.getItem("userId");
            window.location.href =
                process.env.BASE_API +
                `/admin/bpoPunchClock/exportPunchClockList?userId=${
                    this.userId
                }&startTime=${this.submitForm.startTime}&endTime=${
                    this.submitForm.endTime
                }&shifts=${this.submitForm.shifts}&status=${
                    this.submitForm.status
                }&page=${this.submitForm.page}&limit=10`;
        },
        shift() {
            classes()
                .then(res => {
                    if (res && res.data && res.data.data.length) {
                        let newData = res.data.data;
                        newData.map((v, i) => {
                            if (v == "请选择") {
                                this.classes.push({ value: "", label: v });
                            } else {
                                this.classes.push({ value: v, label: v });
                            }
                        });
                    }
                })
                .catch(error => {});
        }
    },
    mounted() {
        var newDate = new Date()
        this.initForm.endTime = commdate.timestampToTime(newDate);
        this.initForm.startTime= this.initForm.endTime.substr(0,7)+'-01'
        this.tableData(this.initForm);
        this.shift();
    }
};
</script>

<style lang="scss" scoped>
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
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
    width: 300px;
    height: 36px;
}

.el-button--primary1 {
    background: #4a90e2;
    color: #ffffff;
}
.el-button--primary1:focus,
.el-button--primary1:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}
.el-button--primary2 {
    background: #00c4ab;
    color: #ffffff;
}
.el-button--primary2:focus,
.el-button--primary2:hover {
    background: #00c4a9a6;
    border-color: #66b1ff;
    color: #fff;
}
.el-button--primary3 {
    background: #55ce63;
    color: #ffffff;
}
.el-button--primary3:focus,
.el-button--primary3:hover {
    background: #55ce63ba;
    border-color: #66b1ff;
    color: #fff;
}
.fl {
    float: left;
}
//日期样式
.personal_attendance {
    .querybar {
        margin-bottom: 10px;
        height: 40px;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
}
.Buttongroup {
    float: right;
}
/*end*/
.querybar span {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 20px;
    color: #333333;
}
.personal_title {
    height: 50px;
    font-size: 18px;
    color: #333333;
    line-height: 50px;
    padding-left: 15px;
    border-bottom: 1px solid #efefef;
    margin-bottom: 10px;
}
.personal_attendance {
    border: 1px solid #e9f1f3;
    box-sizing: border-box;
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
.el-input--mini .el-input__inner {
    height: 36px;
    line-height: 36px;
}

/* input select 样式 */
.input_select {
    float: left;
    width: 13%;
}
.el-select > .el-input {
    display: block;
    font-size: 12px;
}
.querybar span {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 20px;
    color: #333333;
    display: block;
    float: left;
    margin-top: 11.8px;
}
</style>
