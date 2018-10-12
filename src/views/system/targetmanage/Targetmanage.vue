<template>
    <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <div class="querybar" v-if="activeName == 'first'">
              <div class="leftinput">
                <span>指标分类名称：</span>
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model.trim="targetName_fl"
                  clearable>
                </el-input>
                <span>指标分类编号：</span>
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model.trim="targetNumber_fl"
                  clearable>
                </el-input>
              </div>
              <div class="Buttongroup">
                <el-button type="primary" icon="el-icon-search" @click="search(activeName)">查询</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="newtarget(activeName)">新建</el-button>
              </div>
            </div>
            <div class="querybar" v-else>
              <div class="leftinput">
                <span>指标名称：</span>
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model.trim="targetName_gl"
                  clearable>
                </el-input>
                <span>指标编号：</span>
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model.trim="targetNumber_gl"
                  clearable>
                </el-input>
                 <span>指标类型：</span>
                 <el-select v-model="value" placeholder="请选择" size="mini">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </div>
              <div class="Buttongroup">
                <el-button type="primary" icon="el-icon-search" @click="search(activeName)">查询</el-button>
                <el-button type="primary" icon="el-icon-plus"  @click="newtarget(activeName)">新建</el-button>
              </div>
            </div>
            <el-tab-pane label="指标分类管理" name="first">
                <SimpleTable :tableDatad="tableDtats" :tableHead="tableHead" :tableOperation="tableOperation" @getOperation="getOperation"></SimpleTable>
            </el-tab-pane>
            <el-tab-pane label="指标管理" name="second">
                <SimpleTable :tableDatad="tableDtats" :tableHead="tableHead" :tableOperation="tableOperation" @getOperation="getOperation"></SimpleTable>
            </el-tab-pane>
            <div class="paging">
                <div class="block">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev,     pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </el-tabs>
    </div>
</template>

<script>
    /**
     * @author ...
     * @date 2018/8/3
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */
    import SimpleTable from  '@/components/SimpleTable'
    export default {
        name: "Targetmanage",
        data(){
            return{
                currentPage: 1, // 当前
                pageSize: 10,//当前页条数
                total: 500,//总条数
                activeName: 'first',
                targetName_fl:'',
                targetNumber_fl:'',
                targetName_gl:'',
                targetNumber_gl:'',
                targetType:'',
                options: [{
                  value: '选项1',
                  label: '黄金糕'
              }, {
                  value: '选项2',
                  label: '双皮奶'
              }, {
                  value: '选项3',
                  label: '蚵仔煎'
              }, {
                  value: '选项4',
                  label: '龙须面'
              }, {
                  value: '选项5',
                  label: '北京烤鸭'
              }],
              value: '',
                tableHead:[
                            {label:'姓名',fixed:true,prop:'realname'},
                            {label:'工号',fixed:true,prop:'username'},
                            {label:'调出时间',fixed:false,prop:'bringUpTime'},
                            {label:'调出项目',fixed:false,prop:'startProjectName'},
                            {label:'调出小组',fixed:false,prop:'startGroupName'},
                            {label:'调入时间',fixed:false,prop:'bringDownTime'},
                            {label:'调入项目',fixed:false,prop:'endProjectName'},
                            {label:'调入小组',fixed:false,prop:'endGroupName'},
                            {label:'调出原因',fixed:false,prop:'remarkOne'},
                            ],
                tableDtats:[
                        {
                        realname: '王小虎',
                        username: '001234',
                        bringUpTime: 'XXXX@xxxx.com',
                        startProjectName:'18510000000',
                        startGroupName:'男',
                        bringDownTime:'XX',
                        endProjectName:'no',
                        endGroupName:'正常离职',
                        paibanzhuantai:'无',
                        remarkOne:'否',
                        },
                        {
                        realname: '王小虎',
                        username: '001234',
                        bringUpTime: 'XXXX@xxxx.com',
                        startProjectName:'18510000000',
                        startGroupName:'男',
                        bringDownTime:'XX',
                        endProjectName:'no',
                        endGroupName:'正常离职',
                        paibanzhuantai:'无',
                        remarkOne:'否',
                        },

                    ],
                tableOperation:[
                        {operation:'编辑',type:'update'},
                        {operation:'查看',type:'see'},
                        {operation:'删除',type:'delete'},
                    ],


            }
        },
        components:{
            SimpleTable,
        },
        computed:{
            type(){
                return this.activeName=='first'?'zbfl':'zbgl';
            }
        },
        methods:{
            handleCurrentChange(val) {
                /*翻页*/
                this.page = val;
                this.init();
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            newtarget(activeName){
                let type = '';
                if(activeName == 'first'){
                    type = 'zbfl';
                    this.$router.push({path: `/system/newtarget/${type}` })
                }else{
                    type = 'zbgl';
                    this.$router.push({path: `/system/newtarget/${type}` })
                }
            },
            search(activeName){
                 let type = '';
                 if(activeName == 'first'){
                    type = 'zbfl';
                    // alert('指标分类查询');
                    console.log(this.targetName_fl,this.targetNumber_fl)

                }else{
                    type = 'zbgl';
                    // alert('指标管理查询');
                    console.log(this.targetName_gl,this.targetNumber_gl,this.value)
                }
            },
            getOperation(data){
                console.log(data)
                this.operationHandle(data);
            },
            operationHandle(data){
                console.log('操作处理函数执行')
                console.log(data)
                if(data.operation =='update'){
                    /*跳转编辑页面,需要传递数据id*/
                    console.log(this.type)
                     this.$router.push({path: `/system/edittarget/${this.type}`});
                }
                if(data.operation =='see'){
                    /*跳转查看页面*/
                    this.$router.push({path: `/system/seetarget/${this.type}`});
                }
                if(data.operation =='delete'){
                    this.open()

                }
            },
            open() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  lockScroll:false,
              }).then(() => {

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
        }
    }
</script>

<style scoped>
.content {
    width: 100%;
    /* height: 525px; */
    background: #FFFFFF;
    border: 1px solid #E9F1F3;
    box-sizing: border-box;
    float: left;
}
.content .el-tabs__item.is-active {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #11A0F8;
}
.querybar{
    height: 42px;
}
.querybar span{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 20px;
    color: #333333;
}
.el-input--mini {
  font-size: 12px;
  width: 130px;
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
body {
    box-sizing: border-box;
}
.paging {
    text-align: center;
  }
</style>
