<template>
<div class="">
  <div class="table">
    <el-table
    :header-cell-style="getRowClass"
    :data="tableD"
    stripe
    style="width: 100%">
      <el-table-column
        v-for="(v,k) in tableH"
        :fixed="v.fixed"
        :key="k"
        :label="v.label"
        :prop="v.prop"
        :width="v.width">

        <template slot-scope="scope">
          <span style=""v-if="!(scope.row[v.prop] instanceof Object)">{{scope.row[v.prop]}}</span>
          <el-button
          v-for="(v,k) in scope.row[v.prop]"
          type="text"
          :class="{disagree:v.type=='disagree'}"
          :key="k"
          :operation="v.type"
          @click="handleEdit(scope.$index, scope.row,v.type)">{{v.operation}}</el-button>
        </template>

      </el-table-column>
    <!-- <el-table-column fixed="right"  width="150" label="操作">
      <template slot-scope="scope">
        <el-button v-for="(v,k) in tableO"
          type="text"
          :key="k"
          :operation="v.type"
          size="mini"
          @click="handleEdit(scope.$index, scope.row,v.type)">{{v.operation}}</el-button>
      </template>
    </el-table-column> ......-->
    </el-table>
  </div>
</div>
</template>
<script>
export default {
    props: ['tableDatad','tableHead'],
    data() {
      return {
          tableH:this.tableHead,
          tableD:this.tableDatad,
      }
    },
    methods:{
        handleEdit(index,row,type) {
            this.sendData({
                index:index,
                dataInfo:row,
                operation:type
            })
        },
    getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
            return {background:'#92A6B1',color:'#ffffff'}
        } else {
            return ''
        }
    },
    sendData(obj){
        this.$emit('getOperation',obj);
      }
    },
    mounted(){

    },
    watch:{
        tableDatad(val){
            this.tableD = val;
        },
        tableHead(val){
            this.tableH = val;
        }
    },
    beforeCreate(){

    },
   created(){

   }
}
</script>
<style scoped>
  .disagree{
    color: #E65E5E;
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
  .el-table .cell, .el-table th div {

    overflow: hidden;
    text-overflow: ellipsis;
}
table tr td:not(:last-child) button
{
display:none;
}
</style>
