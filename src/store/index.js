/**
 * @author Lindong Ding
 * @date 2018/7/24
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import permission from './modules/permission'
import user from './modules/user'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default new Vuex.Store ({
    modules: {
        permission,
        user
    },
    state,
    getters,
    mutations,
    actions
})
