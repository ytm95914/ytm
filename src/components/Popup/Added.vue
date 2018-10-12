<template>
    <section class="dialog">
        <el-button type="text" @click="dialogFormVisible = true">新增人员</el-button>
        <el-dialog
            title="人员新增"
            :visible.sync="dialogFormVisible"
            width="500px">
            <el-form :model="form">
                 <template v-for="item in fromshowdata">
                    <el-form-item :label="item.title" :label-width="formLabelWidth" v-if="!item.select">
                        <el-input v-model="item.types" auto-complete="off" class="inputs"></el-input>
                    </el-form-item>


                    <el-form-item :label="item.title" :label-width="formLabelWidth" v-if="item.select">
                        <el-select v-model="item.types" placeholder="请选择活动区域">
                            <el-option v-for="(val,i) in item.children" :label="val.title" :value="val.title" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="confirm">确 定</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    /**
     * @author Lindong Ding
     * @date 2018/7/30
     * @desc 【人员新增】 弹层
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */

    export default {
        name: "index",
        data(){
            return {
                fromshowdata:[
                    {
                        title: '姓名',
                        types: '',
                        select: false
                    },
                    {
                        title: '工号',
                        types: '',
                        select: false
                    },
                    {
                        title: '办公地点',
                        types: '',
                        select: true,
                        children:[{title:'环洋'},{title:'中关村'},{title:'新大厦'}]
                    },
                    {
                        title: '手机',
                        types: '',
                        select: false
                    },
                    {
                        title: 'QQ',
                        types: '',
                        select: false
                    },
                    {
                        title: '生日',
                        types: '',
                        select: false
                    },
                    {
                        title: '年龄',
                        types: '',
                        select: false
                    },
                    {
                        title: '所在项目',
                        types: '',
                        select: true,
                        children:[{title:'视频'},{title:'快报'},{title:'UC'}]
                    },
                    {
                        title: '业务类型',
                        types: '',
                        select: true,
                        children:[{title:'公有项目'},{title:'私有项目'},{title:'内部项目'}]
                    },
                    {
                        title: '直属上级',
                        types: '',
                        select: false
                    }
                ],
                dialogFormVisible: false,
                form: {},
                formLabelWidth:'140px'
            }
        },
        methods:{
            confirm(){
                console.log(this.fromshowdata,666)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .inputs{
        width:205px;
    }
    .dialog-footer{
        text-align: center;
        .el-button{
            margin:0 15px;
        }
    }
</style>
