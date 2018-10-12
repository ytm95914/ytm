<template>
    <section class="system_permission">
        <header>
            <div class="header_left">
                <span>角色名称</span>
                <el-input v-model="formInline.name" placeholder="请输入内容"></el-input>
            </div>
            <el-button size="small" type="primary" class="btn_Import" icon="el-icon-plus" id="button" @click="addRole">
                <span style="margin-left: -4px;">新增</span>
            </el-button>
            <el-button size="small" type="primary" class="btn_download" icon="el-icon-search" id="button" @click="searchRole">
                <span style="margin-left: -4px;">查询</span>
            </el-button>
        </header>

        <!--公共表格    -->
        <PublicTbale :tableDatad="tableData" :tableHead="tableHead" :tableOperation="tableOperation" @getOperation="getOperation"></PublicTbale>
        <!-- 暂无数据 -->
        <NoData v-show="!tableData.length"></NoData>
        <!-- 查看角色弹窗 -->
        <div class="permission_table">
            <el-dialog title="查看角色" :visible.sync="centerDialogVisible" width="30%" :lock-scroll="false">
                <p class="rolename">角色名称:{{ roleName }}</p>
                <template v-for="(item,i) in jurisdiction" v-show="jurisdiction.length">
                    <div class="label">
                        <el-checkbox disabled>{{ item .label}}</el-checkbox>
                    </div>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checked" disabled>
                        <el-checkbox v-for="(check,index) in item.option" :key="index">{{ check }}</el-checkbox>
                    </el-checkbox-group>
                </template>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="centerDialogVisible = false">关闭 </el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 编辑角色 -->
        <div class="addRole">
            <el-dialog :title="RoleName" :visible.sync="RoleDialog" width="30%" :lock-scroll="false">
                <el-form ref="RoleForm" :model="RoleForm" label-width="90px" :rules="rules" v-if="isShow">
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="RoleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色类型" prop="type" >
                        <el-select v-model="RoleForm.type" placeholder="请选择类型">
                            <el-option v-for="(option,index) in option" :label="option.name" :value="option.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form ref="RoleForm" :model="RoleForm" label-width="90px" :rules="rules" v-else>
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="RoleForm.name"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="角色类型" prop="type" v-if="isShow">
                        <el-select v-model="RoleForm.type" placeholder="请选择类型">
                            <el-option v-for="(option,index) in option" :label="option.name" :value="option.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form>
                <div style="text-align: center;margin-top:10px;">
                    <el-button v-if="isBtn" type="success" @click="editBtn('RoleForm')">确定</el-button>
                    <el-button v-else type="success" @click="addBtn('RoleForm')">确定</el-button>
                    <el-button type="info" @click="resetForm('RoleForm')">取消</el-button>
                </div>
            </el-dialog>
        </div>
        <!--翻页器-->
        <Pagination v-show="tableData.length" :total="total" :totalPages="totalPages" :currentPages="currentPage" @changePage="handleCilck" @jumpPage="jumpPage"></Pagination>
    </section>
</template>

<script>
/**
 * @author shumei Zhao
 * @date 2018/8/3
 * @desc 组件描述
 * @module 组件引用位置
 *      1.
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 * <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
 */
