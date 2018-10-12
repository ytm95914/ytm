import { loginByUsername, logout, getUserInfo,getUserRole } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Tempcache from '@/utils/tempcache'
import { Notification  } from 'element-ui'

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state,name) => {
            state.name = name
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, data) {
        return new Promise((resolve, reject) => {
            loginByUsername(data).then(response => {
                const res = response.data;
                // const token = res.token_type+' '+res.access_token;
                const token = 'Bearer'+' '+res.access_token;
                commit('SET_TOKEN', token);
                commit('SET_NAME',data.username);
                Tempcache.setItem('user',data.username);
                setToken(token);
                Tempcache.setItem('whetherFirstLogin','login');
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo({username:Tempcache.getItem('user')}).then(res => {
            if(res && res.data && res.data.data.length){
                Tempcache.setItem('userInfo',res.data.data[0]);
                Tempcache.setItem('userId',res.data.data[0].id);
                Tempcache.setItem('userName',res.data.data[0].realname);
                resolve(res)
            }else{
                Notification.warning({
                    title:'警告',
                    message:'获取用户信息失败!',
                    duration:2000
                });
                reject('error');
            }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户权限列表
    GetUserRole({commit, state}) {
        return new Promise((resolve, reject) => {
            getUserRole({userName:Tempcache.getItem('user')}).then(res => {
                if(res && res.data && res.data.data && res.data.data && res.data.data.permiss.length){
                    let data = res.data.data;
                    let newRoles = [];
                    Tempcache.setItem('userRole',data);//角色有权限
                    data.permiss.map((value,index)=>{
                        newRoles.push(value.name);
                        if(value.children){
                            value.children.map((v,i)=>{
                                newRoles.push(v.name);
                                Tempcache.setItem(v.name,v.children);
                            });
                        }
                    });
                    commit('SET_ROLES', newRoles);
                    resolve(data)
                }else{
                    Notification.warning({
                        title:'警告',
                        message:'获取用户权限失败!',
                        duration:2000
                    });
                }
            }).catch(error => {
                Notification.warning({
                    title:'警告',
                    message:'获取用户权限失败!',
                    duration:2000
                });
                commit('SET_TOKEN', '');
                removeToken();
                Tempcache.clear();
                reject(error)
            })
        })
    },
    // 登出
    LogOut({ commit }) {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken();
        Tempcache.clear();
        location.reload();
    },
    // 前端 登出
    FedLogOut({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            removeToken();
            Tempcache.clear();
            location.reload();
            resolve()
        })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
