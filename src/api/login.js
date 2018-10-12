/**
 * @author Lindong Ding
 * @date 2018/7/24
 * @desc 登录请求API对应 /views/login/..
 */

import request from '@/utils/request'
import Qs from 'qs'

export function loginByUsername(data) {
    return request({
        baseURL: process.env.BASE_API,
        url: `/auth/oauth/token?username=${data.username}&password=${data.password}&randomStr=${data.randomStr}&grant_type=${data.grant_type}&scope=${data.scope}`,
        method: 'post',
        headers: {
            'Authorization': 'Basic aWRzYzppZHNj',
        }
    })
}

export function getUserInfo(data='') {
    return request({
        url: '/bpoUser/findUserByName',
        method: 'post',
        data:Qs.stringify(data)
    })
}

export function getUserRole(data='') {
    return request({
        url: '/bpoRole/findMyPerMissionByUserName',
        method: 'post',
        data:Qs.stringify(data)
    })
}
