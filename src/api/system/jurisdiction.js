/**
 * @author Shumei Zhao
 * @date 2018/8/20
 * @desc 系统管理角色权限API对应 /views/system/permission/jurisdiction
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import request from '@/utils/request'
import Qs from 'qs'

//页面列表加载
export function pageInfos(data='') {
    return request({
        url:'/bpoRole/permissConfig',
        method: 'post',
        data:Qs.stringify(data)
    })
}
// checkbox 数据
export function checkboxs(data='') {
    return request({
        url:'/bpoRole/updateRolePermiss',
        method: 'post',
        data:Qs.stringify(data)
    })
}
