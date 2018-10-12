/**
 * @author Lindong Ding
 * @date 2018/8/17
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import { validateUser } from  './validate'

export let checkUsername = (rule,value,callback) => {
    if(!value){
        return callback(new Error('用户名不能为空!'));
    }else if(!validateUser(value) && value!='admin'){
        return callback(new Error('用户名不正确!'));
    }else{
        callback();
    }
};

export let checkPassword = (rule,value,callback) => {
    if(!value){
        return callback(new Error('密码不能为空!'));
    }else{
        callback();
    }
};
