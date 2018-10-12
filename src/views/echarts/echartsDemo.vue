<template>
	<div>
		<div id="myChart" style="width: 800px;height: 500px;float: left;"></div>
		<div id="myChart1" style="width: 800px;height: 500px;float: left"></div>
		<div id="myChart2" style="width: 800px;height: 500px;float: left"></div>
		<div id="myChart3" style="width: 800px;height: 500px;float: left"></div>
		<div id="myChart4" style="width: 800px;height: 500px"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				color: ['#11a0f8', '#55ce63', '#ffbc34', '#ffe1bd'],
				chartData:[{
							name: '蒸发量',
							type: 'bar',
							stack: "同一",
							data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
						},
						{
							name: '降水量',
							type: 'bar',
							stack: "同一",
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '进入量',
							type: 'bar',
							stack: "同二",
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '排出量',
							type: 'bar',
							stack: "同二",
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '平均温度',
							type: 'line',
							yAxisIndex: 1,
							symbolSize:0,
							itemStyle:{
								normal:{
									lineStyle:{
										color:'#ff9934'
									}
								}
							},
							data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
						}
					]
			}
		},
		mounted() {
			this.drawBar();
			this.drawPie();
			this.drawBarAndPie();
			this.drawBarAndLine();
			this.drawBarAndLineStyle()
		},
		methods: {
			drawBar() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					color: ['#11a0f8'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line', // 默认为直线，可选为：'line' | 'shadow'
							lineStyle: {
								width: '0'
							}
						}
					},

					xAxis: {
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月',],
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
					},

					yAxis: [{
						type: 'value',
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
						}
					}],
					series: [{
						name: '直接访问',
						type: 'bar',
						barWidth: '20',
						data: [10, 52, 200, 334, 390, 330, 220,200,200,90,100,50]
					}]
				});
			},
			drawPie() {
				let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
				// 绘制图表
				myChart1.setOption({
					color: ['#11a0f8', '#00bfe6', '#00c4ab','#55ce63','#ffbc34','#ffe1bd'],
					title: {
						text: '南丁格尔玫瑰图',
						x: 'center',
						y: 'center',
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['40%', '50%'],
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
						data: [{
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
							},
							{
								value: 135,
								name: '视频广告',
								itemStyle: {
									normal: {
										borderWidth: 1,
										borderColor: '#fff'
									}
								}
							}
						]
					}]
				})
			},
			drawBarAndPie() {
				let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
				myChart2.setOption({
					color: ['#11a0f8', '#55ce63', '#ffbc34', '#ffe1bd'],
					//折线的颜色#ff9934
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line', // 默认为直线，可选为：'line' | 'shadow'
							lineStyle: {
								width: '0'
							}
						}
					},
					xAxis: [{
						type: 'category',
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
							max: 250,
							interval: 50,
							axisLabel: {
								formatter: '{value} ml'
							}
						},
						{
							type: 'value',
							name: '',
							min: 0,
							max: 25,
							interval: 5,
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
							axisLabel: {
								formatter: '{value} °C'
							}
						}
					],
					series: [{
							name: '蒸发量',
							type: 'bar',
							stack: "同一",
							data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
						},
						{
							name: '降水量',
							type: 'bar',
							stack: "同一",
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '进入量',
							type: 'bar',
							stack: "同二",
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '排出量',
							type: 'bar',
							stack: "同二",
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '平均温度',
							type: 'line',
							yAxisIndex: 1,
							symbolSize:0,
							itemStyle:{
								normal:{
									lineStyle:{
										color:'#ff9934'
									}
								}
							},
							data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
						}
					]
				})
			},
			drawBarAndLine(){
				let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
				myChart3.setOption({
					color: ['#11a0f8', '#55ce63'],
					//折线的颜色是#4a90e2
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line', // 默认为直线，可选为：'line' | 'shadow'
							lineStyle: {
								width: '0'
							}
						}
					},
					xAxis: [{
						type: 'category',
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
							max: 250,
							interval: 50,
							axisLabel: {
								formatter: '{value} ml'
							}
						},
						{
							type: 'value',
							name: '',
							min: 0,
							max: 25,
							interval: 5,
							scale: true,
							show: false,
						}
					],
					series: [{
							name: '蒸发量',
							type: 'bar',
							data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
						},
						{
							name: '降水量',
							type: 'bar',
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '平均温度',
							type: 'line',
							yAxisIndex: 1,
							symbolSize:0,
							itemStyle:{
								normal:{
									lineStyle:{
										color:'#4a90e2'
									}
								}
							},
							data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
						}
					]
				})
			},
			drawBarAndLineStyle(){
				let myChart4 = this.$echarts.init(document.getElementById('myChart4'))
				myChart4.setOption({
					color: ['#11a0f8', '#55ce63'],
					//折线的颜色是#4a90e2
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line', // 默认为直线，可选为：'line' | 'shadow'
							lineStyle: {
								width: '0'
							}
						}
					},
					xAxis: [{
						type: 'category',
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
							max: 250,
							interval: 50,
							axisLabel: {
								formatter: '{value} ml'
							}
						},
						{
							type: 'value',
							name: '',
							min: 0,
							max: 25,
							interval: 5,
							scale: true,
							show: false,
						}
					],
					series: [{
							name: '蒸发量',
							type: 'bar',
							itemStyle:{
								color:function(params){
									let getMonth = params.name.substr(0,params.name.length-1)
									let nowMonth =  new Date().getMonth()+1; //当前月 
									if(getMonth==nowMonth){
                        				return "#11a0f8"
                        			}else{
                        				return "#b8e3fd"
                        			}
								}
							},
							data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
						},
						{
							name: '降水量',
							type: 'bar',
							itemStyle:{
								color:function(params){
									let getMonth = params.name.substr(0,params.name.length-1)
									let nowMonth =  new Date().getMonth()+1; //当前月 
									if(getMonth==nowMonth){
                        				return "#55ce63"
                        			}else{
                        				return "#ccf0d0"
                        			}
								}
							},
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '平均温度',
							type: 'line',
							yAxisIndex: 1,
							symbolSize:0,
							itemStyle:{
								normal:{
									lineStyle:{
										color:'#4a90e2'
									}
								}
							},
							data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
						}
					]
				})
			
			}
		}
	}
</script>

<style scoped>

</style> 