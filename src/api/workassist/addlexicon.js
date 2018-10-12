/**
 * @author Chenxi Liu
 * @date 2018/8/27
 * @desc 组织机构请求API对应 /views/system/workassist/..
 */
import request from '@/utils/request'
import Qs from 'qs'

//关键词词库列表
export function lexiconList(data='') {
    return request({
        url: '/bpoKeywordDb/list',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//新增关键词词库
export function addLexicon(data='') {
    return request({
        url: '/bpoKeywordDb/saveBpoKeywordDb',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//编辑关键词词库
export function editlexicon(data='') {
    return request({
        url: '/bpoKeywordDb/updatepoKeywordDb',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//下拉框
export function getSelect(data='') {
    return request({
        url: '/bpoKeywordDb/getOrganizationList',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//关键词词库回显
export function echolexicon(data='') {
    return request({
        url: '/bpoKeywordDb/findById',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//删除关键词词库
export function deleteLexicon(data='') {
    return request({
        url: '/bpoKeywordDb/deleteById',
    method: 'post',
        data:Qs.stringify(data)
    })
}
//关键词分类添加
export function addclassification(data='') {
    return request({
        url: '/bpoKeywordClassify/saveKeywordClassify',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//关键词分类列表
export function classificationList(data='') {
    return request({
        url: '/bpoKeywordClassify/page',
        method: 'post',
        data:Qs.stringify(data)
    })
}
export function classificationLists(data='') {
    return request({
        url: '/bpoKeywordClassify/page',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//关键词分类回显
export function echoclassification(data='') {
    return request({
        url: '/bpoKeywordClassify/findById',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//编辑关键词分类名称
export function editclassification(data='') {
    return request({
        url: '/bpoKeywordClassify/updatepoKeywordDb',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//删除关键词分类名称
export function deleteclassification(data='') {
    return request({
        url: '/bpoKeywordClassify/deleteById',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//关键词分类查询
export function queryclassification(data='') {
    return request({
        url: '/bpoKeywordClassify/page',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//关键词列表
export function keywordList(data='') {
    return request({
        url: '/bpoKeyWord/page',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//删除关键字
export function deletekeyword(data='') {
    return request({
        url: '/bpoKeyWord/deleteById',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//编辑关键字
export function editkeyword(data='') {
    return request({
        url: '/bpoKeyWord/updatepoKeyword',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//关键字批量删除
export function deletekeywords(data='') {
    return request({
        url: '/bpoKeyWord/deleteByMoreId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//导出关键字表格
export function requestImport(data='') {
    return request({
        url: '/bpoKeyWord/exportKeyWordExcel',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//添加关键词
export function addkeyword(data='') {
    return request({
        url: '/bpoKeyWord/saveBpoKeyword',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//关键词回显
export function echokeyword(data='') {
    return request({
        url: '/bpoKeyWord/findById',
        method: 'post',
        data:Qs.stringify(data)
    })
}
//导入关键词
export function importkeyword(data='') {
    return request({
        url: '/bpoKeyWord/importKeyWordExcelCheck',
        method: 'post',
        data:Qs.stringify(data)
    })
}
