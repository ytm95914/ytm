/**
 * @author Chenxi Liu
 * @date 2018/9/8
 * @desc 组织机构请求API对应 /views/system/workassist/..
 */
import request from '@/utils/request'
import Qs from 'qs'
export function confirms(data='') {
    return request({
        url: '/bpoPunchFile/add',
        method: 'post',
        data:Qs.stringify(data)
    })
}
