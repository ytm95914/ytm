<template>
    <div class="ztreenode">
        <div class="ztreetitle" v-show="getMsg">
            <el-row>
                <el-col :span="18">
                    <h3>组织机构管理</h3>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" size="small" icon="el-icon-plus" @click.stop="addOrg()"   v-if="BtnPermission.includes('新增组织')">新增</el-button>
                </el-col>
            </el-row>
        </div>
        <ul id="treeDemo" class="ztree"></ul>
    </div>
</template>
<script>
    import 'static/plugins/jquery-1.4.4.min.js';
    import 'static/plugins/ztree/jquery.ztree.all.min.js';
    import 'static/plugins/ztree/jquery.ztree.core.min.js';
    import 'static/plugins/ztree/jquery.ztree.exedit.min.js';
    import 'static/plugins/ztree/zTreeStyle.css';
    import {
        findorgnization,
        deletorgnization,
        orgnizationlist,
        addfindorgnization
    } from '@/api/system/orgnization'
    import {
        mapMutations,
        mapGetters
    } from 'vuex'
    export default {
        /**
         * @author TianMing Yu
         * @date 2018/7/30
         * @desc 【组织机构树】
         * @module 组件引用位置
         *      1.
         * @param {Object} [title]  - 参数说明
         * @example 调用示例
         * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
         */
        props: ['getMsg', 'treeNode','BtnPermission'],
        data: function () {
            return {
                treeObj: "",
                setting: {
                    check: {
                        enable: true,
                        nocheckInherit: false,
                        chkboxType: {
                            "Y": "p",
                            "N": "s"
                        }
                    },
                    edit: {
                        enable: true,
                        showRemoveBtn: true,
                        drag: {
                            isMove: false
                        },
                        showRenameBtn: false

                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idkey: "id",
                            pIdKey: "parentId",
                            rootPId: null
                        },
                        showTitle: true
                    },
                    view: {
                        showLine: false,
                        dblClickExpand: true,

                    },
                    callback: {
                        beforeDrag: function () {
                            return false;
                        },
                        onClick: this.ztreeclick,
                        beforeRemove: this.zTreeBeforeRemove,
                        onRemove: this.zTreeOnRemove
                    }
                },
                zNodes: []
            }
        },
        methods: {
            freshArea: function () {
                $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes).expandAll(true);
                 this.seteditshow(false);
           },
            ztreeclick: function (event, treeId, treeNode) {
                let data = {
                    id: treeNode.id
                };
                findorgnization(data).then(res => {
                    this.setOrg_Show(res.data.data);
                    this.setTreedata(res)
                    this.setOrg_Add(false);
                    this.setOrg_disable(true);
                    this.setfalg(true);
                    this.seteditshow(true);
                })
            },
            zTreeOnRemove: function (event, treeId, treeNode) {
            this.$confirm('此操作将永久删除该组织机构, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    id: treeNode.id
                };
                deletorgnization(data).then(res => {
                    if (res.data.data) {
                        orgnizationlist().then(res => {
                            let arr = new Array();
                            arr.push(...res.data.data)
                            this.zNodes = arr;
                        })
                    } else {
                        let Vuethis = this;
                        this.freshArea();
                        this.$notify.error({
                            title: '错误',
                            message: res.data.msg,
                            duration: "3000",
                            onClose: function () {
                                return false;
                            }
                        })
                    }
                })
                }).catch(error => {
                    this.freshArea();
                    return false;
                })

            },
            addOrg: function () {
                this.treeObj = $.fn.zTree.getZTreeObj('treeDemo');
                let nodes = this.treeObj.getSelectedNodes();
                if (nodes.length == 0) {
                    this.freshArea();
                    let Vuethis = this;
                    this.$notify.error({
                        title: '错误',
                        message: '未选择层级，不可以新增！',
                        duration: "3000",
                        onClose: function () {
                            return false;
                        }
                    })
                    return false;
                } else if (nodes[0].typeId == 3) {
                    let Vuethis = this;
                    this.freshArea();
                    this.$notify.error({
                        title: '错误',
                        message: '不可以新增！',
                        duration: "3000",
                        onClose: function () {
                            return false;
                        }
                    })
                    return false;
                } else {
                    this.setOrg_disable(false);
                    this.setOrg_Add(true);
                    this.seteditshow(false);
                    let data = {
                        id: nodes[0].id
                    };
                    addfindorgnization(data).then(res => {
                        this.setOrg_Show(res.data.data);
                    })
                }
            },
            ...mapMutations({
                setOrg_Show: "setOrg_Show",
                setOrg_disable: "setOrg_disable",
                setOrg_Add: "setOrg_Add",
                setTreedata: "setTreedata",
                setfalg: "setfalg",
                setunsave: "setunsave",
                seteditshow:"seteditshow"
            })
        },
        watch: {
            BtnPermission(){
                if(!this.BtnPermission.includes('删除组织')){
                    this.setting.edit.showRemoveBtn = false;
                }
            },
            treeNode(newQuestion, oldQuestion) {
                this.zNodes = newQuestion;
                this.freshArea();
            },
            "$store.state.Org_newdata" () {
                this.freshArea();
            },
            "$store.state.Orgfalg" () {
                orgnizationlist().then(res => {
                    let arr = new Array();
                    arr.push(...res.data.data)
                    this.zNodes = arr;
                })
            },
            "$store.state.falg" () {

            },
            "$store.state.editshow"(){},
            "$store.state.unsave" (newQuestion, oldQuestion) {
                this.treeObj = $.fn.zTree.getZTreeObj('treeDemo');
                let nodes = this.treeObj.getSelectedNodes();
                let data = {
                    id: nodes[0].id
                };
                findorgnization(data).then(res => {
                    this.setOrg_Show(res.data.data);
                    this.setTreedata(res)
                    this.setOrg_Add(false);
                    this.setOrg_disable(true);
                    this.setfalg(true);
                    this.setunsave(false);
                })
            }
        },
        computed: {
            ...mapGetters([
                'getOrg_Show',
                'getOrg_disable',
                'getOrg_newdata',
                'getOrgfalg',
                "getOrg_Add",
                "getfalg",
                "geteditshow"
            ])
        },
        mounted() {
            $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes).expandAll(true);
        },

    }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .ztreenode {
        width: 302px;
        height: 680px;
        border: 1px solid #E9F1F3;
        overflow: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        .ztreetitle {
            height: 49px;
            line-height: 49px;
            border-bottom: 1px solid #E9F1F3;
            h3 {
                font-size: 18px;
                text-indent: 20px;
                font-family: "PingFangSC-Regular";
            }
        }
    }

</style>

