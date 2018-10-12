/**
 * @author Shumei Zhao
 * @date 2018/8/23
 * @desc 系统管理角色权限API对应 /views/scheduling/MyScheduling.vue/
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */


import request from '@/utils/request'
import Qs from 'qs'

//班次请求 请求班次查询
export function requestClasses(data='') {
    return request({
        url:'/bpoShiftsCode/findMyShiftsById',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//员工日历 请求班次查询
export function requestDate(data='') {
    return request({
        url:'/bpoShiftsUser/findMyShiftsByMoon',
        method: 'post',
        data:Qs.stringify(data)
    })
}
