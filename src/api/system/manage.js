/**
 * @author Yanwen Li
 * @date 2018/8/7
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import request from '@/utils/request'
import Qs from 'qs'
//人员总数
export function peopleNumList(data='') {

    return request({
        url: 'bpoUser/getEmpNumAndHistogram',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//人力配比-人力配比
export function peopleRatio(data='') {
    return request({
        url: '/bpoUser/getManpowerRatioEmpNum',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//人力配比-性质
export function peopleProperty(data='') {
    return request({
        url: '/bpoUser/getFormalTrialEmpNum',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//人力配比-新老员工
export function peopleOldNew(data='') {
    return request({
        url: '/bpoUser/getNewOldEmpNum',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//人力配比-年龄占比
export function peopleAge(data='') {
    return request({
        url: '/bpoUser/getDiffAgeEmpNum',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//入职离职情况左侧列表
export function peopleComeOrGo(data='') {
    return request({
        url: '/bpoUser/findUserState',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//离职情况统计
export function peopleGoStatistic(data='') {
    return request({
        url: '/bpoUser/findUserLeaveJob',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//离职情况分析
export function peopleGoAnalyse(data='') {
    return request({
        url: '/bpoUser/findResignationAnalyze',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//人员详情列表
export function personnelDetails(data='') {
    return request({
        url:'/bpoUser/findUserList',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//人员详情列表--项目小组下拉框
export function personnelDetailsProject(data='') {
    return request({
        url:'/bpoOrganization/findprojectIdListByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// ----------------------------------------------------------------

//人员管理--人员调出
export function personnelTransfer(data='') {
    return request({
        url:'/bpoScheduling/findBpoSchedulingCallOutList',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//人员管理--人员调出--操作按钮[同意]
export function personnelAgreeOut(data='') {
    return request({
        url:'/bpoScheduling/agreeCallOut',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//人员管理--人员调出--操作按钮[不同意]
export function personnelDisagreeOut(data='') {
    return request({
        url:'/bpoScheduling/disAgreeCallOut',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// ----------------------------------------------------------------


//人员管理--人员调入
export function personnelStaffing(data='') {
    return request({
        url:'/bpoScheduling/findBpoSchedulingCallInList',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//人员管理--人员调入--操作按钮[不同意]
export function personnelAgreeIn(data='') {
    return request({
        url:'/bpoScheduling/agreeCallIn',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//人员管理--人员调入--操作按钮[不同意]
export function personnelDisagreeIn(data='') {
    return request({
        url:'/bpoScheduling/disAgreeCallIn',
        method: 'post',
        data:Qs.stringify(data)
    })
}

