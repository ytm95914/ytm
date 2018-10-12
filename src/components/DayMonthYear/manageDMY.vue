<template>
    <section class="choice">
        <div class="choice_left">
            <i>统计区间</i>
            <el-button v-for="(item,index) in timeView" :key="index" :class="{span_active:index==isActive}" @click="changeTimeview(index)"> {{ item.name}} </el-button>
        </div>
        <div class="choice_middle">
        	<ProjectAndGroup :groupBol='true'></ProjectAndGroup>
        </div>
        <div class="choice_right">
            <div class="block" v-if='isActive==0'>
                <el-date-picker v-model="dateTime" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="block" v-if='isActive==1'>
                <el-date-picker v-model="monthTime" type="month" placeholder="选择月">
                </el-date-picker>
            </div>
            <div class="block" v-if='isActive==2'>
                <el-date-picker v-model="yearTime" type="year" placeholder="选择年">
                </el-date-picker>
            </div>
        </div>
        <div class="search">
        	<el-button type="primary" icon="el-icon-search" style="padding: 11px;" @click="search">查询</el-button>
        </div>
    </section>
</template>
<script>
	import ProjectAndGroup from '@/components/ProjectAndGroup'
	import { mapGetters,mapActions } from 'vuex'
    import commdate from '@/utils/commdate'

	export default {
		components: {
			ProjectAndGroup
		},
		data(){
			return {
                dateTime: new Date(), // 日
                monthTime: new Date(), // 月
                yearTime: new Date(), // 年
                isActive: 0,
                num:1,
                timeView: [{ name: "日" }, { name: "月" }, { name: "年" }],
			}
		},
		methods:{
            changeTimeview(index) {
                this.isActive = index;
                this.setDateFlag(index+1);
            },
            search(){
            	 this.setSearchFlag(this.num++)
            },
			...mapActions([
				'setDateFlag',
			    'setDayTime',
			    'setMonthTime',
			    'setYearTime',
			    'setSearchFlag'
            ]),

		},
		computed:{
			...mapGetters([
				'getDateFlag',
			    'getDayTime',
			    'getMonthTime',
			    'getYearTime',
			    'getSearchFlag'
            ]),
		},
		watch:{
            dateTime(val){
                this.setDayTime(val);
            },
            monthTime(val){
                this.setMonthTime(val);
            },
            yearTime(val){
                this.setYearTime(val);
            }
		}
	}
</script>
<style lang="scss" scoped>
    .choice {
        height: 36px;
        padding: 22px 0px 26px;
        .choice_left {
            float: left;
            i {
                font-size: 12px;
                color: #333333;
            }
            .el-button {
                background: #F2F7F8;
                width: 70px;
            }
            .span_active {
                background: #11A0F8;
                color: #fff;
            }
        }
        .choice_middle{
        	margin-left: 20px;
        	float: left;
        }
        .choice_right {
            width: 140px;
            float: left;
            .block {
                width: 100%;
                height: 100%;
                .el-date-editor.el-input, .el-date-editor.el-input__inner {
                    width: 100% !important;
                    height: 100% !important;
                }
            }
        }
        .search{
        	float: right;
        }
    }
</style>
