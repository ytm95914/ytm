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
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button v-for="(v,i) in tableO"
                    type="text"
                    :key="i"
                    :operation="v.type"
                    :class="v.type"
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
     *
     * @config 配置信息
     *      1. label [名称*必填项 String]
     *      2. prop [对应名称字段*必填项 String]
     *      3. fixed [是否固定 Boolean]
     *      4. width [宽度 Bumber]
     *      5. formatter [过滤器 String/Number]

     *
     * @module 组件引用位置
     *      1. 考勤-请假管理 [src/views/attendance/LeaveManagement.vue]
     *      2.
     *      3.
     *      4.
     */

    export default {
        props: ['tableDatad','tableHead','tableOperation'],
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
                let obj = {index:index, dataInfo:row, operation:type};
                this.$emit('getOperation',obj);
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

<style lang="scss" scoped>
    /*角色权限管理start*/
    .check{
        color:rgb(17, 160, 248);
    }
    .edit{
        color:rgb(17, 160, 248);
    }
    .deleted{
        color:rgb(230, 94, 94);
    }
    .roleEdit{
        color:rgb(85, 206, 99);
    }
    /*end*/
</style>
