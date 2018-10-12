/**
 * @author Shumei Zhao
 * @date 2018/8/23
 * @desc 系统管理角色权限API对应 /views/scheduling/SchedulingManage.vue/
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import request from '@/utils/request'
import Qs from 'qs'

//主管排班详情
export function requestDetails(data = '') {
	return request({
		url: '/bpoShiftsUser/getShiftsUserNum',
		method: 'post',
		data: Qs.stringify(data)
	})
}

//主管排班统计
export function requestStatisList(data = '') {
	return request({
		url: '/bpoShiftsUser/getShiftsStatistics',
		method: 'post',
		data: Qs.stringify(data)
	})
}
//主管排班详情
export function requestDetailsList(data = '') {
	return request({
		url: 'bpoShiftsCode/findShiftListByDayPage',
		method: 'post',
		data: Qs.stringify(data)
	})
}
//小组下拉框
export function personnelDetailsProject(data = '') {
	return request({
		url: '/bpoOrganization/findprojectIdListByUserId',
		method: 'post',
		data: Qs.stringify(data)
	})
}
//下载
export function dowloadShifts() {
	return request({
		url: '/bpoShiftsUser/dowloadShiftsUserModel',
		method: 'get',
    	responseType: 'blob'  //二进制流
	})
}
