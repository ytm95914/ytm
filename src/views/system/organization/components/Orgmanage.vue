<template>
    <div class="orgmanage">
        <el-form ref="form" :model="form" :rules="rules">
            <el-row>
                <div class="orgmanagefun">
                    <el-button type="success" @click.stop.prevent="editclick()" v-show="geteditshow" v-if="BtnPermission.includes('编辑组织')">
                        <svg-icon icon-class="edit" id="svg-icon" style=""/><span>编辑</span>
                    </el-button>
                    <router-link :to="'/system/editorg/'+1" v-if="BtnPermission.includes('指标配置')">
                        <el-button type="primary" v-show="geteditshow">指标配置</el-button>
                    </router-link>
                    <div style="height:38px" v-show="!geteditshow"></div>
                </div>
                <el-col :span="12">
                    <el-form-item label="上级机构" :label-width=quotaWidth>
                        <span>{{form.code}}</span>
                    </el-form-item>
                    <el-form-item label="机构类型" :label-width=quotaWidth>
                        <el-radio-group v-model="form.typeId" disabled>
                            <el-radio label="1">部门</el-radio>
                            <el-radio label="2">项目组</el-radio>
                            <el-radio label="3">小组</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="折算系数" :label-width=quotaWidth prop="calculationRatioData">
                        <el-input v-model="form.calculationRatioData" :disabled="getOrg_disable"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构名称" :label-width=quotaWidth prop="name">
                        <el-input v-model="form.name" :disabled="getOrg_disable"></el-input>
                    </el-form-item>
                    <el-form-item label="KPI目标(条)" :label-width=quotaWidth prop="kpiData">
                        <el-input v-model="form.kpiData" :disabled="getOrg_disable"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注" :label-width=quotaWidth prop="memo">
                <el-input type="textarea" v-model="form.memo" :disabled="getOrg_disable"></el-input>
            </el-form-item>
            <div class="orgmanagebtn" v-show="!getOrg_disable">
                <el-form-item>
                    <el-button type="success" @click.stop="onSave('form')">保存</el-button>
                    <el-button type="info" @click.stop="unSave('form')">取消</el-button>
                </el-form-item>
            </div>

        </el-form>
    </div>
