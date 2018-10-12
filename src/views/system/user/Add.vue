<template>
    <section>
        <p class="crumbs"><span @click="backup">{{crumbs}} > </span><span v-if="!isEdit">新增用户</span><span v-if="isEdit">用户查看</span></p>
        <section class="system-user-add">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" :rules="rules" v-if="radios.length">

                <el-form-item label="角色" class="role" prop="roleId">
                    <el-checkbox-group v-model="ruleForm.roleId">
                        <el-checkbox v-for="(val,index) in radios" :key="index" :label="val.id" :disabled="isEdit" @change="changeCheck(val.id)">{{val.name}}</el-checkbox><!-- @change="changeCheck(val.id)" -->
                    </el-checkbox-group>
                </el-form-item>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="realname">
                            <el-input v-model="ruleForm.realname" :disabled="isEdit" ></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model="ruleForm.phone" :disabled="isEdit" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="实习生" class="multiple" prop="isNature">
                            <el-select v-model="ruleForm.isNature" placeholder="请选择" :disabled="isEdit">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="项目" class="multiple" prop="projectId">
                            <el-select v-model="ruleForm.projectId" placeholder="请选择" multiple  @remove-tag="deletedProject" :disabled="isEdit || editProject">
                                <el-option v-for="(val,index) in projectOptions" :key="index" :label="val.name" :value="val.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="参加工作年限" prop="remarkOne" class="year">
                            <el-input v-model="ruleForm.remarkOne" maxlength="4" id="year" :disabled="isEdit"></el-input>
                            <span>年</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="工号" prop="username">
                            <el-input v-model.number="ruleForm.username" :disabled="isEdit" id="number"></el-input>
                        </el-form-item>

                        <el-form-item label="性别"  class="multiple" prop="gender">
                            <el-select v-model="ruleForm.gender" placeholder="请选择" :disabled="isEdit">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="0"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="办公地点" class="multiple" prop="officeLocation">
                            <el-select v-model="ruleForm.officeLocation" placeholder="请选择" filterable :disabled="isEdit">
                                <el-option babel="请选择" value="请选择"></el-option>
                                <el-option-group
                                    v-for="group in addressOptions"
                                    :key="group.CitySort"
                                    :label="group.name">
                                    <el-option
                                        v-for="item in group.options"
                                        :key="item.CitySort"
                                        :label="item.name"
                                        :value="item.name">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="小组"  class="multiple" prop="groupId">
                            <el-select v-model="ruleForm.groupId" placeholder="请选择" multiple :disabled="isEdit || editProject || editGroup ||editAssistant">
                                <el-option v-for="(val,index) in groupOptions" :key="index" :label="val.name" :value="val.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="ruleForm.email" :disabled="isEdit"></el-input>
                        </el-form-item>
                        <el-form-item label="排班状态"  class="multiple" prop="schedulingTraining">
                            <el-select v-model="ruleForm.schedulingTraining" placeholder="请选择" :disabled="isEdit">
                                <el-option label="参与排班" value="1"></el-option>
                                <el-option label="培训期" value="0"></el-option>
                                <el-option label="其他" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="生日" class="birthday"  prop="birthdays">
                            <el-col :span="12" style="padding:0">
                                <el-date-picker
                                    type="date"
                                    placeholder=""
                                    v-model="ruleForm.birthdays"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                                    placeholder="请选择"
                                    :disabled="isEdit">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="入职日期" class="birthday"  prop="entryTimes">
                            <el-col :span="12" style="padding:0">
                                <el-date-picker
                                    type="date"
                                    placeholder=""
                                    v-model="ruleForm.entryTimes"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                                    placeholder="请选择"
                                    :disabled="isEdit">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item class="stateBtn" v-if="!isEdit">
                    <el-button class="save" type="primary" @click="validator()">保存</el-button>
                    <el-button class="cancel" @click="backup">取消</el-button>
                </el-form-item>
                <el-form-item class="stateBtn" v-if="isEdit">
                    <el-button type="primary"  @click="backup">返回</el-button>
                </el-form-item>
            </el-form>
        </section>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/8/3
     * @desc [用户新增] 页面
     * @module 组件引用位置
     */

    import { requestRole,requestAllProject,requestFindGroup,requestValidate,requestSubmit,requestListDetails } from '@/api/system/user'
    import {
        checkRole,
        checkUsername,
        checkJobNumber,
        checkEmail,
        checkPhone,
        checkGender,
        checkScheduling,
        checkIsNature,
        checkOfficeLocation,
        checkBirthdays,
        checkProjectId,
        checkGroupId,
        checkoutProject,
        checkoutGroup,
        checkoutDate,
        checkoutYear
    } from '@/utils/validate/addUserValidate'
    import axios from 'axios'
    import comm from '@/utils/comm'
    import { mapGetters,mapActions } from 'vuex'

    export default {
        name: "Add",
        data() {
            return {
                lId:this.$route.params.id,
                isEdit:false,
                ruleForm: {
                    roleId: [],
                    realname: '',
                    phone: '',
                    isNature: '',
                    username: '',
                    gender: '',
                    email: '',
                    schedulingTraining: '',
                    birthdays: '',
                    officeLocation: '',
                    entryId:'',
                    groupId:[],
                    projectId:[],
                    entryTimes:'',
                    remarkOne:''
                },
                rules: {
                    roleId: [
                        { validator: checkRole, trigger: 'change' }
                    ],
                    realname: [
                        { validator: checkUsername, trigger: 'blur' }
                    ],
                    username:[
                        { validator: checkJobNumber, trigger: 'blur' }
                    ],
                    email: [
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                    phone: [
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    gender: [
                        { validator: checkGender, trigger: 'change' }
                    ],
                    schedulingTraining: [
                        { validator: checkScheduling, trigger: 'change' }
                    ],
                    isNature: [
                        { validator: checkIsNature, trigger: 'change' }
                    ],
                    officeLocation: [
                        { validator: checkOfficeLocation, trigger: 'change' }
                    ],
                    birthdays: [
                        { validator: checkBirthdays, trigger: 'blur' }
                    ],
                    projectId: [
                        { validator: checkProjectId, trigger: 'change' }
                    ],
                    groupId: [
                        { validator: checkGroupId, trigger: 'change' }
                    ],
                    entryTimes: [
                        { validator: checkoutDate, trigger: 'blur' }
                    ],
                    remarkOne: [
                        { validator: checkoutYear, trigger: 'blur' }
                    ]
                },
                radios:[],
                projectOptions: [],
                groupOptions: [],
                addressOptions:[],
                editProject:false,
                editGroup:false,
                editAssistant:false,
                crumbs:'用户管理',
                flag:1
            }
        },
        methods: {
            //查看详情返回来源页
            backup(){
                window.history.go(-1);
            },
            //勾选角色管理员、PM取消和删除验证
            changeCheck(val){
                switch(val){
                    case 1:
                        if(this.editProject){ //被选中状态
                            this.rules.projectId[0].validator = checkProjectId;
                            this.rules.groupId[0].validator = checkGroupId;
                            this.editProject = false
                        }else{
                            this.rules.projectId[0].validator = checkoutProject;
                            this.rules.groupId[0].validator = checkoutGroup;
                            this.ruleForm.groupId = [];
                            this.ruleForm.projectId = [];
                            this.editProject = true
                        }
                        break;
                    case 2:
                        if(this.editAssistant){
                            this.editGroup = !this.editGroup;
                        }else{
                            if(this.editGroup){
                                this.rules.groupId[0].validator = checkGroupId;
                                this.editGroup = false;
                            }else{
                                this.rules.groupId[0].validator = checkoutGroup;
                                this.ruleForm.groupId = [];
                                this.editGroup = true;
                            }
                        }
                        break;
                    case 3:
                        if(this.editGroup){
                            this.editAssistant = !this.editAssistant;
                        }else{
                            if(this.editAssistant){
                                this.rules.groupId[0].validator = checkGroupId;
                                this.editAssistant = false;
                            }else{
                                this.rules.groupId[0].validator = checkoutGroup;
                                this.ruleForm.groupId = [];
                                this.editAssistant = true;
                            }
                        }
                        break;
                }
            },
            //删除项目，以及连带对应的小组
            deletedProject(val) {
                let group = this.ruleForm.groupId;
                this.groupOptions.map((v, i) => {
                    if (v.parentId == val) {
                        if (group.indexOf(v.id) != -1) {
                            group.splice(group.indexOf(v.id), 1)
                        }
                    }
                })
            },
            //保存之后先走验证
            validator(){
                if(this.flag == 1){
                    this.flag = 2;
                    if(!this.isEdit){
                        if(this.editProject){
                            this.rules.projectId[0].validator = checkoutProject;
                            this.rules.groupId[0].validator = checkoutGroup;
                            this.ruleForm.groupId = [];
                            this.ruleForm.projectId = [];
                        }
                        if(this.editGroup && !this.editProject){
                            this.rules.groupId[0].validator = checkoutGroup;
                            this.ruleForm.groupId = [];
                        }
                        requestValidate({username:this.ruleForm.username}).then(res=>{
                            if(res && res.data && res.data.data.length!=0) {
                                this.flag = 1;
                                comm.warnRemid(this,'该工号已存在！');
                                document.getElementById('number').focus();
                            }else{
                                this.saveDate();
                            }
                        })
                    }
                }
            },
            saveDate() {
                //项目ID和选中的项目ID去重之后对比，其实这里就已经可以满足需求了，但是需求还必须找出没有选择小组对应的项目
                // function cmpare() {
                //     for(var i = 0; i < arguments.length; i++) {
                //         return arguments[i].toString() == arguments[i + 1] ? true : false;
                //     }
                // }
                let resultarr =[];
                let str = '';
                if(!this.editProject || !this.editGroup || !this.editAssistant){
                    let selectGroupParentId = [];
                    //获取小组所有内容{}，判断选中小组ID和全部小组ID相等 == 我们取出项目ID（有重复）
                    this.groupOptions.map((value,index)=>{
                        this.ruleForm.groupId.map((val,inx)=>{
                            if(val==value.id){
                                selectGroupParentId.push(value.parentId)
                            }
                        })
                    });

                    //console.log(selectGroupParentId,'有重复111');
                    //项目ID去重复
                    resultarr = [...new Set(selectGroupParentId)];
                    //console.log(resultarr,'无重复000');

                    //获取选中项目的内容{}
                    let selectProject = [];
                    this.projectOptions.map((val,ind)=>{
                        this.ruleForm.projectId.map((v,i)=>{
                            if(v==val.id){
                                selectProject.push(val)
                            }
                        });
                    });

                    //console.log(selectProject,'选中项目的内容')
                    //console.log(resultarr,'选中小组的项目ID')

                    selectProject.map((v,i)=>{
                        if(!resultarr.includes(v.id)){
                            str += v.name+'，'
                        }
                    });
                    //console.log(str);
                }

                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let list = this.ruleForm;
                        let subData = Object.assign({},list);
                        subData.roleId = subData.roleId.toString();
                        subData.groupId =  subData.groupId.toString();
                        subData.email =  subData.email.toLowerCase();
                        if(this.editProject || this.editGroup || this.editAssistant){
                            requestSubmit(subData).then(res=>{
                                if(res && res.data && res.data.data){
                                    this.backup();
                                }
                            })
                        }else{
                            if(!str){
                                requestSubmit(subData).then(res=>{
                                    if(res && res.data && res.data.data){
                                        this.backup();
                                    }
                                })
                            }else{
                                this.flag = 1;
                                comm.warnRemid(this,`您所选的${str}未选择小组，请将小组补充完善或删掉项目`);
                            }
                        }
                    } else {
                        console.log('error submit!!');
                        this.flag = 1
                        return false;
                    }
                });
            },
            //获取全选列表
            roleList(){
                requestRole().then(res=>{
                    if(res && res.data && res.data.data){
                        this.radios = res.data.data;
                    }
                })
            },
            //请求项目列表
            projectList(){
                requestAllProject({name:'项目'}).then(res=>{
                    if(res && res.data){
                        //该接口和其他项目列表接口不能一致，搜索的是全部
                        this.projectOptions = res.data.data;
                        //此处处理不得当，还未发现更好解决方案lindong
                    }
                })
            },
            //请求小组列表
            findGroup(data){
                requestFindGroup({entryId:data}).then(res=>{
                    if(res && res.data){
                        this.groupOptions = res.data.data
                    }
                })
            },
            //编辑状态请求数据列表
            requestList(){
                requestListDetails({id:this.lId}).then((res)=>{
                    if(res && res.data && res.data.data){
                        let newData = res.data.data;
                        if(newData.roleId){
                            newData.roleId = newData.roleId.split(',').map((data)=>{
                                if(data==1){
                                    this.editProject = true;
                                }else if(data==2){
                                    this.editGroup = true;
                                }else if(data==3){
                                    this.editAssistant = true;
                                }
                                return +data
                            });
                        }else{
                            newData.roleId = []
                        }

                        if(newData.entryId){
                            newData.entryId = newData.entryId.split(',').map((data)=>{return +data});
                        }else{
                            newData.entryId = []
                        }

                        if(newData.groupId){
                            newData.groupId = newData.groupId.split(',').map(function(data){return +data});
                        }else{
                            newData.groupId = []
                        }

                        this.ruleForm = {
                            roleId:newData.roleId,
                            realname:newData.realname,
                            phone:newData.phone,
                            isNature: newData.isNature,
                            username: newData.username,
                            gender: newData.gender,
                            email: newData.email,
                            schedulingTraining: newData.schedulingTraining,
                            birthdays: newData.birthday,
                            officeLocation: newData.officeLocation,
                            projectId:newData.entryId,
                            groupId: newData.groupId,
                            remarkOne:newData.remarkOne,
                            entryTimes:newData.entryTime
                        };
                        if(newData.roleId){
                            this.ruleForm.roleId = newData.roleId;
                        }else{
                            this.ruleForm.roleId = []
                        }
                        if(newData.schedulingTraining){
                            this.ruleForm.schedulingTraining = newData.schedulingTraining;
                        }else{
                            this.ruleForm.schedulingTraining = []
                        }
                    }
                });
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm =>{
                vm.crumbs = from.name;
            })
        },
        mounted(){
            axios({
//              url: 'http://idsc-page.biztest.top/static/city.json',
                // url: 'http://localhost:8080/static/city.json',
                url:'http://111.231.219.81:8089/static/city.json',
                methods:'post'
            }).then(res=>{
                if(res && res.data){
                    this.addressOptions = res.data;
                }
            });

            this.roleList();
            this.projectList();

            if(/view/.test(this.$route.fullPath)){
                this.isEdit = true;
                this.requestList();
            }
        },
        watch:{
            "ruleForm.projectId"(val){
                this.ruleForm.entryId = val.toString();
                this.findGroup(val.toString())
            }
        }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .system-user-add{
        border:1px solid #E9F1F3;
        padding:20px;
        //角色管理
        .role{
            .el-form-item__content{
                width:85%;
                .el-radio-group{
                    .el-radio{
                        margin:0px;
                        margin:12px;
                    }
                }
            }
        }
        //保存，取消按钮
        .stateBtn{
            text-align: center;
            width:100%;
            .el-button{
                margin:15px;
                border:0;
                color:#fff;
            }
            .save{
                background: #55CE63;
            }
            .cancel{
                background: #92A6B1;
            }
        }
    }

</style>

<style rel="stylesheet/scss" lang="scss">
    //elementui reset
    .system-user-add{
        /*新增人员多选框样式长度*/
        .multiple{
            .el-form-item__content{
                .el-select{
                    width:231px;
                }
            }
        }
        //生日图标
        .birthday{
            .el-form-item__content{
                .el-col-12 {
                    width: 100%;
                }
                .el-input__prefix{
                    left:200px;

                }
                .el-input__inner{
                    padding-left:15px;
                }
                .el-input__suffix{
                    .el-icon-circle-close{
                        display: none;
                    }
                }
            }
        }
        .role{
            .el-form-item__content{
                .el-checkbox{
                    margin:0px;
                    margin-right:30px;
                    width: 141px;
                    height:20px;
                }
            }
        }
        .year{
            .el-form-item__label{
                width: 56px !important;
                line-height: 16px;
                margin-left:44px;
                margin-top:4px;
            }
            .el-form-item__content{
                .el-input{
                    width:86%;
                    margin-right:6px;
                }
                span{
                    color:#606266;
                }
            }
        }
    }
</style>
