<template>
	<div class="situation">
		<!--入/离职情况-->
		<div class="fl">
			<h2 class="navTtitle color333">入/离职情况</h2>
			<div class="totalNum color666">
				<ul class="situation-ul1">
					<li v-for="(value,key,index) in comeGoList">
						<span>{{key}}&nbsp; </span>
						<span class="colorGreen font30" :style="{'color':color[index]}">{{value}}</span><span v-if="index!=2" class="colorGreen font14" :style="{'color':color[index]}">人</span><span v-if="index==2" class="colorGreen font14" :style="{'color':color[index]}">%</span>
					</li>
				</ul>
			</div>

		</div>
		<!--入/离职情况统计-->
		<div class="ecahrts">
			<h3 class="clearfix color333 title">
				<span class="fl font18 color333">入/离职情况统计</span>
				<span v-if="flag==1" class="fr lookAll" @click="dialogVisible = true"><svg-icon icon-class="allsearch" style="width: 14px;height: 16px;" />&nbsp;查看全部</span>
				<span class="fr font12 color666">
					<i class="iconline" :style="{'background':colorTitle[4]}"></i>&nbsp;离职率
				</span>
				<span class="fr font12 color666">
					<i class="icon" :style="{'background':colorTitle[3]}"></i>&nbsp;调出人数
				</span>
				<span class="fr font12 color666">	
					<i class="icon" :style="{'background':colorTitle[2]}"></i>&nbsp;调入人数
				</span>
				<span class="fr font12 color666">
					<i class="icon" :style="{'background':colorTitle[1]}"></i>&nbsp;离职人数
				</span>
				<span class="fr font12 color666">
					<i class="icon" :style="{'background':colorTitle[0]}"></i>&nbsp;入职人数
				</span>
			</h3>
			<div style="box-sizing: border-box;padding: 0 30px;">
				<chart :_styles="'width:100%;height:210px'" :_id="'div2'" :_xAxisData="xAxisDataArr" :_title="''" :_color="comeGoListColor" :_chartData="chartDataArr" :_showBol="true" :_type="'LineAndBar'"></chart>
			</div>
		</div>
		<!--查看全部弹框-->
		<div class="layerBox">
			<el-dialog :visible.sync="dialogVisible" width="90%" :lock-scroll="false">
				<div class="dialogBox">
					<h3 class="clearfix color333 title" style="border-bottom: 0;padding:0 0 10px 0;">
						<span class="fl font12 color333">单位 :&nbsp;人</span>
						<span class="fr font12 color666">
					<i class="iconline" :style="{'background':colorTitle[4]}"></i>&nbsp;离职率
				</span>
				<span class="fr font12 color666">
					<i class="icon" :style="{'background':colorTitle[3]}"></i>&nbsp;调出人数
				</span>
				<span class="fr font12 color666">	
					<i class="icon" :style="{'background':colorTitle[2]}"></i>&nbsp;调入人数
				</span>
				<span class="fr font12 color666">
					<i class="icon" :style="{'background':colorTitle[1]}"></i>&nbsp;离职人数
				</span>
				<span class="fr font12 color666">
					<i class="icon" :style="{'background':colorTitle[0]}"></i>&nbsp;入职人数
				</span>
					</h3>
					<chart :_styles="'width:100%;height:300px'" :_id="'div3'" :_xAxisData="xAxisData" :_title="''" :_color="comeGoListColor" :_chartData="chartData" :_showBol="true" :_type="'LineAndBar'"></chart>
				</div>
			</el-dialog>
		</div>

		<!--离职情况分析-->
		<div class="ecahrts chartsPie">
			<h3 class="clearfix title">
				<span class="fl font18 color333">离职情况分析</span>
			</h3>
			<div style="padding-left: 10px;box-sizing: border-box;">
				<el-row :gutter="20">
					<el-col :span="5">
						<div class="grid-content pie-grid">
							<chart :_styles="'width:100%;height:100%'" :_id="'pie11'" :_title="'离职情况分析'" :_color="goPie1Color" :_chartData="goPie1.slice(0,3)" :_type="'Pie'" :_radius="radius"></chart>
						</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content pie-grid">
							<ul class="color666 font12">
								<li class="li-item" v-for="(item,index) in goPie1Legend">
									<i class="iconRadius" :style="{'background':item.icon}"></i>
									<span class="legend-name" v-if="index==0">流失</span>
									<span class="legend-name" v-if="index==1">非常规离职</span>
									<span class="legend-name" v-if="index==2">淘汰</span>
									<span class="per">{{item.per}}</span>
									<span>{{item.num}}人</span>
								</li>
							</ul>
						</div>
					</el-col>
					<el-col :span="5">
						<div class="grid-content pie-grid">
							<chart :_styles="'width:100%;height:100%'" :_id="'pie12'" :_title="'流失原因分析'" :_color="goPie2Color" :_chartData="goPie2" :_type="'Pie'" :_radius="radius"></chart>
						</div>
					</el-col>
					<el-col :span="7">
						<div class="grid-content pie-grid">
							<ul class="color666 font12" style="margin-top: -90px;">
								<li class="li-item" v-for="(item,index) in goPie2Legend">
									<i class="iconRadius" :style="{'background':item.icon}"></i>
									<span class="legend-name otherWidth" v-if="index==0">职业发展</span>
									<span class="legend-name otherWidth" v-if="index==1">身体原因</span>
									<span class="legend-name otherWidth" v-if="index==2">家庭原因</span>
									<span class="legend-name otherWidth" v-if="index==3">薪资待遇</span>
									<span class="legend-name otherWidth" v-if="index==4">其他原因</span>
									<span class="legend-name otherWidth" v-if="index==5">外呼性质</span>
									<span class="per">{{item.per}}</span>
									<span>{{item.num}}人</span>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	import { peopleComeOrGo, peopleGoStatistic, peopleGoAnalyse } from '@/api/system/manage'
	import chart from '@/components/PublicEcharts'
	import commdate from '@/utils/commdate'
	import {  mapGetters, mapActions  } from 'vuex'

	export default {
		components: {
			chart
		},
		data() {
			return {
				radius:['70%','90%'],//圆饼大小
				dateTime: new Date(),
				comeGoList: '', //入职离职左侧列表
				color: ['#11A0F8', '#55CE63', '#E3AF22', '#FFBC34', '#FFE1BD'], //入职离职左侧颜色
				colorTitle: ['#11A0F8', '#55CE63', '#FFBC34', '#FFE1BD ', '#E3AF22'], //入职离职情况统计柱状图title颜色
				comeGoListColor: ['#11A0F8', '#55CE63', '#FFBC34', '#FFE1BD','#E3AF22'], //入职离职情况统计柱状图颜色
				goPie1: [], //离职情况分析饼图
				goPie1Color: ['#FFBC34 ', '#FFE1BD  ', '#FFE365'], //离职情况分析饼图颜色
				goPie1Legend: [], //离职情况分析饼图图例
				goPie2: [], //流失原因分析饼图
				goPie2Color: ['#00A0FA', '#55CE63', '#00C4AB', '#7CCDFF', '#0370CE','#35C2CD'], //流失原因分析饼图颜色
				goPie2Legend: [], //流失原因分析饼图图例
				dateFlag: '日', //
				chartData: [], //全看全部柱状图入职离职情况统计
				chartDataArr: [], //柱状图入职离职情况统计
				xAxisData: [], //查看全部柱状图x轴数据
				xAxisDataArr: [], //柱状图x轴数据
				entry: [], //入职
				quit: [], //离职
				tran: [], //调入
				callOut: [], //调出
				quitPro: [], //离职率
				dialogVisible:false ,//弹框
				flag:1,
				noneflag1:0,
				noneflag2:0,
			}
		},
		computed: {
			...mapGetters([
				'getPeopleDate',
				'getPeopleTime'
			]),
		},
		methods: {
			peopleComeOrGoFac() {
				this.goPie1 = [], //离职情况分析饼图
					this.goPie1Legend = [], //离职情况分析饼图图例
					this.goPie2 = [], //流失原因分析饼图
					this.goPie2Legend = [], //流失原因分析饼图图例
					this.chartData = [], //柱状图入职离职情况统计
					this.chartDataArr = [],
					this.xAxisData = [],
					this.xAxisDataArr = []
					this.noneflag1 = 0
					this.noneflag2 = 0
				switch(this.flag){
                    case 1:
                        this.dateTime = commdate.timestampToTime(this.getPeopleTime).substring(0,7);break;
                    case 2:
                        this.dateTime = commdate.timestampToTime(this.getPeopleTime).substring(0,4);break;
                }
				let params = {
					flag: this.flag,
					dateTime: this.dateTime
				}
				//左侧离职入职情况
				peopleComeOrGo(params).then(response => {
					if(response && response.data) {
						this.comeGoList = response.data.data[0]
					}
				}).catch(error => {
					console.log(error, 222)
				})
				//入/离职情况统计
				peopleGoStatistic(params).then(response => {
					if(response && response.data) {
						let res = response.data
						//					console.log(response.data.data.entry)
						for(var i = 0; i < response.data.data.entry.length; i++) {
							this.xAxisData.push(i + 1 + this.dateFlag)
						}
						//					console.log(this.xAxisData)
						if(this.flag == 1) {
							this.dateFlag = '日'
							this.xAxisDataArr = this.xAxisData.slice(-10)
							this.entry = response.data.data.entry.slice(-10)
							this.quit = response.data.data.quit.slice(-10)
							this.tran = response.data.data.tran.slice(-10)
							this.callOut = response.data.data.callOut.slice(-10)
							this.quitPro = response.data.data.quitPro.slice(-10)
							//						console.log(this.xAxisDataArr)
						} else {
							this.dateFlag = '月'
							this.xAxisDataArr = this.xAxisData
							this.entry = response.data.data.entry
							this.quit = response.data.data.quit
							this.tran = response.data.data.tran
							this.callOut = response.data.data.callOut
							this.quitPro = response.data.data.quitPro
							//						console.log(this.xAxisDataArr)
						}
						this.chartDataArr = [{
								name: '入职人数',
								type: 'bar',
								barWidth: '20',
								stack: "同一",
								data: this.entry //入职
							},
							{
								name: '离职人数',
								type: 'bar',
								stack: "同一",
								barWidth: '20',
								data: this.quit //离职
							},
							{
								name: '调入人数',
								type: 'bar',
								stack: "同二",
								barWidth: '20',
								data: this.tran //调入
							},
							{
								name: '调出人数',
								type: 'bar',
								barWidth: '20',
								stack: "同二",
								data: this.callOut //调出
							},
							{
								name: '离职率',
								type: 'line',
								yAxisIndex: 1,
								symbolSize: 0,
								itemStyle: {
									normal: {
										lineStyle: {
											color: '#E3AF22'
										}
									}
								},
								data: this.quitPro //离职率
							}
						]
						this.chartData = [{
								name: '入职人数',
								type: 'bar',
								barWidth: '20',
								stack: "同一",
								data: response.data.data.entry //入职
							},
							{
								name: '离职人数',
								type: 'bar',
								barWidth: '20',
								stack: "同一",
								data: response.data.data.quit //离职
							},
							{
								name: '调入人数',
								type: 'bar',
								barWidth: '20',
								stack: "同二",
								data: response.data.data.tran //调入
							},
							{
								name: '调出人数',
								type: 'bar',
								barWidth: '20',
								stack: "同二",
								data: response.data.data.callOut //调出
							},
							{
								name: '离职率',
								type: 'line',
								yAxisIndex: 1,
								symbolSize: 0,
								itemStyle: {
									normal: {
										lineStyle: {
											color: '#ff9934'
										}
									}
								},
								data: response.data.data.quitPro //离职率
							}
						]
					}
				}).catch(error => {
					console.log(error, 222)
				})
				//离职情况分析
				peopleGoAnalyse(params).then(response => {
					if(response && response.data) {
						this.pieData1 = []
						let pieData1 = response.data.data[0]
						let pieData2 = response.data.data[1]
						for(var i = 0; i < pieData1.length - 3; i++) {
							if(pieData1[i][0]==0){
								this.noneflag1++
							}
							this.goPie1.push({
								value: pieData1[i][0],
								name: '',
								itemStyle: {
									normal: {
										borderWidth: 1,
										borderColor: '#fff'
									}
								}
							})
							this.goPie1Legend.push({
								icon: this.goPie1Color[i],
								per: pieData1[i][1],
								num: pieData1[i][0]
							})
						}
						if(this.noneflag1==3){
							this.goPie1Color=['#dedede',"#dedede",'#dedede']
						}else{
							this.goPie1Color=['#FFBC34 ','#FFE1BD','#FFE365']
						}
						for(var i = 0; i < pieData2.length; i++) {
							this.pieData2 = []
							
							if( pieData2[i][0]==0){
								this.noneflag2++
								
							}
							this.goPie2.push({
								itemStyle: {
									normal: {
										borderWidth: 1,
										borderColor: '#fff'
									}
								},
								name: '',
								value: pieData2[i][0]
							})
							this.goPie2Legend.push({
								icon: this.goPie2Color[i],
								per: pieData2[i][1],
								num: pieData2[i][0]
							})
						}
						if(this.noneflag2==6){
							this.goPie2Color=['#dedede',"#dedede",'#dedede','#dedede',"#dedede",'#dedede']
						}else{
							this.goPie2Color=['#00A0FA', '#55CE63', '#00C4AB', '#7CCDFF', '#0370CE','#35C2CD']
						}
					}
				}).catch(error => {
					console.log(error, 222)
				})
			},
			...mapActions([
				'setPeopleDate',
				'setPeopleTime'
			])
		},
		mounted() {
			if(document.body.clientWidth<1369){
				this.radius=['70%','90%']
			}else{
				this.radius=['50%','62%']
			}
			let date = new Date();
			this.setPeopleTime(date);
		},
		watch: {
			getPeopleDate(val) {
				this.flag = val
				if(val == 1) {
					this.dateFlag = '日'
				} else {
					this.dateFlag = '月'
				}
				this.peopleComeOrGoFac()
			},
			getPeopleTime(val) {
				this.dateTime = val
				this.peopleComeOrGoFac()
			}
		}
	}
