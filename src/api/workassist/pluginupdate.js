/**
 * @author Chenxi Liu
 * @date 2018/9/12
 * @desc 组织机构请求API对应 /views/system/workassist/..
 */
import request from '@/utils/request'
import Qs from 'qs'
//插件更新列表
export function pluginList(data='') {
    return request({
        url: '/bpoAutoUpdate/list',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//下载
export function downloadplugin(data='') {
    return request({
        url: 'bpoAutoUpdate/downbyid',
        method: 'post',
        data:Qs.stringify(data)
    })
}
