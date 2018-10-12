<template>
    <section class="projectandgroup">
        <div class="selectbox">
            <span>项目</span>
            <el-select v-model="projectId" placeholder="请选择" @change='projectSel' style="width: 78%;">
                <el-option v-for="(val,index) in projectArr" :key="index" :label="val.name" :value="val.id" :class="{selected:projectId==val.name}"></el-option>
            </el-select>
        </div>
        <div class="selectbox">
            <span>小组</span>
            <el-select v-model="groupId" placeholder="请选择" value-key="id" @change='groupSel'  style="width: 78%;">
                <el-option v-for="(val,index) in groupArr" :key="index" :label="val.name" :value="val.id" :parentId="val.parentId"></el-option>
            </el-select>
        </div>
    </section>
</template>

<script>
     /**
     * @author liyanwen
     * @date 2018/9/26
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * 
     */
    import { requestProject } from '@/api/system/user'
    import TempCache from '@/utils/tempcache'

    export default {
        name: "ProjectAndGroup",
        data(){
            return {
                projectId:'',
                groupId:'',
                projectArr:'',
                groupArr:'',
                groupArrSel:[]
            }
        },
        methods:{
           //项目下拉框
			projectList() {
				requestProject({
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
			groupList() {
				requestProject({
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
           //选择项目下拉框
			projectSel(selVal) {
				this.projectId = selVal
				if(selVal != '') {
					this.groupArrSel = []
					this.groupArr = []
					this.groupId = '' //清空小组值id
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
					this.projectId = ''
					this.groupArr = TempCache.getItem('groupList');
				}
				this.$emit("projectId",this.projectId)

			},
			//选择小组下拉框
			groupSel(selVal) {
				this.groupId = selVal
				this.$emit("groupId",this.groupId)
				//选择项目时候,展示出来对应的小组
				if(selVal != '') {
					for(var i = 0; i < this.groupArr.length; i++) {
						if(this.groupArr[i].id == selVal) {
							for(var k = 0; k < this.projectArr.length; k++) {
								if(this.projectArr[k].id == this.groupArr[i].parentId) {
									this.projectId = this.projectArr[k].id
									this.$emit("projectId",this.projectId)
									return
								}
							}
						}
					}
				}
			},
        },
        mounted(){
            this.projectList();
            this.groupList();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .projectandgroup{
        .selectbox{
            display: inline-block;
            margin-right:5px;
            width:167px;
            span{
                color: #333;
                font-size: 12px;
                padding-right: 8px;
            }
        }
    }
</style>
