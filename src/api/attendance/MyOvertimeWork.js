/**
 * @author liyanwen
 * @date 2018/9/5
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import request from '@/utils/request'
import Qs from 'qs'
//考勤--我的加班
//列表数据请求
export function tableList(data='') {
    return request({
        url: 'bpoOvertime/findOverTimeList',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//撤销
export function timeCancel(data='') {
    return request({
        url: 'bpoOvertime/bpoOverTimeCancel',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//撤销
export function overtimeDetail(data='') {
    return request({
        url: 'bpoOvertime/selectBpoOverTimeByIdMy',
        method: 'post',
        data:Qs.stringify(data)
    })
}