import PublicTbale from "@/components/PublicTbale/SimpleTable";
import comm from "@/utils/comm";
import {
    pageInfos,
    seeRoles,
    editRoles,
    delRoles,
    addRoles,
    rolesType
} from "@/api/system/permission";
import { checkRole, checkRoletype } from "@/utils/validate/Myattendance";
import NoData from "@/components/NoData";
import Pagination from "@/components/Pagination";
export default {
    name: "Permission",
    components: {
        PublicTbale,
        NoData,
        Pagination
    },
    data() {
        return {
            isShow: false,
            centerDialogVisible: false,
            RoleDialog: false,
            roleName: "",
            // currentPage: 0, // 分页
            // pageSize: 0, //每页显示条数
            // total: 0, //总页数
            total: 1, //翻页组件数据总数
            totalPages: 1, //翻页组件总页数
            currentPage: 1, //翻页组件当前页
            // newRole: "", //新增角色
            oldRole: [], //已有角色
            formInline: {
                // 默认搜索内容
                name: "",
                page: 1
            },
            submitForm: {
                name: "",
                page: 1
            },
            checked: true,
            jurisdiction: [],
            messages: "",
            tableHead: [
                { label: "序号", prop: "sort" },
                { label: "角色名称", prop: "name" }
            ],
            tableData: [],
            tableOperation: [
                { operation: "查看", type: "check" },
                { operation: "编辑", type: "edit" },
                { operation: "删除", type: "deleted" },
                { operation: "权限编辑", type: "roleEdit" }
            ],
            RoleName: "", //弹窗提示名称
            isShow: false, //新增角色时显示角色类型下拉框
            rules: {
                //验证规则
                name: [{ validator: checkRole, trigger: "blur" }],
                type: [{ validator: checkRoletype, trigger: "change" }]
            },
            RoleForm: {
                name: "",
                id: "",
                type: ""
            },
            option: [],
            isEdit: false,
            isAdd: false,
            isBtn: false
        };
    },
    methods: {
        /*翻页*/
        handleCilck(val) {
            this.submitForm.page = val;
            Object.assign(this.formInline, this.submitForm);
            this.pageInfo(this.submitForm);
        },
        jumpPage(value) {
            this.submitForm.page = value;
            Object.assign(this.formInline, this.submitForm);
            this.pageInfo(this.submitForm);
        },
        /*查询*/
        searchRole() {
            this.formInline.page = 1;
            Object.assign(this.submitForm, this.formInline);
            this.pageInfo(this.formInline);
        },
        getOperation(val) {
            switch (val.operation) {
                case "check":
                    this.seeRole(val.dataInfo.id);
                    break;
                case "edit":
                    this.editRole(val.dataInfo);
                    break;
                case "deleted":
                    this.delRole(val.dataInfo, val.index);
                    break;
                case "roleEdit":
                    this.jump(val.dataInfo);
                    break;
            }
        },
        // 删除角色
        delRole(item, index) {
            let data = {
                id: item.id
            };
            delRoles(data)
                .then(res => {
                    if (res.data.data == 1) {
                        this.$confirm(
                            "此操作将永久删除该角色, 是否继续?",
                            "提示",
                            {
                                confirmButtonText: "确定",
                                cancelButtonText: "取消",
                                type: "warning",
                                lockScroll: false
                            }
                        )
                            .then(() => {
                                this.tableData.splice(index, 1);
                                this.pageInfo();
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                            })
                            .catch(() => {
                                this.$message({
                                    type: "info",
                                    message: "已取消删除"
                                });
                            });
                    } else {
                        comm.open(this, "该角色正在使用，不能删除");
                    }
                })
                .catch(error => {
                    console.log(error + "错误");
                });
        },
        // 查看角色
        seeRole(id) {
            // console.log("查看")
            this.centerDialogVisible = true;
            let data = {
                id: id
            };
            seeRoles(data)
                .then(res => {
                    // console.log(res,"查看角色");
                    var roleData = res.data;
                    this.roleName = roleData.data.name;
                    this.jurisdiction = roleData.data.permissionPackageList;
                })
                .catch(error => {
                    console.log(error + "错误");
                });
        },
        // 编辑角色
        editRole(data) {
            // console.log(data);
            this.isBtn = true;
            this.RoleDialog = true;
            this.RoleForm.name = data.name;
            this.RoleForm = {
                name: data.name,
                id: data.id
            };
            this.RoleName = "编辑角色";
            this.isShow = false;
        },
        // 弹窗确定按钮
        editBtn(formName) {
            this.$refs.RoleForm.validate(valid => {
                if (valid) {
                    // console.log(this.RoleForm);
                    addRoles(this.RoleForm)
                        .then(res => {
                            console.log(res);
                            if (res.data.data == 0) {
                                comm.open(this, "该角色已有");
                            } else {
                                comm.open(this, "编辑成功");
                                this.pageInfo();
                            }
                        })
                        .catch(error => {
                            console.log(error + "错误");
                        });
                    this.RoleDialog = false;
                    this.resetForm(formName);
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.RoleDialog = false;
        },
        // 新增角色
        addRole(data) {
            console.log(data)
            this.isBtn = false;
            this.RoleDialog = true;
            this.RoleName = "新增角色";
            this.RoleForm.name = "";
            this.RoleForm.id = "";
            // this.resetForm = {
            //     name:"",
            //     id:"",
            //     type:"",
            // }
            this.isShow = true;
            rolesType()
                .then(res => {
                    // console.log(res);
                    this.option = res.data.data;
                })
                .catch(error => {
                    console.log(error + "错误");
                });
        },
        // 新增角色确定按钮
        addBtn(formName) {
            this.$refs.RoleForm.validate(valid => {
                if (valid) {
                    console.log(this.RoleForm);
                    addRoles({
                        name: this.RoleForm.name,
                        roleTypeId: this.RoleForm.type
                    })
                        .then(res => {
                            if (res.data.data == 0) {
                                comm.open(this, "该角色已有");
                            } else {
                                comm.open(this, "新增成功");
                                this.pageInfo();
                            }
                        })
                        .catch(error => {
                            console.log(error + "错误");
                        });
                    this.RoleDialog = false;
                    this.resetForm(formName);
                } else {
                    return false;
                }
            });
        },
        // 权限编辑页面
        jump(item, index) {
            this.$router.push({
                path: `/system/jurisdiction/${item.id}`
            });
        },
        // 页面列表数据加载
        pageInfo(data) {
            pageInfos(data)
                .then(res => {
                    if (res) {
                        var pageData = res.data;
                        this.total = pageData.total;
                        this.totalPages = pageData.pages;
                        pageData.records.forEach((item, index) => {
                            item.sort = index + 1;
                        });
                        this.tableData = pageData.records;
                    } else {
                        this.tableData = [];
                        this.total = 1;
                        this.totalPages = 1;
                    }
                })
                .catch(error => {
                    console.log(error + "错误");
                });
        }
    },
    watch: {
        RoleDialog(val) {
            // console.log(val);
            if(val == false){
                this.$refs.RoleForm.resetFields();
            }
        }
    },
    mounted() {
        this.pageInfo();
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "@/styles/permission/permission.scss";
</style>

