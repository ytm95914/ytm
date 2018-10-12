/**
 * @author Lindong Ding
 * @date 2018/8/13
 * @desc 定义语义化常量，通过actions修改mutation，在修改state数据，严格按照vue官方推荐使用方式
 */

const LOADING = 'LOADING';  //全局loading
const PEOPLE_DATE ='PEOPLE_DATE';//人员管理统计区间date月年
const PEOPLE_TIME ='PEOPLE_TIME';//人员管理统计区间date时间
const ARRANGE_DATE ='ARRANGE_DATE';//排班统计区间date月年
const ARRANGE_TIME ='ARRANGE_TIME';//排班统计区间date时间
const UPDATA_STATISTICS_DATE = 'UPDATA_STATISTICS_DATE';//考勤统计区间年，月，日更新
const UPDATA_STATISTICS_TIME = 'UPDATA_STATISTICS_TIME';//考勤统计区间时间更新
const ATTENDANCE = 'ATTENDANCE';//导入考勤功能
const SCHEDULING = 'SCHEDULING';//排版管理导入以后刷新页面
const DATE_FLAG = 'DATE_FLAG';//年月日的标志
const DAY_TIME = 'DAY_TIME';//日时间
const MONTH_TIME = 'MONTH_TIME';//月时间
const YEAR_TIME = 'YEAR_TIME';//年时间
const PROJECT_ID = 'PROJECT_ID';//项目id
const GROUP_ID = 'GROUP_ID';//小组id
const SEARCH_FLAG = 'SEARCH_FLAG';//生产管理--主管审核查询的标志

export {
    LOADING,
	PEOPLE_DATE,
	PEOPLE_TIME,
	ARRANGE_DATE,
	ARRANGE_TIME,
	UPDATA_STATISTICS_DATE,
	UPDATA_STATISTICS_TIME,
	ATTENDANCE,
	SCHEDULING,
	DATE_FLAG,
	DAY_TIME,
	MONTH_TIME,
	YEAR_TIME,
	PROJECT_ID,
	GROUP_ID,
	SEARCH_FLAG
}
