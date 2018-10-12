<template>
    <div >
        <p><span class="keyword">{{this.ckname}}&gt;</span>关键词列表</p>
        <div class="keywordList">
            <div class="font12 color333 search-div">
                <span>关键词</span>
                <div class="sel">
                    <el-input v-model="formInline.keywords"  placeholder="请输入关键词"></el-input>
                </div>
                <span>关键词分类</span>
                <div class="sel">
                    <el-select v-model="classifyName"  placeholder="请选择" >
                        <el-option v-for="item in tableData1" :key="item.id" :label="item.classifyName" :value="item.id" ></el-option>
                    </el-select>
                </div>
                <div class="fr">
                    <el-button type="primary" @click="deletemorekeywords(sels)" >批量删除</el-button>
                    <el-button type="primary" @click="querykeyword()" >查询</el-button>
                    <el-button type="primary" class="addbutton"  @click="dialogFormVisible = true;" >+新增关键词</el-button>
                    <el-button type="primary" style="padding:12px;background: #00C4AB;" @click="centerDialogVisible = true;" >
                        <svg-icon icon-class="import"  class="svg-icon"/>
                        <span>导入</span>
                    </el-button>

                    <el-button @click="ImportExcel" type="primary" style="padding:12px; background: #55CE63;">
                        <svg-icon icon-class="export" class="svg-icon" />
                        <span>导出</span>
                    </el-button>
                </div>
            </div>
            <div class="table-div">
                <el-table @selection-change="selsChange" :header-cell-style="getRowClass" stripe :data="tableData" style="width: 100%">
                    <el-table-column type="selection" ></el-table-column>
                    <el-table-column fixed type="index" width="100" label="序号">
                    </el-table-column>
                    <el-table-column prop="keyword" label="关键词">
                    </el-table-column>
                    <el-table-column prop="color" label="背景颜色">
                        <template slot-scope="scope">
                            <span v-bind:style="{background:scope.row.color,display:'inline-block',width:'10px',height:'10px'}"></span>
                            <span >{{scope.row.color}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fontColor" label="字体颜色">
                        <template slot-scope="scope">
                            <span v-bind:style="{background:scope.row.fontColor,display:'inline-block',width:'10px',height:'10px'}"></span>
                            <span>{{scope.row.fontColor}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="classifyName" label="关键词分类">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click=" hxkeyword(scope.$index)">编辑</el-button>
                            <el-button type="text" size="small" @click="delet(scope.$index)">删除</el-button>
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
                        <input type="text" v-model="value" @keyup.enter="jumpPage" >
                        <span style="min-width:20px">页</span>
                        <span class="myscal" @click="jumpPage">GO</span>
                    </div>
                </el-pagination>
            </div>
        </div>
        <!--添加关键词弹框-->
        <section class="lexicon">
            <el-dialog title="添加关键词" :visible.sync="dialogFormVisible">
                <div class="form">
                    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" required style="width:300px">
                        <el-form-item label="关键词" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="背景颜色"  :label-width="formLabelWidth" prop="color1">
                            <el-color-picker v-model="color3" @change="set2" size="medium"></el-color-picker>
                            <el-input v-model="ruleForm.color1" style="float:right;width: 144px" auto-complete="off" disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="字体颜色"  :label-width="formLabelWidth" prop="fontcolor1">
                            <el-color-picker v-model="color4" @change="get1" size="medium"></el-color-picker>
                            <el-input v-model="ruleForm.fontcolor1"  style="float:right;width: 144px" auto-complete="off" disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="关键词分类" :label-width="formLabelWidth" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择关联项目" >
                                <el-option v-for="item in tableData1" :key="item.id" :label="item.classifyName" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addkeyw('ruleForm')" style="background-color:#55CE63;color:#fff">确 定</el-button>
                    <el-button @click="cancel('ruleForm')" style="background-color:#c7c2cc;color:#fff">取 消</el-button>
                </div>
            </el-dialog>
        </section>
        <!--编辑弹窗-->
        <section class="lexicon">
            <el-dialog title="修改关键词" :visible.sync="dialogVisible">
                <div class="form">
                    <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" style="width:300px">
                        <el-form-item label="关键词" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="ruleForm1.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="背景颜色"  :label-width="formLabelWidth">
                            <el-color-picker v-model="color3" @change="set" size="medium"></el-color-picker>
                            <div class="vv">
                                <input type="text" v-model="color" class="uu" disabled="disabled"></input>
                            </div>
                            <div id="h5" style="display: none; height: 14px; margin-top:-9px;color:#f66c6c">请选择背景颜色</div>
                        </el-form-item>
                        <el-form-item label="字体颜色"  :label-width="formLabelWidth">
                            <el-color-picker v-model="color4" @change="get"  size="medium"></el-color-picker>
                            <div class="vv">
                                <input type="text" v-model="fontcolor" class="nn" disabled="disabled"></input>
                            </div>
                            <div id="h4" style="display: none; height:14px; margin-top:-9px;color:#f66c6c">请选择字体颜色</div>
                        </el-form-item>
                        <el-form-item label="关键词分类" :label-width="formLabelWidth" >
                            <el-select v-model="classify" placeholder="请选择关键词分类">
                                <el-option v-for="item in tableData1" :key="item.id" :label="item.classifyName" :value="item.id" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editsave()" style="background-color:#55CE63;color:#fff">确 定</el-button>
                    <el-button  style="background-color:#c7c2cc;color:#fff" @click="cancel1('ruleForm1')">取 消</el-button>
                </div>
            </el-dialog>
        </section>
        <!--导入上传1级弹框-->
        <el-dialog
            title="批量导入"
            :visible.sync="centerDialogVisible"
            width="30%"
            :lock-scroll="false">
            <section class="uploadContent">
                <div class="uploadContent-select">
                    <span>选取文件：</span>
                </div>
                <div class="checkbox">
                    <el-checkbox v-model="checked" >覆盖已有关键词</el-checkbox>
                </div>
                <div class="uploadContent-btn">
                    <el-button type="success" @click="submitUpload">导入</el-button>
                    <el-button class="qxbutton" type="info" @click="candel2()">取消</el-button>
                </div>
                <div class="uploadContent-info">
                    <p class="uploadContent-infop">1、点击下载<span @click="downloadTemplate" class="templet">《IDSC关键词导入模板》</span></p>
                    <p>2、上传填写正确的员工信息导入模板</p>
                </div>
            </section>
            <el-upload
                class="upload-excel"
                ref="upload"
                :action="uploadUrl()"
                :file-list="fileList"
                :auto-upload="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :beforeUpload="beforeAvatarUpload"
                :on-change="handleChange">
                <el-button slot="trigger" class="selectFile">
                    <svg-icon icon-class="select" style="width:15px;height:15px;vertical-align: -.1em;"/>
                    <span>选取文件</span>
                </el-button>
            </el-upload>
        </el-dialog>
        <!--导入失败回显数据-->
        <el-dialog title="错误数据" :visible.sync="listDialogVisible">
            <div>
                <p>导入失败，已导入0条数据</p>
                <p>失败原因如下，请修改模板数据</p>
            </div>
            <el-table :data="errorDatas">
                <el-table-column property="excelRow" label="EXCEL行" width="150"></el-table-column>
                <el-table-column property="userName" label="工号" width="200"></el-table-column>
                <el-table-column property="realName" label="真实姓名"></el-table-column>
                <el-table-column property="failReason" label="失败原因"></el-table-column>
            </el-table>
        </el-dialog>
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
    import {keywordList,deletekeyword,classificationList,importkeyword,echokeyword,requestImport,addkeyword,deletekeywords,lexiconList,queryclassification,editkeyword } from '@/api/workassist/addlexicon'
    import comm from '@/utils/comm'
    import{keyword,color1,fontcolor1,region1} from '@/utils/validate/addkeyword'
    export default {
        data() {
            return {
                color3: '#409EFF',
                color4: '#ff4500',
                fontcolor: '',
                color: '',
                fontcolor1: '',
                color1: '',
                centerDialogVisible:false,  //导入弹框
                dialogFormVisible: false,
                dialogVisible: false,
                listDialogVisible:false,    //导入失败返回数据展示
                fileList:[],    //导入数据
                errorDatas:[],    //导入错误返回数据展示
                classifyName: '',
                checked: false,
                tableData: [],
                tableData1: [],
                gridData: [],
                formLabelWidth: '120px',
                currentPage: 1, //当前页码
                pageSize:10,    //表格每页容量
                total:500,      //表格总数
                value: 1,
                formInline:{
                    keyword: '',
                    classifyId: '',
                    dbId:'',
                    page:1
                },
                classidchange:'',
                requestPages:'',
                keywords: '',
                classify: '',
                uu: '',
                aa: '',
                msg: '',
                ckname: '',
                sels: [],
                ids: [],
                hid:'',
                bid:'',
                ruleForm:{
                    name: '',
                    fontcolor1: '',
                    color1: '',
                    region: '',
                    type: []
                },
                ruleForm1:{
                    name: '',
                    region: '',
                },
                rules1: {
                    name: [
                        {trigger: 'blur', validator: keyword},
                    ],
                },
                rules: {
                    name: [
                        {trigger: 'blur', validator: keyword},
                    ],
                    fontcolor1: [
                        {trigger: 'blur', validator: fontcolor1},
                        { trigger:'change'}
                    ],
                    color1: [
                        {trigger: 'blur', validator: color1},
                        { trigger: 'change'}
                    ],
                    region: [
                        {trigger: 'change', validator: region1},
                    ]
                },
            }
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
            //翻页方法
            handleCilck(val){
                this.formInline.page = val;
                this.formInline.dbId=this.msg;
                this.formInline.classifyId=this.classidchange;
                this.keyword(this.formInline);
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
                    this.formInline.classifyId=this.classidchange;
                    this.keyword(this.formInline);
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
            set1(){
                this.uu={
                    dbId:this.msg
                }
            },
            //渲染表格
            keyword(params) {
                keywordList(params).then((res)=>{
                    this.total = res.data.total;
                    this.tableData = res.data.records;
                    this.requestPages=res.data.pages;
                    this.pageSize=res.data.size;
                })
            },
            //关键词分类下拉列表
            classification() {
                let params={
                    dbId: this.msg
                }
                classificationList(params).then((res)=>{
                    this.tableData1 = res.data.records;
                })
            },
            //查询
            querykeyword() {
                this.classidchange=this.classifyName;
                let params={
                    keyword: this.formInline.keywords,
                    classifyId: this.classifyName,
                    dbId:this.msg,
                    page:this.formInline.page
                };
                keywordList(params).then((res)=>{
                    if(res.data){
                        this.tableData = res.data.records;
                        this.total=res.data.total;
                        this.keywords='';
                        this.classifyName='';
                    }
                })
            },
            //删除
            deletekeyword(a) {
                let params={
                    id: a
                }
                deletekeyword(params).then((res)=>{
                    if (res.data) {//表格刷新
                        this.keyword(this.uu);
                        this.$notify({
                            title: '提示',
                            message: '删除成功!',
                            duration: 2000
                        });
                    }
                })
            },
            delet(val) {
                this.$confirm('是否删除关键词?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deletekeyword(this.tableData[val].id);
                }).catch(() => {
                    this.$notify({
                        title: '提示',
                        message: '已取消删除',
                        duration: 1000
                    });
                });
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
            },
            downloadTemplate(){
                window.location.href= process.env.BASE_API + `/admin/bpoKeyWord/dowloadKeyWordModel`;
            },
            //导入成功回调
            uploadSuccess(res){
                if(res && res.data){
                    if(res.data.length){
                        this.errorDatas = res.data;
                        this.centerDialogVisible = false;
                        this.checked=false;
                        setTimeout(()=>{this.listDialogVisible = true;},500);
                        console.log('导入回调失败');
                    }else{
                        this.$notify({
                            title: '提示',
                            message: '导入成功',
                            duration: 3000
                        });
                        this.keyword(this.uu);
                        this.centerDialogVisible = false;
                        this.checked=false
                    }
                }
            },
            beforeAvatarUpload(file){
                let reg = /.xlsx|.xls/;
                if(!reg.test(file.name)){
                    comm.warnRemid(this,'请导入正确的模板');
                    return false
                }
            },
            //导入上传
            submitUpload(){
                this.$refs.upload.submit();
            },
            candel2(){
                this.centerDialogVisible = false;
                this.checked=false
            },
            //导入失败回调
            uploadError(err){
                this.$notify({
                    title: '提示',
                    message: '导入失败，请查看网络',
                    duration: 3000
                });
                console.log('导入失败，请查看网络')
            },
            //导入请求地址
            uploadUrl(){
                let url;
                if(this.checked==false){
                    url = process.env.BASE_API + `/admin/bpoKeyWord/importKeyWordExcel?dbId=${this.msg}`;
                }else{
                    url = process.env.BASE_API + `/admin/bpoKeyWord/importKeyWordExcelCheck?dbId=${this.msg}`;
                }
                return url;
            },
            //导出
            ImportExcel(){
                requestImport().then(res=>{
                    if(res && res.data){
                        window.location.href= process.env.BASE_API +  `/admin/bpoKeyWord/exportKeyWordExcel?dbId=${this.msg}`;
                    }
                })
            },
            cancel(formName){
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.ruleForm.name="";
                this.ruleForm.region="";
                this.fontcolor1="";
                this.color1="";
            },
            //新增关键字
            addkeyw(formName) {
                this.$refs[formName].validate();
                if(this.ruleForm.name!=""&&this.ruleForm.region!=""&&this.ruleForm.fontcolor1!=""&&this.ruleForm.color1!=""){
                    let params={
                        keyword: this.ruleForm.name,
                        classifyId:this.ruleForm.region,
                        fontColor:this.ruleForm.fontcolor1,
                        dbId: this.msg,
                        color: this.ruleForm.color1,
                    };
                    addkeyword(params).then((res)=>{
                        if(res.data){
                            this.keyword(this.uu);
                            this.dialogFormVisible = false;
                            this.ruleForm.name="";
                            this.ruleForm.region="";
                            this.ruleForm.fontcolor1="";
                            this.ruleForm.color1="";
                        }
                    });
                    this.$refs[formName].resetFields()
                }
            },
            get(val) {
                this.color4=val;
                this.fontcolor=val;
            },
            get1(val) {
                this.color4=val;
                this.ruleForm.fontcolor1=val;

            },
            set(val) {
                this.color3=val;
                this.color=val;
            },
            set2(val) {
                this.color3=val;
                this.ruleForm.color1=val;
            },
            //关键字批量删除
            selsChange(sels) {
                //被选中的行组成数组
                this.sels = sels;
            },
            deletekeyword1(b) {
                let params={
                    ids: b
                };
                deletekeywords(params).then((res)=>{
                    if(res.data){
                        this.keyword(this.uu);
                        this.$notify({
                            title: '提示',
                            message: '删除成功!',
                            duration: 1000
                        });
                    }
                })
            },
            deletemorekeywords(rows) {
                rows.forEach(element =>{
                     this.aa+=element.id+",";
                });
                this.ids=this.aa.substr(0,this.aa.length-1);
                if(this.ids==""){
                    this.$notify({
                        title: '提示',
                        message: '请选择关键字',
                        duration: 3000
                    });
                }else{
                    this.$confirm('是否删除关键字?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deletekeyword1(this.ids);
                    }).catch(() => {
                        this.$notify({
                            title: '提示',
                            message: '已取消删除',
                            duration: 1000
                        });
                    });
                }
            },
            //关键词回显
            hxkeyword(index) {
                this.dialogVisible=true;
                this.hid=this.tableData[index].id;
                let params={
                    id:this.tableData[index].id
                };
                echokeyword(params).then((res)=>{
                    if(res.data){
                        this.ruleForm1.name=res.data.data.keyword;
                        this.fontcolor=res.data.data.fontColor;
                        this.color4=res.data.data.fontColor;
                        this.color=res.data.data.color;
                        this.color3=res.data.data.color;
                        this.classify=res.data.data.classifyName;
                    }
                })
            },
            //编辑保存
            editsave(){
                let params={
                    id:this.hid,
                    dbId:this.msg,
                    fontColor:this.fontcolor,
                    color:this.color,
                    keyword:this.ruleForm1.name,
                    classifyIds:this.classify
                };
                editkeyword(params).then((res)=>{
                    if(this.ruleForm1.name!=""&&this.classify!=""&&this.fontcolor!=""&&this.color!=""){
                        if(res.data){
                            this.keyword(this.uu);
                            this.dialogVisible=false;
                        }
                    }
                })
            },
            //取消
            cancel1(formName){
                this.dialogVisible=false;
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            this.getParams();
            this.set1();
            this.keyword(this.uu);
            this.classification();
        },
        watch:{
            centerDialogVisible(){
                if(!this.centerDialogVisible){
                    this.fileList = [];
                }
            }
        }
    }
</script>

<style rel="stylesheet/css"  scoped>
    .keyword{
        color: #cacaca;
    }
    .keywordList{
        margin-top: 20px;
        border:2px solid #E9F1F3;
    }
    .svg-icon{
        width: 13px;
        height: 13px;
        color: #fff;
        margin-right: 5.4px;
        float: left;
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
    .uploadContent {
        margin-left: 60px;
    }
    .uploadContent-select{
        margin-bottom: 38px;
    }
    .uploadContent-select>el-button{
        margin-left:30px;
    }
    .uploadContent-info{
        margin-left: -56px;
        color: #666;
    }
    .uploadContent-infop{
        margin-bottom: 5px;
    }
    .templet{
        color:#11A0F8;
        cursor: pointer;
    }
    .uploadContent-btn{
        margin:20px 0;
    }
    .qxbutton{
        margin-left: 55px;
    }
    .selectFile {
        position: absolute;
        left: 150px;
        right: 0;
        top: 70px;
    }
    .checkbox{
        margin-left: 70px;
    }
    .uu,.nn,.vv{
        margin:0;
        padding:0;
    }
    .uu,.nn{
        width:141px;
        height:29px;
        border:none;
        background-color: #FFFFFF;
    }
    .vv{
        background-color: #FFFFFF;
        float:right;
        height:35px;
        width:142px;
        border:1px solid #dcdfe6;
        border-radius:4px
    }
    .addbutton{
        width: 123px;
    }
</style>
