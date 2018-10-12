<template>
	<section class="statistics_top">
		<div class="statistics_top_left">
			<p class="statistics_title">{{detailsList.dimension}}</p>
			<ul class="details">
				<li v-for="(item,index) in detailsList.showData">
					<span v-if="flag == 1">{{index | string}}</span>
					<span v-else>{{index | strings}}</span>
					<span>{{ item}}</span>
					<span>{{index==0?'人':'%'}}</span>
				</li>
			</ul>
		</div>
		<div class="statistics_top_right">
			<div class="charts_title">
				<span>单位:人</span>
				<div class="explains">
					<span class="human"  v-if="flag!=3">排班人力</span>
					<span class="proportion"  v-if="flag!=3">排班比例</span>
					<span class="second_line"  v-if="flag!=3">二线人力配比</span>
					<span class="human"  v-if="flag==3">平均排班人力</span>
					<span class="proportion" v-if="flag==3">平均排班比例</span>
					<span class="second_line" v-if="flag==3">平均二线人力配比</span>
					<span class="all" v-if="flag!=3" @click="dialogVisible=true">
						<svg-icon icon-class="allsearch" style="width: 14px;height: 16px;color:#11A0F8;" /> 查看全部</span>
				</div>
			</div>
			<chart :_styles="'width:100%;height:90%'" :_xAxisData='xAxisDataArr' :_chartData="chartDataArr" :_id="'testCharts33'" :_title="''" :_color="color" :_showBol="true" :_type="'LineAndBar'"></chart>
		</div>
		<!--查看全部弹框-->
		<div class="layerBox">
			<el-dialog :visible.sync="dialogVisible" width="90%" :lock-scroll="false">
				<div class=" dialogBox">
					<div class="charts_title">
						<span style="font-size: 12px;">单位:人</span>
						<div class="explains" style="float: right;font-size: 12px;">
							<span class="human">排班人力</span>
							<span class="proportion">排班比例</span>
							<span class="second_line">二线人力配比</span>
						</div>
					</div>
					<chart :_styles="'width:100%;height:300px'" :_xAxisData='xAxisData' :_chartData="chartData" :_id="'testCharts66'" :_title="''" :_color="color" :_showBol="true" :_type="'LineAndBar'"></chart>
				</div>
			</el-dialog>
		</div>
	</section>
