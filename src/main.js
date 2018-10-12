/**
 * @author Lindong Ding
 * @date 2018/7/24
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import Vue from 'vue'
import App from './App'

//使用router
import router from './router'

//使用vuex
import store from './store'

//引入ElementUI和css样式(如果使用按需引入的方式此处可以注掉)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
//初始化样式
import './styles/base/_normalize.scss'
import '@/styles/comm/transition.scss'

import './icons/index.js'

import './permission'


//使用ElementUI，并且初始化默认值 { size: 'small', zIndex: 3000 }
Vue.use(ElementUI);

Vue.config.productionTip = false;

//Vue.prototype.api = process.env.NODE_ENV === 'production' ? '' : '/api';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
