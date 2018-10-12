<template>
	<div>
		<div class="fl">
			<h2 class="navTtitle color333">人员总数</h2>
			<div class="totalNum">
				<span class="color666">人员总数&nbsp; </span>
				<span class="colorGreen font30">{{allNum}}</span><span class="colorGreen font14">人</span>
			</div>

		</div>
		<div class="ecahrts">
			<h3 class="clearfix color333 title">
				<span class="fl">单位 : 人</span>
				<span v-if="flag==1" class="fr lookAll" @click="dialogVisible = true"><svg-icon icon-class="allsearch" style="width: 14px;height: 16px;" />&nbsp;查看全部</span>
				<span class="fr"><i class="icon"></i>&nbsp;人员总数</span>
			</h3>
			<chart :_styles="'width:100%;height:320px'" :_xAxisData='xAxisDataArr' :_chartData="chartDataArr" :_id="'testCharts33'" :_title="''" :_color="color" :_showBol="false" :_type="'LineAndBar'"></chart>
		</div>
		<!--查看全部弹框-->
		<div class="layerBox">
			<el-dialog :visible.sync="dialogVisible" width="90%" :lock-scroll="false">
				<div class="dialogBox">
					<h3 class="clearfix color333 title">
						<span class="fl">单位 : 人</span>
						<span class="fr"><i class="icon"></i>&nbsp;人员总数</span>
					</h3>
					<chart :_styles="'width:100%;height:315px'" :_xAxisData='xAxisData' :_chartData="chartData" :_id="'testCharts66'" :_title="''" :_color="color" :_showBol="false" :_type="'LineAndBar'"></chart>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import { peopleNumList } from '@/api/system/manage'
	import chart from '@/components/PublicEcharts'
	import { mapGetters,mapActions } from 'vuex'
	import commdate from '@/utils/commdate'

	export default {
		components: {
			chart
		},
		data() {
			return {
				allNum: '', //人员总数
				flag:1,
				color: ['#11a0f8'], //柱状图颜色
				dateFlag: '日',
				dateTime:new Date(),
				chartData: [], //查看全部柱状图数据
				chartDataArr: [], //柱状图数据
				xAxisData: [], //查看全部x轴数据
				xAxisDataArr: [], //x轴数据
				dialogVisible: false
			}
		},
		computed: {
			...mapGetters([
				'getPeopleDate',
				'getPeopleTime'
			]),
		},
		methods: {
			peopleNumListFac() {
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
				peopleNumList(params).then(response => {
					if(response && response.data) {
						this.xAxisData = []
						this.chartData = []
						this.xAxisDataArr = []
						this.chartDataArr = []
						let res = response.data
						for(var i = 0; i < res.length; i++) {
							this.xAxisData.push(i + 1 + this.dateFlag)
						}
						if(this.flag == 1) {
							this.dateFlag = '日'
							//柱状图
							this.chartDataArr.push({
								name: '数量',
								type: 'bar',
								barWidth: '20',
								data: res.slice(-10)
							})
							this.xAxisDataArr = this.xAxisData.slice(-10)

						} else {
							this.dateFlag = '月'
							//柱状图
							this.chartDataArr.push({
								name: '数量',
								type: 'bar',
								barWidth: '20',
								data: res
							})
							this.xAxisDataArr = this.xAxisData
						}
						//柱状图
						this.chartData.push({
							name: '数量',
							type: 'bar',
							barWidth: '20',
							data: res
						})
//						console.log(this.chartData)
						//人员总数
						this.allNum = res[res.length - 1]
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
		watch: {
			getPeopleDate(val) {
				this.flag = val
				if(val==1){
					this.dateFlag = '日'
				}else{
					this.dateFlag = '月'
				}
				this.peopleNumListFac()
			},
			getPeopleTime(val) {
				this.dateTime = val
				this.peopleNumListFac()
			},

		},
		mounted() {
			let date = new Date();
			this.setPeopleTime(date);
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
		height: 316px;
		padding-left: 30px;
		padding-top: 40px;
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
		margin-left: 324px;
		height: 366px;
		padding: 10px 30px;
		border: 1px solid #E9F1F3;
		box-sizing: border-box;
	}

	.icon {
		display: inline-block;
		width: 10px;
		height: 10px;
		background: #11A0F8;
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
</style>
