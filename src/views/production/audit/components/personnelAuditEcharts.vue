<template>
	<div class="echartsBar">
		<div class="ecahrts">
			<h3 class="clearfix color333 title">
				<span class="fl">单位 : 数量</span>
				<span v-if="flag==1||flag==2" class="fr lookAll" @click="dialogVisible = true"><svg-icon icon-class="allsearch" style="width: 14px;height: 16px;" />&nbsp;查看全部</span>
				<span class="fr"><i class="icon1"></i>&nbsp;KPI目标</span>
				<span class="fr"><i class="icon2"></i>&nbsp;已审量</span>
			</h3>
			<chart :_styles="'width:100%;height:320px'" :_xAxisData='xAxisDataArr' :_chartData="chartDataArr" :_id="'testCharts33'" :_title="''" :_color="color" :_showBol="false" :_type="'LineAndBar'"></chart>
		</div>
		<!--查看全部弹框-->
		<div class="layerBox">
			<el-dialog :visible.sync="dialogVisible" width="90%" :lock-scroll="false">
				<div class="dialogBox">
					<h3 class="clearfix color333 title">
						<span class="fl">单位 : 数量</span>
						<span class="fr"><i class="icon1"></i>&nbsp;KPI目标</span>
						<span class="fr"><i class="icon2"></i>&nbsp;已审量</span>
					</h3>
					<chart :_styles="'width:100%;height:315px'" :_xAxisData='xAxisData' :_chartData="chartData" :_id="'testCharts66'" :_title="''" :_color="color" :_showBol="false" :_type="'LineAndBar'"></chart>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import { personnelAuditEcharts } from '@/api/production/AuditEcharts'
	import chart from '@/components/PublicEcharts'
	import { mapGetters,mapActions } from 'vuex'
	import commdate from '@/utils/commdate'
	import TempCache from "@/utils/tempcache"
	export default {
		components: {
			chart
		},
		data() {
			return {
				flag:1,
				color: ['#55CE63','#11A0F8'], //柱状图颜色
				dateFlag: '日',
				dateTime:new Date(),
				chartData: [], //查看全部柱状图数据
				chartDataArr: [], //柱状图选择日期到前10天的数据
				xAxisData: [], //查看全部x轴数据
				xAxisDataArr: [], //x轴数据选择日期到前10天的数据
				dialogVisible: false,
				userId:''
			}
		},
		computed: {
			...mapGetters([
				'getDateFlag',
			    'getDayTime',
			    'getMonthTime',
			    'getYearTime'
			]),
		},
		methods: {
			personEchartsFac() {
				switch(this.flag){
					case 1:
                        this.dateTime = commdate.timestampToTime(this.getDayTime);break;
                    case 2:
                        this.dateTime = commdate.timestampToTime(this.getMonthTime).substring(0,7);break;
                    case 3:
                        this.dateTime = commdate.timestampToTime(this.getYearTime).substring(0,4);break;
                }
				let params = {
					userid:this.userId,
					flag: this.flag,
					date: this.dateTime
				}
				personnelAuditEcharts(params).then(response => {
					if(response && response.data) {
						this.xAxisData = []
						this.chartData = []
						this.xAxisDataArr = []
						this.chartDataArr = []
						let kpilist = response.data.data.kpilist //kpi值
						let sumOriginalData = response.data.data.sumOriginalData //进单量
						for(var i = 0; i < kpilist.length; i++) {
							this.xAxisData.push(i + 1 + this.dateFlag)
						}
						if(this.flag == 1||this.flag == 2) {
							this.dateFlag = '日'
							//柱状图
							this.chartDataArr.push({
								name: '已审量',
								type: 'bar',
								barWidth: '20',
								data: sumOriginalData.slice(-10)
							},{
								name: 'KPI目标',
								type: 'bar',
								barWidth: '20',
								data: kpilist.slice(-10)
							})
							this.xAxisDataArr = this.xAxisData.slice(-10)

						} else {
							this.dateFlag = '月'
							//柱状图
							this.chartDataArr.push({
								name: '已审量',
								type: 'bar',
								barWidth: '20',
								data: sumOriginalData
							},
							{
								name: 'KPI目标',
								type: 'bar',
								barWidth: '20',
								data: kpilist
							})
							this.xAxisDataArr = this.xAxisData
						}
						//柱状图
						this.chartData.push({
							name: '已审量',
							type: 'bar',
							barWidth: '20',
							data: sumOriginalData
						},{
							name: 'KPI目标',
							type: 'bar',
							barWidth: '20',
							data: kpilist
						})
					}
				}).catch(error => {
					console.log(error, 222)
				})
			},
			...mapActions([
				'setDateFlag',
			    'setDayTime',
			    'setMonthTime',
			    'setYearTime'
			])
		},
		watch: {
			getDateFlag(val) {
				this.flag = val
				if(val==1||val==2){
					this.dateFlag = '日'
				}else{
					this.dateFlag = '月'
				}
				this.personEchartsFac()
			},
			getDayTime(val) {
				this.dateTime = val
				this.personEchartsFac()
			},
			getMonthTime(val) {
				this.dateTime = val
				this.personEchartsFac()
			},
			getYearTime(val) {
				this.dateTime = val
				this.personEchartsFac()
			}
			
			
		},
		mounted() {
			let date = new Date();
			this.setDayTime(date);
			this.userId = TempCache.getItem("userId");
		},
		destroyed(){
			this.setDateFlag(1);
			this.setDayTime(new Date());
			this.setMonthTime(new Date());
			this.setYearTime(new Date())
		}
		
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.echartsBar{
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
	.font20{
		font-size: 20px;
	}
	.font24{
		font-size: 24px;
	}
	.colorGreen {
		color: #55CE63;
	}
	.colorRed{
		color: #FE7575;
	}
	.colorBule{
		color: #11A0F8;
	}
	.font30 {
		font-size: 30px;
	}
	.ecahrts {
		margin-left: 324px;
		height: 366px;
		padding: 10px 30px;
		border: 1px solid #E9F1F3;
		box-sizing: border-box;
	}

	.icon1 {
		display: inline-block;
		width: 10px;
		height: 10px;
		background: #11A0F8;
		margin-left: 10px;
	}
	.icon2 {
		display: inline-block;
		width: 10px;
		height: 10px;
		background: #55CE63;
		
	}

	.title {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
	}

	.lookAll {
		cursor: pointer;
		text-decoration: underline;
		color: #11A0F8;
		margin-left: 10px;
	}

	.dialogBox {
		border: 1px solid #E9F1F3;
		padding:15px 30px;
		box-sizing: border-box;
		height: 366px;
		width: 100%;
	}
	}
	
</style>
