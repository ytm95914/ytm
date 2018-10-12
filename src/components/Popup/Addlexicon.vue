<template>
    <section class="lexicon">
        <el-button type="primary" class="addlexicon" @click="dialogFormVisible = true" >+创建关键词词库</el-button>
        <el-dialog title="添加关键词词库" :visible.sync="dialogFormVisible">
            <div class="form">
                <el-form :model="ruleForm" style="width:300px" :rules="rules" ref="ruleForm" >
                    <el-form-item label="词库名" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="关联项目" :label-width="formLabelWidth" prop="region">
                        <el-select v-model="ruleForm.region"  placeholder="请选择关联项目" >
                            <el-option v-for="item in form" :key="item.id" :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add('ruleForm')" style="background-color:#55CE63;color:#fff">确 定</el-button>
                <el-button @click="resetForm('ruleForm')" style="background-color:#c7c2cc;color:#fff">取 消</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    /**
     * @author Chenxi Liu
     * @date 2018/8/23
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */
    import {mapMutations,mapGetters} from 'vuex'
    import {addLexicon,lexiconList,getSelect,echolexiconList} from  '@/api/workassist/addlexicon'
    import{addlexicon,glxm} from '@/utils/validate/addkeyword'
    export default {
        data() {
            return {
                dialogFormVisible: false,
                projectId: '',//项目id
                ruleForm:{
                    name: '',
                    region: '',
                },
                form:[],
                formLabelWidth: '120px',
                rules: {
                    name: [
                        {trigger: 'blur', validator: addlexicon},
                    ],
                    region: [
                        {validator: glxm, trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            getprojectName(){
                getSelect().then(res =>{
                    this.form=res.data;
                })
            },
            add(formName){//传给后台数据
                let params={
                    dbName: this.ruleForm.name,
                    projectId: this.ruleForm.region
                };
                addLexicon(params).then((res)=>{
                    if(res.data) {//表格刷新
                        this.$emit('refreshList');
                        if(this.ruleForm.name!==''){
                            this.$refs[formName].resetFields();
                            this.dialogFormVisible = false;
                            this.ruleForm.name='';
                            this.ruleForm.region='';
                        }
                    }
                })
                this.$refs[formName].validate();
            },
            //取消重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
            }
        },
        mounted() {
            this.getprojectName();
        }
    }
</script>
<style  scoped>
    .dialog-footer{
        text-align: center;
    }
    .form{
        width:300px;
        margin-left:150px;
    }
</style>

