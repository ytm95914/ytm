<template>
    <section class="LeaveManagement">
        <div class="querybar">
            <div class="leftinput">
                <PublicDatePicker @startTime="gteStartTime"  @endTime="getEndTime"></PublicDatePicker>
                <span>项目：</span>
                <div class="input_select">
                    <el-select v-model="formInline.projectID" placeholder="请选择"  @change='projectSel'>
                        <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id" :class="{selected:formInline.projectID==item.name}"></el-option>
                    </el-select>
                </div>
                <span>小组：</span>
                <div class="input_select">
                    <el-select v-model="formInline.groupID" placeholder="请选择" @change='groupSel'>
                        <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id" :class="{selected:formInline.groupID==item.name}"></el-option>
                    </el-select>
                </div>
                <span>姓名：</span>
                <div class="input_select">
                    <el-input placeholder="请输入" v-model="formInline.name" clearable></el-input>
                </div>
            </div>
            <div class="Buttongroup">
                <el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
                <el-button type="primary3"  size="small" @click="exportTableFac"style="background:#55CE63;color:#ffffff;" v-if="BtnPermission.includes('导出')" >
                    <svg-icon icon-class="export" style="width: 14px;height: 14px;margin-right: 5px;" />导出
                </el-button>
            </div>
        </div>
        <!--公共表格-->
        <!-- <PublicTbale :tableDatad="tableDtats" :tableHead="tableHead" :tableOperation="tableOperation" @getOperation="getOperation"></PublicTbale> -->
        <el-table :header-cell-style="getRowClass" stripe :data="tableDtats" style="width: 100%" >
            <el-table-column fixed prop="realname" label="姓名" width="135">
            </el-table-column>
            <el-table-column fixed prop="username" label="工号" width="135">
            </el-table-column>
            <el-table-column prop="type" label="请假类型" width="170">
            </el-table-column>
            <el-table-column prop="create_time" label="申请日期" width="170" >
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间" width="160">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="160">
            </el-table-column>
            <el-table-column prop="leave_time" label="时长" width="130">
            </el-table-column>
            <el-table-column prop="approval" label="审核状态" width="160">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <!-- <el-button @click="getOperation(scope.row)" v-if="scope.row.approval !='待审核' || scope.row.approval =='待审核' && roleId > 5 " type="text" >查看详情</el-button> -->
                    <!-- 先判断该角色时是否是主管级以上，roliD > 5  是组长员工，<= 5 是主管及以上 。-->
                    <!-- 如果该角色是组长或员工就是 '查看详情' ，如果是主管及以上并且状态不是待审批就是查看详情 -->
                    <el-button @click="getOperation(scope.row)" v-if="roleId > 5 || scope.row.approval !='待审核' && roleId <= 5 " type="text" >查看详情</el-button>
                    <el-button @click="getOperation(scope.row)" v-else type="text">审批</el-button>
                    <!-- <el-button @click="getOperation(scope.row)" v-else="scope.row.approval !='待审核' && roleId > 5" type="text" >查看详情</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <!--暂无数据-->
        <NoData v-show="!tableDtats.length"></NoData>

        <!--翻页器-->
        <Pagination v-show="tableDtats.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
        <!-- 请假弹窗 -->
        <el-dialog title="请假审批" :visible.sync="dialogVisible" width="60%" :lock-scroll="false" center>
            <p class="title" v-for="(item,index) in leaveList">
                <span class="item">{{ item.item}} :
                    <span class="key">{{ item.key }}</span>
                </span>
            </p>
            <p class="one">
                <span class="item">请假事由：
                    <span class="key">{{ newLeaveTime}}</span>
                </span>
            </p>
            <p class="one item">排班详情：</p>
            <div class="leaveTable">
                <el-table :data="tableData" style="width: 100%" :header-cell-style="getRowClass">
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="shiftsName" label="班次" width="180">
                    </el-table-column>
                    <el-table-column prop="projectName" label="项目">
                    </el-table-column>
                    <el-table-column prop="groupName" label="小组">
                    </el-table-column>
                </el-table>
            </div>
            <p class="file title">
                <span>附件：
                    <span style="color:rgb(17, 160, 248)" @click="downloadBtn">附件</span>
                </span>
            </p>
            <span slot="footer" class="dialog-footer" v-show="isShow">
                <el-button type="success" @click="adopt">通过</el-button>
                <el-button type="danger" @click="refuse">拒绝</el-button>
                <el-button type="info" @click="cancel">取 消</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
    // import PublicTbale from "@/components/PublicTbale/SimpleTable";
    import Pagination from '@/components/Pagination'
    import PublicDatePicker from './components/PublicDatePicker'
    import {
        leaveManagement,
        options,
        subject,
        leaveInfo
    } from "@/api/attendance/myAttendance";
    import TempCache from "@/utils/tempcache";
    import NoData from '@/components/NoData'
    import commdate from "@/utils/commdate";
    
    export default {
        name: "overtimemanagement",
        data() {
            return {
                isRole:false,//角色
                name: "",
                startTime: "",
                endTime: "",
                dialogVisible: false,
                projectList: [],
                projectID: "",
                groupList: [],
                groupID: "",
                isShow: false, //弹窗按钮
                userId: "", //姓名id
                start: "", //弹窗开始时间
                end: "", //弹窗结束时间

                //当前页数
                currentPage: 1,
                //总数
                total: 1,
                //显示几条数据
                pageSize: 10,
                totalPages:'',
                value: 1,

                formInline:{    //表头查询条件
                    groupID: '',
                    projectID: '',
                    startTime: '',
                    endTime: '',
                    name: '',
                    page: 1
                },
                submitForm:{
                    groupID: '',
                    projectID: '',
                    startTime: '',
                    endTime: '',
                    name: '',
                    page: 1
                },
                groupArrSel:[],
                leaveList: [], //弹窗详情
                newLeaveTime:'',
                // 弹窗列表title
                // leaveTitle: [
                //     { label: "日期", fixed: false, prop: "date" },
                //     { label: "项目", fixed: false, prop: "projectName" },
                //     { label: "小组", fixed: false, prop: "groupName" },
                //     { label: "班次", fixed: false, prop: "shiftsName" }
                // ],
                // 弹窗列表centent
                tableData: [],
                // 页面列表title
                // tableHead: [
                //     { label: "姓名", prop: "realname"},
                //     { label: "工号",  prop: "username" },
                //     { label: "请假类型", prop: "type" },
                //     { label: "申请日期", prop: "create_time", format:res=>res.create_time.substr(0,10)},
                //     { label: "开始时间", prop: "start_time",width:160},
                //     { label: "结束时间", prop: "end_time",width:160},
                //     { label: "时长",  prop: "leave_time", width:80},
                //     { label: "审核状态", prop: "approval" }
                // ],
                // 页面列表centent
                tableDtats: [],
                tableOperation: [
                    { operation: "查看详情", type: "view"},
                    { operation: "审批", type: "update" }
                ],
                BtnPermission: [],
                roleId:[],
            };
        },
        components: {
            // PublicTbale,
            PublicDatePicker,
            NoData,
            Pagination
        },
        methods: {
            // 获取开始时间
            gteStartTime(val){
                this.formInline.startTime = val;
            },
            // 获取结束时间
            getEndTime(val){
                this.formInline.endTime = val;
            },
            // 表头颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return "background:#92A6B1;color:#fff";
                } else {
                    return "";
                }
            },
            // 弹窗
            getOperation(data) {
                // console.log(data,"弹窗信息")
                this.dialogVisible = true;
                let info = data
                this.userId = info.id;
                // if(this.roleId <= 5){
                //     this.isShow = false;
                // }else{
                //     if(info.approval == "待审核"){
                //         this.isShow = true;
                //     }else{
                //         this.isShow = false;
                //     }
                // }
                // if(this.roleId == false){
                //     this.isShow = false;
                // }else{
                //    if (info.approval == "待审核") {
                //         this.isShow = true;
                //     } else {
                //         this.isShow = false;
                //     }
                // }
                if (info.approval == "待审核" && this.roleId <=5 ) {
                        this.isShow = true;
                    } else {
                        this.isShow = false;
                    }
                leaveInfo({id:data.id}).then(res => {
                        let data = res.data.data;
                        // console.log(data,"999");
                        this.leaveList = [
                            { item: "姓名", key: data.name },
                            { item: "请假时长", key: data.leaveTime + "h" },
                            { item: "工号", key: data.userName },
                            { item: "请假类型", key: data.type},
                            { item: "手机", key: data.phone },
                            { item: "请假时间", key: data.startTime+'-'+data.endTime },
                        ];
                        this.newLeaveTime= data.leaveReason
                        this.start = data.startTime;
                        this.end = data.endTime;
                        this.tableData = data.shifts
                    })
                    .catch(error => {
                        // console.log(error + "错误");
                    });
            },

             /*翻页*/
            handleCilck(val){
                this.submitForm.page = val;
                Object.assign(this.formInline,this.submitForm);
                this.pageInfo(this.submitForm);
            },
            jumpPage(value){
                this.submitForm.page = value;
                Object.assign(this.formInline,this.submitForm);
                this.pageInfo(this.submitForm);
            },
            /*查询*/
            query() {
                this.formInline.page = 1;
                Object.assign(this.submitForm,this.formInline);
                this.pageInfo(this.formInline);
            },
            // formatoutStart(row){
            //     if(row.start_time){
            //         return row.start_time.substr(11,8);
            //     }
            // },
            // formatoutEnd(row){
            //     if(row.end_time){
            //         return row.end_time.substr(11,8);
            //     }
            // },
            pageInfo(data) {
                leaveManagement(data).then(res => {
                    if(res && res.data.records && res.data.records.length){
                        // console.log(res,'数据获取')
                        this.tableDtats = res.data.records;
                        this.total = res.data.total;
                        this.totalPages = res.data.pages;
                        // this.tableDtats.forEach(items => {
                        //     items.end_time = formatoutDate(items.end_time)
                        //     items.start_time=
                        // })
                    }else{
                        this.tableDtats =[]
                        this.total = 1
                        this.totalPages = 1
                    }

                    })
                    .catch(error => {
                        console.log(error + "错误");
                    });
            },
            // 导出
            exportTableFac() {
                this.userId = TempCache.getItem("userId");
                window.location.href =
                    process.env.BASE_API +
                    `/admin/bpoLeaveApply/findLeaveApplyListExcExport?userId=${this.userId}&groupID=${this.submitForm.groupID}&startTime=${this.submitForm.startTime}&endTime=${this.submitForm.endTime}&name=${this.submitForm.name}`;
            },
            // 项目
            department() {
                let data = {type: 2};
                options(data).then(res => {
                        if(res && res.data && res.data.data){
                            this.projectList = res.data.data;
                               this.projectList.splice(0,0,{id:'',name:'请选择'})
                               TempCache.setItem('projectList', this.projectList)
                        }
                    })
                    .catch(error => {
                        // console.log(error + "错误");
                    });
            },
            // 小组
            classes() {
                let data = {type: 3};
                options(data).then(res => {
                        if(res && res.data && res.data.data){
                            this.groupList = res.data.data;
                               this.groupList.splice(0,0,{id:'',parentId:'',name:'请选择'})
                               TempCache.setItem('groupList', this.groupList)
                        }
                    })
                    .catch(error => {
                        // console.log(error + "错误");
                    });
            },
            //选择项目下拉框
            projectSel(selVal) {
                this.formInline.projectID = selVal
                if(selVal != '') {
                    this.groupArrSel = []
                    this.groupList = []
                    this.formInline.groupID = '' //清空小组值id
                    //重新获取小组数据
                    let list = TempCache.getItem('groupList');
                    //选择项目时候,展示出来对应的小组
                    for(var i = 0; i < list.length; i++) {
                        if(list[i].parentId == selVal) {
                            this.groupArrSel.push({
                                id: list[i].id,
                                name: list[i].name,
                                parentId: list[i].parentId
                            })
                        }

                    }
                    this.groupList = this.groupArrSel
                    this.groupList.splice(0, 0, {
                        id: '',
                        parentId: '',
                        name: '请选择'
                    })
                } else {
                    this.formInline.projectID = ''
                    this.groupList = TempCache.getItem('groupList');
                }
            },
            //选择小组下拉框
            groupSel(selVal) {
                this.formInline.groupID = selVal
                //选择项目时候,展示出来对应的小组
                if(selVal != '') {
                    for(var i = 0; i < this.groupList.length; i++) {
                        if(this.groupList[i].id == selVal) {
                            for(var k = 0; k < this.projectList.length; k++) {
                                if(this.projectList[k].id == this.groupList[i].parentId) {
                                    this.formInline.projectID = this.projectList[k].id
                                    return
                                }
                            }
                        }
                    }
                }

            },

            // 通过
            adopt() {
                let data = {id: this.userId, approval: 1};
                subject(data).then(res => {
                        // console.log(res, "通过1");
                    })
                    .catch(error => {
                        // console.log(error + "错误");
                    });
                this.dialogVisible = false;
                this.pageInfo();
            },
            // 拒绝
            refuse() {
                let data = {id: this.userId, approval: 2};
                subject(data).then(res => {
                        // console.log(res, "拒绝2");
                    })
                    .catch(error => {
                        // console.log(error + "错误");
                    });
                this.dialogVisible = false;
                this.pageInfo();
            },
            cancel() {
                this.dialogVisible = false;
            },
            downloadBtn(){}
        },
        mounted() {
            this.BtnPermission = TempCache.getItem('请假管理');
            this.roleId = TempCache.getItem('userRole').role[0].id;
            // console.log(this.roleId,"id")
            // if(this.roleId <= 5){
            //     this.isRole = true;
            // }else{
            //     this.isRole = false;
            // }
            // if(this.roleId){
            //     this.roleId.map((val,index)=>{
            //         console.log(val.id)
            //         if(val.id <=5 ){
            //             this.isRole = true;
                        
            //         }else{
            //             this.isRole = false;
                       
            //         }
            //     })
            // }
            var newDate = new Date()
            this.formInline.endTime = commdate.timestampToTime(newDate);
            this.formInline.startTime= this.formInline.endTime.substr(0,7)+'-01'
            this.pageInfo(this.formInline);
            this.department();
            this.classes();
        }
    };