</template>
<script>
    /**
     * @author Shumei Zhao
     * @date 2018/8/23
     * @desc [排班管理] 页面详情 \src\views\scheduling\SchedulingManage
     * @module 组件引用位置
     */

    import { requestDetails } from "@/api/scheduling/schedulingManage";
    import chart from "@/components/PublicEcharts";
    import { mapGetters, mapActions } from "vuex";
    import commdate from "@/utils/commdate";

    export default {
        name: "arrangeDetail",
        data() {
            return {
                flag: 1,
                dateTime: new Date(),
                detailsList: [],
                chartData: [], //查看全部柱状图数据
                chartDataArr: [], //柱状图数据
                xAxisData: [], //查看全部x轴数据
                xAxisDataArr: [], //x轴数据
                dialogVisible: false,
                dateFlag: "日",
                color: ["#11a0f8",'#4a90e2','#E3AF22']
            };
        },
        components: {
            chart
        },
        computed: {
            ...mapGetters([
                'getArrangeDate',
                'getArrangeTime'
            ])
        },
        methods: {
            details() {
                let formatDate = commdate.timestampToTime(this.getArrangeTime);
                switch (this.flag) {
                    case 1:
                        this.dateTime = formatDate;
                        this.dateFlag = "日";
                        break;
                    case 2:
                        this.dateTime = formatDate.substring(0, 7);
                        this.dateFlag = "日";
                        break;
                    case 3:
                        this.dateTime = formatDate.substring(0, 4);
                        this.dateFlag = "月";
                        break;
                }
                requestDetails({
                    flag: this.flag,
                    dateTime: this.dateTime
                }).then(res => {
                    if (res && res.data && res.data) {
                        this.xAxisData = [];
                        this.chartData = [];
                        this.xAxisDataArr = [];
                        this.chartDataArr = [];
                        let newData = res.data.data;
                        this.detailsList = newData;
                        for (var i = 0; i < newData.chart1.length; i++) {
                            this.xAxisData.push(i + 1 + this.dateFlag);
                        }
                        if (this.flag == 1 || this.flag == 2) {
                            this.dateFlag = "日";
                            this.xAxisDataArr = this.xAxisData.slice(-10);
                            //柱状图
                            this.chartDataArr = [
                                {
                                    name: "排班人力",
                                    type: "bar",
                                    barWidth: "20",
                                    data: newData.chart1.slice(-10)
                                },
                                {
                                    name: "排班比例",
                                    type: "line",
                                    yAxisIndex: 1,
                                    symbolSize: 0,
                                    itemStyle: {
                                        normal: {
                                            lineStyle: {
                                                color: "#4a90e2"
                                            }
                                        }
                                    },
                                    data: newData.chart2.slice(-10)
                                },
                                {
                                    name: "二线人力配比",
                                    type: "line",
                                    yAxisIndex: 1,
                                    symbolSize: 0,
                                    itemStyle: {
                                        normal: {
                                            lineStyle: {
                                                color: "#E3AF22"
                                            }
                                        }
                                    },
                                    data: newData.chart3.slice(-10)
                                }
                            ];
                        } else {
                            this.dateFlag = "月";
                            this.xAxisDataArr = this.xAxisData;
                            //柱状图
                            this.chartDataArr = [
                                {
                                    name: "平均排班人力",
                                    type: "bar",
                                    barWidth: "20",
                                    data: newData.chart1
                                },
                                {
                                    name: "平均排班比例",
                                    type: "line",
                                    yAxisIndex: 1,
                                    symbolSize: 0,
                                    itemStyle: {
                                        normal: {
                                            lineStyle: {
                                                color: "#4a90e2"
                                            }
                                        }
                                    },
                                    data: newData.chart2
                                },
                                {
                                    name: "平均二线人力配比",
                                    type: "line",
                                    yAxisIndex: 1,
                                    symbolSize: 0,
                                    itemStyle: {
                                        normal: {
                                            lineStyle: {
                                                color: "#E3AF22"
                                            }
                                        }
                                    },
                                    data: newData.chart3
                                }
                            ];
                        }
                        //柱状图
                        this.chartData = [
                            {
                                name: "排班人力",
                                type: "bar",
                                barWidth: "20",
                                data: newData.chart1
                            },
                            {
                                name: "排班比例",
                                type: "line",
                                yAxisIndex: 1,
                                symbolSize: 0,
                                itemStyle: {
                                    normal: {
                                        lineStyle: {
                                            color: "#4a90e2"
                                        }
                                    }
                                },
                                data: newData.chart2
                            },
                            {
                                name: "二线人力配比",
                                type: "line",
                                yAxisIndex: 1,
                                symbolSize: 0,
                                itemStyle: {
                                    normal: {
                                        lineStyle: {
                                            color: "#E3AF22"
                                        }
                                    }
                                },
                                data: newData.chart3
                            }
                        ];
                    }
                });
            },
             ...mapActions([
				'setArrangeDate',
				'setArrangeTime',
				'setScheduling'
			])
        },
        filters: {
            string(val) {
                switch (val) {
                    case 0:
                        return "排班人力";
                        break;
                    case 1:
                        return "排班比例";
                        break;
                    case 2:
                        return "二线人力配比";
                        break;
                }
            },
            strings(val) {
                switch (val) {
                    case 0:
                        return "平均排班人力";
                        break;
                    case 1:
                        return "平均排班比例";
                        break;
                    case 2:
                        return "平均二线人力配比";
                        break;
                }
            }
        },
          mounted() {
           let date = new Date();
           this.setArrangeTime(date);
           this.details()
        },
        watch: {
            getArrangeDate(val) {
                this.flag = val;
                if (val == 1 || val == 2) {
                    this.dateFlag = "日";
                } else {
                    this.dateFlag = "月";
                }
                this.dateTime = this.dateTime;
                this.details();
            },
            getArrangeTime(val) {
                this.dateTime = val;
                this.details();
            },
            '$store.state.scheduling'(val){
                this.setscheduling(false)
                this.details()
            }
        }
        
    };
</script>

<style rel="stylesheet/scss" lang="scss">
.explains {
    float: right;
    span {
        margin-left: 12px;
    }
    .human:before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #11a0f8;
        margin-right: 5px;
    }
    .proportion:before {
        content: "";
        display: inline-block;
        width: 12px;
        height: 2px;
        background: #4a90e2;
        margin-right: 5px;
        vertical-align: middle;
    }
    .second_line:before {
        content: "";
        display: inline-block;
        width: 12px;
        height: 2px;
        background: #e3af22;
        margin-right: 5px;
        vertical-align: middle;
    }
    .all {
        text-decoration: underline;
        color: #11a0f8;
        cursor: pointer;
    }
}
</style>
