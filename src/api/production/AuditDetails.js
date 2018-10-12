/**
 * @author li yan wen
 * @date 2018/10/9
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */
import request from '@/utils/request'
import Qs from 'qs'
//考勤管理
//员工详情数据请求
export function personneDetails(data='') {
    return request({
        url: 'bpoTargetDayData/findPersonnelAuditVolume',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//主管详情数据请求
export function manageDetails(data='') {
    return request({
        url: 'bpoTargetDayData/getGroupTargetDateForDetailsDay',
        method: 'post',
        data:Qs.stringify(data)
    })
}