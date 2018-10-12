<template>
    <section class="overtimeap">
        <div>
            <el-form ref="form" :model="form" :rules="rules2">
                    <div class="itme_box">
                        <el-form-item label="加班日期：" prop="day" >
                        <!-- <span class="demonstration">加班日期：</span> -->
                        <el-date-picker
                            v-model="form.day"
                            type="date"
                            :picker-options="{start: '00:00',step: '00:01',end: '00:00'}"
                            placeholder="选择日期">
                        </el-date-picker>
                        </el-form-item>
                    </div>
        
                    <div class="itme_box">
                        <el-form-item label="申请时间：" prop="timeOne"  style="display:inline-block ">
                            <!-- <span class="demonstration">申请时间：</span> -->
                            <el-time-select
                                @blur="chengeOvertime"
                                placeholder="起始时间"
                                v-model="form.timeOne"
                                :picker-options="{
                                start: '00:00',
                                step: '01:00',
                                end: '23:00'
                                }">
                            </el-time-select>
                        </el-form-item>
                        
                        <el-form-item label="" prop="timeTwo"  style="display:inline-block ">
                            <el-time-select
                            @blur="chengeOvertime"
                            placeholder="结束时间"
                            v-model="form.timeTwo"
                            :picker-options="{
                            start: '00:00',
                            step: '01:00',
                            end: '23:00',
                            minTime: form.timeOne
                            }">
                            </el-time-select>
                        </el-form-item>
                        
                    </div>
                    <div class="itme_box">
                        <span class="demonstration" style="font-size: 14px;color: #606266;">时长：</span><span class="time">{{duration}} </span>
                    </div>
                    <div class="itme_box">
                        <el-form-item label="小组：" prop="groupId" >
                            <!-- <span class="demonstration">小组：</span> -->
                              <el-select v-model="form.groupId" placeholder="请选择" >
                                  <el-option
                                  v-for="item in groupData"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                              </el-option>
                            </el-select>
                        </el-form-item>
                            
                    </div>
                    <div class="itme_box">
                        <el-form-item label="班次：" prop="shiftId" >
                            <!-- <span class="demonstration">班次：</span> -->
                              <el-select v-model="form.shiftId" placeholder="请选择" >
                                  <el-option
                                  v-for="item in shiftData"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                              </el-option>
                            </el-select>
                        </el-form-item>
                            
                    </div>
                    <div class="itme_box clearfix" style="height: auto;min-height: 40px;position: relative;">
                        <span class="demonstration" style="font-size: 14px;color: #606266;">人员：</span>
                        <div class="myselect" @click="myselect">
                            <span class="maselect_span" v-for="(value,key) in mySelectmsg" :key="key"><span style="padding-right: 10px;">        {{value}}</span><i @click.stop="delect(key)" class="el-icon-error"></i></span>
                        </div>
                        <div></div>
                    </div>
                    <div class="itme_box" style="position: relative;">
                        <span class="error" :class="{none:isActive=='ok'}" v-if="myselectN">内容不能为空！</span>
                        <el-form-item label="手机：" prop="phone" >
                            <!-- <span class="demonstration">手机：</span> -->
                            <el-input
                            placeholder="请输入内容"
                            v-model="form.phone"
                            clearable>
                            </el-input>
                        </el-form-item>
 
                    </div>
                    <div class="itme_box" style="height: auto; width: 100%" >
                        <el-form-item label="加班事由：" prop="overtimeReason" >
                            <!-- <span class="demonstration">加班事由：</span> -->
                            <el-input
                            :autosize="{ minRows: 8, maxRows: 10}"
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model.trim="form.overtimeReason">
                            </el-input>
                        </el-form-item>
                        
                    </div>
            </el-form>
        </div>
        <div style="width: 211px;margin: 0 auto;margin-top: 20px;margin-bottom:20px;">
            <el-button type="success" @click="submitForm('form')">保存</el-button>
            <el-button type="info" @click="goBack">取消</el-button>
        </div>
        <!-- 人员选择弹窗 -->
        <div>
            <el-dialog class="qjdialog"title="请假" :visible.sync="dialogFormVisible">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
                <div slot="footer" class="dialog-footer center">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 人员选择弹窗 -->
    </section>
