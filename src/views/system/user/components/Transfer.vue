<template>
    <section class="transfer">
        <el-form ref="exportform" :model="exportform" :rules="exportRules">
            <el-form-item label="姓名" :label-width=labelWidth>
                <span style="margin-left:15px">{{formData.realname}}</span>
            </el-form-item>

            <el-form-item label="调出时间" :label-width=labelWidth prop="bringUpTime">
                <el-date-picker
                    v-model="exportform.bringUpTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerBeginDateAfter">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="调出项目" :label-width=labelWidth prop="projectIds" v-if="formData.entry">
                <el-select v-model="exportform.projectIds" placeholder="请选择">
                    <el-option v-for="(val,index) in calloutProjectOptions" :key="index" :label="val.name" :value="val.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调出小组" :label-width=labelWidth prop="groupIds" v-if="formData.group">
                <el-select v-model="exportform.groupIds" placeholder="请选择">
                    <el-option v-for="(val,index) in calloutGroupOptions" :key="index" :label="val.name" :value="val.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调入项目" :label-width=labelWidth prop="projectId" v-if="formData.entry">
                <el-select v-model="exportform.projectId" placeholder="请选择"> <!-- 2018年9月25日修改 @change='projectSel' -->
                    <el-option v-for="(val,index) in projectOptions" :key="index" :label="val.name" :value="val.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调入小组" :label-width=labelWidth prop="groupId" v-if="formData.group">
                <el-select v-model="exportform.groupId" placeholder="请选择"> <!-- 2018年9月25日修改 @change='groupSel' -->
                    <el-option v-for="(val,index) in groupOptions" :key="index" :label="val.name" :value="val.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="调出原因" :label-width=labelWidth prop="remarkOne" class="textarea">
                <el-input type="textarea" v-model="exportform.remarkOne" :rows="3" maxlength="100" placeholder="不得超过100字！"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="saveExport">确 定</el-button>
            <el-button type="info" @click="closeTransfer">取 消</el-button>
        </div>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/8/3
     * @desc [调出] 弹框
     * @module 组件引用位置
     */

    import { requestExport,requestCalloutProject,requestCalloutGroup,requestProject,requestAllProject,requestFindGroup } from '@/api/system/user'

    import {
        checkDate,
        checkMsg,
        checkProject,
        checkProjects,
        checkGroup,
        checkGroups } from '@/utils/validate/userManageValidate'
    import TempCache from '@/utils/tempcache'
    import comm from '@/utils/comm'

    export default {
        name: "Transfer",
        props: {
            //获取点击过来的用户信息
            formData:{
                type: Object,
                default: {}
            },
            //用户ID
            userId:{
                type: Number,
                default: 66
            },
            dialogState:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                exportform:{
                    bringUpTime: '',
                    endOrgId: '',
                    startOrgId:'', //调出小组ID
                    remarkOne:'',
                    projectId:'',
                    projectIds:'',
                    groupId:'',
                    groupIds:'',
                    userId:this.userId
                },
                exportRules: {
                    bringUpTime: [
                        { validator: checkDate, trigger: 'blur' },
                        { trigger: 'change' }
                    ],
                    projectId: [
                        { validator: checkProject, trigger: 'change' }
                    ],
                    groupId: [
                        { validator: checkGroup, trigger: 'change' }
                    ],
                    projectIds: [
                        { validator: checkProjects, trigger: 'change' }
                    ],
                    groupIds: [
                        { validator: checkGroups, trigger: 'change' }
                    ],
                    remarkOne: [
                        { validator: checkMsg, trigger: 'change' }
                    ]
                },
                labelWidth: '60px',
                projectOptions:[],  //调入项目
                groupOptions:[],    //调入小组
                calloutProjectOptions:[],   //调出项目
                calloutGroupOptions:[],     //调出小组
                groupArrSel:[],
                createTime:this.formData.entryTime,
                pickerBeginDateAfter: {
                    disabledDate:(time) => {
                        if (this.createTime) {
                            return time.getTime() < new Date(this.createTime);
                        }
                    }
                }
            }
        },
        methods:{
            demo(){
                comm.warnRemid(this,'保存失败!');
            },
            closeTransfer(){
                this.$emit('closes','cancel');
                this.exportform.groupIds = '';
                this.calloutGroupOptions = [];
            },
            //保存调出按钮
            saveExport(){
                // if(this.exportform.groupIds == this.exportform.groupId){
                // if(this.formData.groupId.includes(this.exportform.groupId)){
                //     comm.warnRemid(this,'调入小组不可为当前用户所在小组!');
                // }else{
                    this.$refs.exportform.validate((valid) =>{
                        if (valid) {
                            if(this.formData.groupId.includes(this.exportform.groupId)){
                                comm.warnRemid(this,'调入小组不可为当前用户所在小组!');
                            }else{
                                if(this.exportform.endOrgId=='-1'){
                                    this.exportform.endOrgId = ''
                                }
                                let data = {
                                    //用户ID
                                    userId:this.exportform.userId,
                                    bringUpTime:this.exportform.bringUpTime,
                                    startOrgId:this.exportform.groupIds,
                                    endOrgId:this.exportform.endOrgId,
                                    remarkOne:this.exportform.remarkOne,
                                };
                                requestExport(data).then(res=>{
                                    if(res && res.data && res.data.data){
                                        this.$emit('closes','success');
                                    }else{
                                        this.$emit('closes','cancel');
                                        comm.warnRemid(this,'保存失败!');
                                    }
                                })
                            }
                        }
                    });
                // }
            },
            //选择项目下拉框
            projectSel(selVal){
                if(selVal!='-1'){
                    this.groupArrSel = [];
                    this.groupOptions=[];
                    this.exportform.groupId='';    //清空小组值
                    //重新获取小组数据
                    let list =  TempCache.getItem('groupList');
                    //选择项目时候,展示出来对应的小组
                    for(var i = 0;i<list.length;i++){
                        if(list[i].parentId==selVal){
                            this.groupArrSel.push({
                                id: list[i].id,
                                name: list[i].name,
                                parentId:list[i].parentId
                            })
                        }
                    }
                    this.groupOptions = this.groupArrSel
                    this.groupOptions.splice(0,0,{id:'-1',parentId:'-1',name:'请选择'})
                }else{
                    this.exportform.groupId='-1'
                    this.exportform.endOrgId='-1'
                    this.groupOptions= TempCache.getItem('groupList');
                }
            },
            //选择小组下拉框
            groupSel(selVal){
                this.exportform.endOrgId = selVal;
                if(selVal!='-1'){
                    //选择小组时候,展示出来对应的项目
                    for(var i = 0;i<this.groupOptions.length;i++){
                        if(this.groupOptions[i].id==selVal){
                            for(var k = 0;k<this.projectOptions.length;k++){
                                if(this.projectOptions[k].id==this.groupOptions[i].parentId){
                                    //console.log(this.projectOptions[k].name)
                                    this.exportform.projectId = this.projectOptions[k].name;
                                    return
                                }
                            }
                        }
                    }
                }
            },
            //调出-调出项目
            calloutProject(){
                requestCalloutProject({
                    userId: this.exportform.userId
                }).then((res)=>{
                    if(res && res.data && res.data.data.length){
                        this.calloutProjectOptions = res.data.data;
                    }
                })
            },
            //调出-调出小组
            calloutGroup(id){
                requestCalloutGroup({
                    userId:this.exportform.userId,
                    projectId:id
                }).then((res)=>{
                    if(res && res.data && res.data.data.length){
                        this.calloutGroupOptions = res.data.data;
                    }
                })
            },
              //项目下拉框数据请求
            projectList(){
				requestProject({type: 2}).then(res => {
				    if(res && res.data && res.data.data.length){
                       this.projectOptions = res.data.data;
                       this.projectOptions.splice(0,0,{id:'-1',name:'请选择'})
                        TempCache.setItem('projectList', this.projectOptions);
                    }
				}).catch(error => {
					//console.log(error, 222)
				})
			},
            //小组下拉框数据请求
            groupList(){
				requestProject({type: 3}).then(res => {
				    if(res && res.data && res.data.data.length){
                       this.groupOptions = res.data.data
                       this.groupOptions.splice(0,0,{id:'-1',parentId:'-1',name:'请选择'})
                        TempCache.setItem('groupList', this.groupOptions)
                    }
				}).catch(error => {
					//console.log(error, 222)
				})
            },
            //2018年9月25日又一次修改，获取全部项目
            getallProject(){
                requestAllProject().then(res=>{
                    if(res && res.data){
                        this.projectOptions = res.data.data;
                    }
                })
            },
            //2018年 9月25日重新写的
            findGroup(data){
                requestFindGroup({entryId:data}).then(res=>{
                    if(res && res.data){
                        this.groupOptions = res.data.data
                    }
                })
            }
        },
        mounted(){
            this.createTime = this.formData.entryTime;
            this.calloutProject();
            this.getallProject();
            // this.projectList();
            // this.groupList();
        },
        watch:{
            "exportform.projectIds"(val){
                this.exportform.groupIds = '';
                this.calloutGroup(val);
            },
            userId(){
                this.exportform.userId = this.userId;
                this.createTime = this.formData.entryTime;
                this.calloutProject();
            },
            dialogState(val){
                if(val){
                    if(this.exportform.bringUpTime || this.exportform.projectId || this.exportform.projectIds ||this.exportform.groupId||this.exportform.groupIds|| this.exportform.remarkOne){
                        this.$refs.exportform.resetFields();
                    }
                }else{
                	 this.$refs.exportform.resetFields();
                }
            },
            //2018年9月25日又一次修改
            "exportform.projectId"(val){
                this.exportform.groupId = '';
                this.findGroup(val.toString())
            },
            //2018年9月25日修改
            "exportform.groupId"(val){
                this.exportform.endOrgId = val;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .transfer{
        /*按钮居中*/
        .dialog-footer{
            text-align: center;
            padding-bottom: 51px;
            .el-button{
                margin:0 15px;
            }
        }
    }
</style>
