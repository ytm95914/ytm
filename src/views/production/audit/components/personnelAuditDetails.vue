<template>
    <section class="audit-details">
        <div class="fl">
			<h2 class="navTtitle color333">{{navTtitle}}</h2>
			<div class="totalNum">
				<div>
					<span class="color666">已审量&nbsp; </span>
					<span class="colorGreen font24">{{details.Audited}}</span><span class="colorGreen font12">条</span>
				</div>
				<div>
					<span class="color666">待审核&nbsp; </span>
					<span class="colorOrange font24">{{details.pending}}</span><span class="colorOrange font12">条</span>
				</div>
				<div>
					<span class="color666">KPI目标&nbsp; </span>
					<span class="colorBule font24">{{details.KPITargetValue}}</span><span class="colorBule font12">条</span>
				</div>
				
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
	import { personneDetails } from '@/api/production/AuditDetails'
	
	import { mapGetters,mapActions } from 'vuex'
	import commdate from '@/utils/commdate'
    export default {
        name: "AuditDetails",
        data() {
			return {
				flag:1,
				dateTime:new Date(),
				navTtitle:'该日情况',
				details:{},
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
			personneDetailsFac() {
				switch(this.flag){
					case 1:
					    this.navTtitle='该日情况'
                        this.dateTime = commdate.timestampToTime(this.getDayTime);break;
                    case 2:
                        this.navTtitle='该月情况'
                        this.dateTime = commdate.timestampToTime(this.getMonthTime).substring(0,7);break;
                    case 3:
                    	 this.navTtitle='该年情况'
                        this.dateTime = commdate.timestampToTime(this.getYearTime).substring(0,4);break;
                }
				let params = {
					flag: this.flag,
					queryDate: this.dateTime,
					targetCode:'T000003'
				}
				personneDetails(params).then(response => {
					if(response && response.data&& response.data.data) {
						this.details = response.data.data
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
				this.personneDetailsFac()
			},
			getDayTime(val) {
				this.dateTime = val
				this.personneDetailsFac()
			},
			getMonthTime(val) {
				this.dateTime = val
				this.personneDetailsFac()
			},
			getYearTime(val) {
				this.dateTime = val
				this.personneDetailsFac()
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
	.colorOrange{
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
    }
</style>
