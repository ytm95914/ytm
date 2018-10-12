/**
 * @author Tianming Yu
 * @date 2018/8/9
 * @desc 组织机构请求API对应 /views/system/orgnization/..
 */

import request from '@/utils/request'
import Qs from 'qs'

export function addorgnization(data='') {
    return request({
        url: '/bpoOrganization/add',
        method: 'post',
        data:Qs.stringify(data)
    })
}
export function deletorgnization(data='') {
    return request({
        url: '/bpoOrganization/deleteById',
        method: 'post',
        data:Qs.stringify(data)
    })
}
export function makeorgnization(data='') {
    return request({
        url: '/bpoOrganization/saveOrUpdateOrgById ',
        method: 'post',
        data:Qs.stringify(data)
    })
}
export function findorgnization(data='') {
    return request({
        url: '/bpoOrganization/findOrgById',
        method: 'post',
        data:Qs.stringify(data)
    })
}
// 点击新增之后树的显示
export function addfindorgnization(data='') {
    return request({
        url: '/bpoOrganization/findOrgByIdForAdd',
        method: 'post',
        data:Qs.stringify(data)
    })
}
export function orgnizationlist() {
    return request({
        url: '/bpoOrganization/findAllOrg',
        method: 'post'
    })
}
