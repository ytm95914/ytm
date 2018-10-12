import { asyncRouterMap, constantRouterMap } from '@/router'

function hasPermission(roles, route) {
    if (route.meta && route.meta.title) {
        return roles.some(role => route.meta.title == role)
    }
    return true
}

function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    });
    return accessedRouters
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const {roles} = data;
                let accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
                commit('SET_ROUTERS', accessedRouters);
                resolve()
            })
        }
    }
};

export default permission