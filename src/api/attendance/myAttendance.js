/**
 * @author liu zhen
 * @date 2018/8/30
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import request from '@/utils/request'
import Qs from 'qs'

// 我的考勤 考勤详情
export function myAttendances(data='') {

    return request({
        url: '/bpoPunchClock/findByIdAttendanceStatistics',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 考勤列表
export function myAttendancesTable(data='') {

    return request({
        url: '/bpoPunchClock/findByPageAttendanceStatistics',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 班次下拉框
export function classes(data='') {

    return request({
        url: '/bpoShiftsCode/findAllShifts',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 班次id查询
export function overTime(data='') {

    return request({
        url: '/bpoOvertime/findShiftByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 加班
export function overData(data='') {

    return request({
        url: '/bpoOvertime/applyOverTime',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 请假时长
export function leaveTime(data='') {

    return request({
        url: '/bpoLeaveApply/getLeaveApplyLength',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 请假弹窗
export function leaveList(data='') {

    return request({
        url: '/bpoLeaveApply/addLeave',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 请假管理
export function leaveManagement(data='') {

    return request({
        url: '/bpoLeaveApply/findLeaveApplyLista',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 请假管理/部门、小组
export function options(data='') {

    return request({
        url: '/bpoOrganization/findprojectIdListByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 请假管理/部门、小组
export function subject(data='') {

    return request({
        url: '/bpoLeaveApply/updateLeaveApply',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 请假管理/请假详情
export function leaveInfo(data='') {

    return request({
        url: '/bpoLeaveApply/selectByLeaveId',
        method: 'post',
        data:Qs.stringify(data)
    })
}
// 我的考勤 请假上传
export function leavePath(data='') {

    return request({
        url: '/bpoLeaveApply/fileUpload',
        method: 'post',
        data:Qs.stringify(data),
        // header:{
        //     "Content-Type":"multipart/form-data"
        // }
         headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json; charset=UTF-8'
        }
    })
}
// 我的考勤 加班弹窗默认带出用户手机号
export function roleState(data='') {

    return request({
        url: '/bpoOvertime/isDirector',
        method: 'post',
        data:Qs.stringify(data)
    })
}



// 我的考勤 加班弹窗项目下拉框
export function projectOption(data='') {

    return request({
        url: '/bpoScheduling/findProjectByUserId',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 加班弹窗小组下拉框
export function groupsOption(data='') {

    return request({
        url: '/bpoScheduling/findGroupByProjectId',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 加班弹窗是否可以加班
export function isOver(data='') {

    return request({
        url: '/bpoOvertime/findWorkDate',
        method: 'post',
        data:Qs.stringify(data)
    })
}

// 我的考勤 加班弹窗是否可以加班
export function overDialog(data='') {

    return request({
        url: '/bpoOvertime/checkDate',
        method: 'post',
        data:Qs.stringify(data)
    })
}