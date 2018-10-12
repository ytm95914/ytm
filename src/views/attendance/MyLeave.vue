<template>
	<section class="maleave">
		<div class="querybar clearfix">
            <PublicDatePicker @startTime="gteStartTime"  @endTime="getEndTime"></PublicDatePicker>
			<div class="Buttongroup" style="float: right;">
				<el-button type="primary" icon="el-icon-search" @click="searchOvertime" style="padding: 11px;">查询</el-button>
				<el-button type="success" @click="exportTableFac" style="padding: 11px;" v-if="BtnPermission.includes('导出')">
					<svg-icon icon-class="export" style="width: 14px;height: 14px;vertical-align: middle;margin-right: 5px;" />导出
                </el-button>
			</div>
		</div>
		<!--表格-->
        <el-table :header-cell-style="getRowClass" stripe :data="tableData" style="width: 100%">
            <el-table-column prop="userName" label="工号">
            </el-table-column>
            <el-table-column prop="type" label="请假类型">
            </el-table-column>
            <el-table-column prop="createTime" label="申请日期">
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间"  width="200">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间"  width="200">
            </el-table-column>
            <el-table-column prop="leaveTime" label="时长">
            </el-table-column>
            <el-table-column prop="approval" label="审核状态">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text">详情</el-button>
                    <el-button @click="cancel(scope.row)" v-if="scope.row.approval == '待审核'" type="text" >撤销</el-button>
                </template>
            </el-table-column>
        </el-table>
        <NoData v-show="!tableData.length"></NoData>
        <!--翻页器-->
        <Pagination v-show="tableData.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
		<!-- 弹窗 -->
		<el-dialog title="请假详情" :visible.sync="dialogVisible" width="60%" :lock-scroll="false" center>
			<p class="title" v-for="(item,index) in leaveList">
                <span class="item">{{ item.item}} :
                    <span class="key">{{ item.key }}</span>
                </span>
            </p>
            <p class="one">
                <span class="item">请假事由：
                    <span class="key">{{ newLeaveTime }}</span>
                </span>
            </p>
			<p class="one">排班详情：</p>
			<div class="leaveTable">
				<el-table :data="tableDatas" style="width: 100%" :header-cell-style="getRowClass">
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
			<!-- <span slot="footer" class="dialog-footer">
				<el-button type="success" @click="adopt">通过</el-button>
				<el-button type="danger" @click="refuse">拒绝</el-button>
				<el-button type="info" @click="dialogVisible = false">取 消</el-button>
			</span> -->
		</el-dialog>
	</section>
</template>
<script>
import TempCache from "@/utils/tempcache";
import { tableList, timeCancel,leaveInfo } from "@/api/attendance/MyLeave";
import PublicDatePicker from './components/PublicDatePicker'
import Pagination from '@/components/Pagination'
import NoData from '@/components/NoData'
import commdate from "@/utils/commdate";
export default {
    name: "myleave",
    components: {
            PublicDatePicker,
            Pagination,
            NoData
        },
    data() {
        return {
            //当前页数
            currentPage: 1,
            //总数
            total: 1,
            //显示几条数据
            pageSize: 10,
            totalPages:'',
            value: 1,
             formInline:{    //表头查询条件
             	userId: TempCache.getItem("userInfo").id,
                  startTime: '',
					endTime: '',
					page: ''
                },
                submitForm:{
                	userId:TempCache.getItem("userInfo").id,
                   startTime: '',
					endTime: '',
					page: ''
                },
            tableData: [],
            startDate: "",
			endDate: "",
			dialogVisible:false,//弹窗
			leaveList:[],//类表详情
			newLeaveTime:'',
			// 弹窗列表title
            leaveTitle: [
                { label: "日期", fixed: false, prop: "date" },
                { label: "项目", fixed: false, prop: "projectName" },
                { label: "小组", fixed: false, prop: "groupName" },
                { label: "班次", fixed: false, prop: "shiftsName" }
			],
			start:"",//列表开始时间
			end:"",//列表结束时间
            // 弹窗列表centent
            tableDatas:[],
            BtnPermission: []
        };
    },
    methods: {
    	    // 获取开始时间
            gteStartTime(val){
                this.formInline.startTime = val;
                // console.log(val)
            },
            // 获取结束时间
            getEndTime(val){
                this.formInline.endTime = val;
                // console.log(val)
            },
		// 表头颜色
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return "background:#92A6B1;color:#fff";
            } else {
                return "";
            }
        },
        // 详情id
        handleClick(row) {
			this.dialogVisible = true;
			leaveInfo({id:row.id})
                .then(res => {
                    var data = res.data.data
                //  console.log(data,"999");
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
                        this.tableDatas = data.shifts
                })
                .catch(error => {
                    console.log(error + "错误");
                });
        },
        /*翻页*/
            handleCilck(val){
                this.submitForm.page = val;
                Object.assign(this.formInline,this.submitForm);
                this.tableListFac(this.submitForm);
            },
            jumpPage(value){
                this.submitForm.page = value;
                Object.assign(this.formInline,this.submitForm);
                this.tableListFac(this.submitForm);
            },
            /*查询*/
            searchOvertime() {
 				this.formInline.page = 1;
                Object.assign(this.submitForm,this.formInline);
                this.tableListFac(this.formInline);
            },
        //撤销
        cancel(row) {
            timeCancel({ id: row.id })
                .then(res => {
                    this.formInline.startTime = '';
                    this.formInline.endTime = '';
                    this.tableListFac(this.formInline);
                })
                .catch(error => {
                    console.log(error, 222);
                });
        },
        //导出
        exportTableFac() {
            window.location.href =
                process.env.BASE_API +
                `/admin/bpoLeaveApply/exportLeaveApplyList?userId=${this.userId}&startTime=${this.submitForm.startTime}&endTime=${this.submitForm.endTime}`;
        },
        //加载列表
        tableListFac(data) {
            //列表
            tableList(data)
                .then(response => {
                    if (
                        response &&
                        response.data &&
                        response.data.records.length
                    ) {
                        this.tableData = response.data.records;
                        this.total = response.data.total;
                        this.totalPages = response.data.pages;
                    }else{
                    	this.tableData =[]
                        this.total = 1
                        this.totalPages = 1
                    }
                })
                .catch(error => {
                    console.log(error, 222);
                });
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return {
                    background: "#92A6B1",
                    color: "#ffffff"
                };
            } else {
                return "";
            }
        }
    },
    mounted() {
        this.BtnPermission = TempCache.getItem('我的请假');
        this.userId = TempCache.getItem("userId");
        this.formInline.page = 1;
        var newDate = new Date()
        this.formInline.endTime = commdate.timestampToTime(newDate);
        this.formInline.startTime= this.formInline.endTime.substr(0,7)+'-01'
        this.tableListFac(this.formInline);
    }
};
</script>
<style lang="scss" scoped>
    .maleave{
        border: 1px solid #e9f1f3;
        .querybar {
            margin-bottom: 10px;
            height: 40px;
            margin-top: 20px;
            margin-left: 20px;
            margin-right: 20px;
        }
    }

.fl {
    float: left;
}

/* 请假详情弹窗 */
.title {
    line-height: 50px;
    display: inline-block;
    width: 49%;
    vertical-align: text-top;
}
.item,
.one {
    color: #000;
}
.key {
    color: #606266 !important;
}
.one {
    line-height: 50px;
}
</style>
