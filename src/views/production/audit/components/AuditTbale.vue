<template>
    <section class="audit-tbale">
        <div class="content statistics_bottom_sm">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="该日汇总" name="first">
                    <div class="ButtongroupHz">
                        <el-button type="primary3"  size="small" style="background:#55CE63;color:#ffffff;">
                            <svg-icon icon-class="export" style="width: 14px;height: 14px;margin-right: 5px;"/>导出
                        </el-button>
                    </div>
                    <ComplexTable
                        :tableDataHead="summaryTableDataHead"
                        :tableDataBody="summaryTtableDataBody">
                    </ComplexTable>
                    <!-- 暂无数据组件 -->
                    <NoData v-show="!summaryTtableDataBody.length"></NoData>
                </el-tab-pane>
                <el-tab-pane label="该日详情" name="second" v-if="getDateFlag != 3">
                    <div class="querybar">
                        <div class="leftinput">
                            <span>姓名</span>
                            <div class="input_select">
                                <el-input
                                placeholder="请输入"
                                v-model="initForm.realName"
                                clearable>
                                </el-input>
                            </div>
                            <span>工号</span>
                            <div class="input_select">
                                <el-input
                                placeholder="请输入"
                                v-model="initForm.userName"
                                clearable>
                                </el-input>
                            </div>
                            <span>指标</span>
                            <div class="input_select">
                                <el-input
                                placeholder="请输入"
                                v-model="initForm.targetName"
                                clearable>
                                </el-input>
                            </div>
                        </div>
                        <div class="Buttongroup">
                                <el-button type="primary" icon="el-icon-search" size="small" @click="query" >查询</el-button>
                                <el-button type="primary3"  size="small" style="background:#55CE63;color:#ffffff;">
                                    <svg-icon icon-class="export" style="width: 14px;height: 14px;margin-right: 5px;"/>导出
                                </el-button>
                        </div>
                    </div>
                    <ComplexTable
                        :tableDataHead="detailsTableDataHead"
                        :tableDataBody="detailsTtableDataBody">
                    </ComplexTable>
                    <!-- 暂无数据组件 -->
                    <NoData v-show="!detailsTtableDataBody.length"></NoData>
                </el-tab-pane>
                <!-- 翻页组件 -->
                <Pagination v-show="detailsTtableDataBody.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
            </el-tabs>
        </div>
    </section>
</template>