</template>
<script>
    /*let cityOptions = ['上海', '北京', '广州', '深圳'];*/
    import { groupData,findShiftByOrgId,getUserByShiftId,applyOverTime } from '@/api/attendance/Attendance'
    import { validatePhone } from '@/utils/validate/validate'
    import comm from '@/utils/comm'
    import commdate from '@/utils/commdate'
    import TempCache from "@/utils/tempcache";
    export default {
        data(){
            var validateday = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('内容不能为空！'));
                }else{
                    callback();
                }
            };
            var validatetimeOne = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('内容不能为空！'));
                }else{
                    callback();
                }
            };
            var validatetimeTwo = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('内容不能为空！'));
                }else{
                    callback();
                }
            };
            var validategroupId = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('内容不能为空！'));
                }else{
                    callback();
                }
            };
            var validateshiftId = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('内容不能为空！'));
                }else{
                    callback();
                }
            };
            var validatephone = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('内容不能为空！'));
                }else if(!validatePhone(value)){
                    return callback(new Error('手机号码格式错误！'));
                }else{
                     callback();
                }
            };
            var validateovertimeReason = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('内容不能为空！'));
                }else{
                    callback();
                }
            };
            return {
                rules2: {
                    day: [
                        { validator: validateday, trigger: 'blur' }
                    ],
                    timeOne: [
                        { validator: validatetimeOne, trigger: 'blur' }
                    ],
                    timeTwo: [
                        { validator: validatetimeTwo, trigger: 'blur' }
                    ],
                    groupId: [
                        { validator: validategroupId, trigger: 'change' }
                    ],
                    shiftId: [
                        { validator: validateshiftId, trigger: 'change' }
                    ],
                    phone: [
                        { validator: validatephone, trigger: 'blur' }
                    ],
                    overtimeReason: [
                        { validator: validateovertimeReason, trigger: 'blur' }
                    ],
                },
                form: {
                    day:'',//加班日期
                    timeOne:'',//开始时间
                    timeTwo:'',//结束时间
                    groupId:'',//小组id
                    shiftId:'',//班次id。这个是页面上的班次下拉框的value
                    phone:'',
                    overtimeReason:'',//加班事由
                },
                dialogFormVisible:false,
                checkAll: false,
                checkedCities: [],
                cities: [],
                isIndeterminate: true,
                isActive:'',
                
                mySelectmsg:[],//人员box数据
                myselectN:false,
                shiftData:[],//班次数据
                
                groupData:[],//小组数据
                
                value1: '',
                
                remarkOne:'',//人员id，分隔
                duration:'',//时长
                shiftsId:'',//班次。这个是保存所又内容的班次id
                phone:'',//手机号
                tempData:[],//保存请求回来的人员列表对象！重要，最后提交的时候需要他做配比
            }
        },
        components:{
 
        },
        methods:{
            submitForm(formName) {
                this.isActive = '';
                console.log('valid run')
                this.$refs[formName].validate((valid) => {
                  if (valid && this.mySelectmsg.length) {
                    this.save();
                } else {
                    this.myselectN = true;
                    return false;
                }
            });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.cities : [];
                this.isIndeterminate = false;
                var newArr = this.copyArr(this.checkedCities);
                this.mySelectmsg = newArr;
                console.log(this.mySelectmsg,'hahhahahaahha')
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                var newArr = this.copyArr(this.checkedCities);
                this.mySelectmsg = newArr;
                console.log(this.mySelectmsg,'hahhahahaahha')
            },
            delect(index){
                var newArr = this.copyArr(this.mySelectmsg);
                newArr.splice(index,1);
                this.mySelectmsg = newArr;
 
            },
            copyArr(arr){
                return arr.slice(0);
            },
            myselect(){
                if(!this.cities.length){
                    comm.warnRemid(this,'请先选择小组和班次！')
                }else{
                    this.dialogFormVisible = true;
                }
 
            },
            timeString(obj){
                if(obj){
                    return obj.getFullYear()+'-'+this.numberTostr(Number(obj.getMonth() + 1))+'-'+this.numberTostr(obj.getDate());
                }else{
                    return '';
                }
 
            },
            numberTostr(n){
                //queryDate参数处理，例如将2018-5-8处理成2018-05-08；否则后台报错！
                if(n < 10){
                    return '0'+n;
                }else{
                    return n;
                }
 
			},
			remarkOneStr(){
				console.log(this.tempData,'1234');
				console.log(this.mySelectmsg,'5678');
				var id ='';
				this.mySelectmsg.forEach((item,index)=>{
					
					for(var objitem in this.tempData){
						console.log(objitem)
						if(item === this.tempData[objitem].realname){
							id+= this.tempData[objitem].id+',';
						}
					}
				})
				return id;
			},
            save(){
				
                var data ={
                    day:this.timeString(this.form.day),
                    timeOne:this.form.timeOne,
                    timeTwo: this.form.timeTwo,
                    duration :this.duration,
                    groupId:this.form.groupId,
                    shiftsId:this.form.shiftId,
                    remarkOne:this.remarkOneStr(),
                    phone:this.form.phone,
                    overtimeReason:this.form.overtimeReason,
 
                }
                applyOverTime(data).then(response => {
                    if(response && response.data){
                        console.log(data,'提交保存');
                        comm.successRemid(this,'保存成功！');
                        this.resetForm('form');
                        this.mySelectmsg =[];
                        this.myselectN = false;
                        this.isActive = 'ok';
                        this.duration = '';
                        this.$router.push({path: `/attendance/overtimemanagement`})
                    }
            }).catch(error => {
                    console.log(error, 222)
            })
            },
            goBack(){
                this.resetForm('form');
                this.mySelectmsg =[];
                this.myselectN = false;
                this.isActive = 'ok';
                this.duration = '';
                this.$router.push({path: `/attendance/overtimemanagement`})
            },
            chengeOvertime() {
                if (this.form.timeOne && this.form.timeTwo) {
                    var e = commdate.getTimeObj(this.form.timeTwo)
                    var s = commdate.getTimeObj(this.form.timeOne)
                    var overhour = e - s;
                    var h = parseInt(
                        (overhour % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                        );
                    this.duration = h + "小时";
                }
            },
        },
        watch:{
            "form.groupId"(val){
                findShiftByOrgId({orgId:val}).then(response => {
 
                if(response && response.data.data && response.data.data.length){
                    console.log(response,'班次班次bbbbbbbbbbbbbbbbbbbb')
                     this.shiftData = response.data.data;
                }
            }).catch(error => {
                    console.log(error, 222)
            })
            },
            "form.shiftId"(val){
                getUserByShiftId({id:val}).then(response => {
 
                if(response && response.data.data && response.data.data.length){
                    console.log(response.data.data,'人员列表')
                    this.cities = ((data) =>{
                        var newArr = [];
                        data.forEach((item ,index) => {
                            newArr.push(item.realname)
                        })
                        return newArr;
                    })(response.data.data)
                    console.log(this.cities,'处理后的人员列表');
                    this.tempData = response.data.data;//保存请求回来的人员列表数据
                }
            }).catch(error => {
                    console.log(error, 222)
            })
            },
            mySelectmsg(val){
                if(!val.length){
                    this.myselectN = true;
                }else{
                    this.myselectN = false;
                }
            },
        },
        mounted(){
            groupData({type:3}).then(response => {
                if(response && response.data && response.data.data.length){
                     this.groupData = response.data.data;
                }
            }).catch(error => {
                console.log(error, 222)
            });
            this.form.phone = TempCache.getItem('userInfo').phone;
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.overtimeap{
    .el-form-item__content {
        line-height: 40px;
        position: relative;
        font-size: 14px;
        float: left;
    }
    .el-form-item__label {
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
           width: 200px;
    }
    .el-textarea__inner{
        width: 650px;
    }
}
 
</style>
<style scoped>
.none {
    display: none;
}
.error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    left: 100px;
    top: -19px;
}
.center {
    text-align: center;
}
.time {
    line-height: 31px;
}
.clearfix {
    content: ".";
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
}
/* myselect */
.maselect_span{
    display: inline-block;
    padding: 3px 3px 3px 3px;
    height: 14px;
    font-size: 14px;
    line-height: 14px;
    margin-right: 3px;
    background-color: #f0f2f5;
    border-radius: 1px;
    color: #909399;
}
 
.myselect {
    width: 200px;
    min-height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    float: left;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 10px;
    color: #bfc2ca;
    font-size: 14px;
    margin-left: 10px;
}
/* myselect */
.itme_box {
    margin-bottom: 20px;
    margin-top: 20px;
    height: 40px;
}
.overtimeap {
    border: 1px solid #E9F1F3;
    box-sizing: border-box;
}
.demonstration {
    font-size: 14px;
    padding-left: 20px;
    display: block;
    float: left;
    width: 70px;
    text-align: right;
    height: 34px;
    line-height: 34px;
}
</style>