import router from './router'
import { getToken } from '@/utils/auth'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true;
    if (!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/error'];
router.beforeEach((to, from, next) => {
    NProgress.start();
    if(getToken()){
        if(to.path === '/login'){
            next({ path: '/attendance/myattendance' });
            NProgress.done();
        }else{
            if (store.getters.roles.length === 0) {
                Promise.all([store.dispatch('GetUserInfo'), store.dispatch('GetUserRole')]).then((result) => {
                    const roles = store.getters.roles;
                    store.dispatch('GenerateRoutes', { roles }).then(() => {
                        router.addRoutes(store.getters.addRouters);
                        next({ ...to, replace: true })
                    })
                }).catch((error) => {
                    if(from.path !== '/login'){
                        setTimeout(()=>{
                            store.dispatch('FedLogOut').then(() => {
                                console.log('已经退出到登录页面')
                            },3000)
                        })
                    }
                });
            } else {
                if (hasPermission(store.getters.roles, to.meta.title)) {
                    next();
                } else {
                    next({ path: '/401', replace: true});
                }
            }
            window.scrollTo(0,0);
        }
    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login');
        }
    }
});
router.afterEach(() => {
    NProgress.done()
});
