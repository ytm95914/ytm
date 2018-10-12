<template>
    <section class="maleave">
        <div class="querybar">
            <div class="leftinput">
                <PublicDatePicker @startTime="gteStartTime"  @endTime="getEndTime"></PublicDatePicker>
                <div style="float: left;margin-left: 5px;">
					<ProjectAndGroup @projectId='getProjectId' @groupId='getGroupId'></ProjectAndGroup>
			    </div>
                <!--<span>项目：</span>
                <div class="input_select">
                    <el-select v-model="projectID" placeholder="请选择" >
                        <el-option key="" label="请选择" value=""></el-option>
                        <el-option
                            v-for="item in projectData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <span>小组：</span>
                <div class="input_select">
                    <el-select v-model="groupID" placeholder="请选择" >
                        <el-option key="" label="请选择" value=""></el-option>
                        <el-option
                            v-for="item in groupData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>-->
                <span>申请人：</span>
                <div class="input_select">
                    <el-input
                        placeholder="请输入内容"
                        v-model="realname">
                    </el-input>
                </div>
            </div>
            <div class="Buttongroup">
                <el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
                <el-button type="primary3" size="small" @click="exportWord" style="background:#55CE63;color:#ffffff;" v-if="BtnPermission.includes('导出')" >
                    <svg-icon icon-class="export" style="width: 14px;height: 14px;margin-right: 5px;"/>导出
                </el-button>
                <div style="margin-bottom:10px;"></div>
                <el-button type="primary"  style="width:163px;" @click="overtimeArrangement">申请加班安排</el-button>
            </div>
        </div>
        <div>
            <SimpleTable :tableDatad="tableDtats" :tableHead="tableHead" @getOperation="getOperation"></SimpleTable>
            <!-- 表格空白页 -->
            <NoData v-show="!tableDtats.length"></NoData>
        </div>
        <!-- 加班详情弹窗 -->
        <!-- 加班申请 -->
        <el-dialog class="qjdialog"title="加班详情" :visible.sync="dialogFormVisible" :lock-scroll="false">
            <div class="item">
                <span class="item_title">项目：</span><span class="item_content">{{projectName}} </span>
            </div>
            <div class="item">
                <span class="item_title">班次：</span> <span class="item_content">{{shiftCodeName}}</span>
            </div>
            <div class="item">
                <span class="item_title">员工：</span> <span class="item_content">{{remarkOne}}</span>
            </div>
            <div class="item">
                <span class="item_title">手机：</span> <span class="item_content">{{phone}}</span>
            </div>
            <div class="item">
                <span class="item_title">加班时间：</span> <span class="item_content">{{workTime}}</span>
            </div>
            <div class="item">
                <span class="item_title">加班时长：</span> <span class="item_content">{{duration}}</span>
            </div>
            <div class="item">
                <span class="item_title">加班事由：</span> <span class="item_content">{{overtimeReason}}</span>
            </div>
            <div slot="footer" class="dialog-footer center" v-show="isShow">
                <el-button type="success" @click="adopt">通过</el-button>
                <el-button type="danger" @click="refuse">拒绝</el-button>
                <el-button type="info" @click="dialogFormVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            </div>
        </el-dialog>
        <!--翻页器-->
        <div class="block" v-show="tableDtats.length"><!-- v-if="total.length>10000" -->
            <el-pagination
                @current-change="handleCurrentChange"
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
    </section>
