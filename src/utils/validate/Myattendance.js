/**
 * @author shumei Zhao
 * @date 2018/8/17
 * @desc 我的考勤- 请假申请-加班申请
 */
// 时间
export let checkDate = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请选择时间!'));
    }else{
        callback();
    }
};
// 假种
export let checkState = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请假类型不能为空!'));
    }else{
        callback();
    }
};
// 项目
export let checkProject = (rule,value,callback) => {
    if(!value){
        return callback(new Error('项目不能为空!'));
    }else{
        callback();
    }
};
// 项目
export let checkGroup = (rule,value,callback) => {
    if(!value){
        return callback(new Error('小组不能为空!'));
    }else{
        callback();
    }
};
// 手机
export let checkPhone = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('手机号不能为空'));
    } else {
      const reg = /^1(|3|4|5|6|7|8)\d{9}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的手机号'));
      }
    }
  };

// 事由
// export let checkReason = (rule,value,callback) => {
//     if(!value){
//         return callback(new Error('请假事由不能为空!'));
//     }else{
//         callback();
//     }
// };
export let checkReason = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请假事由不能为空!'));
    }else if(value.indexOf(" ") != -1){
        return callback(new Error('请假事由不能为空!'));
    }else{
        callback();
    }
};
// 事由
// export let checkReasonOver = (rule,value,callback) => {
//     if(!value){
//         return callback(new Error('加班事由不能为空!'));
//     }else{
//         callback();
//     }
// };
export let checkReasonOver = (rule,value,callback) => {
    if(!value){
        return callback(new Error('加班事由不能为空!'));
    }else if(value.indexOf(" ") != -1){
        return callback(new Error('加班事由不能为空!'));
    }else{
        callback();
    }
};
// 角色权限管理中新增和编辑角色验证
  export let checkRole = (rule,value,callback) => {
    if(!value){
        return callback(new Error('角色名称不能为空!'));
    }else if(value.indexOf(" ") != -1){
        return callback(new Error('角色名称不能含有空格!'));
    }else{
        callback();
    }
};

// 角色权限管理中新增和编辑角色验证
export let checkRoletype = (rule,value,callback) => {
    if(!value){
        return callback(new Error('角色类型不能为空!'));
    }else{
        callback();
    }
};