<script>
    /**
     * @author zhen Liu
     * @date 2018/9/27
     * @desc 表格内容区域
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     */
     import ComplexTable from './ComplexTable.vue'
     import Pagination from '@/components/Pagination'
     import NoData from '@/components/NoData'
     import { mapGetters,mapActions } from 'vuex'
     import { bpoTargetDayData ,targetDataStatisticsDetail } from '@/api/production/AuditTbale'
     import commdate from '@/utils/commdate'
     export default {
        name: "AuditTbale",
        data(){
            return {
                initForm:{
                    flag:'',
                    dateTime:'',
                    realName:'',
                    userName:'',
                    targetName:'',
                },
                submitForm:{
                    flag:'',
                    dateTime:'',
                    realName:'',
                    userName:'',
                    targetName:'',
                },
                currentPage: 0,//当前页数
                total: 1,//总数
                totalPages:1,//总数据
                pageSize: 10,

                activeName:'first',
                summaryTableDataHead:[
                    {

                        tname:'小组',
                        prop:"group",
                        fixed:false,
                        width:'200'
                    },
                    {
                        tname:'指标',
                        prop:"index",
                        fixed:false,
                        width:'150'
                    },
                    {
                        tname:'数据类型',
                        prop:"dataType",
                        fixed:false,
                        width:'200'
                    },
                    {
                        tname:'XX日',
                        prop:"data",
                        fixed:false,
                    },
                ],
                summaryTtableDataBody:[
                    {
                       group:'a组',
                       index:'指标a',
                       dataType:'数据类型a',
                       data:'18'
                    },
                    {
                       group:'b组',
                       index:'指标b',
                       dataType:'数据类型b',
                       data:'19'
                    },
                ],
                detailsTableDataHead:[
                    {tname:'小组',prop:"groupName",fixed:false,width:'200'},
                    {tname:'姓名',prop:"realName",fixed:false,width:'150'},
                    {tname:'工号',prop:"userName",fixed:false,width:'150'},
                    {tname:'指标',prop:"targetName",fixed:false,width:'150'},
                    {tname:'数据类型',prop:"dataType",fixed:false,width:'200'},
                    {tname:commdate.timestampToTime(this.getDayTime).substr(commdate.timestampToTime(this.getDayTime).length-2)+'日',prop:"allData",fixed:false,}
                ],
                detailsTtableDataBody:[]
            }
        },
        components:{
            ComplexTable,
            Pagination,
            NoData
        },
        methods:{
            /*数组拷贝*/
            copyArr(arr){
                return arr.slice(0);
            },
            /*详情列表根据获取的数据得出表头*/
            detailsTableHeadHandle(data){
                var tableHead = this.copyArr(this.detailsTableDataHead);//数组拷贝
                tableHead.pop();//删除日维度表头最后一项
                var newArr = [
                    {
                        tname:'平均',
                        prop:"monthAverage",
                    },
                    {
                        tname:'总合',
                        prop:"monthData",
                    }
                ];
                for (var item in data[0]){
                    if(item.indexOf('day_') > -1 && data[0][item] != null){
                        newArr.push({
                            tname:item.split('_')[1]+'日',
                            prop:item,
                        })
                    }
                }
                return newArr = Array.concat(tableHead,newArr);
            },
            /*详情列表数据获取*/
            targetDataStatisticsDetailData(data){
                if(data){
                    this.targetDataStatisticsDetailrequest(data);
                }else{
                     this.targetDataStatisticsDetailrequest(this.initForm);
                }
            },
            /*数据请求*/
            targetDataStatisticsDetailrequest(data){
                targetDataStatisticsDetail(data).then(response => {
                    console.log(response,'ddddddddddddddddddddddddddddd')
                    this.detailsTableDataHead = [
                                {tname:'小组',prop:"groupName",fixed:false,width:'200'},
                                {tname:'姓名',prop:"realName",fixed:false,width:'150'},
                                {tname:'工号',prop:"userName",fixed:false,width:'150'},
                                {tname:'指标',prop:"targetName",fixed:false,width:'150'},
                                {tname:'数据类型',prop:"dataType",fixed:false,width:'200'},
                                {tname:commdate.timestampToTime(this.getDayTime).substr(commdate.timestampToTime(this.getDayTime).length-2)+'日',prop:"allData",fixed:false,}
                            ];
                    this.detailsTtableDataBody = [];//每次查询先制空表体数据
                    if(response && response.data && response.data.records.length){
                        //this.detailsTtableDataBody = response.data.records;//日维度直接赋值就可以了，先注释掉了；
                        if(this.getDateFlag == 1){
                            this.detailsTableDataHead = [
                                {tname:'小组',prop:"groupName",fixed:false,width:'200'},
                                {tname:'姓名',prop:"realName",fixed:false,width:'150'},
                                {tname:'工号',prop:"userName",fixed:false,width:'150'},
                                {tname:'指标',prop:"targetName",fixed:false,width:'150'},
                                {tname:'数据类型',prop:"dataType",fixed:false,width:'200'},
                                {tname:commdate.timestampToTime(this.getDayTime).substr(commdate.timestampToTime(this.getDayTime).length-2)+'日',prop:"allData",fixed:false,}
                            ];
                            this.detailsTtableDataBody = response.data.records;

                            this.total = response.data.total;//翻页 总共多少条数据
                            this.totalPages = response.data.pages;//翻页 总共多少页
                            this.currentPage = response.data.current;//当前页码数
                        }else if(this.getDateFlag == 2){
                            /*月维度处理方式（主要是处理表头）*/
                            this.detailsTableDataHead = [
                                {tname:'小组',prop:"groupName",fixed:false,width:'200'},
                                {tname:'姓名',prop:"realName",fixed:false,width:'150'},
                                {tname:'工号',prop:"userName",fixed:false,width:'150'},
                                {tname:'指标',prop:"targetName",fixed:false,width:'150'},
                                {tname:'数据类型',prop:"dataType",fixed:false,width:'200'},
                                {tname:commdate.timestampToTime(this.getDayTime).substr(commdate.timestampToTime(this.getDayTime).length-2)+'日',prop:"allData",fixed:false,}
                            ];
                            this.detailsTableDataHead = this.detailsTableHeadHandle(response.data.records);
                            console.log(this.detailsTableDataHead,'处理完的表头')
                            this.detailsTtableDataBody = response.data.records;

                            this.total = response.data.total;//翻页 总共多少条数据
                            this.totalPages = response.data.pages;//翻页 总共多少页
                            this.currentPage = response.data.current;//当前页码数

                        }else{
                            /*隐藏年维度*/
                            this.activeName = 'first';
                        }
                    }
                    
                }).catch(error => {
                    console.log(error, 222)
                });
            },
            /*tab栏切换触发*/
            handleClick(tab, event) {
                if(tab.index == '1'){
                    this.targetDataStatisticsDetailData();
                }
            },
            /*查询*/
            query(){
                this.initForm.page = 1;
                Object.assign(this.submitForm,this.initForm);
                this.targetDataStatisticsDetailData(this.submitForm);
            },
            /*翻页组件翻页函数*/
            handleCilck(val){
                 this.submitForm.page = val;
                 Object.assign(this.initForm,this.submitForm);
                 this.targetDataStatisticsDetailData(this.submitForm);
            },
            /*翻页组件go函数*/
            jumpPage(value){
                this.submitForm.page = value;
                Object.assign(this.initForm,this.submitForm);
                this.targetDataStatisticsDetailData(this.submitForm);
            },
            ...mapActions([
                'setDateFlag',
                'setDayTime',
                'setMonthTime',
                'setYearTime'
            ]),
        },
        computed:{
            ...mapGetters([
                'getDateFlag',
                'getDayTime',
                'getMonthTime',
                'getYearTime'
            ]),
        },
        watch:{
            getDateFlag(val){
                console.log('flag变化')
                //监听日月年flag
                this.initForm.flag= val;
                this.submitForm.flag = val;
                switch(this.initForm.flag){
                    case 1:
                        this.initForm.dateTime = commdate.timestampToTime(this.getDayTime);break;
                    case 2:
                        this.initForm.dateTime = commdate.timestampToTime(this.getMonthTime).substring(0,7);break;
                    case 3:
                        this.initForm.dateTime = commdate.timestampToTime(this.getYearTime).substring(0,4);break;
                }
                this.targetDataStatisticsDetailData();
            },
            getDayTime(val){
                //监听日时间变化
                console.log('年月日变化了',val)
                this.initForm.dateTime= commdate.timestampToTime(val);
                this.targetDataStatisticsDetailData(); 
            },
            getMonthTime(val){
                //监听月时间变化
                this.initForm.dateTime= commdate.timestampToTime(val).substring(0,7); 
                this.targetDataStatisticsDetailData();
            },
            getYearTime(val){
                //监听年时间变化
                this.initForm.dateTime= commdate.timestampToTime(val).substring(0,4); 
                this.targetDataStatisticsDetailData();
            },
            detailsTableDataHead(val){
                this.detailsTableDataHead = val;
            },
            detailsTtableDataBody(val){
                this.detailsTtableDataBody = val;
            }
        },
        destroyed(){
            this.setDateFlag(1);
            this.setDayTime(new Date());
            this.setMonthTime(new Date());
            this.setYearTime(new Date());
        },
        mounted(){
            console.log(this.getDateFlag,'flag');
            this.initForm.flag = 1;
            this.initForm.dateTime = commdate.timestampToTime(this.getDayTime);
            
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.statistics_bottom_sm {
    .el-tabs__content {
        overflow: initial !important;
        position: relative;
    }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.audit-tbale{
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #E9F1F3;
    box-sizing: border-box;
    margin-top: 20px;
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .navTtitle{
        width: 304px;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding-left: 20px;
        box-sizing: border-box;
        border: 1px solid #E9F1F3;
    }
    .totalNum{
        width: 304px;
        height: 316px;
        padding-left: 30px;
        padding-top: 40px;
        font-size: 14px;
        box-sizing: border-box;
        border: 1px solid #E9F1F3;
        border-top: 0;
    }
    .colorGreen{
        color: #11A0F8;
    }
    .font24{
        font-size: 24px;
    }
    .color666{
        color:#666666;
    }
    .ecahrts{
        margin-left: 324px;
        height: 366px;
        padding:10px 30px;
        border: 1px solid #E9F1F3;
        box-sizing: border-box;
    }
    .icon{
        display: inline-block;
        width: 10px;
        height: 10px;
    }
    .title_txt_x {
        font-size: 12px;
        font-weight: inherit;
    }
    .title{
        height: 50px;
    }
    .line {
        height: 45px;
    }
    .content {
        width: 100%;
        /* height: 525px; */
        background: #FFFFFF;
        border: 1px solid #E9F1F3;
        box-sizing: border-box;
        position: relative;
    }
    .content .el-tabs__item.is-active {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #11A0F8;
    }
    .querybar{
        margin-bottom: 10px;
        height: 40px;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .leftinput {
        float: left;
        width: 80%;
    }

    .Buttongroup {
        float: right;
    }
    .ButtongroupHz {
        float: right;
        position: absolute;
        top: -41px;
        right: 10px;
    }
    .el-button--primary1 {
        background: #4A90E2;
        color: #FFFFFF;
    }
    .el-button--primary1:focus, .el-button--primary1:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
    .el-button--primary2{
        background: #00C4AB;
        color: #FFFFFF;
    }
    .el-button--primary2:focus, .el-button--primary2:hover {
     background: #00c4a9a6;
     border-color: #66b1ff;
     color: #fff;
    }
    .el-button--primary3{
        background: #55CE63;
        color: #FFFFFF;
    }
    .el-button--primary3:focus, .el-button--primary3:hover {
     background: #55ce63ba;
     border-color: #66b1ff;
     color: #fff;
    }
    .table {
        width: 100%;
    }

    .table .el-table thead.is-group th {
      background: #92A6B1;
    }
    .dialogBox {
        border: 1px solid #E9F1F3;
        padding:15px 20px;
        box-sizing: border-box;
        height: 366px;
        width: 100%;
    }
    .lookAll {
        cursor: pointer;
        text-decoration: underline;
        color: #11A0F8;
        margin-left: 10px;
    }

    /* input select 样式 */
    .input_select {
        float: left;
        width: 13%;
    }
    .el-select>.el-input {
        display: block;
        font-size: 12px;
    }
    .querybar span{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        display: block;
        float: left;
        margin-top: 11.8px;
        margin-left: 10px;
        margin-right: 5px;
    }
}
</style>
