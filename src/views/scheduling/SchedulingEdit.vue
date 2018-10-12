<template>
    <section>
        <p class="crumbs">
            <span @click="backup">排班 > </span>
            <span>排班编辑</span>
        </p>
        <section class="arrange">
            <h3>排班</h3>
            <div class="employee_infor_box">
                <ul class="employee_infor">
                    <li>
                        <span>项目：{{ employeeInfor.entry }}</span>
                        <span>小组: {{ employeeInfor.group }}</span>
                        <span>姓名：{{ employeeInfor.realname }}</span>
                        <span>工号：{{ employeeInfor.username }}</span>
                    </li>
                </ul>
                <div class="employee_infor_left">
                    <label>
                        <input v-if='(currentYear < entryYear || (currentYear <= entryYear && currentMonth  <  entryMonth))' type="checkbox" class="total_selection 入职前" disabled="disabled"> 
                        <input v-else-if='outTime' type="checkbox" class="total_selection" disabled="disabled"> 
                        <input v-else type="checkbox" class="total_selection" @change="changeState(checkAll)" v-model="checkAll"> 全选 
                    </label>
                    <el-button style="padding: 0;width: 70px;padding-right: 8px;" v-if='(currentYear < entryYear || (currentYear <= entryYear && currentMonth  <  entryMonth))'  type="primary" class="btn_download" id="button" @click="editClass" disabled>
                        <svg-icon icon-class="edit" id="svg-icon" style="margin:0;margin-left: 12px;"/><span>编辑</span>
                    </el-button>
                    <el-button style="padding: 0;width: 70px;padding-right: 8px;" v-else-if='outTime'  type="primary" class="btn_download" id="button" @click="editClass" disabled>
                        <svg-icon icon-class="edit" id="svg-icon" style="margin:0;margin-left: 12px;"/><span>编辑</span>
                    </el-button>
                    <el-button style="padding: 0;width: 70px;padding-right: 8px;" v-else  type="primary" class="btn_download" id="button" @click="editClass">
                        <svg-icon icon-class="edit" id="svg-icon" style="margin:0;margin-left: 12px;"/><span>编辑</span>
                    </el-button>

                </div>
            </div>
            <!-- <div class="edit_box"> -->
            <el-dialog title="排班编辑" :visible.sync="dialogFormVisible" :lock-scroll="false" @close='closeDialog'>
                <div class="select_box">
                    <span>小组名称</span>
                    <el-select v-model="shiftName" placeholder="请选择小组" @change="classInfo">
                        <el-option v-for="(item,index) in shiftOption" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </div>
                <div class="select_box">
                    <span>班次安排</span>
                    <el-select v-model="shiftId" placeholder="请选择班次">
                        <el-option v-for="(item,index) in optionsData" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button v-if="shiftId" type="primary" @click="sureBtn" style="background-color:#55CE63;border-color:#55CE63;">确 定</el-button>
                    <el-button v-else type="primary" @click="sureBtn" style="background-color:#55CE63;border-color:#55CE63;" disabled>确 定</el-button>
                    <el-button @click="cancelBtn" style="background-color:#A6B7BF;border-color:#A6B7BF;">取 消</el-button>
                </div>
            </el-dialog>
            <div id="calendar">
                <div class="month">
                    <div>
                        <!--点击会触发pickpre函数，重新刷新当前日期  -->
                        <span class="arrow" @click="pickPre(currentYear,currentMonth)">&lt;</span>
                        <span class="year-month">
                            <span class="choose-year">{{ currentYear }} 年</span>
                            <span class="choose-month">{{ currentMonth }} 月</span>
                        </span>
                        <span class="arrow" @click="pickNext(currentYear,currentMonth)">&gt;</span>
                    </div>
                </div>
                <!-- 星期 -->
                <ul class="weekdays">
                    <li v-for="(item,index) in weekdays">{{ item.weekdays }}</li>
                </ul>
                <!-- 日期 -->
                <ul class="days">
                    <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
                    <li v-for="item  in days" :class="{active:item.dayobject.day.getFullYear() == newDate.getFullYear() && item.dayobject.day.getMonth() == newDate.getMonth() && item.dayobject.day.getDate() == newDate.getDate(),'other-month':item.dayobject.day.getMonth()+1 != currentMonth}">
                        <!--本月-->
                        <p :title="item.dayobject.groupName ? item.dayobject.groupName + item.dayobject.name : item.dayobject.name">
                            <i>{{item.dayobject.groupName}}</i>
                            <i v-if="item.dayobject.groupName">-</i>
                            <i>{{ item.dayobject.name }}</i>
                        </p>
                        <!--如果不是本月  改变类名加灰色-->
                        <span v-if="item.dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ item.dayobject.day.getDate() }}</span>
                        <!--如果是本月  还需要判断是不是这一天-->
                        <span v-else :style="{'background':item.dayobject.color}">
                            <!--今天  同年同月同日-->
                            <span v-if="item.dayobject.day.getFullYear() == newDate.getFullYear() && item.dayobject.day.getMonth() == newDate.getMonth() && item.dayobject.day.getDate() == newDate.getDate()">今</span>
                            <span v-else>{{ item.dayobject.day.getDate() }}</span>
                        </span>
                        <input v-if='item.dayobject.day.getFullYear() < entryYear || (item.dayobject.day.getFullYear() <= entryYear && item.dayobject.day.getMonth()+1 < entryMonth) || (item.dayobject.day.getDate() < entryDate && item.dayobject.day.getMonth()+1 <= entryMonth && item.dayobject.day.getFullYear() <= entryYear) ' class="checkbox 入职前" type="checkbox" disabled="disabled">
                        <!-- <input v-if="(item.dayobject.day.getFullYear()+)<(entryYear+entryMonth+entryDate)" class="checkbox" type="checkbox" disabled="disabled"> -->
                        <!-- <input v-if="item.dayobject.day.getFullYear() < entryYear || (item.dayobject.day.getFullYear() < entryYear && item.dayobject.day.getMonth()+1 < entryMonth) || (item.dayobject.day.getFullYear() < entryYear && item.dayobject.day.getMonth()+1 < entryMonth && item.dayobject.day.getDate() < entryDate && item.dayobject.day.getMonth()+1 == entryMonth)" class="checkbox" type="checkbox" disabled="disabled">     -->
                        <input v-else-if='outTime' class="checkbox" type="checkbox" disabled="disabled">
                        <input v-else v-model='item.checked' class="checkbox" type="checkbox" @change="checkStade(item.dayobject.day,item.checked)">
                    </li>
                </ul>
            </div>
            <div class="scheduling">
                <p>排班情况</p>
                <table class="schedulingTable">
                    <tr>
                        <td v-for="(item,index) in classInfor" :style="{'background':item.remarkTwo}">{{ item.shiftName }}</td>
                    </tr>
                    <tr>
                        <td v-for="(item,index) in classInfor">{{ item.total }}</td>
                    </tr>
                </table>
            </div>
        </section>
    </section>
