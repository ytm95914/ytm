<template>
	<div :id="_id" class="chart" :style="_styles" ></div>
</template>

<script>
/**
     * @author liyanwen
     * @date 2018/9/8
     * @desc 全局公共echarts图 [该组件谁需要应用的时候在下面留下信息]
     * @params 参数信息type
     *      1.LineAndBar/Pie(LineAndBar柱状图折线图/Pie圆饼图)
     *
     * @config 配置信息
     *     1.LineAndBar(chartData,id,color,showBol,xAxisData)
     *       1) chartData 柱状图的数据 Array
     * 		 2) id  柱状图的id String
     * 		 3) color 柱状如的颜色 Array
     *       4) showBol 只展示柱状图则为false{Boolean}
     * 		 5)xAxisData  X轴的数据
     *
     * 	   2.drawPie(chartData,id,color,title)
     * 		 1) chartData 圆饼图的数据 Array
     * 		 2) id  圆饼图的id String
     * 		 3) color 圆饼图的元素 Array
     *       4) title 圆饼图的标题,放在元的正中间 String
     *
     * @module 组件引用位置
     *      1. 人员管理-组长人员管理 -人口总数 [src/views/manage/components/personnelTotal.vue]
     *      2. 人员管理-组长人员管理-人力配比 [src/views/manage/components/personnelTotal.vue]
     *      3. 考勤-考勤管理 [src/views/attendance/AttendanceManagement.vue]
     *      4. 排班-排班管理 [src/views/scheduling/SchedulingManage.vue]
     */

	export default {
		props: {
			//echarts的宽高
			_styles: {
				type: String,
				default: "width:500px;height:800px"
			},
			//echarts的标题
			_title:{
				type: String,
				default: '人口比例'
			},
			//echarts的id
			_id: {
				type: String,
				default: 'id'
			},
			//echarts的颜色
			_color:{
				type: Array,
				default: ['#11a0f8', '#00bfe6', '#00c4ab','#55ce63','#ffbc34','#ffe1bd']
			},
			//echarts的类型  Pie是圆饼  LineAndBar是柱状图
			_type: {
				type: String,
				default: 'LineAndBar'
			},
			//如果类型是LineAndBar,右边的数轴线是否显示
			_showBol: {
				type: Boolean,
				default: false
			},
			//echarts的数据
			_chartData: {
				type: Array,
				default:[{
								value: 335,
								name: '直接访问',
								itemStyle: {
									normal: {
										borderWidth: 1,
										borderColor: '#fff'
									}
								}
							},
							{
								value: 310,
								name: '邮件营销',
								itemStyle: {
									normal: {
										borderWidth: 1,
										borderColor: '#fff'
									}
								}
							}
						]
				//柱状图和折线图
//				default:[{
//							name: '蒸发量',
//							type: 'bar', //柱状图
//							stack: "同一",
//							data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
//						},
//						{
//							name: '平均温度',
//							type: 'line', //折线
//							yAxisIndex: 1,
//							symbolSize:0,
//							itemStyle:{
//								normal:{
//									lineStyle:{
//										color:'#ff9934'
//									}
//								}
//							},
//							data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
//						}
//					]
			},
		//圆饼图  元的大小
			_radius:{
				type: Array,
				default: () => ['55%', '75%']
			},
			//柱状图x轴数据
			_xAxisData:{
				type: Array,
				default: () => []
//				default:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月']
			}


		},
		data() {
			return {

			}
		},
		methods: {
			drawPie(chartData,id,color,title,radius){
				var chart = this.$echarts.init(document.getElementById(id))
				var xAxisData = chartData.map(function(item) {
					return item[0]
				})
				chart.setOption({
					name:"11111",
					label: {
			            normal: {
			                position: 'center'
			            }
			        },
					color: color,
					clockWise: false,
	                legendHoverLink:false,
	                hoverAnimation:false,
					animation:false,
					title: {
						text:title,
						textStyle:{
							fontSize:12
						},
						x: 'center',
						y: 'center',
					},
					series: [{
						name: '人力配比',
						type: 'pie',
						radius: radius,
						avoidLabelOverlap: false,
						labelLine: {
							normal: {
								show: false
							}
						},
						label: {
							normal: {
								show: false,
								position: 'center'
							}
						},
						data:chartData
					}]
				})
			},
			drawLineAndBar(chartData,id,color,showBol,xAxisData){
				var chart = this.$echarts.init(document.getElementById(id))
				var gridRight = 0
				if(showBol==true){
					gridRight = 0
				}else{
					gridRight = -35
				}
				chart.setOption({
					color: color,
					//折线的颜色#ff9934
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line', // 默认为直线，可选为：'line' | 'shadow'
							lineStyle: {
								width: '0'
							}
						},
                        formatter:function(params) {
						    var relVal = params[0].name;
						    for (var i = 0, l = params.length; i < l; i++) {
						        if(params[i].componentSubType=='line'){
                                    relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value+"%";
                                }else{
                                    relVal += '<br/>' + params[i].marker + params[i].seriesName+ ' : ' + params[i].value;
                                }
						    }
						    return relVal;
						}
					},
					 grid: {
				        top: 20,
				        left: 0,
				        right:gridRight,
				        bottom:20,
				        containLabel:true
//				        height: 400
				    },
					xAxis: [{
						type: 'category',
						data:xAxisData,
						silent: false,
						axisLine: {
							lineStyle: {
								color: '#ccc',
								type: 'dotted'
							}
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: "#ccc"
							}
						},
						axisTick: {
							show: false
						}
					}],
					yAxis: [{
							type: 'value',
							name: '',
							scale: true,
							axisLine: {
								show: false,
								lineStyle: {
									color: '#ccc'
								}
							},
							splitLine: {
								show: true,
								lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
									color: '#ccc',
									type: 'dotted'
								},
							},
							axisTick: {
								show: false
							},
							min: 0,
//							max: 250,
//							interval: 50,
							axisLabel: {
								formatter: '{value}'
							}
						},
						{
							type: 'value',
							name: '',
							min: 0,
							max: 100,
							show:showBol,
							interval: 20,
							scale: true,
							axisLine: {
								show: false,
								lineStyle: {
									color: '#ccc'
								}
							},
							splitLine: {
								show: false,
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								formatter: '{value}%'
							}
						}
					],
					series: chartData
				})

			},

		},
		watch: {
			_chartData(val) {
				switch(this._type) {
					case "LineAndBar":
						this.drawLineAndBar(val, this._id,this._color,this._showBol,this._xAxisData);
						break
					case "Pie":
						this.drawPie(val, this._id,this._color,this._title,this._radius);
						break
					default:
						this.drawLineAndBar(val, this._id,this._color,this._showBol,this._xAxisData);
						break
				}
			}
		},
		mounted() {
			switch(this._type) {
				case "LineAndBar":
					this.drawLineAndBar(this._chartData,this._id,this._color,this._showBol,this._xAxisData);
					break
				case "Pie":
					this.drawPie(this._chartData,this._id,this._color,this._title,this._radius);
					break
				default:
					this.drawLineAndBar(this._chartData,this._id,this._color,this._showBol,this._xAxisData);
					break
			}
		}
	}
</script>

<style>

</style>
