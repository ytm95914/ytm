/**
 * @author Chenxi Liu
 * @date 2018/9/6
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

export let month1 = (rule, value, callback) => {
    if(!value){
        return callback(new Error('请选择月份!'));
    }else{
        callback();
    }
};
