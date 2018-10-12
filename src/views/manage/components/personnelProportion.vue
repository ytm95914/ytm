<template>
	<div class="proportion">
		<h2 class="navTtitle color333 font18">人力配比</h2>
		<el-row :gutter="20">
			<!--人力配比-->
			<el-col :span="6">
				<div class="grid-content box">
					<!--圆饼-->
					<chart :_styles="'width:100%;height:60%'" :_id="'pieCharts'" :_title="'人力配比'" :_color="ratioColor" :_chartData="ratioChartData.slice(0,4)" :_showBol="false" :_type="'Pie'" :_radius="radius"></chart>
					<ul class="color666 font12">
						<li class="li-item" v-for="(item,index) in ratioLegend">
							<i class="icon" :style="{'background':item.icon}"></i>
							<span v-if="index==0" class="explain otherWidth">二线人力及以上</span>
							<span v-if="index==1" class="explain otherWidth">排班人力</span>
							<span v-if="index==2" class="explain otherWidth">在陪人力</span>
							<span v-if="index==3" class="explain otherWidth">其他</span>
							<span class="per explain people_num">{{item.per}}</span>
							<span class="explain people_num">{{item.num}}人</span>
						</li>
					</ul>
				</div>
			</el-col>
			<!--性质-->
			<el-col :span="6">
				<div class="grid-content box">
					<!--圆饼-->
					<chart :_styles="'width:100%;height:60%'" :_id="'pieCharts1'" :_title="'性质'" :_color="propertyColor" :_chartData="propertyChartData.slice(0,3)" :_showBol="false" :_type="'Pie'" :_radius="radius"></chart>
					<ul class="color666 font12">
						<li class="li-item" v-for="(item,index) in propertyLegend">
							<i class="icon" :style="{'background':item.icon}"></i>
							<span v-if="index==0" class="explain">试用</span>
							<span v-if="index==1" class="explain">正式</span>
							<span v-if="index==2" class="explain">实习</span>
							<span class="per explain people_num">{{item.per}}</span>
							<span class="explain people_num">{{item.num}}人</span>
						</li>
					</ul>
				</div>
			</el-col>
			<!--新老员工-->
			<el-col :span="6">
				<div class="grid-content box">
					<chart :_styles="'width:100%;height:60%'" :_id="'pieCharts2'" :_title="'新老员工'" :_color="oldNewColor" :_chartData="oldNewChartData.slice(0,3)" :_showBol="false" :_type="'Pie'" :_radius="radius"></chart>
					<ul class="color666 font12">
						<li class="li-item" v-for="(item,index) in oldNewLegend">
							<i class="icon" :style="{'background':item.icon}"></i>
							<span v-if="index==0" class="explain">新员工</span>
							<span v-if="index==1" class="explain">老员工</span>
							<span v-if="index==2" class="explain">实习</span>
							<span class="per explain people_num">{{item.per}}</span>
							<span class="explain people_num">{{item.num}}人</span>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content box">
					<!--圆饼-->
					<chart :_styles="'width:100%;height:60%'" :_id="'pieCharts3'" :_title="'年龄占比'" :_color="ageColor" :_chartData="ageChartData.slice(0,4)" :_showBol="false" :_type="'Pie'" :_radius="radius"></chart>
					<ul class="color666 font12">
						<li class="li-item" v-for="(item,index) in ageLegend">
							<i class="icon" :style="{'background':item.icon}"></i>
							<span v-if="index==0" class="explain">20岁以下</span>
							<span v-if="index==1" class="explain">20-22岁</span>
							<span v-if="index==2" class="explain">23-25岁</span>
							<span v-if="index==3" class="explain">25岁以上</span>
							<span class="per explain people_num">{{item.per}}</span>
							<span class="explain people_num">{{item.num}}人</span>
						</li>
					</ul>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import chart from '@/components/PublicEcharts'
	import { mapGetters,mapActions } from 'vuex'
	import commdate from '@/utils/commdate'
	import { peopleRatio, peopleProperty, peopleOldNew, peopleAge } from '@/api/system/manage'

	export default {
		components: {
			chart
		},
		data() {
			return {
				radius:['55%', '70%'],//圆饼大小
				ratioColor: ['#00BFE6',"#00C4AB","#11A0F8","#55CE63"],//人力配比颜色
				ratioChartData: [],
				ratioLegend: [],
				propertyColor: ['#00C4AB', '#11A0F8 ', '#55CE63'],//性质颜色
				propertyChartData: [],
				propertyLegend: [],
				oldNewColor: ['#11A0F8', '#FFBC34'],//新老员工
				oldNewChartData: [],
				oldNewLegend: [],
				// listStyle:['#00BFE6',"#00C4AB","#11A0F8","#55CE63"],
				// ageColor: ['#00BFE6', '#00C4AB', '#11A0F8', '#55CE63', '#00BFE6'],
				ageColor:['#00BFE6',"#00C4AB","#11A0F8","#55CE63"],//年龄占比
				ageChartData: [],
				ageLegend: [],
				dateTime:new Date(),
				flag:1,
				noneflag1:0,
				noneflag2:0,
				noneflag3:0,
				noneflag4:0
			}
		},
		computed: {
			...mapGetters([
				'getPeopleDate',
				'getPeopleTime'
			]),
		},
		methods: {
			peopleRatioFac() {
				this.noneflag1=0,
				this.noneflag2=0,
				this.noneflag3=0,
				this.noneflag4=0
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
				//人力配比
				peopleRatio(params).then(response => {
					if(response && response.data) {
						this.ratioChartData = []
						this.ratioLegend = []
						let res = response.data
						for(var i = 0; i < res.length - 2; i++) {
							if(res[i][0]==0){
								this.noneflag1++
							}
							this.ratioChartData.push({
								value: res[i][0],
								name: '',
								itemStyle: {
									normal: {
										borderWidth: 1,
										borderColor: '#fff'
									}
								}
							})
							this.ratioLegend.push({
								icon: this.ratioColor[i],
								name: i,
								per: res[i][1],
								num: res[i][0]
							})
						}
						if(this.noneflag1==4){
							this.ratioColor = ['#dedede',"#dedede","#dedede","#dedede"]
						}else{
							this.ratioColor = ['#00BFE6',"#00C4AB","#11A0F8","#55CE63"]
						}
					}
				}).catch(error => {
					console.log(error, 222)
				})
				//性质
				peopleProperty(params).then(response => {
					if(response && response.data) {
						this.propertyChartData = []
                        this.propertyLegend = []
                        let res = response.data
                        for(var i = 0; i < res.length - 3; i++) {
                        	if(res[i][0]==0){
                        		this.noneflag2++
                        	}
                            this.propertyChartData.push({
                                value: res[i][0],
                                name: '',
                                itemStyle: {
                                    normal: {
                                        borderWidth: 1,
                                        borderColor: '#fff'
                                    }
                                }
                            });
                            this.propertyLegend.push({
                                icon: this.propertyColor[i],
                                name: i,
                                per: res[i][1],
                                num: res[i][0]
                            })
                        }
                        if(this.noneflag2==3){
                        	this.propertyColor = ['#dedede',"#dedede","#dedede"]
                        }else{
                        	this.propertyColor =['#00C4AB', '#11A0F8 ', '#55CE63']
                        }
					}
				}).catch(error => {
					console.log(error, 222)
				});
				//新老员工
				peopleOldNew(params).then(response => {
					if(response && response.data) {
                        this.oldNewChartData = [];
                        this.oldNewLegend = [];
                        let res = response.data;
                        for(var i = 0; i < res.length - 4; i++) {
                        	if(res[i][0]==0){
                        		this.noneflag3++
                        	}
                            this.oldNewChartData.push({
                                value: res[i][0],
                                name: '',
                                itemStyle: {
                                    normal: {
                                        borderWidth: 1,
                                        borderColor: '#fff'
                                    }
                                }
                            });
                            this.oldNewLegend.push({
                                icon: this.oldNewColor[i],
                                name: i,
                                per: res[i][1],
                                num: res[i][0]
                            })
                        }
                        if(this.noneflag3 == 2){
                        	this.oldNewColor = ['#dedede',"#dedede"]
                        }else{
                        	this.oldNewColor =['#11A0F8', '#FFBC34']
                        }
					}
				}).catch(error => {
					console.log(error, 222)
				})
				//年龄占比
				peopleAge(params).then(response => {
					if(response && response.data) {
						this.ageChartData = []
						this.ageLegend = []
						let res = response.data
						//					console.log(res)
						for(var i = 0; i < res.length - 2; i++) {
							if(res[i][0]==0){
								this.noneflag4++
							}
							this.ageChartData.push({
								value: res[i][0],
								name: '',
								itemStyle: {
									normal: {
										borderWidth: 1,
										borderColor: '#fff'
									}
								}
							});
							this.ageLegend.push({
								icon: this.ageColor[i],
								name: i,
								per: res[i][1],
								num: res[i][0]
							})
						}
						if(this.noneflag4==4){
							this.ageColor = ['#dedede',"#dedede",'#dedede',"#dedede"]
						}else{
							this.ageColor = ['#00BFE6',"#00C4AB","#11A0F8","#55CE63"]
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
        mounted() {//处理时间
        	let date = new Date();
			this.setPeopleTime(date);
        },
        watch: {
            getPeopleDate(val) {
                this.flag = val
                this.peopleRatioFac()

            },
            getPeopleTime(val) {
                this.dateTime = val
                this.peopleRatioFac()
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
	
	.proportion {
		margin-top: 20px;
		border: 1px solid #E9F1F3;
	}

	.navTtitle {
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 18px;
		padding-left: 20px;
		box-sizing: border-box;
		border-bottom: 1px solid #E9F1F3;
	}

	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}

	.grid-content {
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.box {
		height: 320px;
		text-align: center;
	}

	.icon {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 10px;
		background: #000;
		vertical-align: middle;
		margin-left: 18px;
	}

	.li-item {
		height: 30px;
		line-height: 30px;
	}

	.per {
		margin: 0 10px;
	}

	.explain {
		display: inline-block;
		width: 51px;
		text-align: left;
	}
	/*.people_num{
		text-align: right;
	}*/
	.otherWidth{
		width: 88px;
	}
</style>
