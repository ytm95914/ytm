<template>
    <div class="keyword">
        <div class="addlexicon">
            <Addlexicon @refreshList="add"/>
        </div>
        <div class="table-div">
            <el-table :data="tableData"  stripe  style="width: 100%" :header-cell-style="getRowClass">
                <el-table-column  type="index"  width="100"  label="序号">
                </el-table-column>
                <el-table-column prop="dbName" label="关键词词库名称">
                </el-table-column>
                <el-table-column prop="projectName" label="关联项目组">
                </el-table-column>
                <el-table-column prop="operation" label="操作" >
                    <template slot-scope="scope">
                        <el-button type="text" size="small"  @click="echo(scope.$index)">编辑</el-button>
                        <!--<router-link :to="'/workassist/addkeyword/'+1">-->
                            <el-button  type="text" size="small" @click="getlexiconname(scope.$index)">查看关键词</el-button>
                        <!--</router-link>-->
                            <el-button @click="" type="text" size="small" @click="getbdId(scope.$index)">添加分类</el-button>
                        <el-button type="text" size="small" style="color:#E65E5E" @click="delet(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--编辑弹框-->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <div class="form">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item  label="关键词词库名称" :label-width="formLabelWidth" prop="name">
                        <el-input  auto-complete="off" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="关联项目组" :label-width="formLabelWidth">
                        <el-select v-model="classname"  @change="selectGet" >
                            <el-option v-for="item in form" :key="item.id" :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editSave('ruleForm')">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    /**
     * @author Chenxi Liu
     * @date 2018/8/22
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */
    import Addlexicon from '@/components/Popup/Addlexicon'
    import{addlexicon} from '@/utils/validate/addkeyword'
    import {lexiconList,editlexicon,echolexicon,getSelect,deleteLexicon} from  '@/api/workassist/addlexicon'
    export default {
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: '',
                id: '',
                dbid: '',
                name: '',
                projectId: '',
                classname: '',
                editid: '',
                lexiconId: '',
                lexiconname: '',
                ruleForm:{
                    name: '',
                },
                rules: {
                    name: [
                        {trigger: 'blur', validator: addlexicon},
                    ],
                },
            }
        },
        components:{
            Addlexicon  //引用组件
        },
        methods: {
            getRowClass({
                row,
                column,
                rowIndex,
                columnIndex
            }) {
                if(rowIndex == 0) {
                    return {
                        background: '#92A6B1',
                        color: '#ffffff'
                    }
                } else {
                    return ''
                }
            },
            //渲染表格
            add(){
                lexiconList().then(res =>{
                    this.tableData=res.data;
                })
            },
            //删除
            deleLexicon(a){
                let params={
                    id:a
                };
                deleteLexicon(params).then((res)=>{
                    if(res.data) {//表格刷新
                        this.add();
                        this.$notify({
                            title: '提示',
                            message: '删除成功!',
                            duration: 1000
                        });
                    }
                })
            },
            //删除
            delet(val) {
                this.$confirm('是否删除关键词词库?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleLexicon(this.tableData[val].id);
                }).catch(() => {
                    this.$notify({
                        title: '提示',
                        message: '已取消删除',
                        duration: 1000
                    });
                });
            },
            getprojectName() {
                getSelect().then(res =>{
                    this.form=res.data;
                })
            },
            //编辑回显
            echo(val){
                this.lexiconId=this.tableData[val].id;
                this.dialogFormVisible = true;
                let params={
                    id: this.tableData[val].id
                };
                echolexicon(params).then((res)=>{
                    this.ruleForm.name=res.data.data.dbName;
                    this.classname=res.data.data.projectName;
                });
            },
            selectGet(vId){//这个vId也就是value值

                let obj = {};
                obj = this.form.find((item)=>{
                    return item.id === vId;
                });
                this.editid=obj.id
            },
            //编辑保存
            editSave(formName){
                this.$refs[formName].validate();
                let params={
                    id: this.lexiconId,
                    dbName: this.ruleForm.name,
                    projectId: this.editid
                };
                if(this.ruleForm.name!=""&&3<=params.dbName.length<20){
                    console.log(params.dbName.length,576)
                    editlexicon(params).then((res)=>{
                        if(res.data){
                            this.add();
                            this.dialogFormVisible = false
                        }
                    })
                }
            },
            //添加分类路由
            sendParams () {
                this.$router.push({
                    path: '/workassist/addclass',
                    params: {
                        dataObj: this.dbid,
                        name: this.lexiconname
                    }
                })
            },
            //查看关键词路由
            sendParam () {
                this.$router.push({
                    path: '/workassist/addkeyword',
                    params: {
                        dataObj: this.dbid,
                        name: this.lexiconname
                    }
                })
            },
            //获取关键词库的ID
            getbdId(val) {
                this.dbid=this.tableData[val].id;
                this.lexiconname=this.tableData[val].dbName;
                console.log( this.lexiconname,9897)
                this.sendParams ()
            },
            getlexiconname(val) {
                this.dbid=this.tableData[val].id;
                this.lexiconname=this.tableData[val].dbName;
                this.sendParam ()
            }
        },
        mounted() {
            this.add();
            this.getprojectName();
        },
    }
</script>
<style  scoped>
    .keyword{
        margin-top: 10px;
        border:2px solid #E9F1F3;
    }
    .addlexicon{
        margin-left: 890px;
        margin-top: 10px ;
    }
    .table-div {
        margin-top: 20px;
    }
    .table-div {
        margin-top: 20px;
        border: 1px solid #E9F1F3;
        scroll-behavior: auto;
    }
    .el-table thead {
        color: #909399;
        font-weight: 500;
    }
    .dialog-footer{
        text-align: center;
    }
    .form{
        width:300px;
        margin-left:150px;
    }
</style>

