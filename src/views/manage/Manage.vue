<template>
	<div>
		<div class="nav-item">
			<span class="color333">统计区间</span>
			<span class="dateStyle" v-for="(item,index) in tabs" :class="{activeName:mineTabIndex==index}" @click="handleClick(index)">{{item.name}}</span>
			<span v-if="mineTabIndex==0" class="fr">
				<el-date-picker
				    v-model="dateVal"
				    type="month"
				    value-format="yyyy-MM"
				    placeholder="选择日期">
		    	</el-date-picker>
			</span>
			<span v-if="mineTabIndex==1" class="fr">
				<el-date-picker
				    v-model="dateVal"
				    type="year"
				    value-format="yyyy"
				    placeholder="选择1期">
		    	</el-date-picker>
			</span>
		</div>
		<personnel-total></personnel-total>
		<personnel-proportion></personnel-proportion>
		<personnel-situation></personnel-situation>
		<personnel-details :BtnPermission="BtnPermission"></personnel-details>
	</div>
</template>

<script>
	/**
	 * @author Yanwen Li
	 * @date 2018/7/31
	 * @desc [人员管理] 页面
	 * @module 组件引用位置
	 */

	import personnelTotal from './components/personnelTotal'
	import personnelProportion from './components/personnelProportion'
	import personnelSituation from './components/personnelSituation'
	import personnelDetails from './components/personnelDetails'
	import { mapGetters, mapActions } from 'vuex'
    import TempCache from '@/utils/tempcache'

	export default {
		name: 'manage',
		components: {
			personnelTotal,
			personnelProportion,
			personnelSituation,
			personnelDetails
        },
		data() {
			return {
				dateVal: new Date(),
				mineTabIndex: 0,
				tabs: [{
					name: '月'
				}, {
					name: '年'
				}],
                BtnPermission: []
			}
		},
		computed: {
			...mapGetters([
				'getPeopleDate',
				'getPeopleTime'
			]),
		},
		methods: {
			handleClick(index) {
				if(index == this.mineTabIndex){
                    return
                }else{
                   this.mineTabIndex = index;
                   this.setPeopleDate(index + 1);
                }
			},
			...mapActions([
				'setPeopleDate',
				'setPeopleTime'
			]),
		},
        mounted(){
        	this.flag = this.getPeopleDate-1
            this.BtnPermission = TempCache.getItem('人员管理');
        },
		watch: {
			dateVal(val) {
				this.setPeopleTime(this.dateVal);
			}
		}
	}
</script>

<style scoped>
	.color333 {
		color: #333;
	}

	.fr {
		float: right;
	}

	.dateStyle {
		background: #F2F7F8;
		color: #999;
		width: 60px;
		font-size: 12px;
		margin: 0 8px;
		cursor: pointer;
		border-radius: 2px;
	}

	.activeName {
		color: #fff;
		background: #11A0F8;
	}

	.nav-item {
		padding-bottom: 20px;
	}

	.nav-item>span {
		display: inline-block;
		line-height: 36px;
		height: 36px;
		text-align: center;
	}
</style>
