<template>
    <div class="organization">
        <el-row>
            <el-col :span="7">
                <Ztreenode :get-msg="getOrg_Title" :tree-node="treenode" :BtnPermission="BtnPermission"/>
            </el-col>
            <el-col :span="17" class="organizationright">
                <Orgmanage :BtnPermission="BtnPermission"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /**
     * @author Tianming Yu
     * @date 2018/8/3
     * @desc 组件描述
     * @module 组件引用位置
     *      1.
     * @param {Object} [title]  - 参数说明
     * @example 调用示例
     * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
     */
    import Ztreenode from './components/Ztreenode'
    import Orgmanage from './components/Orgmanage'
    import TempCache from '@/utils/tempcache'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'
    import {
        orgnizationlist
    } from '@/api/system/orgnization'
    export default {
        name: "Organization",
        data() {
            return {
                treenode: [],
                BtnPermission: []
            }
        },
        components: {
            Ztreenode,
            Orgmanage
        },
        methods: {
            ...mapMutations({
                setOrg_Title: 'setOrg_Title',
                setOrgfalg: 'setOrgfalg'
            }),
            initOrg: function () {
                orgnizationlist().then(res => {
                    let arr = new Array();
                    arr.push(...res.data.data)
                    this.treenode = arr;
                    this.setOrgfalg(false);
                })
            }

        },
        computed: {
            ...mapGetters([
                'getOrg_Title',
                'getOrgfalg'
            ])
        },

        created(){
           this.initOrg();
        },
        watch: {
            "$store.state.Orgfalg"() {
                    this.initOrg();
            }
        },
        mounted() {
            this.BtnPermission = TempCache.getItem('组织机构管理');
        }
    }

</script>

<style scoped>
    .organizationright {
        padding-left: 10px;
        
    }
.el-form-item{
    margin-right: 20px;
        }
</style>

