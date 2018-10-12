/**
 * @author Chenxi Liu
 * @date 2018/9/13
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */
export let version = (rule, value, callback) => {
    if(!value){
        return callback(new Error('请输入版本号!'));
    }else{
        callback();
    }
};
export let content = (rule, value, callback) => {
    if(!value){
        return callback(new Error('请输入更新内容!'));
    }else{
        callback();
    }
};
