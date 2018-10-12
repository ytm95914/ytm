/**
 * @author Lindong Ding
 * @date 2018/8/9
 * @desc 用户管理请求API对应 /views/system/user/..
 */

import request from '@/utils/request'
import Qs from 'qs'

//用户管理-列表拉取
export function requestList(data='') {
    return request({
        url: '/bpoUser/findUser',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//用户管理/新增人员
export function requestAllProject(data='') {
    return request({
        url: '/bpoOrganization/findBpoOrgAll',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//用户管理
export function requestProject(data='') {
    return request({
        url: '/bpoOrganization/findprojectIdListByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//用户管理/新增人员-查找小组
export function requestFindGroup(data='') {
    return request({
        url: '/bpoOrganization/findBpoOrgNext',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//用户管理/新增人员-查找项目
export function requestFindProject(data='') {
    return request({
        url: '/bpoOrganization/findBpoOrgUp',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//新增人员-工号验证
export function requestValidate(data='') {
    return request({
        url: '/bpoUser/findUserByName',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//新增人员-角色列表拉取
export function requestRole(data='') {
    return request({
        url: '/bpoRole/findRoleAll',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//新增人员-保存接口
export function requestSubmit(data='') {
    return request({
        url: 'bpoUser/addUserRoleOrg',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//离职-保存接口
export function requestReasons(data='') {
    return request({
        url: 'bpoResignation/saveBpoResignation',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//调出-保存接口
export function requestExport(data='') {
    return request({
        url: 'bpoScheduling/callOutBpoScheduling',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//通过lisrId查询数据，详情查看，详情编辑使用
export function requestListDetails(data='') {
    return request({
        url: 'bpoUser/findUserById',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//导出Excel表格请求
export function requestExports(data='') {
    return request({
        url: 'bpoUser/excelSysMangeExport',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//用户管理-调出-人员管理-调出项目
export function requestCalloutProject(data='') {
    return request({
        url: 'bpoScheduling/findProjectByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}

//用户管理-调出-人员管理-调出小组
export function requestCalloutGroup(data='') {
    return request({
        url: 'bpoScheduling/findGroupByProjectId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
