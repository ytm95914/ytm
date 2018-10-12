<template>
	<div>
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="班次名称" prop="classname" :rules=" [{
							required: true,
							message: '请输入班次名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 10,
							message: '长度在 1 到 10 个字符',
							trigger: 'blur'
						}
					]">
				<el-input v-model="ruleForm.classname" style="width: 30%;"></el-input>
			</el-form-item>
			<el-form-item label="背景颜色" prop="colorBga" :rules=" [{
							required: true,
							message: '请选择背景颜色',
							trigger: 'blur'
				},
				{
							trigger: 'change'
						}
					]">
				<el-color-picker v-model="color3" @change="set2" size="medium" style="vertical-align: middle;"></el-color-picker>
				<el-input v-model="ruleForm.colorBga" style="width: 25%;" auto-complete="off" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="项目" prop="projectValue" :rules="[{
						required: true,
						message: '请选择项目',
						trigger: 'change'
					}]">
				<el-select v-model="ruleForm.projectValue" placeholder="请选择" @change='projectSel' :disabled="isEdit">
					<el-option v-for="(item,index) in projectArr" :key="index" :label="item.name" :value="item.id" :class="{selected:ruleForm.projectValue==item.label}">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="小组" prop="groupValue" :rules="[{
						required: true,
						message: '请选择小组',
						trigger: 'change'
					}]">
				<el-select v-model="ruleForm.groupValue" placeholder="请选择" @change='groupSel' :disabled="isEdit">
					<el-option v-for="(item,index) in groupArr" :key="index" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="班次时间" required v-for="(item,index) in ruleForm.timeList" :key="item.key">
				<el-col :span="7">
					<el-form-item :prop="'timeList.' + index + '.startTime'" :rules="[{
						required: true,
						message: '请选择开始时间',
						trigger: 'change'
					}]">
						<el-time-select @change='startTime(item.startTime,index)' style="width: 100%;" placeholder="起始时间" v-model="item.startTime" :picker-options="{
					      start: '00:00',
					      step: '00:15',
					      end: '24:00',
					      minTime:selecTimeRange[index].maxTime
					    }">
						</el-time-select>
					</el-form-item>
				</el-col>
				<el-col class="line" :span="1">-</el-col>
				<el-col :span="7">
					<el-form-item :prop="'timeList.' + index + '.endTime'" :rules="[{
						required: true,
						message: '请选择结束时间',
						trigger: 'change',
					}]">
						<el-time-select @change='endTime(item.endTime,index)' style="width: 100%;" placeholder="结束时间" v-model="item.endTime" :picker-options="{
					      start: '00:00',
					      step: '00:15',
					      end: '24:00',
					      minTime:item.startTime
					    }">
						</el-time-select>
					</el-form-item>
				</el-col>
				<el-col v-if="ruleForm.timeList.length-1!=0" class="line" :span="2">
					<span @click='del(index)' style="cursor: pointer;">删除</span>
				</el-col>
				<el-col v-if="ruleForm.timeList.length-1==index&&ruleForm.timeList.length<5" class="line" :span="2">
					<span @click="add(index)" style="cursor: pointer;">添加</span>
				</el-col>

			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
				<el-button @click="resetForm('ruleForm')">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { addClass, editorClass, personnelDetailsProject } from '@/api/system/classes'
	import commdate from '@/utils/commdate'
	import TempCache from '@/utils/tempcache'
	export default {
		props: {
			//添加还是编辑
			types: {
				default: 'add'
			},
			//编辑的id
			id: {
				default: '0'
			},
			//显示或隐藏
			shows: {
				default: false
			},
			title: {
				default: '添加模板'
			}

		},
		data() {
			return {
				projectArr: [],
				groupArr: [],
				groupID: '',
				classid: '',
				isEdit: false,
				classTimeList: [], //传给后台的时间格式
				//选择的时间范围
				selecTimeRange: [{
					maxTime: ''
				}],
				timefalg:'',
				color3: '#409EFF',
				ruleForm: {
					classname: '',
					projectValue: '',
					groupValue: '',
					colorBga: '',
					timeList: [{
						startTime: '',
						endTime: ''
					}]
				}
			};
		},
		methods: {
			startTime(times, index) {},
			endTime(times, index) {
				if(this.ruleForm.timeList[index].startTime == '') {
					this.$notify({
						title: '警告',
						message: '请先选择开始时间！',
						lockScroll: 'false',
						type: 'warning',
						duration: 2000
					})
					this.ruleForm.timeList[index].endTime = ''
				}else{
					if(this.ruleForm.timeList[index].endTime != ''){
						if(index+1<this.ruleForm.timeList.length){
							this.selecTimeRange[index+1].maxTime = this.ruleForm.timeList[index].endTime
						}
					}
					
				}

			},
			set2(val) {
				this.color3 = val;
				this.ruleForm.colorBga = val;
			},
			//添加班次时间
			add(index) {
				if(this.ruleForm.timeList[index].endTime == '') {
					this.$notify({
						title: '警告',
						lockScroll: 'false',
						message: '请先选择结束时间再添加班次时间!',
						type: 'warning',
						duration: 2000
					})
				} else {
					this.ruleForm.timeList.push({
						startTime: '',
						endTime: ''
					})
					this.selecTimeRange.push({
						maxTime: ''
					})
					this.selecTimeRange[index + 1].maxTime = this.ruleForm.timeList[index].endTime
				}

			},
			//删除班次时间
			del(index) {
				this.ruleForm.timeList.splice(index, 1)
				this.selecTimeRange.splice(index, 1)
			},
			submitForm(formName) {
				this.timefalg = ''
				//判断班次名称不能为休
				if(this.ruleForm.classname.trim() == '休') {
					this.$notify({
						title: '警告',
						lockScroll: 'false',
						message: '添加失败,班次名称不能为休!',
						type: 'warning'
					})
					this.timefalg = 1
				} else {
					this.ruleForm.classname = this.ruleForm.classname.trim()
				}
				
				this.$refs[formName].validate((valid) => {
					if(valid&&this.timefalg!=1) {
						//判断时间有没有重叠
						var a = []
						for(var i = 0; i < this.ruleForm.timeList.length; i++) {
							a.push(Number(this.ruleForm.timeList[i].startTime.replace(':', '')))
							a.push(Number(this.ruleForm.timeList[i].endTime.replace(':', '')))
						}
						for(var i = 0; i < a.length; i++) {
							for(var j = i + 1; j < a.length; j++) {
								if(a[i] > a[j]) {
									this.$notify({
											title: '警告',
											lockScroll: 'false',
											message: '时间段不可重叠!',
											type: 'warning'
										})
									return
								}
							}
						}
						let params = {
							id: this.id, //班次id
							name: this.ruleForm.classname, //班次名称
							orgId: this.groupID, //小组id
							timeList: this.ruleForm.timeList,
							remarkTwo: this.ruleForm.colorBga
						}
						addClass(params).then(response => {
							if(response.data.data == false) {
								this.$notify({
									title: '警告',
									lockScroll: 'false',
									message: '添加失败,当前小组下已有该班次名称存在!',
									type: 'warning'
								})
							} else {
								this.$emit("tbn")
							}

						}).catch(error => {
							console.log(error, 222)
						})
					} else {
						return false;
					}
				});
			},
			//编辑班次时间
			edtiorFac() {
				let params = {
					id: this.id,
				}
				this.isEdit = true
				this.timefalg =''
				editorClass(params).then(res => {
					if(res && res.data) {
						this.ruleForm.classname = res.data.data[0].name
						this.ruleForm.projectValue = res.data.data[0].project_name
						this.ruleForm.groupValue = res.data.data[0].group_name
						this.color3 = res.data.data[0].remarkTwo
						this.ruleForm.colorBga = res.data.data[0].remarkTwo
						if(res.data.data[0].working_time) {
							let arr = res.data.data[0].working_time.split(',')
							this.$set(this.ruleForm, 'timeList ', [{
								startTime: '',
								endTime: ''
							}])
							if(arr.length) {
								this.ruleForm.timeList = []
								for(var i = 0; i < arr.length; i++) {
									this.ruleForm.timeList.push({
										startTime: arr[i].substring(0, 5),
										endTime: arr[i].substring(6, 12)
									})
								}
								for(var k = 0; k < arr.length * 2; k++) {
									this.selecTimeRange.push({
										maxTime: ''
									})
								}
							}
						}
					}
				}).catch(error => {
					console.log(error, 222)
				})
			},
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				this.timefalg =''
				this.$emit("tbn")
			},
			//选择项目下拉框
			projectSel(selVal) {
				this.projectID = selVal
				if(selVal != '') {
					this.groupArrSel = []
					this.groupArr = []
					this.ruleForm.groupValue = '' //清空小组值
					this.groupID = '' //清空小组值id
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
					this.ruleForm.groupValue = '请选择'
					this.groupArr = TempCache.getItem('groupList');
				}

			},
			//选择小组下拉框
			groupSel(selVal) {
				this.groupID = selVal
				//选择项目时候,展示出来对应的小组
				if(selVal != '') {
					for(var i = 0; i < this.groupArr.length; i++) {
						if(this.groupArr[i].id == selVal) {
							for(var k = 0; k < this.projectArr.length; k++) {
								if(this.projectArr[k].id == this.groupArr[i].parentId) {
									this.ruleForm.projectValue = this.projectArr[k].name
									this.projectID = this.projectArr[k].id
									return
								}
							}
						}
					}
				}

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
					}

				}).catch(error => {
					console.log(error, 222)
				})
			},

		},
		watch: {
			shows(val) {
				if(val) {
					//回显数据
					if(this.types == 'exit') {
						this.isEdit = true
						this.timefalg =''
						this.edtiorFac()
					} else {
						this.projectFac()
						this.groupFac()
						this.isEdit = false
						this.timefalg =''
						this.$refs['ruleForm'].resetFields();
						this.ruleForm.classname = ''
						this.ruleForm.projectValue = ''
						this.ruleForm.groupValue = ''
						this.ruleForm.coclor1 = ''
						this.color3='#409EFF',
						this.ruleForm.timeList = [{
							startTime: '',
							endTime: ''
						}]
						this.selecTimeRange.push({
							maxTime: ''

						})
					}
				}
			},
			'ruleForm.classname' (val) {
				this.ruleForm.classname = val.trim()
			}
		},
		created() {
			this.timefalg =''
			if(this.types == 'exit') {
				this.isEdit = true
				this.edtiorFac()
			} else {
				this.isEdit = false
			}
		},
		mounted() {
			this.projectFac()
			this.groupFac()

		}
	}
</script>

<style scoped>
	.line {
		text-align: center;
	}
</style>