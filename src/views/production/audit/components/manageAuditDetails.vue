<template>
    <section class="audit-details">
        <div class="fl">
			<h2 class="navTtitle color333">{{navTitle}}</h2>
			<div class="totalNum">
				<div>
					<span class="color666">进单量&nbsp; </span>
					<span class="colorBule font24">{{detailsList.allAvg}}</span><span class="colorBule font12">条</span>
				</div>
				<div>
					<span class="color666">已审量&nbsp; </span>
					<span class="colorBule font24">{{detailsList.inNumber}}</span><span class="colorBule font12">条</span>
				</div>
				<ul class="efficiency">
					<li>
						<p class="color666">KPI目标</p>
						<span class="colorBule font20">{{detailsList.kpiNumber}}</span><span class="colorBule font12">条</span>
					</li>
					<li>
						<p class="color666">整体人均效率</p>
						<span class="colorRed font20">{{detailsList.overNumber}}</span><span class="colorRed font12">条</span>
					</li>
					<li>
						<p class="color666">新员工人均效率</p>
						<span class="colorGreen font20">{{detailsList.newAvg}}</span><span class="colorGreen font12">条</span>
					</li>
					<li>
						<p class="color666">老员工人均效率</p>
						<span class="colorGreen font20">{{detailsList.oldAvg}}</span><span class="colorGreen font12">条</span>
					</li>
				</ul>
				
			</div>
		</div>
    </section>
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
	import { manageDetails } from '@/api/production/AuditDetails'
	import { mapGetters,mapActions } from 'vuex'
	import commdate from '@/utils/commdate'
	import TempCache from "@/utils/tempcache";
    export default {
        name: "AuditDetails",
        data() {
			return {
				navTitle:'该日情况',
				detailsList: '',
				formInline:{
					userId:TempCache.getItem("userId"),//用户id
					flag: 1,//年月日标志
					date: this.getDayTime,//选择的时间
					projectId:'',//项目id
					groupId:''//小组id
                },
                submitForm:{
                    userId:TempCache.getItem("userId"),//用户id
					flag: 1,//年月日标志
					date: this.getDayTime,//选择的时间
					projectId:'',//项目id
					groupId:''//小组id
                },
			}
		},
		computed: {
			...mapGetters([
				'getDateFlag',
			    'getDayTime',
			    'getMonthTime',
			    'getYearTime',
			    'getProjectId',
    			'getGroupId',
    			'getSearchFlag'
			]),
		},
		methods: {
			manageDetailsFac(data) {
				switch(this.formInline.flag){
					case 1:
                        this.formInline.date = commdate.timestampToTime(this.getDayTime);
                        this.submitForm.date = commdate.timestampToTime(this.getDayTime);
                        break;
                    case 2:
                        this.formInline.date  = commdate.timestampToTime(this.getMonthTime).substring(0,7);
                        this.submitForm.date  = commdate.timestampToTime(this.getMonthTime).substring(0,7);
                        break;
                    case 3:
                        this.formInline.date  = commdate.timestampToTime(this.getYearTime).substring(0,4);
                        this.submitForm.date  = commdate.timestampToTime(this.getYearTime).substring(0,4);
                        break;
                }
				manageDetails(data).then(response => {
					if(response && response.data && response.data.data) {
						this.detailsList = response.data.data
					}
				}).catch(error => {
					console.log(error, 222)
				})
			},
			...mapActions([
				'setDateFlag',
			    'setDayTime',
			    'setMonthTime',
			    'setYearTime',
			    'setProjectId',
    			'setGroupId',
    			'setSearchFlag'
			])
		},
		watch: {
			getDateFlag(val) {
				this.formInline.flag = val
				this.submitForm.flag = val
				Object.assign(this.formInline,this.submitForm);
                this.manageDetailsFac(this.submitForm);
			},
			getDayTime(val) {
				this.formInline.date = val
				this.submitForm.date = val
				Object.assign(this.formInline,this.submitForm);
                this.manageDetailsFac(this.submitForm);
			},
			getMonthTime(val) {
				this.formInline.date = val
				this.submitForm.date = val
				Object.assign(this.formInline,this.submitForm);
                this.manageDetailsFac(this.submitForm);
			},
			getYearTime(val) {
				this.formInline.date = val
				this.submitForm.date = val
				Object.assign(this.formInline,this.submitForm);
                this.manageDetailsFac(this.submitForm);
			},
			getSearchFlag(val){
				//只有点击查询的时候才会把赋值项目和小组的id
            	this.formInline.projectId = this.getProjectId
            	this.formInline.groupId = this.getGroupId
                Object.assign(this.submitForm,this.formInline);
                this.manageDetailsFac(this.formInline);
			}
			
			
		},
		mounted() {
			let date = new Date();
			this.setDayTime(date);
		},
		destroyed(){
			this.setDateFlag(1);
			this.setDayTime(new Date());
			this.setMonthTime(new Date());
			this.setYearTime(new Date())
			this.setSearchFlag(0)
		}
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .audit-details{
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
		padding: 20px;
		padding-top: 0;
		font-size: 14px;
		box-sizing: border-box;
		border: 1px solid #E9F1F3;
		border-top: 0;
	}
	.totalNum>div{
		padding-top: 30px;
	}
	.efficiency {
		margin-top: 20px;
		padding: 10px 0;
		box-sizing: border-box;
	}
	.efficiency li{
		float: left;
		width: 50%;
		height: 75px;
		box-sizing: border-box;
	}
	.efficiency li>p{
		margin-bottom: 10px;
	}
	.efficiency li:nth-child(1){
		padding: 10px 0;
		border-right: 1px solid #E9F1F3;
		border-bottom: 1px solid #E9F1F3;
	}
	.efficiency li:nth-child(2){
		padding: 10px 0;
		border-bottom: 1px solid #E9F1F3;
	}
	.efficiency li:nth-child(3){
		border-right: 1px solid #E9F1F3;
		padding-top: 20px;
	}
	.efficiency li:nth-child(4){
		padding-top: 20px;
	}
	.efficiency li:nth-child(2n){
		padding-left: 30px;
		box-sizing: border-box;
	}
    }
</style>
