<template>
    <div>
        <p><span class="keyword">{{ckname}}&gt;</span>添加分类</p>
        <div class="keywordList">
            <div class="font12 color333 search-div">
                <span>关键词分类名称</span>
                <div class="sel">
                    <el-input  placeholder="请输入关键词分类名" v-model="formInline.name"></el-input>
                </div>
                <div class="fr">
                    <el-button type="primary" icon="el-icon-search" @click="query()">查询</el-button>
                    <el-button type="primary"  @click="dialogFormVisible = true" style="width:151px;background-color:#4A90E2 ">+创建关键词分类</el-button>
                </div>
            </div>
            <div class="table-div">
                <el-table :header-cell-style="getRowClass" stripe :data="tableData" style="width: 100%">
                    <el-table-column fixed type="index" width="500" label="序号">
                    </el-table-column>
                    <el-table-column prop="classifyName" label="关键词分类名称">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="echo(scope.$index)">编辑</el-button>
                            <el-button  type="text" size="small" @click="delet(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--翻页器-->
            <div class="block" v-show="tableData.length" >
                <el-pagination
                    @current-change="handleCilck"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next,slot"
                    :total="total">
                    <div class="jumpBox">
                        <span>前往</span>
                        <input type="text" v-model="value" @keyup.enter="jumpPage()" >
                        <span style="min-width:20px">页</span>
                        <span class="myscal" @click="jumpPage()">GO</span>
                    </div>
                </el-pagination>
            </div>
            <!--编辑弹框-->
            <el-dialog title="编辑" :visible.sync="dialogVisible">
                <div class="form">
                    <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" >
                        <el-form-item label="关键分类名称" :label-width="formLabelWidth" prop="name">
                            <el-input  auto-complete="off" v-model="ruleForm1.name"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editSave('ruleForm1')">确 定</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!-- 添加关键词分类弹框 -->
        <section class="lexicon">
            <el-dialog title="创建关键词" :visible.sync="dialogFormVisible">
                <div class="form">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width:300px">
                        <el-form-item label="关键词分类名称" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addClass('ruleForm')" style="background-color:#55CE63;color:#fff">确 定</el-button>
                    <el-button @click="cancel('ruleForm')" style="background-color:#c7c2cc;color:#fff">取 消</el-button>
                </div>
            </el-dialog>
        </section>
    </div>
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
    import {echoclassification,editclassification,addclassification,deleteclassification,queryclassification,classificationList} from  '@/api/workassist/addlexicon'
    import{classname} from '@/utils/validate/addkeyword'
    export default {
        data() {
            return {
                dialogFormVisible: false,
                dialogVisible:false,
                form: {
                    name: '',
                },
                formLabelWidth: '130px',
                tableData: [],
                classifyName: '',
                msg: '',
                classid: '',
                name: '',
                ckname: '',
                currentPage: 1, //当前页码
                pageSize:10,    //表格每页容量
                total:500,      //表格总数
                value: 1,
                requestPages:'',
                formInline:{
                    name: '',
                    dbId:'',
                    page:1
                },
                uu: '',
                ruleForm:{
                    name: '',
                },
                rules: {
                    name: [
                        {trigger: 'blur', validator: classname},
                    ],
                },
                ruleForm1:{
                    name: '',
                },
                rules1: {
                    name: [
                        {trigger: 'blur', validator: classname},
                    ],
                },
            }
        },
        methods:{
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
            // 取到路由带过来的参数
            getParams () {
                let routerParams = this.$route.params.dataObj;
                let lexiconname=this.$route.params.name;
                // 将数据放在当前组件的数据内
                this.msg = routerParams;
                this.ckname=lexiconname;
            },
            get(){
                this.uu={
                    dbId:this.msg
                }
            },
            classification(params) {
                classificationList(params).then((res)=>{
                    this.total = res.data.total;
                    this.tableData = res.data.records;
                    this.requestPages=res.data.pages;
                    this.pageSize=res.data.size;
                    console.log(this.tableData,678)
                })
            },
            //添加分类
            addClass(formName){
                this.$refs[formName].validate();
                let params={
                    classifyName: this.ruleForm.name,
                    dbId: this.msg
                };
                addclassification(params).then((res)=>{
                    if(this.ruleForm.name!=""){
                        if(res.data) {//表格刷新
                            this.classification(this.uu);
                            this.ruleForm.name='';
                            this.dialogFormVisible = false;
                            this.$refs[formName].resetFields();
                        }
                    }
                })
            },
            //取消
            cancel(formName){
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.ruleForm.name="";
            },
            //删除
            deleteclass(a){
                let params={
                    id: a
                };
                deleteclassification(params).then((res)=>{
                    if(res.data) {//表格刷新
                        this.classification(this.uu);
                        this.dialogFormVisible = false;
                    }
                })
            },
            //删除弹框
            delet(val) {
                this.$confirm('是否删除关键分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteclass(this.tableData[val].id);
                    this.$notify({
                        title: '提示',
                        message: '删除成功!',
                        duration: 1000
                    });
                }).catch(() => {
                    this.$notify({
                        title: '提示',
                        message: '已取消删除',
                        duration: 1000
                    });
                });
            },
            //编辑回显
            echo(val) {
                this.dialogVisible=true;
                this.classid=this.tableData[val].id;
                let params={
                    id: this.tableData[val].id
                };
                echoclassification(params).then((res)=>{
                    if(res.data){
                        this.ruleForm1.name=res.data.data.classifyName;
                    }
                })
            },
            //编辑保存
            editSave(formName) {
                this.$refs[formName].validate();
                let params={
                    id: this.classid,
                    dbId: this.msg,
                    classifyName: this.ruleForm1.name
                };
                if(this.ruleForm1.name!==""){
                editclassification(params).then((res)=>{
                    if(res.data) {//表格刷新
                        this.classification(this.uu);
                        this.dialogVisible = false;
                    }
                })
                }
            },
            //查询
            query() {
                let params={
                    classifyName: this.formInline.name,
                    dbId:this.msg,
                    page:this.formInline.page
                };
                queryclassification(params).then((res)=>{
                    if(res.data){
                        this.tableData=res.data.records;
                        this.total=res.data.total;
                        this.formInline.name="";
                    }
                })
            },
            //翻页方法
            handleCilck(val){
                this.formInline.page = val;
                this.formInline.dbId=this.msg;
                this.classification(this.formInline);
            },
            //翻页跳转方法
            jumpPage(){
                if(this.value == this.currentPage){
                    return false;
                }else{
                    let value = Number(this.value);
                    if(value>this.requestPages){
                        value = this.requestPages;
                    }
                    this.formInline.page = value;
                    this.currentPage = value;
                    this.value = value;
                    this.formInline.dbId=this.msg;
                    this.classification(this.formInline);
                }
            },
        },
        watch: {
            // 监测路由变化
            '$route': 'getParams'
        },
        mounted(){
            this. getParams ();
            this.get();
            this.classification(this.uu);

        }

    }
</script>

<style  scoped>
    .keywordList{
        margin-top: 20px;
        border:2px solid #E9F1F3;
    }
    .keyword{
        color: #cacaca;
    }
    h2, h3 {
        font-weight: normal;
    }
    .color333 {
        color: #333;
    }
    .font12 {
        font-size: 12px;
    }
    .fr {
        float: right;
        margin-right: 10px;
    }
    .search-div {
        padding: 10px 0;
    }
    .search-div>span {
        margin-left: 20px;
        margin-right: 5px;
    }
    .sel {
        display: inline-block;
        width: 160px;
    }
    .table-div {
        border: 1px solid #E9F1F3;
        scroll-behavior: auto;
    }
    .dialog-footer{
        text-align: center;
    }
    .form{
        width:300px;
        margin-left:150px;
    }

</style>
