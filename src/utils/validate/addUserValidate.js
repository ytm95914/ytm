/**
 * @author Lindong Ding
 * @date 2018/8/15
 * @desc 新增用户，验证
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */
import { validateUser,validateEmail,validatePhone,validateNumber } from  './validate'
import { requestValidate } from '@/api/system/user'

export let checkRole = (rule,value,callback) => {
    if(!value.length){
        return callback(new Error('请至少选择一个角色!'));
    }else{
        callback();
    }
};

export let checkUsername = (rule,value,callback) => {
    if(!value){
        return callback(new Error('姓名不能为空!'));
    }else{
        if(value.indexOf(' ')==0 || value.indexOf(' ') ==value.length-1){
            return callback(new Error('姓名首尾不可为空格!'));
        }else{
            if(value.length>20){
                return callback(new Error('不可超过20字符!'));
            }else{
                callback();
            }
        }
    }
};

export let checkJobNumber = (rule,value,callback) => {
    if(!value){
        return callback(new Error('工号不能为空!'));
    }else if(!validateUser(value)){
        return callback(new Error('请输入正确的工号!'));
    }else{
        callback();
    }
};

export let checkEmail  = (rule,value,callback) => {
    if(value){
        if(!validateEmail(value)){
            return callback(new Error('请输入正确的邮箱!'));
        }else{
            if(value.length>50){
                return callback(new Error('不可超过50字符!'));
            }else{
                callback();
            }
        }
    }else{
        callback();
    }
};

export let checkPhone = (rule,value,callback) => {
    if(!value){
        return callback(new Error('电话不能为空!'));
    }else if(!validatePhone(value)){
        return callback(new Error('请输入正确的电话号码!'));
    }else if(value.length<11){
        return callback(new Error('请输入正确的电话号码!'));
    }else{
        callback();
    }
};

export let checkGender = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请选择性别!'));
    }else{
        callback();
    }
};

export let checkScheduling = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请选择排班状态!'));
    }else{
        callback();
    }
};

export let checkIsNature = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请选择是否为是实习生!'));
    }else{
        callback();
    }
};

export let checkOfficeLocation = (rule,value,callback) => {
    callback();
};

export let checkBirthdays = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请选择生日!'));
    }else{
        callback();
    }
};
export let checkProjectId = (rule,value,callback) => {
    if(!value.length){
        return callback(new Error('请选择项目!'));
    }else{
        callback();
    }
};

export let checkoutProject = (rule,value,callback) => {
    callback();
};

export let checkGroupId = (rule,value,callback) => {
    if(!value.length){
        return callback(new Error('请选择小组!'));
    }else{
        callback();
    }
};

export let checkoutGroup = (rule,value,callback) => {
    callback();
};


//添加入职时间验证
export let checkoutDate = (rule,value,callback) => {
    if(!value){
        return callback(new Error('入职时间不能为空!'));
    }else{
        callback();
    }
};

//添加工作年限验证
export let checkoutYear = (rule,value,callback) => {
    if(!value){
        return callback(new Error('工作年限不能为空!'));
    }else if(!validateNumber(value)) {
        if(value.toString().includes('.')){
            if(value.toString().split('.')[1].length>1){
                callback(new Error('小数点后请保留一位小数!'));
            }else{
                callback(new Error('请输入0或正数!'));
            }
        }else{
            callback(new Error('请输入0或正数!'));
        }

    }else{
        callback();
    }
};
