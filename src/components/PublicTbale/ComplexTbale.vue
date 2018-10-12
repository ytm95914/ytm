<template>
    <section class="publictable">
        <el-table
            :header-cell-style="getRowClass"
            :data="tableD"
            stripe
            style="width: 100%">
            <el-table-column
                v-for="(val,index) in tableH"
                :key="index"
                :fixed="val.fixed"
                :label="val.label"
                :prop="val.prop"
                :width="val.width"
                :formatter="val.format">
            </el-table-column>
            <el-table-column fixed="right"  width="150" label="操作">
                <template slot-scope="scope">
                    <el-button v-for="(v,i) in tableO"
                        type="text"
                        :key="i"
                        :operation="v.type"
                        @click="handleEdit(scope.$index, scope.row,v.type)">{{v.operation}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    /**
     * @author zhen Liu
     * @date 2018/9/8
     * @desc 全局公共表格组件 [该组件谁需要应用的时候在下面留下信息]
     * @params 参数信息
     *      1. tableHead [表头参数 Object]
     *      2. tableDatad [表体参数 Object]
     *      3. tableOperation [操作参数 Object]
     *      4. types [表格使用类型 Number]
     *
     * @config 配置信息
     *      1. label [名称*必填项 String]
     *      2. prop [对应名称字段*必填项 String]
     *      3. fixed [是否固定 Boolean]
     *      4. width [宽度 Bumber]
     *      5. formatter [过滤器 String/Number]

     *
     * @module 组件引用位置 ***必填项,顺序对应types字段***
     *      1. 考勤-请假管理[src/views/attendance/LeaveManagement.vue]
     *      2.
     *      3.
     *      4.
     */

    export default {
        props: ['types','tableDatad','tableHead','tableOperation'],
        data() {
            return {
                tableH:this.tableHead,
                tableD:this.tableDatad,
                tableO:this.tableOperation
            }
        },
        methods:{
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return {background:'#92A6B1',color:'#ffffff'}
                }else {
                    return ''
                }
            },
            handleEdit(index,row,type) {
                switch(this.types){
                    case 1:
                        let obj = {index:index, dataInfo:row, operation:type};
                        this.$emit('getOperation',obj);break;
                }
            }
        },
        watch:{
            tableDatad(val){
                this.tableD = val;
            },
            tableHead(val){
                this.tableH = val;
            },
            tableOperation(val){
                this.tableO = val;
            }
        }
    }
</script>

<style scoped>
    /*.querybar{*/
    /*height: 42px;*/
    /*}*/
    /*.querybar span{*/
    /*font-family: PingFangSC-Regular;*/
    /*font-size: 12px;*/
    /*padding-left: 20px;*/
    /*color: #333333;*/
    /*}*/
    /*.el-input--mini {*/
    /*font-size: 12px;*/
    /*width: 120px;*/
    /*}*/
    /*.leftinput {*/
    /*float: left;*/
    /*}*/
    /*.el-input--mini .el-input__inner {*/
    /*height: 36px;*/
    /*line-height: 36px;*/
    /*}*/
    /*.Buttongroup {*/
    /*float: right;*/
    /*margin-right: 36px;*/
    /*}*/
    /*.el-button--primary1 {*/
    /*background: #4A90E2;*/
    /*color: #FFFFFF;*/
    /*}*/
    /*.el-button--primary1:focus, .el-button--primary1:hover {*/
    /*background: #66b1ff;*/
    /*border-color: #66b1ff;*/
    /*color: #fff;*/
    /*}*/
    /*.el-button--primary2{*/
    /*background: #00C4AB;*/
    /*color: #FFFFFF;*/
    /*}*/
    /*.el-button--primary2:focus, .el-button--primary2:hover {*/
    /*background: #00c4a9a6;*/
    /*border-color: #66b1ff;*/
    /*color: #fff;*/
    /*}*/
    /*.el-button--primary3{*/
    /*background: #55CE63;*/
    /*color: #FFFFFF;*/
    /*}*/
    /*.el-button--primary3:focus, .el-button--primary3:hover {*/
    /*background: #55ce63ba;*/
    /*border-color: #66b1ff;*/
    /*color: #fff;*/
    /*}*/
    /*.table {*/
    /*width: 100%;*/
    /*}*/

    /*.table .el-table thead.is-group th {*/
    /*background: #92A6B1;*/
    /*}*/
</style>
