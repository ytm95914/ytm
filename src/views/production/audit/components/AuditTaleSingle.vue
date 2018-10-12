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
                </el-tab-pane>
                <!-- 翻页组件 -->
                <!-- <Pagination :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination> -->
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
        name: "AuditTaleSingle",
        data(){
            return {
                initForm:{
                    flag:'',
                    date:'',
                    userId:1
                },
                currentPage: 0,//当前页数
                total: 1,//总数
                totalPages:1,//总数据
                pageSize: 10,

                activeName:'first',
                summaryTableDataHead:[
                    {

                        tname:'小组',
                        prop:"orgName",
                        fixed:true,
                        width:'200'
                    },
                    {
                        tname:'指标',
                        prop:"targetName",
                        fixed:true,
                        width:'150'
                    },
                    {
                        tname:'数据类型',
                        prop:"dataType",
                        fixed:true,
                        width:'200'
                    },
                    {
                        tname:commdate.timestampToTime(this.getDayTime).substr(commdate.timestampToTime(this.getDayTime).length-2)+'日',
                        prop:"data",
                        fixed:true,
                    },
                ],
                summaryTtableDataBody:[],
            }
        },
        components:{
            ComplexTable,
            Pagination,
            NoData
        },
        methods:{
            /*tab栏切换触发*/
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleCilck(val){
                
            },
            jumpPage(value){
                
            },
            ...mapActions([
                'setDateFlag',
                'setDayTime',
                'setMonthTime',
                'setYearTime'
            ]),
            copyArr(arr){
                return arr.slice(0);
            },
            tableHeadHandle(data){
                //flag== 2 的时候处理表头数据
                /*this.summaryTableDataHead */
                var tableHead = [];
                var ng = [  
                            {tname:'平均',prop:"monthDataAvg",fixed:false,width:'150'},
                            {tname:'汇总',prop:"monthData",fixed:false,width:'150'}
                         ];
                var newArr;
                for(var item in data[0]){
                    if(item.indexOf('-') != -1){
                        tableHead.push({
                            tname:this.getDateFlag == 2 ?item.substr(item.length-2)+'日':item.substr(item.length-2)+'月',
                            prop:item,
                        })
                    }
                }
                var tempArr = this.copyArr(this.summaryTableDataHead);
                tempArr.pop();
                return newArr = Array.concat(tempArr,ng,tableHead.sort(function(a,b){
                    return a.prop.substr(a.prop.length-2) - b.prop.substr(a.prop.length-2);
                }));
            },
            bpoTargetDayDatarequest(){
                bpoTargetDayData(this.initForm).then(response => {
                console.log(response)
                this.summaryTableDataHead = [
                            {tname:'小组',prop:"orgName",fixed:true,width:'200'},
                            {tname:'指标',prop:"targetName",fixed:true,width:'150'},
                            {tname:'数据类型',prop:"dataType",fixed:true,width:'200'},
                            {tname:commdate.timestampToTime(this.getDayTime).substr(commdate.timestampToTime(this.getDayTime).length-2)+'日',prop:"data",fixed:true,},
                        ];
                if(response && response.data && response.data.data != null){
                   if(this.initForm.flag == 1){
                        this.summaryTableDataHead = [
                            {tname:'小组',prop:"orgName",fixed:true,width:'200'},
                            {tname:'指标',prop:"targetName",fixed:true,width:'150'},
                            {tname:'数据类型',prop:"dataType",fixed:true,width:'200'},
                            {tname:commdate.timestampToTime(this.getDayTime).substr(commdate.timestampToTime(this.getDayTime).length-2)+'日',prop:"data",fixed:true,},
                        ];
                        this.summaryTtableDataBody =  response.data.data;
                   }else{
                        this.summaryTableDataHead = [
                            {tname:'小组',prop:"orgName",fixed:true,width:'200'},
                            {tname:'指标',prop:"targetName",fixed:true,width:'150'},
                            {tname:'数据类型',prop:"dataType",fixed:true,width:'200'},
                            {tname:commdate.timestampToTime(this.getDayTime).substr(commdate.timestampToTime(this.getDayTime).length-2)+'日',prop:"data",fixed:true,},
                        ];
                         //flag== 2 || 3 的时候处理表头数据
                        this.summaryTableDataHead = this.tableHeadHandle(response.data.data);
                        console.log(this.summaryTableDataHead,'得到最后的表头')
                        this.summaryTtableDataBody =  response.data.data;
                    }
                    
                }
                
                }).catch(error => {
                    console.log(error, 222)
                });
            },

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
                
                switch(this.initForm.flag){
                    case 1:
                        this.initForm.date = commdate.timestampToTime(this.getDayTime);break;
                    case 2:
                        this.initForm.date = commdate.timestampToTime(this.getMonthTime).substring(0,7);break;
                    case 3:
                        this.initForm.date = commdate.timestampToTime(this.getYearTime).substring(0,4);break;
                }
                this.bpoTargetDayDatarequest();
            },
            getDayTime(val){
                //监听日时间变化
                console.log('年月日变化了',val)
                this.initForm.date= commdate.timestampToTime(val);
                this.bpoTargetDayDatarequest(); 
            },
            getMonthTime(val){
                //监听月时间变化
                this.initForm.date= commdate.timestampToTime(val).substring(0,7); 
                this.bpoTargetDayDatarequest();
            },
            getYearTime(val){
                //监听年时间变化
                this.initForm.date= commdate.timestampToTime(val).substring(0,4); 
                this.bpoTargetDayDatarequest();
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
            this.initForm.flag = 1;
            this.initForm.date = commdate.timestampToTime(this.getDayTime);
            this.bpoTargetDayDatarequest();
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
