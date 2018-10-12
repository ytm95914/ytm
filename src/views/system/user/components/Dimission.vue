<template>
    <section class="dimission">
        <el-form ref="dimissionform" :model="dimissionform" :rules="dimissionRules">
            <el-form-item label="离职时间" prop="resignationDate">
                <el-date-picker
                    v-model="dimissionform.resignationDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerBeginDateAfter">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="离职类型" prop="resignationType">
                <el-select v-model="dimissionform.resignationType" placeholder="请选择">
                    <el-option v-for="(val,index) in types" :key="index" :label="val.name" :value="index+1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="流失原因" v-show="loseShow" prop="resignationReason">
                <el-select v-model="dimissionform.resignationReason" placeholder="请选择">
                    <el-option v-for="(item,index) in reasons" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="saveReasons">确 定</el-button>
            <el-button type="primary" @click="closeDimission">取 消</el-button>
        </div>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/8/3
     * @desc [离职] 弹框
     * @module 组件引用位置
     */

    import { requestReasons } from '@/api/system/user'
    import {checkDate, checkType, checkCause, checkCauseNo } from '@/utils/validate/userManageValidate'
    import comm from '@/utils/comm'

    export default {
        name: "Dimission",
        props: {
            //显示或隐藏
            dialogFormVisible: {
                type: Boolean,
                default: false
            },
            //用户ID
            userId:{
                type: Number,
                default: 66
            },
            entryTime:{
                type: String,
                default:'',
            },
            dialogState:{
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                createTime:'',
                dimissionform:{
                    resignationDate: '',
                    resignationType: '',
                    resignationReason: '',
                    userId:this.userId
                },
                types:[
                    {
                        name: '流失',
                        children: true
                    },
                    {
                        name:'非常规离职',
                        children: false
                    },
                    {
                        name:'淘汰',
                        children: false
                    }
                ],
                reasons:[
                    {name:'职业发展',id:1},
                    {name:'身体原因',id:2},
                    {name:'家庭原因',id:3},
                    {name:'薪资待遇',id:4},
                    {name:'外呼性质',id:6},
                    {name:'其他原因',id:5}
                ],
                dimissionRules: {
                    resignationDate: [
                        { validator: checkDate, trigger: 'blur' }
                    ],
                    resignationType: [
                        { validator: checkType, trigger: 'change' }
                    ],
                    resignationReason: [
                        { validator: checkCauseNo, trigger: 'change' }
                    ]
                },
                //判断流失原因输入框展示隐藏
                loseShow:false,
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
            //保存离职按钮
            saveReasons(){
                this.$refs.dimissionform.validate((valid) =>{
                    if (valid) {
                        requestReasons(this.dimissionform).then(res=>{
                            if(res && res.data && res.data.data){
                                this.$emit('closes','success');
                            }else{
                                this.$emit('closes','cancel');
                                comm.warnRemid(this,'保存失败!');
                            }
                        })
                    }
                })
            },
            closeDimission(){
                this.$emit('closes','cancel');
            }
        },
        watch:{
            "dimissionform.resignationType"(){
                if(this.dimissionform.resignationType==1){
                    this.loseShow = true;
                    this.dimissionRules.resignationReason[0].validator = checkCause;
                }else{
                    this.loseShow = false;
                    this.dimissionRules.resignationReason[0].validator = checkCauseNo;
                    this.dimissionform.resignationReason = '';
                }
            },
            userId(){
                this.dimissionform.userId = this.userId;
                this.createTime = this.entryTime;
            },
            dialogState(val){
                if(val){
                    if(this.dimissionform.resignationDate || this.dimissionform.resignationReason ||this.dimissionform.resignationType){
                        this.$refs.dimissionform.resetFields();
                    }
                }else{
                    this.$refs.dimissionform.resetFields();
                }
            }
        },
        mounted(){
            this.createTime = this.entryTime;
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dimission{
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
