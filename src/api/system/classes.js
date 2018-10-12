/**
 * @author Yanwen Li
 * @date 2018/8/16
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import request from '@/utils/request'
import Qs from 'qs'

//项目/小组下拉框
export function personnelDetailsProject(data='') {
    return request({
        url:'/bpoOrganization/findprojectIdListByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//列表加载
export function classes(data='') {
    return request({
        url:'/bpoShiftsCode/findShiftsListPage',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//列表删除
export function delTableStauts(data='') {
    return request({
        url:'/bpoShiftsCode/findDeleteStauts',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//列表删除
export function delTable(data='') {
    return request({
        url:'/bpoShiftsCode/deleteShfitsCode',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//添加班次
export function addClass(data='') {
    return request({
        url:'/bpoShiftsCode/addShfitsCode',
        header:{
        	'Content-Type': 'application/json; charset=UTF-8'
        },
        method: 'post',
        data:Qs.parse(data)

    })
}
//编辑班次
export function editorClass(data='') {
    return request({
        url:'/bpoShiftsCode/findShiftsById',
        method: 'post',
        data:Qs.stringify(data)
    })
}


