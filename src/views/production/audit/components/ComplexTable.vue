<template>
<div class="timevard">
<!--   <div class="querybar">
  <div class="leftinput">
    <span>日期：</span>
    <el-input
      size="mini"
      placeholder="请输入内容"
      v-model="input10"
      clearable>
    </el-input>
    <span>班次：</span>
    <el-input
      size="mini"
      placeholder="请输入内容"
      v-model="input10"
      clearable>
    </el-input>
    <span>姓名：</span>
    <el-input
      size="mini"
      placeholder="请输入内容"
      v-model="input10"
      clearable>
    </el-input>  
    <span>条件：</span>
    <el-input
      size="mini"
      placeholder="请输入内容"
      v-model="input10"
      clearable>
    </el-input>    
  </div>
  <div class="Buttongroup">
    <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
    <el-button type="primary3" icon="el-icon-search" size="mini">导出</el-button>
  </div>
</div> -->
  <div class="table">
   <el-table
    :header-cell-style="getRowClass"
    :data="tableBody"
    max-height="450"
    stripe
    style="width: 100%">
   <!-- 从这里开始for 表头结构-->
      <el-table-column
        v-for="(v,k) in tableHead"
        :key="k"
        :prop="v.prop"
        :label="v.tname"
        :fixed="v.fixed"
        :width="v.width"
        >
        <el-table-column
          v-for="(v,k) in v.children"
          :key="k"
          :prop="v.prop"
          :label="v.tname"
          >
          <el-table-column
            v-for="(v,k) in v.children"
            :key="k"
            :prop="v.prop"
            :label="v.tname"
            >
          </el-table-column>
        </el-table-column>	
      </el-table-column>
    </el-table>
  </div>
</div>
</template>
<script>
 export default {
  props: ['tableDataHead','tableDataBody'],
  data() {
    return {
    	/*input10:'',*/
    	tableBody:this.tableDataBody,
    	tableHead:this.tableDataHead
    }
  },
  methods:{
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 ||rowIndex == 1 || rowIndex == 2) {
        return {background:'#92A6B1',color:'#ffffff'}
      } else {
        return ''
      }

    }
  },
  watch:{
    tableDataHead(val){
      this.tableHead = val;
    },
    tableDataBody(val){
      this.tableBody  = val;
    }
  },
  mounted(){
   
  },
  beforeCreate(){
   
  },
  created(){
  }
}
</script>
<style scoped>
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
  width: 120px;
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
	margin-right: 36px;
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
</style>