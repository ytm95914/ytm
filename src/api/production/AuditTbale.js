/**
 * @author liu zhen
 * @date 2018/10/9
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */
import request from '@/utils/request'
import Qs from 'qs'
//表格今日统计数据接口（包含日月年三个维度）
export function bpoTargetDayData(data='') {

    return request({
        url: '/bpoTargetDayData/getUserTargetDate',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//表格今日详情数据接口（包含日月年三个维度）
export function targetDataStatisticsDetail(data='') {

    return request({
        url: '/bpoTargetDayData/targetDataStatisticsDetail',
        method: 'post',
        data:Qs.stringify(data)
    })
}