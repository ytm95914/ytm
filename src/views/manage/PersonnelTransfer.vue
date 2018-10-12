<template>
	<div class="personimp">
		<div class="title">
			人员调出列表
		</div>
		<div class="querybar">
			<div class="leftinput">
				<span>姓名：</span>
				<span class="span-input">
                	 <el-input v-model="formInline.realname"></el-input>
                </span>

				<span>工号：</span>
				<span class="span-input">
                	 <el-input v-model="formInline.username"></el-input>
                </span>
			</div>
			<div class="Buttongroup">
				<el-button type="primary" icon="el-icon-search" @click="query" style="padding: 11px;">查询</el-button>
				<el-button type="success" @click.prevent="exportWord" style="padding: 11px;" v-if="BtnPermission.includes('导出')">
					<svg-icon icon-class="export" style="width: 14px;height: 14px;vertical-align: middle;margin-right: 5px;" />导出</el-button>
			</div>
		</div>
		<SimpleTable :tableDatad="tableDtats" :tableHead="tableHead" @getOperation="getOperation"></SimpleTable>
		<NoData v-show="!tableDtats.length"></NoData>
		<!--翻页器-->
		<Pagination v-show="tableDtats.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
		<!-- 拒绝弹窗 -->
		<div class="refusalreason ">
			<!-- <el-button type="text" @click="dialogVisible = true">拒绝原因</el-button> -->
			<el-dialog title="拒绝原因" :visible.sync="dialogVisible" width="500px" class="colorStyle" :lock-scroll="false">
				<el-form ref="form" :model="form" :rules="rules2" style="padding-right: 70px;">
					<el-form-item label="调出时间 :" :label-width=refusalWidth>
						<span style="color: #666;">
                        {{dialogData.bringUpTime}}
                    </span>
					</el-form-item>
					<el-form-item label="调出项目 :" :label-width=refusalWidth>
						<span style="color: #666;">
                        {{dialogData.startProjectName}}
                    </span>
					</el-form-item>
					<el-form-item label="调出小组 :" :label-width=refusalWidth>
						<span style="color: #666;">
                        {{dialogData.startGroupName}}
                    </span>
					</el-form-item>
					<!--<el-form-item label="调入时间 :" :label-width=refusalWidth>
						<span style="color: #666;">
                        {{dialogData.bringDownTime}}
                    </span>
					</el-form-item>-->
					<el-form-item label="调入项目 :" :label-width=refusalWidth>
						<span style="color: #666;">
                        {{dialogData.endProjectName}}
                    </span>
					</el-form-item>
					<el-form-item label="调入小组 :" :label-width=refusalWidth>
						<span style="color: #666;">
                        {{dialogData.endGroupName}}
                    </span>
					</el-form-item>
					<el-form-item label="调出原因 :" :label-width=refusalWidth>
						<span style="color: #666;word-break:break-word">
                        {{dialogData.remarkOne}}
                    </span>
					</el-form-item>
					<el-form-item label="拒绝原因 :" prop="reasons" :label-width=refusalWidth>
						<el-input type="textarea" v-model="form.reasons" maxlength='100'></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="success" @click="submitForm1('form')">确 定</el-button>
					<el-button type="info" @click="clear">取 消</el-button>
				</div>
			</el-dialog>
		</div>

	</div>
