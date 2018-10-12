/**
 * @author Lindong Ding
 * @date 2018/8/17
 * @desc 系统管理->用户管理->离职弹框/调出弹框 必填验证
 */

//离职弹框
export let checkDate = (rule,value,callback) => {
    if(!value){
        return callback(new Error('时间不能为空!'));
    }else{
        callback();
    }
};

export let checkType = (rule,value,callback) => {
    if(!value){
        return callback(new Error('类型不能为空!'));
    }else{
        callback();
    }
};

export let checkCause = (rule,value,callback) => {
    if(!value){
        return callback(new Error('流失原因不能为空!'));
    }else{
        callback();
    }
};

export let checkCauseNo = (rule,value,callback) => {
    if(!value){
        callback();
    }
};


//调出弹框，使用addUserValidate内项目，小组验证

export let checkMsg = (rule,value,callback) => {
    if(!value){
        return callback(new Error('调出原因不能为空!'));
    }else{
        callback();
    }
};

export let checkProject = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请选择项目!'));
    }else{
        callback();
    }
};

export let checkGroup = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请选择小组!'));
    }else{
        callback();
    }
};


export let checkProjects = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请选择项目!'));
    }else{
        callback();
    }
};

export let checkGroups = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请选择小组!'));
    }else{
        callback();
    }
};
