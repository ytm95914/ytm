<template>
	<div>
		<div class="fl">
			<h2 class="navTtitle color333">{{navTtitle}}</h2>
			<div class="totalNum">
				<p class="line">
					<span class="color666">出勤人数&nbsp; </span>
					<span class="colorGreen font24">{{daysDetails.出勤人数}}</span><span class="colorGreen">人</span>
				</p>
				<p class="line">
					<span class="color666">排班人数&nbsp; </span>
					<span class="colorGreen font24">{{daysDetails.排班人数}}</span><span class="colorGreen">人</span>
				</p>
				<p class="line">
					<span class="color666">出勤率&nbsp; </span>
					<span class="colorGreen font24">{{daysDetails.出勤率}}</span><span class="colorGreen">%</span>
				</p>
				<p class="line">
					<span class="color666">请假人数&nbsp; </span>
					<span class="colorGreen font24">{{daysDetails.请假人数}}</span><span class="colorGreen"></span>
				</p>
			</div>
		</div>
		<div class="ecahrts">
			<h3 class="clearfix color333 title title_txt_x">
				<span class="fl">单位 : 人</span>
				<span class="fr">
					<span class="title_txt_x" ><i class="icon" style="background-color:#11A0F8;"></i>&nbsp;出勤人数</span>
					<span class="title_txt_x" >
						<i class="icon" style="background-color:#55CE63;"></i>

						&nbsp;排班人数
					</span>
					<span class="title_txt_x" ><i class="icon" style="background-color:#4A90E2;width: 12px;height: 2px;position: relative;top: -3px;"></i>&nbsp;出勤率</span>

					<span class="fr lookAll" v-if="getDate === 'day' || getDate === 'month'" @click="dialogFormVisible = true"><svg-icon icon-class="allsearch" style="width: 14px;height: 16px;" />&nbsp;查看全部</span>
				</span>
			</h3>
			<chart
			:_styles="'width:100%;height:90%'"
			:_id="'testCharts1'"
			:_title="''"
			:_color="['#55CE63','#4A90E2','#11A0F8']"
			:_chartData="chartData"
			:_showBol="true"
			:_xAxisData='xAxisData'
			:_type="'LineAndBar'"></chart>
		</div>
		<div class="content">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				    <div class="querybar" v-if="!tabActive">
					  	<div class="leftinput">
					    <div style="float: left;">
					    	<ProjectAndGroup @projectId='getProjectId' @groupId='getGroupId'></ProjectAndGroup>
					    </div>
     					
					  			<!--<span>项目：</span>
					  			<div class="input_select">

					  				<el-select v-model="project" placeholder="请选择">
					  					<el-option
					  					v-for="(item,key) in projectData"
					  					:key="key"
					  					:label="item.name"
					  					:value="item.id">
					  				</el-option>
					  				</el-select>
					  			</div>
					  			<span>小组：</span>
					  			<div class="input_select">

					  				<el-select v-model="group" placeholder="请选择">
					  					<el-option
					  					v-for="(item,key) in groupData"
					  					:key="key"
					  					:label="item.name"
					  					:value="item.id">
					  				</el-option>
					  				</el-select>
					  			</div>-->
					  			<span>班次</span>
					  			<div class="input_select">

					  				<el-input
					  				placeholder="请输入"
					  				v-model="shiftsName"
					  				clearable>
					  				</el-input>
					  			</div>
					  			<span>工号</span>
					  			<div class="input_select">

					  				<el-input
					  				placeholder="请输入"
					  				v-model="username"
					  				clearable>
					  				</el-input>
					  			</div>
					  			<span>姓名</span>
					  			<div class="input_select">

					  				<el-input
					  				placeholder="请输入"
					  				v-model="realname"
					  				clearable>
					  				</el-input>
					  			</div>
					  	</div>
					  	<div class="Buttongroup">
					  	  		<el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
					  	  		<el-button type="primary3"  size="small" @click="exportWord"style="background:#55CE63;color:#ffffff;" v-if="BtnPermission.includes('导出')" >
                    <svg-icon icon-class="export" style="width: 14px;height: 14px;margin-right: 5px;"/>导出
                </el-button>
					  	</div>
					</div>
					<div class="querybar" v-if="tabActive">
					  <div class="leftinput">
					  		<span>小组：</span>
					  		<div class="input_select">

					  			<el-select v-model="groupTj" placeholder="请选择">
					  			<el-option
					  					v-for="(item,key) in groupData"
					  					:key="key"
					  					:label="item.name"
					  					:value="item.id">
					  			</el-option>
					  			</el-select>
					  		</div>

					  </div>
					  <div class="Buttongroup">
					    <el-button type="primary" icon="el-icon-search" size="small" @click="queryTj">查询</el-button>
					    <el-button type="primary3"  size="small" @click="exportTj"style="background:#55CE63;color:#ffffff;" v-if="BtnPermission.includes('导出')" >
                    <svg-icon icon-class="export" style="width: 14px;height: 14px;margin-right: 5px;" />导出
                </el-button>
					  </div>
					</div>
				<el-tab-pane :label="tabData.tabO" name="first">
					<ComplexTable
						:tableDataHead="tableDataHead"
						:tableDataBody="tableDataBody"></ComplexTable>
						<NoData v-show="!tableDataBody.length"></NoData>
				</el-tab-pane>
				<el-tab-pane :label="tabData.tabT" name="second" v-if="prepareData().flag != 3">
					<SimpleTable :tableDatad="tableDtats" :tableHead="tableHead" :tableOperation="tableOperation" @getOperation="getOperation"></SimpleTable>
					<!-- 表格空白页 -->
					<NoData v-show="!detailsAttendanceData.length"></NoData>
					<!--翻页器-->
					<div class="block" v-show="detailsAttendanceData.length"><!-- v-if="total.length>10" -->
						<el-pagination
						@current-change="handleCurrentChange"
						:current-page.sync="currentPage"
						:page-size="pageSize"
						layout="prev, pager, next,slot"
						:total="total">
						<div class="jumpBox">
							<span>前往</span>
							<input type="text" v-model="value" @keyup.enter="jumpPage" >
							<span style="min-width:20px">页</span>
							<span class="myscal" @click="jumpPage">GO</span>
						</div>
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<!-- 查看全部弹窗 -->
		<div>
			<el-dialog class="" title="查看全部" :visible.sync="dialogFormVisible" width="90%">
				<div class="dialogBox">
					<h3 class="clearfix color333 title title_txt_x">
						<span class="fl">单位 : 人</span>
						<span class="fr">
							<span class="title_txt_x" ><i class="icon" style="background-color:#11A0F8;"></i>&nbsp;出勤人数</span>
					<span class="title_txt_x" >
						<i class="icon" style="background-color:#55CE63;"></i>

						&nbsp;排班人数
					</span>
					<span class="title_txt_x" ><i class="icon" style="background-color:#4A90E2;width: 12px;height: 2px;position: relative;top: -3px;"></i>&nbsp;出勤率</span>
						</span>
					</h3>
					<chart
					:_styles="'width:100%;height:90%'"
					:_id="'testCharts'"
					:_title="''"
					:_color="['#55CE63','#4A90E2','#11A0F8']"
					:_chartData="tempData"
					:_showBol="true"
					:_xAxisData='xAxisData1'
					:_type="'LineAndBar'">
					</chart>
				</div>
			</el-dialog>
        </div>

	</div>
