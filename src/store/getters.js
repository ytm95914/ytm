/**
 * @author Lindong Ding
 * @date 2018/7/24
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

const getters = {
    token: state => state.user.token,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    status: state => state.user.status,
    roles: state => state.user.roles,
    setting: state => state.user.setting,
    getOrg_Title:(state)=>{
            return state.Org_Title
    },
    getOrg_Show:(state)=>{
        return state.Org_Show
    },
    getOrg_disable:(state)=>{
        return state.Org_disable
    },
    getOrg_newdata:(state)=>{
        return state.Org_newdata
    },
    getOrgfalg:(state)=>{
        return state.Orgfalg
    },
    getOrg_Add:(state)=>{
        return state.Org_Add;
    },
    getOrg_Edit:(state)=>{
        return state.Org_Edit;
    },
    popupstate: state => state.popupState,
    getDate:state => state.time,
    getFlag:state => state.flag,
    getPeopleDate:state => state.People_date,
    getPeopleTime:state => state.People_time,
    getArrangeDate:state => state.Arrange_date,
    getArrangeTime:state => state.Arrange_time,
    getLoading:state => state.loading,
    getTreedata:state =>state.treedata,
    getfalg:state =>state.falg,
    getunsave:state=>state.unsave,
    geteditshow:state=>state.editshow,
    getattendance:state=>state.attendance,
    getscheduling:state=>state.scheduling,
    getDateFlag:state => state.date_flag,
    getDayTime:state => state.day_time,
    getMonthTime:state => state.month_time,
    getYearTime:state => state.year_time,
    getProjectId:state => state.project_id,
    getGroupId:state => state.group_id,
    getSearchFlag:state => state.search_flag,
};

export default getters;
