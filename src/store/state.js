const state = {
    Org_Title:true,
    popupState:false,
        //全局弹层dialog控制,
        Org_Show: {},
        Org_disable: true,
        Org_newdata:{},
        Orgfalg:false,
        Org_Add:false,
        Org_Edit:false,
    personnelData:'',
    time:new Date(),
    flag:'day',
    Arrange_date:1,//排班年月日的标志
    Arrange_time:new Date(),//排班时间
    People_date:1,//人员管理年月日的标志
    People_time:'',//人员管理时间的标志
    loading:false,
    treedata:{},
    falg:true,
    unsave:false,
    editshow:false, // 控制组织机构树编辑按钮的显示隐藏
    attendance:false, //导入考勤是否展示
    scheduling:false,//排班管理页面导入成功刷新
    date_flag:1,//年月日的标志
    day_time:new Date(),//日时间
    month_time:new Date(),//月时间
	year_time:new Date(),//年时间
	project_id:'',//项目id
	group_id:'',//小组id
	search_flag:0//生产管理--主管审核查询的标志
	

};
export default state
