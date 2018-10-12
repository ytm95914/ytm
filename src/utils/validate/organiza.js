/**
 * @author Tianming Yu
 * @date 2018/8/17
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */
export let jigouname = (rule, value, callback) => {
    if (value != null) {
        let newValue = value.trim();
        if (!newValue) {
            return callback(new Error('机构名称不能为空!'));
        } else {
            callback();
        }
    } else {
        return callback(new Error('机构名称不能为空!'));
    }
};
export let numbers = (rule, value, callback) => {
    if(value !=null){
    let num = value.trim();
     var re = /^[1-9]\d*$/;
    if (!num) {   
      return  callback(new Error('KPI目标不能为空!'));
    } else {
        if (!re.test(num)) {
            return callback(new Error('KPI目标请填写正整数!'));
        }else{
            callback();
        }
    }
}else{
    return  callback(new Error('KPI目标不能为空!'));
}

};
export let floats = (rule, value, callback) => {
    if(value !=null){
        let num = value.trim();
        var re = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/;
    if (!num) {   
       return callback(new Error('折算系数不能为空!'));
    } else {
        if (!re.test(num)) {
            return callback(new Error('折算系数必须是正整数或两位小数'));
        }else{
            callback();
        }
    }
}else{
    return callback(new Error('折算系数不能为空!'));  
}

}