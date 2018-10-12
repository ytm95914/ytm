/**
 * @author li yan wen
 * @date 2018/10/9
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */
import request from '@/utils/request'
import Qs from 'qs'
//员工详情数据请求
export function personnelAuditEcharts(data='') {
    return request({
        url: '/bpoTargetDayData/findstaffValueDay',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//主管详情数据请求
export function manageAuditEcharts(data='') {
    return request({
        url: '/bpoTargetDayData/getGroupTargetDateForMap',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//组长今日详情走势图
export function dayAuditTrend(data='') {
    return request({
        url: '/bpoTargetDayData/getGroupTargetDateForDay',
        method: 'post',
        data:Qs.stringify(data)
    })
}