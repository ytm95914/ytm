<template>
	<div>
		<h2 class="navtitle">
			人员详情列表
		</h2>
		<div class="font12 color333 search-div">
			<span>姓名</span>
			<div class="sel">
				<el-input v-model="formInline.realname" placeholder=""></el-input>
			</div>
			<span>工号</span>
			<div class="sel">
				<el-input v-model="formInline.userName" placeholder=""></el-input>
			</div>
			<span>项目</span>
			<div class="sel">
				<el-select v-model="formInline.projectID" placeholder="" value-key="id" @change='projectSel'>
					<el-option v-for="(item,index) in projectArr" :key="index" :label="item.name" :value="item.id" :class="{selected:formInline.projectID==item.name}">
					</el-option>
				</el-select>
			</div>

			<span>小组</span>
			<div class="sel">
				<el-select v-model="formInline.groupID" value-key="id" placeholder="" @change='groupSel'>
					<el-option v-for="(item,index) in groupArr" :key="index" :label="item.name" :value="item.id" :class="{selected:formInline.groupID==item.name}">
					</el-option>
				</el-select>
			</div>
			<span>是否实习生</span>
			<div class="sel">
				<el-select v-model="formInline.isNature" value-key="id" placeholder="" @change='isNatureSel' >
					<el-option v-for="(item,index) in trainArr" :key="index" :label="item.label" :value="item.id" :class="{selected:formInline.isNature==item.label}">
					</el-option>
				</el-select>
			</div>
			<div class="fr frStyle">
				<el-button type="primary" icon="el-icon-search" @click="searchPeople">查询</el-button>
				<el-button type="success" @click="exportTableFac" v-if="BtnPermission.includes('导出')">
					<svg-icon icon-class="export" style="width: 14px;height: 14px;vertical-align: -.1em;" />
                    <span>导出</span>
                </el-button>
			</div>

		</div>
		<div class="table-div">
			<el-table :header-cell-style="getRowClass" stripe :data="tableData" style="width: 100%" >
				<el-table-column fixed prop="realname" label="姓名" :formatter="formatRealname" width="160px">
				</el-table-column>
				<el-table-column fixed prop="username" label="工号" width="100px">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" :formatter="formatEmail" width="230px">
				</el-table-column>
				<el-table-column prop="phone" label="电话" width="120">
				</el-table-column>
				<el-table-column prop="gender" label="性别">
				</el-table-column>
				<el-table-column prop="status" label="状态">
				</el-table-column>
				<el-table-column prop="resignation_type" label="离职类型" width="100px">
				</el-table-column>
				<el-table-column prop="resignation_reason" label="离职原因">
				</el-table-column>
				<el-table-column prop="scheduling_training" label="排班状态">
				</el-table-column>
				<el-table-column prop="is_nature" label="是否实习生" width="120px">
				</el-table-column>
				<el-table-column prop="entry_time" label="入职日期" width="110px">
				</el-table-column>
				<el-table-column prop="birthday" label="生日" width="110">
				</el-table-column>
				<el-table-column prop="project_values" label="项目" :formatter="formatProject" width="160px">
				</el-table-column>
				<el-table-column prop="group_values" label="小组" :formatter="formatGroup" width="160px">
				</el-table-column>
				<el-table-column prop="rolename" label="角色"  width="160px" :formatter="formatRolename">
				</el-table-column>
				<el-table-column prop="office_location" label="办公地点" :formatter="formatTypes" width="100px">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="handleClick('1',scope.row)" type="text" >详情</el-button>
						<el-button @click="handleClick('0',scope.row)" v-if="isShow(scope.row.status,BtnPermission.includes('编辑'))" type="text" >编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<NoData v-show="!tableData.length"></NoData>
			<!--翻页器-->
        	<Pagination v-show="tableData.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
		</div>

	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import commdate from '@/utils/commdate'
    import TempCache from '@/utils/tempcache'
	import { personnelDetails, personnelDetailsProject, exportTable } from '@/api/system/manage'
	import Pagination from '@/components/Pagination'
	import NoData from '@/components/NoData'
	export default {
	    props:['BtnPermission'],
        components:{
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
				dateTime: new Date(),
				tableData: [], //表格
				projectArr: [],
				groupArr: [],
				groupArrSel: [],
				trainArr: [{
					id: '',
					label: '请选择'
				},
				{
					id: '1',
					label: '是'
				},
				{
					id: '0',
					label: '否'
				}],
				searchFlag: '',
                totalPages:'',
                value:1,
                userId:'',
                newtiem:'',
                formInline:{    //表头查询条件
                    flag: 1,
					queryDate:this.getPeopleTime,
					realname: '', //姓名
					userName: '', //员工工号
					projectID: '', //项目id
					groupID: '', //小组id
					isNature: '', //是否为实习生
					page: 1,
                },
                submitForm:{
                    flag: 1,
					queryDate: this.getPeopleTime,
					realname: '', //姓名
					userName: '', //员工工号
					projectID: '', //项目id
					groupID: '', //小组id
					isNature: '', //是否为实习生
					page: 1,
                },
			}
		},
		computed: {
			...mapGetters([
				'getPeopleDate',
				'getPeopleTime'
			]),
		},
		methods: {
	        isShow(v,flag){
                if(flag){
                    if(v=='在职'){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            },
            //过滤邮箱
            formatEmail(row){
            	if(row.email){
            		 if(row.email.length>25){
	                    return row.email.substr(0,25)+'...';
	                }else{
	                    return row.email
	                }
            	}

            },
            //姓名
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
            //项目
            formatProject(row){
                if(row.project_values){
                    if(row.project_values.length>10){
                        return row.project_values.substr(0,10)+'...';
                    }else{
                        return row.project_values;
                    }
                }else{
                    return row.project_values;
                }
            },
             //小组
            formatGroup(row){
                if(row.group_values){
                    if(row.group_values.length>10){
                        return row.group_values.substr(0,10)+'...';
                    }else{
                        return row.group_values;
                    }
                }else{
                    return row.group_values;
                }
            },
            formatRolename(row){
                if(row.rolename){
                    if(row.rolename.length>10){
                        return row.rolename.substr(0,10)+'...';
                    }else{
                        return row.rolename;
                    }
                }else{
                    return row.rolename;
                }
            },
            //过滤办公地点(请选择时为空)
            formatTypes(row){
                if(row.office_location=='请选择'){
                    return row.office_location = '';
                }else{
                    return row.office_location;
                }
            },
			handleClick(flag, row) {
				if(flag == 1) {
					this.$router.push({path: `/system/view/${row.userId}`,})
				} else {
					this.$router.push({path: `/system/edit/${row.userId}`,})
				}
			},
			//选择项目下拉框
			projectSel(selVal) {
				this.formInline.projectID = selVal
				if(selVal != '') {
					this.groupArrSel = []
					this.groupArr = []
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
					this.groupArr = this.groupArrSel
					this.groupArr.splice(0, 0, {
						id: '',
						parentId: '',
						name: '请选择'
					})
				} else {
					this.formInline.projectID = ''
					this.groupArr = TempCache.getItem('groupList');
				}

			},
			//选择小组下拉框
			groupSel(selVal) {
				this.formInline.groupID = selVal
				//选择项目时候,展示出来对应的小组
				if(selVal != '') {
					for(var i = 0; i < this.groupArr.length; i++) {
						if(this.groupArr[i].id == selVal) {
							for(var k = 0; k < this.projectArr.length; k++) {
								if(this.projectArr[k].id == this.groupArr[i].parentId) {
									this.formInline.projectID = this.projectArr[k].id
									return
								}
							}
						}
					}
				}

			},
			//是否为实习生下拉框
			isNatureSel(selVal) {
				this.formInline.isNature = selVal
			},
			 /*翻页*/
            handleCilck(val){
                this.submitForm.page = val;
                Object.assign(this.formInline,this.submitForm);
                this.personnelDetailsFac(this.submitForm);
            },
            jumpPage(value){
                 this.submitForm.page = value;
                Object.assign(this.formInline,this.submitForm);
                this.personnelDetailsFac(this.submitForm);
            },
            /*查询*/
            searchPeople() {
            	this.searchFlag = 1
 				this.formInline.page = 1;
                Object.assign(this.submitForm,this.formInline);
                this.personnelDetailsFac(this.formInline);
            },
			//加载列表
			personnelDetailsFac(data) {
				var formatDate = commdate.timestampToTime(this.getPeopleTime);
				switch(this.formInline.flag) {
					case 1:
						this.formInline.queryDate =formatDate.substring(0, 7);
						this.submitForm.queryDate =formatDate.substring(0, 7);
						break;
					case 2:
                        this.formInline.queryDate = formatDate.substring(0, 4);
                        this.submitForm.queryDate =formatDate.substring(0,4);
						break;
				}
				//列表
				personnelDetails(data).then(response => {
					if(response && response.data && response.data.records.length) {
						this.tableData = response.data.records;
						this.total = response.data.total;
                        this.totalPages =  response.data.pages;
					} else {
						this.tableData = []
						this.total = 1
                        this.totalPages =  1
					}
				}).catch(error => {
					console.log(error, 222)
				})
			},
			//项目下拉框
			projectFac() {
				personnelDetailsProject({
					type: 2
				}).then(response => {
					if(response && response.data) {
						this.projectArr = response.data.data
						this.projectArr.splice(0,0,{id:'',name:'请选择'})
                        TempCache.setItem('projectList', this.projectArr)
					}

				}).catch(error => {
					console.log(error, 222)
				})
			},
			//小组下拉框
			groupFac() {
				personnelDetailsProject({
					type: 3
				}).then(response => {
					if(response && response.data) {
						this.groupArr = response.data.data
						this.groupArr.splice(0,0,{id:'',parentId:'',name:'请选择'})
                        TempCache.setItem('groupList', this.groupArr)
					}

				}).catch(error => {
					console.log(error, 222)
				})
			},
			//导出
			exportTableFac() {
				this.userId = TempCache.getItem('userId');
				var date = new Date(this.dateTime)
				const Y = date.getFullYear() + '-'
				const M =
					(date.getMonth() + 1 < 10 ?
						'0' + (date.getMonth() + 1) :
						date.getMonth() + 1)
				if(this.getPeopleDate==1){
					this.newtiem = Y + M
				}else{
					this.newtiem = Y.substring(0, 4)
				}
				window.location.href = process.env.BASE_API + `/admin/bpoUser/excelUserManageExport?userId=${this.userId}&flag=${this.getPeopleDate}&queryDate=${this.newtiem}&realname=${this.formInline.realname}&userName=${this.formInline.userName}&projectID=${this.formInline.projectID}&groupID=${this.formInline.groupID}&isNature=${this.formInline.isNature}&page=${this.currentPage}&size=${10}`;
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
			},
			 ...mapActions([
				'setPeopleDate',
				'setPeopleTime'
			])
		},
		watch: {
			getPeopleDate(val) {
				this.formInline.flag = val
				this.formInline.queryDate = commdate.timestampToTime(this.dateTime)
				this.personnelDetailsFac(this.formInline)

			},
			getPeopleTime(val) {
				this.dateTime = val
				this.formInline.queryDate = commdate.timestampToTime(val)
				this.personnelDetailsFac(this.formInline)
			}
		},
		mounted() {
			let date = new Date();
			this.setPeopleTime(date);
			this.projectFac()
			this.groupFac()
		}
	}
</script>

<style lang="scss" scoped>
	h2,
	h3 {
		font-weight: normal;
	}

	/*.color333 {*/
		/*color: #333;*/
	/*}*/

	.color666 {
		color: #666;
	}

	.font18 {
		font-size: 18px;
	}

	.font14 {
		font-size: 14px;
	}

	.font12 {
		font-size: 12px;
	}

	.fr {
		float: right;
	}
	.navtitle {
		height: 50px;
		line-height: 50px;
		font-size: 18px;
		color: #333;
		/*padding-left: 20px;*/
		box-sizing: border-box;
		margin-top: 20px;
		border: 1px solid #E9F1F3;
	}

	.search-div {
		padding: 16px 0;
		border-left: 1px solid #efefef;
		border-right: 1px solid #efefef;
	}

	.search-div>span {
		margin-left: 20px;
		margin-right: 5px;
	}

	.sel {
		display: inline-block;
		width: 109px;
	}

	.table-div {
		border: 1px solid #E9F1F3;
		scroll-behavior: auto;
	}
</style>
<style rel="stylesheet/scss" lang="scss">
    .frStyle{
        .el-button{
            width:70px;
            text-align: center;
            padding:0px;
        }
       margin-right:21px;
    }
</style>
