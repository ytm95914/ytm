<template>
    <div class="organization">
        <p class="crumbs"><span @click="backup">组织机构管理 > </span><span>指标配置</span></p>
        <el-row>
            <el-col :span="7">
                <Ztreenode :get-msg="getOrg_Title" :tree-node="treenode"/>
            </el-col>
            <el-col :span="17" class="organizationright">
                <Quota/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /**
     * @author TianMing Yu
     * @date 2018/8/3
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */
    import Ztreenode from './components/Ztreenode'
    import Quota from './components/Quota'
    import {
        mapGetters,
        mapMutations
    } from 'vuex'

    export default {
        name: "Organization",
        components: {
            Ztreenode,
            Quota
        },
        methods: {
            //查看详情返回来源页
            backup(){
                window.history.go(-1);
            },
            ...mapMutations({
                setOrg_Title: 'setOrg_Title'
            })

        },
        data(){
            return{
                    treenode:[{
                    id: 1,
                    pid: 0,
                    name: "大良造菜单",
                    open: true,
                    nocheck: false,
                    children: [{
                            id: 11,
                            pid: 1,
                            name: "当前项目"
                        }]
                }]
            }
        },
            computed:{
                ...mapGetters([
                    'getOrg_Title'
                ])
            }
        }

</script>

<style rel="stylesheet/scss" lang="scss">
    .organizationright {
        padding-left: 10px;
    }

</style>

