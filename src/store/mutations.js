import {
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
} from './mutation-types.js'
const mutations={
    setOrg_Title(state,value){
        state.Org_Title=value
    },
    SET_POPUPSTATE(state, data){
        state.popupState = data
    },
    setOrg_Show(state,value){
        state.Org_Show=value;
    },
    setOrg_disable(state,value){
        state.Org_disable=value;
    },
    setOrg_newdata(state,value){
        state.Org_newdata=value;
    },
    setOrgfalg(state,value){
        state.Orgfalg=value;
    },
    setOrg_Add(state,value){
        state.Org_Add=value;
    },
    setOrg_Edit(state,value){
        state.Org_Edit=value;
    },
    setTreedata(state,value){
        state.treedata=value;
    },
    setfalg(state,value){
        state.falg=value;
    },
    setunsave(state,value){
        state.unsave=value;
    },
    seteditshow(state,value){
        state.editshow=value;
    },
    [UPDATA_STATISTICS_TIME](state,data){
        state.time = data;
    },
    [UPDATA_STATISTICS_DATE](state,data){
        state.flag = data;
    },
	[PEOPLE_DATE](state,data){
		state.People_date = data;
	},
	[PEOPLE_TIME](state,data){
		state.People_time = data;
	},
	[ARRANGE_DATE](state,data){
		state.Arrange_date = data;
	},
	[ARRANGE_TIME](state,data){
		state.Arrange_time = data;
	},
    [LOADING](state,data){
        state.loading = data;
    },
    [ATTENDANCE](state,data){
        state.attendance = data;
    },
    [SCHEDULING](state,data){
        state.scheduling = data;
    },
    [DATE_FLAG](state,data){
		state.date_flag = data;
	},
	[DAY_TIME](state,data){
		state.day_time = data;
	},
	[MONTH_TIME](state,data){
		state.month_time = data;
	},
	[YEAR_TIME](state,data){
		state.year_time = data;
	},
	[PROJECT_ID](state,data){
		state.project_id = data;
	},
	[GROUP_ID](state,data){
		state.group_id = data;
	},
	[SEARCH_FLAG](state,data){
		state.search_flag = data;
	}
};
export default mutations;
