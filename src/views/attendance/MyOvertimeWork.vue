<template>
	<section class="maleave">
		<div class="querybar clearfix">
			<div class="block fl">
				<PublicDatePicker @startTime="gteStartTime"  @endTime="getEndTime"></PublicDatePicker>
			</div>
			<div class="Buttongroup" style="float: right;">
				<el-button type="primary" icon="el-icon-search" @click="searchOvertime" style="padding: 11px;">查询</el-button>
				<el-button type="success" @click="exportTableFac" style="padding: 11px;" v-if="BtnPermission.includes('导出')">
					<svg-icon icon-class="export" style="width: 14px;height: 14px;vertical-align: middle;margin-right: 5px;" />导出
                </el-button>
			</div>
		</div>
		<!--表格-->
        <el-table :header-cell-style="getRowClass" stripe :data="tableData" style="width: 100%" >
            <el-table-column fixed prop="projectName" label="项目" width="135">
            </el-table-column>
            <el-table-column fixed prop="groupName" label="小组" width="135">
            </el-table-column>
            <el-table-column prop="shiftsCodeName" label="班次" width="170">
            </el-table-column>
            <el-table-column prop="realname" label="申请人" width="170" :formatter="formatRealname">
            </el-table-column>
            <el-table-column prop="username" label="工号" width="130">
            </el-table-column>
            <el-table-column prop="overtimeDate" label="申请日期" width="130">
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="160">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="160">
            </el-table-column>
            <el-table-column prop="duration" label="时长">
            </el-table-column>
            <el-table-column prop="statusStr" label="审核状态">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text">查看详情</el-button>
                    <el-button @click="cancel(scope.row)" v-if="scope.row.status == 0 && scope.row.username == username" type="text" >撤销</el-button>
                </template>
            </el-table-column>
        </el-table>
        <NoData v-show="!tableData.length"></NoData>
        <!--翻页器-->
        <Pagination v-show="tableData.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
		<el-dialog title="加班详情" :visible.sync="dialogVisible" width="500px" class="colorStyle" :lock-scroll="false">
			<el-form  status-icon  label-width="100px" class="demo-ruleForm">
				<el-form-item label="小组:" v-if="this.roleId>5">
					<span style="color: #666;">{{overTimeForm.groupName}}</span>
				</el-form-item>
				<el-form-item label="班次:" v-if="this.roleId>5">
					<span style="color: #666;">{{overTimeForm.shiftCodeName}}</span>
				</el-form-item>

				<el-form-item label="项目:" v-if="this.roleId == 5 || this.roleId == 4">
					<span style="color: #666;">{{overTimeForm.projectName}}</span>
				</el-form-item>
				<el-form-item label="小组:" v-if="this.roleId == 5 || this.roleId == 4">
					<span style="color: #666;">{{overTimeForm.groupName}}</span>
				</el-form-item>

				<el-form-item label="项目:" v-if="this.roleId<4">
					<span style="color: #666;">{{overTimeForm.projectName}}</span>
				</el-form-item>

				<el-form-item label="员工:">
					<span style="color: #666;">{{overTimeForm.remarkOne}}</span>
				</el-form-item>
				<el-form-item label="手机:">
					<span style="color: #666;">{{overTimeForm.phone}}</span>
				</el-form-item>
				<el-form-item label="加班时长:">
					<span style="color: #666;">{{overTimeForm.duration}}</span>
				</el-form-item>
				<el-form-item label="加班事由:">
					<span style="color: #666;">{{overTimeForm.overtimeReason}}</span>
				</el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>
<script>
	import TempCache from '@/utils/tempcache'
	import { mapGetters, mapActions } from 'vuex'
	import commdate from '@/utils/commdate'
	import { tableList, timeCancel,overtimeDetail } from '@/api/attendance/MyOvertimeWork'
	import PublicDatePicker from './components/PublicDatePicker'
	import Pagination from '@/components/Pagination'
	import NoData from '@/components/NoData'
	export default {
		name: 'myleave',
		components: {
            PublicDatePicker,
            Pagination,
            NoData
        },
		data() {
			return {
                username:'',
				//当前页数
				currentPage: 1,
				//总数
				total: 1,
				//显示几条数据
				pageSize: 10,
				totalPages:'',
				value: 1,
                formInline:{    //表头查询条件
                  startDate: '',
					endDate: '',
					page: ''
                },
                submitForm:{
                   startDate: '',
					endDate: '',
					page: ''
                },
				tableData: [],
				searchFlag: '',
				startDate: '',
				endDate: '',
				overTimeForm: {},
				dialogVisible: false,
                userId:'',
				BtnPermission: [],
				roleId:"",//角色id
			}
		},
		methods: {
			 //过滤申请人
            formatRealname(row){
                if(row.realname){
                    if(row.realname.length>10){
                        return row.realname.substr(0,10)+'...';
                    }else{
                        return row.realname;
                    }
                }else{
                    return row.realname;
                }
            },
			 // 获取开始时间
            gteStartTime(val){
                this.formInline.startDate = val;
            },
            // 获取结束时间
            getEndTime(val){
                this.formInline.endDate = val;
            },
			handleClick(row) {
				this.dialogVisible = true
				let params = {
					id:row.id
				}
				//列表
				overtimeDetail(params).then(res => {
					this.overTimeForm = res.data.data
				}).catch(error => {
					console.log(error, 222)
				})

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
				timeCancel({
					id: row.id
				}).then(res => {
					this.tableListFac()
				}).catch(error => {
					console.log(error, 222)
				})
			},
			//导出
			exportTableFac() {
				window.location.href = process.env.BASE_API + `/admin/bpoOvertime/exportFindOverTimeList?userId=${this.userId}&startDate=${this.submitForm.startDate}&endDate=${this.submitForm.endDate}`;
			},
			//加载列表
			tableListFac(data) {
				tableList(data).then(response => {
					console.log(response)
					if(response && response.data && response.data.records.length) {
						
						this.tableData = response.data.records;
						this.total = response.data.total;
						this.totalPages = response.data.pages;
					}else{
						this.tableData = [];
						this.total = 1;
						this.totalPages = 1;
					}
				}).catch(error => {
					console.log(error, 222)
				})
			},
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
			}
		},
		mounted() {
            this.BtnPermission = TempCache.getItem('我的考勤');
			this.userId = TempCache.getItem("userInfo").id;
			this.roleId = TempCache.getItem('userRole').role[0].id;
			// console.log(this.roleId,"角色")
			this.username = TempCache.getItem('userInfo').username;
			var newDate = new Date()
			this.formInline.endDate = commdate.timestampToTime(newDate);
			this.formInline.startDate= this.formInline.endDate.substr(0,7)+'-01'
		    this.tableListFac(this.formInline)
		}
	}
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
</style>