</script>

<style scoped>
	h2,
	h3 {
		font-weight: normal;
	}
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
	
	.color333 {
		color: #333;
	}
	
	.color666 {
		color: #666;
	}
	
	.font18 {
		font-size: 18px;
	}
	
	.font14 {
		font-size: 14px;
	}
	
	.font12 {
		font-size: 12px;
	}
	
	.font20 {
		font-size: 20px;
	}
	
	.situation {
		margin-top: 20px;
		height: 560px;
	}
	
	.navTtitle {
		width: 304px;
		height: 50px;
		line-height: 50px;
		font-size: 18px;
		padding-left: 20px;
		box-sizing: border-box;
		border: 1px solid #E9F1F3;
	}
	
	.totalNum {
		width: 304px;
		height: 510px;
		padding-top: 20px;
		font-size: 14px;
		box-sizing: border-box;
		border: 1px solid #E9F1F3;
		border-top: 0;
	}
	
	.colorGreen {
		color: #55CE63;
	}
	
	.font30 {
		font-size: 30px;
	}
	
	.ecahrts {
		margin-left: 326px;
		height: 270px;
		border: 1px solid #E9F1F3;
		padding-bottom: 10px;
		box-sizing: border-box;
	}
	
	.icon {
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-left: 10px;
		background: #11A0F8;
	}
	
	.iconline {
		display: inline-block;
		width: 10px;
		height: 1px;
		margin-left: 10px;
		background: #FF9934;
		vertical-align: middle;
	}
	
	.title {
		height: 50px;
		line-height: 50px;
		font-size: 12px;
		border-bottom: 1px solid #E9F1F3;
		box-sizing: border-box;
		padding: 0 30px;
	}
	
	.chartsPie {
		margin-top: 20px;
	}
	
	.situation-ul1 {
		padding-left: 50px;
		box-sizing: border-box;
	}
	
	.situation-ul1>li {
		height: 70px;
		line-height: 70px;
	}
	
	.round {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 10px;
	}
	
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
	
	.pie-grid {
		height: 169px;
		position: relative;
	}
	
	.pie-grid>ul {
		position: absolute;
		top: 50%;
		margin-top: -45px;
		width: 100%;
	}
	
	.iconRadius {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 10px;
		background: #000;
		vertical-align: middle;
	}
	
	.li-item {
		height: 30px;
		line-height: 30px;
	}
	
	.legend-name {
		display: inline-block;
		width: 65px;
		margin-left: 5px;
		vertical-align: middle;
	}
	
	.lookAll {
		cursor: pointer;
		text-decoration: underline;
		color: #11A0F8;
		margin-left: 10px;
	}
	
	.dialogBox {
		border: 1px solid #E9F1F3;
		padding: 20px;
		box-sizing: border-box;
		height: 366px;
		width: 100%;
	}
	
	.per {
		display: inline-block;
		width: auto;
		margin: 0 5px;
	}
	
	.grid-content {
		border-radius: 4px;
		min-height: 219px;
	}
	
	.per {
		display: inline-block;
		width: 46px;
		margin: 0 10px;
	}
	
	.otherWidth {
		width: 50px;
	}
</style>

<style>
	.layerBox .el-dialog .el-dialog__header {
		height: 0;
		border-bottom: 0;
		padding: 20px 20px 15px;
	}
</style>