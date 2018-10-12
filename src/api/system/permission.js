/**
 * @author Shumei Zhao
 * @date 2018/8/20
 * @desc 系统管理角色权限API对应 /views/system/permission/permission
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import request from '@/utils/request'
import Qs from 'qs'

//页面列表加载
export function pageInfos(data='') {
    return request({
        url:'/bpoRole/findRoleByPage',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//查看角色
export function seeRoles(data='') {
    return request({
        url:'/bpoRole/selectByIdPermiss',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//编辑角色
export function editRoles(data='') {
    return request({
        url:'/bpoRole/findRoleByPage',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//删除角色
export function delRoles(data='') {
    return request({
        url:'/bpoRole/deleteRolePermiss',
        method: 'post',
        data:Qs.stringify(data)
    })
}
// 编辑新增角色
export function addRoles(data='') {
    return request({
        url:'/bpoRole/addOrUpdateRole',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 新增角色 角色类型下拉框
export function rolesType(data='') {
    return request({
        url:'/bpoRoleType/findAllRoleType',
        method: 'post',
        data:Qs.stringify(data)
    })
}