</script>

<style lang="scss" scoped>
.paging {
    text-align: center;
}
/* .el-range-editor.el-input__inner {
    height: 36px;
    box-sizing: border-box;
} */
.fl {
    float: left;
}
.LeaveManagement {
    border: 1px solid #e9f1f3;
    box-sizing: border-box;
    .querybar {
        margin-bottom: 10px;
        height: 40px;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
}

.querybar span {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 20px;
    color: #333333;
}
/* .el-input--mini {
  font-size: 12px;
  width: 130px;
} */
.leftinput {
    float: left;
    margin-bottom: 10px;
    width: 83%;
}
.el-input--mini .el-input__inner {
    height: 36px;
    line-height: 36px;
}
.Buttongroup {
    float: right;
}
.el-button--primary1 {
    background: #4a90e2;
    color: #ffffff;
}
.el-button--primary1:focus,
.el-button--primary1:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}
.el-button--primary2 {
    background: #00c4ab;
    color: #ffffff;
}
.el-button--primary2:focus,
.el-button--primary2:hover {
    background: #00c4a9a6;
    border-color: #66b1ff;
    color: #fff;
}
.el-button--primary3 {
    background: #55ce63;
    color: #ffffff;
}
.el-button--primary3:focus,
.el-button--primary3:hover {
    background: #55ce63ba;
    border-color: #66b1ff;
    color: #fff;
}
/* input select 样式 */
.input_select {
    float: left;
    width: 13.5%;
}
.querybar span {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 10px;
    color: #333333;
    display: block;
    float: left;
    margin-top: 11.8px;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
    width: 220px;
    height: 36px;
}
div el-date-editor .el-range-input,
.el-date-editor .el-range-separator {
    font-size: 12px;
}
.el-input {
    font-size: 12px;
}
/* 请假详情弹窗 */
.title {
    line-height: 50px;
    display: inline-block;
    width: 49%;
    vertical-align: text-top;
}
.item {
    color: #000;
}
.key {
    color: #606266 !important;
}
.one {
    line-height: 50px;
}
/* h4{
    line-height: 50px;
} */
</style>
<style>
.el-date-editor .el-range-input {
    font-size: 12px;
}
.el-select > .el-input {
    display: block;
    font-size: 12px;
}
</style>