</template>

<script>
/**
 * @author Shumei Zhao
 * @date 2018/7/31
 * @desc [排班编辑] 页面
 * @module 组件引用位置
 */

import comm from "@/utils/comm";
import commdate from "@/utils/commdate";
import {
    requestClasses,
    editClasses,
    pageInfos,
    userInfos,
    classesInfos,
    shiftInfos
} from "@/api/scheduling/schedulingEdit";
export default {
    inject: ["reload"], //刷新页面依赖
    name: "schedulingedit",
    data() {
        return {
            formLabelWidth: "",
            currentDay: 1,
            isDisabled:true,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days: [],
            userId: "",
            roleId:'',//列表加载过来的id
            fontColor: "#fff", //当前月字体颜色
            newDate: new Date(),
            disabled: true,
            checkedOption: [], // 选中的选项
            dialogFormVisible: false,
            checkAll: false, // 全选状态
            shiftId: "", //班次id
            groupId: "", //小组id
            optionsData: [], // 编辑窗口的班次选项
            classData: [], //日历班次
            employeeInfor: {}, // 员工信息
            classInfor: [], // 排班情况
            shiftName: "", //小组下拉框
            shiftOption: [], //小组下拉框
            weekdays: [
                { weekdays: "日" },
                { weekdays: "一" },
                { weekdays: "二" },
                { weekdays: "三" },
                { weekdays: "四" },
                { weekdays: "五" },
                { weekdays: "六" }
            ],
            entryYear: '', //入职日期 年
            entryMonth: '', //入职日期 月
            entryDate: '', //入职日期 日
            outYear: '', //离职日期 年
            outMonth: '', //离职日期 月
            outDate: '', //离职日期 日
            entryTime:'',//入职年月日
            outTime:"",//离职日期
        };
    },
    created() {
        let that = this;
        that.initData(null);
    },
    watch: {
        shiftName(val) {
            console.log(val)
            this.shiftName = val;
            // console.log(this.shiftName, "小组id");
        }
    },
    methods: {
        closeDialog() {
            this.shiftName = "";
            this.shiftId= '';
            console.log("点击空白关闭按钮")
            this.checkAll = false;
            this.days.forEach(items => {
                items.checked = false;
            })
        },
        //查看详情返回来源页
        backup() {
            this.$router.push({path: `/scheduling/schedulingmanage`});
        },
        // 格式化时间 shumei zhao
        FormatDates(time) {
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
        // 将当月数据添加到当月days中
        classList() {
            var i = 0;
            var dayData = [];
            this.days.forEach(days => {
                var d = days.dayobject.day;
                var date =
                    d.getFullYear() +
                    "-" +
                    (d.getMonth() + 1 < 10
                        ? "0" + (d.getMonth() + 1)
                        : d.getMonth() + 1) +
                    "-" +
                    (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
                this.classData.forEach(data => {
                    // console.log(data, "返回的数据");
                    if(data.scheduleDate == date){

                        days.dayobject.date = data.scheduleDate;
                        days.dayobject.name = data.name;
                        days.dayobject.groupName = data.groupName;
                        days.dayobject.color = data.color;
                        days.dayobject.id = data.id;

                    }
                });
            });
            // console.log(this.days, 2222222);
        },
        // 编辑
        editClass() {
            // this.value = "";
            if (this.checkedOption.length == 0) {
                this.dialogFormVisible = false;
                comm.open(this, "请选择日期");
            } else {
                this.dialogFormVisible = true;
            }
            // this.classInfo()
            this.shiftInfo();
        },
        // 弹窗确定按钮
        sureBtn() {
            var checked = this.checkedOption.toString();
            let data = {
                dates: checked,
                userId: this.userId,
                id: this.shiftId
            };
            console.log(data ,"确定参数");
            editClasses(data)
                .then(res => {
                    console.log("成功")
                    pageInfos({
                        date: this.processingDate(),
                        userId: this.userId
                    })
                        .then(res => {
                            console.log(res, "新班次");
                            this.classData = res.data.data;
                            this.classList();
                            this.checkedOption = [];
                            location.reload();
                            var host = window.location.host
                            // console.log("hahah")
                            // console.log(`http://`+host+`/#/scheduling/edit/${this.userId}?groupID=${this.groupId}&currentYear=${this.currentYear}&currentMonth=${this.currentMonth}`)
                            window.location.href = `http://`+host+`/#/scheduling/edit/${this.userId}?groupID=${this.groupId}&currentYear=${this.currentYear}&currentMonth=${this.currentMonth}`
                            // window.location.href =`http://localhost:8080/#/scheduling/edit/${this.userId}?groupID=${this.groupId}&currentYear=${this.currentYear}&currentMonth=${this.currentMonth}`
                        })
                        .catch(error => {
                            // console.log(error + "错误");
                        });
                })
                .catch(error => {
                    // console.log(error + "错误");
                });
            this.dialogFormVisible = false;
            this.days.forEach(item => {
                item.checked = false;
            });
            this.checkAll = false;
            this.reload();
        },
        // 弹窗取消按钮
        cancelBtn() {
            this.shiftName = "";
            this.shiftId = "";
            this.dialogFormVisible = false;
            this.days.forEach(item => {
                item.checked = false;
            });
            this.checkAll = false;
            this.pageInfo();
        },
        // 参数：日期
        processingDate(value) {
            // var next = parseInt(this.currentMonth) + 1;
            let formatDate =
                this.currentYear +
                "-" +
                (this.currentMonth < 10
                    ? "0" + this.currentMonth
                    : this.currentMonth);
            let lastMonth =
                this.currentYear +
                "-" +
                (parseInt(this.currentMonth) - 1 < 10
                    ? "0" + (parseInt(this.currentMonth) - 1)
                    : parseInt(this.currentMonth) - 1);
            let nextMonth =
                this.currentYear +
                "-" +
                (parseInt(this.currentMonth) + 1 < 10
                    ? "0" + (parseInt(this.currentMonth) + 1)
                    : parseInt(this.currentMonth) + 1);
            let dateList = lastMonth + "," + formatDate + "," + nextMonth;
            // console.log(dateList,"时间参数")
            return dateList;
        },
        initData(cur) {
            let that = this;
            let leftcount = 0; //存放剩余数量
            let date;
            if (cur) {
                date = new Date(cur);
            } else {
                let now = new Date();
                let d = new Date(
                    that.formatDate(now.getFullYear(), now.getMonth(), 1)
                );
                d.setDate(42);
                date = new Date(
                    that.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
                );
            }
            that.currentDay = date.getDate();
            that.currentYear = date.getFullYear();
            that.currentMonth = date.getMonth() + 1;
            that.currentWeek = date.getDay() + 1; // 1...6,0
            if (that.currentWeek == 0) {
                that.currentWeek = 7;
            }
            let str = that.formatDate(
                that.currentYear,
                that.currentMonth,
                that.currentDay
            );
            that.days.length = 0;
            // 今天是周日，放在第一行第7个位置，前面6个
            //初始化本周
            for (let i = that.currentWeek - 1; i >= 0; i--) {
                let d = new Date(str);
                d.setDate(d.getDate() - i);
                let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                dayobject.day = d;
                dayobject.name = "暂未排班";
                dayobject.groupName = "";
                that.days.push({ dayobject, checked: false }); //将日期放入data 中的days数组 供页面渲染使用
            }
            //其他周
            for (let i = 1; i <= 42 - that.currentWeek; i++) {
                let d = new Date(str);
                d.setDate(d.getDate() + i);
                let dayobject = {};
                dayobject.day = d;
                dayobject.name = "暂未排班";
                dayobject.groupName = "";
                that.days.push({ dayobject, checked: false });
            }
        },
        pickPre(year, month) {
            this.checkAll = false;
            let that = this;
            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            let d = new Date(that.formatDate(year, month, 1));
            d.setDate(0);
            that.initData(
                that.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
            );
            this.checkedOption = [];
            this.pageInfo();
            this.classList();
            this.clessesInfor();
        },
        pickNext(year, month) {
            this.checkAll = false;
            let that = this;
            let d = new Date(that.formatDate(year, month, 1));
            d.setDate(42);
            that.initData(
                that.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
            );
            this.checkedOption = [];
            this.pageInfo();
            this.classList();
            this.clessesInfor();
        },
        // pickYear(year, month) {
        //     alert(year + "," + month);
        // },
        // 返回 类似 2016-01-02 格式的字符串
        formatDate(year, month, day) {
            let y = year;
            let m = month;
            if (m < 10) m = "0" + m;
            let d = day;
            if (d < 10) d = "0" + d;
            return y + "-" + m + "-" + d;
        },

        // 选中项
        checkedDate(day, data) {
            var date = this.FormatDates(day);
            if (data == true) {
                this.checkedOption.push(date);
                // console.log(this.checkedOption,"单选 选中项1")
            } else {
                this.checkedOption.splice(this.checkedOption.indexOf(date), 1);
                // console.log(this.checkedOption,"单选后选中的项2")
            }
        },
        // 全选
        changeState(checkAll) {
            if(checkAll == true){
                this.days.forEach(item => {
                    if(item.dayobject.date < this.entryTime.substr(0,10)){
                        // console.log(item.dayobject.day,"入职前")
                        item.checked = !this.checkAll;
                    }else{
                        // console.log(item.dayobject.day,"正常")
                        item.checked = this.checkAll;
                        // if(item.checked == this.checkAll){
                            // console.log(item.dayobject.date,item.checked)
                            // console.log(item.checked,"可选")
                            var items = item.dayobject.day;
                            var date = this.FormatDates(items);
                            // var date = item.dayobject.date;
                            this.checkedOption.push(date);
                            // console.log(this.checkedOption,"点击全选后选中的日期")
                        // }
                    }
                
                });
            }else{
                this.days.forEach(item => {
                    item.checked = this.checkAll;
                })
                this.checkedOption = []
                // console.log(this.checkedOption,"取消全选后的日期")
            }
        },
        // 单选
        checkStade(day, data) {
            if (!data) {
                this.checkAll = false;
            } else {
                var flag = true;
                this.days.forEach(item => {
                    if (item.checked == false) {
                        flag = false;
                    }
                });
                this.checkAll = flag;
            }
            this.checkedDate(day, data);
        },
        // 排班信息
        pageInfo() {
            pageInfos({ date: this.processingDate(), userId: this.userId })
                .then(res => {
                    this.classData = res.data.data;
                    this.classList();
                    this.checkedOption = [];
                })
                .catch(error => {
                    // console.log(error + "错误");
                });
            this.clessesInfor();
        },
        // 弹窗下拉框小组
        shiftInfo() {
            shiftInfos({ userId: this.userId }).then(res => {
                this.shiftOption = res.data.data;
            });
        },
        // 弹窗班次下拉框选项
        classInfo() {
            requestClasses({
                groupId: this.shiftName
            })
                .then(res => {
                    console.log(res, "班次");
                    this.optionsData = res.data.data;
                })
                .catch(error => {
                    // console.log(error + "错误");
                });
        },
        // 员工信息
        userInfo() {
            let data = {
                id: this.userId
            };
            userInfos(data)
                .then(res => {
                    // console.log(res,"title")
                    if (res && res.data && res.data.data) {
                        // console.log(res.data.data)
                        this.employeeInfor = res.data.data;
                        var data = res.data.data;
                        this.entryTime = data.entryTime;
                        this.outTime = data.outDate
                        if(this.entryTime){
                            this.entryYear = parseInt(commdate
                            .timestampToTime(this.entryTime)
                            .substr(0, 4)); //入职日期 年
                            this.entryMonth = parseInt(commdate
                                .timestampToTime(this.entryTime)
                                .substr(5, 2)); //入职日期 月
                            this.entryDate = parseInt(commdate
                                .timestampToTime(this.entryTime)
                            .substr(8, 2)); //入职日期 日
                            // console.log(this.entryYear,this.entryMonth,this.entryDate,"入职年月日")
                        }
                        if(this.outTime){
                            this.outYear = parseInt(this.outTime.substr(0, 4)); //离职日期 年
                            this.outMonth = parseInt(this.outTime.substr(5, 2)); //离职日期 月
                            this.outDate = parseInt(this.outTime.substr(8, 2)); //离职日期 日
                            // console.log(this.outYear,this.outMonth,this.outDate,"返回离职年月日")                           
                        }else{
                            this.outTime = "";
                        }
                    }
                })
                .catch(error => {
                    // console.log(error + "错误");
                });
        },
        // 排班情况
        clessesInfor() {
            let formatDate =
                this.currentYear +
                "-" +
                (this.currentMonth < 10
                    ? "0" + this.currentMonth
                    : this.currentMonth);
            classesInfos({
                scheduleDate: formatDate,
                userId: this.userId
            })
                .then(res => {
                    this.classInfor = res.data.data;
                })
                .catch(error => {
                    // console.log(error + "错误");
                });
        },
    },
    mounted() {
        this.userId = this.$route.params.id;
        // this.roleId = this.$route.query.id
        this.groupId = this.$route.query.groupID;
        this.currentYear = this.$route.query.currentYear;
        this.currentMonth = this.$route.query.currentMonth;
        this.processingDate();
        this.pageInfo();
        this.userInfo();
        let d = new Date(this.formatDate(this.currentYear, this.currentMonth, 1));
            d.setDate(42);
            this.initData(
                this.formatDate(this.currentYear, this.currentMonth, 1)
            );
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
@import "@/styles/scheduling/schedulingedit.scss";
</style>
