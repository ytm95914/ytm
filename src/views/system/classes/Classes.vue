<template>
	<section class="classes">
		<div class="font12 color333 search-div">
			<span>班次</span>
			<div class="sel">
				<el-input v-model="formInline.shiftsName" placeholder=""></el-input>
			</div>
			<span>项目</span>
			<div class="sel">
				<el-select v-model="formInline.projectID" placeholder="请选择" value-key="id"  @change='projectSel'>
					<el-option v-for="(item,index) in projectArr" :key="index" :label="item.name" :value="item.id" :class="{selected:projectID==item.label}">
					</el-option>
				</el-select>
			</div>

			<span>小组</span>
			<div class="sel">
				<el-select v-model="formInline.groupID" placeholder="请选择" value-key="id" @change='groupSel'>
					<el-option v-for="(item,index) in groupArr" :key="index" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="fr">
				<el-button type="primary" icon="el-icon-search" @click="searchPeople" style="padding: 10px 11px 12px;">查询</el-button>
				<!--<el-button type="success" icon="el-icon-search">新增</el-button>-->
				<el-button type="primary" style="padding: 10px 11px 12px;background: #4A90E2"  @click="layerBol=true;type='add';titleName='添加'" v-if="BtnPermission.includes('新增班次')">
                    <svg-icon icon-class="userAdd" id="svg-icon" />
                    <span>新增</span>
                </el-button>
			</div>

		</div>

        <el-table :header-cell-style="getRowClass" stripe :data="tableData" style="width: 100%">
            <el-table-column fixed prop="name" label="班次名称">
            </el-table-column>
            <el-table-column  prop="remarkTwo" width="120px" label="背景颜色">
                <template slot-scope="scope">
                    <span v-bind:style="{background:scope.row.remarkTwo,display:'inline-block',width:'10px',height:'10px'}"></span>
                    <span>{{scope.row.remarkTwo}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="project_name" label="项目">
            </el-table-column>
            <el-table-column prop="group_name" label="小组">
            </el-table-column>
            <el-table-column prop="working_time" label="班次时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" v-if="BtnPermission.includes('编辑班次')">编辑</el-button>
                    <el-button @click="deltable(scope.row)" type="text" style="color: #E65E5E;" v-if="BtnPermission.includes('删除班次')">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
		<NoData v-show="!tableData.length"></NoData>
		 <!--翻页器-->
        <Pagination v-show="tableData.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
        <!-- 拒绝弹窗 -->
		<el-dialog :visible.sync="layerBol" width="800px" :title="titleName" center :lock-scroll="false">
			<add-layer :shows="layerBol" :types="type" :id="editorId" @cancel="layerBol=false" @tbn="tbnDialog"></add-layer>
		</el-dialog>
	</section>
</template>

<script>
	import { classes, personnelDetailsProject, delTableStauts,delTable } from '@/api/system/classes'
	import addLayer from './components/addLayer'
	import TempCache from '@/utils/tempcache'
    import Pagination from '@/components/Pagination'
    import NoData from '@/components/NoData'
	export default {
		components: {
			addLayer,
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
				tableData: [], //表格
				projectID: '', //项目id
				groupID: '', //小组id
				projectArr: [],
				groupArr: [],
				groupArrSel: [],
				shiftsName: '', //班次名称
				layerBol: false,
				type: '',
				editorId: '',
				titleName: '',
				totalPages:'',
				value: 1,
				searchFlag:'',
				formInline:{    //表头查询条件
                   shiftsName:'' , //班次名称
				   projectID: '', //项目id
				   groupID: '', //小组id
				   page: 1
                },
                submitForm:{
                    shiftsName:'' , //班次名称
				   projectID: '', //项目id
				   groupID: '', //小组id
				   page: 1
                },
                BtnPermission:[]
			}
		},

		methods: {
			//编辑模板
			handleClick(row) {
				this.type = 'exit'
				this.layerBol = true
				this.titleName = "编辑"
				this.editorId = row.id
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
//									this.projectValue = this.projectArr[k].name
									this.formInline.projectID = this.projectArr[k].id
									console.log(this.projectID)
									return
								}
							}
						}
					}
				}

			},
			 /*翻页*/
            handleCilck(val){
                this.submitForm.page = val;
                Object.assign(this.formInline,this.submitForm);
                this.classesFac(this.submitForm);
            },
            jumpPage(value){
                 this.submitForm.page = value;
                Object.assign(this.formInline,this.submitForm);
                this.classesFac(this.submitForm);
            },
            /*查询*/
            searchPeople() {
            	this.searchFlag = 1
 				this.formInline.page = 1;
                Object.assign(this.submitForm,this.formInline);
                this.classesFac(this.formInline);
            },
			//加载列表
			classesFac(data) {
				classes(data).then(res => {
					if(res && res.data&&res.data.records && res.data.records.length) {
						this.tableData = res.data.records;
						this.total = res.data.total;
						this.currentPage = res.data.current;
						this.totalPages = res.data.pages
					}else{
                    	this.tableData =[]
                    	this.currentPage = 1
                        this.total = 1
                        this.totalPages =  1
                    }
				}).catch(error => {
					console.log(error, 222)
				})
			},
			//删除列表
			deltable(val) {
				console.log(val)
				let params = {
					id: val.id
				}
				delTableStauts(params).then(res => {
				 if(res.data.data == 0) {
						this.$notify({
							title: '警告',
							lockScroll:'false',
							message: '班次正在使用,不可删除!',
							type: 'warning'
						})
					} else {
						this.$confirm('此操作将永久删除该班次, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							delTable(params).then(response => {
								this.formInline.page = 1;
						    	this.classesFac(this.formInline);
							}).catch(error => {
								console.log(error, 222)
							})
							this.$message({
									type: 'success',
									message: '删除成功!'
								});
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
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
						this.projectArr.splice(0, 0, {
							id: '',
							name: '请选择'
						})
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
						this.groupArr.splice(0, 0, {
							id: '',
							parentId: '',
							name: '请选择'
						})
						TempCache.setItem('groupList', this.groupArr)
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

			},
			tbnDialog() {
				this.layerBol = false
                this.formInline.shiftsName=''
                this.formInline.projectID=''
                this.formInline.groupID=''
                this.formInline.page=1
				this.classesFac(this.formInline);
			}
		},
		mounted() {
            this.BtnPermission = TempCache.getItem('班次管理');
            this.classesFac(this.formInline);
			this.projectFac()
			this.groupFac()
		}

	}
</script>

<style scoped>
	h2,
	h3 {
		font-weight: normal;
	}
    .classes{
        border: 1px solid #efefef;
    }
	.color333 {
		color: #333;
	}

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
		padding-left: 20px;
		box-sizing: border-box;
		margin-top: 20px;
		border: 1px solid #E9F1F3;
	}

	.search-div {
		padding: 15px 20px;
		padding-left: 0;
	}

	.search-div>span {
		margin-left: 20px;
		margin-right: 5px;
	}

	.sel {
		display: inline-block;
		width: 160px;
	}
</style>
