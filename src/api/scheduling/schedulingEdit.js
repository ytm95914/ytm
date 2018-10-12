/**
 * @author Shumei Zhao
 * @date 2018/8/28
 * @desc 组长主管排班编辑页 \views\scheduling\SchedulingEdit.vue
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */


import request from '@/utils/request'
import Qs from 'qs'

//班次请求 日历
export function pageInfos(data='') {
    return request({
        url:'/bpoShiftsUser/findMyShiftsByMoon',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//班次请求 弹窗下拉框
export function requestClasses(data='') {
    return request({
        url:'/bpoShiftsCode/queryAllShiftCode',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//编辑班次
export function editClasses(data='') {
    return request({
        url:'/bpoShiftsCode/updateShiftCodeByDateAndId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//编辑班次
export function userInfos(data='') {
    return request({
        url:'/bpoUser/findUserById',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//排班情况
export function classesInfos(data='') {
    return request({
        url:'/bpoShiftsCode/findShiftCount',
        method: 'post',
        data:Qs.stringify(data)
    })
}
// 弹窗下拉框小组选择
export function shiftInfos(data='') {
    return request({
        url:'/bpoShiftsCode/findGroupByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}