</template>
<script>
    import {
        mapMutations,
        mapGetters
    } from 'vuex'
    import {
        addorgnization,
        makeorgnization
    } from '@/api/system/orgnization'
    import {
        jigouname,
        numbers,
        floats
    } from '@/utils/validate/organiza'
    export default {
        props: ['BtnPermission'],
        data() {
            return {
                form: {
                    code:"",
                    typeId: "",
                    calculationRatioData: "",
                    name: "",
                    kpiData: "",
                    memo: "",
                    id: "",
                    hisId: "",
                    parentId: "",
                    level: ""
                },
                quotaWidth: "88px",
                rules: {
                    name: [{
                            trigger: 'blur',
                            validator: jigouname
                        },
                        {
                            min: 1,
                            max: 10,
                            message: '长度10个字符以内 ',
                            trigger: 'blur'
                        }
                    ],
                    kpiData: [{
                            trigger: 'blur',
                            validator: numbers
                        },
                        {
                            min: 0,
                            max: 20,
                            message: '长度20个字符以内 ',
                            trigger: 'blur'
                        }
                    ],
                    calculationRatioData: [{
                            trigger: 'blur',
                            validator: floats
                        },
                        {
                            min: 0,
                            max: 10,
                            message: '长度10个字符以内 ',
                            trigger: 'blur'
                        }
                    ],
                    memo: [{
                        min: 0,
                        max: 500,
                        message: "指标说明不得超过500字",
                        trigger: "blur"
                    }]
                },
            };
        },
        methods: {
            resetvalidate(formName){
            if(this.$refs[formName]!==undefined){
              this.$refs[formName].resetFields();//如果只是清除表单验证用   this.$refs[formName].clearValidate();
            }
          },
            unSave: function (form) {
               this.setunsave(true);
                this.setOrg_disable(true);
                this.setfalg(false);
                this.setOrg_Add(false);
                this.$refs[form].resetFields();
            },
            onSave: function (form) {
                if (this.getOrg_Add) {
                    this.$refs[form].validate((valid) => {
                        if (valid) {
                            addorgnization(this.form).then(res => {
                                if (res.data.data) {
                                    let newDate = {
                                        name: this.form.name,
                                        id: this.form.id
                                    }
                                    this.setOrg_newdata(newDate);
                                    this.setOrg_Add(false);
                                    this.setOrgfalg(true);
                                    this.setOrg_disable(true);
                                    this.$refs[form].resetFields();
                                    this.seteditshow(false);
                                    this.$notify.success({
                                        title: '成功',
                                        message: '新增成功！',
                                        type: 'success',
                                        duration: "3000",
                                        onClose: function () {}
                                    })
                                } else {
                                     this.$notify.error({
                                        title: '失败',
                                        message: res.data.msg,
                                        type: 'success',
                                        duration: "3000",
                                        onClose: function () {}
                                    })
                                }
                            })
                        } else {
                            return false;
                        }
                    })
                } else if (this.getOrg_Edit) {
                    this.$refs[form].validate((valid) => {
                        if (valid) {
                            if(this.form.id){
                            makeorgnization(this.form).then(res => {
                                if (res.data.data) {
                                    let newDate = {
                                        name: this.form.name,
                                        id: this.form.id
                                    }
                                    this.setOrg_newdata(newDate);
                                    this.setOrgfalg(true);
                                    this.setOrg_disable(true);
                                    this.$refs[form].resetFields();
                                    this.seteditshow(false);
                                } else {
                                     this.$notify.error({
                                        title: '失败',
                                        message: res.data.msg,
                                        type: 'success',
                                        duration: "3000",
                                        onClose: function () {}
                                    })
                                }
                            })
                               }else{
                                   this.$notify.error({
                                        title: '失败',
                                        message: "未选择层级,保存失败!",
                                        type: 'error',
                                        duration: "3000",
                                        onClose: function () {
                                            return false;
                                        }
                                    })
                               }
                        } else {
                            return false;
                        }
                    })
                } else {
                    return false;
                }
            },
            editclick: function () {
                this.setOrg_disable(false);
                this.setOrg_Edit(true);
            },
            ...mapMutations({
                setOrg_newdata: "setOrg_newdata",
                setOrgfalg: "setOrgfalg",
                setOrg_disable: "setOrg_disable",
                setOrg_Add: "setOrg_Add",
                setOrg_Edit: "setOrg_Edit",
                setfalg: 'setfalg',
                setunsave:"setunsave",
                seteditshow:"seteditshow"
            })
        },
        computed: {
            ...mapGetters([
                'getOrg_Show',
                "getOrg_disable",
                'getOrgfalg',
                "getOrg_Add",
                "getOrg_Edit",
                "getTreedata",
                "getfalg",
                "getunsave",
                "geteditshow"
            ])
        },
        create() {

        },

        deactivated:function(){
        console.log('已销毁===========')
        console.log(this.info)
        console.log(this.$el)
        },
        watch: {
            form(nowVal, oldVal) {
            },
            getOrg_Show(newQuestion, oldQuestion) {
                 this.resetvalidate('form');
                this.form.code=newQuestion.code;
                this.form.name = newQuestion.name;
                this.form.calculationRatioData = newQuestion.calculationRatioData;
                this.form.kpiData = newQuestion.kpiData;
                this.form.memo = newQuestion.memo;
                this.form.typeId = newQuestion.typeId.toString();
                this.form.id = newQuestion.id;
                this.form.hisId = newQuestion.hisId;
                this.form.parentId = newQuestion.parentId;
                this.form.level = newQuestion.level;
            },
            getOrg_disable(newQuestion, oldQuestion) {},
            getOrgfalg(newQuestion, oldQuestion) {},
            getOrg_Add(newQuestion, oldQuestion) {},
            "$store.state.treedata" () {},
            "$store.state.falg" () {

            },
            "$store.state.editshow"(newQuestion, oldQuestion){
                    if(!newQuestion){
                        this.form.name = "";
                this.form.calculationRatioData ="";
                this.form.kpiData = "";
                this.form.memo = "";
                this.form.typeId ="";
                this.form.id ="";
                this.form.hisId = "";
                this.form.parentId = "";
                this.form.level = "";
                 this.form.code="";
                    }
            },
        }
    };

</script>
<style rel="stylesheet/scss" lang="scss">
    .orgmanage {
        width: 100%;
        height: 680px;
        border: 1px solid #E9F1F3;
        button{
            width: 70px;
            padding:12px 0 !important;
            #svg-icon {
                width: 13px;
                height: 13px;
                color: #fff;
                margin-right: -9.6px;
                margin-left: 12px;
                float: left;
            }
        }
        .el-form-item{
            margin-right: 20px;
             .el-form-item__label {
                line-height: 38px;
                color: #333;
            }
        }
       
        .quotanum .el-form-item__label {
            line-height: 20px;
        }
        .el-form-item__content {
            line-height: 38px;
        }
        .orgmanagebtn {
            width: 100%;
            text-align: center;
            margin-top: 180px;
        }

        .orgmanagefun {
            padding: 20px;
            width: 50%;
            float: right;
            text-align: right;
        }
    }

</style>

