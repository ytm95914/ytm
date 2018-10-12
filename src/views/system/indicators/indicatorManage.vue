<template>
    <section class="indicatorManage">
        <el-form :inline="true" :model="initForm" class="demo-form-inline">
            <section class="inputbox">
                <el-form-item label="指标名称">
                    <el-input v-model="initForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="指标编号">
                    <el-input v-model="initForm.index" placeholder="请输入编号"></el-input>
                </el-form-item>
                <el-form-item label="指标类型">
                    <el-select v-model="initForm.type" placeholder="请选择" @change='projectSel'>
                        <el-option v-for="(val,index) in typeOptions" :key="index" :label="val.name" :value="val.id" :class="{selected:projectId==val.name}"></el-option>
                    </el-select>
                </el-form-item>
            </section>
            <section class="operationbtn">
                <el-button class="search" @click="searchBtn">
                    <svg-icon icon-class="userSearch" id="svg-icon" />
                    <span>查询</span>
                </el-button>
                <router-link :to="'/system/indicators/add'">
                    <el-button class="add" >
                        <svg-icon icon-class="userAdd" id="svg-icon" />
                        <span>新增</span>
                    </el-button>
                </router-link>
            </section>
        </el-form>

        <!--引用表格组件-->
        <PublicTbale :tableDatad="tableDtats" :tableHead="tableHead" :tableOperation="tableOperation" @getOperation="getOperation"></PublicTbale>
        <NoData  v-show="!tableDtats.length"></NoData>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/9/27
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     */

    import PublicTbale from "@/components/PublicTbale/SimpleTable";
    import NoData from '@/components/NoData'
    import comm from '@/utils/comm'

    export default {
        name: "indicatorManage",
        data(){
            return {
                initForm:{
                    name:'',
                    index:'',
                    type:''
                },
                typeOptions: [
                    {
                        name:'测试',
                        id:1
                    },
                    {
                        name:'聚会',
                        id:2
                    }
                ],
                tableHead: [
                    { label: "指标名称", prop: "realname"},
                    { label: "指标编号",  prop: "username" },
                    { label: "指标类型", prop: "projectName" },
                    { label: "默认单位", prop: "onDutyTime"},
                    { label: "指标描述", prop: "onDutyPunchTime"},
                    { label: "创建时间", prop: "offDutyTime",format:res=>res.offDutyTime.substr(0,10)}
                ],
                tableDtats: [],
                tableOperation: [
                    { operation: "详情", type: "check" },
                    { operation: "编辑", type: "edit" },
                    { operation: "删除", type: "deleted" },
                ],
            }
        },
        components:{
            PublicTbale,
            NoData
        },
        methods:{
            searchBtn(){
                console.log(1111111111)
            },
            getOperation(val){
                let ListUId = val.dataInfo.userId;
                let types = val.operation;
                switch(types){
                    case 'check':
                        this.$router.push({path: `/system/viewIndicators/${ListUId}`});
                        this.checked(ListUId);break;
                    case 'edit':
                        this.$router.push({path: `/system/editIndicators/${ListUId}`});
                        this.edited(ListUId);break;
                    case 'deleted':
                        this.deleted(ListUId);break;
                }
            },
            checked(){
                console.log('点击的是【详情】按钮');
            },
            edited(){
                console.log('点击的是【编辑】按钮');
            },
            deleted(uId){
                if(true){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        lockScroll:false
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        console.log('点击取消调用该组件')
                    });
                }else{
                    comm.warnRemid(this,'该指标正在被使用，无法删除');
                }
            }
        },
        mounted(){
            let data = {"total":10,"size":10,"pages":1,"current":1,"records":[{"date":"27日","realname":"何冬梅","username":"P0125838","projectName":"滴滴审核","groupName":"AI-LAB","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":"2018-09-27 08:30:00","offDutyPunchTime":null,"status":"迟到/早退","duration":null,"userId":271},{"date":"27日","realname":"夏天吉","username":"P0124867","projectName":"滴滴审核","groupName":"AI-LAB","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":"2018-09-27 08:30:00","offDutyPunchTime":null,"status":"迟到/早退","duration":null,"userId":272},{"date":"27日","realname":"廖玥琳","username":"P0124869","projectName":"滴滴审核","groupName":"AI-LAB","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":"2018-09-27 08:30:00","offDutyPunchTime":null,"status":"迟到/早退","duration":null,"userId":269},{"date":"27日","realname":"陈英健","username":"P0126777","projectName":"滴滴审核","groupName":"AI-LAB","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":"2018-09-27 08:30:00","offDutyPunchTime":null,"status":"迟到/早退","duration":null,"userId":270},{"date":"27日","realname":"何璐瑶","username":"P0114901","projectName":"滴滴审核","groupName":"AI-LAB","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":null,"offDutyPunchTime":null,"status":"缺勤","duration":null,"userId":268},{"date":"27日","realname":"乔欢","username":"P0102361","projectName":"滴滴审核","groupName":"无人车","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":"2018-09-27 09:00:00","offDutyPunchTime":null,"status":"迟到/早退","duration":null,"userId":265},{"date":"27日","realname":"胡利珂","username":"P0111178","projectName":"滴滴审核","groupName":"无人车","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":"2018-09-27 08:30:00","offDutyPunchTime":null,"status":"迟到/早退","duration":null,"userId":273},{"date":"27日","realname":"庞承忠","username":"P0107684","projectName":"滴滴审核","groupName":"无人车","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":"2018-09-27 09:30:00","offDutyPunchTime":null,"status":"迟到/早退","duration":null,"userId":264},{"date":"27日","realname":"刘泓佳","username":"P0129795","projectName":"滴滴审核","groupName":"无人车","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":"2018-09-27 08:30:00","offDutyPunchTime":null,"status":"迟到/早退","duration":null,"userId":267},{"date":"27日","realname":"黄泽瑜","username":"P0107685","projectName":"滴滴审核","groupName":"无人车","shiftsName":"行政","shiftsDate":"2018-09-27","onDutyTime":"2018-09-27 09:00:00","offDutyTime":"2018-09-27 18:00:00","onDutyPunchTime":"2018-09-27 08:30:00","offDutyPunchTime":null,"status":"迟到/早退","duration":null,"userId":263}]}
            this.tableDtats = data.records;
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .indicatorManage{
        overflow: auto;
        border:1px solid #E9F1F3;
        .demo-form-inline{
            padding:20px 20px 0 20px;
        }
        .inputbox{
            float:left;
        }
        .operationbtn{
            float:right;
            .el-button{
                width:70px;
                padding: 12px 12px;
                color:#ffffff;
                &:hover{
                    opacity:0.8;
                }
            }
            .search{
                background:#11A0F8;
                margin-left:10px;
            }
            .add{
                background:#4A90E2;
            }
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" >
    .indicatorManage{
        .el-form--inline .el-form-item__content {
            width:120px;
        }
    }
</style>
