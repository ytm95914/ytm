/**
 * @author liyanwen
 * @date 2018/9/6
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
        url: 'bpoLeaveApply/selectByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//撤销
export function timeCancel(data='') {
    return request({
        url: 'bpoLeaveApply/deleteByLeaveId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
// 请假详情  shumei zhao 
export function leaveInfo(data='') {

    return request({
        url: '/bpoLeaveApply/selectByLeaveId',
        method: 'post',
        data:Qs.stringify(data)
    })
}