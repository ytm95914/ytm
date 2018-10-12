

/**
 * @author Chenxi Liu
 * @date 2018/9/6
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */
export let addlexicon = (rule, value, callback) => {
    if (value != null) {
        let newValue = value.trim();
        if (!newValue) {
            return callback(new Error('请输入词库名称!'));
        } else {
            if(value.length>20){
               return callback(new Error('词库名称长度在20字符内!'));
            }else{
                callback();
            }
        }
    } else {
        return callback(new Error('请输入词库名称!'));
    }
};
export let glxm = (rule, value, callback) => {
    if(!value){
        return callback(new Error('请选择关联项目!'));
    }else{
        callback();
    }
};
export let keyword = (rule, value, callback) => {
    if (value != null) {
        let newValue = value.trim();
        if (!newValue) {
            return callback(new Error('请输入关键词!'));
        } else {
            callback();
        }
    } else {
        return callback(new Error('请输入关键词!'));
    }
};
export let color1 = (rule, value, callback) => {
    if(!value){
        return callback(new Error('请选择背景颜色!'));
    }else{
        callback();
    }
};
export let fontcolor1 = (rule, value, callback) => {
    if(!value){
        return callback(new Error('请选择字体颜色!'));
    }else{
        callback();
    }
};
export let region1 = (rule, value, callback) => {
    if(!value){
        return callback(new Error('请选择关键词分类名称!'));
    }else{
        callback();
    }
};
export let classname = (rule, value, callback) => {
    if (value != null) {
        let newValue = value.trim();
        if (!newValue) {
            return callback(new Error('请输入关键字分类名称!'));
        } else {
            callback();
        }
    } else {
        return callback(new Error('请输入关键字分类名称!'));
    }
};
