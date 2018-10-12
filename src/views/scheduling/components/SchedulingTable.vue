<template>
    <section class="statistics_bottom statistics_bottom_sm">
        <el-tabs v-model="activeName">
            <div class="query_box">
                <div class="query" v-if="this.activeName!='first'">
                    <span>小组</span>
                    <el-select v-model="formInline.groupId" placeholder="请选择" @change='groupSel'>
                        <el-option v-for="(item,index) in groupArr" :key="index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <span v-if="this.activeName!='first'&&formInline.flag==1">班次</span>
                    <el-input v-if="this.activeName!='first'&&formInline.flag==1" v-model="formInline.shiftName" placeholder="请输入内容"></el-input>
                    <span>姓名</span>
                    <el-input v-model="formInline.realname" placeholder="请输入姓名"></el-input>
                    <span>工号</span>
                    <el-input v-model="formInline.username" placeholder="请输入工号"></el-input>
                </div>
                <div class="operation" :class="{actives:this.activeName =='first'}">
                    <el-button size="small" type="success" class="btn_Import" id="button" @click='exportTable' style="background-color:#55CE63;border-color:#55CE63">
                        <!-- <svg-icon icon-class="export" id="svg-icon" style="margin-right: 2.4px;" /> -->
                        <svg-icon icon-class="export" id="svg-icon" style="margin-right: 2.4px;" />
                        <span>导出</span>
                    </el-button>
                    <el-button size="small" type="primary" class="btn_download" icon="el-icon-search" id="button" v-if="this.activeName!='first'" @click="todaySearch">
                        <span style="margin-left: -4px;">查询</span>
                    </el-button>
                </div>
            </div>

            <el-tab-pane :label="tabTitleFirst" name="first">
                <template>
                    <el-table stripe :data="tableData" :header-cell-style="getRowClass" v-if="this.activeName=='first'&&submitForm.flag==1">
                        <template>
                            <el-table-column v-for="(item,index) in labelData" :prop="item.prop" :label="item.label" :key="index">
                                <template slot-scope="scope">
                                    <span>{{ scope.row[item.prop] }}</span>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                    <!-- 暂无数据 -->
                    <NoData v-show="!tableData.length && this.activeName=='first' && submitForm.flag==1"></NoData>
                    <el-table stripe :data="tableData1" :header-cell-style="getRowClass" v-if="this.activeName=='first'&&submitForm.flag==2">
                        <template>
                            <el-table-column v-for="(item,index) in labelData1" :prop="item.prop" :label="item.label" :key="index">
                                <template slot-scope="scope">
                                    <span>{{ scope.row[item.prop] }}</span>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                    <!-- 暂无数据 -->
                    <NoData v-show="!tableData1.length && this.activeName=='first' && submitForm.flag==2"></NoData>
                    <el-table stripe :data="tableData2" :header-cell-style="getRowClass" v-if="this.activeName=='first'&&submitForm.flag==3">
                        <template>
                            <el-table-column v-for="(item,index) in labelData2" :prop="item.prop" :label="item.label" :key="index">
                                <template slot-scope="scope">
                                    <span>{{ scope.row[item.prop] }}</span>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                    <!-- 暂无数据 -->
                    <NoData v-show="!tableData2.length && this.activeName=='first' && submitForm.flag==3"></NoData>
                    <!-- 暂无数据 -->
                    <!-- <NoData v-show="!tableData.length || !tableData1.length || !tableData2.length"></NoData> -->
                </template>
            </el-tab-pane>
            <el-tab-pane :label="tabTitleSecond" name="second" v-if="this.submitForm.flag!=3">
                <template>
                    <el-table stripe :data="tableData3" :header-cell-style="getRowClass" v-if="this.activeName=='second'&&submitForm.flag==1">
                        <template>
                            <el-table-column v-for="(item,index) in labelData3" :prop="item.prop" :label="item.label" :key="index">
                                <template slot-scope="scope">
                                    <span>{{ scope.row[item.prop] }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button @click="handleClickEitor(scope.row)" type="text" size="small">编辑</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                    <!-- 暂无数据 -->
                    <NoData v-show="!tableData3.length && this.activeName=='second' && submitForm.flag==1"></NoData>
                    <!-- 翻页 -->
                    <Pagination v-show="this.activeName=='second'&&submitForm.flag==1&&tableData3.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>

                    <el-table stripe :data="tableData4" :header-cell-style="getRowClass" v-if="this.activeName=='second'&&submitForm.flag==2">
                        <template>
                            <el-table-column v-for="(item,index) in labelData4" :prop="item.prop" :label="item.label" :key="index">
                                <template slot-scope="scope">
                                    <span>{{ scope.row[item.prop] }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button @click="handleClickEitor(scope.row)" type="text" size="small">编辑</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                    <!-- 暂无数据 -->
                    <NoData v-show="!tableData4.length && this.activeName=='second' && submitForm.flag==2"></NoData>
                    <!-- 翻页 -->
                    <Pagination v-show="this.activeName=='second'&&submitForm.flag==2&&tableData4.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
                </template>

            </el-tab-pane>

        </el-tabs>
        <Loading v-show="Loading"></Loading>
    </section>
</template>
 
<script>
/**
 * @author Shumei Zhao
 * @date 2018/8/23
 * @desc [排班管理] 页面表格 \src\views\scheduling\SchedulingManage
 * @module 组件引用位置
 */

import {
    requestStatisList,
    requestDetailsList,
    personnelDetailsProject
} from "@/api/scheduling/schedulingManage";
import { mapGetters, mapActions } from "vuex";
import commdate from "@/utils/commdate";
import TempCache from "@/utils/tempcache";
import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
export default {
    name: "arrangeTable",
    data() {
        return {
            activeName: "first", // tab
            userId: "",
            tableData: [],
            labelData: [],
            tableData1: [], //月统计
            labelData1: [], //月统计
            tableData4: [], //月详情
            labelData4: [], //月详情
            tableData3: [], //日详情
            labelData3: [], //日详情
            tableData2: [], //年统计
            labelData2: [], //年统计
            Loading: false,
            i: 1, //列表表头下标
            // flag: 1,
            // dateTime: "2018-08-23",
            groupValue: "",
            groupArr: [],
            groupID: "",
            realname: "",
            username: "",
            classesName: "",
            currentPage: 0, //当前页数
            total: 1, //总数
            totalPages: 1, //总数据
            pageSize: 10,
            tabTitleFirst: "",
            tabTitleSecond: "",
            formInline: {
                //表头查询条件
                flag: 1,
                groupId: "", //搜索 小组 日
                realname: "", // 搜索 姓名 日
                username: "", // 搜索 工号 日
                shiftName: "", // 搜索 班次 日
                page: 1,
                dateTime: new Date(),
                limit: 10
            },
            submitForm: {
                flag: 1,
                groupId: "", //搜索 小组 日
                realname: "", // 搜索 姓名 日
                username: "", // 搜索 工号 日
                shiftName: "", // 搜索 班次 日
                page: 1,
                dateTime: new Date(),
                limit: 10
            },
            nowDate: new Date()
            // currentYear:'',//向排班编辑页面s月
        };
    },
    computed: {
        ...mapGetters(["getArrangeDate", "getArrangeTime"])
    },
    components: {
        NoData,
        Loading,
        Pagination
    },
    methods: {
        /*翻页*/
        handleCilck(val) {
            this.submitForm.page = val;
            Object.assign(this.formInline, this.submitForm);
            this.tableDetals(this.submitForm);
        },
        jumpPage(value) {
            this.submitForm.page = value;
            Object.assign(this.formInline, this.submitForm);
            this.tableDetals(this.submitForm);
        },
        //查询
        todaySearch() {
            this.formInline.page = 1;
            Object.assign(this.submitForm, this.formInline);
            this.tableDetals(this.submitForm);
        },
        // 表头颜色
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return "background:#92A6B1";
            } else {
                return "";
            }
        },
        //小组下拉框
        groupFac() {
            personnelDetailsProject({ type: 3 })
                .then(response => {
                    if (response && response.data) {
                        this.groupArr = response.data.data;
                        TempCache.setItem("groupList", this.groupArr);
                    }
                })
                .catch(error => {
                    // console.log(error, 222)
                });
        },
        //选择小组下拉框
        groupSel(selVal) {
            this.groupID = selVal;
        },
        //排班统计--导出
        exportTable() {
            if (this.activeName == "first") {
                window.location.href =
                    process.env.BASE_API +
                    `/admin/bpoShiftsUser/exportShiftsStatistics?flag=${
                        this.formInline.flag
                    }&dateTime=${this.submitForm.dateTime}&userId=${
                        this.userId
                    }`;
            } else if (this.activeName == "second") {
                window.location.href =
                    process.env.BASE_API +
                    `/admin/bpoShiftsCode/exportShiftCode?groupId=${
                        this.formInline.groupId
                    }&name=${this.formInline.shiftName}&realname=${
                        this.formInline.realname
                    }&username=${this.formInline.username}&flag=${
                        this.formInline.flag
                    }&dateTime=${this.formInline.dateTime}&userId=${
                        this.userId
                    }`;
            }
        },
        //编辑
        handleClickEitor(row) {
            this.$router.push({
                path: `/scheduling/edit/${row.id}`,
                query: {
                    groupID: row.groupId,
                    currentYear: this.currentYear,
                    currentMonth: this.currentMonth
                }
            });
        },
        // 处理日
        dateDay(time) {
            var dates =
                time.getFullYear() +
                "-" +
                (time.getMonth() + 1 < 10
                    ? "0" + (time.getMonth() + 1)
                    : time.getMonth() + 1) +
                "-" +
                (time.getDate() < 10 ? "0" + time.getDate() : time.getDate());
            return dates;
        },
        // 处理月
        dateMonth(time) {
            var dates =
                time.getFullYear() +
                "-" +
                (time.getMonth() + 1 < 10
                    ? "0" + (time.getMonth() + 1)
                    : time.getMonth() + 1)
            return dates;
        },
        // 处理年
        dateYear(time) {
            var dates =
                time.getFullYear()
            return dates;
        },
        //排班统计
        dataList() {
            let formatDate = commdate.timestampToTime(this.getArrangeTime);
            switch (this.submitForm.flag) {
                case 1:
                    this.submitForm.dateTime = formatDate;
                    break;
                case 2:
                    this.submitForm.dateTime = formatDate.substring(0, 7);
                    break;
                case 3:
                    this.submitForm.dateTime = formatDate.substring(0, 4);
                    break;
            }
            this.Loading = true;
            requestStatisList({
                flag: this.submitForm.flag,
                dateTime: this.submitForm.dateTime
            }).then(res => {
                this.Loading = false;
                if (this.submitForm.flag == 1 && this.activeName == "first") {
                    var dateTime = Date.parse(new Date( this.submitForm.dateTime)) / 1000; //时间控件所选日期
                    var nowDate = Date.parse(new Date( this.dateDay(this.nowDate))) / 1000; //当前日期
                    console.log(dateTime,nowDate,"日")
                    if(dateTime>=nowDate){
                        this.tableData = res.data.data.dataList;
                        this.labelData = [];
                        this.labelData = [
                            {
                                label: "小组",
                                prop: "groupName"
                            },
                            {
                                label: "指标",
                                prop: "shiftName"
                            }
                        ];
                    }else{
                        this.tableData = res.data.data.dataList;
                        this.labelData = [];
                        this.labelData = [
                            {
                                label: "小组",
                                prop: "groupName"
                            },
                            {
                                label: "指标",
                                prop: "shiftName"
                            },
                            {
                                label: "数据",
                                prop: "data"
                            }
                        ];
                    }
                    // this.tableData = res.data.data.dataList;
                    // this.labelData = [];
                    // this.labelData = [
                    //     {
                    //         label: "小组",
                    //         prop: "groupName"
                    //     },
                    //     {
                    //         label: "指标",
                    //         prop: "shiftName"
                    //     },
                    //     {
                    //         label: "数据",
                    //         prop: "data"
                    //     }
                    // ];
                } else if (
                    this.submitForm.flag == 2 &&
                    this.activeName == "first"
                ) {
                    var dateTime = Date.parse(new Date( this.submitForm.dateTime)) / 1000; //时间控件所选日期
                    var nowDate = Date.parse(new Date( this.dateMonth(this.nowDate))) / 1000; //当前日期
                    console.log(dateTime,nowDate,"月")
                    if(dateTime>nowDate){
                        this.tableData1 = res.data.data.dataList;
                        // this.i = res.data.data.length;
                        this.labelData1 = [];
                        this.labelData1 = [
                            {
                                label: "小组",
                                prop: "groupName"
                            },
                            {
                                label: "指标",
                                prop: "shiftName"
                            }
                        ];
                    }else{
                        this.tableData1 = res.data.data.dataList;
                        this.i = res.data.data.length;
                        this.labelData1 = [];
                        this.labelData1 = [
                            {
                                label: "小组",
                                prop: "groupName"
                            },
                            {
                                label: "指标",
                                prop: "shiftName"
                            },
                            {
                                label: "月数据",
                                prop: "monthData"
                            },
                            {
                                label: "月平均",
                                prop: "monthAverage"
                            }
                        ];
                        for (var i = 1; i <= this.i; i++) {
                            this.labelData1.push({
                                label: i + "号",
                                prop: "day_" + i
                            });
                        }
                    }
                    // this.tableData1 = res.data.data.dataList;
                    // this.i = res.data.data.length;
                    // this.labelData1 = [];
                    // this.labelData1 = [
                    //     {
                    //         label: "小组",
                    //         prop: "groupName"
                    //     },
                    //     {
                    //         label: "指标",
                    //         prop: "shiftName"
                    //     },
                    //     {
                    //         label: "月数据",
                    //         prop: "monthData"
                    //     },
                    //     {
                    //         label: "月平均",
                    //         prop: "monthAverage"
                    //     }
                    // ];
                    // for (var i = 1; i <= this.i; i++) {
                    //     this.labelData1.push({
                    //         label: i + "号",
                    //         prop: "day_" + i
                    //     });
                    // }
                } else if (
                    this.submitForm.flag == 3 &&
                    this.activeName == "first"
                ) {
                    var dateTime = Date.parse(new Date( this.submitForm.dateTime)) / 1000; //时间控件所选日期
                    var nowDate = Date.parse(new Date( this.dateYear(this.nowDate))) / 1000; //当前日期
                    console.log(this.submitForm.dateTime,this.nowDate.getFullYear(),"年")
                    if(this.submitForm.dateTime>this.nowDate.getFullYear()){
                        this.tableData2 = res.data.data.dataList;
                        this.i = res.data.data.length;
                        this.labelData = [];
                        this.labelData2 = [
                            {
                                label: "小组",
                                prop: "groupName"
                            },
                            {
                                label: "指标",
                                prop: "shiftName"
                            }
                        ]
                    }else{
                        this.tableData2 = res.data.data.dataList;
                        this.i = res.data.data.length;
                        this.labelData = [];
                        this.labelData2 = [
                            {
                                label: "小组",
                                prop: "groupName"
                            },
                            {
                                label: "指标",
                                prop: "shiftName"
                            },
                            {
                                label: "年汇总",
                                prop: "yearData"
                            },
                            {
                                label: "平均",
                                prop: "yearAverage"
                            }
                        ];
                        for (var i = 1; i <= this.i; i++) {
                            this.labelData2.push({
                                label: i + "月",
                                prop: "month_" + i
                            });
                        }
                    }
                    // this.tableData2 = res.data.data.dataList;
                    // this.i = res.data.data.length;
                    // this.labelData = [];
                    // this.labelData2 = [
                    //     {
                    //         label: "小组",
                    //         prop: "groupName"
                    //     },
                    //     {
                    //         label: "指标",
                    //         prop: "shiftName"
                    //     },
                    //     {
                    //         label: "年汇总",
                    //         prop: "yearData"
                    //     },
                    //     {
                    //         label: "平均",
                    //         prop: "yearAverage"
                    //     }
                    // ];
                    // for (var i = 1; i <= this.i; i++) {
                    //     this.labelData2.push({
                    //         label: i + "月",
                    //         prop: "month_" + i
                    //     });
                    // }
                }
            });
        },
        //排班详情
        tableDetals(data) {
            let formatDate = commdate.timestampToTime(this.getArrangeTime);
            switch (data.flag) {
                case 1:
                    data.dateTime = formatDate;
                    break;
                case 2:
                    data.dateTime = formatDate.substring(0, 7);
                    break;
                case 3:
                    data.dateTime = formatDate.substring(0, 4);
                    break;
            }
            this.formInline.dateTime = data.dateTime;
            this.Loading = true;
            requestDetailsList(data)
                .then(res => {
                    if (
                        this.submitForm.flag == "1" &&
                        this.activeName == "second"
                    ) {
                        if (
                            res &&
                            res.data &&
                            res.data.pageData &&
                            res.data.pageData.records.length
                        ) {
                            this.total = res.data.pageData.total; //翻页 总共多少条数据
                            this.totalPages = res.data.pageData.pages; //翻页 总共多少页
                            this.currentPage = res.data.pageData.current; //当前页码数
                            this.Loading = false;
                            this.tableData3 = [];
                            this.tableData3 = res.data.pageData.records[0];
                            this.labelData3 = [];
                            this.labelData3 = [
                                {
                                    label: "小组",
                                    prop: "groupName"
                                },
                                {
                                    label: "班次",
                                    prop: "name"
                                },
                                {
                                    label: "姓名",
                                    prop: "realname"
                                },
                                {
                                    label: "工号",
                                    prop: "username"
                                }
                            ];
                        } else {
                            this.Loading = false;
                            this.tableData3 = [];
                        }
                    } else if (
                        this.submitForm.flag == "2" &&
                        this.activeName == "second"
                    ) {
                        if (
                            res &&
                            res.data &&
                            res.data.pageData &&
                            res.data.pageData.records.length
                        ) {
                            this.total = res.data.pageData.total; //翻页 总共多少条数据
                            this.totalPages = res.data.pageData.pages; //翻页 总共多少页
                            this.currentPage = res.data.pageData.current; //当前页码数

                            this.Loading = false;
                            this.tableData4 = [];
                            this.tableData4 = res.data.pageData.records[0];
                            this.i = res.data.colNum;
                            this.labelData4 = [];
                            this.labelData4 = [
                                {
                                    label: "小组",
                                    prop: "groupName"
                                },
                                {
                                    label: "姓名",
                                    prop: "realname"
                                },
                                {
                                    label: "工号",
                                    prop: "username"
                                },
                                {
                                    label: "休假天数",
                                    prop: "holidayNumber"
                                },
                                {
                                    label: "排班天数",
                                    prop: "schedulingNumber"
                                },
                                {
                                    label: "事假时间(小时)",
                                    prop: "leaveTime"
                                },
                                {
                                    label: "年假时间(小时)",
                                    prop: "annualLeaveTime"
                                }
                            ];
                            for (var i = 1; i <= this.i; i++) {
                                this.labelData4.push({
                                    label: i + "号",
                                    prop: "day_" + i
                                });
                            }
                        } else {
                            this.Loading = false;
                            this.tableData4 = [];
                        }
                    }
                })
                .catch(error => {
                    console.log(error + "错误");
                });
        },
        ...mapActions(["setArrangeDate", "setArrangeTime"])
    },
    mounted() {
        let date = new Date();
        this.groupFac();
        this.setArrangeTime(date);
        this.tabTitleFirst = "该日排班统计";
        this.tabTitleSecond = "该日排班详情";
        this.userId = TempCache.getItem("userId");
    },
    watch: {
        getArrangeDate(val) {
            this.formInline.page = 1;
            this.submitForm.page = 1;
            this.submitForm.flag = val;
            this.formInline.groupId = "";
            this.submitForm.groupId = "";
            if (this.activeName == "first") {
                this.dataList();
            }
            this.activeName = "first";
        },
        getArrangeTime(val) {
            this.formInline.page = 1;
            this.submitForm.page = 1;
            this.submitForm.dateTime = val;
            this.formInline.groupId = "";
            this.submitForm.groupId = "";
            // 处理vuex里的时间
            if (commdate.timestampToTime(val).substr(5, 2) < 10) {
                this.currentYear = commdate.timestampToTime(val).substr(0, 4); //年
                this.currentMonth = commdate.timestampToTime(val).substr(6, 1);
            } else {
                this.currentYear = commdate.timestampToTime(val).substr(0, 4); //年
                this.currentMonth = commdate.timestampToTime(val).substr(5, 2);
            }
            if (this.activeName == "first") {
                this.dataList();
            }
            this.activeName = "first";
        },
        activeName(val) {
            this.submitForm.page = 1;
            if (val == "first") {
                this.submitForm.groupId = "";
                this.submitForm.realname = "";
                this.submitForm.username = "";
                this.submitForm.shiftName = "";
                this.formInline.groupId = "";
                this.formInline.realname = "";
                this.formInline.username = "";
                this.formInline.shiftName = "";
                this.dataList(this.formInline);
            } else if (val == "second") {
                this.submitForm.groupId = "";
                this.submitForm.realname = "";
                this.submitForm.username = "";
                this.submitForm.shiftName = "";
                this.formInline.groupId = "";
                this.formInline.realname = "";
                this.formInline.username = "";
                this.formInline.shiftName = "";
                this.tableDetals(this.formInline);
            }
        },
        "submitForm.flag"(val) {
            this.submitForm.page = 1;
            this.formInline.flag = val;
            if (val == "1") {
                this.tabTitleFirst = "该日排班统计";
                this.tabTitleSecond = "该日排班详情";
            } else if (val == "2") {
                this.tabTitleFirst = "该月排班统计";
                this.tabTitleSecond = "该月排班详情";
            } else {
                this.tabTitleFirst = "该年排班统计";
            }
        }
    }
};
</script>
 
<style rel="stylesheet/scss" lang="scss">
.statistics_bottom_sm {
    .el-tabs__content {
        overflow: initial !important;
        position: relative;
    }
    .actives {
        position: absolute;
        top: -58px;
        right: 0px;
    }
}
</style>
<style scoped>
.el-table__header-wrapper .has-gutter tr {
    background: rgb(146, 166, 177);
}
</style>
