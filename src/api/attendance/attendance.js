/**
 * @author liu zhen
 * @date 2018/8/30
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import request from '@/utils/request'
import Qs from 'qs'
//考勤管理
//今日详情数据请求
export function daysDetails(data='') {

    return request({
        url: '/bpoPunchClock/findAttendanceStatistics',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//echarts图
export function echartsData(data='') {

    return request({
        url: '/bpoPunchClock/findAttendanceDiagram',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//项目下拉列表
export function projectData(data='') {

    return request({
        url: '/bpoOrganization/findprojectIdListByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//小组下拉列表
export function groupData(data='') {

    return request({
        url: '/bpoOrganization/findprojectIdListByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//考勤详情table数据
export function detailsAttendanceData(data='') {

    return request({
        url: '/bpoPunchClock/getAttendanceDetailList',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//考勤统计table数据
export function attendanceStatistics(data='') {

    return request({
        url: '/bpoPunchClock/findGroupStatistics',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//加班列表(组长及以上) bpoOvertime/findOverTimeListLeader
export function findOverTimeListLeader(data='') {

    return request({
        url: '/bpoOvertime/findOverTimeListLeader',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//同意加班
export function agreeOverTime(data='') {

    return request({
        url: '/bpoOvertime/agreeOverTime',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//拒绝加班
export function disAgreeOverTime(data='') {

    return request({
        url: '/bpoOvertime/disAgreeOverTime',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//查看详情弹窗
export function selectBpoOverTimeById(data='') {

    return request({
        url: '/bpoOvertime/selectBpoOverTimeById',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//--------------申请加班安排页面--------------------
//班次下拉列表
export function findShiftByOrgId(data='') {

    return request({
        url: '/bpoOvertime/findShiftByOrgId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//人员列表bpoOvertime/getUserByShiftId
export function getUserByShiftId(data='') {

    return request({
        url: '/bpoOvertime/getUserByShiftId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//申请加班安排保存 
export function applyOverTime(data='') {

    return request({
        url: '/bpoOvertime/applyOverTime',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//