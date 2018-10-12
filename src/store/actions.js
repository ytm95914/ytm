import {PASS_DATA} from "./mutation-types";

/**
 * @author Lindong Ding
 * @date 2018/8/8
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

const actions = {
    Changepopupstate({ commit }, data) {
        commit('SET_POPUPSTATE', data)
    },
    setDate({commit},data){
    	commit('UPDATA_STATISTICS_TIME',data)
    },
    setFlag({commit},data){
    	commit('UPDATA_STATISTICS_DATE',data)
    },
    setPeopleDate({commit},data){
    	commit('PEOPLE_DATE',data)
    },
    setPeopleTime({commit},data){
    	commit('PEOPLE_TIME',data)
    },
    setArrangeDate({commit},data){
    	commit('ARRANGE_DATE',data)
    },
    setArrangeTime({commit},data){
    	commit('ARRANGE_TIME',data)
    },
    setLoadingStart({commit}) {
        commit('LOADING',true)
    },
    setLoadingEnd({commit}) {
        commit('LOADING',false)
    },
    setAttendance({commit},data) {
        commit('ATTENDANCE',data)
    },
    setScheduling({commit},data){
        commit('SCHEDULING',data)
    },
    setDateFlag({commit},data){
    	commit('DATE_FLAG',data)
    },
    setDayTime({commit},data){
    	commit('DAY_TIME',data)
    }, 
    setMonthTime({commit},data){
    	commit('MONTH_TIME',data)
    },
    setYearTime({commit},data){
    	commit('YEAR_TIME',data)
    },
    setProjectId({commit},data){
    	commit('PROJECT_ID',data)
    },
    setGroupId({commit},data){
    	commit('GROUP_ID',data)
    },
    setSearchFlag({commit},data){
    	commit('SEARCH_FLAG',data)
    },
    
};
export default actions;