</template>
<script>
    import SimpleTable from './components/SimpleTable'
    import PublicDatePicker from './components/PublicDatePicker'
    import NoData from '@/components/NoData'
    import { findOverTimeListLeader,projectData,groupData,agreeOverTime,disAgreeOverTime,selectBpoOverTimeById } from '@/api/attendance/Attendance'
    import TempCache from "@/utils/tempcache"
    import ProjectAndGroup from '@/components/ProjectAndGroup'
    import commdate from '@/utils/commdate'

    export default {
        name:'overtimemanagement',
        data(){
            return {
                duration:'',//加班时长
                overtimeReason:'',//加班原因
                phone:"",//手机
                projectName:'',//部门
                remarkOne:'',//员工
                shiftCodeName:'',//班次
                workTime:'',//加班时间
                dialogFormVisible:false,
                startDate:'',
                endDate :'',
                projectID :'',
                groupID : '',
                realname :'',
                projectData:'',
                groupData:'',
                tableHead:[//0:待审批,1已通过;2:拒绝;3:已撤销'

                            {label:'项目',fixed:true,prop:'projectName',width:"150"},
                            {label:'小组',fixed:true,prop:'groupName',width:"150"},
                            {label:'班次',fixed:false,prop:'shiftsCodeName',width:"200"},
                            {label:'申请人',fixed:false,prop:'realname',width:"200"},
                            {label:'工号',fixed:false,prop:'username',width:"100"},
                            {label:'加班人员',fixed:false,prop:'remarkOne',width:"200"},
                            {label:'申请日期',fixed:false,prop:'overtimeDate',width:"150"},
                            {label:'开始时间',fixed:false,prop:'startTime',width:"170"},
                            {label:'结束时间',fixed:false,prop:'endTime',width:"170"},
                            {label:'时长',fixed:false,prop:'duration',width:"100"},
                            {label:'审核状态',fixed:false,prop:'statusStr',width:"100"},
                            {label:'操作',fixed:'right',prop:'operation',width:"200"},
                            ],
                tableDtats:[],
                currentPage: 1, // 当前
                pageSize: 1,//当前页条数
                total: 1,//总条数
                requestPages:1,
                value:1,
                BtnPermission: [],
                isShow:'',//弹窗是否显示操作按钮
                id:"",//通过拒绝id
                roleId:"",//角色id
            }
        },
        components:{
            SimpleTable,
            PublicDatePicker,
            NoData,
            ProjectAndGroup
        },
        methods:{
        	getProjectId(val){
				this.projectID=val
            },
            getGroupId(val){
            	this.groupID=val
            },
            // 获取开始时间
            gteStartTime(val){
                this.startDate = val;
            },
            // 获取结束时间
            getEndTime(val){
                this.endDate = val;
            },
            getOperation(data){
                console.log(data,"hahah")
                var info = data.dataInfo
                // if(this.roleId <= 5){

                // }
                if(info.statusStr == "待审批" && this.roleId <= 5){
                    this.isShow = true;
                }else{
                    this.isShow = false;
                }
                this.operationHandle(data);
                this.id = info.id;
            },
            // 弹窗操作按钮   通过
            adopt(){
                agreeOverTime({id:this.id}).then(response => {
                        if(response && response.data){
                            this.startDate = '';
                            this.endDate = '';
                            this.init();
                        }
                    }).catch(error => {
                        console.log(error, 222)
                    });
                this.dialogFormVisible = false;
                // this.init();
            },
            // 弹窗操作按钮    拒绝
            refuse(){
                disAgreeOverTime({id:this.id}).then(response => {
                        if(response && response.data ){
                            this.startDate = '';
                            this.endDate = '';
                            this.init();
                        }
                    }).catch(error => {
                        console.log(error, 222)
                    });
                this.dialogFormVisible = false;
                // this.init();
            },
            operationHandle(data){
                if(data.operation == 'details'){
                    //跳转到加班详情
                    selectBpoOverTimeById({id:data.dataInfo.id}).then(response => {
                        if(response && response.data && Object.keys(response.data.data).length){
                         this.duration = response.data.data.duration;
                         this.overtimeReason  = response.data.data.overtimeReason;
                         this.phone = response.data.data.phone;
                         this.projectName = response.data.data.projectName;
                         this.remarkOne = response.data.data.remarkOne;
                         this.shiftCodeName = response.data.data.shiftCodeName;
                         this.workTime = response.data.data.workTime;
                         this.dialogFormVisible = true;
                        }
                    }).catch(error => {
                        console.log(error, 222)
                    });
                }

            },
            handleCurrentChange(val) {
                /*翻页*/
                this.requestPages = val;
                this.init();
            },
            jumpPage(){
                if(this.value == this.currentPage){
                    return false;
                }else{
                    let value = Number(this.value);
                    if(value>this.requestPages){
                        value = this.requestPages;
                    }
                    this.currentPage = value;
                    this.value = value;
                    this.init();
                }
            },
            overtimeArrangement(){
                this.$router.push({path: `/attendance/overtimeap`})
            },
            filteringData(data) {
                var newArr=this.arrCopy(data);
                var _this = this
                newArr.forEach(function(item,index){
                    if(item.status == 0){
                        // this.isShow = true;
                        if(_this.roleId <= 5){
                            item.operation= [
                            {operation:'审批',type:'details'},
                        ]
                        }else{
                            item.operation= [
                            {operation:'查看详情',type:'details'},
                        ]
                        }
                        
                        // console.log(this,"this")
                    }else if(item.status == 1){
                        // this.isShow = false;
                        item.operation= [
                            {operation:'查看详情',type:'details'},
                        ]
                        
                    }else if(item.status == 2){
                        // this.isShow = false;
                        item.operation= [
                            {operation:'查看详情',type:'details'},
                        ]
                    }else{
                        // this.isShow = false;
                        item.operation= [
                            {operation:'查看详情',type:'details'},
                        ]
                        
                    };
                });
                return newArr;
            },
            prepareData(){
                var data={
                    startDate : this.startDate,
                    endDate : this.endDate,
                    realname : this.realname,
                    projectID : this.projectID,
                    groupID : this.groupID,
                    page:this.requestPages
                }
                return data;
            },
            timeString(obj){
                if(obj){
                    return obj.getFullYear()+'-'+this.numberTostr(Number(obj.getMonth() + 1))+'-'+this.numberTostr(obj.getDate());
                }else{
                    return '';
                }

            },
            arrCopy(arr) {
                return arr.slice(0);
            },
            numberTostr(n){
                //queryDate参数处理，例如将2018-5-8处理成2018-05-08；否则后台报错！
                if(n < 10){
                    return '0'+n;
                }else{
                    return n;
                }

            },
            init(){
                findOverTimeListLeader(this.prepareData()).then(response => {
                    if(response && response.data && response.data.records.length){
                       var filterData = this.filteringData(response.data.records[0]);
                    //    console.log(response.data.records,'请假列表数据')
                       this.tableDtats = filterData;
                   }
                }).catch(error => {
                    console.log(error, 222)
                });
            },
            query(){
                this.init();
            },
            exportWord(){

                findOverTimeListLeader(this.prepareData()).then(response => {
                    if(response && response.data && response.data.records.length){
                        var startDate = this.prepareData().startDate;
                        var endDate = this.prepareData().endDate;
                        var realname = this.prepareData().realname;
                        var projectID = this.prepareData().projectID;
                        var groupID = this.prepareData().groupID;

                       window.location.href= process.env.BASE_API + `/admin/bpoOvertime/exportFindOverTimeLeaderList?startDate=${startDate}&endDate=${endDate}&userId=1`;
                   }
                }).catch(error => {
                    console.log(error, 222)
                });
            },
        },
        watch:{
            startDate(val){
                this.startDate = val;
                // console.log(val)
            }
        },
        mounted(){
            this.BtnPermission = TempCache.getItem('加班管理');
            this.roleId = TempCache.getItem('userRole').role[0].id;
            // startDate:'',
            //     endDate :'',
            var newDate = new Date()
			this.endDate = commdate.timestampToTime(newDate);
			this.startDate= this.endDate.substr(0,7)+'-01'    
            this.init();
             projectData({type:2}).then(response => {
                if(response && response.data.data && response.data.data.length){
                    this.projectData = response.data.data;
                }
             }).catch(error => {
                 console.log(error, 222)
             });
             groupData({type:3}).then(response => {
                if(response && response.data.data && response.data.data.length){
                    this.groupData = response.data.data;
                }
             }).catch(error => {
                 console.log(error, 222)
             });
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .maleave {
        .input_select{
            .el-date-editor.el-input, .el-date-editor.el-input__inner{
                width: auto;
                font-size: 12px;
            }
            .el-input{
                font-size: 12px;
            }
        }
        .projectandgroup .selectbox{
                width: 148px;
                span {
                    padding-right: 0px;
                }
        
        }
        
    }
</style>
<style scoped>
.center {
        text-align: center;
    }
.item_content {
    font-size: 14px;
    color: #666666;
    padding-left: 10px;
}
.item_title {
    font-size: 14px;
    color: #333333;
}
.item {
    margin: 20px;
}
.paging {
    text-align: center;
  }

.fl {
    float: left;
}
.maleave {
    border: 1px solid #E9F1F3;
    box-sizing: border-box;
    /* padding-top: 20px; */
}
.querybar{
    margin-bottom: 10px;
    height: 40px;
    margin-top: 20px;
    margin-left: 20px;
}
.querybar span{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 20px;
    color: #333333;
}
.leftinput {
    float: left;
    margin-bottom: 10px;
    width: 83%;
}

.Buttongroup {
    float: right;
    padding-right: 10px;
    padding-bottom: 10px;
}
/* input select 样式 */
.input_select {
    float: left;
    width: 13%;
}
.querybar span{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 10px;
    color: #333333;
    display: block;
    float: left;
    margin-top: 11.8px;
}
</style>
