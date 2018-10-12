/**
 * @author Lindong Ding
 * @date 2018/7/24
 * @desc 路由管理,根据下面分类添加到对应位置
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/Login'), hidden: true },
    { path: '/error', component: () => import('@/views/error'), hidden: true },
    { path: '/404', component: () => import('@/views/error/404'), hidden: true },
    { path: '',
        component: Layout,
        redirect: 'home',
        children: [{
            path: 'home',
            component: () => import('@/views/home/Home'),
            name: 'home',
            meta: {
                title: '首页',
                icon: 'nav-dashboard',
                noCache: true
            }
        }],
        hidden: true
    }
];

export default new Router({
    routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '/scheduling',
        component: Layout,
        alwaysShow: true,
        name: '排班',
        meta: {
            title: '排班',
            icon: 'nav-arrange',
            roles: ['admin']
        },
        children: [
            {
                path: 'myscheduling',
                component: () => import('@/views/scheduling/MyScheduling'),
                name: '我的排班',
                meta: {
                    title: '我的排班',
                    roles: ['admin']
                }
            },
            {
                path: 'schedulingmanage',
                component: () => import('@/views/scheduling/SchedulingManage'),
                name: '排班管理',
                meta: {
                    title: '排班管理',
                    roles: ['admin']
                },
            },
            {
                path: 'edit/:id(\\d+)',
                component: () => import('@/views/scheduling/SchedulingEdit'),
                name: '排班编辑',
                meta: {
                    title: '排班管理',
                    roles: ['admin']
                },
                hidden: true
            }
        ]
    },
    {
        path: '/attendance',
        component: Layout,
        alwaysShow: true,
        name: '考勤',
        meta: {
            title: '考勤',
            icon: 'nav-attendance',
            roles: ['admin', 'editor']
        },
         children: [
            {
                path: 'myattendance',
                component: () => import('@/views/attendance/MyAttendance'),
                name: '我的考勤',
                meta: {
                    title: '我的考勤',
                    roles: ['admin']
                }
            },
            {
                path: 'myleave',
                component: () => import('@/views/attendance/MyLeave'),
                name: '我的请假',
                meta: {
                    title: '我的请假',
                    roles: ['admin']
                }
            },
            {
                path: 'myovertimework',
                component: () => import('@/views/attendance/MyOvertimeWork'),
                name: '我的加班',
                meta: {
                    title: '我的加班',
                    roles: ['admin']
                }
            },
            {
                path: 'attendancemanagement',
                component: () => import('@/views/attendance/AttendanceManagement'),
                name: '考勤管理',
                meta: {
                    title: '考勤管理',
                    roles: ['admin']
                }
            },
            {
                path: 'leavemanagement',
                component: () => import('@/views/attendance/LeaveManagement'),
                name: '请假管理',
                meta: {
                    title: '请假管理',
                    roles: ['admin']
                }
            },
            {
                path: 'overtimemanagement',
                component: () => import('@/views/attendance/OvertimeManagement'),
                name: '加班管理',
                meta: {
                    title: '加班管理',
                    roles: ['admin']
                }
            },
            {
                //待确定是哪个页面
                path:'overtimeap',
                component: () => import('@/views/attendance/OvertimeAp'),
                name: '加班安排',
                meta: {
                    title: '加班管理',
                    roles: ['admin']
                },
                hidden: true
            }

        ]
    },
    {
        path: '/manage',
        component: Layout,
        alwaysShow: true,
        name: '人员管理',
        meta: {
            title: '人员管理 ',
            icon: 'nav-personnelmana',
            roles: ['admin', 'editor']
        },
        children: [
            {
                path: 'personnelmanage',
                component: () => import('@/views/manage/Manage'),
                name: '人员管理首页',
                meta: {
                    title: '人员管理',
                    roles: ['admin']
                }
            },
            {
                path: 'transfer',
                component: () => import('@/views/manage/PersonnelTransfer'),
                name: '人员调出管理',
                meta: {
                    title: '人员调出管理',
                    roles: ['admin']
                }
            },
            {
                path: 'staffing',
                component: () => import('@/views/manage/PersonnelStaffing'),
                name: '人员调入管理',
                meta: {
                    title: '人员调入管理',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/system',
        component: Layout,
        alwaysShow: true,
        name: '系统管理',
        meta: {
            title: '系统管理',
            icon: 'nav-system',
            roles: ['admin', 'editor']
        },
        children: [
            {
                path: 'editorg/:id(\\d+)',
                component: () => import('@/views/system/organization/Quotaedit.vue'),
                name:'指标配置',
                meta: {
                    title: '组织机构管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {
                path: 'add/:id(\\d+)',
                component: () => import('@/views/system/user/Add.vue'),
                name: '新增人员',
                meta: {
                    title: '用户管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {
                path: 'edit/:id(\\d+)',
                component: () => import('@/views/system/user/Edit.vue'),
                name: '详情编辑',
                meta: {
                    title: '用户管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {
                path: 'view/:id(\\d+)',
                component: () => import('@/views/system/user/Add.vue'),
                name: '详情查看',
                meta: {
                    title: '用户管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {
                path: 'jurisdiction/:id(\\d+)',
                component: () => import('@/views/system/permission/Jurisdiction.vue'),
                name: '权限编辑',
                meta: {
                    title: '系统管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {
                path: 'indicators/:add',
                component: () => import('@/views/system/targetmanage/NewTarget.vue'),
                name: '新增指标',
                meta: {
                    title: '指标管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {
                path: 'editIndicators/:id(\\d+)',
                component: () => import('@/views/system/Targetmanage/EditTarget.vue'),
                name: '编辑指标',
                meta: {
                    title: '指标管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {
                path: 'viewIndicators/:id(\\d+)',
                component: () => import('@/views/system/Targetmanage/SeeTarget.vue'),
                name: '查看指标',
                meta: {
                    title: '指标管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {path: 'organization', component: () => import('@/views/system/organization/Organization.vue'), name:'组织机构管理', meta: {title:'组织机构管理', roles: ['admin']}},
            {path: 'user', component: () => import('@/views/system/user/User.vue'), name:'用户管理', meta: {title:'用户管理', roles: ['admin']}},
            {path: 'permission', component: () => import('@/views/system/permission/Permission.vue'), name:'角色权限管理', meta: {title:'角色权限管理', roles: ['admin']}},
            {path: 'classes', component: () => import('@/views/system/classes/Classes.vue'), name:'班次管理', meta: {title:'班次管理', roles: ['admin']}},
            {path: 'indicatorsmanage', component: () => import('@/views/system/indicators/indicatorManage.vue'), name:'指标管理', meta: {title:'指标管理', roles: ['admin']},hidden: true},
            {path: 'indicatorstypemanage', component: () => import('@/views/system/indicators/indicatorTypeManage.vue'), name:'指标类型管理', meta: {title:'指标类型管理', roles: ['admin']},hidden: true},
            {path: 'cost', component: () => import('@/views/system/Cost.vue'), name:'成本类型管理', meta: {title:'成本类型管理', roles: ['admin']}, hidden: true},
        ]
    },
    {
        path: '/workassist',
        component: Layout,
        alwaysShow: true,
        name: '工作助手',
        meta: {
            title: '工作助手',
            icon: 'nav-work',
            roles: ['admin', 'editor']
        },
        children: [
            {
                path: 'keyword',
                component: () => import('@/views/workassist/keyword.vue'),
                name: '关键词库管理',
                meta: {
                    title: '关键词库管理',
                    roles: ['admin']
                }
            },
            {
                path: 'addkeyword',
                component: () => import('@/views/workassist/components/Addkeyword'),
                name:'查看关键词',
                meta: {
                    title: '关键词库管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {
                path: 'addclass',
                component: () => import('@/views/workassist/components/addClass'),
                name:'关键词分类管理',
                meta: {
                    title: '关键词库管理',
                    roles: ['admin']
                },
                hidden: true
            },
            {
                path: 'nopass',
                component: () => import('@/views/workassist/nopass.vue'),
                name: '图文不通过说明',
                meta: {
                    title: '图文不通过说明',
                    roles: ['admin']
                }
            },
            {
                path: 'pluginupdate',
                component: () => import('@/views/workassist/pluginupdate.vue'),
                name: '插件更新',
                meta: {
                    title: '插件更新',
                    roles: ['admin']
                }
            }
        ]
    },
    {
        path: '/production',
        component: Layout,
        alwaysShow: true,
        name: '员工审核',
        meta: {
            title: '排班',
            icon: 'nav-production',
            roles: ['admin']
        },
        children: [
            {
                path: 'audit/',
                component: () => import('@/views/production/audit'),
                name: '员工审核2',
                meta: {
                    title: '我的排班',
                    roles: ['admin']
                }
            },
            {
                path: 'personnel',
                component: () => import('@/views/production/audit/personnel'),
                name: '员工审核3',
                meta: {
                    title: '我的排班',
                    roles: ['admin']
                }
            },
            {
                path: 'director',
                component: () => import('@/views/production/audit/director'),
                name: '员工审核3',
                meta: {
                    title: '我的排班',
                    roles: ['admin']
                }
            }
        ],
        hidden: true
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
];

// export default new Router({
//     // mode: 'history',
//     routes: asyncRouterMap
// })