</template>
<script>
	import SimpleTable from '@/views/manage/components/SimpleTable'
	import { personnelTransfer, personnelDisagreeOut, personnelAgreeOut } from '@/api/system/manage'
	import Pagination from '@/components/Pagination'
	import TempCache from '@/utils/tempcache'
    import NoData from '@/components/NoData'
	export default {
		data() {
			var validatereasons = (rule, value, callback) => {
				if(value === '') {
					return callback(new Error('内容不能为空！'));
				} else if(value.length > 100) {
					return callback(new Error('内容最大长度不能超过100！'));
				} else {
					callback();
				}
			};
			return {
				rules2: {
					reasons: [{
						validator: validatereasons,
						trigger: 'blur'
					}],
				},
				form: {
					reasons: '', //拒绝原因
				},
				repellentData: {
					remarkTwo: '',
					id: ''
				},
				dialogVisible: false,
				refusalWidth: '160px',
				dialogData: {},
                userId: '',
				formInline: { //表头查询条件
					realname: '',
					username: '',
					page: 1,
				},
				submitForm: {
					realname: '',
					username: '',
					page: 1,
				},
				tableHead: [{
						label: '姓名',
						fixed: true,
						width: '160',
						prop: 'realname',
					},
					{
						label: '工号',
						fixed: true,
						width: '150',
						prop: 'username'
					},
					{
						label: '调出时间',
						fixed: false,
						width: '140',
						prop: 'bringUpTime'
					},
					{
						label: '调出项目',
						fixed: false,
						width: '165',
						prop: 'startProjectName'
					},
					{
						label: '调出小组',
						fixed: false,
						width: '165',
						prop: 'startGroupName'
					},
//					{
//						label: '调入时间',
//						fixed: false,
//						width: '150',
//						prop: 'bringDownTime'
//					},
					{
						label: '调入项目',
						fixed: false,
						width: '165',
						prop: 'endProjectName'
					},
					{
						label: '调入小组',
						fixed: false,
						width: '165',
						prop: 'endGroupName'
					},
					{
						label: '调出原因',
						fixed: false,
						width: '205',
						prop: 'remarkOne',
					},
					{label:'调出拒绝原因',fixed:false,width:'205',prop:'remarkTwo'},
					{
						label: '操作',
						fixed: 'right',
						width: '150',
						prop: 'operation'
					},
				],
				tableDtats: [],
				currentPage: 1, // 当前
				pageSize: 10, //当前页条数
				total: 1, //总条数
				requestPages: 1,
				totalPages: 1,
				value: 1,
				searchFlag: '',
                BtnPermission: []
			}
		},
		components: {
			SimpleTable,
			Pagination,
			NoData
		},
		methods: {
			clear() {
				this.dialogVisible = false;
				this.resetForm('form');
			},
			submitForm1(formName) {
				console.log('valid run')
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.confirm();
						this.dialogVisible = false;
						this.form.reasons = '';

					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			exportWord() {
				window.location.href = process.env.BASE_API + `/admin/bpoScheduling/exportBpoSchedulingCallOut?realname=${this.formInline.realname}&username=${this.formInline.username}&userId=${this.userId}`;
			},
			confirm() {
				this.repellentData.remarkTwo = this.form.reasons;
				personnelDisagreeOut(this.repellentData).then(res => {
					this.dialogVisible = false;
					this.init();
				}).catch(error => {
					console.log(error + '错误');
				});
			},
			getOperation(data) {
				this.operationHandle(data);
			},
			operationHandle(opera) {
				if(opera.operation == 'agree') {
					let data = {
						id: opera.dataInfo.id
					};
					personnelAgreeOut(data).then(res => {
						if(res) {
							//console.log(res,'同意');
							this.init();
						}
					}).catch(error => {
						//console.log(error+'错误')
					});
				}
				if(opera.operation == 'disagree') {
					this.repellentData.id = opera.dataInfo.id;
					this.dialogData = opera.dataInfo;
					this.dialogVisible = true;
				}
				if(opera.operation == 'details') {
					let id = opera.dataInfo.userId;
					this.$router.push({
						path: `/system/view/${id}`
					});
				}
			},
			arrCopy(arr) {
				return arr.slice(0);
			},
			/*翻页*/
			handleCilck(val) {
				this.submitForm.page = val;
				Object.assign(this.formInline, this.submitForm);
				this.init(this.submitForm);
			},
			jumpPage(value) {
				this.submitForm.page = value;
				Object.assign(this.formInline, this.submitForm);
				this.init(this.submitForm);
			},
			/*查询*/
			query() {
				this.formInline.page = 1;
				Object.assign(this.submitForm, this.formInline);
				this.init(this.formInline);
			},
			init(data) {
				personnelTransfer(data).then(res => {
					if(res && res.data && res.data.records && res.data.records.length) {
						var filterData = this.filteringData(res.data.records);
						this.tableDtats = filterData;
						this.currentPage = res.data.current;
						this.totalPages = res.data.pages;
						this.total = res.data.total;
					} else {
						this.tableDtats = []
						this.currentPage = 1
						this.total = 1
						this.totalPages = 1
					}
				}).catch(error => {
					console.log(error + '错误')
				});
			},
			filteringData(data) {
                let roles = this.BtnPermission.includes('审批');
				var newArr = this.arrCopy(data);
				newArr.forEach(function(item, index) {
					if(item.bringUpStatus == 2) {
						item.operation = [{
								operation: '详情',
								type: 'details',
                                permiss:true
							},
							{
								operation: '同意',
								type: 'agree',
                                permiss:roles
							},
							{
								operation: '不同意',
								type: 'disagree',
                                permiss:roles
							},
						]
					} else if(item.bringUpStatus == 1) {
						item.operation = [{
								operation: '详情',
								type: 'details',
                                permiss:true
							},
							{
								operation: '已同意',
								type: 'haveagreed',
                                permiss:true
							},
						]
					} else if(item.bringUpStatus == 0) {
						item.operation = [{
								operation: '详情',
								type: 'details',
                                permiss:true
							},
							{
								operation: '已拒绝',
								type: 'haverefused',
                                permiss:true
							},
						]
					}
				});
				return newArr;
			}
		},
		mounted() {
            this.BtnPermission = TempCache.getItem('人员调出管理');
            this.init();
			this.userId = TempCache.getItem('userId');
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.personimp {
		border: 1px solid #E9F1F3;
	}

	.title {
		font-family: PingFangSC-Regular;
		font-size: 18px;
		color: #333333;
		height: 50px;
		box-sizing: border-box;
		border-bottom: 1px solid #EFEFEF;
		line-height: 50px;
		padding-left: 19px;
	}

	.querybar {
		height: 36px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.querybar span {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		padding-left: 20px;
		color: #333333;
	}

	.el-input--mini {
		font-size: 12px;
		width: 130px;
		height: 36px;
		line-height: 36px;
	}

	.leftinput {
		float: left;
	}

	.el-input--mini .el-input__inner {
		height: 36px;
		line-height: 36px;
	}

	.Buttongroup {
		float: right;
		margin-right: 20px;
	}

	.el-input--mini .el-input__inner {
		height: 36px;
		line-height: 36px;
	}

	.paging {
		text-align: center;
	}

	.el-form-item__label {
		color: #333333;
	}

	.dialog-footer {
		text-align: center;
		.el-button {
			margin: 0 15px;
		}
	}

	.querybar .span-input {
		display: inline-block;
		width: 130px;
		height: 36px;
		padding-left: 0;
	}
</style>
<style>
	.colorStyle .el-form-item__label {
		color: #333333;
	}
</style>
