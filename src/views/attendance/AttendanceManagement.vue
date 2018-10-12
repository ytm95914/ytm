<template>
    <div class="personnel_timecard">
        <StatisticalInterval
        :projectData = "projectData"
        :groupData = "groupData"
        @getProject = "getProject"
        @getgroup = "getgroup"
        ></StatisticalInterval>

        <Attendance
            :BtnPermission="BtnPermission"
        :daysDetails="daysDetails"
        :charData="charData"
        :projectData = "projectData"
        :groupData = "groupData"
        :total_ = "total_"
        :pages = "pages"
        @query = "query"
        @exportWord = "exportWord"
        @getProjectLocal = "getProjectLocal"
        @getgroupLocal = "getgroupLocal"
        @getgroupTjLocal = "getgroupTjLocal"
        :detailsAttendanceData="detailsAttendanceData"
        :detailsAttendanceThead="detailsAttendanceThead"></Attendance>
    </div>

</template>

<script>
    /**
     * @author liuzhen
     * @date
     * @desc
     * @module
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     *
     */
    import StatisticalInterval from './components/StatisticalInterval'
    import Attendance from './components/Attendance'
    import { daysDetails,echartsData,projectData,groupData,detailsAttendanceData} from '@/api/attendance/Attendance'
    import { mapGetters ,mapActions} from 'vuex'
    import TempCache from '@/utils/tempcache'
    import commdate from '@/utils/commdate'

    export default {
        name: "yuangong",
        data(){
            return{
                time:'',
                date:'',
                daysDetails:'',
                charData:'',
                projectData:'',
                groupData:'',
                projectLocalID:'',//局部搜索条件项目
                groupLocal:'',//局部搜索条件小组
                progectID:'',//全局项目id
                groupID:'',//全局小组id
                groupTjLocal:'',//局部搜索条件小组（统计列表）
                detailsAttendanceData:[],//考勤详情table数据
                detailsAttendanceThead:[
                    {label:'项目',fixed:true,prop:'projectName',width:"150"},
                    {label:'小组',fixed:true,prop:'groupName',width:"150"},
                    {label:'班次',fixed:false,prop:'shiftsName',width:"200"},
                    {label:'姓名',fixed:false,prop:'realname',width:"150"},
                    {label:'工号',fixed:false,prop:'username',width:"150"},
                    {label:'班次日期',fixed:false,prop:'shiftsDate',width:"100"},
                    {label:'上班时间',fixed:false,prop:'onDutyTime',width:"200"},
                    {label:'下班时间',fixed:false,prop:'offDutyTime',width:"200"},
                    {label:'上班打卡时间',fixed:false,prop:'onDutyPunchTime',width:"200"},
                    {label:'下班打卡时间',fixed:false,prop:'offDutyPunchTime',width:"200"},
                    {label:'状态',fixed:false,prop:'status',width:"100"},
                    {label:'加班时长',fixed:false,prop:'duration',width:"100"},
                    ],
                total_:0,
                pages:0,
                BtnPermission: []
            }
        },
        watch:{
            getDate(){
                //里面可以写根据日期查询数据重新跟新视图的代码！调用init函数吧
                this.init();
            },
            getFlag(){
                 //里面可以写根据年月日查询数据重新跟新视图的代码！调用init函数吧
                 this.init();
            },
            progectID(){
                this.init();
            },
            groupID(){
                this.init();
            }
        },
        components:{
            StatisticalInterval,
            Attendance
        },
        computed:{
            ...mapGetters([
                'getDate',
                'getFlag'
                ]),
        },
        methods:{
            ...mapActions([
                'setDate',
                'setFlag'
                ]),
            prepareData(){
                //全局搜索参数准备，数据获取参数
                let data = {
                    queryDate : commdate.timestampToTime(this.getDate),
                    flag :  this.getFlag,
                    progectID : this.progectID,
                    groupID : this.groupID,
                };
                if(data.flag == 'day'){
                    data.queryDate = data.queryDate;
                    data.flag = 1;

                }
                if(data.flag == 'month'){
                    data.queryDate = data.queryDate.substring(0, 7);
                    data.flag = 2;

                }
                if(data.flag == 'year'){
                    data.queryDate = data.queryDate.substring(0, 4);
                    data.flag = 3;

                }
                return data;
            },
            numberTostr(n){
                //queryDate参数处理，例如将2018-5-8处理成2018-05-08；否则后台报错！
                if(n < 10){
                    return '0'+n;
                }else{
                    return n;
                }

            },
            getProject(val){
                //全局搜索项目下拉列表value
                this.progectID = val;
            },
            getgroup(val){
                //全局搜索小组下拉列表value
                this.groupID = val;
            },
            getProjectLocal(val){
                //局部搜索条件项目
                this.projectLocalID = val;
            },
            getgroupLocal(val,val1){
                //局部搜索条件小组
                this.groupLocal =  val;
            },
            getgroupTjLocal(val){
                //局部小组统计的
                this.groupTjLocal = val;
            },
            getDetailsAttendanceData(data){
                //今日考勤数据获取
                this.detailsAttendanceData = [];
                var _this = this;
                //表头数据根据月和日添加日期字段；日没有日期字段，月有日期字段 ,
                if(data.flag === 3){
                    return false;
                }else{
                    if(data.flag === 2){
                        var newArr  = this.copyArr(this.detailsAttendanceThead);
                       if(this.really(newArr)){
                            newArr.unshift({
                                label:'日期',
                                fixed:true,
                                width:'100',
                                prop:'date'
                            });
                            this.detailsAttendanceThead = newArr;
                       }
                    }else{
                        this.detailsAttendanceThead = [
                            {label:'项目',fixed:true,prop:'projectName',width:"150"},
                            {label:'小组',fixed:true,prop:'groupName',width:"150"},
                            {label:'班次',fixed:false,prop:'shiftsName',width:"200"},
                            {label:'姓名',fixed:false,prop:'realname',width:"150"},
                            {label:'工号',fixed:false,prop:'username',width:"150"},
                            {label:'班次日期',fixed:false,prop:'shiftsDate',width:"100"},
                            {label:'上班时间',fixed:false,prop:'onDutyTime',width:"200"},
                            {label:'下班时间',fixed:false,prop:'offDutyTime',width:"200"},
                            {label:'上班打卡时间',fixed:false,prop:'onDutyPunchTime',width:"200"},
                            {label:'下班打卡时间',fixed:false,prop:'offDutyPunchTime',width:"200"},
                            {label:'状态',fixed:false,prop:'status',width:"100"},
                            {label:'加班时长',fixed:false,prop:'duration',width:"100"},
                        ]
                    }
                }
                detailsAttendanceData(data).then(response => {
                    if(response && response.data && response.data.records.length){
                        this.detailsAttendanceData = response.data.records;
                        this.total_ = response.data.total;
                        this.pages = response.data.pages;
                    }
                }).catch(error => {
                    console.log(error, '考勤详情')
                });
            },
            really(arr){
                var flag = true;
                arr.forEach(function(item,index){
                   if(item.label === '日期'){
                    flag = false;
                    return flag;
                   }
                })
                return flag;

            },
            copyArr(arr){
                var newArr;
                return arr.slice(0);
            },
            query(obj){
                //查询
                this.getDetailsAttendanceData(this.attendanceParameters(obj));
            },
            attendanceParameters(obj){
                var newObj = '';
                var _this = this;
                if(obj){
                    newObj = _this.copyObj(obj);
                    newObj.flag = _this.prepareData().flag;
                    newObj.dateTime = _this.prepareData().queryDate;
                    newObj.limit = 10;
                }else{
                    newObj = {
                         dateTime :_this.prepareData().queryDate,//时间
                         flag : _this.prepareData().flag,//年月日标识
                         userName : '',//工号
                         realName :'',//姓名
                         shiftsName : '',//班次
                         projectId : '',//项目
                         groupId : '',//小组
                         page:1,//页数
                         limit:10,//每页条数
                    }
                }
                return newObj

            },
            copyObj(obj){
                return JSON.parse(JSON.stringify(obj))
            },
            exportWord(){

            },
            init(){
                //初始化函数，包含所有数据请求，接口获取的数据注释在api.js上有
                this.clear();
                daysDetails(this.prepareData()).then(response => {
                    if(response && response.data.data && Object.keys(response.data.data).length){
                        this.daysDetails = response.data.data;
                    }
                }).catch(error => {
                    console.log(error, 222)
                });
                echartsData(this.prepareData()).then(response => {
                    if(response && response.data.data && Object.keys(response.data.data).length){
                        this.charData = response.data.data;
                    }
                }).catch(error => {
                    console.log(error, 222)
                });
                this.getDetailsAttendanceData(this.attendanceParameters());
            },
            clear(){
               //没有用
            }
        },
        mounted(){
            this.BtnPermission = TempCache.getItem('考勤管理');
            this.setDate(new Date());
            //this.init();
            projectData({type:2}).then(response => {
                if(response && response.data.data && response.data.data.length){
                    this.projectData = response.data.data;
                }
            }).catch(error => {
                console.log(error, 222)
            });
            groupData({type:3}).then(response => {
                if(response && response.data.data && response.data.data.length){
                    this.groupData = response.data.data;
                }
            }).catch(error => {
                console.log(error, 222)
            });
        }
    }
</script>

<style scoped>
.personnel_timecard{
    width: 100%;
}
</style>