</template>

<script>
	import chart from '@/components/PublicEcharts'
	import ComplexTable from '@/views/attendance/components/ComplexTable'
	import SimpleTable from  '@/components/SimpleTable'
	import { mapGetters,mapActions } from 'vuex'
	import { attendanceStatistics } from '@/api/attendance/Attendance'
	import NoData from '@/components/NoData'
    import commdate from "@/utils/commdate"
    import ProjectAndGroup from '@/components//ProjectAndGroup'

	export default {
		components: {
			chart,
			ComplexTable,
			SimpleTable,
            NoData,
            ProjectAndGroup
		},
		props: ['BtnPermission','daysDetails','charData','detailsAttendanceData','detailsAttendanceThead','projectData','groupData','total_','pages'],
		data() {
			return {
				requestPages:'',
				tabActive:true,
				dialogFormVisible:false,
				username:'',//工号
				realname:'',//姓名
				shiftsName:'',//班次
				condition:'',
				activeName: 'first',
				color: ['#11a0f8', '#55ce63'],
				project: '',//项目
              	group: '',//小组
              	groupTj:'',//统计小组value
				chartData:[],
				tempData:[],
				xAxisData:[],
				xAxisData1:[],
				temp:[],//临时用的数据容器
				tableDataHead:[
						{

							tname:'小组',
							prop:"group",
							fixed:true,
							width:'200'
						},
						{
							tname:'指标',
							prop:"index",
							fixed:true,
							width:'150'
						},
						{
							tname:'班次',
							prop:"Shift",
							fixed:true,
							width:'200'
						},
						{
							tname:this.numberTostr(this.$store.state.time.getDate())+'日',
							prop:"data",
						},
				],
				tableDataBody:[],
				//简单表格数据
				tableHead:this.detailsAttendanceThead,//今日详情表头
                tableDtats:this.detailsAttendanceData,
                tableOperation:[
                        {operation:'详情',type:'see'},
                ],
                currentPage: 0, // 当前
                pageSize: 10,//当前页条数
                total: 0,//总条数
                requestPages:1,
                value:1,

			}
		},
		computed:{
			...mapGetters([
				'getDate',
				'getFlag'
            ]),
			navTtitle(){
				//日月年切换更改今日详情，本月详情，本年详情
				return this.getFlag == 'day'?'该日情况':this.getFlag == 'month'?'该月情况':'该年情况';
			},
			tabData(){
				//日月年按钮切换更改表格上方的tab栏内容
				var tab = {
					tabO:'该日考勤统计',
					tabT:'该日详情'
				}
				if(this.getFlag == 'day'){
					tab = {
						tabO:'该日考勤统计',
						tabT:'该日详情'
					}
				}
				if(this.getFlag == 'month'){
					tab = {
						tabO:'该月考勤统计',
						tabT:'该月详情'
					}
				}
				if(this.getFlag == 'year'){
					tab = {
						tabO:'该年考勤统计',
						tabT:'该年详情'
					}
				}
				return tab;
			}
		},
		methods:{
			...mapActions([
				'setDate',
				'setFlag'
				]),
			getProjectId(val){
				this.project=val
            },
            getGroupId(val){
            	this.group=val
            },
			handleClick(tab, event) {
				this.tabActive = !this.tabActive;
			},
			getOperation(data){
				//点击表格获取对应列的对象，id，及操作名称
				var id = data.dataInfo.userId
				this.$router.push({ path: '/attendance/myattendance', query: { userId: id}});
			},
			chartsDataCutOff(data){//按照年月日截取数据
				this.tempData = this.copyArr(data);
				let flag = '';
				if(this.getFlag === 'day'){
					flag = 1;
				}else if(this.getFlag === 'month'){
					flag = 2;
				}else{
					flag = 3;
				}
				if(flag === 1 || flag === 2){
					if(data.length > 10){
						return data.slice(data.length-10,data.length);
					}else{
						return data.slice(0);
					}
				}else{
					return data.slice(0);
				}
			},
			copyArr(arr){
				return arr.slice(0);
			},
			chartsDataPreparation(data){
				//charts数据准备
				this.chartData = [];
				this.tempData = [];
				this.chartData = this.chartsDataClassification(data,1);
				this.tempData = this.chartsDataClassification(data,2);
			},
			chartsDataClassification(data,type){
				//echarts数据分类
				var leiBieArr = this.leiBie(data);//key数组
				var _this = this;
				let chartdata = [];
				leiBieArr.forEach(function(v,i){
					chartdata.push({
						name: v,
						barWidth: '20',
						type: ((v) => {
							return v === '出勤率' ? 'line':'bar';
						})(v),
						data: ((data,v) => {
							let dataArr = [];
							for(var item in data){
								dataArr.push(data[item][v]);
							}
							if(type === 1){//type === 1 截取后的echarts数据；type === 2 不截取
								return _this.chartsDataCutOff(dataArr);
							}else{
								return dataArr;
							}
						})(data,v),
						/*itemStyle:((v) => {
							if(v === '出勤人数'){
								return {
									color:'#11A0F8'
								}
							}else if (v === '排班人数'){
								return {
									color:'#4A90E2'
								}
							}else{
								return {
									normal:{
										lineStyle:{
											color:'#55CE63'
										}
									}
								}
							}
						})(v)*/
					})
				})
				return chartdata;
			},
			xAxisDataSet(data){
				//charts X轴
				this.xAxisData = [];
				this.xAxisData1 = [];
				if(this.prepareData().flag == 1 || this.prepareData().flag == 2){
					this.xAxisData = this.xAxisDataStr(Object.keys(data).slice(-10));
				}else{
					this.xAxisData = this.xAxisDataStr(Object.keys(data).slice(0));
				}
				this.xAxisData1 = this.xAxisDataStr(Object.keys(data).slice(0));
			},
			xAxisDataStr(arr){
				//x轴字符串处理 2018-08-12 处理成12日
				let xAxisArr = [];
				let flag = this.prepareData().flag;
				if(flag == 1 || flag == 2){
					arr.forEach(function(v,i){
						xAxisArr.push(Number(v.slice(-2))+'日');
					})
					return xAxisArr;
				}else if(flag == 3){
					arr.forEach(function(v,i){
						xAxisArr.push(Number(v.slice(-2))+'月');
					})
					return xAxisArr;
				}

			},
			leiBie(data){
				//获取请求对象中任意一个数据中的key返回数组
				var leiBieArr = '';
				for(var item in data){
					leiBieArr = Object.keys(data[item]);
					return leiBieArr;
				}
			},
			query(){
				var queryParameter ={
					dateTime :'',//时间
					flag:'',//年月日标识
					userName : this.username,//工号
					realName : this.realname,//姓名
					shiftsName : this.shiftsName,//班次
					projectId : this.project,//项目
					groupId : this.group,//小组
					page:this.currentPage,//页数
					limit:10,//每页条数

				}
				this.$emit('query',queryParameter);

			},
			exportWord(){
				var dateTime = this.prepareData().queryDate;
				var flag = this.prepareData().flag;
				 window.location.href= process.env.BASE_API + `/admin/bpoPunchClock/ExportAttendanceDetailList?dateTime=${dateTime}&flag=${flag}&userName=${this.username}&realName=${this.realname}&projectId=${this.project}&groupId=${this.group}&userId=1`;
			},
			exportTj(){
				var queryDate = this.prepareData().queryDate;
				var flag = this.prepareData().flag;
				var progectID = '';
				var groupID = this.groupTj;
				window.location.href= process.env.BASE_API + `/admin/bpoPunchClock/findGroupStatisticsExcExport?queryDate=${queryDate}&flag=${flag}&progectID=${progectID}&groupID=${groupID}&userId=1`;

			},
			/*翻页*/
            handleCurrentChange(val) {
                this.requestPages = val;
                this.query();
            },
            jumpPage(){
                if(this.value == this.currentPage){
                    return false;
                }else{
                    let value = Number(this.value);
                    if(value>this.requestPages){
                        value = this.requestPages;
                    }
                    this.currentPage = value;
                    this.value = value;
                    this.query();
                }
            },
            prepareData(){
                //全局搜索参数准备，数据获取参数
                let data = {
                    queryDate : commdate.timestampToTime(this.getDate),
                    flag : this.getFlag,
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
            attendanceStatisticsHead(data){
            	//月/年维度表头数据
				var statisticsHead = [];
				var newArr;
				var arr = Object.keys(data);
					for(let item in data[arr[0]]){
						statisticsHead.push({
							tname:this.attendanceStatisticsToString(item),
							prop:item,
						})
					}

				var tempArr = this.copyArr(this.tableDataHead);
				tempArr.pop();
				return newArr = Array.concat(tempArr,statisticsHead.reverse());


			},
			attendanceStatisticsToString(date){
				var flag = this.prepareData().flag;
				if(String(Number(date)) != 'NaN'){
					if(flag == 2 ){
						return date +'日'
					}else if( flag == 3){
						return date+'月';
					}else{
						return date;
					}
				}else{
					return date;
				}

			},
			attendanceStatisticsData(data){
				//处理标体数据日维度的处理
				var newArr = [];
				for(let item in data){

					for(let item_l in data[item]){

						for(let item_ll in data[item][item_l]){

							newArr.push({
								group:item,//小组
								index:item_l,//指标
								Shift:item_ll,//班次
								data:data[item][item_l][item_ll],//data
							})
						}
					}
				}
				return newArr;

			},
			attendanceStatisticsDataY(data){
				var newArr = [];
				for(let group in data){

					for(let index in  this.anyDay(data[group])){

						for(let shift in data[group][Object.keys(data[group])[0]][index]){

							this.dataProcessing(data,group,index,shift);
						}
					}
				}
			},
			anyDay(obj){
				return obj[Object.keys(obj)[0]]
			},
			dataProcessing(data,zu,zb,bc){
				var obj ={
					group:zu,
					index:zb,
					Shift:bc
				};
				for(let item in data[zu]){
					//天
					obj[item] = data[zu][item][zb][bc]
				}
				this.temp.push(obj);
			},
			init(){
				var data = this.prepareData();
				data.groupID = this.groupTj;
				data.projectID =''
				attendanceStatistics(data).then(response => {
				if(response && response.data && response.data.data && Object.keys(response.data.data).length){
					if(this.prepareData().flag == 1){
						this.tableDataHead = [{tname:'小组',prop:"group",fixed:true,width:'200'},
											  {tname:'指标',prop:"index",fixed:true,width:'150'},
											  {tname:'班次',prop:"Shift",fixed:true,width:'200'},
											  {tname:this.numberTostr(this.$store.state.time.getDate())+'日',prop:"data",},]
						//处理表体数据日维度
						this.tableDataBody = this.attendanceStatisticsData(response.data.data);
					}else{
						this.temp = [];
						this.tableDataHead = [{tname:'小组',prop:"group",fixed:true,width:'200'},
											  {tname:'指标',prop:"index",fixed:true,width:'150'},
											  {tname:'班次',prop:"Shift",fixed:true,width:'200'},
											 /* {tname:this.numberTostr(this.$store.state.time.getDate())+'日',prop:"data",},*/
											  ]
						//处理完的表头
						this.tableDataHead = this.attendanceStatisticsHead(response.data.data);
						this.attendanceStatisticsDataY(response.data.data);
						this.tableDataBody = this.temp;
					}
				}
                }).catch(error => {
                    console.log(error, 222)
                });
			},
			queryTj(){
				this.init();
			},
		},
		watch:{
			getDate(val){
				this.init();
			},
            getFlag(val){
				this.init();
			},
			daysDetails(val){
			},
			charData(val){
				/*console.log(val,'echarts')*/
				this.chartsDataPreparation(val);
				this.xAxisDataSet(val);
			},
			detailsAttendanceData(val){
				this.tableDtats = val;
				/*console.log(this.tableDtats,'子组件标体数据')*/
			},
			detailsAttendanceThead(val){
				this.tableHead = val;
			},
			project(val){
				this.$emit('getProjectLocal',val);
			},
			group(val){
				this.$emit('getgroupLocal',val);
			},
			groupTj(val){
				this.$emit('getgroupTjLocal',val);
			},
			total_(val){
				this.total = val;
			},
			pages(val){
				this.requestPages = val;
			},

		},
		mounted(){
			this.init();
		},

}

</script>
<style scoped>
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
    margin-top: 20px;
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
</style>
