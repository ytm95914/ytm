<template>
    <section class="myscheduling">
        <!-- 年份 月份 -->
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
                <li v-for="dayobject in days" :class="{active:dayobject.day.getFullYear() == newDate.getFullYear() && dayobject.day.getMonth() == newDate.getMonth() && dayobject.day.getDate() == newDate.getDate(),'other-month':dayobject.day.getMonth()+1 != currentMonth}">
                    <!-- <li v-for="dayobject in days" :class="{active:isToday,other-month:isOther}"> -->
                    <!-- <p :title="dayobject.groupName+'-'+dayobject.name"> -->
                    <p :title="dayobject.groupName ? dayobject.groupName + dayobject.name : dayobject.name">
                        {{dayobject.groupName}}
                        <i v-if="dayobject.groupName">-</i>
                        {{ dayobject.name }}
                    </p>
                    <!--本月-->
                    <!--如果不是本月  改变类名加灰色-->
                    <!-- <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span> -->
                    <span v-if="dayobject.day.getMonth()+1 != currentMonth">{{ dayobject.day.getDate() }}</span>
                    <!--如果是本月  还需要判断是不是这一天-->
                    <span v-else :style="{'background':dayobject.color}">
                        <!-- <i>{{ dayobject.name }}</i> -->
                        <!--今天  同年同月同日-->
                        <span v-if="dayobject.day.getFullYear() == newDate.getFullYear() && dayobject.day.getMonth() == newDate.getMonth() && dayobject.day.getDate() == newDate.getDate()">今</span>
                        <span v-else>{{ dayobject.day.getDate() }}</span>
                    </span>
 
                </li>
            </ul>
        </div>
        <ul class="class_interval">
            <li v-for="(value,index) in classes">
                <span :style="{'background':value.color}">{{value.name}}</span>
                <span>{{value.working_time}}</span>
            </li>
        </ul>
 
    </section>
</template>
 
<script>
/**
 * @author Shumei Zhao
 * @date 2018/7/31
 * @desc [我的排班] 页面
 * @module 组件引用位置
 */
 
import { requestClasses, requestDate } from "@/api/scheduling/myScheduling";
 
export default {
    name: "MyScheduling",
    data() {
        return {
            i: 0,
            classes: [],
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 0,
            currentMonthData: [], //
            days: [],
            classData: [],
            newDate: new Date(),
            weekdays: [
                { weekdays: "日" },
                { weekdays: "一" },
                { weekdays: "二" },
                { weekdays: "三" },
                { weekdays: "四" },
                { weekdays: "五" },
                { weekdays: "六" }
            ],
            isToday:true,
            isOther:true,
        };
    },
    methods: {
        selector(value) {
            let str = "";
            switch (value) {
                case "A":
                    str = "background: #11A0F8";
                    break;
                case "B":
                    str = "background: #55CE63";
                    break;
                case "C":
                    str = "background: #FFBC34";
                    break;
                case "D":
                    str = "background: #00BFE6";
                    break;
                case "休":
                    str = "background: #92A6B1";
                    break;
            }
            return str;
        },
        processingDate(value) {
            let formatDate =
                this.currentYear +
                "-" +
                (this.currentMonth < 10
                    ? "0" + this.currentMonth
                    : this.currentMonth);
            let lastMonth =
                this.currentYear +
                "-" +
                (this.currentMonth - 1 < 10
                    ? "0" + (this.currentMonth - 1)
                    : this.currentMonth - 1);
            let nextMonth =
                this.currentYear +
                "-" +
                (this.currentMonth + 1 < 10
                    ? "0" + (this.currentMonth + 1)
                    : this.currentMonth + 1);
            let dateList = lastMonth + "," + formatDate + "," + nextMonth;
            return dateList;
            console.log(dateList, "时间参数");
        },
        getClasses() {
            //获取当前员工 排班情况
            let formatDate =
                this.currentYear +
                "-" +
                (this.currentMonth < 10
                    ? "0" + this.currentMonth
                    : this.currentMonth);
            requestClasses({ date: formatDate })
                .then(res => {
                    // console.log(this.processingDate())
                    if (
                        res &&
                        res.data &&
                        res.data.data &&
                        res.data.data
                    ) {
                        //循环检测脏数据，正常测试可以去掉map循环
                        // res.data.data.map((v, i) => {
                        //     if (v.working_time) {
                        //         this.classes.push(res.data.data[i]);
                        //     }
                        // });
                        // console.log(res,"排班详情")
                        this.classes = res.data.data
                    }
                })
                .catch(error => {
                    // console.log(error + "错误");
                });
        },
        getMonthData() {
            requestDate({ date: this.processingDate() })
                .then(res => {
                    this.classData = res.data.data;
                    this.classList();
                })
                .catch(error => {
                    // console.log(error + "错误");
                });
        },
        classList() {
            var i = 0;
            this.days.forEach(days => {
                var d = days.day;
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
                        days.date = data.scheduleDate;
                        days.name = data.name;
                        days.groupName = data.groupName;
                        days.color = data.color;
                        days.id = data.id;
                    }
                });
            });
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
                dayobject.group = "";
                that.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
                // if(dayobject.day.getFullYear() == newDate.getFullYear() && dayobject.day.getMonth() == newDate.getMonth() && dayobject.day.getDate() == newDate.getDate()){
                //     this.isToday = true
                // }else{
                //     this.isToday = false
                // }
                // if(dayobject.day.getMonth()+1 != currentMonth){
                //     this.isOther = true
                // }else{
                //     isOther = false
                // }
            }
            //其他周
            for (let i = 1; i <= 42 - that.currentWeek; i++) {
                let d = new Date(str);
                d.setDate(d.getDate() + i);
                let dayobject = {};
                dayobject.day = d;
                dayobject.name = "暂未排班";
                dayobject.group = "";
                that.days.push(dayobject);
            }
        },
        pickPre(year, month) {
            let that = this;
            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            let d = new Date(that.formatDate(year, month, 1));
            d.setDate(0);
            that.initData(
                that.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
            );
            this.getMonthData();
            this.classes = [];
            this.getClasses();
        },
        pickNext(year, month) {
            this.checkAll = false;
            let that = this;
            let d = new Date(that.formatDate(year, month, 1));
            d.setDate(35);
            that.initData(
                that.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
            );
            this.getMonthData();
            this.classes = [];
            this.getClasses();
        },
        pickYear(year, month) {
            // alert(year + "," + month);
        },
        // 返回 类似 2016-01-02 格式的字符串
        formatDate(year, month, day) {
            let y = year;
            let m = month;
            if (m < 10) m = "0" + m;
            let d = day;
            if (d < 10) d = "0" + d;
            return y + "-" + m + "-" + d;
        }
    },
    mounted() {
        this.initData(null);
        this.classList();
        this.getClasses();
        this.getMonthData();
    }
};
</script>
 
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/scheduling/myscheduling.scss";
</style>