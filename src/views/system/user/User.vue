<template>
    <section class="usermanage">
        <el-form :inline="true" :model="initForm" class="demo-form-inline">
            <section style="float:left">
                <el-form-item label="姓名">
                    <el-input v-model="initForm.realname" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input v-model="initForm.username" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="项目">
                    <el-select v-model="projectId" placeholder="请选择" @change='projectSel'>
                        <el-option v-for="(val,index) in projectOptions" :key="index" :label="val.name" :value="val.id" :class="{selected:projectId==val.name}"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="小组">
                    <el-select v-model="initForm.groupId" placeholder="请选择" value-key="id" @change='groupSel'>
                        <el-option v-for="(val,index) in groupOptions" :key="index" :label="val.name" :value="val.id" :parentId="val.parentId"></el-option>
                    </el-select>
                </el-form-item>
            </section>
           <section style="float:right">
               <el-form-item class="search">
                   <el-button type="primary" style="padding:12px" @click="searchBtn">
                       <svg-icon icon-class="userSearch" id="svg-icon" />
                       <span>查询</span>
                   </el-button>
               </el-form-item>

               <el-form-item class="inquire" v-if="BtnPermission.includes('新增用户')">
                   <router-link :to="'/system/add/'+1">
                       <el-button type="primary" style="padding:12px" >
                           <svg-icon icon-class="userAdd" id="svg-icon" />
                           <span>新增</span>
                       </el-button>
                   </router-link>
               </el-form-item>

               <el-form-item class="importBtn" v-if="BtnPermission.includes('导入用户')">
                   <el-button type="primary" style="padding:12px" @click="centerDialogVisible = true;">
                       <svg-icon icon-class="import" id="svg-icon" />
                       <span>导入</span>
                   </el-button>
               </el-form-item>

               <el-form-item class="exportBtn"  v-if="BtnPermission.includes('导出用户')">
                   <el-button type="primary" style="padding:12px" @click="exportExcel">
                       <svg-icon icon-class="export" id="svg-icon" />
                       <span>导出</span>
                   </el-button>
               </el-form-item>
           </section>


        </el-form>

        <!--导入上传1级弹框-->
        <el-dialog
            title="批量导入"
            :visible.sync="centerDialogVisible"
            width="30%"
            :lock-scroll="false">
            <section class="uploadContent">
                <div class="uploadContent-select">
                    <span>选取文件：</span>
                    <!--<el-button slot="trigger">-->
                    <!--<svg-icon icon-class="select" style="width:15px;height:15px;vertical-align: -.1em;"/>-->
                    <!--<span>选取文件</span>-->
                    <!--</el-button>-->
                </div>
                <div class="uploadContent-info">
                    <p>1、点击下载<span @click="downloadTemplate">《员工信息导入模板》</span></p>
                    <p>2、上传填写正确的员工信息导入模板</p>
                </div>
                <div class="uploadContent-btn">
                    <el-button type="success" @click="submitUpload">导入</el-button>
                    <el-button type="info" @click="centerDialogVisible = false">取消</el-button>
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
                <el-button slot="trigger" class="selectFile" style="padding-top: 10px;">
                    <svg-icon icon-class="select" style="width:14px;height:14px;vertical-align: -.1em;"/>
                    <span>选取文件</span>
                </el-button>
            </el-upload>
        </el-dialog>
        <!--导入失败回显数据-->
        <el-dialog title="错误数据" :visible.sync="listDialogVisible">
            <ErrorList :errorData="errorDatas"></ErrorList>
        </el-dialog>
        <!--数据列表-->
        <SimpleTable :tableData="tableDtats" @restData="dataList(initForm)" v-if="tableDtats.length" :BtnPermission="BtnPermission"></SimpleTable>
        <!--无数据样式-->
        <NoData  v-show="!tableDtats.length" ></NoData>
        <!--翻页器-->
        <Pagination v-show="tableDtats.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/8/3
     * @desc [用户管理] 页面
     * @module 组件引用位置
     */

    import { requestList,requestProject,requestFindGroup,requestFindProject,requestExports } from '@/api/system/user'
    import SimpleTable from  './components/Details'
    import ErrorList from  './components/ErrorList'
    import TempCache from '@/utils/tempcache'
    import comm from '@/utils/comm'
    import Pagination from '@/components/Pagination'
    import NoData from '@/components/NoData'

    export default{
        name:'user',
        data(){
            return {
                userId:'',
                fileList:[],    //导入数据
                centerDialogVisible:false,  //导入弹框
                listDialogVisible:false,    //导入失败返回数据展示
                currentPage: 1, //当前页码
                pageSize:10,    //表格每页容量
                total:500,      //表格总数
                initForm:{    //表头查询条件
                    realname:'',
                    username:'',
                    entryId:'',
                    page:1,
                    groupId:''
                },
                submitForm:{
                    realname:'',
                    username:'',
                    entryId:'',
                    page:1,
                    groupId:''
                },
                projectId:'',   //项目ID
                groupArrSel:[],
                projectOptions: [],     //项目请求集合
                groupOptions: [],       //小组请求集合
                tableDtats:[],  //表格数据！
                parentId:'',
                selectSel:false,
                errorDatas:[],    //导入错误返回数据展示
                totalPages:'',
                flag:false,
                BtnPermission:[]
            }
        },
        components:{
            SimpleTable,
            ErrorList,
            Pagination,
            NoData
        },
        methods:{
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
            },
            jumpPage(value){
                this.submitForm.page = value;
                Object.assign(this.initForm,this.submitForm);
                this.dataList(this.submitForm);
            },
            exportExcel(){
                requestExports(this.initForm).then(res=>{
                    if(res && res.data){
                        window.location.href= process.env.BASE_API + `/admin/bpoUser/excelSysMangeExport?realname=${this.initForm.realname}&username=${this.initForm.username}&entryId=${this.initForm.entryId}&page=${this.initForm.page}&userId=${this.userId}`;
                    }else{
                        comm.warnRemid(this,'请求报错')
                    }
                })
            },
            downloadTemplate(){
                window.location.href= process.env.BASE_API + `/admin/bpoUser/dowloadUserModel`;
            },
            beforeAvatarUpload(file){
                const isLt5M = file.size / 1024 / 1024 < 5;
                if(!isLt5M){
                    comm.warnRemid(this,'上传文件不能大于5M');
                    return false
                }
                let reg = /.xlsx|.xls/;
                if(!reg.test(file.name)){
                    comm.warnRemid(this,'请导入正确的模板');
                    return false
                }
            },
            //导入成功回调
            uploadSuccess(res){
                if(res && res.data){
                    if(res.data.length){
                        this.errorDatas = res.data;
                        this.centerDialogVisible = false;
                        setTimeout(()=>{this.listDialogVisible = true;},500);
                        //console.log('导入回调有失败');
                        //console.log(this.errorDatas)
                    }else{
                        comm.successRemid(this,'导入成功');
                        this.dataList();
                        this.centerDialogVisible = false;
                    }
                }else{
                    comm.warnRemid(this,'导入失败!');
                    this.centerDialogVisible = false;
                }
            },
            //导入失败回调
            uploadError(err){
                console.log('导入失败，请查看网络')
            },
            //导入请求地址
            uploadUrl(){
                let url = process.env.BASE_API + "/admin/bpoUser/importUserExcel";
                return url;
            },
            //导入上传
            submitUpload(){
                this.$refs.upload.submit();
            },
            //搜索列表内容
            searchBtn(){
                this.flag = true;
                this.initForm.page = 1;
                Object.assign(this.submitForm,this.initForm);
                this.dataList(this.initForm);
            },
            //选择项目下拉框
			projectSel(selVal){
				//如果小组没选,则把项目id赋值给entryId
				// if(this.initForm.groupId==''){
				//
				// }
                this.initForm.entryId = selVal
				if(selVal!=''){
					this.groupArrSel = [];
					this.groupOptions=[];
					this.initForm.groupId='';    //清空小组值
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
					this.groupOptions.splice(0,0,{id:'',parentId:'',name:'请选择'})
				}else{
					this.initForm.groupId='';
					this.groupOptions= TempCache.getItem('groupList');
				}

			},
			//选择小组下拉框
			groupSel(selVal){
				this.initForm.groupId = selVal;
				if(selVal!=''){
					//选择项目时候,展示出来对应的小组s
					for(var i = 0;i<this.groupOptions.length;i++){
						if(this.groupOptions[i].id==selVal){
							for(var k = 0;k<this.projectOptions.length;k++){
								if(this.projectOptions[k].id==this.groupOptions[i].parentId){
									this.projectId = this.projectOptions[k].name;
									this.initForm.entryId = this.projectOptions[k].id;
									 return
								}
							}
						}
					}
				}

			},
            //列表数据请求
            dataList(data){
                requestList(data).then(res=>{
                    if(res && res.data){
                        let data = res.data;
                        this.total = data.total;
                        this.pageSize = data.size;
                        this.totalPages = data.pages;
                        this.currentPage = data.current;
                        this.tableDtats = data.records;
                        // this.tableDtats.map((val,index)=>{
                        //     console.log(val,6666)
                        //     if(val.roleName.length>10){
                        //         val.roleName = val.roleName.substr(0,10)+'...'
                        //     }
                        //     if(val.entry.length>10){
                        //         row.entry = row.entry.substr(0,10)+'...';
                        //     }
                        //     if(val.group.length>10){
                        //         row.group = row.group.substr(0,10)+'...';
                        //     }
                        // })
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //项目下拉框数据请求
            projectList(){
				requestProject({type: 2}).then(res => {
				    if(res && res.data && res.data.data.length){
                       this.projectOptions = res.data.data;
                       this.projectOptions.splice(0,0,{id:'',name:'请选择'})
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
                       this.groupOptions.splice(0,0,{id:'',name:'请选择'})
                        TempCache.setItem('groupList', this.groupOptions)
                    }
				}).catch(error => {
					//console.log(error, 222)
				})
            },
            //翻页方法
            handleCilck(val){
                this.submitForm.page = val;
                Object.assign(this.initForm,this.submitForm);
                this.dataList(this.submitForm);
            }
        },
        mounted(){
            this.userId = TempCache.getItem('userId');
            console.log(this.userId,11111111111)
            this.BtnPermission = TempCache.getItem('用户管理');
            this.dataList();
            this.projectList();
            this.groupList();
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

<style rel="stylesheet/scss" lang="scss" >
    .usermanage{
        border:1px solid #E9F1F3;
        .selectFile{
            position: absolute;
            left: 150px;
            right: 0;
            top: 70px;
        }
        .uploadContent{
            margin-left: 60px;
            .uploadContent-select{
                .el-button{
                    margin-left:30px;
                }
                margin-bottom: 38px;
            }
            .uploadContent-info{
                color: #666;
                p{
                    line-height: 25px;
                }
                span{
                    color:#11A0F8;
                    cursor: pointer;
                }
            }
            .uploadContent-btn{
                margin:20px 15px;
                .el-button{
                    margin:0 15px;
                }
            }
        }
        .demo-form-inline{
            overflow: auto;
        }
        .el-form{
            padding:15px 20px;
             .el-form-item{
                 width:152px;
                 margin-right: 14px;
                 margin-bottom: 0px;
                 .el-form-item__label{
                     color:#333;
                     font-size:12px;
                     padding-right:8px;
                 }
                 .el-form-item__content{
                     width:120px;
                 }
             }
            .search,.inquire,.importBtn,.exportBtn{
                margin-right:8px;
                width:70px;
                .el-form-item__content{
                    width:70px;
                    button{
                        width:70px;
                        border:0;
                    }
                    .el-button{
                        padding:12px auto;
                        &:hover{
                            opacity: 0.7;
                        }
                    }
                    span{
                        color:#fff;
                    }
                }
            }
            .search{
                .el-form-item__content{
                    .el-button{
                        background: #11A0F8;
                    }
                }
            }
            .inquire{
                .el-form-item__content{
                    .el-button{
                        background: #4A90E2;
                    }
                }
            }
            .importBtn{
                .el-form-item__content{
                    .el-button{
                        background: #00C4AB;
                    }
                }
            }
            .exportBtn{
                .el-form-item__content{
                    .el-button{
                        background: #55CE63;
                    }
                }
            }
        }
    }
</style>
