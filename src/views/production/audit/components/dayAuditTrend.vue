<template>
	<div class="dayAuditTrend" v-if='formInline.flag==1'>
		<div class="ecahrts">
			<h3 class="clearfix color333 title">
				<span class="fl font18">该日员工审核量走势</span>
				<span class="fr"><i class="icon1"></i>&nbsp;已审量</span>
			</h3>
			<chart :_styles="'width:100%;height:320px'" :_xAxisData='xAxisData' :_chartData="chartData" :_id="'testCharts93'" :_title="''" :_color="color" :_showBol="false" :_type="'LineAndBar'"></chart>
		</div>
	</div>
</template>
<script>
    /**
     * @author yanwen Li
     * @date 2018/9/27
     * @desc 柱状图左侧详情展示
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     */
	import { dayAuditTrend } from '@/api/production/AuditEcharts'
	import { mapGetters,mapActions } from 'vuex'
	import chart from '@/components/PublicEcharts'
	import commdate from '@/utils/commdate'
	import TempCache from "@/utils/tempcache";
    export default {
        name: "AuditDetails",
        components: {
            chart
        },
        data() {
			return {
				navTitle:'该日情况',
				detailsList: '',
				color: ['#55CE63'], //柱状图颜色
				chartData: [], //柱状图数据
                xAxisData: [], //x轴数据
				formInline:{
					userId:TempCache.getItem("userId"),//用户id
					flag: 1,//年月日标志
					date: this.getDayTime,//选择的时间
					orgId:'',//项目id
					groupId:''//小组id
                },
                submitForm:{
                    userId:TempCache.getItem("userId"),//用户id
					flag: 1,//年月日标志
					date: this.getDayTime,//选择的时间
					orgId:'',//项目id
					groupId:''//小组id
                }
			}
		},
		computed: {
			...mapGetters([
				'getDateFlag',
			    'getDayTime',
			    'getProjectId',
    			'getGroupId',
    			'getSearchFlag'
			]),
		},
		methods: {
			/*查询*/
            searchPeople() {
            	//只有点击查询的时候才会把赋值项目和小组的id
            	this.formInline.orgId = this.getProjectId
            	this.formInline.groupId = this.getGroupId
                Object.assign(this.submitForm,this.formInline);
                this.manageDetailsFac(this.formInline);
            },
			dayAuditTrendFac(data) {
				this.formInline.flag = 1
				this.submitForm.flag = 1
				this.formInline.date = commdate.timestampToTime(this.getDayTime);
                this.submitForm.date = commdate.timestampToTime(this.getDayTime);
				dayAuditTrend(data).then(response => {
					if(response && response.data && response.data.data) {
						var daysData = response.data.data
						var barData = []
						for(let i of daysData){
							for (let s in i) {
								this.xAxisData.push(s)
								barData.push(i[s])
						       
						      }
						}
                        //柱状图
                        this.chartData.push({
                            name: '已审量',
                            type: 'bar',
                            barWidth: '20',
                            data: barData
                        })
					}
				}).catch(error => {
					console.log(error, 222)
				})
			},
			...mapActions([
				'setDateFlag',
			    'setDayTime',
			    'setProjectId',
    			'setGroupId',
    			'setSearchFlag'
			])
		},
		watch: {
			getDateFlag(val) {
				this.formInline.flag = val
				this.submitForm.flag = val
				if(val==1){
					Object.assign(this.formInline,this.submitForm);
                	this.dayAuditTrendFac(this.submitForm);
				}
			},
			getDayTime(val) {
				this.formInline.date = val
				this.submitForm.date = val
				Object.assign(this.formInline,this.submitForm);
                this.dayAuditTrendFac(this.submitForm);
			},
			getSearchFlag(val){
				if(this.formInline.flag ==1){
					//只有点击查询的时候才会把赋值项目和小组的id
	            	this.formInline.projectId = this.getProjectId
	            	this.formInline.groupId = this.getGroupId
	                Object.assign(this.submitForm,this.formInline);
	                this.dayAuditTrendFac(this.formInline);
				}
				
			}
			
			
		},
		mounted() {
			let date = new Date();
			this.setDayTime(date);
			this.formInline.flag=1
		},
		destroyed(){
			this.setDateFlag(1);
			this.setDayTime(new Date());
		}
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.dayAuditTrend{
		margin-top: 20px;
		h2,h3 {
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
	.font12 {
		font-size: 12px;
	}
	.font18{
		font-size: 18px;
	}
	.ecahrts {
		width: 100%;
		height: 386px;
		padding: 10px 30px;
		border: 1px solid #E9F1F3;
		box-sizing: border-box;
	}
	.icon1 {
		display: inline-block;
		width: 10px;
		height: 10px;
		background: #55CE63;
		
	}
	.title {
		height: 50px;
		line-height: 50px;
		font-size: 12px;
	}
	}
	
</style>
